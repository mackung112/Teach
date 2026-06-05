/**
 * it3_4.jsx — หน่วยที่ 3.4 การจัดการไดรเวอร์ (Device Drivers) และการอัปเดต
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
  Globe, Keyboard, ShieldCheck, Lock, Eye, EyeOff, Wifi, Download, Search, RefreshCw as RestartIcon
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
   AMBIENT BACKDROP THEME — IT Unit 3 (Indigo/Emerald/Cyan/Teal Theme)
   ═══════════════════════════════════════════════════════════════════ */
const IT3_4_BLOBS = [
  { color: 'bg-indigo-300',  size: 'w-[450px] h-[450px]', position: '-top-20 -left-20',       opacity: 'opacity-30' },
  { color: 'bg-emerald-200', size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-20',      opacity: 'opacity-25' },
  { color: 'bg-cyan-200',    size: 'w-96 h-96', position: '-bottom-20 left-1/4',     opacity: 'opacity-20' },
  { color: 'bg-teal-200',    size: 'w-80 h-80', position: 'top-2/3 right-1/3',       opacity: 'opacity-20' },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA: QUIZ FOR UNIT 3.4
   ═══════════════════════════════════════════════════════════════════ */
const QUIZ_LEVELS = [
  {
    title: 'โจทย์ที่ 1: หน้าที่และบทบาทพื้นฐานของไดรเวอร์',
    desc: 'ในวิศวกรรมสถาปัตยกรรมคอมพิวเตอร์ อุปกรณ์ซอฟต์แวร์ประเภทไดรเวอร์ (Device Driver) ทำหน้าที่สำคัญที่สุดในลักษณะใด?',
    options: [
      { key: 'A', text: 'เพิ่มพลังงานไฟฟ้าจากพาวเวอร์ซัพพลายส่งตรงเข้าบอร์ดหลัก', isCorrect: false },
      { key: 'B', text: 'ทำหน้าที่เป็น "ล่ามระดับโครงสร้าง" แปลงรหัสคำสั่งระบบปฏิบัติการระดับสูงให้กลายเป็นสัญญาณเครื่องระดับต่ำที่ฮาร์ดแวร์เข้าใจ', isCorrect: true },
      { key: 'C', text: 'ทำหน้าที่บีบอัดและลบรูปภาพแคชในพื้นที่เก็บข้อมูลอัตโนมัติ', isCorrect: false },
      { key: 'D', text: 'จัดเก็บสถิติบัญชีผู้ใช้งานระบบเพื่อซิงค์เชื่อมต่อคลาวด์', isCorrect: false }
    ],
    tip: 'ไดรเวอร์คือสะพานเชื่อมที่มีคำสั่งควบคุมแปลสัญญาณระดับทรานซิสเตอร์อุปกรณ์ฮาร์ดแวร์ย่อย'
  },
  {
    title: 'โจทย์ที่ 2: รหัสจำแนกอุปกรณ์เฉพาะตัว (Hardware IDs)',
    desc: 'เมื่อช่างเทคนิคพบสัญลักษณ์ตกใจสีเหลือง ⚠️ ในหน้า Device Manager ช่างสามารถระบุค่ายและรุ่นชิปเซ็ตที่แท้จริงเพื่อสืบค้นหาไดรเวอร์จากแหล่งใดในหน้า Properties?',
    options: [
      { key: 'A', text: 'การตรวจสอบผ่านตัวเลขขนาดแรมของเครื่องพีซีโฮสต์', isCorrect: false },
      { key: 'B', text: 'การคัดลอกค่ารหัสระบุฮาร์ดแวร์ (Hardware IDs) เช่น รหัสผู้ผลิต (VEN) และรหัสอุปกรณ์ (DEV)', isCorrect: true },
      { key: 'C', text: 'การวัดอุณหภูมิความร้อนสะสมบนตะแกรงพัดลม CPU', isCorrect: false },
      { key: 'D', text: 'การปรับเปลี่ยนรูปแบบตารางพาร์ติชันจาก GPT ย้อนกลับเป็น MBR', isCorrect: false }
    ],
    tip: 'Hardware IDs ประกอบด้วยรหัส Vendor (VEN) และ Device (DEV) ซึ่งชี้เฉพาะถึงโมเดลชิปเซ็ตฮาร์ดแวร์นั้น 100%'
  },
  {
    title: 'โจทย์ที่ 3: จริยธรรมการจัดหาแหล่งข้อมูลไดรเวอร์',
    desc: 'แนวทางปฏิบัติที่ดีที่สุดและปลอดภัยที่สุดในการดาวน์โหลดติดตั้งไดรเวอร์ชิ้นส่วนคอมพิวเตอร์คือข้อใด?',
    options: [
      { key: 'A', text: 'การดาวน์โหลดผ่านโปรแกรมสแกนไดรเวอร์ฟรีจากโฆษณาในเว็บไซต์เถื่อนทั่วไป', isCorrect: false },
      { key: 'B', text: 'การเข้าไปดาวน์โหลดไฟล์ตรงจากเว็บไซต์สนับสนุนหลักอย่างเป็นทางการของแบรนด์ผู้ผลิตอุปกรณ์ชิปเซ็ตนั้นๆ', isCorrect: true },
      { key: 'C', text: 'การดึงเอาไฟล์ระบบปฏิบัติการ Windows 11 ข้ามเครื่องมาเปลี่ยนชื่อนามสกุล', isCorrect: false },
      { key: 'D', text: 'การรันไดรเวอร์ระดับโรงงานดั้งเดิมโดยไม่มีการอัปเกรดเพื่อประหยัดต้นทุน', isCorrect: false }
    ],
    tip: 'เว็บไซต์ทางการของผู้ผลิต (Official Portal) ปราศจากสปายแวร์ มัลแวร์แฝง และมีความเสถียรที่สุด'
  },
  {
    title: 'โจทย์ที่ 4: ความเสถียรและความปลอดภัยของ Windows Update',
    desc: 'ระบบ Windows Update ส่งเสริมความมั่นคงปลอดภัยและความเสถียรภาพให้กับไดรเวอร์และระบบปฏิบัติการในลักษณะใด?',
    options: [
      { key: 'A', text: 'ลบไดรเวอร์ทั้งหมดออกและบังคับให้ผู้ใช้เข้าสู่หน้า BIOS เสมอ', isCorrect: false },
      { key: 'B', text: 'ช่วยอัปเดตแพตช์ความปลอดภัยอุดช่องโหว่ระบบ (Cumulative Updates) และมีระบบส่งไดรเวอร์ที่ได้รับใบรับรอง WHQL อัตโนมัติ', isCorrect: true },
      { key: 'C', text: 'เพิ่มความจุฮาร์ดดิสก์กายภาพขึ้นอีก 50% ด้วยระบบกระจกคลาวด์', isCorrect: false },
      { key: 'D', text: 'จำกัดการเชื่อมต่อคีย์บอร์ดและแผงจอแสดงผลแบบ IPS', isCorrect: false }
    ],
    tip: 'ใบรับรอง WHQL จากไมโครซอฟท์การันตีความเข้ากันได้ของไดรเวอร์ผ่านระบบ Windows Update'
  },
  {
    title: 'โจทย์ที่ 5: การแก้ปัญหาย้อนกลับไดรเวอร์เสื่อมถอย',
    desc: 'หากช่างเทคนิคอัปเดตไดรเวอร์การ์ดจอเวอร์ชันล่าสุดแล้วพบอาการหน้าจอกระพริบและเกิดบัคจอฟ้า ช่างควรใช้ฟังก์ชันใดใน Properties ของอุปกรณ์เพื่อแก้ไข?',
    options: [
      { key: 'A', text: 'Disable Device (ปิดการใช้งานอุปกรณ์ถาวร)', isCorrect: false },
      { key: 'B', text: 'Roll Back Driver (ย้อนกลับกู้คืนไดรเวอร์เวอร์ชันเสถียรก่อนหน้า)', isCorrect: true },
      { key: 'C', text: 'Uninstall Device และเปลี่ยนดิสก์ไปรันตารางโครงสร้าง MBR ชั่วคราว', isCorrect: false },
      { key: 'D', text: 'การเปิดใช้สัญญาณ Secure Boot ใน Windows OOBE', isCorrect: false }
    ],
    tip: 'Roll Back Driver เป็นทางเลือกที่ปลอดภัยที่สุดในการดึงเอาไฟล์เสถียรเดิมกลับมารันแทนที่ไฟล์อัปเดตที่ติดบัก'
  }
];

export default function ComponentName() {
  const [deviceStatuses, setDeviceStatuses] = useState({
    chipset: 'missing', // missing | active
    video: 'missing',   // missing | active
    ethernet: 'missing' // missing | active
  });

  const resolveDevice = (key) => {
    setDeviceStatuses(current => ({
      ...current,
      [key]: 'active'
    }));
  };

  const resetDevices = () => {
    setDeviceStatuses({
      chipset: 'missing',
      video: 'missing',
      ethernet: 'missing'
    });
  };

  return (
    <>
      {/* Layer 1: Ambient Backdrop & Theme Gradients */}
      <AmbientBackdrop blobs={IT3_4_BLOBS} />

      {/* Layer 3: Flexible Subtopics & Fluid Open-Air Layout */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── SUBTOPIC 3.4.1 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">ล่ามกลางสถาปัตยกรรม</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ความหมายและหน้าที่ของไดรเวอร์ในฐานะล่ามแปลคำสั่ง
            </h3>
          </div>
          
          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในวิศวกรรมคอมพิวเตอร์และระบบปฏิบัติการ <strong>ไดรเวอร์ (Device Driver)</strong> คือซอฟต์แวร์ระบบชนิดพิเศษ 
              ที่ฝังตัวทำงานในสิทธิ์ระดับสูงเพื่อทำหน้าที่เป็น <strong>"ล่ามแปลสัญญาณทางเทคนิค (Hardware Interpreter)"</strong> 
              เชื่อมต่อและแปลงคำสั่งระบบปฏิบัติการระดับสูงที่ผู้ใช้เรียกใช้งาน (High-Level API Calls) 
              ให้กลายเป็นคำสั่งระดับฮาร์ดแวร์จำเพาะเจาะจง (Low-Level Machine Language) ที่ชิปเซ็ตอุปกรณ์นั้นๆ นำไปรันงานประมวลผลกระแสไฟฟ้าได้จริง
            </p>
            <p>
              หากไม่มีโปรแกรมไดรเวอร์ ระบบปฏิบัติการจะไม่สามารถสั่งงานหรือโต้ตอบใดๆ กับฮาร์ดแวร์กายภาพภายนอกได้เลย 
              เนื่องจากแบรนด์ผู้ผลิตชิ้นส่วนอิเล็กทรอนิกส์แต่ละค่ายต่างกำหนดรหัสคำสั่งภายในที่แตกต่างกันอย่างสิ้นเชิง 
              ไดรเวอร์จึงเข้ามาปิดบังความต่างขั้วเหล่านั้นให้แสดงผลเป็นพอร์ตสัญญาณมาตรฐาน
            </p>

            {/* Frosted Glass Callout for Driver Logic */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-emerald-500/80 mt-4 space-y-3">
              <h5 className="font-bold text-slate-800 flex items-center gap-2">
                <Info className="w-5 h-5 text-emerald-500" /> กลไกการเดินทางของคำสั่งระบบผ่านไดรเวอร์
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[14.5px] text-left">
                <div className="bg-indigo-50/40 p-3.5 rounded-xl border border-indigo-100/60 leading-normal">
                  <span className="font-bold text-indigo-700 block mb-1">1. ชั้นแอปพลิเคชัน (Application)</span>
                  ผู้ใช้กดสั่งบันทึกหรือปริ้นเอกสาร โปรแกรมประยุกต์ส่งคำร้องขอผ่านระบบ API Call เช่น <span className="font-mono text-xs bg-indigo-500/10 text-indigo-700 px-1 py-0.5 rounded">sys_print()</span>
                </div>
                <div className="bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100/60 leading-normal">
                  <span className="font-bold text-emerald-700 block mb-1">2. ชั้นระบบปฏิบัติการ (OS Kernel)</span>
                  รับคำร้องส่งต่อให้ไดรเวอร์การ์ดหรืออุปกรณ์ควบคุมทำหน้าที่ถอดความหมาย
                </div>
                <div className="bg-cyan-50/40 p-3.5 rounded-xl border border-cyan-100/60 leading-normal">
                  <span className="font-bold text-cyan-700 block mb-1">3. ชั้นไดรเวอร์และอุปกรณ์ (Driver & HW)</span>
                  ไดรเวอร์แปลงเป็นสัญญาณเลขฐานสิบหก <span className="font-mono text-xs bg-cyan-500/10 text-cyan-700 px-1 py-0.5 rounded">0x7F 0x0A</span> สั่งฮาร์ดแวร์ทำงานสำเร็จ
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Driver Interpreter Flow */}
          <DriverInterpreterSimulator />
        </section>

        {/* ─── SUBTOPIC 3.4.2 & 3.4.3 ─────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">การเฝ้าระวังและบำรุงรักษา</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การตรวจสอบผ่านเครื่องมือจัดการอุปกรณ์และการติดตั้งไดรเวอร์
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              หลังจากขั้นตอนการลงระบบปฏิบัติการเสร็จสิ้น ช่างไอทีจำเป็นต้องเข้าตรวจสอบสถานะฮาร์ดแวร์ชิ้นส่วนต่างๆ ผ่านเครื่องมือ 
              <span className="px-1.5 py-0.5 mx-1 font-mono text-[13.5px] font-bold rounded bg-emerald-50/50 border border-emerald-200/50 text-emerald-700">Device Manager</span> 
              หากระบบแสดงไอคอนสัญลักษณ์เครื่องหมายตกใจสีเหลือง <span className="px-1.5 py-0.5 mx-1 font-mono text-[13.5px] font-bold rounded bg-amber-50/50 border border-amber-200/50 text-amber-700">⚠️</span> 
              แสดงว่าชิ้นส่วนฮาร์ดแวร์นั้นยังขาดล่ามแปลสัญญาณ (Driver Missing) ทำให้ไม่สามารถส่งสัญญาณไฟฟ้าประมวลผลงานได้
            </p>
            <p>
              กระบวนการวินิจฉัยเพื่อจัดหาไดรเวอร์ที่ถูกต้อง 100% มีลำดับปฏิบัติดังนี้:
            </p>
            <ul className="space-y-3.5 my-4">
              <li className="flex items-start text-left">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-emerald-100 text-emerald-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>แกะสลักรหัส Hardware IDs:</strong> ช่างเทคนิคจะสืบค้นรหัสระบุเฉพาะตัวของชิปเซ็ตในแถบ Properties รายละเอียด Hardware IDs โดยคัดลอกค่า Vendor ID (<span className="font-mono text-xs text-emerald-700">VEN_xxxx</span>) และ Device ID (<span className="font-mono text-xs text-emerald-700">DEV_xxxx</span>) ไปใช้ค้นหา
                </div>
              </li>
              <li className="flex items-start text-left">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-emerald-100 text-emerald-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>ดาวน์โหลดจาก Official Portal:</strong> ใช้ Hardware IDs ค้นหาและเข้าไปดาวน์โหลดไฟล์ตรงผ่านคลังผู้ผลิตชิปเซ็ตหลัก เช่น Intel, NVIDIA หรือ Realtek หลีกเลี่ยงโปรแกรมรวบรวมไดรเวอร์เถื่อนที่ฝังสปายแวร์ดักรหัสผ่านคีย์บอร์ด
                </div>
              </li>
            </ul>

            {/* Frosted Glass Callout for WHQL */}
            <div className="p-5 bg-white/60 border border-slate-200 shadow-sm rounded-2xl border-l-[3px] border-l-emerald-500/80 leading-normal text-slate-500 text-sm">
              💡 <strong>ความรู้ WHQL (Windows Hardware Quality Labs):</strong> ไดรเวอร์ที่ได้รับการรับรองจากไมโครซอฟท์จะได้รับลายเซ็นดิจิทัล WHQL ซึ่งรับประกันว่าจะไม่มีไฟล์แปลกปลอมแฝง และมีความทนทานปลอดภัยสูง ไม่เสี่ยงจอดำ/จอฟ้าหลังอัปเกรด
            </div>
          </div>

          {/* Interactive Device Manager & Driver Finder Simulator Suite */}
          <div className="space-y-8">
            <h5 className="text-lg font-bold text-slate-800 text-center border-t border-slate-100 pt-6">ห้องปฏิบัติการจำลอง: จัดหาและแก้ไขไดรเวอร์ระบบคอมพิวเตอร์</h5>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Simulator 2: Device Manager */}
              <DeviceManagerAuditSimulator deviceStatuses={deviceStatuses} />
              
              {/* Simulator 3: Official Support Site Finder */}
              <DriverDownloadSimulator deviceStatuses={deviceStatuses} onResolve={resolveDevice} onReset={resetDevices} />
            </div>
          </div>
        </section>

        {/* ─── SUBTOPIC 3.4.4 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">ความปลอดภัยและแพตช์ระบบ</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การใช้ระบบ Windows Update เพื่อรักษาเสถียรภาพและอุดช่องโหว่
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              นอกเหนือจากการติดตั้งไดรเวอร์ระดับช่างแบบแมนนวล ระบบปฏิบัติการสมัยใหม่รวบรวมฟังก์ชันอัตโนมัติ 
              <span className="px-1.5 py-0.5 mx-1 font-mono text-[13.5px] font-bold rounded bg-emerald-50/50 border border-emerald-200/50 text-emerald-700">Windows Update</span> 
              ซึ่งทำหน้าที่ตรวจเช็คหาไดรเวอร์ที่ได้รับลายเซ็น WHQL และดำเนินการติดตั้งให้อัตโนมัติในพื้นหลังเพื่อประหยัดแรงงาน
            </p>
            <p>
              บทบาทสำคัญสูงสุดอีกมิติคือ **การอัปเดตเพื่ออุดช่องโหว่ความปลอดภัย (Security Cumulative Patches)** 
              ระบบจะดาวน์โหลดรหัสอุดรอยรั่วจากการค้นพบบั๊กประมวลผล CPU บอร์ดหลัก หรือสิทธิ์ในแอปพลิเคชันระบบ 
              การเพิกเฉยละเลยไม่สั่งอัปเดตแพตช์อย่างสม่ำเสมอจะส่งผลให้องค์กรเกิดช่องโหว่ความมั่นคงเสี่ยงต่อภัยคุกคามประเภทแรนซัมแวร์ (Ransomware)
            </p>
          </div>

          {/* Interactive Windows Update Simulator */}
          <WindowsUpdateSimulator />
        </section>

        {/* ─── SUBTOPIC 3.4.5 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">การกู้คืนสภาพข้อผิดพลาด</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การวินิจฉัยและแก้ปัญหาข้อผิดพลาดของไดรเวอร์เบื้องต้น
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              บ่อยครั้งในการประกอบวิชาชีพ ช่างไอทีจะพบอาการผิดปกติของไดรเวอร์หลังใช้งาน เช่น: หน้าจอขึ้นเส้นเพี้ยนหลังลงโปรแกรมใหม่, 
              การ์ดเน็ตเวิร์กแลนเกิดภาวะล็อกสัญญาณอินเทอร์เน็ตล้มเหลว หรือชิปเสียง Realtek 
              ถูกโจมตีด้วยไฟล์ระบบสกปรกขัดขวางการทำงาน ช่างจำเป็นต้องเรียนรู้มาตรการวินิจฉัยแก้ไข 3 ฟังก์ชันการเยียวยาหลัก:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 text-left">
              <div className="bg-gradient-to-br from-indigo-50/60 to-white p-5 rounded-2xl border border-indigo-100 shadow-sm space-y-2">
                <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700 inline-block"><RotateCcw className="w-5 h-5" /></span>
                <h6 className="font-bold text-indigo-950 text-[15px]">1. Roll Back Driver (กู้คืนย้อนกลับ)</h6>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  ฟังก์ชันกู้คืนระบบเพื่อถอนติดตั้งไฟล์ไดรเวอร์เวอร์ชันล่าสุดที่เพิ่งลงและติดบั๊ก แล้วดึงเอาไฟล์ไดรเวอร์เวอร์ชันเสถียรก่อนหน้ากลับมารันแทนที่ทันทีอย่างมั่นคง
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50/60 to-white p-5 rounded-2xl border border-emerald-100 shadow-sm space-y-2">
                <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700 inline-block"><Settings className="w-5 h-5" /></span>
                <h6 className="font-bold text-emerald-950 text-[15px]">2. Disable / Enable Device (รีเซตการทำงาน)</h6>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  การตัดสิทธิ์การจ่ายไฟและพักการทำงานชั่วคราว แล้วสั่งจ่ายสัญญาณใหม่อีกรอบ (Cycle power) เพื่อเคลียร์บัฟเฟอร์สัญญาณนาฬิกาและพอร์ตควบคุมโดยไม่ต้องปิดเครื่องบูตใหม่
                </p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50/60 to-white p-5 rounded-2xl border border-cyan-100 shadow-sm space-y-2">
                <span className="p-2 rounded-xl bg-cyan-100 text-cyan-700 inline-block"><Trash2 className="w-5 h-5" /></span>
                <h6 className="font-bold text-cyan-950 text-[15px]">3. Uninstall Device (ถอนระบบทิ้ง)</h6>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  ลบข้อมูลไฟล์ระบบและไดรเวอร์ของอุปกรณ์นั้นออกไปจากคลังดิสก์ SAM โดยสมบูรณ์ เพื่อเตรียมสภาพฮาร์ดแวร์ให้สะอาดหมดจดสำหรับการติดตั้งไดรเวอร์เวอร์ชันใหม่บริสุทธิ์
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Driver Troubleshooting Lab */}
          <DriverTroubleshootingLab />
        </section>

        {/* ─── QUIZ ENGINE SECTION ────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">การประเมินผล</span>
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
            title="ภารกิจวินิจฉัยและวางแนวทางบำรุงรักษาเชิงป้องกันไดรเวอร์สำหรับคอมพิวเตอร์สำนักงาน"
            taskText={`ให้นักเรียนสวมบทบาทเป็นช่างไอทีระบบบำรุงรักษาและเขียน "รายงานวินิจฉัยและแก้ปัญหาอุปกรณ์เครื่องผิดปกติ" (Hardware & Driver Maintenance Plan)
1. ระบุรุ่นชิปเซ็ตของการ์ดเชื่อมต่อแลนที่ติดรหัสเครื่องหมายตกใจสีเหลือง ⚠️ PCI\\VEN_8086&DEV_15B8 พร้อมอธิบายความสอดคล้องของ VEN และ DEV เพื่อหาแหล่งดาวน์โหลดอย่างปลอดภัย
2. วางขั้นตอนการแก้ไขปัญหา (Troubleshooting Workflow) เป็นลำดับข้อในกรณีเครื่องคอมพิวเตอร์เปิดการ์ดจอแล้วเกิด Screen Artifacts กระพริบขัดข้องหลังได้รับ Windows Update ล่าสุด
3. เขียนรายงานเปรียบเทียบขีดจำกัดความมั่นคงเมื่อองค์กรงดละเว้นไม่สั่งอัปเดต Cumulative Security Patches นานกว่า 12 เดือน`}
          />
        </div>

      </main>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   1. DRIVER INTERPRETER FLOW SIMULATOR (Subtopic 3.4.1)
   ═══════════════════════════════════════════════════════════════════ */
function DriverInterpreterSimulator() {
  const [activeRequest, setActiveRequest] = useState('none');
  const [progress, setProgress] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState(['[READY] รอส่งการร้องขอคำสั่งของแอปพลิเคชัน...']);
  const flowTimer = useRef(null);

  const requests = {
    print: {
      label: '🖨️ สั่งพิมพ์ใบเสร็จการเงิน PDF',
      desc: 'แอปบัญชีร้องขอเปิดงานส่งสัญญาณข้ามเครื่องพิมพ์สำนักงาน',
      target: 'printer',
      logs: [
        '[USER] คลิกปุ่ม "ยืนยันพิมพ์ใบสั่งซื้อเงินสด PDF"',
        '[APP] สั่งงาน API: sys_print_pdf(0x1F2C8) ไปยังระบบปฏิบัติการหลัก',
        '[OS KERNEL] รับและคัดกรองความปลอดภัย จัดคิวพอร์ต USB Spooler',
        '[DRIVER] ไดรเวอร์ดึงข้อมูล PDF ถอดรหัสย่อยเป็นรหัสเครื่อง ESC/P: [0x1B, 0x40, 0x0A]',
        '[HARDWARE] เครื่องพิมพ์ Epson ได้รับบิตและสปริงพ่นหมึกทำสีสำเร็จ ✅ [พิมพ์สำเร็จ]'
      ]
    },
    gpu: {
      label: '🎮 วาดแสงเงา 3D กราฟิกข้ามเฟรม',
      desc: 'โปรแกรมเกมประมวลผลยิงคลื่นแสงสีเงาฟิสิกส์หนักหน่วง',
      target: 'gpu',
      logs: [
        '[USER] เคลื่อนกล้องในโลกเสมือนจริงของโปรแกรมจำลอง',
        '[APP] สั่งรันชุดคำสั่งวาดภาพ: glDrawElementsInstanced()',
        '[OS KERNEL] ประสานงาน Scheduler คัดสรรคิวและสลับ context ของ CPU Cores',
        '[DRIVER] ไดรเวอร์ NVIDIA แปลคำสั่งเป็นโค้ด Assembly GPU: [mov r0, v0; mul r0, r0]',
        '[HARDWARE] ชิปการ์ดจอประมวลผล Core Clock ดันเม็ดสี RGB ขึ้นจอ 144Hz ✅ [ภาพแสดงผลสด]'
      ]
    },
    lan: {
      label: '🌐 ส่งข้อมูลแพ็กเก็ตผ่านเน็ตเวิร์ก',
      desc: 'แอปเว็บขอส่งพอร์ต TCP/IP ข้อมูลความลับของธนาคาร',
      target: 'nic',
      logs: [
        '[USER] กดส่งแบบฟอร์มยืนยันธุรกรรมระดับคลาวด์',
        '[APP] สร้างคำขอเชื่อมต่อระดับ Socket API: sys_send_socket(port_443)',
        '[OS KERNEL] จัดคิวคาร์ดการเชื่อมต่อในเลเยอร์ IP Encapsulation',
        '[DRIVER] ไดรเวอร์การ์ดแลนดึงแพ็กเก็ตย่อย แปลงเป็นรหัสเฟรม Physical Layer: [0xEE, 0xAA]',
        '[HARDWARE] ชิป NIC แปลงเป็นกระแสคลื่นสัญญาณออกสู่สายคู่ตีเกลียวแลน ✅ [ส่งผ่านสำเร็จ]'
      ]
    }
  };

  const startSimulation = (key) => {
    setActiveRequest(key);
    setProgress(0);
    if (flowTimer.current) clearInterval(flowTimer.current);

    const data = requests[key];
    setConsoleLogs([data.logs[0]]);

    let currentStep = 0;
    flowTimer.current = setInterval(() => {
      currentStep += 1;
      if (currentStep < data.logs.length) {
        setProgress(currentStep * 25);
        setConsoleLogs(current => [...current, data.logs[currentStep]]);
      }
      if (currentStep >= data.logs.length - 1) {
        clearInterval(flowTimer.current);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (flowTimer.current) clearInterval(flowTimer.current);
    };
  }, []);

  return (
    <SimulatorShell
      icon={<Terminal className="w-6 h-6 text-emerald-500" />}
      title="เครื่องจำลองกลไกแปลคำสั่ง (Driver Interpreter Flow Simulator)"
      accentBg="bg-emerald-50"
      iconColor="text-emerald-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left">
        
        {/* Left column: SVG visualization layout */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between items-center relative min-h-[420px]">
          <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">DRIVER ABSTRACTION LAYER TRANSIT</span>
          
          <svg viewBox="0 0 320 320" className="w-72 h-72 z-10 my-auto">
            {/* Defs for Flowing Gradients */}
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
              </marker>
            </defs>

            {/* Symmetrical layouts. Absolute Center is x = 160 */}
            
            {/* User clicks */}
            <rect x="70" y="15" width="180" height="30" rx="8" fill="#1E293B" stroke={activeRequest !== 'none' && progress >= 0 ? "#10B981" : "#475569"} strokeWidth="1.5" />
            <text x="160" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold">แอปพลิเคชัน (Application) 📱</text>

            {/* OS Kernel */}
            <rect x="70" y="80" width="180" height="30" rx="8" fill="#1E293B" stroke={activeRequest !== 'none' && progress >= 25 ? "#10B981" : "#475569"} strokeWidth="1.5" />
            <text x="160" y="99" textAnchor="middle" fill="#E2E8F0" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold">แกน OS Kernel ⚙️</text>

            {/* Device Driver (The Interpreter) */}
            <rect x="70" y="145" width="180" height="30" rx="8" fill="#064E3B" stroke={activeRequest !== 'none' && progress >= 50 ? "#34D399" : "#047857"} strokeWidth="1.5" />
            <text x="160" y="164" textAnchor="middle" fill="#34D399" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold">ล่าม Device Driver 🗣️</text>

            {/* Physical Hardware */}
            <rect x="70" y="210" width="180" height="30" rx="8" fill="#111827" stroke={activeRequest !== 'none' && progress >= 75 ? "#34D399" : "#374151"} strokeWidth="1.5" />
            <text x="160" y="229" textAnchor="middle" fill="#F472B6" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold">ชิปฮาร์ดแวร์ (Hardware) 🔌</text>

            {/* Flow Paths. Symmetrically at x = 160 */}
            <path d="M 160,45 L 160,80" fill="none" stroke={activeRequest !== 'none' && progress >= 0 ? "#10B981" : "#475569"} strokeWidth="2" 
                  strokeDasharray={activeRequest !== 'none' && progress >= 0 ? "5,5" : "none"} 
                  className={activeRequest !== 'none' && progress < 25 ? "animate-[dash_1s_linear_infinite]" : ""} />

            <path d="M 160,110 L 160,145" fill="none" stroke={activeRequest !== 'none' && progress >= 25 ? "#10B981" : "#475569"} strokeWidth="2" 
                  strokeDasharray={activeRequest !== 'none' && progress >= 25 ? "5,5" : "none"} 
                  className={activeRequest !== 'none' && progress >= 25 && progress < 50 ? "animate-[dash_1s_linear_infinite]" : ""} />

            <path d="M 160,175 L 160,210" fill="none" stroke={activeRequest !== 'none' && progress >= 50 ? "#34D399" : "#475569"} strokeWidth="2" 
                  strokeDasharray={activeRequest !== 'none' && progress >= 50 ? "5,5" : "none"} 
                  className={activeRequest !== 'none' && progress >= 50 && progress < 75 ? "animate-[dash_1s_linear_infinite]" : ""} />

            {activeRequest !== 'none' && progress === 100 && (
              <circle cx="160" cy="225" r="7" fill="#34D399" className="animate-ping opacity-75" />
            )}
          </svg>

          {/* Progress bar */}
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Right column: Controls & interactive virtual console logs */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">1. เลือกคำสั่งเพื่อสังเกตสัญญาณ</span>
            
            <div className="flex flex-col gap-2.5">
              {Object.keys(requests).map(key => {
                const req = requests[key];
                return (
                  <button
                    key={key}
                    onClick={() => startSimulation(key)}
                    disabled={progress > 0 && progress < 100}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 active:scale-98 flex justify-between items-center group ${
                      activeRequest === key
                        ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="grow text-left">
                      <p className="text-sm font-bold">{req.label}</p>
                      <p className="text-[11px] text-slate-500 font-normal leading-normal mt-0.5">{req.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Console logger */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-900 mt-5">
            <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase tracking-wider flex justify-between items-center border-b border-slate-900 pb-1.5">
              <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> Virtual Driver Event logs</span>
              {progress > 0 && progress < 100 && (
                <span className="text-emerald-400 flex items-center gap-1 text-[9px]"><RefreshCw className="w-2.5 h-2.5 animate-spin" /> TRANSLATING</span>
              )}
            </div>

            <div className="space-y-1.5 min-h-[140px] max-h-[140px] overflow-y-auto leading-relaxed">
              {consoleLogs.map((log, index) => (
                <div key={index} className="flex gap-2 text-xs font-mono">
                  <span className="text-slate-700 select-none">&gt;&gt;</span>
                  <p className={`${
                    log && log.includes('✅') 
                      ? 'text-emerald-400 font-bold' 
                      : log && log.startsWith('[DRIVER') 
                      ? 'text-emerald-300 font-bold'
                      : log && log.startsWith('[OS') 
                      ? 'text-cyan-300' 
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
   2. WINDOWS DEVICE MANAGER SIMULATOR (Subtopic 3.4.2)
   ═══════════════════════════════════════════════════════════════════ */
function DeviceManagerAuditSimulator({ deviceStatuses }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPropOpen, setIsPropOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('general'); // general | details

  const openProperties = (nodeKey) => {
    setSelectedNode(nodeKey);
    setIsPropOpen(true);
    setCurrentTab('general');
  };

  const devices = {
    chipset: {
      label: 'PCI Simple Communications Controller',
      status: deviceStatuses.chipset,
      code: 'PCI\\VEN_8086&DEV_A13A',
      desc: 'The drivers for this device are not installed. (Code 28)',
      vendor: 'Intel Corporation',
      deviceClass: 'System Devices'
    },
    video: {
      label: 'Video Controller (VGA Compatible)',
      status: deviceStatuses.video,
      code: 'PCI\\VEN_10DE&DEV_1C02',
      desc: 'The drivers for this device are not installed. (Code 28)',
      vendor: 'NVIDIA GeForce Corporation',
      deviceClass: 'Display Adapters'
    },
    ethernet: {
      label: 'Ethernet Controller',
      status: deviceStatuses.ethernet,
      code: 'PCI\\VEN_8086&DEV_15B8',
      desc: 'The drivers for this device are not installed. (Code 28)',
      vendor: 'Intel LAN Network Connection',
      deviceClass: 'Network Adapters'
    }
  };

  return (
    <div className="bg-[#f3f4f6] rounded-2xl p-5 border border-slate-300 flex flex-col justify-between shadow-xl relative min-h-[420px] font-sans text-xs text-slate-800 text-left select-none">
      <span className="text-[9px] font-mono text-slate-400 absolute top-3 right-4 font-bold">DEVICE MANAGER AUDIT SCREEN</span>
      
      <div className="space-y-4">
        <div>
          <h6 className="text-[13px] font-bold text-slate-900 flex items-center gap-1"><Settings className="w-4.5 h-4.5 text-slate-600 animate-spin" style={{ animationDuration: '8s' }} /> Device Manager (เครื่องมือจัดการ)</h6>
          <p className="text-[10px] text-slate-500 leading-normal">
            คลิกเลือกชิ้นส่วนที่ติดเครื่องหมายตกใจสีเหลือง ⚠️ เพื่อวินิจฉัยรหัส Hardware IDs เพื่อจัดหาไดรเวอร์
          </p>
        </div>

        {/* Tree List Replica */}
        <div className="border border-slate-300 bg-white rounded-lg p-3 space-y-2.5 max-h-[220px] overflow-y-auto min-h-[200px]">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <Monitor className="w-4 h-4 text-slate-500" /> Desktop-IT-Lab-PC
          </div>

          <div className="pl-4 space-y-2 text-[11px] text-slate-600">
            {/* Chipset Node */}
            <div className="space-y-1">
              <span className="font-bold block text-slate-500 uppercase text-[9px] tracking-wider">System Devices</span>
              <div
                onClick={() => openProperties('chipset')}
                className={`p-2 rounded-lg cursor-pointer flex justify-between items-center transition-all ${
                  selectedNode === 'chipset' ? 'bg-sky-100 font-bold text-sky-950' : 'hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {deviceStatuses.chipset === 'missing' ? (
                    <span className="w-3.5 h-3.5 bg-amber-500 text-white rounded text-[8px] font-bold flex items-center justify-center shadow-sm">⚠️</span>
                  ) : (
                    <span className="w-3.5 h-3.5 bg-emerald-500 text-white rounded text-[8px] font-bold flex items-center justify-center shadow-sm">✓</span>
                  )}
                  {devices.chipset.label}
                </span>
              </div>
            </div>

            {/* Video Node */}
            <div className="space-y-1">
              <span className="font-bold block text-slate-500 uppercase text-[9px] tracking-wider">Display Adapters</span>
              <div
                onClick={() => openProperties('video')}
                className={`p-2 rounded-lg cursor-pointer flex justify-between items-center transition-all ${
                  selectedNode === 'video' ? 'bg-sky-100 font-bold text-sky-950' : 'hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {deviceStatuses.video === 'missing' ? (
                    <span className="w-3.5 h-3.5 bg-amber-500 text-white rounded text-[8px] font-bold flex items-center justify-center shadow-sm">⚠️</span>
                  ) : (
                    <span className="w-3.5 h-3.5 bg-emerald-500 text-white rounded text-[8px] font-bold flex items-center justify-center shadow-sm">✓</span>
                  )}
                  {devices.video.label}
                </span>
              </div>
            </div>

            {/* Ethernet Node */}
            <div className="space-y-1">
              <span className="font-bold block text-slate-500 uppercase text-[9px] tracking-wider">Network Adapters</span>
              <div
                onClick={() => openProperties('ethernet')}
                className={`p-2 rounded-lg cursor-pointer flex justify-between items-center transition-all ${
                  selectedNode === 'ethernet' ? 'bg-sky-100 font-bold text-sky-950' : 'hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {deviceStatuses.ethernet === 'missing' ? (
                    <span className="w-3.5 h-3.5 bg-amber-500 text-white rounded text-[8px] font-bold flex items-center justify-center shadow-sm">⚠️</span>
                  ) : (
                    <span className="w-3.5 h-3.5 bg-emerald-500 text-white rounded text-[8px] font-bold flex items-center justify-center shadow-sm">✓</span>
                  )}
                  {devices.ethernet.label}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Properties Modal Panel */}
      {isPropOpen && selectedNode && (
        <div className="absolute inset-x-5 bottom-5 bg-white border border-slate-300 rounded-xl p-4 shadow-2xl animate-[slideUp_0.2s_ease-out] z-20">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-3">
            <span className="font-bold text-slate-800 text-[11px] font-mono">{devices[selectedNode].label} Properties</span>
            <button onClick={() => setIsPropOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer">✕</button>
          </div>

          {/* Properties Tabs */}
          <div className="flex border-b border-slate-200 mb-3 text-[10.5px]">
            <button
              onClick={() => setCurrentTab('general')}
              className={`py-1 px-3 border-b-2 font-bold cursor-pointer ${
                currentTab === 'general' ? 'border-sky-500 text-sky-700' : 'border-transparent text-slate-500'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setCurrentTab('details')}
              className={`py-1 px-3 border-b-2 font-bold cursor-pointer ${
                currentTab === 'details' ? 'border-sky-500 text-sky-700' : 'border-transparent text-slate-500'
              }`}
            >
              Details
            </button>
          </div>

          {/* Tab contents */}
          {currentTab === 'general' ? (
            <div className="space-y-2 text-[10.5px]">
              <div>
                <span className="text-slate-400 block">Device Type:</span>
                <span className="font-bold text-slate-700">{devices[selectedNode].deviceClass}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Manufacturer:</span>
                <span className="font-bold text-slate-700">{devices[selectedNode].vendor}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Device Status</span>
                <p className={`font-semibold ${devices[selectedNode].status === 'missing' ? 'text-amber-700' : 'text-emerald-700'}`}>
                  {devices[selectedNode].status === 'missing' 
                    ? devices[selectedNode].desc 
                    : 'This device is working properly. ( WHQL Active )'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-[10.5px] text-left">
              <span className="text-slate-400 block">Property Selector:</span>
              <div className="w-full p-1.5 bg-slate-100 border border-slate-200 rounded font-semibold">
                Hardware IDs (รหัสเฉพาะชิปเซ็ต)
              </div>
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-slate-400 block">Value (Hardware ID String):</span>
                <div className="p-2 bg-slate-900 border border-slate-800 rounded font-mono text-[10px] text-sky-400 font-bold select-all flex justify-between items-center">
                  <span>{devices[selectedNode].code}</span>
                  <span className="text-[8px] text-slate-500 font-sans tracking-wide">COPYABLE</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="text-[10px] text-slate-500 border-t border-slate-200 pt-3">
        * <strong>คำแนะนำเชิงเทคนิค:</strong> เลือกอุปกรณ์ที่ติดตัวตกใจเหลืองเพื่อเข้าดู Properties รายละเอียดในหน้า Details เพื่อสลักระบุค่า Hardware ID
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. MANUFACTURER DRIVER DOWNLOAD CENTER SIMULATOR (Subtopic 3.4.3)
   ═══════════════════════════════════════════════════════════════════ */
function DriverDownloadSimulator({ deviceStatuses, onResolve, onReset }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingKey, setDownloadingKey] = useState(null);
  const [progress, setProgress] = useState(0);
  const downloadTimer = useRef(null);

  const officialDrivers = [
    {
      key: 'chipset',
      idString: 'PCI\\VEN_8086&DEV_A13A',
      title: 'Intel Management Engine (ME) Chipset Utility Installer v19.1',
      size: '85.2 MB',
      vendor: 'Intel'
    },
    {
      key: 'video',
      idString: 'PCI\\VEN_10DE&DEV_1C02',
      title: 'NVIDIA GeForce Game Ready Graphics Driver v551.23 WHQL',
      size: '645.1 MB',
      vendor: 'NVIDIA'
    },
    {
      key: 'ethernet',
      idString: 'PCI\\VEN_8086&DEV_15B8',
      title: 'Intel Gigabit LAN Network Connection Adapter Driver v28.2',
      size: '42.8 MB',
      vendor: 'Intel'
    }
  ];

  // Search logic filtering
  const filteredDrivers = officialDrivers.filter(drv => 
    drv.idString.toLowerCase().includes(searchQuery.toLowerCase()) ||
    drv.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    drv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (drvKey) => {
    setDownloadingKey(drvKey);
    setProgress(0);
    if (downloadTimer.current) clearInterval(downloadTimer.current);

    let currentProgress = 0;
    downloadTimer.current = setInterval(() => {
      currentProgress += 10;
      if (currentProgress >= 100) {
        clearInterval(downloadTimer.current);
        setProgress(100);
        onResolve(drvKey); // Sync callback to Simulator 2 to RESOLVE yellow warning!
        setDownloadingKey(null);
        setProgress(0);
      } else {
        setProgress(currentProgress);
      }
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (downloadTimer.current) clearInterval(downloadTimer.current);
    };
  }, []);

  return (
    <div className="bg-[#0b1329] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[420px] font-sans text-xs text-slate-200 text-left select-none">
      <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">OFFICIAL SUPPORT PORTAL</span>
      
      <div className="space-y-4">
        <div>
          <h6 className="text-[13px] font-bold text-white flex items-center gap-1.5"><Globe className="w-4.5 h-4.5 text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} /> Chipset & Driver Download Center</h6>
          <p className="text-[10px] text-slate-400 leading-normal">
            วางข้อมูลรหัส Hardware IDs ของค่ายการผลิตเพื่อตรวจหาไดรเวอร์ WHQL ตัวจริง
          </p>
        </div>

        {/* Search bar inputs */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาด้วย Hardware ID (เช่น VEN_8086, DEV_1C02) หรือแบรนด์..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>

        {/* Display filtered results */}
        <div className="space-y-2 max-h-[170px] overflow-y-auto min-h-[150px]">
          {filteredDrivers.length > 0 ? (
            filteredDrivers.map(drv => {
              const isResolved = deviceStatuses[drv.key] === 'active';
              return (
                <div key={drv.key} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center gap-3">
                  <div className="space-y-1 grow min-w-0">
                    <span className="font-bold text-white text-[11.5px] block truncate">{drv.title}</span>
                    <span className="font-mono text-[9px] text-slate-500 block truncate">ID Match: {drv.idString}</span>
                  </div>

                  <div className="shrink-0">
                    {isResolved ? (
                      <span className="py-1 px-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[10px] rounded-lg">
                        Installed
                      </span>
                    ) : downloadingKey === drv.key ? (
                      <div className="text-right space-y-1">
                        <span className="text-[9px] font-mono text-emerald-400">{progress}%</span>
                        <div className="w-16 bg-slate-900 h-1 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDownload(drv.key)}
                        disabled={downloadingKey !== null}
                        className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg cursor-pointer flex items-center gap-1 active:scale-98 disabled:bg-slate-800 disabled:text-slate-500"
                      >
                        <Download className="w-3.5 h-3.5" /> Get Driver
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-500 font-sans text-xs">
              ไม่พบรายการไดรเวอร์ที่ตรงกับเงื่อนไขค้นหา
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 border-t border-slate-900 pt-3.5">
        <button
          onClick={onReset}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer active:scale-98 transition-all text-center"
        >
          รีเซ็ตสถานะไดรเวอร์ทั้งหมด (RESET)
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. WINDOWS UPDATE CENTER & PATCH MANAGER (Subtopic 3.4.4)
   ═══════════════════════════════════════════════════════════════════ */
function WindowsUpdateSimulator() {
  const [stage, setStage] = useState('ready'); // ready | checking | updates_found | downloading | restart_required | rebooting | done
  const [log, setLog] = useState('Standby for update execution...');
  const [progress, setProgress] = useState(0);
  const timer = useRef(null);

  const startCheck = () => {
    setStage('checking');
    setLog('Connecting to Microsoft secure distribution network...');
    setTimeout(() => {
      setStage('updates_found');
      setLog('Success: Found pending security packages and hardware driver updates.');
    }, 1800);
  };

  const startDownload = () => {
    setStage('downloading');
    setProgress(0);
    setLog('Downloading cumulative security patch KB5034123...');

    if (timer.current) clearInterval(timer.current);

    let currentProgress = 0;
    timer.current = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);

      if (currentProgress === 50) {
        setLog('Applying Windows Kernel telemetry update patch...');
      }
      if (currentProgress === 80) {
        setLog('Registering Intel LAN driver hotfix patches...');
      }
      if (currentProgress >= 100) {
        clearInterval(timer.current);
        setStage('restart_required');
        setLog('Installation complete. Pending system restart to commit files.');
      }
    }, 250);
  };

  const triggerReboot = () => {
    setStage('rebooting');
    setLog('System shutting down...');
    setTimeout(() => {
      setLog('Configuring updates. Do not turn off your computer... 30%');
    }, 1000);
    setTimeout(() => {
      setLog('Applying database parameters. Do not turn off your computer... 75%');
    }, 2000);
    setTimeout(() => {
      setStage('done');
      setLog('System Boot successfully. You are up to date! ✅');
    }, 3200);
  };

  const handleReset = () => {
    setStage('ready');
    setLog('Standby for update execution...');
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <SimulatorShell
      icon={<Layers className="w-6 h-6 text-emerald-500" />}
      title="เครื่องจำลองการติดตั้งระบบอัปเดต (Windows Update Center & Patch Simulator)"
      accentBg="bg-emerald-50"
      iconColor="text-emerald-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left">
        
        {/* Settings Replica panel */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[380px] font-sans text-xs text-slate-200">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">WINDOWS UPDATE SETTINGS</span>
          
          <div className="space-y-4">
            <div>
              <h6 className="text-[13px] font-bold text-white flex items-center gap-1.5">
                <RestartIcon className={`w-4 h-4 text-emerald-400 ${stage === 'checking' || stage === 'downloading' ? 'animate-spin' : ''}`} /> 
                Windows Update Center
              </h6>
              <p className="text-[10px] text-slate-400 leading-normal">
                สั่งงานประเมินตรวจหาช่องโหว่ เพื่อรักษาสุขภาพความปลอดภัยสูงสุดข้ามเครือข่าย
              </p>
            </div>

            {/* Current State Indicator Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              {stage === 'ready' && (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-200 text-sm">You are check ready</p>
                    <p className="text-[10px] text-slate-500">Last checked: Today, 22:20</p>
                  </div>
                  <button
                    onClick={startCheck}
                    className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg cursor-pointer active:scale-98"
                  >
                    Check for Updates
                  </button>
                </div>
              )}

              {stage === 'checking' && (
                <div className="space-y-2 py-2">
                  <p className="font-bold text-slate-300 flex items-center gap-2"><RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" /> Checking for updates...</p>
                  <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full animate-[pulse_1s_infinite] w-3/4" />
                  </div>
                </div>
              )}

              {stage === 'updates_found' && (
                <div className="space-y-3">
                  <div>
                    <p className="font-bold text-amber-300 text-sm flex items-center gap-1.5">⚠️ Updates Pending Action</p>
                    <p className="text-[10px] text-slate-500">ตรวจพบแพตช์ความมั่นคงสำคัญที่ต้องลงทะเบียน</p>
                  </div>

                  <div className="space-y-1.5 border-t border-slate-800 pt-2 text-[10.5px] text-slate-400">
                    <div className="flex justify-between">
                      <span>• KB5034123: Security Cumulative Patch</span>
                      <span className="text-amber-400">Ready</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Intel Corporation - Ext - 28.2.1.0</span>
                      <span className="text-amber-400">Ready</span>
                    </div>
                  </div>

                  <button
                    onClick={startDownload}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg cursor-pointer active:scale-98"
                  >
                    Download and Install All
                  </button>
                </div>
              )}

              {stage === 'downloading' && (
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Installing packages...</span>
                    <span className="text-emerald-400 font-bold">{progress}%</span>
                  </div>

                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              {stage === 'restart_required' && (
                <div className="flex justify-between items-center gap-3">
                  <div>
                    <p className="font-bold text-amber-300 text-sm">Restart Required</p>
                    <p className="text-[10px] text-slate-500 leading-normal">ต้องการการรีสตาร์ทเครื่องเพื่อให้ไฟล์ระบบมีผลถาวร</p>
                  </div>
                  <button
                    onClick={triggerReboot}
                    className="py-1.5 px-3 bg-indigo-600 hover:bg-indigo-800 text-white font-bold text-[11px] rounded-lg cursor-pointer active:scale-98 shadow-md"
                  >
                    Restart Now
                  </button>
                </div>
              )}

              {stage === 'rebooting' && (
                <div className="text-center py-4 space-y-2 animate-pulse">
                  <RestartIcon className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
                  <p className="font-mono text-[10px] text-indigo-300">REBOOTING TARGET BOOT LOOPS...</p>
                </div>
              )}

              {stage === 'done' && (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-emerald-400 text-sm">System is Up to Date</p>
                    <p className="text-[10px] text-slate-500">Security Index: Max Protect</p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg cursor-pointer active:scale-98"
                  >
                    Check again
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Console status log */}
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-900 font-mono text-[11px] text-slate-400 flex gap-2">
            <span className="text-slate-700 select-none">&gt;</span>
            <p className={`${stage === 'done' ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>
              {log}
            </p>
          </div>
        </div>

        {/* Right explanatory column */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">การอัปเดตเพื่อความปลอดภัยสูงสุด</span>
            <div className="text-slate-600 text-sm leading-relaxed space-y-3.5">
              <p>
                ในงานช่างไอทีระบบปฏิบัติการ Windows Update ไม่ได้รันไว้เพื่อเพิ่มสไตล์ความสวยงาม ทว่าส่งสิทธิประโยชน์ความมั่นคง 2 ด้านวิกฤต:
              </p>

              <div className="space-y-2.5">
                <div className="bg-white/60 p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5 hover:shadow-md transition-all">
                  <span className="p-1 rounded bg-indigo-50 text-indigo-600 shrink-0"><ShieldCheck className="w-4 h-4" /></span>
                  <p className="text-xs text-slate-500 leading-normal">
                    <strong>Cumulative Security patches:</strong> การดาวน์โหลดแพตช์รายสัปดาห์/รายเดือน เพื่ออุดรอยรั่วระบบ Kernel ช่วยปกป้องเครื่องพนักงานจากการถูกโจมตีระยะไกล (Zero-Day Exploits)
                  </p>
                </div>
                <div className="bg-white/60 p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5 hover:shadow-md transition-all">
                  <span className="p-1 rounded bg-indigo-50 text-indigo-600 shrink-0"><Cpu className="w-4 h-4" /></span>
                  <p className="text-xs text-slate-500 leading-normal">
                    <strong>การจัดส่งไดรเวอร์ WHQL:</strong> ไมโครซอฟท์ทำหน้าที่กรองไดรเวอร์จากค่ายพาร์ทเนอร์ และรันดาวน์โหลดแพ็กเกจที่เสถียรที่สุดให้คอมพิวเตอร์พนักงานโดยไม่มีบัก
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-sans text-xs space-y-1.5 mt-6">
            <h6 className="font-bold text-slate-800 flex items-center gap-1.5"><Info className="w-4 h-4 text-indigo-500" /> เทคนิคหน้างานช่าง:</h6>
            <p className="text-[12px] leading-relaxed">
              ในสำนักงานระดับโรงเรียนหรือบริษัทขนาดใหญ่ แอดมินไอทีจะขยายสิทธิ์ควบคุมการอัปเดตผ่านระบบ **WSUS (Windows Server Update Services)** เพื่อทดสอบเสถียรภาพแพตช์ก่อนกดยิงอัปเดตพร้อมกันข้ามเครื่องในแลน
            </p>
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   5. DRIVER TROUBLESHOOTING LAB (Subtopic 3.4.5)
   ═══════════════════════════════════════════════════════════════════ */
const TROUBLESHOOTING_CASES = [
  {
    id: 1,
    title: 'กรณีที่ 1: การเกิด Screen Artifacts จอกระพริบหลังรับการอัปเดตล่าสุด',
    desc: 'พนักงานฝ่ายวาดภาพ 3D แจ้งว่า เครื่องคอมพิวเตอร์เพิ่งได้รับไฟล์อัปเดตไดรเวอร์การ์ดจอเวอร์ชันล่าสุด v555.10 อัตโนมัติ ทว่าหลังจากรีบูตพบอาการหน้าจอกระพริบถี่ สั่นค้าง และสเปกขึ้นเส้นเพี้ยนขีดสีรุ้งรบกวนสายตา โดยช่างไอทีตรวจสอบแล้วว่าเวอร์ชันเก่า v551.23 ทำงานได้เสถียรเป็นปกติ ไร้อาการเพี้ยนใดๆ',
    actions: [
      { key: 'rollback', label: 'Roll Back Driver (ย้อนกลับรุ่นเก่าเสถียร)', isCorrect: true, feed: 'ถูกต้อง! การเลือก Roll Back Driver ปลอดภัยที่สุดในการวินิจฉัยบั๊กของไฟล์อัปเดตล่าสุด โดยระบบจะถอดไฟล์ v555.10 ออก และกู้เอาไดรเวอร์ตัวเก่าที่เสถียรกลับมารันแทนที่ทันที' },
      { key: 'disable', label: 'Disable Device (ปิดสัญญาณชั่วคราว)', isCorrect: false, feed: 'ผิดพลาด: การ Disable Device จะตัดการส่งพิกัดสัญญาณของการ์ดจอทิ้ง ส่งผลให้ระบบไปดึงเอาสกีมาระบบขั้นต่ำ Microsoft Basic Display Adapter มารันแทนภาพจะจืดและช้าลงมาก ไม่ได้กู้บักไดรเวอร์' },
      { key: 'uninstall', label: 'Uninstall Device (ลบถอนระบบทิ้ง)', isCorrect: false, feed: 'ผิดพลาด: แม้การลบจะสามารถทำได้ แต่ช่างต้องไปเสียเวลาสืบค้นและดาวน์โหลด v551.23 มาติดตั้งใหม่ ซึ่งช้ากว่าฟังก์ชัน Roll Back ที่มีข้อมูลสำรองรออยู่ใน RAM CMOS แล้ว' }
    ]
  },
  {
    id: 2,
    title: 'กรณีที่ 2: พอร์ต LAN Ethernet ค้าง ดับจ่ายไฟสัญญาณนาฬิกาล้มเหลว',
    desc: 'พนักงานฝ่ายจัดทำเอกสารการเงินรายงานว่า การ์ดแลนเน็ตเวิร์ก Ethernet Controller เกิดดับสนิทกะทันหัน ไม่รับสัญญาณสายแลน และขึ้นเครื่องหมายตกใจสีเหลือง ⚠️ ตรรกะของพอร์ตรับการเชื่อมต่อขัดข้องชั่วคราวเนื่องจากบัฟเฟอร์สัญญาณนาฬิกาชำรุด ช่างต้องการรีเซตระบบตัดไฟพลังงานและเรียกสิทธิ์สัญญาณนาฬิกาใหม่โดยไม่ต้องบูตคอมพิวเตอร์',
    actions: [
      { key: 'rollback', label: 'Roll Back Driver (ย้อนกลับรุ่นเก่า)', isCorrect: false, feed: 'ผิดพลาด: บัญชีไดรเวอร์ไม่มีข้อมูลให้อัปเดตย้อนหลัง และปัญหาเกิดจากระดับพลังงานทางกายภาพชั่วคราวไม่ใช่เวอร์ชันของไฟล์ไดรเวอร์' },
      { key: 'disable', label: 'Disable แล้วสั่ง Enable Device (รีเซตพลังงาน)', isCorrect: true, feed: 'ถูกต้อง! การรัน Disable และตามด้วย Enable Device เสมือนการชัตดาวน์พลังงานระดับพอร์ตและดึงสัญญาณนาฬิกาให้ชิปการ์ดแลนรีบูตตัวเองระดับไมโครวินาที ช่วยเคลียร์บัฟเฟอร์ไฟฟ้าและเชื่อมต่อใหม่สำเร็จโดยไม่ต้องบูต OS' },
      { key: 'uninstall', label: 'Uninstall Device (ถอนระบบทิ้ง)', isCorrect: false, feed: 'ผิดพลาด: การถอนระบบทิ้งจะลบไฟล์ไดรเวอร์ออกไป ช่างจำต้องลงทะเบียนกวาดล้างและหาทางอิมพอร์ตไดรเวอร์เข้ามาติดตั้งใหม่ซึ่งสร้างภาระงานเกินความจำเป็น' }
    ]
  },
  {
    id: 3,
    title: 'กรณีที่ 3: ไดรเวอร์ชิปเสียงมีสปายแวร์แฝงตัว ถูกเขียนทับด้วยไฟล์สกปรก',
    desc: 'ชิปเสียง Realtek Multimedia Controller ถูกแฮกเกอร์เขียนรหัสโปรแกรมสกปรก (Corrupted driver payload) ทับทับตำแหน่งหน่วยความจำหลัก SAM จากการที่พนักงานแอบเข้าไปดาวน์โหลดโปรแกรมเถื่อนข้ามเครือข่าย ส่งผลให้เสียงหวีดแหลมและขึ้นบล็อกความปลอดภัย ช่างต้องการล้างไฟล์ขยะและรอยโรคไดรเวอร์ชิ้นนี้ทิ้งอย่างหมดจดจากดิสก์เพื่อเตรียมลงไดรเวอร์ใหม่บริสุทธิ์',
    actions: [
      { key: 'rollback', label: 'Roll Back Driver (ย้อนกลับรุ่นเสถียร)', isCorrect: false, feed: 'ผิดพลาด: ไฟล์ไดรเวอร์ที่เพิ่งติดมัลแวร์ไปเขียนทับพื้นที่ SAM แล้ว การใช้ Roll Back อาจไม่สามารถกวาดล้างรหัสสกปรกที่ฝังลึกในไดเรกทอรีจัดเก็บระบบได้' },
      { key: 'disable', label: 'Disable Device (ปิดสัญญาณชั่วคราว)', isCorrect: false, feed: 'ผิดพลาด: ปิดสัญญาณเพียงแค่ซ่อนอาการขัดข้องไว้ แต่ไฟล์สปายแวร์สกปรกยังแอบแฝงตัวฝังอยู่ในพาร์ติชัน Drive C: โฮสต์และขโมยข้อมูล Telemetry ต่อเนื่อง' },
      { key: 'uninstall', label: 'Uninstall Device & Delete Software (ลบถอนรากเหง้า)', isCorrect: true, feed: 'ถูกต้อง! ในกรณีไดรเวอร์ปนเปื้อนสกปรก ช่างเทคนิคต้องเลือกสั่ง Uninstall Device ควบคู่กับการติ๊กเครื่องหมายถูกลบซอฟต์แวร์ไดรเวอร์ออกไปจากเครื่องถาวร เพื่อให้ระบบกำจัดไฟล์ตกค้างทั้งหมดและพร้อมรับไฟล์ไดรเวอร์บริสุทธิ์ตัวจริง WHQL' }
    ]
  }
];

function DriverTroubleshootingLab() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const scenario = TROUBLESHOOTING_CASES[currentIdx];

  const handleSelect = (option) => {
    setSelectedKey(option.key);
    if (option.isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedKey(null);
    if (currentIdx + 1 < TROUBLESHOOTING_CASES.length) {
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
      icon={<ShieldAlert className="w-6 h-6 text-emerald-500 animate-bounce" style={{ animationDuration: '4s' }} />}
      title="ห้องวิจัยแก้บั๊กไดรเวอร์ (Driver Troubleshooting & Action Panel)"
      accentBg="bg-emerald-50"
      iconColor="text-emerald-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left">
        
        {/* Scenario description & choices */}
        <div className="flex flex-col justify-between space-y-6">
          {!completed ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200/80 pb-2">
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">
                  DIAGNOSTIC CASE {currentIdx + 1} OF {TROUBLESHOOTING_CASES.length}
                </span>
                <span className="text-xs font-bold text-slate-500 font-mono">คะแนนสะสม: {score}</span>
              </div>

              <div className="space-y-2">
                <h6 className="font-bold text-zinc-950 text-[15px] leading-tight">{scenario.title}</h6>
                <p className="text-slate-600 text-[13px] leading-relaxed font-sans">{scenario.desc}</p>
              </div>

              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block pt-2">ตัวเลือกฟังก์ชันการรักษา (Select Remedial Action)</span>
              
              <div className="flex flex-col gap-2">
                {scenario.actions.map(opt => {
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
              <div className="w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200 shadow-md">
                <Award className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-zinc-950 text-base">ภารกิจวินิจฉัยไดรเวอร์ลุล่วง! 🎓</h5>
                <p className="text-slate-500 text-xs max-w-xs mx-auto">
                  คุณทำคะแนนวินิจฉัยซ่อมบำรุงผ่านเกณฑ์เก็บสถิติได้ {score} คะแนน จากคะแนนเต็ม {TROUBLESHOOTING_CASES.length} คะแนน
                </p>
              </div>

              <button
                onClick={handleRestart}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer active:scale-98 shadow-md"
              >
                เริ่มรันประเมินเคสซ่อมใหม่
              </button>
            </div>
          )}

          {!completed && selectedKey && (
            <button
              onClick={handleNext}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-1.5"
            >
              ประเมินโจทย์เคสถัดไป
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right column feedback presentation */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative min-h-[340px]">
          <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">TECHNICAL DIAGNOSTIC LOGS</span>
          
          <div className="my-auto space-y-5 pt-4">
            {!selectedKey && !completed && (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 text-slate-500 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="text-slate-400 text-xs font-bold">รอการคัดเลือกการแก้ไขช่างเทคนิค</p>
                  <p className="text-slate-600 text-[11px] max-w-xs mx-auto leading-normal">
                    กรุณากดเลือกมาตรการฟังก์ชัน Properties ด้านซ้าย เพื่อพ่นผลวิเคราะห์เฉลยข้อเท็จจริงสากล
                  </p>
                </div>
              </div>
            )}

            {selectedKey && (
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border flex gap-3.5 ${
                  scenario.actions.find(o => o.key === selectedKey).isCorrect
                    ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300'
                    : 'border-rose-500/20 bg-rose-500/5 text-rose-300'
                }`}>
                  <Info className="w-5 h-5 shrink-0" />
                  <div className="text-xs font-sans">
                    <p className="font-bold text-sm leading-none mb-1">
                      {scenario.actions.find(o => o.key === selectedKey).isCorrect ? 'Remedial Success! ✅' : 'Remedial Rejected! ❌'}
                    </p>
                    <p className="leading-relaxed opacity-95">
                      {scenario.actions.find(o => o.key === selectedKey).feed}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {completed && (
              <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-indigo-300 text-xs leading-relaxed space-y-1.5 font-sans">
                <p className="font-bold text-sm text-indigo-200">💡 สรุปทางจริยธรรมวิชาชีพช่าง:</p>
                <p>
                  ช่างบำรุงรักษาที่ดีต้องแยกแยะอาการและคัดเลือกใช้ฟังก์ชันแก้ปัญหาได้เหมาะสมกับอาการ 
                  หลีกเลี่ยงการสั่ง Uninstall หรือสั่งลงระบบใหม่ (Re-install OS) พร่ำเพรื่อในกรณีที่เป็นเพียงปัญหาเล็กย่อยระดับพอร์ตสัญญาณ 
                  เพื่อเซฟเวลาและรักษาความมั่นคงของฐานข้อมูล SAM องค์กร
                </p>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500 font-sans leading-normal">
            * <strong>มาตรการความมั่นคง:</strong> การสั่งลงไดรเวอร์การ์ดจอผิดพลาดอาจกระตุ้นให้ชิปเกิดความร้อนสะสมจน CPU ตัดไฟบัสและพังพินาศในทางกายภาพ
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}
