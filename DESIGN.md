# 💎 UI/UX Design System & Architecture (PipelinePro Style)

**เป้าหมาย:** ไฟล์นี้คือ "Source of Truth" ของระบบดีไซน์ ห้าม AI สร้าง UI, ใช้สี, หรือใช้เลย์เอาต์นอกเหนือจากที่กำหนดในนี้เด็ดขาด

---

## 🎨 1. Design Tokens (อ้างอิง PipelinePro)
- **Primary**: `#4F46E5` (`indigo-600`) - Actions หลัก, สถานะ Active, ปุ่ม CTA (💡 **Auto-Theme**: AI ต้องเปลี่ยนสี Primary และ Secondary อัตโนมัติให้เข้ากับรายวิชา เช่น วิชาวิทยาการข้อมูลอาจใช้สีฟ้า, OOP อาจใช้สีส้ม)
- **Secondary**: `#06B6D4` (`cyan-500`) - ลิงก์, จุดเน้น
- **Tertiary**: `#F97316` (`orange-500`) - แจ้งเตือนด่วน หรือความเร่งด่วน
- **Background**: `#FAFAFA` (`[#FAFAFA]`) - สีพื้นหลังหลักที่คงที่เหมือนกันทุกหน้าเพื่อความเสถียรและราบรื่นสายตา
- **Surface**: `#FFFFFF` (`white`) - พื้นผิวของการ์ด, Modals
- **Success**: `#22C55E` (`green-500`) | **Warning**: `#F59E0B` (`amber-500`) | **Error**: `#EF4444` (`red-500`)

---

## ✍️ 2. Typography & Thai Rules
- **Font Family**: `Outfit` (Headlines), `Inter` (Body/UI Elements), `Source Code Pro` (Code), `Noto Sans Thai`
- **Thai Rule**: งานที่มีภาษาไทย **บังคับใช้** `leading-relaxed` (1.625) หรือ `leading-loose` เสมอ เพื่อป้องกันสระ/วรรณยุกต์ทับซ้อนกัน
- **สเกลตัวอักษรเพื่อสุขภาวะการอ่าน (Legible Font Scale - ค่าเริ่มต้นอัปเดต 30 May 2026)**: 
  - Headline (หัวข้อหลักระดับบิ๊ก): `text-[38px] font-bold text-zinc-900`
  - Subhead (หัวข้อย่อยและหัวการ์ด): `text-[26px] font-semibold text-zinc-900`
  - Body (คำอธิบายทฤษฎีและเนื้อหาหลัก): `text-[16px] md:text-[17px] font-normal text-zinc-600` (ห้ามใช้ 15px เป็นค่าเริ่มต้นหลัก เพื่อสุขภาวะการอ่านที่อ่านสบายตา)
  - Small / Explanatory (คำอธิบายปลีกย่อย, ป้ายสถานะ, คีย์บอร์ดปุ่มตัวเลือก): `text-sm` (14px) หรืออย่างต่ำ `text-[13px]` (ห้ามใช้ `text-xs` หรือ `text-[11px]` ในการแสดงทฤษฎีหรือตรรกะที่นักเรียนต้องเพ่งอ่านเป็นอันขาด)
  - Code & Terminals (กล่องจำลองโค้ดโปรแกรมและกระดานเอาต์พุต): `text-[13.5px]` หรือ `text-sm` font-mono text-zinc-800

---

## 🧱 3. Component Standards & Clickable Hover Indicators
- **Buttons**:
  - Primary: `bg-[#4F46E5] text-white hover:bg-[#4338CA] hover:scale-[1.02] hover:shadow-md active:scale-98 rounded-[8px] font-semibold cursor-pointer transition-all duration-200`
  - Secondary: `border border-[#4F46E5] text-[#4F46E5] hover:bg-[#EEF2FF] hover:scale-[1.02] active:scale-98 rounded-[8px] font-semibold cursor-pointer transition-all duration-200`
  - ขนาด: h-8 (Small), h-[38px] (Medium - ค่าเริ่มต้น), h-[46px] (Large)
