# Smart Renewable Energy & IoT Lab
## ระบบการเรียนรู้พลังงานทดแทนและระบบควบคุมอัตโนมัติ IoT อัจฉริยะ

ระบบสื่อการเรียนรู้เชิงปฏิสัมพันธ์ (Interactive Web Learning Lab) ด้านพลังงานทดแทนและระบบ IoT อัจฉริยะ ครอบคลุม 6 หน่วยการเรียนรู้ พร้อมห้องทดลองจำลองเสมือนจริง (Real-Time Physics Simulators), ผังวงจรและการเชื่อมต่ออุปกรณ์เวกเตอร์ SVG แบบเคลื่อนไหว (Animated Single-Line Flow Diagrams), แบบทดสอบวัดผลการเรียนรู้อัตโนมัติ และระบบบันทึกคะแนนเชื่อมต่อ Google Sheets

---

## 🌟 จุดเด่นของระบบ (Key Features)

1. **6 หน่วยการเรียนรู้ตามหลักสูตรวิศวกรรม/อาชีวศึกษา:**
   - **หน่วยที่ 1:** หลักการและแหล่งกำเนิดพลังงานทดแทน (Solar PV, Wind Turbine, Biomass & Biogas)
   - **หน่วยที่ 2:** การออกแบบวงจรอุปกรณ์และเซนเซอร์ในระบบพลังงาน (MPPT vs PWM, แบตเตอรี่ LiFePO4 & BMS, วงจรแบ่งแรงดัน & ADC ESP32)
   - **หน่วยที่ 3:** ระบบควบคุมอัตโนมัติและสถาปัตยกรรม IoT (Closed-Loop PID, Dual-Axis Solar Tracker, Load Shedding, Edge Gateway)
   - **หน่วยที่ 4:** ระบบอินเวอร์เตอร์และการเชื่อมต่อโหลด (Pure Sine Wave, Total Harmonic Distortion - THD, Microgrid Isolation)
   - **หน่วยที่ 5:** การบันทึกข้อมูลและการแสดงผลแบบเรียลไทม์ (Time-Series Data Logging, SCADA Mimic HMI, มาตรฐาน IEC 61724 PR)
   - **หน่วยที่ 6:** การวิเคราะห์ประสิทธิภาพและการประเมินทางเศรษฐศาสตร์ (Capacity Factor, LCOE, Payback Period, Carbon Offset)

2. **ผังจำลองการเชื่อมต่ออุปกรณ์เวกเตอร์ SVG ความละเอียดสูง (Pure Vector SVG Interconnection Models):**
   - มีสายแสดงการไหลของกระแสไฟและกระบวนการแบบแอนิเมชัน (Animated DC, AC, Gas, Slurry Flow)
   - คลิกอุปกรณ์ในผังเพื่อแสดงรายละเอียดสเปกและจุดเชื่อมต่อ (Interactive Click-to-Highlight Linkage)
   - แคตตาล็อกอุปกรณ์ทางวิศวกรรมมาตรฐาน 6 การ์ดต่อหัวข้อ

3. **ระบบประเมินผลและการป้องกันการทุจริต:**
   - ตรวจสอบการส่งซ้ำด้วยรหัสนักศึกษา (Anti-Duplicate Submission)
   - ระบบเคลียร์การล็อกสำหรับเครื่องคอมพิวเตอร์ที่ใช้ร่วมกันในห้องแล็บ
   - บันทึกคะแนนแยกชีตรายหน่วยอัตโนมัติ (Unit 1 - Unit 6 Auto-Healing Sheets)

4. **สถาปัตยกรรม Client-Side บริสุทธิ์ (100% Static & PWA Ready):**
   - รันได้ทันทีบน **GitHub Pages**, เว็บโฮสติ้งทั่วไป หรือ Local Server
   - มีไฟล์ `manifest.json` รองรับการติดตั้งแบบ Web App (PWA) บนสมาร์ตโฟน/แท็บเล็ต

---

## 🚀 วิธีการเผยแพร่ขึ้น GitHub Pages (Deployment Guide)

เมื่อท่านพร้อมจะอัปโหลดขึ้น GitHub ให้ปฏิบัติตามขั้นตอนง่ายๆ ดังนี้:

