/**
 * =========================================================================
 * Google Apps Script (Code.gs)
 * ระบบบันทึกคะแนนและตรวจสอบการส่งซ้ำ (Smart Renewable Energy & IoT Lab)
 * รองรับทั้ง 6 หน่วยการเรียนรู้ (Multi-Unit Auto-Healing & Anti-Duplicate)
 * =========================================================================
 * 
 * วิธีการติดตั้ง:
 * 1. เปิด Google Sheets ใหม่ที่ต้องการใช้เก็บข้อมูล
 * 2. ไปที่เมนู ส่วนขยาย (Extensions) > Apps Script
 * 3. ลบโค้ดเดิมทั้งหมดออก แล้ววางโค้ดชุดนี้ลงไป
 * 4. กดปุ่ม "บันทึก" (รูปแผ่นดิสก์)
 * 5. กดปุ่ม "การทำให้ใช้งานได้" (Deploy) > "การทำให้ใช้งานได้รายการใหม่" (New deployment)
 * 6. เลือกประเภท: "เว็บแอป" (Web app)
 * 7. ตั้งค่า:
 *    - คำอธิบาย: บันทึกคะแนนพลังงานทดแทนทุกหน่วย
 *    - ดำเนินการในฐานะ: ตัวฉัน (Me)
 *    - ผู้ที่มีสิทธิ์เข้าถึง: "ทุกคน" (Anyone) **สำคัญมาก**
 * 8. กด "ทำให้ใช้งานได้" (Deploy) และคัดลอก URL ของเว็บแอปมาวางในหน้าเว็บครูผู้สอน
 * =========================================================================
 */

/**
 * กำหนดชื่อ Sheet ตามรหัสหน่วยการเรียนรู้
 */
function getSheetNameForUnit(unitId) {
  const map = {
    "unit1": "Unit1_Responses",
    "unit2": "Unit2_Responses",
    "unit3": "Unit3_Responses",
    "unit4": "Unit4_Responses",
    "unit5": "Unit5_Responses",
    "unit6": "Unit6_Responses"
  };
  return map[unitId] || "Unit1_Responses";
}

/**
 * รองรับคำขอ HTTP GET (ใช้ทดสอบการเชื่อมต่อ หรือตรวจสอบการส่งซ้ำ)
 */