- **Inputs**: `h-[38px] border-[#E4E4E7] rounded-[8px] focus:border-[#4F46E5] focus:ring-3 focus:ring-[#4F46E5]/12`
- **Border Radius**: Small(4px), Medium(8px), Large(12px), XL(20px), Full(9999px)
- **Shadow/Elevation**: ใช้ Tailwind standard `shadow-sm`, `shadow-md`, `shadow-xl`, หรือ Custom Drag `shadow-[0_12px_24px_-4px_rgba(79,70,229,0.15)]`
- **Clickable Hover Visual Standards (มาตรฐานสัญลักษณ์และเอฟเฟกต์ชี้วัดเมื่อโฮเวอร์)**:
  - ทุกองค์ประกอบที่กดโต้ตอบได้ (เช่น ปุ่ม, คีย์บอร์ดตัวเลือก, หรือการ์ด) **ต้อง** แสดงสัญลักษณ์ชัดเจนเมื่อนำเมาส์มาวางด้านบน (Hover):
    1. **บังคับใช้** `cursor-pointer` เสมอในทุกปุ่มและการ์ดที่กดคลิกได้
    2. **การ์ดที่กดได้ (Interactive Cards)**: บังคับใส่เอฟเฟกต์ยกลอยและแสงเงาเมื่อโฮเวอร์ เช่น `hover:-translate-y-1 hover:shadow-lg hover:border-indigo-500/30 transition-all duration-200`
    3. **ปุ่มหรือตัวเลือกย่อย (Buttons/Badges)**: บังคับใส่เอฟเฟกต์ขยายตัวและปรับความสว่าง/เฉดสี เช่น `hover:scale-[1.02] hover:shadow-sm transition-all duration-200`
- **Glassmorphism Card Standard (มาตรฐานการ์ดโปร่งแสงสำหรับเนื้อหาทฤษฎี)**:
  - การ์ดแสดงแนวคิด/ประเภทเนื้อหา: `bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-{accent}/40 transition-all duration-300 cursor-pointer group`
  - Frosted Glass Callout (กล่องเน้นสำคัญ): `bg-{accent}-50/60 backdrop-blur-md border border-{accent}-200/60 rounded-2xl p-4 border-l-[3px] border-l-{accent}-500 leading-relaxed`
  - Frosted Evolution/Info Panel: `bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-{accent}-500/80`
- **Simulator Shell Dark Panel Standards (มาตรฐานกล่องจำลองมืด — 2 ระดับ)**:
  - **Left Control Panel** (ฝั่งควบคุม/ซ้าย): `bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl` — ตามด้วย label ฉลากเล็ก `text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest`
  - **Right Data/Oscilloscope Panel** (ฝั่งแสดงผล/ขวา): `bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl` — ตามด้วย label `text-[9px] font-mono text-slate-500 absolute top-3 left-3`
  - ห้ามใช้ `bg-[#0f172a]` หรือ `bg-slate-950` เดี่ยวๆ โดยไม่มี `backdrop-blur` — ต้องมีเสมอเพื่อความสอดคล้อง
- **Interactive Icon Standard (มาตรฐานไอคอนโต้ตอบขยับได้)**:
  - ทุกปุ่มหรือการ์ดที่โต้ตอบได้ ควรหุ้มด้วย Wrapper ที่มีสถานะกลุ่ม (`group cursor-pointer`) และมีจานรองไอคอนกึ่งโปร่งแสง (เช่น `p-3 rounded-2xl bg-{accent}-50/80 text-{accent}-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner`)
  - ไอคอนของ Lucide-React ต้องเปลี่ยนสีและเคลื่อนไหวอย่างสมูทเมื่อถูกโฮเวอร์ เช่น หมุนเบาๆ (`transition-transform group-hover:rotate-12 duration-300`), กะพริบเป็นจังหวะ (`group-hover:animate-pulse`) เพื่อให้ UI รู้สึกมีชีวิตชีวา
- **Interaction**: เมื่อคลิกหรือโต้ตอบ ห้ามมีอาการหน่วงเกิน 200ms

---

## 🌌 4. Immersive Full-Page Standard (มาตรฐานเลย์เอาต์ระดับพรีเมียม)
ทุกบทเรียนแบบ Interactive/Simulator ต้องถูกสร้างแบบ "หน้าต่างไร้ขอบ (Seamless)" เรียงตัว 4 เลเยอร์ตามแนวดิ่ง (Vertical Stack) ดังนี้:

