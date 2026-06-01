# 🌍 Project Context & Architecture (หน่วยความจำระยะยาว)

**เป้าหมาย:** เพื่อให้ AI เข้าใจสถาปัตยกรรมโปรเจกต์ โครงสร้างไฟล์ และประวัติการทำงาน โดยไม่ต้องให้ผู้ใช้ต้องอธิบายใหม่ทั้งหมด

---

## 🎯 1. ภาพรวมโปรเจกต์ (Project Overview)
- **ชื่อโปรเจกต์**: ห้องเรียนครูแม็ค | Mack's Classroom (LMS Platform)
- **เป้าหมายหลัก**: แพลตฟอร์ม E-Learning สำหรับเขียนโปรแกรมที่ **"เน้นการมีส่วนร่วม (Highly Interactive)"** 
- **Tech Stack**: React 19, Vite 8, Tailwind CSS 4, React Router 7, Lucide React
- **รายวิชาที่เปิดสอน**:
  1. 🐍 การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น (21910-1003) — 8 หน่วย, Python
  2. 🧩 การเขียนโปรแกรมเชิงวัตถุ (OOP) — 7 หน่วย, Python OOP
  3. 🗄️ ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น (21901-2001) — 6 หน่วย, SQL/MySQL

---

## 📂 2. โครงสร้างไฟล์ปัจจุบัน (Directory Tree)
```text
\Teach\
├── \Teach\LMS-React\
│   ├── \Teach\LMS-React\vite.config.js           # ตั้งค่า Vite + Tailwind v4 (ไม่มี tailwind.config.js)
│   ├── \Teach\LMS-React\src\
│   │   ├── \Teach\LMS-React\src\App.jsx              # ระบบ Routing หลัก
│   │   ├── \Teach\LMS-React\src\index.css            # Global CSS & Custom Animations
│   │   ├── \Teach\LMS-React\src\data.js              # ฐานข้อมูลวิชา Python (เชื่อม [MARKER] สู่ Component)
│   │   ├── \Teach\LMS-React\src\data\                # ฐานข้อมูลวิชา OOP และ SQL
│   │   └── \Teach\LMS-React\src\components\
│   │       ├── \Teach\LMS-React\src\components\interactive\     # ⭐ สื่อ Simulator ทั้งหมด (โหลดอัตโนมัติ)
│   │       └── \Teach\LMS-React\src\components\LessonViewer.jsx # ⭐ Engine เรนเดอร์เนื้อหาหลัก (ห้ามแก้)
│   └── \Teach\LMS-React\docs\
│       └── \Teach\LMS-React\docs\curriculum\          # เอกสารหลักสูตรรายวิชา (ตัวกำหนดหน้าเว็บ)
├── \Teach\DESIGN.md                # 💎 มาตรฐานการออกแบบ (UI/UX)
├── \Teach\SKILL.md                 # 🛠️ กฎการเขียนโค้ดทางเทคนิค
├── \Teach\CONTEXT.md               # 🌍 ภาพรวมและประวัติ (ไฟล์นี้)
├── \Teach\AGENTS.md                # 🤖 ศูนย์กลางปฏิบัติการ AI
└── \Teach\task.md                  # 🎯 แผนงานปัจจุบัน
```

---