function doGet(e) {
  try {
    const studentId = e.parameter.studentId ? String(e.parameter.studentId).trim() : "";
    const unitId = e.parameter.unitId || "unit1";
    const action = e.parameter.action || "ping";
    const targetSheetName = getSheetNameForUnit(unitId);
    
    // ทดสอบการเชื่อมต่อ
    if (action === "ping") {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "ระบบเชื่อมต่อ Google Sheets สำเร็จพร้อมใช้งาน",
        unitId: unitId,
        sheetName: targetSheetName,
        timestamp: new Date().toISOString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // ตรวจสอบว่ารหัสนักศึกษาเคยส่งในหน่วยนี้แล้วหรือไม่
    if (action === "check" && studentId) {
      const isDup = isStudentSubmitted(targetSheetName, studentId);
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        unitId: unitId,
        sheetName: targetSheetName,
        submitted: isDup,
        message: isDup ? "รหัสนักศึกษานี้เคยส่งคะแนนหน่วยนี้แล้ว" : "ยังไม่มีข้อมูล สามารถส่งได้"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "API Endpoint ทำงานปกติ"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * รองรับคำขอ HTTP POST (ใช้บันทึกคะแนนจาก Web App)
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        status: "error",
        message: "ไม่พบข้อมูลที่ส่งมา (Invalid payload)"
      });
    }

    // แปลงข้อมูล JSON
    const data = JSON.parse(e.postData.contents);
    const unitId = String(data.unitId || "unit1").trim();
    const targetSheetName = getSheetNameForUnit(unitId);
    const studentId = String(data.studentId || "").trim();
    const studentName = String(data.studentName || "").trim();
    const studentRoom = String(data.studentRoom || "").trim();
    const score = Number(data.score !== undefined ? data.score : 0);
    const totalScore = Number(data.totalScore !== undefined ? data.totalScore : 5);
    const percentage = Number(data.percentage !== undefined ? data.percentage : (score / totalScore * 100));
    const unitTitle = String(data.unitTitle || ("หน่วยที่ " + unitId.replace('unit', '')));
    const answers = data.answers ? JSON.stringify(data.answers) : "";

    // ตรวจสอบความถูกต้องของข้อมูล
    if (!studentId) {
      return createJsonResponse({ status: "error", message: "กรุณาระบุรหัสนักศึกษา" });
    }
    if (!studentName) {
      return createJsonResponse({ status: "error", message: "กรุณาระบุชื่อ-นามสกุล" });
    }

    // ตรวจสอบและสร้าง Sheet หากยังไม่มี
    const sheet = getOrCreateSheet(targetSheetName);

    // 🛑 ระบบตรวจสอบการส่งซ้ำในหน่วยนี้ (Anti-Duplicate Check per Unit)
    if (isStudentSubmitted(targetSheetName, studentId)) {
      return createJsonResponse({
        status: "duplicate",
        message: "❌ ไม่อนุญาตให้ส่งซ้ำ: รหัสนักศึกษา " + studentId + " (" + studentName + ") เคยบันทึกคะแนนใน " + targetSheetName + " ไปแล้ว"
      });
    }

    // บันทึกข้อมูลลงในแถวใหม่
    const timestamp = Utilities.formatDate(new Date(), "Asia/Bangkok", "yyyy-MM-dd HH:mm:ss");
    sheet.appendRow([
      timestamp,
      "'" + studentId,  // single quote ป้องกันเลข 0 หาย
      studentName,
      studentRoom,
      unitTitle,
      score,
      totalScore,
      percentage + "%",
      answers
    ]);

    return createJsonResponse({
      status: "success",
      message: "✅ บันทึกคะแนนสำเร็จเรียบร้อยแล้ว (" + score + "/" + totalScore + ") ใน " + targetSheetName,
      data: {
        unitId: unitId,
        sheetName: targetSheetName,
        studentId: studentId,
        studentName: studentName,
        score: score,
        percentage: percentage,
        timestamp: timestamp
      }
    });

  } catch (err) {
    return createJsonResponse({
      status: "error",
      message: "เกิดข้อผิดพลาดในการบันทึก: " + err.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * ฟังก์ชันตรวจว่ารหัสนักศึกษานี้เคยส่งในชีตของหน่วยนี้แล้วหรือไม่
 */
function isStudentSubmitted(sheetName, studentId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) return false;

    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return false;

    const idRange = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
    const cleanTargetId = String(studentId).trim();

    for (let i = 0; i < idRange.length; i++) {
      const currentId = String(idRange[i][0]).replace(/^'/, '').trim();
      if (currentId === cleanTargetId) {
        return true;
      }
    }
    return false;
  } catch (e) {
    return false;
  }
}

/**
 * ฟังก์ชันสร้างและจัดรูปแบบตารางอัตโนมัติหากยังไม่มี (Auto-Healing)
 */
function getOrCreateSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    
    const headers = [
      "วัน-เวลาที่ส่ง",
      "รหัสนักศึกษา",
      "ชื่อ-นามสกุล",
      "กลุ่ม/ห้องเรียน",
      "หน่วยการเรียนรู้",
      "คะแนนที่ได้",
      "คะแนนเต็ม",
      "ร้อยละ (%)",
      "รายละเอียดคำตอบ (JSON)"
    ];
    
    sheet.appendRow(headers);

    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#065f46"); // Dark Emerald Green
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(2, 130);
    sheet.setColumnWidth(3, 180);
    sheet.setColumnWidth(4, 120);
    sheet.setColumnWidth(5, 240);
    sheet.setColumnWidth(6, 100);
    sheet.setColumnWidth(7, 100);
    sheet.setColumnWidth(8, 100);
    sheet.setColumnWidth(9, 250);
  }
  
  return sheet;
}
