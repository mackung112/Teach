/**
 * it3_1.jsx — หน่วยที่ 3.1 สถาปัตยกรรมและหลักการทำงานของระบบปฏิบัติการ
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
  ShieldAlert, Settings, ChevronRight
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
   AMBIENT BACKDROP THEME — IT Unit 3 (Indigo/Cyan/Purple Architecture)
   ═══════════════════════════════════════════════════════════════════ */
const IT3_1_BLOBS = [
  { color: 'bg-indigo-200',  size: 'w-96 h-96', position: '-top-20 -left-20',       opacity: 'opacity-35' },
  { color: 'bg-cyan-200',    size: 'w-80 h-80', position: 'top-1/3 -right-20',      opacity: 'opacity-30' },
  { color: 'bg-purple-200',  size: 'w-72 h-72', position: '-bottom-20 left-1/4',     opacity: 'opacity-25' },
  { color: 'bg-blue-200',    size: 'w-60 h-60', position: 'top-2/3 right-1/3',       opacity: 'opacity-20' },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA: QUIZ FOR UNIT 3.1
   ═══════════════════════════════════════════════════════════════════ */
const QUIZ_LEVELS = [
  {
    title: 'โจทย์ที่ 1: ตัวกลางระดับโครงสร้างของคอมพิวเตอร์',
    desc: 'ระบบปฏิบัติการ (OS) ทำหน้าที่ในฐานะตัวกลางระดับโครงสร้างระหว่างส่วนประกอบใดในสถาปัตยกรรมระบบคอมพิวเตอร์?',
    options: [
      { key: 'A', text: 'ระหว่างโปรแกรมประยุกต์ (Application) และเบราว์เซอร์อินเทอร์เน็ตในการส่งผ่านข้อมูลบล็อกเชน', isCorrect: false },
      { key: 'B', text: 'ระหว่างผู้ใช้งานร่วมกับซอฟต์แวร์ประยุกต์ และอุปกรณ์ฮาร์ดแวร์ระดับกายภาพเพื่อการจัดสรรทรัพยากร', isCorrect: true },
      { key: 'C', text: 'ระหว่างสายใยแก้วนำแสง (Fiber Optic) และเครือข่ายแลนท้องถิ่นในการกรองสัญญาณรบกวน', isCorrect: false },
      { key: 'D', text: 'ระหว่างหน่วยความจำถาวรและตัวแปลภาษาไพธอนเพื่อรวบรวมฟังก์ชันการคำนวณ', isCorrect: false }
    ],
    tip: 'OS ทำหน้าที่ปิดบังความซับซ้อนของฮาร์ดแวร์และคอยคุ้มครองสิทธิ์'
  },
  {
    title: 'โจทย์ที่ 2: แกนหลักของระบบปฏิบัติการ',
    desc: 'ส่วนประกอบใดของระบบปฏิบัติการที่มีบทบาทเป็นแกนกลางหลัก (Core Kernel) ที่เข้าควบคุมฮาร์ดแวร์โดยตรงและอยู่บนแรมตลอดเวลาหลังจากบูตเครื่อง?',
    options: [
      { key: 'A', text: 'Shell (โปรแกรมตีความคำสั่ง)', isCorrect: false },
      { key: 'B', text: 'Graphical User Interface (GUI)', isCorrect: false },
      { key: 'C', text: 'Kernel (แกนหลักระบบปฏิบัติการ)', isCorrect: true },
      { key: 'D', text: 'Command Line Interface (CLI)', isCorrect: false }
    ],
    tip: 'แกนกลางลึกที่สุดที่คอยรันสิทธิ์สูงสุดเข้าอุปกรณ์กายภาพโดยตรง คือ Kernel'
  },
  {
    title: 'โจทย์ที่ 3: การแก้ไขปัญหาหน่วยความจำหลักเต็ม',
    desc: 'เมื่อเกิดภาวะที่โปรแกรมขนาดใหญ่ถูกเปิดขึ้นมาและหน่วยความจำแรมจริง (Physical RAM) เต็ม ระบบปฏิบัติการจะมีตรรกะแก้ไขปัญหาเพื่อความเสถียรอย่างไร?',
    options: [
      { key: 'A', text: 'การตัดกระแสไฟฟ้าของพาวเวอร์ซัพพลายทันทีเพื่อป้องกันทรานซิสเตอร์เสียหาย', isCorrect: false },
      { key: 'B', text: 'การนำเอาโปรแกรมส่วนที่ยังไม่ได้ใช้งานย้ายไปจัดเก็บในหน่วยความจำเสมือน (Virtual Memory / Swap Space) บนสื่อจัดเก็บข้อมูลถาวร', isCorrect: true },
      { key: 'C', text: 'การปรับความเร็วสัญญาณนาฬิกาของ CPU ให้ช้าลงเพื่อรอการเคลียร์ข้อมูลในแรมหลัก', isCorrect: false },
      { key: 'D', text: 'การสลับพาร์ติชันดิสก์จากตาราง GPT ไปสู่โครงสร้าง MBR ชั่วคราว', isCorrect: false }
    ],
    tip: 'การทำ Memory Swapping จะย้ายหน้าข้อมูล Paging สู่ฮาร์ดดิสก์เสมือน'
  },
  {
    title: 'โจทย์ที่ 4: ความแตกต่างของรุ่น Server และ Client',
    desc: 'ความแตกต่างสำคัญระหว่างระบบปฏิบัติการแบบ Client (เช่น Windows 11) และรุ่น Server (เช่น Windows Server 2022) ในเชิงปฏิบัติการคือข้อใด?',
    options: [
      { key: 'A', text: 'รุ่น Client ไม่มี Kernel และ Shell แต่เน้นการแสดงผลด้วย GUI 60fps เท่านั้น', isCorrect: false },
      { key: 'B', text: 'รุ่น Server ถูกออกแบบมาเพื่อรันงานสำนักงานและเล่นเกมระดับสูงเป็นหลักเพื่อประหยัดต้นทุนลิขสิทธิ์', isCorrect: false },
      { key: 'C', text: 'รุ่น Server ปรับแต่งโครงสร้างมาเพื่อการให้บริการ จัดสรรทรัพยากรส่วนกลาง และรองรับการเชื่อมต่อพร้อมกันจำนวนมหาศาลอย่างเสถียร', isCorrect: true },
      { key: 'D', text: 'รุ่น Client สามารถจัดการความปลอดภัยของบัญชีผู้ใช้ข้ามโดเมนและรองรับหน่วยความจำแรมได้สูงถึง 16 Exabytes เสมอ', isCorrect: false }
    ],
    tip: 'เซิร์ฟเวอร์มุ่งเน้นการรันประมวลผลพื้นหลังเพื่อการบริการ (Services) ที่มั่นคง'
  },
  {
    title: 'โจทย์ที่ 5: สถาปัตยกรรมระบบ 32-bit เทียบกับ 64-bit',
    desc: 'เหตุผลสำคัญทางวิศวกรรมคอมพิวเตอร์ที่สถาปัตยกรรม 64-bit (x64) มีขีดความสามารถเหนือกว่า 32-bit (x86) อย่างมหาศาลคือข้อใด?',
    options: [
      { key: 'A', text: 'สถาปัตยกรรม 64-bit รองรับสาย LAN ความเร็วสูงและความเสถียร 10Gbps ได้ในสลักการเชื่อมต่อเดิม', isCorrect: false },
      { key: 'B', text: 'รีจิสเตอร์ขนาด 64 บิตทำให้สามารถอ้างอิงตำแหน่งหน่วยความจำแรม (Address Space) ได้มากกว่าขีดจำกัดเดิมที่ 4GB ได้อย่างกว้างขวาง', isCorrect: true },
      { key: 'C', text: 'การรันบนแรงดันไฟฟ้า 12V จากพาวเวอร์ซัพพลายช่วยประหยัดไฟขึ้น 50%', isCorrect: false },
      { key: 'D', text: 'การเปลี่ยนจากระบบ Multi-Tasking สลับหน้าที่การทำงานไปเป็นการรันโปรเซสเดี่ยวแบบปิดโปร่งโล่ง', isCorrect: false }
    ],
    tip: 'ความกว้างบิต Address Space สอดคล้องขยายขีดจำกัดการคำนวณ RAM มากกว่า 4GB'
  }
];

export default function ComponentName() {
  return (
    <>
      {/* Layer 1: Ambient Backdrop & Theme Gradients */}
      <AmbientBackdrop blobs={IT3_1_BLOBS} />

      {/* Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── SUBTOPIC 3.1.1 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">หัวข้อที่ 1</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ความหมาย หน้าที่ และบทบาทของระบบปฏิบัติการ
            </h3>
          </div>
          
          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในวิศวกรรมคอมพิวเตอร์ <strong>ระบบปฏิบัติการ (Operating System: OS)</strong> คือชุดซอฟต์แวร์ระบบที่เป็นแกนกลางในการควบคุม ประสานงาน และบริหารจัดการทรัพยากรฮาร์ดแวร์กายภาพทั้งหมด 
              โดยทำหน้าที่เป็น <strong>"ตัวกลางระดับโครงสร้าง (Abstraction Layer)"</strong> เพื่อปิดบังความซับซ้อนของอุปกรณ์อิเล็กทรอนิกส์ระดับต่ำ 
              ช่วยให้ผู้ใช้งานและโปรแกรมประยุกต์ (Application Software) ต่างๆ สามารถสั่งงานและสื่อสารกับเครื่องคอมพิวเตอร์ได้อย่างมีประสิทธิภาพและเสถียรภาพ
            </p>
            <p>
              หากไม่มีระบบปฏิบัติการ นักพัฒนาโปรแกรมประยุกต์จะต้องเขียนคำสั่งควบคุมการทำงานของทรานซิสเตอร์ หน่วยความจำแรม และชิ้นส่วนจัดเก็บข้อมูลแต่ละค่ายโดยตรง 
              ซึ่งเป็นเรื่องที่ยุ่งยากและไร้ประสิทธิภาพอย่างยิ่ง OS จึงเข้ามาจัดทำ <strong>System Calls API</strong> ซึ่งเป็นคำสั่งมาตรฐานกลางเพื่อการเรียกใช้ฮาร์ดแวร์
            </p>
          </div>

          {/* Interactive OS Bridge Simulator */}
          <OsBridgeSimulator />
        </section>

        {/* ─── SUBTOPIC 3.1.2 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">หัวข้อที่ 2</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงสร้างส่วนประกอบของระบบปฏิบัติการ
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ระบบปฏิบัติการประกอบด้วยเลเยอร์โครงสร้างการแบ่งชั้นการทำงานที่ชัดเจนเพื่อรักษาความปลอดภัยและความคล่องตัว โดยแยกแกนกลางที่สําคัญออกจากส่วนที่ผู้ใช้โต้ตอบ ดังนี้:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Kernel (แกนหลักระบบปฏิบัติการ):</strong> เป็นหัวใจที่ลึกที่สุดของ OS ทำงานในโหมดสิทธิ์สูงสุด (Kernel Mode) คอยดูแลจัดการหน่วยประมวลผล สัญญาณรบกวน ระบบไฟล์ และหน่วยความจำ โดย Kernel จะถูกโหลดลงหน่วยความจำแรมทันทีเมื่อเปิดเครื่องและฝังตัวอยู่อย่างถาวรจนกว่าจะปิดเครื่อง
              </li>
              <li>
                <strong>Shell (โปรแกรมตีความคำสั่ง):</strong> ทำหน้าที่เปรียบเสมือน "เปลือกหุ้ม Kernel" คอยรับคำสั่งภาษาของมนุษย์ แปลความหมายเป็นรหัสการทำงานระดับเครื่อง แล้วส่งต่อไปให้ Kernel ดำเนินการ
              </li>
              <li>
                <strong>User Interface (UI):</strong> ส่วนติดต่อประสานงานกับผู้ใช้งาน แบ่งออกเป็นสองรูปแบบหลักคือ 
                <em> Command Line Interface (CLI)</em> ซึ่งสั่งงานด้วยตัวอักษรพิมพ์ และ 
                <em> Graphical User Interface (GUI)</em> สั่งงานผ่านภาพกราฟิก เมนู และไอคอนโต้ตอบ
              </li>
            </ul>
          </div>

          {/* CLI vs GUI Shell Simulator */}
          <ShellInterpreterSimulator />
        </section>

        {/* ─── SUBTOPIC 3.1.3 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">หัวข้อที่ 3</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การบริหารจัดการทรัพยากรหลักของระบบปฏิบัติการ
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ระบบปฏิบัติการมีบทบาทสำคัญในการควบคุมและจัดสรรทรัพยากรหลัก 4 ด้าน เพื่อรักษาระบบให้ทำงานได้ต่อเนื่องและปราศจากการขัดแย้งของข้อมูล:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/60 p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <h5 className="font-bold text-indigo-600 text-lg mb-1 flex items-center gap-1.5"><Cpu className="w-5 h-5" /> การจัดการกระบวนการ (Process Management)</h5>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  ควบคุมการทำงานของงานย่อยหรือแอปพลิเคชัน (Process) ในการเข้าคิวขอใช้สัญญาณนาฬิกาของ CPU ผ่านกลไก Scheduler การสลับสถานะโปรเซส (Ready, Running, Blocked) เพื่อให้รันงานหลายโปรแกรมได้พร้อมกัน
                </p>
              </div>
              <div className="bg-white/60 p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <h5 className="font-bold text-cyan-600 text-lg mb-1 flex items-center gap-1.5"><MemoryStick className="w-5 h-5" /> การจัดการหน่วยความจำ (Memory Management)</h5>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  จัดสรรพื้นที่แรมกายภาพ คุ้มครองเขตแดนข้อมูลของโปรเซสไม่ให้ปะปนกัน และทำความสะอาดพื้นที่เพื่อพร้อมรับงานใหม่ รวมถึงสร้างหน่วยความจำเสมือน (Virtual Memory / Paging Swap) เพื่อรองรับโปรแกรมขนาดใหญ่
                </p>
              </div>
              <div className="bg-white/60 p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <h5 className="font-bold text-purple-600 text-lg mb-1 flex items-center gap-1.5"><HardDrive className="w-5 h-5" /> การจัดการระบบไฟล์ (File Management)</h5>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  กำหนดโครงสร้างการจัดเก็บไฟล์ โฟลเดอร์ จัดเตรียมระบบตารางดัชนีชี้ตำแหน่งแฟลชและจานหมุน (FAT, NTFS, ext4) และควบคุมสิทธิ์การเข้าถึงข้อมูลเพื่อความเสถียรและความเป็นส่วนตัว
                </p>
              </div>
              <div className="bg-white/60 p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <h5 className="font-bold text-amber-600 text-lg mb-1 flex items-center gap-1.5"><Settings className="w-5 h-5" /> การจัดการอุปกรณ์ I/O (Device Management)</h5>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  รับมือการเชื่อมโยงฮาร์ดแวร์ภายนอกผ่านตัวกลางโปรแกรมไดรเวอร์ (Drivers) และจัดทำพอร์ตบริการ (I/O Requests) ช่วยแปลความหมายระดับสัญญาณอิเล็กทรอนิกส์เป็นคำสั่งให้พร้อมโต้ตอบ
                </p>
              </div>
            </div>
          </div>

          {/* Resource Scheduler & Memory Simulator */}
          <ResourceManagementSimulator />
        </section>

        {/* ─── SUBTOPIC 3.1.4 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">หัวข้อที่ 4</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การเปรียบเทียบตระกูลระบบปฏิบัติการเชิงธุรกิจ
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในโลกการพาณิชย์และการพัฒนาโปรแกรม มีการเลือกใช้ตระกูลระบบปฏิบัติการที่แตกต่างกันตามวัตถุประสงค์การใช้งาน ความมั่นคง และลิขสิทธิ์
              การพิจารณาสถาปัตยกรรมยังแบ่งขั้วอย่างชัดเจนระหว่าง **รุ่น Client** (เน้นการใช้งานทั่วไป ประสิทธิภาพเฉพาะหน้าจอที่เป็นมิตรกับมนุษย์) 
              และ **รุ่น Server** (เน้นความทนทาน เปิดใช้งานยาวนานต่อเนื่องปีต่อปี และรองรับการแชร์ข้อมูลส่วนกลางจำนวนมหาศาล)
            </p>
          </div>

          {/* OS Family Comparison Grid */}
          <OsComparisonMatrix />
        </section>

        {/* ─── SUBTOPIC 3.1.5 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">หัวข้อที่ 5</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              สถาปัตยกรรมระบบ 32-bit เทียบกับ 64-bit และกลไก Multi-Tasking
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ขนาดความกว้างของรีจิสเตอร์ประมวลผล (Register Size) ใน CPU กำหนดประสิทธิภาพของระบบปฏิบัติการ:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>สถาปัตยกรรม 32-bit (x86):</strong> มีเพดานในการอ้างที่อยู่ตำแหน่งแรม (Address Space Boundary) สูงสุดที่ 2 ยกกำลัง 32 ไบต์ หรือเท่ากับ <strong>4GB</strong> ทำให้ต่อให้เสียบแรมเพิ่มขนาด 16GB บอร์ดและระบบ 32-bit จะมองเห็นและนำมาประมวลผลได้เพียง 4GB เท่านั้น
              </li>
              <li>
                <strong>สถาปัตยกรรม 64-bit (x64):</strong> อ้างอิงที่อยู่ได้ถึง 2 ยกกำลัง 64 หรือสูงสุด 16 Exabytes ทลายเพดานแรมและรองรับงานประมวลผลวิดีโอ 3D หรือฐานข้อมูลขนาดใหญ่ได้อย่างราบรื่น
              </li>
              <li>
                <strong>Multi-Tasking & Multi-User:</strong> ระบบปฏิบัติการยุคใหม่ใช้ตรรกะแบบสับเปลี่ยนโปรเซสที่รวดเร็ว (Time-Slicing) ทำให้ดูเหมือนว่าคอมพิวเตอร์ประมวลผลหลายงานพร้อมกันได้อย่างสมบูรณ์ (Multi-Tasking) และเปิดสิทธิ์ให้บัญชีล็อกอินพร้อมกันหลายบัญชีได้เสถียร (Multi-User)
              </li>
            </ul>
          </div>

          {/* Bit Address Space Simulator */}
          <BitAddressSimulator />
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
            title="ภารกิจวิเคราะห์สถาปัตยกรรมและการจัดการของระบบปฏิบัติการ"
            taskText="ให้นักเรียนสืบค้นหรือเลือกวิเคราะห์ระบบปฏิบัติการที่ตนเองสนใจ 1 ตระกูล (เช่น Windows, Linux Distros หรือ macOS) พร้อมกับเขียนแผนผังความสัมพันธ์ (OS Architecture) แสดงความเชื่อมโยงในการรับ-ส่งคำสั่งผ่านเลเยอร์ User -> Application -> Shell -> Kernel -> Hardware และสรุปบทบาทหน้าที่หลัก 4 ด้านของการจัดการทรัพยากรระดับโครงสร้าง เพื่อให้เข้าใจกลไกภายในอย่างถ่องแท้ จัดส่งในรูปแบบสรุปลงสมุดหรือแผ่นพรีเซนต์ดิจิทัล"
          />
        </div>

      </main>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   1. OS BRIDGE SIMULATOR (Subtopic 3.1.1)
   ═══════════════════════════════════════════════════════════════════ */
function OsBridgeSimulator() {
  const [activeRequest, setActiveRequest] = useState('none');
  const [flowProgress, setFlowProgress] = useState(0);
  const [consoleLog, setConsoleLog] = useState(['[READY] รอส่งการร้องขอระบบปฏิบัติการ...']);
  const flowTimer = useRef(null);

  const requests = {
    file_save: {
      label: '💾 สั่งบันทึกไฟล์ PDF ล่าสุด',
      desc: 'แอปเขียนเอกสารขอเปิดเขียนไดรฟ์ถาวรผ่าน Kernel API',
      target: 'storage',
      logs: [
        '[USER] คลิกปุ่ม "บันทึกเอกสาร PDF ที่เขียนเสร็จสิ้น"',
        '[APP] ตรวจทานรูปภาพเอกสาร และจัดส่ง System Call (sys_write) เพื่อบันทึกข้อมูล',
        '[OS/KERNEL] รับ System Call ตรวจพิจารณาสิทธิ์การเข้าถึงความปลอดภัย (NTFS Permissions)',
        '[OS/KERNEL] ส่งสลับโปรโตคอลไดรเวอร์สื่อเก็บข้อมูล ส่งข้อมูลระดับบล็อกสายควบคุมสัญญาณ',
        '[HARDWARE] ไดรฟ์ M.2 NVMe SSD เปิดทำงาน บันทึกข้อมูลบล็อกความถี่เรืองแสง ✅ [บันทึกสำเร็จ]'
      ]
    },
    audio_stream: {
      label: '🎵 สตรีมมิ่งไฟล์ดนตรีคุณภาพสูง',
      desc: 'โปรแกรมเล่นเพลงส่งสัญญาณชุดข้อมูลเข้าการ์ดสัญญาณเสียง',
      target: 'ram_cpu',
      logs: [
        '[USER] กดปุ่ม Play เพื่อฟังเพลงผ่านแอปพลิเคชันออนไลน์',
        '[APP] ถอดรหัสไฟล์สตรีมและนำรหัสข้อมูลเข้าบัฟเฟอร์การเล่นดนตรี',
        '[OS/KERNEL] เรียกใช้ Process Scheduler ปรับลำดับคิวประมวลผลสูง (High-Priority Realtime)',
        '[OS/KERNEL] ควบคุมไดรเวอร์อุปกรณ์สัญญาณเสียง (Audio DAC Driver)',
        '[HARDWARE] CPU และ RAM ประมวลผลคลื่นคล็อกความถี่ และส่งให้ชิปเสียงถอดรหัสคลื่นไฟฟ้า ✅ [เสียงส่งออกลำโพง]'
      ]
    },
    browser_open: {
      label: '🌐 เปิดเบราว์เซอร์ดูเว็บไซต์',
      desc: 'แอปเว็บส่งคำขอสัญญาณพอร์ตกายภาพเชื่อมต่อเข้าการ์ดเน็ตเวิร์ก',
      target: 'network',
      logs: [
        '[USER] คลิกไอคอน Chrome เปิดพิมพ์ที่อยู่หน้าเว็บ http://google.com',
        '[APP] สร้างคำขอเชื่อมต่อเครือข่ายระดับ Logical Socket API',
        '[OS/KERNEL] จัดคิวคาร์ดการเข้าถึง Network Socket ใน Layer 4 TCP/IP',
        '[OS/KERNEL] นำรหัสข้อมูลแปลเป็นไดรเวอร์ควบคุมฮาร์ดแวร์แลน',
        '[HARDWARE] การ์ดเน็ตเวิร์ก NIC ส่งแพ็กเก็ตกระแสไฟฟ้าออกสู่สาย LAN/คลื่นไร้สาย ✅ [เพจแสดงผลสำเร็จ]'
      ]
    }
  };

  const startSimulation = (key) => {
    setActiveRequest(key);
    setFlowProgress(0);
    if (flowTimer.current) clearInterval(flowTimer.current);

    const data = requests[key];
    setConsoleLog([data.logs[0]]);

    let step = 1;
    flowTimer.current = setInterval(() => {
      setFlowProgress(prev => {
        const next = prev + 25;
        if (next <= 100) {
          setConsoleLog(currentLogs => [...currentLogs, data.logs[step]]);
          step += 1;
        }
        if (next === 100) {
          clearInterval(flowTimer.current);
        }
        return next;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (flowTimer.current) clearInterval(flowTimer.current);
    };
  }, []);

  return (
    <SimulatorShell
      icon={<Layers className="w-6 h-6 text-indigo-500" />}
      title="เครื่องจำลองตัวกลางระบบปฏิบัติการ (OS Architectural Layer Bridge)"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left column: SVG visual stack with Absolute Center Connections */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between items-center relative min-h-[420px] select-none">
          <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">OS LAYER TRANSIT VISUALIZATION</span>
          
          <svg viewBox="0 0 320 320" className="w-72 h-72 z-10 my-auto">
            {/* Defs for Flowing Gradients */}
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366F1" />
              </marker>
            </defs>

            {/* Layer blocks. 
                Absolute Center is at x = 160.
                Width = 180, so half width is 90. 
                Each rect goes from x = 160 - 90 = 70 to 70 + 180 = 250. 
                Gently layered horizontally symmetric. */}

            {/* 1. USER LAYER */}
            <rect x="70" y="20" width="180" height="35" rx="8" fill="#1E293B" stroke={activeRequest !== 'none' && flowProgress >= 0 ? "#6366F1" : "#475569"} strokeWidth="1.5" />
            <text x="160" y="42" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">ผู้ใช้ (User) 👤</text>

            {/* 2. APPLICATION LAYER */}
            <rect x="70" y="90" width="180" height="35" rx="8" fill="#1E293B" stroke={activeRequest !== 'none' && flowProgress >= 25 ? "#6366F1" : "#475569"} strokeWidth="1.5" />
            <text x="160" y="112" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontFamily="sans-serif" fontWeight="bold">ซอฟต์แวร์ประยุกต์ (App) 📱</text>

            {/* 3. OS KERNEL LAYER */}
            <rect x="70" y="160" width="180" height="35" rx="8" fill="#312E81" stroke={activeRequest !== 'none' && flowProgress >= 50 ? "#10B981" : "#4338CA"} strokeWidth="1.5" />
            <text x="160" y="182" textAnchor="middle" fill="#38BDF8" fontSize="11" fontFamily="sans-serif" fontWeight="bold">ระบบปฏิบัติการ (OS Kernel) ⚙️</text>

            {/* 4. HARDWARE LAYER */}
            <rect x="70" y="230" width="180" height="35" rx="8" fill="#1E1B4B" stroke={activeRequest !== 'none' && flowProgress >= 75 ? "#10B981" : "#312E81"} strokeWidth="1.5" />
            <text x="160" y="252" textAnchor="middle" fill="#F472B6" fontSize="11" fontFamily="sans-serif" fontWeight="bold">ฮาร์ดแวร์กายภาพ (Hardware) 🔌</text>

            {/* Center connections (Vertical center at x = 160)
                Flow lines running through center to represent Absolute Center Connection */}
            
            {/* Path 1: User to App */}
            <path d="M 160,55 L 160,90" fill="none" stroke={activeRequest !== 'none' && flowProgress >= 0 ? "#6366F1" : "#475569"} strokeWidth="2" 
                  strokeDasharray={activeRequest !== 'none' && flowProgress >= 0 ? "5,5" : "none"} 
                  className={activeRequest !== 'none' && flowProgress < 25 ? "animate-[dash_1s_linear_infinite]" : ""} />

            {/* Path 2: App to OS */}
            <path d="M 160,125 L 160,160" fill="none" stroke={activeRequest !== 'none' && flowProgress >= 25 ? "#6366F1" : "#475569"} strokeWidth="2" 
                  strokeDasharray={activeRequest !== 'none' && flowProgress >= 25 ? "5,5" : "none"}
                  className={activeRequest !== 'none' && flowProgress >= 25 && flowProgress < 50 ? "animate-[dash_1s_linear_infinite]" : ""} />

            {/* Path 3: OS to Hardware */}
            <path d="M 160,195 L 160,230" fill="none" stroke={activeRequest !== 'none' && flowProgress >= 50 ? "#10B981" : "#475569"} strokeWidth="2" 
                  strokeDasharray={activeRequest !== 'none' && flowProgress >= 50 ? "5,5" : "none"}
                  className={activeRequest !== 'none' && flowProgress >= 50 && flowProgress < 75 ? "animate-[dash_1s_linear_infinite]" : ""} />

            {/* Target indicator flow for specific hardware */}
            {activeRequest !== 'none' && flowProgress === 100 && (
              <circle cx="160" cy="247" r="8" fill="#10B981" className="animate-ping opacity-75" />
            )}
          </svg>

          {/* Progress bar */}
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-indigo-500 h-full transition-all duration-500" style={{ width: `${flowProgress}%` }} />
          </div>
        </div>

        {/* Right column: Controls & Interactive Logs */}
        <div className="space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[13px] font-bold text-slate-400 uppercase block tracking-wider">ทดลองคลิกส่งกิจกรรมของผู้ใช้</span>
            <div className="flex flex-col gap-2.5">
              {Object.keys(requests).map(key => {
                const req = requests[key];
                return (
                  <button
                    key={key}
                    onClick={() => startSimulation(key)}
                    disabled={flowProgress > 0 && flowProgress < 100}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 active:scale-98 flex items-start gap-3 group ${
                      activeRequest === key
                        ? 'border-indigo-500 bg-indigo-50/70 text-indigo-900 font-semibold'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="grow">
                      <p className="text-[15px] font-bold">{req.label}</p>
                      <p className="text-[12px] text-slate-500 font-normal leading-normal mt-0.5">{req.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 self-center group-hover:translate-x-1 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Virtual console */}
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase tracking-wider flex justify-between items-center border-b border-slate-800/60 pb-1.5">
              <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> Virtual Kernel Event Logger</span>
              {flowProgress > 0 && flowProgress < 100 && (
                <span className="text-indigo-400 flex items-center gap-1 text-[9px]"><RefreshCw className="w-2.5 h-2.5 animate-spin" /> TRANSITING</span>
              )}
            </div>
            
            <div className="space-y-1.5 min-h-[140px] max-h-[140px] overflow-y-auto leading-relaxed">
              {consoleLog.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-slate-600 font-mono select-none">&gt;&gt;</span>
                  <p className={`text-[12px] font-mono ${
                    log.includes('✅') 
                      ? 'text-emerald-400 font-bold' 
                      : log.startsWith('[OS') 
                      ? 'text-sky-300' 
                      : log.startsWith('[HARD') 
                      ? 'text-pink-300' 
                      : 'text-slate-300'
                  }`}>
                    {log}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. CLI vs GUI SHELL INTERPRETER (Subtopic 3.1.2)
   ═══════════════════════════════════════════════════════════════════ */
function ShellInterpreterSimulator() {
  const [mode, setMode] = useState('cli'); // 'cli' | 'gui'
  const [terminalLogs, setTerminalLogs] = useState(['$ type standard terminal command, or click options below']);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState(['curriculum.md', 'note.txt', 'backup.zip']);
  const [activeExplain, setActiveExplain] = useState({
    shell: 'Shell ยืนสแตนด์บายรับคำสั่ง',
    kernel: 'Kernel รอควบคุมระดับต่ำ',
    hardware: 'Hardware สงบนิ่งรับไฟฟ้าเลี้ยง'
  });

  const commands = {
    ls: {
      cmd: 'ls',
      guiLabel: '📂 แสดงรายการไฟล์ทั้งหมด',
      logs: [
        '$ ls',
        'Kernel call: sys_readdir()',
        'Hardware action: HDD/SSD read blocks completed',
        'Output: curriculum.md  note.txt  backup.zip'
      ],
      explain: {
        shell: 'Shell รับคำสั่งอักษร "ls" ตรวจเช็คไวยากรณ์ ค้นหา PATH แล้วแปลงเป็น System call สั่งให้อ่านไดเรกทอรี',
        kernel: 'Kernel รับ System call sys_readdir ค้นหารหัสพาร์ติชันในเมนบอร์ด และเข้าอ่านสารบัญดิสก์ไฟล์บล็อกถาวร',
        hardware: 'อุปกรณ์จัดเก็บข้อมูล (SSD) ได้รับสัญญาณการจ่ายไฟอ่านตำแหน่ง และส่งคืนรหัสตารางไฟล์ให้ระบบปฏิบัติการ'
      }
    },
    mkdir: {
      cmd: 'mkdir documents',
      guiLabel: '➕ สร้างโฟลเดอร์ใหม่ (documents)',
      logs: [
        '$ mkdir documents',
        'Kernel call: sys_mkdir("documents")',
        'Hardware action: Flash cells written on SSD A2',
        'Output: Folder "documents" created.'
      ],
      explain: {
        shell: 'Shell แกะไวยากรณ์ "mkdir" ทราบว่าเป็นการสร้างโฟลเดอร์ย่อย พร้อมชื่อโฟลเดอร์ปลายทาง คัดกรองส่งให้ Kernel',
        kernel: 'Kernel จัดการ allocate ตารางพาร์ติชัน กำหนด inode ใหม่ บันทึกสิทธิ์การปกป้องรักษาความปลอดภัยลงตารางระบบ',
        hardware: 'ชิปแฟลชคอนโทรลเลอร์สั่งฉีดแรงดันเข้าเซลล์จัดเก็บ คีย์ลงตำแหน่งตารางเพื่อบันทึกโฟลเดอร์ถาวร'
      }
    },
    rm: {
      cmd: 'rm backup.zip',
      guiLabel: '🗑️ ลบไฟล์ข้อมูล (backup.zip)',
      logs: [
        '$ rm backup.zip',
        'Kernel call: sys_unlink("backup.zip")',
        'Hardware action: Inode metadata cleared from SSD',
        'Output: backup.zip deleted.'
      ],
      explain: {
        shell: 'Shell แปลงคำสั่ง "rm" เป็นคำขอทางตรรกะแบบ CLI ส่งสัญญาณทำความเข้าใจการเชื่อมโยงระบบย่อย',
        kernel: 'Kernel เข้าเคลียร์ค่าอินเด็กซ์ตัวชี้ระบุพิกัดของไฟล์ในสารบัญระบบ ทำให้พื้นที่จานหมุนว่างพร้อมเขียนใหม่',
        hardware: 'ตัวบันทึกฮาร์ดแวร์ SSD ได้รับคำสั่ง TRIM คอนโทรลเลอร์เคลียร์การล็อกแรงดัน พร้อมลบไฟล์ถาวร'
      }
    }
  };

  const handleCommand = (key) => {
    setIsLoading(true);
    const cmd = commands[key];
    
    // Simulate terminal response delay
    setTimeout(() => {
      setIsLoading(false);
      setTerminalLogs(cmd.logs);
      setActiveExplain(cmd.explain);

      // Perform state updates based on file modifications
      if (key === 'mkdir') {
        setFiles(prev => prev.includes('documents') ? prev : [...prev, 'documents']);
      } else if (key === 'rm') {
        setFiles(prev => prev.filter(f => f !== 'backup.zip'));
      } else if (key === 'ls') {
        // Reset file state if deleted
      }
    }, 800);
  };

  const resetAll = () => {
    setFiles(['curriculum.md', 'note.txt', 'backup.zip']);
    setTerminalLogs(['$ system reset complete. Waiting command...']);
    setActiveExplain({
      shell: 'Shell ยืนสแตนด์บายรับคำสั่ง',
      kernel: 'Kernel รอควบคุมระดับต่ำ',
      hardware: 'Hardware สงบนิ่งรับไฟฟ้าเลี้ยง'
    });
  };

  return (
    <SimulatorShell
      icon={<Terminal className="w-6 h-6 text-slate-200" />}
      title="เครื่องจำลองการรับและทำความเข้าใจคำสั่ง (CLI vs GUI Shell-Kernel Interpreter)"
      dark
    >
      <div className="space-y-6">
        
        {/* Mode & Switcher Bar */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div className="flex gap-2">
            <button
              onClick={() => setMode('cli')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mode === 'cli'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              💻 CLI Terminal Mode
            </button>
            <button
              onClick={() => setMode('gui')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mode === 'gui'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              🖥️ GUI Explorer Mode
            </button>
          </div>
          <button
            onClick={resetAll}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-400 hover:text-white rounded-lg transition-all cursor-pointer flex items-center gap-1 text-[11px]"
            title="รีเซ็ตโปรแกรมจำลอง"
          >
            <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ต
          </button>
        </div>

        {/* Visual Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Left panel: Active CLI Terminal OR GUI explorer */}
          {mode === 'cli' ? (
            <ConsoleScreen
              label="# visual cli prompt (bash shell)"
              accentLabel="shell-terminal active"
              accentColor="text-indigo-400"
              isLoading={isLoading}
              multiline
              output={terminalLogs.join('\n')}
              outputColor="text-indigo-300"
            />
          ) : (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-inner flex flex-col justify-between min-h-[250px]">
              <div>
                <div className="flex justify-between items-center text-slate-400 text-[10px] font-mono border-b border-slate-100 pb-2 mb-4">
                  <span>📂 VISUAL FILE EXPLORER</span>
                  <span className="text-emerald-500 font-bold">GUI RUNNING</span>
                </div>
                
                {/* Visual File Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {files.map((file, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-center shadow-sm relative overflow-hidden group">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto text-lg mb-1.5">
                        {file.includes('.') ? '📄' : '📁'}
                      </div>
                      <p className="text-[12px] font-bold text-slate-700 truncate">{file}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-right mt-4">
                <span className="text-[10px] font-mono text-slate-400">STATUS: {files.length} ITEMS DETECTED IN STORAGE</span>
              </div>
            </div>
          )}

          {/* Right panel: Active action buttons & OS Behind-the-scenes explanation */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">คลิกสั่งคำสั่งเพื่อตรวจทาน System Call เบื้องหลัง</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {Object.keys(commands).map(key => {
                  const item = commands[key];
                  return (
                    <button
                      key={key}
                      onClick={() => handleCommand(key)}
                      disabled={isLoading}
                      className="px-3 py-3 bg-slate-800 hover:bg-slate-700 active:scale-98 border border-slate-700 text-white rounded-xl text-xs font-bold text-center cursor-pointer transition-all leading-snug"
                    >
                      <p className="text-[10px] text-slate-400 font-mono mb-0.5">{mode === 'cli' ? `$ ${item.cmd}` : 'GUI ACTION'}</p>
                      <p>{item.guiLabel.split(' ')[0]} {item.guiLabel.split(' ').slice(1).join(' ')}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation box */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <span className="text-[11px] font-mono text-indigo-400 block border-b border-slate-800 pb-1 uppercase tracking-wider">ระบบความสัมพันธ์ระบบปฏิบัติการ (OS Layer Action)</span>
              
              <div className="space-y-2 text-xs leading-normal">
                <p className="text-slate-300"><strong className="text-indigo-400">👤 1. Shell Layer:</strong> {activeExplain.shell}</p>
                <p className="text-slate-300"><strong className="text-emerald-400">⚙️ 2. Kernel Mode:</strong> {activeExplain.kernel}</p>
                <p className="text-slate-300"><strong className="text-pink-400">🔌 3. Hardware State:</strong> {activeExplain.hardware}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. RESOURCE SCHEDULER & PAGING SIMULATOR (Subtopic 3.1.3)
   ═══════════════════════════════════════════════════════════════════ */
function ResourceManagementSimulator() {
  // 1. Process CPU Scheduling state
  const [runningProcesses, setRunningProcesses] = useState([
    { id: 'P1', name: 'Web Browser', state: 'Running', color: 'bg-emerald-500/80 text-emerald-950 border-emerald-400' },
    { id: 'P2', name: 'Document Writer', state: 'Ready', color: 'bg-indigo-500/80 text-white border-indigo-400' },
    { id: 'P3', name: 'Music Player', state: 'Blocked', color: 'bg-amber-500/80 text-amber-950 border-amber-400' }
  ]);
  const [schedulingLog, setSchedulingLog] = useState(['[SCHEDULER] เริ่มต้นจัดคิว Time-Slicing แกนหลักประมวลผล...']);

  // 2. RAM Memory Swapping state
  const [ramPages, setRamPages] = useState(['OS Kernel', 'System UI', 'Disk Cache', 'Active Driver', 'Empty', 'Empty', 'Empty', 'Empty']);
  const [swapPages, setSwapPages] = useState([]);
  const [ramLog, setRamLog] = useState(['[MEMORY] พื้นที่แรม 8 Pages พร้อมใช้งาน (ว่าง 50%)']);

  // Handle manual process launch
  const handleLaunchProcess = () => {
    // 1. Add process to scheduler
    const id = `P${runningProcesses.length + 1}`;
    const names = ['Video Editor', 'IDE Compiler', 'SQL Database Server', 'Graphics Engine'];
    const selectedName = names[Math.floor(Math.random() * names.length)];
    
    const newProc = {
      id,
      name: selectedName,
      state: 'Ready',
      color: 'bg-purple-500/80 text-white border-purple-400'
    };

    setRunningProcesses(prev => [...prev, newProc]);
    setSchedulingLog(prev => [...prev, `[SCHEDULER] โปรเซสใหม่ ${id} (${selectedName}) ได้รับคิว Ready แล้ว`]);

    // 2. Try allocating RAM blocks
    setRamPages(currentRam => {
      const emptyIdx = currentRam.indexOf('Empty');
      if (emptyIdx !== -1) {
        // Space available in RAM
        const newRam = [...currentRam];
        newRam[emptyIdx] = selectedName;
        setRamLog(prev => [...prev, `[MEM] จัดสรรหน้าแรม (Page ${emptyIdx}) ให้กับ ${selectedName} สำเร็จ`]);
        return newRam;
      } else {
        // RAM full! Trigger Swapping!
        const victimIdx = 4; // Select first custom page as victim
        const victimName = currentRam[victimIdx];
        
        const newRam = [...currentRam];
        newRam[victimIdx] = selectedName; // Replace victim

        setSwapPages(prevSwap => [...prevSwap, victimName]);
        setRamLog(prev => [
          ...prev,
          `[⚠️ แรมเต็ม] RAM Page ${victimIdx} ถูกทำความสะอาด!`,
          `[SWAP OUT] ย้าย "${victimName}" ไปหน่วยความจำเสมือน (Swap/Disk)`
        ]);
        return newRam;
      }
    });
  };

  const handleTaskSwitch = () => {
    // CPU scheduling tick logic
    setRunningProcesses(prev => {
      const next = prev.map(p => {
        if (p.state === 'Running') return { ...p, state: 'Ready' };
        if (p.state === 'Ready') return { ...p, state: 'Running' };
        return p;
      });
      
      const running = next.find(p => p.state === 'Running');
      if (running) {
        setSchedulingLog(prevLog => [...prevLog, `[CPU TICK] สลับโปรเซส "${running.name}" ขึ้นประมวลผลบนแกนหลัก`]);
      }
      return next;
    });
  };

  const resetSimulator = () => {
    setRunningProcesses([
      { id: 'P1', name: 'Web Browser', state: 'Running', color: 'bg-emerald-500/80 text-emerald-950 border-emerald-400' },
      { id: 'P2', name: 'Document Writer', state: 'Ready', color: 'bg-indigo-500/80 text-white border-indigo-400' },
      { id: 'P3', name: 'Music Player', state: 'Blocked', color: 'bg-amber-500/80 text-amber-950 border-amber-400' }
    ]);
    setSchedulingLog(['[SCHEDULER] รีเซ็ตระบบจัดลำดับ CPU เรียบร้อย']);
    setRamPages(['OS Kernel', 'System UI', 'Disk Cache', 'Active Driver', 'Empty', 'Empty', 'Empty', 'Empty']);
    setSwapPages([]);
    setRamLog(['[MEMORY] ล้างตารางแรมและ Swap Space สำเร็จ']);
  };

  return (
    <SimulatorShell
      icon={<Cpu className="w-6 h-6 text-indigo-500" />}
      title="ระบบจัดการทรัพยากรระบบปฏิบัติการ (OS Core Resource Scheduler & Memory Manager)"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="space-y-6">
        
        {/* Core Controls */}
        <div className="flex flex-wrap justify-between items-center gap-3 bg-slate-50 p-4 border border-slate-100 rounded-2xl">
          <div className="flex gap-2">
            <button
              onClick={handleLaunchProcess}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> เปิดโปรแกรมขนาดใหญ่ (Launch Heavy App)
            </button>
            <button
              onClick={handleTaskSwitch}
              className="px-4 py-2 border border-slate-300 hover:border-slate-400 active:scale-98 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-all bg-white"
            >
              🔄 สลับงาน (Task Switch)
            </button>
          </div>
          <button
            onClick={resetSimulator}
            className="p-1.5 hover:bg-slate-200 text-slate-500 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-[11px]"
          >
            <RotateCcw className="w-3.5 h-3.5" /> ล้างสเตตทั้งหมด
          </button>
        </div>

        {/* 2-Column Core Pill Demos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Column 1: CPU Scheduler Visual Block */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 flex flex-col justify-between shadow-sm min-h-[360px]">
            <div>
              <div className="flex justify-between items-center text-slate-400 text-[10px] font-mono border-b border-slate-100 pb-2 mb-4">
                <span>🖥️ CPU TASK PROCESS SCHEDULER</span>
                <span className="text-indigo-600 font-bold">SCHEDULING ACTIVE</span>
              </div>

              {/* Grid of processes */}
              <div className="space-y-2">
                {runningProcesses.map((proc, i) => (
                  <div key={i} className={`p-3 rounded-xl border flex justify-between items-center transition-all ${proc.color}`}>
                    <div>
                      <span className="font-mono text-xs opacity-70 block">{proc.id}</span>
                      <strong className="text-sm font-bold">{proc.name}</strong>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      proc.state === 'Running' 
                        ? 'bg-black/20 text-white animate-pulse' 
                        : proc.state === 'Ready' 
                        ? 'bg-white/30 text-slate-800' 
                        : 'bg-black/10 text-slate-800'
                    }`}>
                      {proc.state}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scheduling log console */}
            <div className="bg-slate-900 text-slate-300 p-3.5 rounded-xl font-mono text-[11.5px] max-h-[100px] overflow-y-auto mt-4 space-y-1">
              {schedulingLog.slice(-3).map((log, i) => (
                <div key={i} className="truncate text-slate-400">&gt; {log}</div>
              ))}
            </div>
          </div>

          {/* Column 2: RAM memory swap blocks with absolute center connection */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 flex flex-col justify-between shadow-sm min-h-[360px]">
            <div>
              <div className="flex justify-between items-center text-slate-400 text-[10px] font-mono border-b border-slate-100 pb-2 mb-3">
                <span>💾 PHYSICAL RAM & VIRTUAL SWAP</span>
                <span className="text-cyan-600 font-bold">MEMORY ACTIVE</span>
              </div>

              {/* Grid of RAM blocks */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {ramPages.map((page, i) => {
                  const isEmpty = page === 'Empty';
                  return (
                    <div 
                      key={i} 
                      className={`p-2 rounded-lg border text-center transition-all duration-300 text-[11px] ${
                        isEmpty 
                          ? 'border-slate-100 bg-slate-50 text-slate-300'
                          : page === 'OS Kernel' || page === 'System UI'
                          ? 'border-indigo-100 bg-indigo-50/50 text-indigo-700 font-bold'
                          : 'border-cyan-200 bg-cyan-50/70 text-cyan-800 font-black shadow-sm'
                      }`}
                    >
                      <span className="text-[9px] block text-slate-400 mb-0.5">Page {i}</span>
                      <p className="truncate font-sans font-semibold leading-normal">{page}</p>
                    </div>
                  );
                })}
              </div>

              {/* Virtual Memory Swap area on disk */}
              <div className="border-t border-slate-100 pt-3 mt-1">
                <span className="text-[10px] font-mono text-slate-400 block mb-2">VIRTUAL SWAP MEMORY (ON HARD DISK)</span>
                <div className="flex flex-wrap gap-1.5 min-h-[40px] p-2 bg-slate-50 rounded-xl border border-slate-100">
                  {swapPages.length === 0 ? (
                    <span className="text-slate-400 text-xs italic self-center mx-auto">ยังไม่มีข้อมูล Swap out</span>
                  ) : (
                    swapPages.map((s, i) => (
                      <span key={i} className="px-2 py-1 bg-amber-100 border border-amber-200 text-amber-900 rounded-lg text-[10px] font-bold animate-bounce">
                        🔄 {s} (Paged Out)
                      </span>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* RAM log console */}
            <div className="bg-slate-900 text-slate-300 p-3.5 rounded-xl font-mono text-[11.5px] max-h-[100px] overflow-y-auto mt-4 space-y-1">
              {ramLog.slice(-3).map((log, i) => (
                <div key={i} className={`truncate ${log.includes('SWAP') ? 'text-amber-300' : 'text-slate-400'}`}>&gt; {log}</div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. OS COMPARISON MATRIX (Subtopic 3.1.4)
   ═══════════════════════════════════════════════════════════════════ */
function OsComparisonMatrix() {
  const [selectedOS, setSelectedOS] = useState('win');

  const osData = {
    win: {
      name: 'Windows / Windows Server',
      desc: 'ระบบปฏิบัติการยอดนิยมระดับโลกสถาปัตยกรรมปิดเชิงพาณิชย์ของ Microsoft โดดเด่นในระบบสนับสนุนผู้ใช้งานคอมพิวเตอร์ทั่วไป และระบบเครือข่ายส่วนกลางในองค์กร',
      accent: 'indigo',
      stats: [
        { label: 'สิทธิ์การใช้งาน (Licensing)', val: 'เชิงพาณิชย์ (Proprietary / Paid)' },
        { label: 'รุ่นส่วนบุคคล (Client)', val: 'Windows 10, Windows 11 Home/Pro' },
        { label: 'รุ่นควบคุมเครือข่าย (Server)', val: 'Windows Server 2019, 2022, 2025' },
        { label: 'จุดเด่นทางวิศวกรรม', val: 'Active Directory, NTFS, คอมแพตทิเบิลฮาร์ดแวร์กว้างขวาง' },
      ],
      pros: 'แอปพลิเคชันและเกมรองรับเยอะที่สุด การควบคุมจัดสรรแบรนด์ข้ามเครื่องด้วย AD ยอดเยี่ยม',
      cons: 'ลิขสิทธิ์ราคาสูง มีความเปราะบางต่อไวรัสทางระบบเครือข่ายมากกว่า'
    },
    mac: {
      name: 'macOS / Darwin Core',
      desc: 'ระบบปฏิบัติการระดับสถาปัตยกรรมปิดบนพื้นฐาน Unix พัฒนาโดย Apple รันอย่างเฉพาะเจาะจงเฉพาะเครื่องคอมพิวเตอร์ระดับพรีเมียมตระกูล Mac',
      accent: 'teal',
      stats: [
        { label: 'สิทธิ์การใช้งาน (Licensing)', val: 'เชิงพาณิชย์พรีเมียม (พ่วงฮาร์ดแวร์ Mac)' },
        { label: 'รุ่นส่วนบุคคล (Client)', val: 'macOS Sequoia, Sonoma, Ventura' },
        { label: 'รุ่นควบคุมเครือข่าย (Server)', val: 'ไม่มีเซิร์ฟเวอร์เฉพาะแยกในปัจจุบัน (ใช้ CLI Unix/Linux แทน)' },
        { label: 'จุดเด่นทางวิศวกรรม', val: 'APFS, สอดคล้องตามเกณฑ์ความมั่นคง POSIX Unix, โครงสร้าง Metal Graphic API' },
      ],
      pros: 'ความปลอดภัยระบบเสถียรขั้นสูง ความเข้ากันได้กับกลุ่มนักพัฒนาและศิลปินสร้างสรรค์',
      cons: 'ต้องจัดซื้อพร้อมตัวเครื่องราคาสูง ปรับแต่งชิ้นส่วนทางอิเล็กทรอนิกส์ได้ยาก'
    },
    linux: {
      name: 'Linux Distributions (Distros)',
      desc: 'ระบบปฏิบัติการแบบโอเพนซอร์ส (Open-source) โครงสร้าง Kernel ก่อกำเนิดโดย Linus Torvalds ได้รับความนิยมสูงสุดในการควบคุมโครงข่ายโฮสติ้งเซิร์ฟเวอร์คลาวด์ทั่วโลก',
      accent: 'orange',
      stats: [
        { label: 'สิทธิ์การใช้งาน (Licensing)', val: 'โอเพนซอร์สแจกฟรี (GNU GPL v2/v3)' },
        { label: 'รุ่นส่วนบุคคล (Client)', val: 'Ubuntu Desktop, Linux Mint, Fedora' },
        { label: 'รุ่นควบคุมเครือข่าย (Server)', val: 'Red Hat Enterprise (RHEL), Debian, Rocky Linux' },
        { label: 'จุดเด่นทางวิศวกรรม', val: 'ext4, ควบคุมความปลอดภัยสิทธิ์ละเอียด, ปฏิบัติการเบาและเสถียรสูงสุด' },
      ],
      pros: 'ประสิทธิภาพความเสถียรสูงสุด รันยาวนานโดยไม่ต้องรีบูต ปราศจากค่าลิขสิทธิ์',
      cons: 'ขั้นตอนการพิมพ์ CLI ที่มีความยุ่งยากสำหรับผู้ใช้ทั่วไป โปรแกรมประยุกต์สำนักงานไม่สมบูรณ์เท่าฝั่ง Windows'
    }
  };

  const active = osData[selectedOS];

  return (
    <SectionBlock
      title="ตารางเปรียบเทียบระบบปฏิบัติการเชิงสากล"
      icon={<Server className="w-5 h-5 text-indigo-500" />}
      description="ตารางเปรียบเทียบบทบาทหน้าที่ คุณลักษณะการจัดสรร และโครงสร้างรุ่น Client vs Server"
      variant="default"
      accent="indigo"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mt-4">
        
        {/* Left column: Selection Cards */}
        <div className="flex flex-col gap-3">
          {Object.keys(osData).map(key => {
            const os = osData[key];
            const isSel = selectedOS === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedOS(key)}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 active:scale-98 flex items-center justify-between ${
                  isSel
                    ? 'border-indigo-500 bg-indigo-50/70 text-indigo-900 shadow-sm font-bold'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono block text-slate-400">{key.toUpperCase()} ARCHITECTURE</span>
                  <p className="text-[15px]">{os.name.split('/')[0]}</p>
                </div>
                <ChevronRight className={`w-4 h-4 text-slate-400 ${isSel ? 'text-indigo-600 translate-x-1' : ''} transition-transform`} />
              </button>
            );
          })}
        </div>

        {/* Right column: Detailed Comparison Dashboard */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
          
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-mono text-slate-400 block tracking-wider">SELECTED OPERATING SYSTEM PROFILE</span>
              <h4 className="text-xl font-bold text-slate-800 leading-tight mt-0.5">{active.name}</h4>
              <p className="text-sm text-slate-500 font-normal leading-relaxed mt-1.5">{active.desc}</p>
            </div>

            {/* Stats list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs font-sans">
              {active.stats.map((stat, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center">
                  <span className="text-slate-400 block mb-0.5">{stat.label}:</span>
                  <span className="font-bold text-slate-700 leading-normal">{stat.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pros & Cons panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 border-t border-slate-100 pt-4 text-xs">
            <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl">
              <strong className="text-emerald-700 block mb-1">🟢 ข้อดีเชิงพาณิชย์/เทคนิค:</strong>
              <p className="text-slate-600 font-normal leading-relaxed">{active.pros}</p>
            </div>
            <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong className="text-rose-700 block mb-1">🔴 ข้อจำกัด/ข้อเสีย:</strong>
              <p className="text-slate-600 font-normal leading-relaxed">{active.cons}</p>
            </div>
          </div>

        </div>

      </div>
    </SectionBlock>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   5. BIT ADDRESS SPACE SIMULATOR (Subtopic 3.1.5)
   ═══════════════════════════════════════════════════════════════════ */
function BitAddressSimulator() {
  const [bitMode, setBitMode] = useState(32); // 32 | 64

  return (
    <SimulatorShell
      icon={<Cpu className="w-6 h-6 text-indigo-500" />}
      title="เครื่องวินิจฉัยพื้นที่อ้างอิงบิต (32-bit vs 64-bit Address Boundary Simulator)"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="space-y-6">
        
        {/* Toggle selectors */}
        <div className="flex justify-center gap-2 border-b border-slate-100 pb-4">
          <button
            onClick={() => setBitMode(32)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer active:scale-98 ${
              bitMode === 32
                ? 'bg-rose-500 text-white shadow shadow-rose-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🛑 โหมด 32-bit (x86 Architecture)
          </button>
          <button
            onClick={() => setBitMode(64)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer active:scale-98 ${
              bitMode === 64
                ? 'bg-emerald-500 text-white shadow shadow-emerald-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🟢 โหมด 64-bit (x64 Architecture)
          </button>
        </div>

        {/* Dynamic Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Left panel: Visual Grid showing memory limits */}
          <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between items-center relative min-h-[280px] select-none text-center">
            <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">ADDRESS BOUNDARY VISUALIZATION</span>
            
            {bitMode === 32 ? (
              <div className="my-auto space-y-4 max-w-xs">
                {/* 32-bit Locked Box */}
                <div className="w-48 h-24 rounded-2xl border-2 border-rose-500/50 bg-rose-950/20 flex flex-col justify-center items-center shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse mx-auto">
                  <span className="text-rose-400 font-mono text-[22px] font-black">4 GB LIMIT</span>
                  <span className="text-rose-500 text-[10px] font-mono">2^32 ADDRESS SPACE</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal font-sans">
                  หากติดตั้งแรม 16GB ลงสล็อต เมนบอร์ดระบบ 32 บิตจะล็อกตำแหน่งตารางไว้ได้เพียง 4GB และปฏิเสธการเข้าถึงส่วนที่เหลืออย่างน่าเสียดาย
                </p>
              </div>
            ) : (
              <div className="my-auto space-y-4 max-w-sm">
                {/* 64-bit Infinite Box */}
                <div className="w-56 h-24 rounded-2xl border-2 border-emerald-500/50 bg-emerald-950/20 flex flex-col justify-center items-center shadow-[0_0_20px_rgba(16,185,129,0.3)] mx-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent animate-[pulse_2s_infinite]" />
                  <span className="text-emerald-400 font-mono text-[22px] font-black">16 Exabytes</span>
                  <span className="text-emerald-500 text-[10px] font-mono">2^64 UNBOUNDED SPACE</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal font-sans">
                  สเกลสอดคล้องตามที่อยู่ที่มองเห็นไม่มีสิ้นสุด ยินยอมการเชื่อมต่อแรมขนาดใดก็ได้เต็มพิกัด JEDEC ดับบิวทรูพูตสูง 100%
                </p>
              </div>
            )}

            {/* Bottom status bar */}
            <div className="w-full bg-slate-900/60 p-2.5 rounded-xl border border-slate-900/80 mt-4 text-[11px] font-mono text-slate-500 flex justify-between">
              <span>REGISTER WIDTH: {bitMode} BITS</span>
              <span>LIMIT: {bitMode === 32 ? '4,294,967,296 bytes' : '18,446,744,073,709,551,616 bytes'}</span>
            </div>

          </div>

          {/* Right panel: Engineering comparison details */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl space-y-2.5">
              <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">ตารางสรุปผลทางวิศวกรรมไอที</span>
              <div className="space-y-2 text-xs font-sans text-slate-600 leading-relaxed font-normal">
                <p className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span>ขอบเขตตำแหน่งหน่วยความจำ:</span> 
                  <strong className="text-slate-800">{bitMode === 32 ? 'ล็อกที่ 4 GB' : 'แทบไม่มีขีดจำกัด (16 EB)'}</strong>
                </p>
                <p className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span>ความกว้างคำสั่ง CPU (Word Size):</span> 
                  <strong className="text-slate-800">{bitMode === 32 ? '32 บิต (4 ไบต์ต่อคำสั่ง)' : '64 บิต (8 ไบต์ต่อคำสั่ง)'}</strong>
                </p>
                <p className="flex justify-between pb-1">
                  <span>คอมพิวเตอร์และระบบปฏิบัติการยุคใหม่:</span> 
                  <strong className="text-slate-800">{bitMode === 32 ? 'ยกเลิกการติดตั้งส่วนใหญ่' : 'มาตรฐานกระแสหลัก 100%'}</strong>
                </p>
              </div>
            </div>

            <div className={`p-4 rounded-xl border text-xs leading-normal font-sans font-normal ${
              bitMode === 32 
                ? 'bg-rose-50 border-rose-100 text-rose-800' 
                : 'bg-emerald-50 border-emerald-100 text-emerald-800'
            }`}>
              <strong className="block mb-1">
                {bitMode === 32 ? '⚠️ คำเตือนสำหรับช่างคอมพิวเตอร์:' : '💡 ข้อแนะนำเชิงพัฒนาวิชาชีพ:'}
              </strong>
              <p>
                {bitMode === 32 
                  ? 'หลีกเลี่ยงการลง Windows OS 32-bit บนระบบฮาร์ดแวร์รุ่นใหม่ เพราะจะทำให้ CPU ขยายประสิทธิภาพไม่ได้ และจะใช้แรมได้ไม่เกิน 4GB แม้เครื่องจะมีแรมขนาดใหญ่ก็ตาม'
                  : 'ในการติดตั้งระบบสเกล Server หรือ Client สำนักงาน ให้คัดเลือก OS 64-bit เสมอ เพื่อรับรองชุดคำสั่งความเร็ว และการใช้งานหน่วยความจำขั้นสูงอย่างเต็มพิกัด'
                }
              </p>
            </div>
          </div>

        </div>

      </div>
    </SimulatorShell>
  );
}
