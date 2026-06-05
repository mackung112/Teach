/**
 * it3_2.jsx — หน่วยที่ 3.2 การเตรียมการก่อนติดตั้งระบบปฏิบัติการ
 * ====================================================================
 * Vertical Stacking Page Architecture: 6 subtopics + Interactive Demos + Quiz + Task
 * Immersive Full-Page Standard (4 Layers) — Fluid Open-Air Layout
 * NO sounds | NO dynamic Tailwind | Local State only
 * Deduplication via reuse of Shared Base Components
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  Monitor, Cpu, MemoryStick, HardDrive, Terminal, Layers, ArrowRight,
  RotateCcw, Play, Pause, Plus, Trash2, CheckCircle2, AlertTriangle,
  HelpCircle, Server, User, AppWindow, Database, RefreshCw, Info, Check,
  ShieldAlert, Settings, ChevronRight, FileText, Key, Award, AlertCircle
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
const IT3_2_BLOBS = [
  { color: 'bg-indigo-200',  size: 'w-96 h-96', position: '-top-20 -left-20',       opacity: 'opacity-35' },
  { color: 'bg-cyan-200',    size: 'w-80 h-80', position: 'top-1/3 -right-20',      opacity: 'opacity-30' },
  { color: 'bg-purple-200',  size: 'w-72 h-72', position: '-bottom-20 left-1/4',     opacity: 'opacity-25' },
  { color: 'bg-blue-200',    size: 'w-60 h-60', position: 'top-2/3 right-1/3',       opacity: 'opacity-20' },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA: QUIZ FOR UNIT 3.2
   ═══════════════════════════════════════════════════════════════════ */
const QUIZ_LEVELS = [
  {
    title: 'โจทย์ที่ 1: มาตรฐานความต้องการขั้นต่ำของ Windows 11',
    desc: 'ฟังก์ชันระบบความปลอดภัยของฮาร์ดแวร์ตัวใดต่อไปนี้ที่เป็นเงื่อนไขบังคับ (Strictly Required) ในการจัดสเปกคอมพิวเตอร์เพื่อบูตติดตั้ง Windows 11?',
    options: [
      { key: 'A', text: 'การติดตั้งการ์ดเชื่อมต่อเครือข่ายแลนแบบ 10Gbps คู่ตีเกลียว', isCorrect: false },
      { key: 'B', text: 'การเปิดใช้งาน Secure Boot ร่วมกับชิปโมดูลความปลอดภัย TPM 2.0 บนเมนบอร์ด', isCorrect: true },
      { key: 'C', text: 'การแบ่งตารางพาร์ติชันในโครงสร้างแบบ MBR เพื่อรองรับดิสก์จัดเก็บขนาด 8TB', isCorrect: false },
      { key: 'D', text: 'การลดความต้องการของ CPU ให้เหลือ 1 คอร์ประมวลผลเพื่อการประหยัดกระแสไฟ', isCorrect: false }
    ],
    tip: 'Windows 11 มุ่งเน้นความมั่นคงปลอดภัย จึงกำหนดมาตรฐาน UEFI ร่วมกับ Secure Boot และ TPM 2.0'
  },
  {
    title: 'โจทย์ที่ 2: ความเข้ากันได้ในการเขียน Rufus Bootable USB',
    desc: 'ในการใช้โปรแกรม Rufus เตรียมสื่อติดตั้งระบบปฏิบัติการ หากผู้เรียนเลือกสกีมาพาร์ติชันเป็น GPT ระบบเป้าหมายจะถูกกำหนดค่าให้บูตในโหมดใด?',
    options: [
      { key: 'A', text: 'บูตโหมด Legacy BIOS (or UEFI-CSM) เสมอเพื่อการรองรับคอมพิวเตอร์รุ่นโบราณ', isCorrect: false },
      { key: 'B', text: 'บูตในระบบไฟล์ FAT16 เพื่อขยายพื้นที่จัดเก็บข้อมูลให้เกิน 2TB', isCorrect: false },
      { key: 'C', text: 'บูตโหมด UEFI (non CSM) เท่านั้นเพื่อให้สอดคล้องกับตารางโครงสร้าง GPT ยุคใหม่', isCorrect: true },
      { key: 'D', text: 'บูตข้ามขั้นตอน Power-On Self-Test (POST) เพื่อความรวดเร็วในการเปิดเครื่อง', isCorrect: false }
    ],
    tip: 'สกีมาพาร์ติชันแบบ GPT มีความเชื่อมโยงโดยตรงกับระบบการบูตแบบยุคใหม่คือ UEFI'
  },
  {
    title: 'โจทย์ที่ 3: ข้อจำกัดทางสถาปัตยกรรมของ FAT32',
    desc: 'หากช่างเทคนิคฟอร์แมตแฟลชไดรฟ์เป็นระบบไฟล์แบบ FAT32 จะพบข้อจำกัดสำคัญที่สุดในเชิงวิศวกรรมไฟล์ข้อมูลอย่างไร?',
    options: [
      { key: 'A', text: 'ไม่สามารถจัดเก็บข้อมูลรูปภาพและไฟล์เสียงคุณภาพสตรีมมิ่งได้เลย', isCorrect: false },
      { key: 'B', text: 'ไม่สามารถโยนหรือคัดลอกไฟล์เดี่ยวที่มีขนาดความจุเกินกว่า 4GB ลงในไดรฟ์ได้', isCorrect: true },
      { key: 'C', text: 'ระบบไฟล์จะล็อกความเร็วในการถ่ายโอนสัญญาณไว้คงที่ที่ 1.5MB/s', isCorrect: false },
      { key: 'D', text: 'ไม่สามารถเขียนโปรแกรมลงในไดรฟ์เพื่อให้รันใน Windows 11 ได้', isCorrect: false }
    ],
    tip: 'FAT32 ใช้ตารางการอ้างอิงตำแหน่งขนาด 32 บิต ทำให้รองรับไฟล์เดี่ยวได้สูงสุดเพียง 4GB เท่านั้น'
  },
  {
    title: 'โจทย์ที่ 4: เพดานพื้นที่จัดเก็บของตาราง MBR',
    desc: 'เหตุผลใดที่ทำให้การจัดตารางพาร์ติชันแบบ MBR ไม่เหมาะสำหรับการนำไปติดตั้งร่วมกับฮาร์ดดิสก์ความจุสูงขนาด 10TB?',
    options: [
      { key: 'A', text: 'MBR จะบังคับให้ CPU รันงานประมวลผลความร้อนสูงขึ้นจนคอมพิวเตอร์ดับ', isCorrect: false },
      { key: 'B', text: 'MBR มีระบบอ้างที่อยู่ 32 บิต ทำให้สามารถใช้งานพื้นที่จัดเก็บดิสก์ได้สูงสุดเพียง 2.2TB และพื้นที่ส่วนที่เหลือจะสูญเปล่าใช้งานไม่ได้', isCorrect: true },
      { key: 'C', text: 'MBR บังคับให้การเชื่อมต่อสายใยแก้วนำแสงในองค์กรมีความเร็วลดลง 50%', isCorrect: false },
      { key: 'D', text: 'MBR รองรับการสร้างพาร์ติชันสูงสุดได้ 128 พาร์ติชัน ซึ่งทำให้เกิดความสับสน', isCorrect: false }
    ],
    tip: 'MBR จำกัดที่การอ้างตำแหน่งเซกเตอร์ 32 บิต ความจุสูงสุดที่รองรับได้จึงสิ้นสุดที่ 2.2TB'
  },
  {
    title: 'โจทย์ที่ 5: สิทธิ์และเงื่อนไขการใช้งานลิขสิทธิ์ OEM',
    desc: 'ข้อกำหนดและข้อจำกัดในทางปฏิบัติที่เป็นเอกลักษณ์เฉพาะของลิขสิทธิ์ระบบปฏิบัติการประเภท OEM (Original Equipment Manufacturer) คือข้อใด?',
    options: [
      { key: 'A', text: 'สามารถโยกย้ายสิทธิ์ไลเซนส์ข้ามไปติดตั้งบนเครื่องเมนบอร์ดชิ้นส่วนใหม่ได้ไม่จำกัดจำนวนครั้ง', isCorrect: false },
      { key: 'B', text: 'สิทธิ์ลิขสิทธิ์จะผูกติดกับแผงวงจรเมนบอร์ดของเครื่องคอมพิวเตอร์ที่ติดตั้งครั้งแรก และไม่สามารถย้ายไปเครื่องอื่นได้', isCorrect: true },
      { key: 'C', text: 'ต้องทำการล็อกอินบัญชี Cloud Enterprise และจ่ายรายเดือนเพื่อรักษาการเชื่อมต่อไว้ตลอดเวลา', isCorrect: false },
      { key: 'D', text: 'ไม่ได้รับสิทธิ์ในการอัปเดตระบบความปลอดภัยและแก้ช่องโหว่จากผู้ผลิตซอฟต์แวร์ต้นทาง', isCorrect: false }
    ],
    tip: 'ลิขสิทธิ์ประเภท OEM มีราคาประหยัดที่สุดเนื่องจากผูกติดถาวรกับตัวอุปกรณ์ฮาร์ดแวร์หลัก (เมนบอร์ด)'
  }
];