### ขั้นตอนที่ 1: สร้าง Repository บน GitHub
1. ล็อกอินเข้า [GitHub](https://github.com/) และกดปุ่ม **New repository**
2. ตั้งชื่อ Repository เช่น `renewable-energy-lab`
3. เลือกสถานะเป็น **Public** (เพื่อให้ GitHub Pages ใช้งานได้ฟรี)
4. **ไม่ต้อง** ติ๊กถูกที่ "Add a README file" (เพราะในโฟลเดอร์นี้มีไฟล์พร้อมแล้ว)
5. กดปุ่ม **Create repository**

### ขั้นตอนที่ 2: อัปโหลดโค้ดจากเครื่องขึ้น GitHub
เปิด Terminal / PowerShell ในโฟลเดอร์นี้ แล้วรันคำสั่ง:
```bash
# ผูก Remote Repository ของคุณ (เปลี่ยน URL เป็นของคุณ)
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git

# ส่งโค้ดขึ้น GitHub
git branch -M main
git push -u origin main
```
*(หรือสามารถดับเบิลคลิกไฟล์ `deploy_to_github.bat` เพื่อให้ระบบนำทางแบบอัตโนมัติ)*

### ขั้นตอนที่ 3: เปิดใช้งาน GitHub Pages
1. ในหน้า Repository บน GitHub ไปที่เมนู **Settings** (รูปเฟืองด้านบน)
2. แถบเมนูด้านซ้าย เลือกหัวข้อ **Pages**
3. ที่หัวข้อ **Build and deployment**:
   - **Source:** ให้เลือก **GitHub Actions** (ระบบจะดึงไฟล์ Workflow ที่เตรียมไว้ไปดีพลอยอัตโนมัติ)
   - *หรือ* เลือก **Deploy from a branch** > Branch: `main` > Folder: `/(root)` แล้วกด **Save**
4. รอระบบประมวลผลประมาณ 1-2 นาที ท่านจะได้ URL เว็บแอปพลิเคชัน เช่น:
   ```text
   https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/
   ```

---

## 🔗 การเชื่อมต่อระบบหลังบ้าน Google Sheets (Google Apps Script)

ระบบถูกออกแบบให้เชื่อมต่อง่าย ไม่ต้องแก้โค้ด HTML แม้แต่บรรทัดเดียว!

### 1. ติดตั้ง Script ลงใน Google Sheets:
1. สร้าง Google Sheets เปล่าขึ้นมา 1 ไฟล์
2. ไปที่เมนู **ส่วนขยาย (Extensions)** > **Apps Script**
3. ลบโค้ดเริ่มต้นทั้งหมด แล้วคัดลอกเนื้อหาจากไฟล์ [`Code.gs`](./Code.gs) ในโฟลเดอร์นี้ไปวาง
4. กด **บันทึก (รูปแผ่นดิสก์)**
5. กดปุ่ม **การทำให้ใช้งานได้ (Deploy)** > **การทำให้ใช้งานได้รายการใหม่ (New deployment)**
6. เลือกประเภท: **เว็บแอป (Web app)**
   - **ดำเนินการในฐานะ (Execute as):** ตัวฉัน (Me)
   - **ผู้ที่มีสิทธิ์เข้าถึง (Who has access):** ทุกคน (Anyone) *(สำคัญมาก)*
7. กด **ทำให้ใช้งานได้ (Deploy)** และคัดลอก **URL ของเว็บแอป (Web App URL)**

### 2. นำ URL มาใช้งาน (2 วิธี):

* **วิธีที่ 1 (สะดวกที่สุดสำหรับนักเรียน): ส่งลิงก์พร้อม URL Parameter**
  เพิ่ม `?api=YOUR_GAS_URL` ต่อท้าย URL ของ GitHub Pages เช่น:
  ```text
  https://<username>.github.io/<repo>/?api=https://script.google.com/macros/s/AKfycbx.../exec
  ```
  เมื่อนักเรียนเปิดลิงก์นี้ ระบบจะเชื่อมต่อกับ Google Sheets ของครูทันทีโดยอัตโนมัติ!

* **วิธีที่ 2: บันทึกผ่านหน้าจอ "ส่วนของครูผู้สอน"**
  เปิดเว็บแอป > กดปุ่มสีเหลือง **"ส่วนของครูผู้สอน"** ด้านบนขวา > วาง Web App URL ในช่อง > กดบันทึกการตั้งค่า

---

## 💻 วิธีการรันบนเครื่องคอมพิวเตอร์ (Local Development)

หากต้องการทดสอบหรือใช้งานออฟไลน์ในห้องเรียน:

* **รันผ่าน Batch File:** ดับเบิลคลิกไฟล์ `start_server.bat`
* **รันผ่าน Node.js:** 
  ```bash
  node server.js
  ```
* **รันผ่าน Python:**
  ```bash
  python server.py
  ```
* เปิดเบราว์เซอร์ไปที่: [http://localhost:8000](http://localhost:8000)

---

## 📁 โครงสร้างไฟล์ในโครงการ (Project Structure)

```text
renewable_energy_learning_app/
├── index.html                 # หน้าเว็บแอปพลิเคชันหลัก (SPA ครบทั้ง 6 หน่วย)
├── Code.gs                    # โค้ด Backend Google Apps Script สำหรับบันทึกคะแนน
├── manifest.json              # Web App Manifest สำหรับ PWA บนมือถือ/แท็บเล็ต
├── .nojekyll                  # ปิด Jekyll บน GitHub Pages เพื่อให้โหลดไฟล์ static เร็วที่สุด
├── .gitignore                 # กำหนดไฟล์ที่ไม่ต้องติดตามลงใน Git
├── README.md                  # เอกสารคู่มือโครงการและการเผยแพร่
├── package.json               # ข้อมูลโครงการและการรันสคริปต์ Node.js
├── server.js                  # Local Development Server (Node.js)
├── server.py                  # Local Development Server (Python)
├── start_server.bat           # สคริปต์คลิกเดียวเพื่อรันเซิร์ฟเวอร์บน Windows
├── deploy_to_github.bat       # สคริปต์ตัวช่วยอัปโหลดขึ้น GitHub ในอนาคต
└── .github/
    └── workflows/
        └── deploy-pages.yml   # GitHub Actions Workflow สำหรับ Deploy อัตโนมัติ
```
