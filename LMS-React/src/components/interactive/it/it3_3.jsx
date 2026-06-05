/**
 * it3_3.jsx — หน่วยที่ 3.3 กระบวนการติดตั้งระบบปฏิบัติการและตั้งค่าพื้นฐาน
 * ====================================================================
 * Vertical Stacking Page Architecture: 5 subtopics + Interactive Demos + Quiz + Task
 * Immersive Full-Page Standard (4 Layers) — Fluid Open-Air Layout
 * NO sounds | NO dynamic Tailwind | Local State only
 * Deduplication via reuse of Shared Base Components
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  Monitor, Cpu, MemoryStick, HardDrive, Terminal, Layers, ArrowRight,
  RotateCcw, Play, Pause, Plus, Trash2, CheckCircle2, AlertTriangle,
  HelpCircle, Server, User, AppWindow, Database, RefreshCw, Info, Check,
  ShieldAlert, Settings, ChevronRight, FileText, Key, Award, AlertCircle,
  Globe, Keyboard, ShieldCheck, Lock, Eye, EyeOff, Wifi
} from 'lucide-react';
import {
  AmbientBackdrop,
  SimulatorShell,
  ConsoleScreen,
  OptionSelector,
  QuizEngine,
  ConceptCard,
  SectionBlock
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

/* ═══════════════════════════════════════════════════════════════════
   AMBIENT BACKDROP THEME — IT Unit 3 (Indigo/Cyan/Fuchsia/Purple Neon)
   ═══════════════════════════════════════════════════════════════════ */