## ⏳ 3. ประวัติการทำงานและสถาปัตยกรรม (History & Milestones)
- **Auto-Registry**: สถาปัตยกรรมนี้ใช้ `import.meta.glob` ใน `\Teach\LMS-React\src\components\LessonViewer.jsx` เพื่อดึง Component ในโฟลเดอร์ `\Teach\LMS-React\src\components\interactive\` มาแมปกับ `[MARKER]` ใน `\Teach\LMS-React\src\data.js` โดยอัตโนมัติ
- **UI Evolution**: โปรเจกต์นี้เคยใช้ Explorer Pattern ในอดีต แต่ปัจจุบัน **ได้ปรับมาใช้ "Immersive Full-Page Standard (Layer 1-4)"** ทั่วทั้งแพลตฟอร์ม เพื่อความสวยงามพรีเมียม
- **การปรับแต่งโครงสร้างเสถียรภาพและพัฒนาสากล (พ.ค. 2026)**:
  - **การยกเลิกระบบ Auto-scroll**: ปรับสมดุลเพื่อให้หน้าต่าง UI นิ่งและเสถียรที่สุดในทุกหน้าจอการเรียนรู้
  - **ปรับสถาปัตยกรรมสตรีมฐานข้อมูล**: ออกแบบโมเดล Props แยก `mainTitle`, `subTitle`, และ `description` เพื่อความยืดหยุ่นทางสถาปัตยกรรม
  - **มาตรฐานการออกแบบบล็อกอิสระ (Separated Blocks Layout Standard)**: กำหนดบรรทัดฐานบังคับห้ามนำเนื้อหารายหัวข้อย่อยบังคับไปซ่อนในแท็บหรือระบบนำทางสลับหน้าใดๆ แต่ให้แยกเนื้อหาและระบบโต้ตอบออกเป็นบล็อกเดี่ยวอิสระเปิดทฤษฎีแนวตั้ง (Vertical Stack) เพื่อการนำเสนอเนื้อหาเชิงลึกที่ป้อนข้อมูลต่อเนื่องลื่นไหล สอดคล้องตามแนวทางการออกแบบ Fluid Open-Air Layout

  - **มาตรฐานการยกเลิกระบบเสียงถาวร (Absolute Zero-Audio Environment Standard)**: การถอดถอนฟังก์ชันเล่นเสียงเอฟเฟกต์ สัญญาณคลื่น Web Audio API และปุ่มสลับเสียงออกอย่างสิ้นเชิงในทุกบทเรียน เพื่อรักษาเสถียรภาพสูงสุดในทุกระบบออฟไลน์เครือข่ายโรงเรียน
  - **มาตรฐานสเกลขนาดตัวอักษรเพื่อสุขภาวะการอ่าน (Scaled Legible Typography Standard)**: กำหนดบรรทัดฐานขนาดตัวอักษรคำอธิบายหลัก `text-[16px]` ถึง `text-[17px]` (หรือ `text-base`), ปุ่มตัวเลือกและกล่องคำอธิบายผลย่อย `text-sm` (14px) หรืออย่างต่ำ `text-[13px]`, และหน้าต่างเขียนโค้ด/คอนโซลอย่างต่ำ `text-[13.5px]` เพื่อความคมชัดสบายตาและสุขอนามัยที่ดีของสายตานักเรียน
  - **การกำหนดมาตรฐาน Fluid Open-Air และการเชื่อมต่อกึ่งกลางอย่างสมบูรณ์แบบ (30 May 2026)**: พัฒนาบทเรียนแรกของวิชาคอมพิวเตอร์เบื้องต้น (`it1_1.jsx`) โดยประยุกต์ใช้เลย์เอาต์เปิดเผยทฤษฎี (Fluid Open-Air Layout) ขจัดขอบกล่องการ์ดทึบซ้อนกล่องออกให้โปร่งเบาสบายตา, วาดจุดเชื่อมต่อแผงวงจร SVG เข้าออกจากกึ่งกลางพิกัดกล่องพอดี (Absolute Center Connection Standard) และปรับพาดหัวชื่อเรื่องทั้งหมดให้เป็นคำศัพท์ตำราเรียนสากลที่ชัดเจนตรงตัว (Explicit Textbook Terminology Standard)
  - **การติดตั้ง AI Specialized Skills และปฏิรูปเพื่อขจัด UI Anti-patterns (01 Jun 2026)**:
    - ค้นหาและติดตั้งชุดทักษะสากลของ `agentskills.io` ได้แก่ `vercel-react-best-practices` และ `tailwind-v4-shadcn` พร้อมบันทึกระเบียบลงฐานระบบ เพื่อเป็นแนวทางควบคุมการรัน React 19 และความสมบูรณ์แบบในการจัดสไตล์ Tailwind v4
    - ปรับปรุงและชำระล้างโค้ดของแบบจำลองส่วนกลางร่วมกัน (`QuizEngine.jsx`, `SimulatorShell.jsx`, `TeacherBio.jsx`, `LessonViewer.jsx`) เพื่อขจัดข้อบกพร่องทางดีไซน์สะสม (UI Anti-patterns) เช่น แอนิเมชันกระตุกเด้ง โทนสีน้ำเงิน/ม่วงแบบ AI tells และสีตัวอักษร Contrast ต่ำ จนสามารถสแกนผ่านเกณฑ์มาตรฐานเป็นศูนย์ (0 warnings found)

---

## 🧠 4. Continuous Training (การรับรู้ประวัติศาสตร์และการจัดการ)
- **บันทึกความเปลี่ยนแปลง**: ทุกครั้งที่คุณดำเนินการโครงสร้างใหญ่เสร็จสิ้น (เช่น ปรับปรุง Module หรือสถาปัตยกรรมใหม่) **ต้อง** นำมาบันทึกสรุปไว้ในหัวข้อที่ 3 เสมอ เพื่อให้ AI รุ่นต่อไปรับรู้
- **เรียนรู้จากอดีต**: สังเกตแนวทางการแก้ไขปัญหาที่ผ่านมา หากโครงสร้างไหนถูกโละทิ้งไปแล้ว (เช่น การเลื่อนจอ Auto-scroll) จงหลีกเลี่ยงการนำกลับมาใช้ใหม่