export default function ComponentName() {
  return (
    <>
      {/* Layer 1: Ambient Backdrop & Theme Gradients */}
      <AmbientBackdrop blobs={IT3_2_BLOBS} />

      {/* Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── SUBTOPIC 3.2.1 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">การประเมินความเข้ากันได้</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การอ่านสเปกฮาร์ดแวร์และประเมินความต้องการระบบขั้นต่ำ
            </h3>
          </div>
          
          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ก่อนดำเนินการติดตั้งระบบปฏิบัติการ ช่างเทคนิคจำเป็นต้องวิเคราะห์และประเมินสเปกฮาร์ดแวร์เพื่อทดสอบความเข้ากันได้กับระบบเป้าหมาย 
              ความก้าวหน้าของระบบความมั่นคงปลอดภัยยุคใหม่ส่งผลให้ความต้องการขั้นต่ำ (System Requirements) แตกต่างจากในอดีตอย่างมาก 
              การไม่สืบค้นและเตรียมเครื่องล่วงหน้าจะส่งผลให้เกิดความผิดพลาดในการติดตั้งหรือเสื่อมถอยความสามารถในการประมวลผล
            </p>
            <p>
              ในระบบปฏิบัติการสมัยใหม่ เช่น Windows 11 ขีดจำกัดขั้นต่ำถูกยกขึ้นอย่างชัดเจนเพื่อป้องกันสิทธิความเป็นส่วนตัวและการโจรกรรมไซเบอร์ 
              โดยกำหนดให้คอมพิวเตอร์ต้องประกอบด้วยโครงสร้าง CPU ประมวลผลขั้นสูง 64-bit และมีฟีเจอร์สำคัญด้านความมั่นคงระดับฮาร์ดแวร์โดยตรง
            </p>

            {/* Frosted Glass Callout for Tech Specs */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-indigo-600/80 mt-4 space-y-3">
              <h5 className="font-bold text-slate-800 flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-500" /> ตารางสรุปความต้องการขั้นต่ำเพื่อการวิเคราะห์
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[14.5px]">
                <div className="bg-indigo-50/40 p-3.5 rounded-xl border border-indigo-100/60">
                  <span className="font-bold text-indigo-700 block mb-1">Windows 11</span>
                  CPU: 2+ Cores (64-bit)<br />
                  RAM: 4 GB ขึ้นไป<br />
                  Storage: 64 GB ขึ้นไป<br />
                  <span className="text-[13px] text-amber-700 font-semibold block mt-1">💡 Secure Boot & TPM 2.0 บังคับ</span>
                </div>
                <div className="bg-cyan-50/40 p-3.5 rounded-xl border border-cyan-100/60">
                  <span className="font-bold text-cyan-700 block mb-1">Windows 10</span>
                  CPU: 1 Core (64-bit / 32-bit)<br />
                  RAM: 2 GB ขึ้นไป (64-bit)<br />
                  Storage: 32 GB ขึ้นไป<br />
                  <span className="text-[13px] text-slate-500 font-semibold block mt-1">💡 ไม่บังคับ TPM & Secure Boot</span>
                </div>
                <div className="bg-purple-50/40 p-3.5 rounded-xl border border-purple-100/60">
                  <span className="font-bold text-purple-700 block mb-1">Ubuntu Server 22.04</span>
                  CPU: 2 Cores ขึ้นไป<br />
                  RAM: 4 GB ขึ้นไป (แนะนำ)<br />
                  Storage: 25 GB ขึ้นไป<br />
                  <span className="text-[13px] text-slate-500 font-semibold block mt-1">💡 เหมาะแก่คอมพิวเตอร์ทั่วไปและเซิร์ฟเวอร์</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Requirements Simulator */}
          <SystemRequirementsChecker />
        </section>

        {/* ─── SUBTOPIC 3.2.2 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">การเตรียมสื่อบันทึกข้อมูล</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การสร้างสื่อติดตั้งโดยใช้เครื่องมือมาตรฐาน
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              กระบวนการติดตั้งระบบปฏิบัติการยุคปัจจุบันได้ลดทอนการใช้แผ่นออปติคัลดิสก์ (CD/DVD) ลงไปโดยสิ้นเชิง 
              ช่างไอทีใช้สื่อจัดเก็บความจำแบบแฟลชที่มีอินเทอร์เฟซ USB เพื่อความรวดเร็ว โดยอาศัยโปรแกรมอรรถประโยชน์ เช่น 
              <span className="px-1.5 py-0.5 mx-1 font-mono text-[13.5px] font-bold rounded bg-indigo-50/50 border border-indigo-200/50 text-indigo-700">Rufus</span> 
              หรือ <span className="px-1.5 py-0.5 mx-1 font-mono text-[13.5px] font-bold rounded bg-cyan-50/50 border border-cyan-200/50 text-cyan-700">Windows Media Creation Tool</span> 
              เพื่อแปลงสภาพแฟลชไดรฟ์ทั่วไปให้กลายเป็นสื่อที่สามารถบูตได้ (Bootable USB)
            </p>
            <p>
              หัวใจหลักของการกำหนดค่าใน Rufus คือ **ตรรกะความเข้ากันได้ของการบูต (Boot Compatibility Logic)** 
              ซึ่งระบุความสัมพันธ์สมมาตรระหว่างตารางโครงสร้างการจัดพาร์ติชัน (Partition Scheme) และระบบคอมพิวเตอร์เป้าหมาย (Target System):
            </p>
            <ul className="space-y-3.5 my-4">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-indigo-100 text-indigo-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>โครงสร้างแบบ GPT (GUID Partition Table):</strong> ต้องรันประสานกับระบบบูตยุคใหม่แบบ <span className="px-1 py-0.5 font-mono text-[13.5px] bg-indigo-50 rounded text-indigo-700">UEFI (non CSM)</span> เท่านั้น เพื่อความมั่นคงปลอดภัยขั้นสูง
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-indigo-100 text-indigo-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>โครงสร้างแบบ MBR (Master Boot Record):</strong> ต้องรันประสานกับโหมดการบูตแบบเดิม <span className="px-1 py-0.5 font-mono text-[13.5px] bg-indigo-50 rounded text-indigo-700">BIOS (or UEFI-CSM)</span> เพื่อความเข้ากันได้ย้อนหลัง
                </div>
              </li>
            </ul>
          </div>

          {/* Interactive Rufus Simulator */}
          <RufusBootableSimulator />
        </section>

        {/* ─── SUBTOPIC 3.2.3 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">โครงสร้างระดับตรรกะ</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ทฤษฎีระบบไฟล์และความสามารถในการรองรับขนาดไฟล์
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              <strong>ระบบไฟล์ (File System)</strong> คือโครงสร้างระดับตรรกะที่จัดเตรียมระเบียบและกลไกในการจัดระเบียบ 
              ดึงตำแหน่ง จัดเก็บ และกำหนดคุณลักษณะความเป็นส่วนตัวของระบบไฟล์ในอุปกรณ์จัดเก็บข้อมูลถาวร 
              ระบบปฏิบัติการแต่ละค่ายและอุปกรณ์ต้องการการเลือกฟอร์แมตระบบไฟล์ที่สอดคล้องกับคุณสมบัติของไฟล์ที่จะบันทึก
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
              <div className="bg-white/60 p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <h5 className="font-bold text-indigo-600 text-lg mb-1 flex items-center gap-1.5"><Database className="w-5 h-5" /> FAT32 (File Allocation Table 32)</h5>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  เป็นระบบไฟล์สากลรุ่นดั้งเดิมที่มีความเข้ากันได้สูงมากกับอุปกรณ์ระบบปฏิบัติการทุกค่าย ทว่ามีข้อจำกัดทางวิศวกรรมที่สำคัญคือ **ไม่สามารถรองรับขนาดไฟล์เดี่ยวที่มีขนาดเกิน 4GB ได้** และพาร์ติชันความจุรวมสูงสุดมีเพดานตามทฤษฎีที่ต่ำกว่าระบบอื่น
                </p>
              </div>
              <div className="bg-white/60 p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <h5 className="font-bold text-cyan-600 text-lg mb-1 flex items-center gap-1.5"><ShieldAlert className="w-5 h-5" /> NTFS (New Technology File System)</h5>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  ระบบไฟล์หลักของ Windows OS ยุคปัจจุบัน รองรับการบันทึกสิทธิ์ความปลอดภัยในระดับโฟลเดอร์และไฟล์ (Permissions) รองรับการเข้ารหัสข้อมูล มีความทนทานต่อระบบล่มด้วยการทำ Journaling และไร้ปัญหาเรื่องเพดานขนาดไฟล์และพาร์ติชันในทางปฏิบัติ
                </p>
              </div>
              <div className="bg-white/60 p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all md:col-span-2">
                <h5 className="font-bold text-purple-600 text-lg mb-1 flex items-center gap-1.5"><HardDrive className="w-5 h-5" /> exFAT (Extended File Allocation Table)</h5>
                <p className="text-sm text-zinc-500 leading-relaxed font-sans">
                  ถูกพัฒนาเพื่อลบล้างข้อจำกัด 4GB ของ FAT32 โดยรักษาความเรียบง่ายและยืดหยุ่นสูง เหมาะเป็นอย่างยิ่งสำหรับสื่อจัดเก็บข้อมูลประเภทพกพา การ์ดหน่วยความจำกล้องวิดีโอ (SD Cards) ที่ต้องข้ามข้ามระบบปฏิบัติการไปมาระหว่าง Windows และ macOS
                </p>
              </div>
            </div>
          </div>

          {/* Interactive File System copy limits Simulator */}
          <FileSystemLimitSimulator />
        </section>

        {/* ─── SUBTOPIC 3.2.4 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">สถาปัตยกรรมพื้นที่ดิสก์</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตารางพาร์ติชันแบบ MBR เปรียบเทียบเชิงลึกกับ GPT
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              โครงสร้างที่อยู่เริ่มต้นของดิสก์ก่อนกำหนดระบบไฟล์เรียกว่า **ตารางพาร์ติชัน (Partition Table)** 
              ซึ่งเป็นตัวคอยบันทึกแผนที่ว่าดิสก์ก้อนหลักนี้ถูกซอยย่อยออกเป็นไดรฟ์หรือส่วนงานใดบ้าง การพัฒนาขีดความสามารถของฮาร์ดดิสก์ให้มีขนาดใหญ่ขึ้น 
              ก่อให้เกิดการย้ายเปลี่ยนขั้วสถาปัตยกรรมจากยุคโบราณสู่ยุคปัจจุบัน:
            </p>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                  <h6 className="font-bold text-zinc-900 border-b border-slate-200/80 pb-1.5">ตารางโครงสร้าง MBR (Legacy)</h6>
                  <ul className="space-y-1.5 text-sm text-zinc-500">
                    <li className="flex items-center gap-1.5"><ArrowRight className="w-3.5 h-3.5 text-amber-500" /> อ้างตำแหน่งที่เซกเตอร์ 32 บิต</li>
                    <li className="flex items-center gap-1.5"><ArrowRight className="w-3.5 h-3.5 text-amber-500" /> **ความจุสูงสุดขีดจำกัดเพียง 2.2 Terabytes**</li>
                    <li className="flex items-center gap-1.5"><ArrowRight className="w-3.5 h-3.5 text-amber-500" /> สร้าง Primary Partitions ได้สูงสุด 4 พาร์ติชัน</li>
                    <li className="flex items-center gap-1.5"><ArrowRight className="w-3.5 h-3.5 text-amber-500" /> ไม่มีระบบสำรองข้อมูลพัง ข้อมูลส่วนหัวเก็บจุดเดียว</li>
                  </ul>
                </div>
                <div className="space-y-2.5">
                  <h6 className="font-bold text-zinc-900 border-b border-slate-200/80 pb-1.5">ตารางโครงสร้าง GPT (Modern)</h6>
                  <ul className="space-y-1.5 text-sm text-zinc-500">
                    <li className="flex items-center gap-1.5"><ArrowRight className="w-3.5 h-3.5 text-emerald-500" /> อ้างตำแหน่งที่เซกเตอร์ 64 บิต</li>
                    <li className="flex items-center gap-1.5"><ArrowRight className="w-3.5 h-3.5 text-emerald-500" /> **ความจุสูงสุดทางทฤษฎีมากถึง 9.4 Zettabytes**</li>
                    <li className="flex items-center gap-1.5"><ArrowRight className="w-3.5 h-3.5 text-emerald-500" /> สร้างพาร์ติชันประถมภูมิสูงสุด 128 พาร์ติชัน</li>
                    <li className="flex items-center gap-1.5"><ArrowRight className="w-3.5 h-3.5 text-emerald-500" /> มีระบบ Backup ส่วนหัวท้ายดิสก์ (Redundancy) ป้องกันระบบชำรุด</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Partition Table Simulator */}
          <PartitionTableSimulator />
        </section>

        {/* ─── SUBTOPIC 3.2.5 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">เฟิร์มแวร์ระดับต่ำสุด</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การตั้งค่า BIOS/UEFI สำหรับการบูตติดตั้ง
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในการเปิดเครื่องครั้งแรก เฟิร์มแวร์ระบบที่ฝังตัวบนรอมเมนบอร์ดจะตรวจสอบและตั้งค่าเริ่มต้นให้กับระบบคอมพิวเตอร์ 
              การเชื่อมโยงบูตอุปกรณ์ภายนอกต้องการให้ผู้เรียนเข้าไปกำหนดลำดับในเมนู **Boot Sequence** หรือ **Boot Priority** 
              เพื่อเลือกให้เมนบอร์ดข้ามสื่อจัดเก็บข้อมูลปกติและหันมาประมวลผลเซกเตอร์บูตใน USB ติดตั้งที่เตรียมไว้เป็นอันดับแรก
            </p>
            <p>
              นอกเหนือจากลำดับการบูต การติดตั้งระบบปฏิบัติการชั้นนำในปัจจุบันกำหนดเงื่อนไขความปลอดภัยเพิ่มเติม 
              ผู้เรียนจำเป็นต้องระบุคุณลักษณะการบูตติดตั้งในสองโหมดหลักคือ Legacy (รองรับความคลาสสิกของ MBR) และ UEFI 
              (เปิดใช้งานฟังก์ชันป้องกันไวรัสแฝงเซกเตอร์บูตผ่าน <span className="px-1 py-0.5 font-mono text-[13.5px] bg-indigo-50 rounded text-indigo-700">Secure Boot</span> 
              และชิปรองรับความปลอดภัยขั้นสูง <span className="px-1 py-0.5 font-mono text-[13.5px] bg-cyan-50 rounded text-cyan-700">TPM 2.0</span>)
            </p>
          </div>

          {/* Interactive BIOS/UEFI Simulator */}
          <BiosUefiBootSimulator />
        </section>

        {/* ─── SUBTOPIC 3.2.6 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">สิทธิ์และข้อผูกพันทางกฎหมาย</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ความเข้าใจและการเตรียมตัวเกี่ยวกับลิขสิทธิ์สิทธิ์การใช้งาน
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในการจัดเตรียมสภาพแวดล้อมและการประกอบวิชาชีพช่างไอที จริยธรรมและสิทธิ์การใช้งานลิขสิทธิ์ระบบปฏิบัติการ 
              (Software Licensing) ถือเป็นกระบวนการสำคัญเชิงกฎหมายและการบริหารสินทรัพย์ซอฟต์แวร์ 
              สิทธิ์การใช้งานของระบบปฏิบัติการเชิงอุตสาหกรรมในตลาดแบ่งออกตามรูปแบบสิทธิ์และลักษณะการกระจายดังนี้:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
              <div className="bg-gradient-to-br from-indigo-50/60 to-white p-5 rounded-2xl border border-indigo-100 shadow-sm space-y-2">
                <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700 inline-block"><Key className="w-5 h-5" /></span>
                <h6 className="font-bold text-indigo-950 text-base">สิทธิ์ประเภท Retail (FPP)</h6>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  สิทธิ์การใช้งานแบบกล่องจำหน่ายทั่วไป ราคาสูงสุด ทว่ามีความยืดหยุ่นสูง สามารถขยับย้ายคีย์ลิขสิทธิ์ไปติดตั้งบนเครื่องใหม่ได้เมื่อเครื่องเก่าพังหรือเปลี่ยนชิ้นส่วนหลัก
                </p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50/60 to-white p-5 rounded-2xl border border-cyan-100 shadow-sm space-y-2">
                <span className="p-2 rounded-xl bg-cyan-100 text-cyan-700 inline-block"><Award className="w-5 h-5" /></span>
                <h6 className="font-bold text-cyan-950 text-base">สิทธิ์ประเภท OEM (Original Equipment)</h6>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  ลิขสิทธิ์แบบติดตั้งมาจากผู้จัดจำหน่ายฮาร์ดแวร์ หรือซื้อติดตั้งคู่ประกอบเครื่อง ราคาถูกพิเศษ ทว่ามีเงื่อนไขผูกติดถาวรกับเมนบอร์ดหลัก เครื่องพังหรือบอร์ดเสียจะถือว่าลิขสิทธิ์ระงับทันที ย้ายเครื่องไม่ได้
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50/60 to-white p-5 rounded-2xl border border-purple-100 shadow-sm space-y-2">
                <span className="p-2 rounded-xl bg-purple-100 text-purple-700 inline-block"><Server className="w-5 h-5" /></span>
                <h6 className="font-bold text-purple-950 text-base">สิทธิ์ประเภท Volume License</h6>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  สิทธิ์ที่ตกลงคู่สัญญากับองค์กรขนาดใหญ่ ซื้อคีย์สำหรับรันเครื่องคอมพิวเตอร์พร้อมกันตั้งแต่ 5 เครื่อง ถึงหลักพันเครื่อง บริหารจัดการความปลอดภัยและเปิดสิทธิ์ผ่านเซิร์ฟเวอร์กลาง KMS ของบริษัท
                </p>
              </div>
            </div>
          </div>

          {/* Interactive OS Licensing Consultant Simulator */}
          <LicensingConsultantSimulator />
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
            title="ภารกิจวิเคราะห์สเปกและการเตรียมสื่อติดตั้งระบบปฏิบัติการสำหรับองค์กร"
            taskText={`ให้นักเรียนเลือกศึกษาความต้องการขององค์กรจำลองที่ต้องการวางระบบคอมพิวเตอร์ใหม่จำนวน 20 เครื่อง
1. คำนวณความต้องการระบบขั้นต่ำ (System Requirements) ของแต่ละเครื่องเพื่อรองรับการใช้งานออฟฟิศสมัยใหม่
2. เลือกรูปแบบตารางพาร์ติชัน (MBR หรือ GPT) และชนิดของระบบไฟล์ (File System) ที่เหมาะสมสำหรับติดตั้งระบบปฏิบัติการและจัดเก็บฐานข้อมูลของบริษัท
3. ออกแบบขั้นตอนการเตรียมตัวทำ Bootable USB โดยใช้ Rufus และการกำหนดค่าใน BIOS/UEFI เพื่อรองรับระบบความปลอดภัยในสำนักงาน
4. เปรียบเทียบประเภทสิทธิ์การใช้งานลิขสิทธิ์ (Licensing) ระหว่าง Retail, OEM และ Volume License และสรุปผลในรูปแบบแผนงานการติดตั้งเชิงเทคนิค`}
          />
        </div>

      </main>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   1. SYSTEM REQUIREMENTS CHECKER SIMULATOR (Subtopic 3.2.1)
   ═══════════════════════════════════════════════════════════════════ */
function SystemRequirementsChecker() {
  const [targetOs, setTargetOs] = useState('win11');
  const [cpu, setCpu] = useState(2);
  const [ram, setRam] = useState(4);
  const [storage, setStorage] = useState(64);
  const [secureBoot, setSecureBoot] = useState(true);
  const [tpm, setTpm] = useState(true);
  const [auditResult, setAuditResult] = useState(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const handleAudit = () => {
    setIsAuditing(true);
    setAuditResult(null);
    setTimeout(() => {
      let isCpuOk = false;
      let isRamOk = false;
      let isStorageOk = false;
      let isSecureBootOk = false;
      let isTpmOk = false;

      if (targetOs === 'win11') {
        isCpuOk = cpu >= 2;
        isRamOk = ram >= 4;
        isStorageOk = storage >= 64;
        isSecureBootOk = secureBoot === true;
        isTpmOk = tpm === true;
      } else if (targetOs === 'win10') {
        isCpuOk = cpu >= 1;
        isRamOk = ram >= 2;
        isStorageOk = storage >= 32;
        isSecureBootOk = true; // Optional for OS but always pass in checker
        isTpmOk = true;        // Optional for OS
      } else { // Ubuntu Server
        isCpuOk = cpu >= 2;
        isRamOk = ram >= 4;
        isStorageOk = storage >= 25;
        isSecureBootOk = true; // Optional
        isTpmOk = true;        // Optional
      }

      const passed = isCpuOk && isRamOk && isStorageOk && (targetOs !== 'win11' || (isSecureBootOk && isTpmOk));
      
      setAuditResult({
        passed,
        isCpuOk,
        isRamOk,
        isStorageOk,
        isSecureBootOk: targetOs === 'win11' ? isSecureBootOk : true,
        isTpmOk: targetOs === 'win11' ? isTpmOk : true
      });
      setIsAuditing(false);
    }, 1200);
  };

  return (
    <SimulatorShell
      icon={<Cpu className="w-6 h-6 text-indigo-500 animate-pulse" />}
      title="เครื่องจำลองตรวจสอบสเปกคอมพิวเตอร์ (System Requirements Checker)"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none">
        
        {/* Left Side: Parameters Tuning */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">1. เลือกระบบปฏิบัติการเป้าหมาย</span>
            
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'win11', label: 'Windows 11' },
                { id: 'win10', label: 'Windows 10' },
                { id: 'ubuntu', label: 'Ubuntu Server' }
              ].map(osItem => (
                <button
                  key={osItem.id}
                  onClick={() => { setTargetOs(osItem.id); setAuditResult(null); }}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-all duration-200 active:scale-98 text-center ${
                    targetOs === osItem.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {osItem.label}
                </button>
              ))}
            </div>

            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">2. ปรับแต่งฮาร์ดแวร์เป้าหมาย</span>
            
            {/* CPU Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>จำนวนหน่วยประมวลผล (CPU Cores)</span>
                <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{cpu} Cores</span>
              </div>
              <input
                type="range" min="1" max="8" step="1" value={cpu}
                onChange={(e) => { setCpu(parseInt(e.target.value)); setAuditResult(null); }}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* RAM Selector */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>หน่วยความจำหลัก (RAM Capacity)</span>
                <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{ram} GB</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[2, 4, 8, 12, 16].map(ramOption => (
                  <button
                    key={ramOption}
                    onClick={() => { setRam(ramOption); setAuditResult(null); }}
                    className={`py-1 rounded-lg border text-xs font-mono cursor-pointer transition-all ${
                      ram === ramOption
                        ? 'bg-indigo-100 border-indigo-400 text-indigo-800 font-bold'
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {ramOption}G
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Selector */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>พื้นที่เก็บข้อมูล (Storage Disk Capacity)</span>
                <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{storage} GB</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[32, 64, 128, 256].map(stOption => (
                  <button
                    key={stOption}
                    onClick={() => { setStorage(stOption); setAuditResult(null); }}
                    className={`py-1 rounded-lg border text-xs font-mono cursor-pointer transition-all ${
                      storage === stOption
                        ? 'bg-indigo-100 border-indigo-400 text-indigo-800 font-bold'
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {stOption}G
                  </button>
                ))}
              </div>
            </div>

            {/* Security Flags (TPM and Secure Boot) */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-white/50 cursor-pointer hover:bg-white select-none">
                <input
                  type="checkbox" checked={secureBoot}
                  onChange={(e) => { setSecureBoot(e.target.checked); setAuditResult(null); }}
                  className="w-4.5 h-4.5 accent-indigo-600 cursor-pointer rounded"
                />
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-700 block">Secure Boot</span>
                  <span className="text-[10px] text-slate-400 font-normal">ระบบรักษาความปลอดภัยบูต</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-white/50 cursor-pointer hover:bg-white select-none">
                <input
                  type="checkbox" checked={tpm}
                  onChange={(e) => { setTpm(e.target.checked); setAuditResult(null); }}
                  className="w-4.5 h-4.5 accent-indigo-600 cursor-pointer rounded"
                />
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-700 block">TPM 2.0 Module</span>
                  <span className="text-[10px] text-slate-400 font-normal">โมดูลกุญแจความลับถาวร</span>
                </div>
              </label>
            </div>
          </div>

          <button
            onClick={handleAudit}
            disabled={isAuditing}
            className="w-full py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.01] active:scale-98 shadow-md shadow-indigo-600/10 cursor-pointer transition-all duration-200 rounded-xl flex items-center justify-center gap-2"
          >
            {isAuditing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                กำลังตรวจวัดความเข้ากันได้ระบบ...
              </>
            ) : (
              'ประเมินความเหมาะสม (Analyze Requirements)'
            )}
          </button>
        </div>

        {/* Right Side: Audit Report Card */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative min-h-[360px]">
          <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">SYSTEM AUDIT REAL-TIME REPORT</span>
          
          <div className="my-auto space-y-6 pt-4">
            {/* If not started */}
            {!isAuditing && !auditResult && (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto">
                  <HelpCircle className="w-6 h-6 text-slate-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-slate-300 text-[15px] font-bold">รอการรันประเมินผล</p>
                  <p className="text-slate-500 text-xs leading-normal max-w-xs mx-auto">
                    กรุณาเลือกความจำลองระบบและอุปกรณ์ด้านซ้าย แล้วคลิกวิเคราะห์ข้อกำหนด
                  </p>
                </div>
              </div>
            )}

            {/* If Auditing */}
            {isAuditing && (
              <div className="space-y-4">
                <div className="text-center py-6 space-y-2">
                  <RefreshCw className="w-10 h-10 text-indigo-400 animate-spin mx-auto" />
                  <p className="text-indigo-300 text-sm font-mono tracking-widest">TESTING HARDWARE CHASSIS...</p>
                </div>
                <div className="space-y-2">
                  <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full animate-[pulse_1s_infinite] w-3/4"></div>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-600">
                    <span>SECTOR INTEGRITY OK</span>
                    <span>98.2W SUPPLY VOLTAGE</span>
                  </div>
                </div>
              </div>
            )}

            {/* Result Presenter */}
            {!isAuditing && auditResult && (
              <div className="space-y-5">
                {/* Result header */}
                <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                  auditResult.passed
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                }`}>
                  <div className={`p-2.5 rounded-xl ${auditResult.passed ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
                    {auditResult.passed ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                  </div>
                  <div className="text-left">
                    <p className="text-xs uppercase font-bold tracking-widest opacity-80">บทวิเคราะห์ความเหมาะสม</p>
                    <p className="text-lg font-bold font-sans mt-0.5">
                      {auditResult.passed 
                        ? '🟢 ผ่านมาตรฐานความเหมาะสม (PASS)' 
                        : '🔴 ต่ำกว่าระดับความต้องการ (FAILED)'
                      }
                    </p>
                  </div>
                </div>

                {/* Audit Grid */}
                <div className="space-y-2.5 text-slate-300 font-mono text-xs">
                  {/* CPU Audit */}
                  <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded-lg border border-slate-900">
                    <span className="flex items-center gap-2 text-slate-400"><Cpu className="w-4 h-4" /> CPU Core Check</span>
                    <span className="flex items-center gap-2">
                      <span className="text-slate-500">{cpu} Cores</span>
                      {auditResult.isCpuOk ? <Check className="w-4 h-4 text-emerald-400 font-bold" /> : <AlertCircle className="w-4 h-4 text-rose-500" />}
                    </span>
                  </div>

                  {/* RAM Audit */}
                  <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded-lg border border-slate-900">
                    <span className="flex items-center gap-2 text-slate-400"><MemoryStick className="w-4 h-4" /> RAM Boundary</span>
                    <span className="flex items-center gap-2">
                      <span className="text-slate-500">{ram} GB</span>
                      {auditResult.isRamOk ? <Check className="w-4 h-4 text-emerald-400 font-bold" /> : <AlertCircle className="w-4 h-4 text-rose-500" />}
                    </span>
                  </div>

                  {/* Storage Audit */}
                  <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded-lg border border-slate-900">
                    <span className="flex items-center gap-2 text-slate-400"><HardDrive className="w-4 h-4" /> Storage Space</span>
                    <span className="flex items-center gap-2">
                      <span className="text-slate-500">{storage} GB</span>
                      {auditResult.isStorageOk ? <Check className="w-4 h-4 text-emerald-400 font-bold" /> : <AlertCircle className="w-4 h-4 text-rose-500" />}
                    </span>
                  </div>

                  {/* TPM & Secure Boot Audits for Win 11 */}
                  {targetOs === 'win11' && (
                    <>
                      <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded-lg border border-slate-900">
                        <span className="flex items-center gap-2 text-slate-400"><ShieldAlert className="w-4 h-4" /> Secure Boot</span>
                        <span className="flex items-center gap-2">
                          <span className="text-slate-500">{secureBoot ? 'Enabled' : 'Disabled'}</span>
                          {auditResult.isSecureBootOk ? <Check className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-500" />}
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded-lg border border-slate-900">
                        <span className="flex items-center gap-2 text-slate-400"><Terminal className="w-4 h-4" /> TPM 2.0 Module</span>
                        <span className="flex items-center gap-2">
                          <span className="text-slate-500">{tpm ? 'Detected' : 'Not Found'}</span>
                          {auditResult.isTpmOk ? <Check className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-500" />}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Footnote advice */}
                <p className="text-[11px] text-slate-500 leading-normal text-left font-sans">
                  {auditResult.passed
                    ? '💡 ฮาร์ดแวร์นี้ผ่านมาตรฐานความเข้ากันได้ระบบที่ระบุไว้ สามารถทำ Bootable USB และบูตติดตั้งได้ทันทีอย่างปลอดภัย'
                    : '💡 ความล้มเหลวของการตรวจสอบเกิดขึ้นเนื่องจากข้อจำกัดสเปกฮาร์ดแวร์ โปรดปรับค่าให้ตรงกับมาตรฐานความต้องการระบบก่อนติดตั้งจริง'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. RUFUS BOOTABLE USB SIMULATOR (Subtopic 3.2.2)
   ═══════════════════════════════════════════════════════════════════ */
function RufusBootableSimulator() {
  const [device, setDevice] = useState('Kingston DataTraveler 32GB');
  const [iso, setIso] = useState('Windows 11 23H2.iso');
  const [scheme, setScheme] = useState('GPT');
  const [targetSystem, setTargetSystem] = useState('UEFI (non CSM)');
  const [fileSystem, setFileSystem] = useState('NTFS');
  const [status, setStatus] = useState('READY'); // READY | RUNNING | COMPLETED
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState(['[READY] Rufus boot creator initialized. Standby...']);
  const logInterval = useRef(null);

  // Sync Partition Scheme with Target System as per strict tech standard
  const handleSchemeChange = (selectedScheme) => {
    setScheme(selectedScheme);
    if (selectedScheme === 'GPT') {
      setTargetSystem('UEFI (non CSM)');
    } else {
      setTargetSystem('BIOS (or UEFI-CSM)');
    }
  };

  const startRufusCreation = () => {
    setStatus('RUNNING');
    setProgress(0);
    setLogs(['[START] Rufus v4.5.2180 started.']);
    
    if (logInterval.current) clearInterval(logInterval.current);

    const steps = [
      { prog: 5,   log: `Checking destination flash drive: ${device} [OK]` },
      { prog: 15,  log: 'Analyzing ISO structures and file catalog indexes...' },
      { prog: 25,  log: `Selected ISO: ${iso} (Windows UDF dynamic files)` },
      { prog: 35,  log: `Clearing existing sectors on ${device} (Formatting...)` },
      { prog: 48,  log: `Creating primary partition table in [${scheme}] scheme...` },
      { prog: 56,  log: `Targeting Boot System type: [${targetSystem}]...` },
      { prog: 70,  log: `Writing bootloader files and building system index (${fileSystem})...` },
      { prog: 85,  log: 'Extracting ISO cabinet resources directly to drive...' },
      { prog: 95,  log: 'Verifying files check-sums and sector boundaries...' },
      { prog: 100, log: `SUCCESS: Bootable media created on ${device} in ${scheme} mode! ✅` }
    ];

    let currentStep = 0;
    logInterval.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(logInterval.current);
          setStatus('COMPLETED');
          setLogs(current => [...current, steps[steps.length - 1].log]);
          return 100;
        }

        const matchStep = steps.find(s => s.prog <= next && s.prog > prev);
        if (matchStep) {
          setLogs(current => [...current, matchStep.log]);
        }
        return next;
      });
    }, 250);
  };

  const resetRufus = () => {
    setStatus('READY');
    setProgress(0);
    setLogs(['[READY] Rufus boot creator initialized. Standby...']);
  };

  useEffect(() => {
    return () => {
      if (logInterval.current) clearInterval(logInterval.current);
    };
  }, []);

  return (
    <SimulatorShell
      icon={<Layers className="w-6 h-6 text-cyan-500 animate-spin" style={{ animationDuration: '6s' }} />}
      title="เครื่องสร้างสื่อติดตั้งจำลอง (Rufus Bootable USB Simulator)"
      accentBg="bg-cyan-50"
      iconColor="text-cyan-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none">
        
        {/* Left column: Rufus Dark Panel interface */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative">
          <div className="absolute top-3 right-4 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          </div>

          <div className="space-y-4">
            <h6 className="text-[12px] font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
              RUFUS v4.5 (Dark-Theme Panel)
            </h6>

            {/* Select Device */}
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Device</label>
              <select
                disabled={status === 'RUNNING'}
                value={device} onChange={(e) => setDevice(e.target.value)}
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Kingston DataTraveler 32GB">Kingston DataTraveler 32GB (USB 3.1)</option>
                <option value="SanDisk Ultra 64GB">SanDisk Ultra 64GB (USB 3.0)</option>
              </select>
            </div>

            {/* Select ISO Selection */}
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Boot Selection</label>
              <select
                disabled={status === 'RUNNING'}
                value={iso} onChange={(e) => setIso(e.target.value)}
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Windows 11 23H2.iso">Windows 11 23H2.iso (Microsoft Windows 11)</option>
                <option value="Windows 10 22H2.iso">Windows 10 22H2.iso (Microsoft Windows 10)</option>
                <option value="Ubuntu Desktop 24.04.iso">Ubuntu Desktop 24.04.iso (Canonical Linux)</option>
              </select>
            </div>

            {/* Partition Scheme Selection */}
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Partition Scheme</label>
                <select
                  disabled={status === 'RUNNING'}
                  value={scheme} onChange={(e) => handleSchemeChange(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono font-bold"
                >
                  <option value="GPT">GPT</option>
                  <option value="MBR">MBR</option>
                </select>
              </div>

              {/* Target System (Locked symmetrically to match Scheme) */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Target System</label>
                <div className="w-full text-xs bg-slate-950/50 border border-slate-800/80 rounded-lg p-2.5 text-cyan-400 font-mono font-semibold text-center select-none truncate">
                  {targetSystem}
                </div>
              </div>
            </div>

            {/* File System */}
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">File System</label>
              <select
                disabled={status === 'RUNNING'}
                value={fileSystem} onChange={(e) => setFileSystem(e.target.value)}
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="NTFS">NTFS (Default for Windows)</option>
                <option value="FAT32">FAT32 (Large Compatibility)</option>
              </select>
            </div>
          </div>

          {/* Start Actions */}
          <div className="pt-6 space-y-3.5">
            {status === 'RUNNING' && (
              <div className="space-y-1 text-left">
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>PROGRESSING WRITING</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-cyan-500 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              {status === 'READY' ? (
                <button
                  onClick={startRufusCreation}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs cursor-pointer active:scale-98 transition-all shadow-md shadow-cyan-600/20"
                >
                  เริ่มสร้างสื่อติดตั้ง (START)
                </button>
              ) : (
                <button
                  onClick={resetRufus}
                  disabled={status === 'RUNNING'}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                    status === 'RUNNING'
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer active:scale-98 shadow-md'
                  }`}
                >
                  จัดเตรียมสื่อใหม่ (RESET)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Terminal live log reader */}
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between relative min-h-[380px]">
          <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">LIVE CONSOLE STREAM LOGS</span>
          
          <div className="space-y-2 min-h-[280px] max-h-[280px] overflow-y-auto mt-6 border-b border-slate-900 pb-3 leading-relaxed text-left">
            {logs.map((log, index) => (
              <div key={index} className="flex gap-2 font-mono text-xs">
                <span className="text-slate-600 select-none">&gt;&gt;</span>
                <p className={`${
                  log.startsWith('SUCCESS') 
                    ? 'text-emerald-400 font-bold' 
                    : log.startsWith('[START') 
                    ? 'text-cyan-400' 
                    : 'text-slate-300'
                }`}>
                  {log}
                </p>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-500 font-sans text-left leading-normal flex items-start gap-2 pt-2">
            <Info className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
            <p>
              <strong>วิเคราะห์เชื่อมต่อ:</strong> การจัดเตรียมพาร์ติชันสอดคล้องกับพารามิเตอร์เป้าหมายอย่างพอดี 100% 
              GPT ถูกผูกมัดเพื่อรันในโหมดความมั่นคงทางโครงสร้าง UEFI เท่านั้น เพื่อรองรับตารางความจุสูง
            </p>
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. FILE SYSTEM COPY SIZE LIMIT SIMULATOR (Subtopic 3.2.3)
   ═══════════════════════════════════════════════════════════════════ */
function FileSystemLimitSimulator() {
  const [fsType, setFsType] = useState('FAT32');
  const [fileSize, setFileSize] = useState(2.0); // 0.5 to 16.0 GB
  const [copying, setCopying] = useState(false);
  const [copyProgress, setCopyProgress] = useState(0);
  const [copyStatus, setCopyStatus] = useState('READY'); // READY | WRITING | HALTED | DONE
  const [errorMsg, setErrorMsg] = useState('');
  const [transferSpeed, setTransferSpeed] = useState(0);
  const timer = useRef(null);

  const startCopy = () => {
    setCopying(true);
    setCopyProgress(0);
    setCopyStatus('WRITING');
    setErrorMsg('');
    setTransferSpeed(Math.floor(Math.random() * 80) + 120); // 120 to 200 MB/s

    if (timer.current) clearInterval(timer.current);

    timer.current = setInterval(() => {
      setCopyProgress(prev => {
        const next = prev + 5;
        
        // FAT32 error ceiling logic at 4GB
        if (fsType === 'FAT32' && fileSize > 4.0 && next >= 80) {
          clearInterval(timer.current);
          setCopyStatus('HALTED');
          setErrorMsg('❌ ERROR_FILE_SYSTEM_LIMITATION: The file is too large for the destination file system (FAT32 has a maximum file size limit of 4GB).');
          setCopying(false);
          return 80;
        }

        if (next >= 100) {
          clearInterval(timer.current);
          setCopyStatus('DONE');
          setCopying(false);
          return 100;
        }
        return next;
      });
    }, 150);
  };

  const handleReset = () => {
    setCopyStatus('READY');
    setCopyProgress(0);
    setErrorMsg('');
    setTransferSpeed(0);
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <SimulatorShell
      icon={<Database className="w-6 h-6 text-purple-500" />}
      title="เครื่องทดสอบขีดจำกัดไฟล์และระบบไฟล์ (File Copy Size Limitation Simulator)"
      accentBg="bg-purple-50"
      iconColor="text-purple-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none">
        
        {/* Tuning panel */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">1. เลือกระบบไฟล์เป้าหมาย (Drive Format)</span>
            
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'FAT32', label: 'FAT32 (Legacy)' },
                { id: 'NTFS', label: 'NTFS (Windows)' },
                { id: 'exFAT', label: 'exFAT (Universal)' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setFsType(item.id); handleReset(); }}
                  disabled={copying}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-all duration-200 active:scale-98 text-center ${
                    fsType === item.id
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">2. กำหนดขนาดไฟล์ที่จะคัดลอก (Single File Size)</span>
            
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>ขนาดไฟล์เดี่ยว (เช่น ไฟล์ภาพยนตร์ 4K หรือ ISO)</span>
                <span className="font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded">{fileSize.toFixed(1)} GB</span>
              </div>
              <input
                type="range" min="0.5" max="16" step="0.5" value={fileSize}
                onChange={(e) => { setFileSize(parseFloat(e.target.value)); handleReset(); }}
                disabled={copying}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/20 space-y-1.5 leading-normal text-[13px] text-purple-950 font-sans text-left">
              <p className="font-bold flex items-center gap-1.5 text-purple-800">
                <Info className="w-4 h-4" /> สรุปข้อมูลทฤษฎีระบบไฟล์ {fsType}
              </p>
              {fsType === 'FAT32' && (
                <p className="text-[12px] text-purple-700">
                  ⚠️ <strong>ขีดจำกัดสูงสุด:</strong> ไฟล์เดี่ยวต้องไม่เกิน <strong>4.0 GB</strong> หากโยนไฟล์ความจุรวมสูงกว่านี้ ระบบปฏิบัติการจะสั่งตัดการบันทึกข้อมูลทันที
                </p>
              )}
              {fsType === 'NTFS' && (
                <p className="text-[12px] text-purple-700">
                  ✅ <strong>ขีดจำกัดสูงสุด:</strong> รองรับไฟล์เดี่ยวได้ขนาดมหึมาถึง 16 TB เหมาะแก่เซิร์ฟเวอร์สำนักงานและฮาร์ดดิสก์หลัก
                </p>
              )}
              {fsType === 'exFAT' && (
                <p className="text-[12px] text-purple-700">
                  ✅ <strong>ขีดจำกัดสูงสุด:</strong> รองรับการโยนไฟล์ขนาดใหญ่ได้เสรีโดยรักษาโครงสร้างยืดหยุ่นที่นำไปแชร์ให้เครื่อง macOS ได้ง่ายดาย
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {copyStatus === 'READY' || copyStatus === 'WRITING' ? (
              <button
                onClick={startCopy}
                disabled={copying}
                className="w-full py-3 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 hover:scale-[1.01] active:scale-98 shadow-md cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed transition-all rounded-xl"
              >
                {copying ? 'กำลังคัดลอกไฟล์...' : 'คัดลอกไฟล์ลงไดรฟ์ (Simulate Copy)'}
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="w-full py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 shadow-md cursor-pointer transition-all rounded-xl"
              >
                เคลียร์พารามิเตอร์ (RESET)
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Graphic Side */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative min-h-[380px] text-left">
          <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">FILE TRANSFER INTEGRITY PANEL</span>
          
          <div className="my-auto space-y-6 pt-4">
            {/* Ready State */}
            {copyStatus === 'READY' && (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto">
                  <Database className="w-6 h-6 text-slate-500 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="text-slate-300 text-[15px] font-bold">ระบบปลายทางพร้อมรับคำสั่ง</p>
                  <p className="text-slate-500 text-xs max-w-xs mx-auto">
                    กดปุ่มคัดลอกไฟล์เพื่อสังเกตสัญญาณและความแตกต่างของการจัดการพื้นที่ระบบไฟล์
                  </p>
                </div>
              </div>
            )}

            {/* Writing / Copying State */}
            {copyStatus === 'WRITING' && (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Writing File Blocks</p>
                    <p className="text-sm font-bold text-slate-200 mt-0.5">กำลังประมวลผลเซกเตอร์ลงบนไดรฟ์...</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>คัดลอกเสร็จสิ้น: {copyProgress}%</span>
                    <span className="text-purple-400">{transferSpeed} MB/s</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-purple-500 h-full transition-all duration-150" style={{ width: `${copyProgress}%` }} />
                  </div>
                </div>
              </div>
            )}

            {/* Halted State (FAT32 bug triggered) */}
            {copyStatus === 'HALTED' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 flex gap-3.5">
                  <AlertTriangle className="w-6 h-6 shrink-0 text-rose-400" />
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-sm uppercase tracking-wide">Copy Interrupted!</p>
                    <p className="leading-relaxed opacity-95">{errorMsg}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-rose-400">
                    <span>ระบบคัดลอกล้มเหลว: {copyProgress}%</span>
                    <span>0 MB/s</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-rose-500 h-full w-[80%]" />
                  </div>
                </div>
              </div>
            )}

            {/* Done Success State */}
            {copyStatus === 'DONE' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 flex gap-3.5">
                  <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-400" />
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-sm uppercase tracking-wide">Copy Successful! ✅</p>
                    <p className="leading-relaxed opacity-95">
                      คัดลอกไฟล์เดี่ยวขนาด {fileSize.toFixed(1)} GB ลงบนระบบไฟล์ {fsType} สำเร็จเรียบร้อยโดยไม่มีข้อผิดพลาดโครงสร้าง
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-emerald-400">
                    <span>ความสำเร็จรวม: 100%</span>
                    <span>Completed</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-emerald-500 h-full w-full" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500 font-sans leading-normal">
            * <strong>สรุปทางวิชาการ:</strong> FAT32 รองรับการประมวลผลสูงสุดที่ 2^32 บิตขนาดไบต์ จึงจำกัดความสามารถที่ 4.0GB 
            ส่วน NTFS และ exFAT ออกแบบตรรกะให้ลื่นไหลข้ามเพดานสากลได้ไร้ขีดจำกัด
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. PARTITION SCHEME & CAPACITY LIMIT SIMULATOR (Subtopic 3.2.4)
   ═══════════════════════════════════════════════════════════════════ */
function PartitionTableSimulator() {
  const [scheme, setScheme] = useState('GPT');
  const [partitions, setPartitions] = useState([
    { id: 1, name: 'Drive C: (OS)', size: 1.5, color: 'bg-indigo-500' }
  ]);

  const addPartition = () => {
    const totalCurrentSize = partitions.reduce((sum, p) => sum + p.size, 0);
    const capacityLimit = scheme === 'MBR' ? 2.2 : 8.0;
    const remaining = capacityLimit - totalCurrentSize;

    if (remaining <= 0.5) {
      alert(scheme === 'MBR' 
        ? '⚠️ ไม่สามารถสร้างพาร์ติชันเพิ่มได้: ข้อมูลโครงสร้าง MBR ติดเพดานขีดจำกัดสูงสุดที่ 2.2 Terabytes แล้ว!' 
        : '⚠️ ไม่สามารถสร้างพาร์ติชันเพิ่มได้: ดิกส์ก้อนนี้ถูกจัดสรรพื้นที่ครบ 8.0 Terabytes เต็มแล้ว'
      );
      return;
    }

    if (scheme === 'MBR' && partitions.length >= 4) {
      alert('⚠️ MBR Limitation: ตารางพาร์ติชันแบบ MBR จำกัดสิทธิ์การสร้าง Primary Partition สูงสุดที่ 4 ช่องพาร์ติชันเท่านั้น!');
      return;
    }

    const nextId = partitions.length + 1;
    const pColors = ['bg-indigo-500', 'bg-cyan-500', 'bg-purple-500', 'bg-emerald-500', 'bg-amber-500'];
    const pColor = pColors[(nextId - 1) % pColors.length];
    
    // Choose size
    const pSize = Math.min(2.0, remaining);
    
    setPartitions(current => [...current, {
      id: nextId,
      name: `Drive ${String.fromCharCode(67 + current.length)}:`,
      size: pSize,
      color: pColor
    }]);
  };

  const handleSchemeSwitch = (newScheme) => {
    setScheme(newScheme);
    if (newScheme === 'MBR') {
      // Force truncate or reset partitions to fit MBR bounds
      setPartitions([
        { id: 1, name: 'Drive C: (OS)', size: 1.2, color: 'bg-indigo-500' },
        { id: 2, name: 'Drive D: (Data)', size: 1.0, color: 'bg-cyan-500' }
      ]);
    } else {
      setPartitions([
        { id: 1, name: 'Drive C: (OS)', size: 2.0, color: 'bg-indigo-500' },
        { id: 2, name: 'Drive D: (Project)', size: 3.0, color: 'bg-cyan-500' }
      ]);
    }
  };

  const totalUsed = partitions.reduce((sum, p) => sum + p.size, 0);
  const totalCapacity = 8.0; // Simulated drive size: 8 Terabytes
  const unusableSpace = scheme === 'MBR' ? 5.8 : 0; // MBR loses 5.8TB out of 8TB
  const unallocatedSpace = totalCapacity - totalUsed - unusableSpace;

  return (
    <SimulatorShell
      icon={<HardDrive className="w-6 h-6 text-indigo-500" />}
      title="เครื่องจำลองขีดจำกัดตารางพาร์ติชัน (Partition Table Capacity Lab)"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none">
        
        {/* Controls Column */}
        <div className="space-y-6 flex flex-col justify-between text-left">
          <div className="space-y-5">
            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">1. เลือกรูปแบบตารางพาร์ติชันดิสก์</span>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'MBR', label: 'MBR (Master Boot Record)', desc: 'โครงสร้างแบบ 32 บิต ดั้งเดิม' },
                { id: 'GPT', label: 'GPT (GUID Partition Table)', desc: 'โครงสร้างแบบ 64 บิต ยุคใหม่' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSchemeSwitch(item.id)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 active:scale-98 ${
                    scheme === item.id
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <p className="text-xs font-bold">{item.label}</p>
                  <p className="text-[10px] text-slate-500 font-normal leading-normal mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">2. จัดสรรห้องดิสก์ (Create Partitions)</span>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">ฮาร์ดดิสก์ 8.0 TB</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {partitions.map(p => (
                  <div key={p.id} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-3 shrink-0">
                    <span className={`w-3.5 h-3.5 rounded-full ${p.color}`} />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{p.name}</p>
                      <p className="text-[10px] font-mono text-slate-500">{p.size.toFixed(1)} TB</p>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addPartition}
                  className="p-3 border border-dashed border-indigo-400 bg-indigo-50/30 hover:bg-indigo-50 rounded-xl cursor-pointer text-indigo-600 text-xs font-bold flex items-center gap-2 active:scale-98 transition-all"
                >
                  <Plus className="w-4 h-4" /> สร้างพาร์ติชันย่อย
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 text-slate-400 font-sans text-xs space-y-1.5 leading-relaxed">
            <p className="font-bold text-slate-200 flex items-center gap-1"><Info className="w-4 h-4 text-indigo-400" /> ข้อมูลเชิงเปรียบเทียบสถิติ</p>
            {scheme === 'MBR' ? (
              <p className="text-[11.5px] leading-normal text-slate-400">
                ⚠️ <strong>ข้อจำกัด MBR:</strong> เนื่องจากระบบเก็บข้อมูลพอร์ตชี้เซกเตอร์ขนาด 32-bit ทำให้สกีมามองเห็นความจุรวมขีดจำกัดสิ้นสุดที่ 2.2TB พื้นที่จัดเก็บส่วนที่เหลืออีก 5.8TB จะกลายเป็น <strong>พื้นที่สูญเปล่าสีส้มลอกลาย (Unusable Area)</strong> ไม่สามารถกู้พาร์ติชันได้
              </p>
            ) : (
              <p className="text-[11.5px] leading-normal text-slate-400">
                ✅ <strong>ความมั่นคง GPT:</strong> ด้วยสถาปัตยกรรมเก็บความกว้างเซกเตอร์ 64-bit เพดานสูงสุดเปิดทะลุระดับ Zettabytes สามารถมองเห็นและนำพื้นที่จัดเก็บ 8.0TB มาจัดสรรใช้ประโยชน์ได้เต็มอัตรา 100% ไร้สิ่งสูญเปล่า
              </p>
            )}
          </div>
        </div>

        {/* Visual Disk Segment Bar */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative min-h-[380px] text-left">
          <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">PHYSICAL SECTOR ALLOCATION</span>
          
          <div className="space-y-6 w-full my-auto">
            {/* The Bar */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Disk Allocation Bar (Total Size: 8.0 TB)</span>
              
              <div className="w-full bg-slate-900 h-16 rounded-2xl overflow-hidden border border-slate-800 flex">
                {/* Render created partitions */}
                {partitions.map(p => (
                  <div
                    key={p.id}
                    className={`${p.color} h-full border-r border-slate-950 flex flex-col justify-center items-center text-white px-1 select-none transition-all duration-300 font-mono`}
                    style={{ width: `${(p.size / totalCapacity) * 100}%` }}
                  >
                    <span className="text-[11px] font-bold">{p.name}</span>
                    <span className="text-[9px] opacity-80">{p.size.toFixed(1)}T</span>
                  </div>
                ))}

                {/* Render Unallocated Space */}
                {unallocatedSpace > 0 && (
                  <div
                    className="bg-slate-800 h-full border-r border-slate-950 flex flex-col justify-center items-center text-slate-400 transition-all duration-300"
                    style={{ width: `${(unallocatedSpace / totalCapacity) * 100}%` }}
                  >
                    <span className="text-[10px] font-bold">Unallocated</span>
                    <span className="text-[9px] font-mono">{unallocatedSpace.toFixed(1)}T</span>
                  </div>
                )}

                {/* Render Unusable Space for MBR */}
                {scheme === 'MBR' && unusableSpace > 0 && (
                  <div
                    className="h-full bg-[repeating-linear-gradient(45deg,#451a03,#451a03_10px,#7c2d12_10px,#7c2d12_20px)] flex flex-col justify-center items-center text-amber-200 px-2 animate-[pulse_2s_infinite]"
                    style={{ width: `${(unusableSpace / totalCapacity) * 100}%` }}
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-400 mb-0.5" />
                    <span className="text-[10px] font-bold text-center leading-none">Unusable</span>
                    <span className="text-[9px] font-mono">{unusableSpace.toFixed(1)}T</span>
                  </div>
                )}
              </div>
            </div>

            {/* Total Math Metrics */}
            <div className="grid grid-cols-3 gap-2.5 font-mono text-[11px]">
              <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-900">
                <span className="text-slate-500 block mb-0.5">จัดสรรแล้ว</span>
                <span className="font-bold text-indigo-400 text-sm">{totalUsed.toFixed(1)} TB</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-900">
                <span className="text-slate-500 block mb-0.5">เหลือจัดสรร</span>
                <span className="font-bold text-slate-300 text-sm">{unallocatedSpace.toFixed(1)} TB</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-900">
                <span className="text-slate-500 block mb-0.5">พื้นที่สูญเสีย</span>
                <span className="font-bold text-rose-400 text-sm">{unusableSpace.toFixed(1)} TB</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-sans leading-normal">
            * <strong>สถิติวิเคราะห์เชิงธุรกิจ:</strong> การคงคลังใช้ MBR กับไดรฟ์ขนาดใหญ่ตั้งแต่ 3TB ขึ้นไป จะสร้างความเสียหายด้านต้นทุนพื้นที่จัดเก็บอย่างเลี่ยงไม่ได้ การแปลงตารางพาร์ติชันเป็น GPT จึงเป็นมาตรฐานไฟลท์บังคับ
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   5. UEFI Setup & Boot Priority Lab (Subtopic 3.2.5)
   ═══════════════════════════════════════════════════════════════════ */
function BiosUefiBootSimulator() {
  const [boot1, setBoot1] = useState('Hard Drive');
  const [secureBoot, setSecureBoot] = useState('Disabled');
  const [tpm, setTpm] = useState('Disabled');

  let diagnostics = '❌ ระบบจะทำการสแกนข้ามสื่อภายนอกและบูตเข้าสู่ Hard Drive โฮสต์ดั้งเดิมในทันที';
  let diagColor = 'text-rose-400 border-rose-500/20 bg-rose-500/5';
  
  if (boot1 === 'USB Flash Drive') {
    if (secureBoot === 'Enabled' && tpm === 'Enabled') {
      diagnostics = '🟢 ผ่านมาตรฐานความปลอดภัยสูงสุด! พร้อมดำเนินการบูตบูตติดตั้ง Windows 11 และระบบความมั่นคงอื่นๆ ได้สมบูรณ์';
      diagColor = 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
    } else {
      diagnostics = '🟡 บูตติดตั้งสำเร็จระดับทั่วไป: เหมาะสำหรับการบูตติดตั้ง Windows 10, Ubuntu หรือ Linux OS สลัก Legacy (ไม่ผ่านความต้องการของ Windows 11)';
      diagColor = 'text-amber-400 border-amber-500/20 bg-amber-500/5';
    }
  }

  return (
    <SimulatorShell
      icon={<Settings className="w-6 h-6 text-indigo-500" />}
      title="เครื่องจำลองหน้าเฟิร์มแวร์ติดตั้ง (UEFI BIOS configuration Lab)"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none">
        
        {/* UEFI Screen Replica */}
        <div className="bg-[#0b132b] rounded-2xl p-5 border-4 border-[#1e293b] flex flex-col justify-between shadow-2xl relative min-h-[380px] font-mono text-xs text-[#a5b4fc] text-left">
          <span className="text-[9px] text-[#38bdf8] absolute top-3 right-4 font-bold">UEFI MOTHERBOARD CORE UTILITY</span>
          
          <div className="space-y-4">
            <h6 className="text-[13px] font-bold text-white border-b border-[#2a3c6f] pb-2 flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-[#38bdf8] animate-pulse" /> Advanced Boot Configuration Setup
            </h6>

            <div className="space-y-3.5 pt-2">
              
              {/* Option 1: Boot Priority */}
              <div className="flex justify-between items-center border-b border-[#1f2d5a] pb-2">
                <div>
                  <span className="text-white font-bold block">1st Boot Priority Option</span>
                  <span className="text-[10px] text-[#818cf8] font-sans">ลำดับความสำคัญการบูตอันดับที่หนึ่ง</span>
                </div>
                <select
                  value={boot1} onChange={(e) => setBoot1(e.target.value)}
                  className="bg-[#131b35] border border-[#31427a] rounded px-2.5 py-1 text-white focus:outline-none focus:border-[#38bdf8] cursor-pointer"
                >
                  <option value="Hard Drive" className="bg-[#131b35] text-white">Hard Drive (OS Host)</option>
                  <option value="USB Flash Drive" className="bg-[#131b35] text-white">USB Flash Drive (Setup Media)</option>
                  <option value="CD-ROM" className="bg-[#131b35] text-white">CD-ROM Drive</option>
                </select>
              </div>

              {/* Option 2: Secure Boot */}
              <div className="flex justify-between items-center border-b border-[#1f2d5a] pb-2">
                <div>
                  <span className="text-white font-bold block">Secure Boot Status</span>
                  <span className="text-[10px] text-[#818cf8] font-sans">การควบคุมสิทธิ์ตรวจจับมัลแวร์บูตเตอร์</span>
                </div>
                <select
                  value={secureBoot} onChange={(e) => setSecureBoot(e.target.value)}
                  className="bg-[#131b35] border border-[#31427a] rounded px-2.5 py-1 text-white focus:outline-none focus:border-[#38bdf8] cursor-pointer"
                >
                  <option value="Disabled" className="bg-[#131b35] text-white">Disabled (Legacy Mode Friendly)</option>
                  <option value="Enabled" className="bg-[#131b35] text-white">Enabled (Strict OS Security)</option>
                </select>
              </div>

              {/* Option 3: TPM 2.0 State */}
              <div className="flex justify-between items-center border-b border-[#1f2d5a] pb-2">
                <div>
                  <span className="text-white font-bold block">TPM 2.0 Security Chip (PTT/fTPM)</span>
                  <span className="text-[10px] text-[#818cf8] font-sans">โมดูลความปลอดภัยประมวลรหัสลับล็อกบอร์ด</span>
                </div>
                <select
                  value={tpm} onChange={(e) => setTpm(e.target.value)}
                  className="bg-[#131b35] border border-[#31427a] rounded px-2.5 py-1 text-white focus:outline-none focus:border-[#38bdf8] cursor-pointer"
                >
                  <option value="Disabled" className="bg-[#131b35] text-white">Disabled / Unregistered</option>
                  <option value="Enabled" className="bg-[#131b35] text-white">Enabled / Active Module</option>
                </select>
              </div>

            </div>
          </div>

          <div className="text-[10px] text-[#a5b4fc] bg-[#080d22] p-2.5 rounded border border-[#1f2d5a] font-sans leading-normal">
            💡 <strong>คำแนะนำหน้าเมนบอร์ด:</strong> กดปุ่ม F10 บนคีย์บอร์ดเพื่อสั่งบันทึกการตั้งค่าลงแรม CMOS ถาวร และรันลูปเปิดระบบติดตั้งใหม่
          </div>
        </div>


        {/* Diagnostic report column */}
        <div className="flex flex-col justify-between text-left">
          <div className="space-y-4">
            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">บทประเมินเฟิร์มแวร์ (Firmware Diagnostic Report)</span>
            
            <div className={`p-5 rounded-2xl border ${diagColor} min-h-[140px] flex flex-col justify-between transition-all duration-300 shadow-md`}>
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-75 block">Diagnostic Output</span>
                <p className="text-sm font-sans font-bold leading-relaxed">
                  {diagnostics}
                </p>
              </div>
              
              <div className="flex justify-between items-center text-[10px] font-mono opacity-80 pt-4 border-t border-current/10">
                <span>BOOT_DEV: {boot1}</span>
                <span>TPM: {tpm}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5 leading-normal text-[13px] text-slate-600 font-sans mt-6">
            <h6 className="font-bold text-slate-800 flex items-center gap-1.5"><Info className="w-4 h-4 text-indigo-500" /> ความรู้ช่างเทคนิค:</h6>
            <p className="text-[12px]">
              การเปิดใช้งาน Secure Boot และ TPM 2.0 จะบังคับให้เมนบอร์ดรันได้เฉพาะบนตารางโครงสร้างแบบ GPT เท่านั้น 
              โหมดดั้งเดิม (Legacy BIOS) และตาราง MBR จะถูกตัดขาดเนื่องจากไม่สามารถยืนยันกุญแจความมั่นคงระดับสูงได้
            </p>
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   6. OS Licensing Consultant Gamification (Subtopic 3.2.6)
   ═══════════════════════════════════════════════════════════════════ */
const LICENSING_SCENARIOS = [
  {
    id: 1,
    title: 'โจทย์เคสที่ 1: ระบบคอมพิวเตอร์ส่วนบุคคลของสตาร์ทอัพ',
    desc: 'คุณสมชายก่อตั้งสตาร์ทอัพของตนเอง ประกอบเครื่องคอมพิวเตอร์เล่นเกมและเขียนโค้ดขึ้นมาใช้งานเอง 1 เครื่อง โดยต้องการซื้อระบบปฏิบัติการที่ได้รับสิทธิ์เต็ม สามารถโอนย้ายเครื่องหรือเปลี่ยนแปลงชิ้นส่วนหลัก เช่น เปลี่ยนเมนบอร์ดในอนาคตได้เสรีโดยไม่เสียลิขสิทธิ์ถาวร',
    options: [
      { key: 'Retail', label: 'Retail License (FPP)', isCorrect: true, feed: 'ถูกต้อง! สิทธิ์ Retail (FPP) ราคาจำหน่ายปลีกสูงสุด ทว่ายอมให้โอนย้ายลิขสิทธิ์สิทธิ์เครื่องได้เสรีเมื่อชิ้นส่วนพังหรือประกอบคอมใหม่' },
      { key: 'OEM', label: 'OEM License', isCorrect: false, feed: 'ผิดพลาด: OEM จะถูกล็อกผูกขาดรหัสติดอยู่กับเมนบอร์ดทันที หากเปลี่ยนเมนบอร์ดหรือย้ายไปเครื่องใหม่ ลิขสิทธิ์จะพังทันที ย้ายไม่ได้' },
      { key: 'Volume', label: 'Volume License', isCorrect: false, feed: 'ผิดพลาด: Volume License กำหนดเงื่อนไขจัดทำขึ้นสำหรับสัญญาธุรกิจองค์กรจำนวนมากตั้งแต่ 5 เครื่องขึ้นไป ไม่เหมาะสำหรับพีซีสตาร์ทอัพประกอบเครื่องเดียว' }
    ]
  },
  {
    id: 2,
    title: 'โจทย์เคสที่ 2: ระบบประกอบแบรนด์พีซีเชิงพาณิชย์',
    desc: 'บริษัทสยามคอมพิวเตอร์เป็นโรงงานขนาดกลางที่ประกอบเครื่องคอมพิวเตอร์สำเร็จรูปเพื่อจัดจำหน่ายให้ลูกค้าภายใต้ยี่ห้อตนเอง บริษัทต้องการติดตั้งระบบปฏิบัติการลิขสิทธิ์จากโรงงานในราคาต้นทุนต่ำสุดเพื่อให้ราคาสินค้าแข่งขันได้ โดยลิขสิทธิ์จะไม่มีการย้ายเครื่องและยินยอมให้ผูกตายไปพร้อมกับเครื่องนั้นถาวร',
    options: [
      { key: 'Retail', label: 'Retail License (FPP)', isCorrect: false, feed: 'ผิดพลาด: Retail มีราคาสูงเกินไปสำหรับการแข่งขันด้านกำไรของผู้ผลิตเครื่องเชิงอุตสาหกรรมสำเร็จรูป' },
      { key: 'OEM', label: 'OEM License', isCorrect: true, feed: 'ถูกต้อง! สิทธิ์ OEM ได้รับการสนับสนุนราคาถูกพิเศษสำหรับบริษัทประกอบเครื่องสำเร็จรูปจำหน่าย โดยมีเงื่อนไขบังคับให้ผูกตายถาวรกับเครื่องนั้นจนพัง' },
      { key: 'Volume', label: 'Volume License', isCorrect: false, feed: 'ผิดพลาด: Volume License ไม่ได้รับอนุญาตให้นำมารีเซลหรือติดตั้งส่งต่อไปพร้อมอุปกรณ์สำเร็จรูปให้ลูกค้ารายย่อยทั่วไป' }
    ]
  },
  {
    id: 3,
    title: 'โจทย์เคสที่ 3: ระบบคอมพิวเตอร์เครือข่ายของธนาคารพัฒนาการ',
    desc: 'ธนาคารพัฒนาการขยายสำนักงานสาขาใหญ่ มีเครื่องพนักงานออฟฟิศพร้อมกัน 250 เครื่อง ช่างเทคนิคระบบต้องการลิขสิทธิ์ที่บริหารจัดการซื้อได้ในคราวเดียว มีช่องทางเปิดรันรับสิทธิ์ข้ามเครื่องอัตโนมัติผ่านการเชื่อมโยงระบบเซิร์ฟเวอร์ส่วนกลาง KMS และดูแลความเข้ากันได้ผ่านพอร์ทัลหลักช่องทางเดียว',
    options: [
      { key: 'Retail', label: 'Retail License (FPP)', isCorrect: false, feed: 'ผิดพลาด: การคัดเลือก Retail 250 กล่องสร้างความยุ่งยากระดับวิกฤตในการเก็บรักษาคีย์ และค่าใช้จ่ายรวมสูงลิ่วเกินขอบเขต' },
      { key: 'OEM', label: 'OEM License', isCorrect: false, feed: 'ผิดพลาด: สิทธิ์ OEM แยกกันประเมินบนเครื่องเดี่ยว ไม่สามารถนำมาสวิทช์เชื่อมต่อเพื่อบริหารจัดการส่วนกลางผ่านเซิร์ฟเวอร์แอมินองค์กรได้' },
      { key: 'Volume', label: 'Volume License', isCorrect: true, feed: 'ถูกต้อง! Volume License เหมาะอย่างยิ่งแก่องค์กรขนาดใหญ่ สามารถซื้อแบบมีสัญญาครอบคลุม ยินยอมให้แอมินไอทีเชื่อมตรรกะเปิดใช้งานเครื่องพร้อมกันจาก KMS Server ได้นุ่มนวล' }
    ]
  }
];

function LicensingConsultantSimulator() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const scenario = LICENSING_SCENARIOS[currentIdx];

  const handleSelect = (option) => {
    setSelectedKey(option.key);
    if (option.isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedKey(null);
    if (currentIdx + 1 < LICENSING_SCENARIOS.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedKey(null);
    setScore(0);
    setCompleted(false);
  };

  return (
    <SimulatorShell
      icon={<Award className="w-6 h-6 text-purple-500 animate-bounce" style={{ animationDuration: '4s' }} />}
      title="บทบาทสมมติที่ปรึกษาลิขสิทธิ์ไอที (IT Licensing Consultant Scenario)"
      accentBg="bg-purple-50"
      iconColor="text-purple-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left">
        
        {/* Game Scenario Box */}
        <div className="flex flex-col justify-between space-y-6">
          {!completed ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200/80 pb-2">
                <span className="text-[11px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded">
                  CASE STUDY {currentIdx + 1} OF {LICENSING_SCENARIOS.length}
                </span>
                <span className="text-xs font-bold text-slate-500 font-mono">คะแนนสะสม: {score}</span>
              </div>

              <div className="space-y-2">
                <h6 className="font-bold text-zinc-950 text-[16px] leading-tight">{scenario.title}</h6>
                <p className="text-slate-600 text-[13.5px] leading-relaxed font-sans">{scenario.desc}</p>
              </div>

              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block pt-2">ตัวเลือกประเภทสิทธิ์การใช้งาน (Select License)</span>
              
              <div className="flex flex-col gap-2">
                {scenario.options.map(opt => {
                  const isSelected = selectedKey === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => !selectedKey && handleSelect(opt)}
                      disabled={selectedKey !== null}
                      className={`p-3 text-xs text-left rounded-xl border font-bold cursor-pointer transition-all duration-200 active:scale-98 ${
                        isSelected
                          ? opt.isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                            : 'border-rose-500 bg-rose-50 text-rose-950'
                          : selectedKey !== null
                          ? 'border-slate-200 bg-slate-50/50 text-slate-400 cursor-not-allowed'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-3xl flex items-center justify-center mx-auto text-purple-600 border border-purple-200 shadow-md">
                <Award className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-zinc-950 text-lg">ภารกิจที่ปรึกษาสำเร็จการศึกษา! 🎓</h5>
                <p className="text-slate-500 text-xs max-w-xs mx-auto">
                  คุณทำคะแนนผ่านเกณฑ์การประเมินได้ {score} คะแนน จากคะแนนเต็ม {LICENSING_SCENARIOS.length} คะแนน
                </p>
              </div>

              <button
                onClick={handleRestart}
                className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer active:scale-98 shadow-md"
              >
                เริ่มประเมินเคสศึกษาใหม่
              </button>
            </div>
          )}

          {!completed && selectedKey && (
            <button
              onClick={handleNext}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-1.5"
            >
              เลื่อนสู่โจทย์เคสถัดไป
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Scenario Analysis explanation feedback */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative min-h-[340px]">
          <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">CONSULTANT ADVISORY INTERPRETATION</span>
          
          <div className="my-auto space-y-5 pt-4">
            {!selectedKey && !completed && (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 text-slate-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-slate-400 text-xs">รอการคัดเลือกตัวสิทธิ์ลิขสิทธิ์</p>
                  <p className="text-slate-600 text-[11px] max-w-xs mx-auto leading-normal">
                    กรุณากดเลือกคำอธิบายประเภทสิทธิ์การใช้งานของเคสศึกษานั้น เพื่อแสดงผลวิเคราะห์คำเฉลยทางวิชาการ
                  </p>
                </div>
              </div>
            )}

            {selectedKey && (
              <div className="space-y-4">
                {/* Result Tag */}
                <div className={`p-3.5 rounded-xl border flex gap-3 ${
                  scenario.options.find(o => o.key === selectedKey).isCorrect
                    ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300'
                    : 'border-rose-500/20 bg-rose-500/5 text-rose-300'
                }`}>
                  <Info className="w-5 h-5 shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-sm leading-none mb-1">
                      {scenario.options.find(o => o.key === selectedKey).isCorrect ? 'คำตอบถูกต้อง! ✅' : 'คำตอบไม่ตรงตามเงื่อนไข ❌'}
                    </p>
                    <p className="leading-relaxed opacity-95">
                      {scenario.options.find(o => o.key === selectedKey).feed}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {completed && (
              <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-indigo-300 text-xs leading-relaxed space-y-1.5">
                <p className="font-bold text-sm text-indigo-200">💡 บทวิเคราะห์ลิขสิทธิ์เชิงปฏิบัติวิชาชีพ:</p>
                <p>
                  การเข้าใจรายละเอียดการเตรียมพร้อมลิขสิทธิ์ช่วยให้ช่างไอทีสามารถวางแผนโครงสร้างงบประมาณองค์กรได้อย่างคุ้มค่าสูงสุด 
                  การเลือก OEM ในที่ที่ควรใช้ OEM ช่วยเซฟค่าใช้จ่ายได้มากกว่า 50% ส่วน Retail ปกป้องสินทรัพย์สำหรับสตาร์ทอัพรายย่อย
                </p>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500 font-sans leading-normal">
            * <strong>สถิติตาม พรบ.คอมพิวเตอร์:</strong> การนำเอาคีย์ประเภทสิทธิ์ OEM หรือ Volume ละเมิดข้อสัญญาไปรีเซลให้ลูกค้ารายย่อยภายนอก อาจมีความเสี่ยงระงับไลเซนส์รวมยกเครือข่ายและสิทธิ์ขาด
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}