const IT3_3_BLOBS = [
  { color: 'bg-indigo-300',  size: 'w-[450px] h-[450px]', position: '-top-20 -left-20',       opacity: 'opacity-30' },
  { color: 'bg-sky-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-20',      opacity: 'opacity-25' },
  { color: 'bg-fuchsia-200', size: 'w-96 h-96', position: '-bottom-20 left-1/4',     opacity: 'opacity-20' },
  { color: 'bg-cyan-200',    size: 'w-80 h-80', position: 'top-2/3 right-1/3',       opacity: 'opacity-20' },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA: QUIZ FOR UNIT 3.3
   ═══════════════════════════════════════════════════════════════════ */
const QUIZ_LEVELS = [
  {
    title: 'โจทย์ที่ 1: ความแตกต่างและวัตถุประสงค์ของ Clean Install',
    desc: 'การติดตั้งระบบปฏิบัติการแบบ "ล้างระบบ" (Clean Install) มีข้อดีสำคัญที่สุดเหนือกว่าการปรับรุ่นระบบ (Upgrade Install) อย่างไรในทางช่างไอที?',
    options: [
      { key: 'A', text: 'ไม่จำเป็นต้องสำรองข้อมูลดิสก์เดี่ยวเนื่องจากระบบจะเก็บไว้ใน Cloud อัตโนมัติ', isCorrect: false },
      { key: 'B', text: 'ช่วยขจัดไฟล์ขยะ ทะลายรีจิสทรีที่เสียหาย และสปายแวร์ตกค้างเดิม ส่งผลให้ไดรฟ์รันระบบได้เต็มความสามารถสดใหม่', isCorrect: true },
      { key: 'C', text: 'บังคับให้พอร์ตสัญญาณเน็ตเวิร์กเปลี่ยนจากสายทองแดงไปสู่สายใยแก้วนำแสง', isCorrect: false },
      { key: 'D', text: 'ช่วยประหยัดเวลาการติดตั้งได้มากกว่า 90% เนื่องจากระบบข้ามขั้นตอนการฟอร์แมต', isCorrect: false }
    ],
    tip: 'Clean Install ลบล้างโครงสร้างตรรกะเดิมทั้งหมดเพื่อความมั่นคงและประสิทธิภาพที่ดีที่สุด'
  },
  {
    title: 'โจทย์ที่ 2: บทบาทของ System Reserved Partition',
    desc: 'พาร์ติชันขนาดจิ๋วประเภท System Reserved (หรือ EFI System Partition) ที่ถูกสร้างขึ้นระหว่างจัดโครงสร้างดิสก์มีบทบาทหน้าที่อย่างไร?',
    options: [
      { key: 'A', text: 'ใช้สำหรับเป็นพื้นที่สตรีมมิ่งความเร็วสูงเพื่อเปิดดูวิดีโอ 4K', isCorrect: false },
      { key: 'B', text: 'จัดเก็บไฟล์การบูตระบบ (Boot Configuration Data - BCD) และรหัสตรวจสอบความปลอดภัยระดับกายภาพในการเรียก OS', isCorrect: true },
      { key: 'C', text: 'ใช้เก็บโฟลเดอร์สำรองข้อมูล OneDrive ทั้งหมดของพนักงานออฟฟิศ', isCorrect: false },
      { key: 'D', text: 'เป็นพื้นที่จำกัดสิทธิ์ผู้ใช้ทั่วไปไม่ให้เข้าเล่นโปรแกรมประยุกต์', isCorrect: false }
    ],
    tip: 'พื้นที่สำรองระบบนี้มีความจำเป็นวิกฤตในการทำหน้าที่ประคับประคองไฟล์เริ่มต้นระบบเพื่อส่งต่อให้ Kernel'
  },
  {
    title: 'โจทย์ที่ 3: บทบาทและหน้าที่ของเฟส OOBE Wizard',
    desc: 'กระบวนการ Out-of-Box Experience (OOBE) ในการตระเตรียมตั้งค่าระบบปฏิบัติการเกิดขึ้นที่จุดใดของกระบวนการติดตั้ง?',
    options: [
      { key: 'A', text: 'เกิดขึ้นก่อนขั้นตอน Power-On Self-Test (POST) ของเมนบอร์ด', isCorrect: false },
      { key: 'B', text: 'เกิดขึ้นหลังจากระบบคัดลอกไฟล์หลักเสร็จสิ้นและเปิดเครื่องเข้าสู่หน้าจอตั้งค่าพื้นที่มนุษย์ (Region, Language, Account)', isCorrect: true },
      { key: 'C', text: 'เป็นขั้นตอนสุดท้ายในการลบไดรฟ์พาร์ติชันและล้างบอสคีย์เมนบอร์ด', isCorrect: false },
      { key: 'D', text: 'รันขึ้นเมื่อผู้ใช้ส่งคำสั่งขอแก้ช่องโหว่ความมั่นคงทางระบบเครือข่าย', isCorrect: false }
    ],
    tip: 'OOBE คือหน้าจอวิซาร์ดสีสันสดใสที่ต้อนรับผู้ใช้งานให้จัดสรรภาษา แป้นพิมพ์ และลงทะเบียนบัญชีส่วนบุคคล'
  },
  {
    title: 'โจทย์ที่ 4: ความปลอดภัยในการแชร์ข้อมูล Telemetry',
    desc: 'ในการตั้งค่าหน้าต่างแชร์ความเป็นส่วนตัว (Privacy Settings) หลังติดตั้งระบบปฏิบัติการ การปิดสวิตช์ส่งข้อมูล Diagnostic Data มีจุดประสงค์เพื่ออะไร?',
    options: [
      { key: 'A', text: 'เพื่อประหยัดแรงดันไฟฟ้าและถนอมวงจรกราฟิก GPU', isCorrect: false },
      { key: 'B', text: 'เพื่อจำกัดการส่งประวัติการพิมพ์ ตำแหน่ง และรายงานพฤติกรรมโฮสต์ (Telemetry) กลับไปที่เซิร์ฟเวอร์ผู้พัฒนาซอฟต์แวร์', isCorrect: true },
      { key: 'C', text: 'เพื่อช่วยป้องกันปัญหาไฟตกของอุปกรณ์จัดจ่ายไฟ PSU', isCorrect: false },
      { key: 'D', text: 'เพื่อบังคับให้เครื่องเปลี่ยนพาร์ติชันจาก GPT ย้อนกลับไปสู่ MBR', isCorrect: false }
    ],
    tip: 'Telemetry คอยสังเกตสถิติมนุษย์ การปิดสวิตช์ความเป็นส่วนตัวช่วยรักษาพฤติกรรมไม่ให้รั่วไหลออกสู่สาธารณะ'
  },
  {
    title: 'โจทย์ที่ 5: การเปรียบเทียบประเภทบัญชีผู้ใช้ระบบ',
    desc: 'ข้อดีประการสำคัญของการเลือกใช้ Microsoft Account (Cloud-based) แทนที่จะใช้ Local Offline Account ในการตั้งค่าเครื่องคือข้อใด?',
    options: [
      { key: 'A', text: 'คอมพิวเตอร์สามารถรันระบบโดยไม่ต้องเชื่อมต่อสาย LAN และกระแสไฟฟ้าได้เลย', isCorrect: false },
      { key: 'B', text: 'ระบบจะซิงค์การตั้งค่า รหัสผ่าน บัญชี และไฟล์งาน OneDrive ข้ามเครื่องให้อัตโนมัติ พร้อมสิทธิ์กู้บัญชีระดับคลาวด์', isCorrect: true },
      { key: 'C', text: 'ทำให้ความเร็วในการประมวลผล CPU Cores แรงขึ้น 2 เท่าข้ามข้อจำกัดกายภาพ', isCorrect: false },
      { key: 'D', text: 'สิทธิ์ลิขสิทธิ์จะได้รับการเปลี่ยนจากประเภท OEM ไปเป็น Retail ทันที', isCorrect: false }
    ],
    tip: 'Cloud Account เชื่อมต่อบริการอินเทอร์เน็ตทำให้การแชร์ข้อมูลและอำนวยความสะดวกเป็นไปอย่างเชื่อมโยง'
  }
];

export default function ComponentName() {
  return (
    <>
      {/* Layer 1: Ambient Backdrop & Dynamic Theme Gradients */}
      <AmbientBackdrop blobs={IT3_3_BLOBS} />

      {/* Layer 3: Flexible Subtopics & Fluid Open-Air Layout */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── SUBTOPIC 3.3.1 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">การล้างติดตั้งระบบ</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ขั้นตอนการติดตั้ง OS แบบล้างระบบ (Clean Install)
            </h3>
          </div>
          
          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในงานสนับสนุนและบริการทางไอที <strong>การติดตั้งระบบปฏิบัติการแบบล้างระบบ (Clean Install)</strong> 
              คือกระบวนการลบพื้นที่โครงสร้างตรรกะเดิมทั้งหมดบนฮาร์ดไดรฟ์เป้าหมาย ฟอร์แมตเพื่อสร้างสารบัญระบบไฟล์ขึ้นใหม่ 
              แล้วเขียนชุดคำสั่งซอฟต์แวร์ระบบปฏิบัติการลงไปอย่างสดใหม่ 100% 
              กระบวนการนี้ส่งผลให้ได้ระบบที่ปราศจากไฟล์ขยะ ไดรเวอร์ชนกัน หรือช่องโหว่มัลแวร์ที่แฝงตัวอยู่ในโครงสร้างระบบเดิม
            </p>
            <p>
              ขั้นตอนแรกเริ่มสุดของการติดตั้งหลังจากบูตผ่านสื่อติดตั้ง <span className="px-1.5 py-0.5 mx-1 font-mono text-[13.5px] font-bold rounded bg-sky-50/50 border border-sky-200/50 text-sky-700">Bootable USB</span> 
              คือการเข้าสู่หน้าต่างวิซาร์ดต้อนรับ (Welcome Installer Interface) ซึ่งจะบังคับให้ช่างตั้งค่าภาษาหลักของระบบ 
              รูปแบบแป้นพิมพ์ที่ใช้ป้อน และมาตรฐานเขตเวลาการคำนวณทางการเงิน เพื่อสร้างความพร้อมในการรันกระบวนการติดตั้งระดับต่ำ
            </p>

            {/* Frosted Glass Callout for Tech Specs */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-indigo-600/80 mt-4 space-y-3">
              <h5 className="font-bold text-slate-800 flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-500" /> ข้อแตกต่างที่สำคัญระหว่าง Clean Install และ Upgrade
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14.5px]">
                <div className="bg-indigo-50/40 p-4 rounded-xl border border-indigo-100/60 leading-normal text-left">
                  <span className="font-bold text-indigo-700 block mb-1">🟢 Clean Install (ล้างระบบใหม่)</span>
                  - ลบดิสก์พาร์ติชัน 100% ปราศจากมัลแวร์สะสม<br />
                  - ขจัดปัญหาไฟล์คุกคาม ไดรเวอร์เก่าชนกัน<br />
                  - <span className="text-[13px] text-indigo-600 font-semibold block mt-1">💡 ต้องสำรองข้อมูลผู้ใช้งานไว้ภายนอกก่อนทำ</span>
                </div>
                <div className="bg-fuchsia-50/40 p-4 rounded-xl border border-fuchsia-100/60 leading-normal text-left">
                  <span className="font-bold text-fuchsia-700 block mb-1">🟡 Upgrade Install (ปรับรุ่นพึ่งพาระบบเดิม)</span>
                  - เก็บไฟล์ โปรแกรม และประวัติผู้ใช้เดิมไว้<br />
                  - อาจดึงเอาไฟล์แคชขยะ ไดรเวอร์พัง และช่องโหว่ความมั่นคงเดิมขึ้นมาด้วย<br />
                  - <span className="text-[13px] text-fuchsia-600 font-semibold block mt-1">💡 เสี่ยงต่อการทำงานเฉื่อยชาหรือจอฟ้าหลังติดตั้ง</span>
                </div>
              </div>
            </div>
          </div>

          {/* Installer Welcome Wizard Simulator */}
          <OsInstallWelcomeSimulator />
        </section>

        {/* ─── SUBTOPIC 3.3.2 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">การจัดโครงสร้างดิสก์</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การจัดการพาร์ติชันระหว่างกระบวนการจัดการดิสก์
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในกระบวนการเลือกที่อยู่เพื่อเขียนระบบปฏิบัติการ ช่างไอทีจะเผชิญหน้ากับเฟสการแบ่งพื้นที่ระดับตรรกะ 
              เรียกว่า **การจัดพาร์ติชัน (Disk Partitioning)** หน้าต่างการติดตั้งจะอนุญาตให้ผู้เรียนสร้าง ลบ 
              ฟอร์แมต หรือปรับแต่งขนาดเนื้อที่เพื่อแบ่งแยกสัดส่วนการบูตและการสำรองข้อมูลออกอย่างเหมาะสม
            </p>
            <p>
              เมื่อทำการแบ่งดิสก์ที่ยังว่างเปล่า (Unallocated Space) เพื่อติดตั้ง OS ระบบจะสร้างพาร์ติชันช่วยเหลือจำลองขึ้นมาโดยอัตโนมัติ:
            </p>
            <ul className="space-y-3.5 my-4">
              <li className="flex items-start text-left">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-emerald-100 text-emerald-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>System Reserved Partition / EFI System Partition:</strong> มีขนาดเล็กมาก (100MB - 500MB) มีหน้าที่จัดเก็บฐานข้อมูลการบูตไฟล์มาตรฐาน (Boot BCD) ระบบการเข้ารหัส BitLocker และไม่แสดงตัวในหน้า GUI ปกติของผู้ใช้งานเพื่อความมั่นคงปลอดภัย
                </div>
              </li>
              <li className="flex items-start text-left">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-emerald-100 text-emerald-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>Primary Partition (Drive C:):</strong> พาร์ติชันประถมภูมิขนาดหลักที่เป็นแหล่งฝังไฟล์แกนระบบปฏิบัติการ ไฟล์แอปพลิเคชันใช้งาน และข้อมูลทั่วไป
                </div>
              </li>
            </ul>
          </div>

          {/* Interactive Partition Wizard Simulator */}
          <SetupPartitionManager />
        </section>

        {/* ─── SUBTOPIC 3.3.3 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">ประสบการณ์แรกเริ่ม</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การตั้งค่าระบบเบื้องต้นระยะ Out-of-Box Experience
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              หลังจากคอมพิวเตอร์เขียนย้ายชุดคำสั่งติดตั้งจาก USB และทำการรีสตาร์ทเครื่องเป็นครั้งแรก 
              ระบบจะก้าวเข้าสู่หน้าต่างวิซาร์ดอินเทอร์เฟซที่เรียกว่า **Out-of-Box Experience (OOBE)** 
              เป็นสภาพแวดล้อมกราฟิกแผงโปร่งแสงสีสันเด่นชัด เพื่ออำนวยความสะดวกให้ผู้เรียนสามารถปรับจูนรายละเอียดสภาพแวดล้อมที่เหมาะสมกับมนุษย์
            </p>
            <p>
              ในขั้นตอนนี้ ช่างไอทีต้องตอบคำถามยืนยันกับหน้าจอวิซาร์ดในหลายองค์ประกอบสำคัญ ได้แก่:
              การระบุ **ภูมิภาค/ประเทศ (Region)** เพื่อให้เครื่องคำนวณมาตรฐานภาษีท้องถิ่นและทิศทางสัญญาณวิทยุ, 
              การจัดเลือก **โครงสร้างแป้นพิมพ์ (Keyboard Layout)** เช่น ไทยเกษมณี หรืออังกฤษแบบ QWERTY เพื่อให้สัญลักษณ์ปุ่มสอดคล้องกับพฤติกรรมการพิมพ์, 
              และการทดสอบเชื่อมโยงเครือข่ายอินเทอร์เน็ตเพื่อซิงค์สัญญาณนาฬิกาอัตโนมัติ
            </p>
          </div>

          {/* Interactive OOBE Simulator */}
          <OobeSetupWizard />
        </section>

        {/* ─── SUBTOPIC 3.3.4 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">การเข้ายืนยันตัวตน</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การสร้างบัญชีผู้ใช้งานระบบแบบกลุ่มเมฆเทียบกับบัญชีท้องถิ่น
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ระบบปฏิบัติการสมัยใหม่บังคับใช้มาตรฐานควบคุมความปลอดภัยของผู้ใช้ (User Identity) ผ่านระบบบัญชี 
              โดยกำหนดให้ผู้เรียนตัดสินใจจัดทำโครงสร้างบัญชีเข้าใช้งานออกเป็น 2 รูปแบบหลักที่มีตรรกะความปลอดภัยและสิทธิประโยชน์ต่างกัน:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 text-left">
              <div className="bg-gradient-to-br from-indigo-50/60 to-white p-5 rounded-2xl border border-indigo-100 shadow-sm space-y-2">
                <span className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 inline-block"><User className="w-5 h-5" /></span>
                <h6 className="font-bold text-indigo-950 text-[16px]">บัญชีท้องถิ่น (Local Account)</h6>
                <p className="text-[13px] text-zinc-500 leading-relaxed font-sans">
                  เป็นบัญชีแบบดั้งเดิมที่รหัสผ่านและข้อมูลประจำตัวจะถูกแฮชและล็อกไว้ภายในฐานข้อมูลความปลอดภัยภายในฮาร์ดแวร์ดิสก์เครื่องนั้นเดี่ยวๆ (SAM Database) ข้อมูลพฤติกรรมไม่หลุดไปอินเทอร์เน็ต ทว่าหากทำรหัสผ่านสูญหายจะกู้คืนได้ยากลำบากและไม่มีบริการซิงค์ไฟล์คลาวด์ข้ามเครื่อง
                </p>
              </div>
              <div className="bg-gradient-to-br from-fuchsia-50/60 to-white p-5 rounded-2xl border border-fuchsia-100 shadow-sm space-y-2">
                <span className="p-2.5 rounded-xl bg-fuchsia-100 text-fuchsia-700 inline-block"><Server className="w-5 h-5" /></span>
                <h6 className="font-bold text-fuchsia-950 text-[16px]">บัญชีคลาวด์ (Microsoft/Cloud Account)</h6>
                <p className="text-[13px] text-zinc-500 leading-relaxed font-sans">
                  บัญชีที่เชื่อมโยงตัวตนระดับบริการผ่านเครือข่ายอินเทอร์เน็ต ได้รับสิทธิ์ในการสำรองโฟลเดอร์อัตโนมัติขึ้น OneDrive ซิงค์คีย์ความลับ ซิงค์ประวัติเบราว์เซอร์ และสามารถดำเนินมาตรการความปลอดภัยสูง เช่น การยืนยันแบบสองปัจจัย (2FA) และกู้รหัสผ่านผ่านระบบอีเมลส่วนกลางขององค์กร
                </p>
              </div>
            </div>
          </div>

          {/* User Account Portal Simulator */}
          <UserAccountSimulator />
        </section>

        {/* ─── SUBTOPIC 3.3.5 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">ความเป็นส่วนตัวและความมั่นคง</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การปรับแต่งค่าการแชร์ความเป็นส่วนตัวและการตั้งค่ารหัส PIN
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ขั้นตอนสุดท้ายของการจัดตระเตรียมระบบในวิซาร์ด OOBE คือการระบุขอบเขตความเป็นส่วนตัวและการแชร์ข้อมูลพฤติกรรมมนุษย์ 
              (Privacy Settings / Telemetry) ช่างไอทีอัจฉริยะจำเป็นต้องสวิตช์ปิดการส่งข้อมูลบางกลุ่ม เช่น ข้อมูลพิกัดตำแหน่ง (Location) 
              หรือรายงานลายมือคีย์ข้อความ (Inking & Typing) เพื่อป้องกันความลับอุตสาหกรรมในสำนักงานรั่วไหล
            </p>
            <p>
              นอกจากนี้ ระบบปฏิบัติการยุคใหม่บังคับให้ผู้ใช้งานกำหนดสิทธิ์ความปลอดภัยการเปิดเครื่องระดับความเร็วสูง 
              เรียกว่าการลงทะเบียน **รหัส PIN (Personal Identification Number)** ตัวเลข 4 หลักขึ้นไป 
              ซึ่งถูกออกแบบมาเพื่อความปลอดภัยเหนือกว่ารหัสผ่านปกติ เนื่องจากรหัส PIN จะผูกติดคู่สัมพันธ์กับชิปฮาร์ดแวร์ความปลอดภัย 
              <span className="px-1 py-0.5 font-mono text-[13.5px] bg-sky-50 rounded text-sky-700">TPM 2.0</span> ในบอร์ด 
              ทำให้ต่อให้ผู้ร้ายแฮกเกอร์โจรกรรมรหัสผ่านคีย์บอร์ดไปได้จากระยะไกล ก็ไม่สามารถเข้ายึดระบบได้หากปราศจากชิปทางกายภาพจริง
            </p>
          </div>

          {/* Interactive Privacy & PIN simulator */}
          <PrivacyPinSimulator />
        </section>

        {/* ─── QUIZ ENGINE SECTION ────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">การประเมินผล</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบทดสอบวัดความรู้บทเรียนย่อย
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <QuizEngine levels={QUIZ_LEVELS} />
          </div>
        </section>

        {/* Layer 4: Standardized TeacherTask Footer */}
        <div className="pt-6">
          <TeacherTask
            title="ภารกิจจัดทำแผนงานการติดตั้งและการแบ่งพาร์ติชันสำหรับเครือข่ายองค์กร"
            taskText={`ให้นักเรียนวิเคราะห์ความต้องการเชิงลึกและเขียน "คู่มือแผนการติดตั้งระบบปฏิบัติการระดับช่างไอทีมืออาชีพ" (Installation Guide & Partitioning Scheme) สำหรับจำลองติดตั้งคอมพิวเตอร์ในห้องการเงินและแผนกทั่วไปรวม 20 เครื่อง
1. ออกแบบและวาดผังการซอยสัดส่วนฮาร์ดดิสก์ขนาด 250GB เพื่อการติดตั้ง Windows 11 ให้มีพาร์ติชันสำรองระบบ (System Reserved) และแบ่งพาร์ติชันใช้งานหลัก (Drive C:) และจัดสำรองเก็บงาน (Drive D:) อย่างสมเหตุสมผล
2. เปรียบเทียบระบุข้อดีและข้อจำกัดของการเลือกใช้ Microsoft Account เทียบกับ Local Account สำหรับพนักงานฝ่ายการเงินที่ต้องการความปลอดภัยระบบไฟล์สูงสุด
3. ทำการวางขั้นตอนและตรรกะความปลอดภัยในการเปิด-ปิดสวิตช์ Privacy Settings เพื่อลดการส่งรายงานพฤติกรรม Telemetry ป้องกันความลับรั่วไหลออกสู่นอกสถาบัน`}
          />
        </div>

      </main>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   1. OS INSTALLER WELCOME WIZARD SIMULATOR (Subtopic 3.3.1)
   ═══════════════════════════════════════════════════════════════════ */
function OsInstallWelcomeSimulator() {
  const [bootState, setBootState] = useState('press_key'); // press_key | loading | welcome | terms | installing
  const [lang, setLang] = useState('English (United States)');
  const [agreed, setAgreed] = useState(false);
  const [progress, setProgress] = useState(0);
  const installTimer = useRef(null);

  const startInstallFlow = () => {
    setBootState('loading');
    setTimeout(() => {
      setBootState('welcome');
    }, 1800);
  };

  const executeInstallation = () => {
    setBootState('installing');
    setProgress(0);
    if (installTimer.current) clearInterval(installTimer.current);

    installTimer.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(installTimer.current);
          setTimeout(() => {
            setBootState('welcome');
            setAgreed(false);
            setProgress(0);
          }, 1500);
          return 100;
        }
        return next;
      });
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (installTimer.current) clearInterval(installTimer.current);
    };
  }, []);

  return (
    <SimulatorShell
      icon={<Monitor className="w-6 h-6 text-indigo-500 animate-pulse" />}
      title="เครื่องจำลองการติดตั้งระบบปฏิบัติการ (Windows Setup welcome Simulator)"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none">
        
        {/* Retro Installer Monitor */}
        <div className="bg-[#020617] rounded-2xl p-6 border border-slate-800 flex flex-col justify-between items-center relative min-h-[380px] shadow-2xl text-left">
          <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">VIRTUAL SCREEN DIRECT OUTPUT</span>
          
          <div className="my-auto w-full flex flex-col items-center justify-center">
            {/* Stage 1: Press key to boot */}
            {bootState === 'press_key' && (
              <div className="space-y-4 text-center font-mono text-xs text-slate-400 py-10">
                <p className="animate-[pulse_1s_infinite]">Press any key to boot from USB setup device...</p>
                <button
                  onClick={startInstallFlow}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer active:scale-98 shadow-md font-sans"
                >
                  คลิกที่นี่เพื่อจำลองการส่งคำสั่งบูต
                </button>
              </div>
            )}

            {/* Stage 2: Loading screen */}
            {bootState === 'loading' && (
              <div className="text-center py-10 space-y-5">
                {/* Modern Windows Mock Logo */}
                <div className="grid grid-cols-2 gap-1.5 w-12 h-12 mx-auto animate-pulse">
                  <div className="bg-sky-500"></div>
                  <div className="bg-sky-500"></div>
                  <div className="bg-sky-500"></div>
                  <div className="bg-sky-500"></div>
                </div>
                <div className="space-y-2">
                  <RefreshCw className="w-6 h-6 text-sky-400 animate-spin mx-auto" />
                  <p className="text-[11px] font-mono text-slate-500 tracking-widest">SETUP IS INITIALIZING FILES...</p>
                </div>
              </div>
            )}

            {/* Stage 3: Welcome Wizard screen */}
            {bootState === 'welcome' && (
              <div className="w-full max-w-sm bg-[#1e293b] border border-slate-700 rounded-xl p-5 shadow-xl font-sans text-xs text-slate-200">
                <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-3">
                  <span className="font-bold text-white flex items-center gap-1.5"><Monitor className="w-4 h-4 text-sky-400" /> Windows Setup</span>
                  <span className="text-[9px] text-slate-500 font-mono">v11.0.23H2</span>
                </div>
                <div className="space-y-3.5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 block">Language to install</label>
                    <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white text-[11px] focus:outline-none">
                      <option value="English (United States)">English (United States)</option>
                      <option value="Thai (Thailand)">Thai (Thailand)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 block">Time and currency format</label>
                    <select className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white text-[11px] focus:outline-none">
                      <option>English (United States)</option>
                      <option>Thai (Thailand)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 block">Keyboard or input method</label>
                    <select className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white text-[11px] focus:outline-none">
                      <option>US QWERTY</option>
                      <option>Thai Kedmanee</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={() => setBootState('terms')}
                    className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs cursor-pointer active:scale-98 transition-all rounded-lg shadow-md shadow-sky-600/10 mt-2"
                  >
                    เริ่มกระบวนการติดตั้ง (Install Now)
                  </button>
                </div>
              </div>
            )}

            {/* Stage 4: License Terms screen */}
            {bootState === 'terms' && (
              <div className="w-full max-w-sm bg-[#1e293b] border border-slate-700 rounded-xl p-5 shadow-xl font-sans text-xs text-slate-200">
                <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-3">
                  <span className="font-bold text-white flex items-center gap-1.5"><FileText className="w-4 h-4 text-sky-400" /> License Agreement</span>
                </div>
                <div className="space-y-3.5">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 max-h-[140px] overflow-y-auto text-[10px] leading-relaxed text-slate-400 font-mono">
                    MICROSOFT SOFTWARE LICENSE TERMS<br />
                    WINDOWS OPERATING SYSTEM<br /><br />
                    1. สัญญาลิขสิทธิ์นี้จัดทำขึ้นระหว่างท่านและบริษัทไมโครซอฟท์เพื่อรันสิทธิ์ระบบปฏิบัติการ Windows 11<br />
                    2. การใช้งานข้อมูลพฤติกรรม (Telemetry) จะขึ้นตรงต่อสวิตช์ความเป็นส่วนตัวที่ท่านสลับเปิด-ปิดในเฟส OOBE<br />
                    3. การทำ Clean Install จะลบล้างพาร์ติชันระดับต่ำและคืนสิทธิ์แรม CMOS ทั้งหมด
                  </div>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-700 cursor-pointer">
                    <input
                      type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                      className="w-4.5 h-4.5 accent-sky-500 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-300 font-bold leading-none">I accept the software license terms.</span>
                  </label>

                  <div className="flex gap-2">
                    <button onClick={() => setBootState('welcome')} className="w-1/2 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 font-bold cursor-pointer active:scale-98">
                      ย้อนกลับ
                    </button>
                    <button
                      onClick={executeInstallation} disabled={!agreed}
                      className="w-1/2 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold cursor-pointer rounded-lg disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed active:scale-98 transition-all"
                    >
                      ถัดไป
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Stage 5: Installing OS Screen */}
            {bootState === 'installing' && (
              <div className="w-full max-w-sm bg-[#1e293b] border border-slate-700 rounded-xl p-5 shadow-xl font-sans text-xs text-slate-200">
                <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-4">
                  <span className="font-bold text-white flex items-center gap-1.5"><RefreshCw className="w-4 h-4 text-sky-400 animate-spin" /> Installing Windows</span>
                </div>
                <div className="space-y-4 text-left">
                  <p className="text-[11px] text-slate-300">เครื่องคอมพิวเตอร์กำลังติดตั้งย้ายระบบปฏิบัติการจำลองลงหน่วยบันทึกข้อมูลหลัก...</p>
                  
                  <div className="space-y-2 font-mono text-[10.5px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Copying files...</span>
                      <span className="text-sky-400">100%</span>
                    </div>
                    <div className="flex justify-between text-slate-200">
                      <span>Getting files ready for installation...</span>
                      <span className="text-sky-400 font-bold">{progress}%</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Installing features...</span>
                      <span>0%</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-700">
                    <div className="bg-sky-500 h-full transition-all duration-200" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full text-[10px] text-slate-600 border-t border-slate-900 pt-3">
            * <strong>สถิติน่ารู้:</strong> การติดตั้งผ่าน Bootable USB 3.1 สองจุดความเข้ากันได้ จะสามารถลดกระบวนการถ่ายโอนลงเหลือต่ำกว่า 10 นาทีสำหรับ SSD ยุคใหม่
          </div>
        </div>

        {/* Right Side Controls / Manual Info */}
        <div className="flex flex-col justify-between text-left">
          <div className="space-y-4">
            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">คำแนะนำปฏิบัติการ Clean Install</span>
            <div className="text-slate-600 text-sm leading-relaxed space-y-3.5">
              <p>
                ในกระบวนการเริ่มต้นติดตั้งวิซาร์ด Welcome Installer นอกเหนือจากการระบุภาษา แป้นพิมพ์ และวันเวลาแล้ว 
                ช่างไอทียังได้รับการสอนให้เข้าใจกระบวนการสำคัญ 3 ด้านก่อนเริ่มการลอกสำเนา:
              </p>
              
              <div className="space-y-2.5">
                <div className="bg-white/60 p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5 hover:shadow-md transition-all">
                  <span className="p-1 rounded bg-indigo-50 text-indigo-600 shrink-0"><Key className="w-4 h-4" /></span>
                  <p className="text-xs text-slate-500 leading-normal">
                    <strong>การป้อนรหัสคีย์ลิขสิทธิ์:</strong> ในกรณีทำ Clean Install หากเครื่องได้รับการลงทะเบียน Digital License ผูกกับบอร์ดไว้แล้ว สามารถกดข้าม <em>"I don't have a product key"</em> ระบบจะตรวจหาและแฮชรับสิทธิ์คลาวด์อัตโนมัติเมื่อติดตั้งเสร็จ
                  </p>
                </div>
                <div className="bg-white/60 p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5 hover:shadow-md transition-all">
                  <span className="p-1 rounded bg-indigo-50 text-indigo-600 shrink-0"><Layers className="w-4 h-4" /></span>
                  <p className="text-xs text-slate-500 leading-normal">
                    <strong>การจัดเตรียมโหมดเวอร์ชัน (Edition):</strong> ช่างต้องสืบค้นความเข้ากันได้ของระบบองค์กร เช่น พนักงานระดับสูงต้องการโดเมนความปลอดภัย Active Directory หรือฟีเจอร์ BitLocker จะต้องเลือกเวอร์ชัน <strong>Windows 11 Pro</strong> หรือ <strong>Enterprise</strong> เท่านั้น
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-sans text-xs space-y-1 mt-6">
            <h6 className="font-bold text-slate-800 flex items-center gap-1.5"><Info className="w-4 h-4 text-indigo-500" /> เกร็ดวิชาการทางช่าง:</h6>
            <p className="text-[12px] leading-relaxed">
              การสำรองข้อมูลเป็นขั้นตอนบังคับของ Clean Install เสมอ เนื่องจากขั้นตอนถัดไปใน Disk Setup 
              จะสั่งตัดการบันทึกกระแสไฟฟ้าแม่เหล็กของดิสก์และกวาดล้างพาร์ติชันเดิมเป็นศูนย์ Unallocated
            </p>
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. WINDOWS SETUP PARTITION MANAGER SIMULATOR (Subtopic 3.3.2)
   ═══════════════════════════════════════════════════════════════════ */
function SetupPartitionManager() {
  const [drives, setDrives] = useState([
    { id: 1, name: 'Drive 0 Unallocated Space', size: 100.0, type: 'Unallocated', formatted: false }
  ]);
  const [selectedId, setSelectedId] = useState(1);
  const [isNew, setIsNew] = useState(false);
  const [inputMb, setInputMb] = useState(50000); // 50,000 MB = 50 GB

  const handleSelect = (id) => {
    setSelectedId(id);
    setIsNew(false);
  };

  const deletePartition = () => {
    const selected = drives.find(d => d.id === selectedId);
    if (!selected || selected.type === 'Unallocated') {
      alert('⚠️ กรุณาเลือกพาร์ติชันหลักหรือพาร์ติชันระบบเพื่อดำเนินการสั่งลบพื้นที่!');
      return;
    }

    // Merge everything back to one single unallocated partition
    setDrives([
      { id: 1, name: 'Drive 0 Unallocated Space', size: 100.0, type: 'Unallocated', formatted: false }
    ]);
    setSelectedId(1);
    setIsNew(false);
  };

  const formatPartition = () => {
    const selected = drives.find(d => d.id === selectedId);
    if (!selected || selected.type === 'Unallocated') {
      alert('⚠️ ไม่สามารถสั่งฟอร์แมตพื้นที่ว่าง Unallocated ได้ กรุณาสร้างพาร์ติชันขึ้นมาก่อนทำ!');
      return;
    }

    setDrives(current => current.map(d => {
      if (d.id === selectedId) {
        return { ...d, formatted: true };
      }
      return d;
    }));
  };

  const applyNewPartition = () => {
    const selected = drives.find(d => d.id === selectedId);
    if (!selected || selected.type !== 'Unallocated') return;

    const reqGb = inputMb / 1000.0;
    if (reqGb <= 0.5 || reqGb > selected.size) {
      alert('⚠️ ขนาดพาร์ติชันไม่สอดคล้องกับพารามิเตอร์ของความจุพื้นที่จัดเก็บที่เหลืออยู่!');
      return;
    }

    const currentPartitionsWithoutSelected = drives.filter(d => d.id !== selectedId);
    
    // EFI / System Reserved auto partition logic simulated
    const hasSystemReserved = drives.some(d => d.type === 'System Reserved');
    
    let nextId = Math.max(...drives.map(d => d.id)) + 1;
    let newPartitions = [];

    if (!hasSystemReserved) {
      // Create a 100MB System reserved partition automatically
      const systemReservedGb = 0.1; // 100 MB
      newPartitions.push({
        id: nextId,
        name: `Drive 0 Partition ${nextId}: System Reserved`,
        size: systemReservedGb,
        type: 'System Reserved',
        formatted: true
      });
      nextId += 1;
      
      const primaryGb = reqGb - systemReservedGb;
      newPartitions.push({
        id: nextId,
        name: `Drive 0 Partition ${nextId}: Primary (C:)`,
        size: Math.max(0.5, primaryGb),
        type: 'Primary',
        formatted: false
      });
    } else {
      newPartitions.push({
        id: nextId,
        name: `Drive 0 Partition ${nextId}: Primary`,
        size: reqGb,
        type: 'Primary',
        formatted: false
      });
    }

    nextId += 1;
    const remainingGb = selected.size - reqGb;
    if (remainingGb > 0.2) {
      newPartitions.push({
        id: nextId,
        name: 'Drive 0 Unallocated Space',
        size: remainingGb,
        type: 'Unallocated',
        formatted: false
      });
    }

    const finalDrives = [...currentPartitionsWithoutSelected, ...newPartitions].sort((a, b) => a.id - b.id);
    setDrives(finalDrives);
    setSelectedId(newPartitions[1] ? newPartitions[1].id : newPartitions[0].id);
    setIsNew(false);
  };

  const totalUsed = drives.filter(d => d.type !== 'Unallocated').reduce((sum, d) => sum + d.size, 0);

  return (
    <SimulatorShell
      icon={<Database className="w-6 h-6 text-fuchsia-500" />}
      title="เครื่องจำลองกล่องจัดการพาร์ติชัน (Windows Setup Partition Manager)"
      accentBg="bg-fuchsia-50"
      iconColor="text-fuchsia-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none">
        
        {/* Windows Setup Disk Installer Box */}
        <div className="bg-[#f1f5f9] rounded-2xl p-5 border border-slate-300 flex flex-col justify-between shadow-xl relative min-h-[380px] font-sans text-xs text-slate-800 text-left">
          <span className="text-[9px] font-mono text-slate-400 absolute top-3 right-4 font-bold">WINDOWS SETUP WIZARD</span>
          
          <div className="space-y-4">
            <div>
              <h6 className="text-[13px] font-bold text-slate-900">Where do you want to install Windows?</h6>
              <p className="text-[10px] text-slate-500 leading-normal">
                จัดเตรียมพาร์ติชัน เลือกพื้นที่ แล้วดำเนินงานฟอร์แมตเพื่อสร้างโฟลเดอร์ไฟล์บูตระบบ
              </p>
            </div>

            {/* Partitions List */}
            <div className="border border-slate-300 bg-white rounded-lg overflow-hidden max-h-[180px] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 font-bold text-[10px] text-slate-500 font-mono uppercase">
                    <th className="p-2">Name</th>
                    <th className="p-2 text-right">Total Size</th>
                    <th className="p-2 text-right">Type</th>
                    <th className="p-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {drives.map(d => {
                    const isSelected = selectedId === d.id;
                    return (
                      <tr
                        key={d.id}
                        onClick={() => handleSelect(d.id)}
                        className={`border-b border-slate-100 cursor-pointer transition-all text-[11px] ${
                          isSelected 
                            ? 'bg-sky-100 text-sky-950 font-bold border-l-4 border-l-sky-600' 
                            : 'hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <td className="p-2.5 font-mono flex items-center gap-1.5">
                          <HardDrive className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-600' : 'text-slate-400'}`} />
                          {d.name}
                        </td>
                        <td className="p-2.5 text-right font-mono">{d.size.toFixed(1)} GB</td>
                        <td className="p-2.5 text-right font-mono text-[10px]">{d.type}</td>
                        <td className="p-2.5 text-center font-mono text-[9px]">
                          {d.type === 'Unallocated' 
                            ? '-' 
                            : d.formatted 
                            ? 'Formatted' 
                            : 'RAW (Needs Format)'
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Partition Controls Bar */}
            <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3 text-[10.5px]">
              <button
                onClick={deletePartition}
                className="py-1.5 px-3 bg-white border border-slate-300 rounded hover:border-red-400 hover:text-red-600 font-bold flex items-center gap-1 active:scale-98 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-500" /> Delete (ลบ)
              </button>
              
              <button
                onClick={formatPartition}
                className="py-1.5 px-3 bg-white border border-slate-300 rounded hover:border-sky-400 hover:text-sky-600 font-bold flex items-center gap-1 active:scale-98 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-sky-600" /> Format (ฟอร์แมต)
              </button>

              {drives.find(d => d.id === selectedId)?.type === 'Unallocated' && (
                <button
                  onClick={() => setIsNew(!isNew)}
                  className={`py-1.5 px-3 border rounded font-bold flex items-center gap-1 active:scale-98 transition-all cursor-pointer ${
                    isNew 
                      ? 'bg-sky-600 border-sky-600 text-white' 
                      : 'bg-white border-slate-300 hover:border-sky-400 hover:text-sky-600'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" /> New (สร้างใหม่)
                </button>
              )}
            </div>

            {/* Create New Prompt */}
            {isNew && (
              <div className="bg-white p-3 rounded-lg border border-slate-300 flex items-center justify-between gap-3 animate-[fadeIn_0.2s_ease-out]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-600">Size:</span>
                  <input
                    type="number" value={inputMb} onChange={(e) => setInputMb(parseInt(e.target.value))}
                    className="w-20 p-1 border border-slate-300 rounded font-mono text-center focus:outline-none focus:border-sky-500"
                  />
                  <span className="font-mono text-slate-500">MB</span>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={applyNewPartition} className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded cursor-pointer">
                    Apply
                  </button>
                  <button onClick={() => setIsNew(false)} className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded cursor-pointer">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="text-[10px] text-slate-500 border-t border-slate-200 pt-3">
            💡 <strong>ผลจัดสรรดิสก์:</strong> แบ่งพาร์ติชัน C: ไปแล้ว {totalUsed.toFixed(1)} GB / 100.0 GB
          </div>
        </div>

        {/* Visual Disk Map Side */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative min-h-[380px] text-left select-none">
          <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">VIRTUAL DISK SECTOR MAP</span>
          
          <div className="space-y-6 w-full my-auto">
            {/* Visual allocation block */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Drive 0 Partition mapping (100.0 GB Total)</span>
              
              <div className="w-full bg-slate-900 h-16 rounded-2xl overflow-hidden border border-slate-800 flex">
                {drives.map(d => {
                  let dColor = 'bg-slate-800';
                  if (d.type === 'System Reserved') dColor = 'bg-fuchsia-600';
                  else if (d.type === 'Primary' || d.type === 'Primary (C:)') dColor = d.formatted ? 'bg-sky-500' : 'bg-sky-800/80';
                  
                  return (
                    <div
                      key={d.id}
                      className={`${dColor} h-full border-r border-slate-950 flex flex-col justify-center items-center text-white px-1 font-mono transition-all duration-300`}
                      style={{ width: `${(d.size / 100.0) * 100}%` }}
                    >
                      <span className="text-[10px] font-bold truncate max-w-full">
                        {d.type === 'Unallocated' ? 'Unallocated' : d.type === 'System Reserved' ? 'System' : 'C:'}
                      </span>
                      <span className="text-[9px] opacity-80">{d.size.toFixed(1)}G</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tech explanation feedback */}
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-900 text-slate-400 font-sans text-xs space-y-1.5 leading-relaxed">
              <p className="font-bold text-slate-200 flex items-center gap-1.5"><Info className="w-4 h-4 text-fuchsia-400" /> วิเคราะห์แผนงานทางช่าง:</p>
              <p className="text-[11.5px] leading-normal">
                เมื่อผู้เรียนกดสั่ง <strong>New Partition</strong> ตัววิซาร์ดจัดเตรียมระบบปฏิบัติการ Windows จะทำการดึงเอาเซกเตอร์เนื้อหาแรกสุดขนาด <strong>100MB</strong> เพื่อหล่อหลอมพาร์ติชันกู้บูตพิเศษโดยอัตโนมัติ เพื่อปกป้องไฟล์สั่งงานเริ่มต้น (BCD) แยกขาดจากพาร์ติชันผู้ใช้งาน
              </p>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-sans leading-normal">
            * <strong>จริยธรรมช่างเทคนิค:</strong> ห้ามลบ System Reserved หรือ EFI partition โดยพลการหลังบูตเสร็จ เนื่องจากจะตัดขาดสายส่งสัญญาณบูตของเมนบอร์ดและสั่งเครื่องค้างจอฟ้า
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. WINDOWS OOBE SETUP WIZARD SIMULATOR (Subtopic 3.3.3)
   ═══════════════════════════════════════════════════════════════════ */
function OobeSetupWizard() {
  const [step, setStep] = useState('region'); // region | keyboard | network | finished
  const [region, setRegion] = useState('Thailand');
  const [kb, setKb] = useState('Thai Kedmanee');
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const startConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 1500);
  };

  const handleReset = () => {
    setStep('region');
    setRegion('Thailand');
    setKb('Thai Kedmanee');
    setConnected(false);
  };

  return (
    <SimulatorShell
      icon={<Globe className="w-6 h-6 text-indigo-500 animate-spin" style={{ animationDuration: '8s' }} />}
      title="เครื่องจำลองหน้า OOBE Wizard (Windows OOBE Setup Wizard)"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left">
        
        {/* OOBE Glass Panel Design */}
        <div className="bg-slate-900 rounded-[2rem] p-6 border border-slate-800 shadow-2xl relative min-h-[380px] flex flex-col md:flex-row gap-6 items-stretch justify-between">
          
          {/* Left illustration screen inside panel */}
          <div className="w-full md:w-1/3 bg-gradient-to-br from-indigo-950 to-indigo-900 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden border border-indigo-900/40">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl"></div>
            
            <div className="space-y-1 z-10">
              <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-widest block">Virtual OOBE</span>
              <p className="text-sm font-bold text-white leading-tight">Windows Setup Assistant</p>
            </div>

            <div className="z-10 text-center py-6">
              <Globe className="w-16 h-16 text-sky-400 animate-pulse mx-auto opacity-80" />
            </div>

            <p className="text-[10px] text-indigo-300 font-sans z-10 leading-normal">
              ตั้งค่าเขตสิ่งแวดล้อมเพื่อความเข้ากันได้ของระบบพอร์ทัลส่วนบุคคล
            </p>
          </div>

          {/* Right interactive choices */}
          <div className="grow flex flex-col justify-between font-sans text-xs text-slate-200">
            {step === 'region' && (
              <div className="space-y-4">
                <div>
                  <h6 className="text-[14px] font-bold text-white flex items-center gap-1.5"><Globe className="w-4.5 h-4.5 text-sky-400" /> Is this the right country or region?</h6>
                  <p className="text-[10.5px] text-slate-400 leading-normal">การกำหนดภูมิภาคควบคุมสัญชาตญาณวันเวลาและสิทธิ์วิทยุไร้สาย</p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  {['Thailand', 'United States', 'Japan'].map(r => (
                    <button
                      key={r} onClick={() => setRegion(r)}
                      className={`p-3 text-xs text-left rounded-xl border font-bold cursor-pointer transition-all duration-200 active:scale-98 flex justify-between items-center ${
                        region === r
                          ? 'border-indigo-500 bg-indigo-500/15 text-white font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      {r}
                      {region === r && <Check className="w-4 h-4 text-sky-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'keyboard' && (
              <div className="space-y-4">
                <div>
                  <h6 className="text-[14px] font-bold text-white flex items-center gap-1.5"><Keyboard className="w-4.5 h-4.5 text-sky-400" /> Is this the right keyboard layout?</h6>
                  <p className="text-[10.5px] text-slate-400 leading-normal">รูปแบบแป้นพิมพ์สอดคล้องกับคุณลักษณะปุ่มสั่งพิมพ์สากล</p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  {['Thai Kedmanee', 'US QWERTY'].map(k => (
                    <button
                      key={k} onClick={() => setKb(k)}
                      className={`p-3 text-xs text-left rounded-xl border font-bold cursor-pointer transition-all duration-200 active:scale-98 flex justify-between items-center ${
                        kb === k
                          ? 'border-indigo-500 bg-indigo-500/15 text-white font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      {k}
                      {kb === k && <Check className="w-4 h-4 text-sky-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'network' && (
              <div className="space-y-4">
                <div>
                  <h6 className="text-[14px] font-bold text-white flex items-center gap-1.5"><Wifi className="w-4.5 h-4.5 text-sky-400 animate-bounce" /> Let's connect you to a network</h6>
                  <p className="text-[10.5px] text-slate-400 leading-normal">เชื่อมโยงสัญญาณแลนไร้สายเพื่อทำการซิงค์ประวัติระดับ Cloud</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold flex items-center gap-2 text-slate-300">
                      <Wifi className="w-4 h-4 text-indigo-400" /> Virtual_Enterprise_WiFi
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Secured</span>
                  </div>

                  {connecting && (
                    <div className="flex items-center gap-2 text-sky-400 font-mono text-[10.5px]">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> ASSOCIATING NETWORK BLOCKS...
                    </div>
                  )}

                  {!connected && !connecting && (
                    <button
                      onClick={startConnect}
                      className="py-1.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer"
                    >
                      Connect (เชื่อมต่อ)
                    </button>
                  )}

                  {connected && (
                    <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Connected to network successfully.
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 'finished' && (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h6 className="font-bold text-white text-base">การตระเตรียม OOBE สำเร็จ! 🎉</h6>
                  <p className="text-slate-500 text-[11px] leading-normal max-w-xs mx-auto">
                    ระบบได้จดจำ ภูมิภาค [<strong>{region}</strong>] และคีย์บอร์ด [<strong>{kb}</strong>] เพื่อเข้าจัดสรรสภาพแวดล้อม
                  </p>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-2 pt-5 border-t border-slate-800 mt-4">
              {step === 'region' && (
                <button
                  onClick={() => setStep('keyboard')}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-center cursor-pointer active:scale-98 transition-all"
                >
                  ถัดไป (Next)
                </button>
              )}

              {step === 'keyboard' && (
                <div className="flex gap-2 w-full">
                  <button onClick={() => setStep('region')} className="w-1/2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-center cursor-pointer">
                    ย้อนกลับ
                  </button>
                  <button onClick={() => setStep('network')} className="w-1/2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-center cursor-pointer active:scale-98">
                    ถัดไป (Next)
                  </button>
                </div>
              )}

              {step === 'network' && (
                <div className="flex gap-2 w-full">
                  <button onClick={() => setStep('keyboard')} className="w-1/2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-center cursor-pointer">
                    ย้อนกลับ
                  </button>
                  <button
                    onClick={() => setStep('finished')} disabled={!connected}
                    className="w-1/2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-center disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed cursor-pointer active:scale-98"
                  >
                    ถัดไป (Next)
                  </button>
                </div>
              )}

              {step === 'finished' && (
                <button
                  onClick={handleReset}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-center cursor-pointer active:scale-98"
                >
                  เริ่มกระบวนการ OOBE ใหม่ (RESET)
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Right Info Column */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">การวิเคราะห์พฤติกรรม OOBE</span>
            <div className="text-slate-600 text-sm leading-relaxed space-y-3.5">
              <p>
                ในสภาพการจราจรข้อมูล OOBE มีเป้าหมายสูงสุดเพื่อให้มนุษย์สื่อสารได้สะดวกที่สุด โดนคำนึงถึง 2 ตรรกะหลักของสภาพแวดล้อม:
              </p>

              <div className="space-y-2">
                <div className="bg-white/60 p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5 hover:shadow-md transition-all">
                  <span className="p-1 rounded bg-indigo-50 text-indigo-600 shrink-0"><Globe className="w-4 h-4" /></span>
                  <p className="text-xs text-slate-500 leading-normal">
                    <strong>การเปิดใช้ Wi-Fi / Lan:</strong> ใน Windows 11 การเชื่อมต่อเป็นข้อบังคับวิกฤต (Strict Require) ในหน้าจอ OOBE เพื่อเช็คคลาวด์ไลเซนส์ ยกเว้นช่างเทคนิคจะใช้คีย์บอร์ดช็อตคัท <strong>Shift + F10</strong> แล้วพิมพ์คำสั่ง <code className="bg-slate-100 px-1 rounded text-red-600">OOBE\BYPASSNRO</code> เพื่อข้ามเครือข่าย
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-sans text-xs space-y-1.5 mt-6">
            <h6 className="font-bold text-slate-800 flex items-center gap-1.5"><Info className="w-4 h-4 text-indigo-500" /> เทคนิคการทำงานช่าง:</h6>
            <p className="text-[12px] leading-relaxed">
              การเลือกภูมิภาคตรงตามความจริงจะอำนวยความสะดวกในการจัดหา CDN (Content Delivery Network) ดาวน์โหลดไฟล์ไดรเวอร์ที่ใกล้ที่สุดและรวดเร็วที่สุด
            </p>
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. LOCAL VS MICROSOFT CLOUD ACCOUNT SIMULATOR (Subtopic 3.3.4)
   ═══════════════════════════════════════════════════════════════════ */
function UserAccountSimulator() {
  const [acType, setAcType] = useState('local'); // local | microsoft
  const [localName, setLocalName] = useState('');
  const [localPass, setLocalPass] = useState('');
  const [localQuestion, setLocalQuestion] = useState('คุณชื่อสัตว์เลี้ยงตัวแรกคืออะไร?');
  const [msMail, setMsMail] = useState('');
  const [stage, setStage] = useState('input'); // input | success

  const executeCreate = () => {
    if (acType === 'local') {
      if (!localName || !localPass) {
        alert('⚠️ กรุณากรอกชื่อผู้ใช้งานและรหัสรักษาความปลอดภัยของบัญชีท้องถิ่นให้เรียบร้อย!');
        return;
      }
    } else {
      if (!msMail.includes('@')) {
        alert('⚠️ กรุณากรอกอีเมลบัญชีไมโครซอฟท์ให้ถูกต้องสอดคล้องตามมาตรฐาน!');
        return;
      }
    }
    setStage('success');
  };

  return (
    <SimulatorShell
      icon={<User className="w-6 h-6 text-fuchsia-500" />}
      title="เครื่องสร้างบัญชีจำลอง (Local vs Microsoft Account Portal)"
      accentBg="bg-fuchsia-50"
      iconColor="text-fuchsia-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left">
        
        {/* Virtual Account Setup GUI */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[380px] font-sans text-xs text-slate-200">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">USER CREATION INTERFACE</span>
          
          <div className="space-y-4">
            <div>
              <h6 className="text-[13px] font-bold text-white">Let's add your personal account</h6>
              <p className="text-[10px] text-slate-400 leading-normal">
                สลับรูปแบบเพื่อสร้างสิทธิ์และประตูด่านความปลอดภัยของการล็อกอินเข้าเครื่อง
              </p>
            </div>

            {/* Toggle switch slider */}
            <div className="bg-slate-950 p-1 rounded-xl flex border border-slate-800">
              <button
                onClick={() => { setAcType('local'); setStage('input'); }}
                className={`w-1/2 py-2 text-center text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  acType === 'local' 
                    ? 'bg-fuchsia-600 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Local Offline Account
              </button>
              <button
                onClick={() => { setAcType('microsoft'); setStage('input'); }}
                className={`w-1/2 py-2 text-center text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  acType === 'microsoft' 
                    ? 'bg-fuchsia-600 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Microsoft Cloud Account
              </button>
            </div>

            {/* Inputs Panel */}
            {stage === 'input' ? (
              <div className="space-y-3 pt-2">
                {acType === 'local' ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Who is going to use this PC?</label>
                      <input
                        type="text" value={localName} onChange={(e) => setLocalName(e.target.value)}
                        placeholder="Enter user name..."
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-fuchsia-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Create a secure password</label>
                      <input
                        type="password" value={localPass} onChange={(e) => setLocalPass(e.target.value)}
                        placeholder="••••••••"
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-fuchsia-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Security Question #1</label>
                      <select value={localQuestion} onChange={(e) => setLocalQuestion(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none">
                        <option>คุณชื่อสัตว์เลี้ยงตัวแรกคืออะไร?</option>
                        <option>คุณเกิดที่จังหวัดอะไร?</option>
                        <option>ชื่อเล่นมารดาของท่านคืออะไร?</option>
                      </select>
                      <input
                        type="text" placeholder="คำตอบความปลอดภัย..."
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-fuchsia-500 mt-1"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Sign in with Microsoft</label>
                      <input
                        type="email" value={msEmail} onChange={(e) => setMsEmail(e.target.value)}
                        placeholder="someone@example.com"
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-fuchsia-500"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-[10.5px] leading-relaxed text-slate-400">
                      💡 <strong>ข้อกำหนดระบบ:</strong> บัญชีคลาวด์องค์กรได้รับการเข้ารหัสผ่าน 2FA สากล ช่วยรักษาข้อมูล OneDrive และการจัดเก็บบันทึกรหัสลับ BitLocker
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-6 space-y-4 animate-[fadeIn_0.2s_ease-out]">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h6 className="font-bold text-white text-base">สร้างสิทธิ์ความปลอดภัยสำเร็จ!</h6>
                  <p className="text-slate-400 text-[11px] leading-normal max-w-xs mx-auto">
                    {acType === 'local' 
                      ? `บัญชีท้องถิ่นสำหรับ [${localName}] ถูกแฮชบันทึกลงหน่วยความจำดิสก์ SAM สำเร็จ` 
                      : `ผูกมัดรหัสคลาวด์ [${msEmail}] เรียบร้อยเพื่อการซิงค์`
                    }
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4 border-t border-slate-800">
            {stage === 'input' ? (
              <button
                onClick={executeCreate}
                className="w-full py-2.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold cursor-pointer active:scale-98 transition-all shadow-md shadow-fuchsia-600/10"
              >
                ยืนยันการบันทึกบัญชี (Save Account)
              </button>
            ) : (
              <button
                onClick={() => setStage('input')}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer active:scale-98 transition-all"
              >
                ปรับแก้ข้อมูลบัญชี (RESET)
              </button>
            )}
          </div>
        </div>

        {/* Account Comparison side column */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">เปรียบเทียบสิทธิและสิทธิประโยชน์เชิงธุรกิจ</span>
            
            <div className="space-y-3.5">
              <div className="bg-white/60 p-4 rounded-xl border border-slate-200 shadow-sm text-xs text-slate-500 leading-normal space-y-1 hover:shadow-md transition-all">
                <span className="font-bold text-indigo-700 block mb-0.5">Offline Local Account</span>
                <p>
                  - <strong>ข้อดี:</strong> ทำงานอิสระโดยไม่ต้องพึ่งพาเน็ตเวิร์ก ข้อมูลสถิติความจำไม่รั่วไหลไปภายนอกองค์กร<br />
                  - <strong>ข้อจำกัด:</strong> หากพนักงานลืมรหัสผ่าน จะกู้ยากมาก (ต้องลงระบบใหม่หรือแกะ SAM) และซิงค์การทำงานไม่ได้
                </p>
              </div>

              <div className="bg-white/60 p-4 rounded-xl border border-slate-200 shadow-sm text-xs text-slate-500 leading-normal space-y-1 hover:shadow-md transition-all">
                <span className="font-bold text-fuchsia-700 block mb-0.5">Online Cloud Account</span>
                <p>
                  - <strong>ข้อดี:</strong> สำรองและซิงค์การจัดเก็บ OneDrive อัตโนมัติ ป้องกันข้อมูลองค์กรพังหากเครื่องชำรุด มี 2FA เสถียรสูง<br />
                  - <strong>ข้อจำกัด:</strong> ต้องการเชื่อมโยงอินเทอร์เน็ตในการตั้งค่าครั้งแรก และมีความเปราะบางเรื่องความเป็นส่วนตัว
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-sans text-xs space-y-1.5 mt-6">
            <h6 className="font-bold text-slate-800 flex items-center gap-1.5"><Info className="w-4 h-4 text-indigo-500" /> คำแนะนำช่างไอที:</h6>
            <p className="text-[12px] leading-relaxed">
              ในสภาพแวดล้อมสำนักงานใหญ่ ช่างไอทีจะเลือกเชื่อมโยงบัญชีผ่าน **Domain Network** 
              (เช่น Active Directory) ซึ่งเป็นการรวมศูนย์บัญชีผู้ใช้เข้าเซิร์ฟเวอร์โดเมนส่วนกลาง
            </p>
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   5. PRIVACY TOGGLE BOARD & PIN SETUP LAB (Subtopic 3.3.5)
   ═══════════════════════════════════════════════════════════════════ */
function PrivacyPinSimulator() {
  const [stage, setStage] = useState('privacy'); // privacy | pin | success
  const [toggles, setToggles] = useState({
    location: true,
    diagnostic: true,
    inking: true,
    findMyDevice: false
  });
  const [pin, setPin] = useState('');
  const [warning, setWarning] = useState('');

  const toggleSwitch = (key) => {
    setToggles(current => ({
      ...current,
      [key]: !current[key]
    }));
  };

  const handleKeyPress = (num) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
      setWarning('');
    }
  };

  const deletePin = () => {
    setPin('');
    setWarning('');
  };

  const verifyAndSavePin = () => {
    if (pin.length < 4) {
      setWarning('❌ กรุณากรอกรหัส PIN ให้ครบถ้วน 4 ตำแหน่ง!');
      return;
    }

    // Weak PIN detection logic (sequential or repeating numbers)
    const seqs = ['1234', '2345', '3456', '4567', '5678', '6789', '0123', '9876', '8765', '7654', '6543', '5432', '4321', '3210'];
    const repeating = pin[0] === pin[1] && pin[1] === pin[2] && pin[2] === pin[3];
    
    if (seqs.includes(pin) || repeating) {
      setWarning('❌ รหัสเดาง่ายเกินไป! กรุณาหลีกเลี่ยงรูปแบบตัวเลขเรียงหรือซ้ำกัน (เช่น 1234, 1111)');
      return;
    }

    setStage('success');
  };

  const handleReset = () => {
    setStage('privacy');
    setPin('');
    setWarning('');
  };

  return (
    <SimulatorShell
      icon={<ShieldCheck className="w-6 h-6 text-indigo-500 animate-pulse" />}
      title="บอร์ดจัดการสิทธิ์และความมั่นคง (Privacy Toggles & Secure PIN Pad)"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left">
        
        {/* Virtual GUI panel */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[380px] font-sans text-xs text-slate-200">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">SECURITY & PRIVACY BOARD</span>
          
          <div className="space-y-4">
            {stage === 'privacy' && (
              <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
                <div>
                  <h6 className="text-[13px] font-bold text-white">Choose privacy settings for your device</h6>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    สลับเปิด-ปิดสิทธิ์เพื่อความปลอดภัยและความมั่นคงระดับเครือข่ายส่วนตัว
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {[
                    { id: 'location', label: 'Location Services (พิกัดตำแหน่ง)', desc: 'ยอมรับการสแกนและจัดส่งพิกัดเครื่องให้เบราวเซอร์และแอป' },
                    { id: 'diagnostic', label: 'Diagnostic Data (สถิติพฤติกรรม)', desc: 'จัดส่งประวัติความผิดพลาด Telemetry กลับเซิร์ฟเวอร์ไมโครซอฟท์' },
                    { id: 'inking', label: 'Inking & Typing (ประวัติแป้นพิมพ์)', desc: 'บันทึกคำศัพท์และการขีดเขียนปากกาเพื่อนำไปเรียนรู้ AI' },
                    { id: 'findMyDevice', label: 'Find My Device (สิทธิ์ตามหาเครื่อง)', desc: 'รันระบบพิกัดพื้นหลังตลอดเวลาเพื่อใช้ระบุตำแหน่งเมื่อเครื่องหาย' }
                  ].map(item => (
                    <div key={item.id} className="flex justify-between items-center p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-200 text-xs block">{item.label}</span>
                        <span className="text-[9.5px] text-slate-500 font-normal leading-normal block">{item.desc}</span>
                      </div>
                      <button
                        onClick={() => toggleSwitch(item.id)}
                        className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-all duration-300 ${
                          toggles[item.id] ? 'bg-indigo-600' : 'bg-slate-800'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                          toggles[item.id] ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {stage === 'pin' && (
              <div className="space-y-4 animate-[fadeIn_0.2s_ease-out] flex flex-col items-center">
                <div className="text-center w-full">
                  <h6 className="text-[13px] font-bold text-white">Create a secure numeric PIN</h6>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    รหัส PIN จะผูกติดสัมพันธ์กับ TPM 2.0 ในเครื่อง เพื่อการเปิดใช้ระบบปลอดภัยสูง
                  </p>
                </div>

                {/* Display PIN Dots */}
                <div className="flex gap-4 my-2">
                  {[0, 1, 2, 3].map(idx => (
                    <div
                      key={idx}
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-sm ${
                        pin.length > idx 
                          ? 'border-indigo-500 bg-indigo-500/20 text-white shadow-[0_0_10px_rgba(99,102,241,0.4)]' 
                          : 'border-slate-800 bg-slate-950 text-slate-600'
                      }`}
                    >
                      {pin.length > idx ? '●' : ''}
                    </div>
                  ))}
                </div>

                {/* Keypad simulation */}
                <div className="grid grid-cols-3 gap-2.5 max-w-[180px] w-full font-mono">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button
                      key={num} onClick={() => handleKeyPress(String(num))}
                      className="py-2 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-white font-bold rounded-lg cursor-pointer text-xs active:scale-98 transition-all"
                    >
                      {num}
                    </button>
                  ))}
                  <button onClick={deletePin} className="py-2 bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold rounded-lg cursor-pointer text-[10px] active:scale-98 transition-all">
                    CLR
                  </button>
                  <button onClick={() => handleKeyPress('0')} className="py-2 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-white font-bold rounded-lg cursor-pointer text-xs active:scale-98 transition-all">
                    0
                  </button>
                  <button onClick={verifyAndSavePin} className="py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer text-[10px] active:scale-98 transition-all">
                    OK
                  </button>
                </div>

                {warning && (
                  <p className="text-[10px] text-rose-400 font-bold font-sans text-center leading-normal max-w-xs">{warning}</p>
                )}
              </div>
            )}

            {stage === 'success' && (
              <div className="text-center py-10 space-y-4 animate-[fadeIn_0.2s_ease-out]">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <h6 className="font-bold text-white text-base">ระบบตั้งค่าความเป็นส่วนตัวสำเร็จ!</h6>
                  <p className="text-slate-400 text-[11px] leading-normal max-w-xs mx-auto">
                    รหัส PIN ป้องกันและสวิตช์ Telemetry ความปลอดภัยของเครื่องคอมพิวเตอร์ถูกลงทะเบียนเข้าสู่ระบบ BIOS และ OS เรียบร้อย
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4 border-t border-slate-800 mt-4">
            {stage === 'privacy' && (
              <button
                onClick={() => setStage('pin')}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer active:scale-98 transition-all shadow-md shadow-indigo-600/10"
              >
                ยืนยันการตั้งค่า (Next: Create PIN)
              </button>
            )}

            {(stage === 'pin' || stage === 'success') && (
              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-800 text-slate-300 font-bold cursor-pointer active:scale-98 transition-all"
              >
                ปรับเปลี่ยนการตั้งค่าใหม่ (RESET)
              </button>
            )}
          </div>
        </div>

        {/* Right explanatory column */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">การป้องกันระดับวิชาการทางช่าง</span>
            <div className="text-slate-600 text-sm leading-relaxed space-y-3.5">
              <p>
                ช่างไอทีมีมาตรฐานกำหนดพารามิเตอร์ด้านความมั่นคงและความเป็นส่วนตัว เพื่อความมั่นใจในสิทธิพนักงาน 2 มิติ:
              </p>

              <div className="space-y-2">
                <div className="bg-white/60 p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5 hover:shadow-md transition-all">
                  <span className="p-1 rounded bg-indigo-50 text-indigo-600 shrink-0"><Lock className="w-4 h-4" /></span>
                  <p className="text-xs text-slate-500 leading-normal">
                    <strong>ข้อดีของรหัส PIN เหนือกว่ารหัสผ่าน:</strong> รหัส PIN จะทำงานได้ก็ต่อเมื่อยืนยันร่วมกับชิปฮาร์ดแวร์ความปลอดภัย <strong>TPM 2.0 (Trusted Platform Module)</strong> ในเมนบอร์ด ส่งผลให้แฮกเกอร์ฝั่งตรงข้ามอินเทอร์เน็ตไม่สามารถเดารหัสเข้ามาขโมยข้อมูลได้เลยหากไม่มีเครื่องจริง
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-sans text-xs space-y-1.5 mt-6">
            <h6 className="font-bold text-slate-800 flex items-center gap-1.5"><Info className="w-4 h-4 text-indigo-500" /> เกร็ดวิชาชีพ:</h6>
            <p className="text-[12px] leading-relaxed">
              การปิดสวิตช์ Telemetry (ข้อมูลสถิติประเมินความผิดพลาด) จะสามารถประหยัดแบนด์วิดท์เครือข่ายอินเทอร์เน็ตขององค์กรลงได้อย่างเห็นผลชัดเจนในกรณีคอมพิวเตอร์ใช้งานพร้อมกันจำนวนมาก
            </p>
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}
