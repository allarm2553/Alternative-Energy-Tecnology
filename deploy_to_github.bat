@echo off
chcp 65001 >nul
echo ========================================================
echo   Smart Renewable Energy & IoT Lab - GitHub Uploader
echo ========================================================
echo.

git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] ไม่พบคำสั่ง Git ในเครื่อง กรุณาติดตั้ง Git ก่อนดำเนินการ
    pause
    exit /b 1
)

echo [1/4] ตรวจสอบสถานะ Git Repository...
if not exist ".git" (
    echo [INFO] กำลังสร้าง Git Repository...
    git init -b main
)

echo [2/4] บันทึกการเปลี่ยนแปลง (Staging & Commit)...
git add .
git commit -m "feat: Prepare repository for GitHub Pages deployment" 2>nul
if %errorlevel% neq 0 (
    echo [INFO] ไม่มีไฟล์ใหม่ที่ต้อง commit
)

echo.
echo [3/4] ตรวจสอบ Remote Repository...
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo ยังไม่ได้ระบุ GitHub Repository URL
    echo กรุณาวาง URL ของ Repository ของคุณจาก GitHub
    echo ตัวอย่าง: https://github.com/username/renewable-energy-lab.git
    echo.
    set /p REPO_URL="วาง GitHub Repository URL: "
    if "%REPO_URL%"=="" (
        echo [CANCEL] ไม่ได้ระบุ URL ยกเลิกการอัปโหลด
        pause
        exit /b 1
    )
    git remote add origin %REPO_URL%
)

echo.
echo [4/4] กำลังส่งไฟล์ขึ้น GitHub (git push -u origin main)...
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   [SUCCESS] อัปโหลดไฟล์ขึ้น GitHub สำเร็จเรียบร้อยแล้ว!
    echo   คุณสามารถไปที่ Settings ^> Pages บน GitHub เพื่อเปิดใช้งาน
    echo ========================================================
) else (
    echo.
    echo [ERROR] เกิดข้อผิดพลาดในการส่งข้อมูลขึ้น GitHub
    echo กรุณาตรวจสอบสิทธิ์การเข้าถึงหรือล็อกอิน GitHub ในเครื่อง
)

echo.
pause