**1️⃣ Layer 1: Ambient Backdrop & Dynamic Theme Gradients**
- สีพื้นหลังหลักของบอดี้ภายนอกต้อง **เป็นอันเดียวกันเสมอกันทุกบทเรียน** (เช่น โทนสว่างคงที่ #FAFAFA หรือธีมมืดคงที่ตามระบบ)
- เพื่อสร้างมิติเด่น ให้ใช้ **เลเยอร์ล่างสุด (Layer 1)** ทำการไล่โทนสีเรืองแสง (Gradients) ฟุ้งข้ามขอบเฟรม โดยสามารถสุ่มเฉดหรือปรับแต่งคู่สีอิสระสะท้อนธีมแต่ละบทเรียน/หัวข้อ (สุ่มอิสระตามหัวข้อ) เพื่อความสวยงามแปลกใหม่และไม่จำเจ
- ใช้โครงสร้าง `<div className="fixed inset-0 overflow-hidden pointer-events-none z-0">...วงกลมเรืองแสงสุ่มโทนสีฟุ้ง blur-[120px] หรือ blur-[160px]...</div>`

**2️⃣ Layer 2: Standardized Hero Header**
- ส่วนหัวพรีเมียมที่ประกอบด้วย: รหัสหัวข้อย่อยสีเด่น, ชื่อบทภาษาไทยตัวหนา, ส่วนขยายภาษาอังกฤษสไตล์ Gradient และกล่องคำอธิบายแนวคิดขอบหนาด้านซ้าย
- **ข้อกำหนดการจัดเลย์เอาต์แบบกระชับ (Compact Header Spacing Standard):** ห้ามทำระยะห่างของส่วนหัวบทเรียนเคว้งหรือกว้างเกินไป ให้ใช้ระยะห่างตามเกณฑ์มาตรฐานนี้เสมอ:
  - ขนาด Padding ของ Header: หากอยู่ในหน้าการ์ด (`isCard`) บังคับใช้ `p-6 md:p-8` หากอยู่ในหน้าแบบไร้ขอบ (`immersive`) บังคับใช้ `pt-8 pb-4 md:pt-10 md:pb-5`
  - ระยะห่างและคลาสของชื่อภาษาอังกฤษ (Subtitle): ให้ใช้ `mb-3` คู่กับ `pb-2 leading-normal` เพื่อช่วยกระชับพื้นที่ร่วมกับการป้องกันบัก Clipping ของตัวอักษรภาษาไทย/อังกฤษที่มีหางยาวอย่างปลอดภัย
  - เส้นแบ่งคั่นเนื้อหา: ให้ปรับระยะขอบของเส้นแบ่งคั่น `div` จากมาตรฐานเดิมเป็น `my-3` เพื่อความกระชับ
  - การ์ดขอบซ้ายและคำอธิบายสังเขป: ให้ใช้คลาส `border-l-[3px] border-teal-500/80 pl-3.5 py-0.5` และเปลี่ยนขนาดตัวอักษรเป็น `text-[15px] md:text-base text-slate-500` เนื่องจากเป็นเพียงส่วนอธิบายเนื้อหาภายในโดยสังเขปเท่านั้น
- **ข้อกำหนดเพิ่มเติม (New Standard):** ชื่อภาษาอังกฤษ (Subtitle) ต้องใช้ตัวอักษรขนาดใหญ่ (`text-3xl md:text-5xl`) และใช้ระบบสุ่มสีไล่ระดับ `text-transparent bg-clip-text bg-gradient-to-r` อย่างสวยงาม
- ⚠️ **CRITICAL BUG FIX สำหรับ `bg-clip-text`**: เมื่อใช้การไล่สีกับข้อความภาษาไทย/อังกฤษที่มีหางยาว (p, y, j, g) **ห้ามใช้ `!p-0`** และ **ต้องใส่คลาส `pb-2 leading-normal` เสมอ** เพื่อป้องกันไม่ให้หางของตัวอักษรโดนตัดขาด (Clipping Mask Issue)
- *อนุญาตให้ AI ปรับสี Accent / Gradient ให้เข้ากับธีมของวิชาได้อิสระ*

**3️⃣ Layer 3: Flexible Subtopics & Interactives**
- พื้นที่อิสระตรงกลางสำหรับ Simulator หรือมินิเกม
- **ข้อกำหนดเพิ่มเติม (Alignment Standard & Compact Card Spacing):**
  - ต้องห่อหุ้มเนื้อหาทั้งหมดใน Layer 3 ด้วยแท็ก `<main>` ที่มีคลาสระยะขอบพื้นฐานคือ `max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16` เสมอ
  - เส้นขอบขวา-ซ้าย (Alignment) ของการ์ดและปุ่มต้องตรงแนวเดียวกับ StandardHeader และ TeacherTask ด้านล่างอย่างสมบูรณ์แบบ
  - **ดีไซน์เปิดโปร่งโล่งแบบไร้กรอบ (Fluid Open-Air Layout Standard)**: หลีกเลี่ยงการห่อหุ้มคำอธิบายทฤษฎีทั่วไปด้วยกรอบการ์ดที่ทึบและหนาซ้อนกล่อง แต่ให้ปล่อยพาดหัวและตัวอักษรเนื้อหาหลักเขียนตรงลงบนเลเยอร์พื้นหลังหน้าเว็บโดยตรง เพื่อให้เลย์เอาต์ดูโปร่งโล่ง สะอาดตา มีมิติเหมือนนิตยสารเทคโนโลยีหรือหน้าหนังสือเรียนดิจิทัลที่พรีเมียมและเบาสบายสายตา
  - **สเปสและระยะตั้งที่เชื่อมโยง (Tighter Spacing & Vertical Flow)**: กำหนดให้ใช้ระยะห่างแนวตั้ง `space-y-12 md:space-y-16` ในการคุมบล็อกและหัวข้อย่อยทั้งหมดบนหน้ากระดาษหลัก เพื่อให้การเลื่อนอ่านเชื่อมโยงเรียงกันลื่นไหลอย่างต่อเนื่อง
- **Subtopic Section Header Standard (มาตรฐานหัวบล็อกหัวข้อย่อย — บังคับทุกหัวข้อ):**
  - ทุก Section/หัวข้อย่อยใน Layer 3 ต้องขึ้นต้นด้วยโครงสร้างนี้เสมอ (ห้ามละ):
  ```jsx
  <section className="space-y-6">
    <div className="border-b border-zinc-200/80 pb-4">
      <span className="text-sm font-bold text-{accent}-600 tracking-wider uppercase">
        {หมวดวิชาการ/ชื่อย่อหัวข้อภาษาไทย}
      </span>
      <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
        {ชื่อหัวข้อย่อยทางวิชาการเต็ม}
      </h3>
    </div>
    {/* เนื้อหาทฤษฎีและ Simulator ด้านล่าง */}
  </section>
  ```
  - `{accent}` ต้องสอดคล้องกับธีมสีของหน่วยการเรียน (เช่น `emerald` สำหรับหน่วย Network, `indigo` สำหรับ Wireless, `blue` สำหรับ OS เป็นต้น)
- ต้องรักษาความหรูหราแบบ Genesis (Clean, ฟอนต์ Outfit/Inter, มีการเคลื่อนไหวตอบสนองนุ่มนวล)

**4️⃣ Layer 4: Standardized TeacherTask Footer**
- กล่องโจทย์หรือกิจกรรมท้ายบทเรียน ที่ออกแบบไว้สมบูรณ์แล้ว
- **กฎเหล็ก: ห้ามแก้ไขโค้ดการทำงานของกล่อง TeacherTask เดิมเด็ดขาด** (ให้รักษารูปแบบที่มี Gradient Border, ปุ่มคัดลอกโจทย์ และ Box โค้ดด้านล่างเอาไว้เสมอ)


---

## 🃏 5. ระบบการ์ดและตัวจำลองเนื้อหา (Content Card & Simulator Design Principles)

> **หลักการสำคัญ**: ส่วนนี้กำหนด **แนวคิด** ในการออกแบบ ไม่ใช่กฎตายตัว AI ต้องนำหลักการไปประยุกต์ใช้กับเนื้อหาทุกประเภท และมีความยืดหยุ่นสร้างสรรค์รูปแบบใหม่ที่เหมาะสมกับบริบทนั้นๆ ได้เสมอ

### 5.1 หลักการ: สีต้องสื่อความหมาย (Semantic Color)
แต่ละ concept ในบทเรียนควรมีสีประจำตัวที่ **สะท้อนบุคลิกของมัน** ไม่ใช่สุ่มสี — แต่ก็ไม่ต้องผูกมัดกับสีเดิมซ้ำๆ ทุกครั้ง

**วิธีคิดเลือกสี:**
- ค่า/แนวคิดที่มีความหมาย "บวก/เพิ่ม/ถูกต้อง" → โทนเขียว หรือ อบอุ่น (emerald, teal, amber)
- ค่า/แนวคิดที่มีความหมาย "ลบ/ลด/ผิด" → โทนแดง-ชมพู (rose, red, pink)
- ค่า/แนวคิดที่เชื่อมต่อ/รวม → โทนม่วง-คราม (violet, purple, indigo)
- ค่า/แนวคิดที่แยก/ต่าง → โทนส้ม-อำพัน (orange, amber)
- กลุ่มแนวคิดหนึ่งๆ ใช้ accent สีเดียวกันสม่ำเสมอ เพื่อให้ผู้เรียนจดจำกลุ่มได้
- ใน **บทเรียนเดียวกัน** ห้ามใช้สีซ้ำกัน 2 concepts เพื่อให้แยกแยะได้ชัดเจน

### 5.2 หลักการ: พื้นหลังการ์ดต้องมีชีวิต (Card Background Vitality)
การ์ดเปล่าสีขาว 100% คือสิ่งที่ต้องหลีกเลี่ยง แต่การตกแต่งต้องไม่รบกวนเนื้อหา

**แนวทางที่ใช้ได้:**
- **Corner Accent Blob**: วงกลม/รูปทรงสีฟุ้ง opacity ต่ำที่มุมการ์ด — ให้ความรู้สึก "มีสีสัน" โดยไม่ดึงความสนใจ
- **Gradient Background**: ไล่สีอ่อนๆ สองโทนเดียวกัน เช่น `from-violet-50 to-white` หรือ `from-slate-50 to-indigo-50/30`
- **Subtle Border**: ขอบบางพอดูออก ไม่ต้องหนาเกิน — อาจ match สีกับ accent ของหัวข้อ
- **ลูกเล่นอื่นๆ ได้**: pattern SVG, diagonal stripe, inner glow — ขึ้นอยู่กับบริบทของบทเรียน
- **สิ่งที่ต้องคงไว้**: พื้นที่เนื้อหาต้องอ่านง่าย ไม่มีสีพื้นหลังที่ขัดกับตัวอักษร

### 5.3 หลักการ: Hierarchy ที่ชัดเจนในการ์ด (Visual Hierarchy)
ภายในการ์ดหนึ่งใบ ต้องมีลำดับความสำคัญที่ตาอ่านได้ทันที:

1. **ระดับ 1 — สัญลักษณ์/หัวข้อหลัก**: ใหญ่ที่สุด, มีสี accent, font mono หรือ bold ตามความเหมาะสม
2. **ระดับ 2 — ชื่อ/คำอธิบายสั้น**: ขนาดกลาง, สีเข้มพอ่านง่าย (`text-slate-800`)
3. **ระดับ 3 — รายละเอียด/คำอธิบายยาว**: ขนาดเล็กลง, สีเบาลง (`text-slate-500`)
4. **ระดับ 4 — Interactive Strip/ตัวอย่าง**: พื้นหลังแตกต่างจากการ์ด เช่น `bg-slate-50` เพื่อสร้างความแตกต่างระดับ

### 5.4 หลักการ: Simulator ต้องสื่อ Flow ได้ด้วยตา (Visual Flow Design)
ตัวจำลองควรออกแบบให้ผู้เรียน **เข้าใจ input → process → output** โดยไม่ต้องอ่านอธิบาย

**แนวคิดการออกแบบ Simulator:**
- มี **ทิศทางการไหล** ชัดเจน: ซ้ายไปขวา หรือบนลงล่าง
- **Input** ต้องดูคลิกได้ (affordance) — มีสีหรือ border บอกว่าเปลี่ยนได้
- **Operator/Process node** ต้องเด่นชัดแยกจาก input/output — สีต่างกัน, รูปทรงต่างกัน
- **Output** ต้องเปลี่ยนสีหรือรูปร่างตามผลลัพธ์ทันทีที่ input เปลี่ยน
- **Formula Bar** ด้านล่าง (ถ้ามี) แสดงสูตรพร้อมสีตาม semantic — สีเขียว=True, สีแดง=False
- **การเชื่อมต่อนิ่งตรงกึ่งกลาง (Absolute Center Connection Standard)**: ในการจำลองผังการไหลหรือเมนบอร์ดคอมพิวเตอร์ เส้นเชื่อมและทองแดงนำสัญญาณ (SVG paths) ต้องวิ่งเข้าและออกจากจุดกึ่งกลาง (Absolute Center) ของโมดูลหรือกรอบเป้าหมายอย่างพอดี 100% ห้ามมีรอยเหลื่อม บิดเบี้ยว หรือไม่ตรงแกน โดยคำนวณและตั้งพิกัดการจัดวาง x, y ของแต่ละโมดูลอย่างเป็นสมมาตร (เช่น แกนกลางแนวตั้ง x = 400 กว้าง 140 เพื่อให้จุดกึ่งกลางที่ x = 400 เสมอ) และเขียนทางเชื่อมต่อเป็นเส้นตรงฉาก 90 องศา (Orthogonal Path)
- รูปแบบไม่ตายตัว: บางบทเรียนเหมาะ flow แนวนอน บางบทเหมาะ tree diagram หรือ circular


### 5.5 หลักการ: Grid ต้องสมดุลและหายใจได้ (Balanced Grid)
การจัดวางการ์ดหลายใบต้องดูสมดุลในทุกขนาดหน้าจอ

- เนื้อหา **2–4 หัวข้อ**: grid 2–3 คอลัมน์ คือช่วงที่สวยที่สุด
- เนื้อหา **5–6 หัวข้อ**: 3 คอลัมน์ หรือ 2 แถว 3 คอลัมน์ (3+3)
- เนื้อหา **7+ หัวข้อ**: พิจารณาแบ่ง Section หรือใช้ Tabs แทน — อย่ายัดทุกอย่างในกริดเดียว
- Gap ระหว่างการ์ด: อย่างน้อย `gap-4` ให้การ์ดหายใจ ไม่ชนกัน
- ระยะห่างระหว่างกลุ่ม Section: `space-y-10` ขึ้นไป

### 5.6 หลักการ: Section Grouping เมื่อเนื้อหาซับซ้อน (Content Grouping)
เมื่อบทเรียนมีแนวคิดหลายประเภท (เช่น ทั้ง operators และ boolean values และ simulator) ให้แยกเป็น Section มีกรอบล้อมรอบ

**แนวคิด:**
- แต่ละ Section มีชื่อและอาจมีสี accent ของตัวเอง
- พื้นหลัง Section ต่างจากพื้นหลังหน้า — gradient อ่อน, มุมโค้ง, shadow เบา
- Section ไม่จำเป็นต้องหน้าตาเหมือนกัน — Section หนึ่งอาจเป็น card grid, อีก Section เป็น simulator, อีกอันเป็น code example

---

## 🧠 6. Continuous Training (การเรียนรู้รสนิยมด้านความงาม)
- **จับทางดีไซน์**: ให้ AI สังเกตและจดจำรสนิยมของผู้ใช้ (เช่น ผู้ใช้อาจชอบความโปร่งใสแบบ Glassmorphism มากขึ้น หรือชอบสี Gradient โทนใดเป็นพิเศษ)
- หากผู้ใช้สั่งแก้ UI ให้เป็นไปในทิศทางเดียวกันหลายๆ ครั้ง ให้คุณเพิ่มกฎใหม่นั้นลงในหมวด `Design Tokens` หรือ `Component Standards` ของไฟล์นี้ทันที เพื่อให้ไม่ต้องถูกสั่งแก้ซ้ำอีก
- **ความชอบล่าสุด (31 May 2026 — ยืนยันจาก Unit 4 ทั้งหมด)**:
  - **Glassmorphism Cards**: ทุกการ์ดเนื้อหาทฤษฎีต้องเปลี่ยนจาก `bg-gradient-to-br from-{color}-50/60 to-white` → เป็น `bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl` ทันที
  - **Frosted Glass Callout**: กล่องเน้นสำคัญต้องใช้ `bg-{accent}-50/60 backdrop-blur-md border border-{accent}-200/60 rounded-2xl p-4 border-l-[3px] border-l-{accent}-500` แทนกล่องสีเพลนธรรมดา
  - **Simulator Dark Panel**: แผงควบคุม (ซ้าย) ใช้ `bg-slate-900/90 backdrop-blur-xl` | แผงแสดงผล (ขวา) ใช้ `bg-slate-950/95 backdrop-blur-xl` — **ห้ามใช้ `bg-[#0f172a]` ดิบๆ**
  - **Interactive Icon Container**: ทุกไอคอนประกอบการ์ดต้องมี `p-3 rounded-2xl bg-{accent}-50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner shrink-0` เสมอ
  - **Subtopic Section Header**: ทุกบล็อกหัวข้อย่อยต้องนำด้วย `<span className="text-sm font-bold text-{accent}-600 tracking-wider uppercase">` + `<h3 className="text-[26px] font-semibold text-zinc-900">` + เส้น divider `border-b border-zinc-200/80 pb-4`
  - **Ambient Blobs**: ทุกหน่วยต้องมี 4 blob ในโทนสีที่ต่างกัน ขนาดสลับกัน และตำแหน่งอยู่ตามมุม 4 ด้าน (top-left, top-right, bottom-left, center-right) เพื่อมิติที่สมดุล
  - ผู้ใช้ชอบ Concept Card แบบสีขาวมีพื้นการ์ดมีชีวิต, สีต่างกันต่อ concept ตาม semantic, Grid layout สมดุล, Section grouping เมื่อมีหลายประเภท, Logic/Flow simulator ที่ดูง่าย interactive ได้จริง
  - **ดีไซน์เปิดโปร่งโล่งแบบไร้กรอบ (Fluid Open-Air) & การลดระยะห่างกระชับ (Compact Spacing)**:
    - ปล่อยทฤษฎีอธิบายทั่วไปและพาดหัวเนื้อหาเขียนตรงลงบนเลเยอร์พื้นหลังหลักโดยตรง ปราศจากการ์ดหนาทึบล้อมรอบซ้อนกล่อง เพื่อสร้างลุคที่สะอาด สะดุดตา
    - **การแต่งเติมความสวยงามในจุดข้อความเยอะ (Rich Typography for Text Blocks)**: ป้องกันไม่ให้จุดที่ข้อความเยอะดูจืดชืดหรือไม่มีลูกเล่น โดยการใช้:
      - ไฮไลท์คำศัพท์ทางเทคนิคหลัก (Key Vocabulary) ด้วยกล่องข้อความขนาดจิ๋ว (Mini Inline Badges) โทนสี HSL แบบโปร่งแสงกึ่งกระจก (เช่น `bg-teal-50/50 border border-teal-200/50 text-teal-700`)
      - ใช้บล็อกเน้นข้อความแบบโปร่งแสงขอบมน (Frosted Glass Callouts) ล้อมบางทฤษฎีสำคัญ พร้อมขอบสีนีออนหนา 3px ทางด้านซ้ายเพื่อดึงดูดสายตา
      - ตกแต่งจุดหัวข้อย่อยที่มีรายการ (Bulleted Lists) โดยเปลี่ยนจุดกลมสีดำดั้งเดิมเป็นไอคอนนำสายตารูปหัวลูกศร (เช่น `ArrowRight` ขนาดเล็ก) หรือเครื่องหมายติ๊กถูกสีเขียวนีออน
  - **การเชื่อมต่อนิ่งตรงกึ่งกลาง (Absolute Center Connection)**: เส้นสายทางนำสัญญาณ (SVG trace paths) ทั้งหมดในการทำงานจำลองผังไหลหรือเมนบอร์ด ต้องเล็งเข้าและออกจากศูนย์กลางทางเรขาคณิต (Absolute Center) ของโมดูลเป้าหมาย 100% ปราศจากเส้นคดเคี้ยวหรือบิดเบี้ยว
- **หลักการสำคัญ**: UI "ต้องสวย สมดุล อย่างมีหลักการ" — ไม่ใช่แค่ใส่สีเยอะ แต่ทุกอย่างต้องมีเหตุผล สื่อความหมาย และอ่านง่าย
- **การสแกนความบกพร่องทางดีไซน์ (Impeccable UI Quality Check)**: บังคับใช้ระบบการสแกนด้วยเครื่องมือ `impeccable detect` เป็นค่าเริ่มต้นเพื่อตรวจสอบและป้องกันการปนเปื้อนของโครงสร้าง UI ที่ซ้ำซากหรือลดทอนระดับความพรีเมียมของระบบ




