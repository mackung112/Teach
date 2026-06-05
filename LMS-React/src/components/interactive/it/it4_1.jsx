/**
 * it4_1.jsx — หน่วยที่ 4.1 อุปกรณ์เครือข่ายระดับฮาร์ดแวร์พื้นฐาน (Network Devices)
 * ====================================================================
 * Vertical Stacking Page Architecture: 7 academic subtopics + 5 premium simulators + Quiz + Task
 * Immersive Full-Page Standard (4 Layers) — Fluid Open-Air Layout
 * NO sounds | NO dynamic Tailwind | Local State only
 * Deduplication via reuse of Shared Base Components
 * Symmetrical Center SVG Connection Standard
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert, Settings, ChevronRight, FileText, Key, Award, AlertCircle,
  Globe, Keyboard, ShieldCheck, Lock, Eye, EyeOff, Wifi, Download, Search, 
  RefreshCw, Terminal, Layers, ArrowRight, RotateCcw, Play, Pause, Plus, Trash2, 
  CheckCircle2, AlertTriangle, HelpCircle, Server, User, AppWindow, Database, Info, Check,
  Cpu, Activity, Radio, LockKeyhole, Network, Sliders, Settings2, PlusCircle
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
   AMBIENT BACKDROP THEME — IT Unit 4 (Cyan/Teal/Indigo/Slate Theme)
   ═══════════════════════════════════════════════════════════════════ */
const IT4_1_BLOBS = [
  { color: 'bg-cyan-300',    size: 'w-[450px] h-[450px]', position: '-top-20 -left-20',       opacity: 'opacity-30' },
  { color: 'bg-teal-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-20',      opacity: 'opacity-25' },
  { color: 'bg-indigo-300',  size: 'w-96 h-96', position: '-bottom-20 left-1/4',     opacity: 'opacity-20' },
  { color: 'bg-slate-300',   size: 'w-80 h-80', position: 'top-2/3 right-1/3',       opacity: 'opacity-20' },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA: QUIZ FOR UNIT 4.1
   ═══════════════════════════════════════════════════════════════════ */
const QUIZ_LEVELS = [
  {
    title: 'โจทย์ที่ 1: ส่วนประกอบของหมายเลข MAC Address',
    desc: 'รหัส 24 บิตแรกบนหมายเลข MAC Address ขนาด 48 บิตในมาตรฐาน IEEE 802 เรียกว่าอะไร และทำหน้าที่ระบุขอบเขตใด?',
    options: [
      { key: 'A', text: 'NIC Specific Identifier ทำหน้าที่ระบุลำดับสายการผลิตของแผงวงจรกายภาพ', isCorrect: false },
      { key: 'B', text: 'Organizationally Unique Identifier (OUI) ทำหน้าที่ระบุรหัสประจำตัวของบริษัทผู้ผลิตชิ้นส่วนฮาร์ดแวร์นั้น', isCorrect: true },
      { key: 'C', text: 'IPv4 Subnet Mask Boundary ทำหน้าที่จำแนกความกว้างวงเครือข่ายย่อยท้องถิ่น', isCorrect: false },
      { key: 'D', text: 'Frame Check Sequence (FCS) ทำหน้าที่คำนวณข้อผิดพลาดของข้อมูลแพ็กเก็ตบิต', isCorrect: false }
    ],
    tip: 'OUI (24 บิตแรก) ออกให้โดยองค์กร IEEE เพื่อระบุค่ายผู้ผลิตอุปกรณ์เน็ตเวิร์ก เช่น Cisco, Intel, Realtek'
  },
  {
    title: 'โจทย์ที่ 2: ความแตกต่างของการกระจายข้อมูลระหว่าง Hub และ Switch',
    desc: 'ในการออกแบบเครือข่ายแลน เพราะเหตุใด Switch จึงมีความปลอดภัยสูงและไม่มีการชนกันของสัญญาณข้อมูล (Collision) เหมือน Hub?',
    options: [
      { key: 'A', text: 'เนื่องจาก Switch บังคับแปลงสัญญาณจากสัญญาณไฟฟ้าเป็นความถี่วิทยุ WAP เสมอ', isCorrect: false },
      { key: 'B', text: 'เนื่องจาก Switch ใช้หลักการเรียนรู้ตาราง MAC Address Table เพื่อนำส่งข้อมูลแบบเจาะจงรายพอร์ต (Unicast) ต่างจาก Hub ที่กระจายข้อมูลออกทุกพอร์ต (Broadcast) ตลอดเวลา', isCorrect: true },
      { key: 'C', text: 'เนื่องจาก Switch ปิดพอร์ตเชื่อมต่อปลายทางโดยอัตโนมัติหากมีแพ็กเก็ตวิ่งผ่านเกิน 50 บิต', isCorrect: false },
      { key: 'D', text: 'เนื่องจาก Switch ประมวลผลใน Physical Layer เท่านั้น จึงทำให้ไม่มีการอ่านค่าเฟรมข้อมูล', isCorrect: false }
    ],
    tip: 'Switch ทำงานใน Layer 2 มีความสามารถในการเรียนรู้ตารางจดจำพอร์ตแลนและ MAC Address ส่งผลให้จราจรส่งตรงถึงผู้รับเฉพาะตัว'
  },
  {
    title: 'โจทย์ที่ 3: บทบาทการเลือกเส้นทางข้ามเครือข่ายของ Router',
    desc: 'เราเตอร์ (Router) ทำหน้าที่สำคัญที่สุดในระดับสถาปัตยกรรมเครือข่ายตามชั้นการทำงาน (OSI Layer) ในลักษณะใด?',
    options: [
      { key: 'A', text: 'อ่านสัญญาณบิตทางฟิสิกส์แล้วขยายสัญญาณไฟฟ้าชดเชยค่าความสูญเสีย', isCorrect: false },
      { key: 'B', text: 'วิเคราะห์เส้นทางที่ดีที่สุดตาม Routing Table และนำส่งข้อมูลข้ามวงเครือข่ายย่อยที่แตกต่างกัน (Layer 3 - Network Layer)', isCorrect: true },
      { key: 'C', text: 'สร้างพาร์ติชันเก็บข้อมูล SAM ในตัวเครื่องเพื่อบันทึกไฟล์ผู้ใช้ระบบคอมพิวเตอร์', isCorrect: false },
      { key: 'D', text: 'เข้ารหัสสิทธิการใช้งานระดับ OEM ลงบนแผงบอร์ดหลักด้วยมาตรฐาน UEFI BIOS', isCorrect: false }
    ],
    tip: 'Router เชื่อมโยงเครือข่ายย่อยต่าง Subnet โดยทำงานใน Layer 3 (Network Layer) และอาศัย IP Address'
  },
  {
    title: 'โจทย์ที่ 4: การทำงานของโมเด็ม (Modem)',
    desc: 'กระบวนการแปลงสัญญาณดิจิทัลจากคอมพิวเตอร์ให้กลายเป็นสัญญาณอนาล็อกส่งผ่านสายโทรศัพท์ภายนอกเรียกว่าอะไร?',
    options: [
      { key: 'A', text: 'Demodulation (ดีโมดูเลชัน)', isCorrect: false },
      { key: 'B', text: 'Modulation (มอดูเลชัน)', isCorrect: true },
      { key: 'C', text: 'Attenuation (สัญญาณเสื่อมถอย)', isCorrect: false },
      { key: 'D', text: 'Fragmentation (การจัดระเบียบเศษไฟล์ข้อมูล)', isCorrect: false }
    ],
    tip: 'Modulation (แปลงดิจิทัล -> อนาล็อก) และ Demodulation (แปลงอนาล็อก -> ดิจิทัล) คือที่มาของชื่อ Mo-Dem'
  },
  {
    title: 'โจทย์ที่ 5: หน้าที่และการตั้งค่า Firewall ขอบเขตความปลอดภัย',
    desc: 'อุปกรณ์ไฟร์วอลล์ (Firewall) ระดับฮาร์ดแวร์ใช้เครื่องมือใดในสถาปัตยกรรมระบบเพื่ออนุญาตหรือปิดกั้นการจราจรเครือข่ายตามเกณฑ์ที่ช่างกำหนด?',
    options: [
      { key: 'A', text: 'Rufus Partitioning Scheme Table', isCorrect: false },
      { key: 'B', text: 'Access Control Lists (ACL) ที่ระบุเงื่อนไขการอนุมัติหรือปฏิเสธไอพีแอดเดรสและพอร์ตสั่งงาน', isCorrect: true },
      { key: 'C', text: 'MAC Address Table ที่บันทึกพอร์ตและบัสส่งสัญญาณนาฬิกา', isCorrect: false },
      { key: 'D', text: 'Windows Cumulative Security Hotfix Packages', isCorrect: false }
    ],
    tip: 'ไฟร์วอลล์กรองแพ็กเก็ตโดยอาศัยกฎที่สร้างขึ้นใน Access Control List (ACL) ในการอนุญาต (ALLOW) หรือปฏิเสธ (DENY) สิทธิ์เชื่อมต่อ'
  }
];

export default function ComponentName() {
  return (
    <>
      {/* Layer 1: Ambient Backdrop & Theme Gradients */}
      <AmbientBackdrop blobs={IT4_1_BLOBS} />

      {/* Layer 3: Flexible Subtopics & Fluid Open-Air Layout */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── SUBTOPIC 4.1.1 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-600 tracking-wider uppercase">แผงเชื่อมต่อและรหัสประจำตัวกายภาพ</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การ์ดเครือข่าย (Network Interface Card - NIC) และหมายเลข MAC Address
            </h3>
          </div>
          
          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในการวิศวกรรมสถาปัตยกรรมเครือข่าย <strong>การ์ดเครือข่าย (Network Interface Card)</strong> หรือย่อสั้นๆ ว่า <strong>NIC</strong> 
              คือแผงวงจรอิเล็กทรอนิกส์กายภาพทำหน้าที่แปลงกระแสชุดข้อมูลระดับคอมพิวเตอร์ให้อยู่ในรูปสัญญาณคลื่นเพื่อส่งผ่านสายนำสัญญาณ 
              ชิ้นส่วนนี้ถือเป็นจุดนัดพบบันไดขั้นแรกของการเดินทางข้อมูล โดยฮาร์ดแวร์ NIC แต่ละชิ้นทั่วโลกจะถูกสลักหมายเลขประจำตัวถาวร 
              ที่เรียกว่า <strong>MAC Address (Media Access Control Address)</strong> ขนาด 48 บิตในรูปแบบเลขฐานสิบหก 12 หลัก
            </p>
            <p>
              รหัส MAC Address จะไม่ซ้ำกันเลยแม้แต่ชิ้นเดียวในระบบนิเวศการผลิตโลก โดยโครงสร้าง 48 บิตจะถูกจำแนกสมมาตรแบ่งครึ่งออกเป็น 2 ส่วนหลัก:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 text-left">
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-indigo-500/30 transition-all duration-300 cursor-pointer space-y-2 group">
                <span className="p-2 rounded-xl bg-indigo-50/80 text-indigo-700 font-mono font-bold text-xs inline-block transition-all duration-300 group-hover:scale-110 shadow-inner">24 บิตแรก (OUI)</span>
                <h6 className="font-bold text-indigo-950 text-[15.5px] transition-colors group-hover:text-indigo-600">Organizationally Unique Identifier</h6>
                <p className="text-[14px] text-zinc-500 leading-relaxed font-sans">
                  รหัสเฉพาะประจำบริษัทค่ายผู้ผลิตอุปกรณ์อิเล็กทรอนิกส์ ได้รับการจดทะเบียนรับรองหลักสูตรโดยองค์กรสากล IEEE เช่น รหัส <code className="bg-indigo-50/80 border border-indigo-200/50 px-1 py-0.5 rounded text-xs text-indigo-700 font-mono">00-60-2F</code> ชี้เฉพาะแบรนด์ Cisco Systems
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-cyan-500/30 transition-all duration-300 cursor-pointer space-y-2 group">
                <span className="p-2 rounded-xl bg-cyan-50/80 text-cyan-800 font-mono font-bold text-xs inline-block transition-all duration-300 group-hover:scale-110 shadow-inner">24 บิตหลัง (NIC Specific)</span>
                <h6 className="font-bold text-cyan-950 text-[15.5px] transition-colors group-hover:text-cyan-600">Device / Serial Number</h6>
                <p className="text-[14px] text-zinc-500 leading-relaxed font-sans">
                  หมายเลขลำดับเฉพาะตัวประแผงชิปการ์ดเครือข่าย ถูกสร้างและบันทึกข้อมูล (Hard-coded) มาจากโรงงานการผลิต ไม่เปลี่ยนรูปข้าม OS เพื่อระบุความมีอยู่ของพอร์ตทางกายภาพ
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Simulator 1: MAC Frame Builder */}
          <MacFrameBuilder />
        </section>

        {/* ─── SUBTOPIC 4.1.2 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-600 tracking-wider uppercase">การแพร่กระจายระดับฟิสิกส์</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              หลักการทำงานของฮับ (Hub) และรีพีตเตอร์ (Repeater)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในประวัติศาสตร์ของเครือข่าย LAN อุปกรณ์ <strong>ฮับ (Hub)</strong> และ <strong>รีพีตเตอร์ (Repeater)</strong> 
              ทำงานประมวลผลกระแสไฟฟ้าในระดับต่ำสุดของแบบจำลองอ้างอิง นั่นคือชั้นกายภาพ <strong>(Layer 1 - Physical Layer)</strong> 
              โดยไม่มีโครงสร้างสมองอ่านข้อมูลระดับที่อยู่ MAC Address หรือ IP Address เลย
            </p>
            <p>
              กลไกการทำงานของอุปกรณ์ทั้งสองชิ้นนี้มีขีดจำกัดที่สำคัญอย่างชัดเจน:
            </p>
            <ul className="space-y-3.5 my-4 text-left">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-cyan-100 text-cyan-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>Hub Broadcast & Collision:</strong> เมื่อข้อมูลถูกส่งมายังพอร์ตหนึ่งในฮับ ฮับจะทำหน้าที่เสมือนสายเชื่อมโยงไฟฟ้ากระจายข้อมูลส่งต่ออกไปยังทุกพอร์ตที่เชื่อมต่ออยู่ (Broadcast) ทำให้คอมพิวเตอร์ทุกเครื่องต้องรับข้อมูลไปคัดกรองเอง ส่งผลให้เกิดความแออัดของการจราจรสายสัญญาณ และหากมีคอมพิวเตอร์ 2 เครื่องกดยิงบิตข้อมูลในเวลาเดียวกัน สัญญาณคลื่นไฟฟ้าจะเกิดการกระแทกชำรุดล้มเหลวที่เรียกว่า <strong>การชนกันของข้อมูล (Collision)</strong> โดยฮับจะเปิดใช้โปรโตคอลตรวจตรา CSMA/CD สั่งรัน Jam Signal และระงับการพิมพ์ชั่วคราว
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-cyan-100 text-cyan-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>Repeater Signal Boost:</strong> ในกรณีสายสัญญาณทางกายภาพ (เช่น สาย UTP) ลากทางไกลเกินกว่า 100 เมตร จะเกิดปรากฏการณ์ความแรงไฟฟ้าเสื่อมถอย (Attenuation) อุปกรณ์ <strong>รีพีตเตอร์ (Repeater)</strong> จึงเข้ามามีบทบาทในการดักคลื่นความถี่นั้น และเหนี่ยวนำแรงดันไฟฟ้าขยายเพิ่มพลังสัญญาณชดเชยการสูญเสียให้กลับมาบริสุทธิ์เพื่อวิ่งงานต่อยาวข้ามเครือข่าย
                </div>
              </li>
            </ul>
          </div>

          {/* Interactive Simulator 2: Hub Broadcast & CSMA/CD Lab */}
          <HubCollisionSimulator />
        </section>

        {/* ─── SUBTOPIC 4.1.3 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-600 tracking-wider uppercase">การสื่อสารส่วนบุคคลในเครือข่าย</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              หลักการทำงานของสวิตช์ (Switch) และตารางจดจำพอร์ต MAC Address Table
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              อุปกรณ์หลักที่เป็นศูนย์กลางการเชื่อมสายสัญญาณ LAN ในปัจจุบันคือ <strong>สวิตช์ (Switch)</strong> 
              ซึ่งทำงานยกระดับสมองขึ้นมาที่ชั้นการเชื่อมโยงข้อมูล <strong>(Layer 2 - Data Link Layer)</strong> 
              สวิตช์สามารถอ่านและถอดรหัสข้อมูลแพ็กเก็ต (Ethernet Frame) เพื่อค้นหาหมายเลข MAC Address ได้อย่างชาญฉลาด 
              ส่งผลให้การรับส่งข้อมูลมีลักษณะปลอดภัย ไหลลื่น และไม่มีปัญหาการจราจรติดขัดชนกันเลยเนื่องจากสวิตช์สร้าง Collision Domain แยกขาดในทุกพอร์ตเชื่อม
            </p>
            <p>
              ความลับในการประมวลเส้นทางการวิ่งของสวิตช์อยู่ที่ตรรกะ **การเรียนรู้ตารางหมายเลข (MAC Address Table Learning)**:
            </p>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-cyan-500/80 mt-4 space-y-3">
              <h5 className="font-bold text-slate-800 flex items-center gap-2">
                <Info className="w-5 h-5 text-cyan-500 animate-pulse" /> กระบวนการเรียนรู้และบันทึกข้อมูลของสวิตช์
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[14px] text-left">
                <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-cyan-100 shadow-sm leading-normal hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <span className="font-bold text-cyan-700 block mb-1 text-[14.5px]">1. ภาวะเริ่มต้นและเรียนรู้ผู้ส่ง</span>
                  เมื่อเปิดการทำงานตารางสวิตช์ยังเป็นค่าว่าง เมื่อ PC A สั่งส่ง ข้อมูลสวิตช์จะจับจดบันทึกพอร์ตทางกายภาพเข้าคู่กับ MAC Address ต้นทางลงตารางทันที
                </div>
                <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-sm leading-normal hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <span className="font-bold text-slate-700 block mb-1 text-[14.5px]">2. การสาดกระจายข้อมูล (Flooding)</span>
                  หากไม่พบข้อมูล MAC ปลายทางในตารางจดจำ สวิตช์จะทำการกระจายข้อมูลออกไปทุกช่องพอร์ต (ยกเว้นพอร์ตต้นทาง) เพื่อเสาะหาตำแหน่ง
                </div>
                <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-indigo-100 shadow-sm leading-normal hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <span className="font-bold text-indigo-700 block mb-1 text-[14.5px]">3. บันทึกส่งตรงรายตัว (Unicast)</span>
                  เมื่อปลายทางตอบรับและสลักชื่อบันทึกลงตารางแลนสำเร็จ สวิตช์จะปิดระบบ Flood และใช้การส่งข้อมูลตรงตัวหาผู้รับรายพอร์ต 100%
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Simulator 3: Switch MAC Address Table Learning Lab */}
          <SwitchLearningSimulator />
        </section>

        {/* ─── SUBTOPIC 4.1.4 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-600 tracking-wider uppercase">สะพานเชื่อมข้ามพรมแดนเครือข่าย</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              เราเตอร์ (Router) ตารางเส้นทาง และกลไก NAT Gateway
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ขณะที่ Switch รับส่งข้อมูลอยู่เฉพาะภายในเครือข่ายเดียวกัน (Intranet/LAN) อุปกรณ์ที่ก้าวเข้ามาเป็น 
              <strong>"นายประตูสะพานเชื่อม"</strong> นำส่งข้อมูลข้ามวงเครือข่ายไปยังโลกอินเทอร์เน็ตภายนอกคือ 
              <strong>เราเตอร์ (Router)</strong> ซึ่งทำงานวิเคราะห์ชุดบิตในระดับชั้นเครือข่าย 
              <strong>(Layer 3 - Network Layer)</strong> โดยอาศัยหมายเลขที่อยู่โลจิคัลอย่าง <strong>IP Address</strong> 
              มาเป็นกุญแจสำคัญในการนำพาข้อมูลผ่านเส้นทางที่เหมาะสมที่สุด (Best Route) จากตาราง <strong>Routing Table</strong>
            </p>
            <p>
              นอกจากการนำส่งเส้นทางข้ามพอร์ตแล้ว เราเตอร์ยังเป็นหัวใจหลักในสถาปัตยกรรม IP ยุคปัจจุบันด้วยระบบ 
              <strong>NAT (Network Address Translation)</strong> ซึ่งช่วยแก้ปัญหาระบบ IP Address ทั่วโลกขาดแคลน 
              โดยเราเตอร์จะคัดกรองแปลงหมายเลข IP ท้องถิ่นส่วนบุคคลในบ้านหรือออฟฟิศ (Private IP) 
              ให้เปลี่ยนรูปโครงสร้างออกมาเป็น IP สาธารณะเดียว (Public IP) เมื่อกระโจนเชื่อมต่อออกสู่โลกกว้าง
            </p>
          </div>

          {/* Interactive Simulator 4: Router Routing Table & NAT Gateway */}
          <RouterRoutingSimulator />
        </section>

        {/* ─── SUBTOPIC 4.1.5, 4.1.6, 4.1.7 ───────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-600 tracking-wider uppercase">การสื่อสารไร้สาย ความปลอดภัย และการแปลงคลื่น</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              อุปกรณ์กระจายสัญญาณไร้สาย (WAP) ไฟร์วอลล์ (Firewall) และโมเด็ม (Modem)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในการประกอบอาชีพของช่างไอทีระบบเครือข่าย การวางผังบริการโครงข่ายสำนักงานอัจฉริยะจำเป็นต้องประสานงานอุปกรณ์พิเศษอีก 3 รายการสำคัญ:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 text-left">
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-indigo-500/30 transition-all duration-300 cursor-pointer space-y-2 group">
                <span className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 inline-block transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner"><Radio className="w-5 h-5 group-hover:animate-pulse" /></span>
                <h6 className="font-bold text-indigo-950 text-[15.5px] transition-colors group-hover:text-indigo-600">Wireless Access Point (WAP)</h6>
                <p className="text-[14px] text-zinc-500 leading-relaxed font-sans">
                  ทำหน้าที่เป็นสะพานแปลงข้อมูลสัญญาณแบบไร้สาย โดยดักรวบรวมแพ็กเก็ตบิตจากสาย LAN (มาตรฐาน 802.3) แผ่กระจายตัวออกอากาศด้วยคลื่นวิทยุความถี่สูงสู่เสาอากาศ (มาตรฐาน 802.11 Wi-Fi)
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-cyan-500/30 transition-all duration-300 cursor-pointer space-y-2 group">
                <span className="p-3 rounded-2xl bg-cyan-50 text-cyan-600 inline-block transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner"><LockKeyhole className="w-5 h-5 group-hover:animate-pulse" /></span>
                <h6 className="font-bold text-cyan-950 text-[15.5px] transition-colors group-hover:text-cyan-600">Hardware Firewall (ไฟร์วอลล์)</h6>
                <p className="text-[14px] text-zinc-500 leading-relaxed font-sans">
                  ด่านรักษาความมั่นคงปลอดภัยทำหน้าที่คอยตรวจสอบพิกัด IP และพอร์ตของแพ็กเก็ตทุกตัวที่วิ่งพ้นสะพานข้าม โดยมีกลไก <strong>Access Control Lists (ACL)</strong> คอยกรองสกัดมัลแวร์และแฮกเกอร์
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-slate-500/30 transition-all duration-300 cursor-pointer space-y-2 group">
                <span className="p-3 rounded-2xl bg-slate-100 text-slate-600 inline-block transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner"><Activity className="w-5 h-5 group-hover:animate-pulse" /></span>
                <h6 className="font-bold text-slate-950 text-[15.5px] transition-colors group-hover:text-slate-600">โมเด็ม (Modem)</h6>
                <p className="text-[14px] text-zinc-500 leading-relaxed font-sans">
                  อุปกรณ์แปลงสัญญาณ (Modulator / Demodulator) แปลงกระแสสัญญาณไฟฟ้าแบบดิจิทัล (0 และ 1) ของเครือข่าย LAN ให้กลายเป็นสัญญาณเสียง/อนาล็อกวิ่งผ่านโครงสร้างสายค่ายบริการภายนอกอินเทอร์เน็ต
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Simulator 5: WAP Signal, Firewall Filter, and Modulation graph */}
          <TripleNetworkLab />
        </section>

        {/* ─── QUIZ ENGINE SECTION ────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-600 tracking-wider uppercase">การประเมินผล</span>
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
            title="ภารกิจออกแบบและวินิจฉัยโครงสร้างอุปกรณ์ทางกายภาพสำหรับเครือข่ายออฟฟิศขนาดกลาง"
            taskText={`ให้นักเรียนสวมบทบาทเป็นวิศวกรเน็ตเวิร์กระดับปฏิบัติการ และจัดทำเอกสาร "แผนผังการจัดวางอุปกรณ์และวิเคราะห์ขอบเขตทางกายภาพ" (Physical Network Integration Plan)
1. วิเคราะห์และถอดรหัสเลข MAC Address ที่ระบุต้นทางของพอร์ตแผงวงจร LAN: 00-1A-11-AC-DE-48 อธิบายความสอดคล้องของส่วนบิตประจำโรงงาน (OUI) ค่ายผู้ผลิต และบิตเฉพาะตัวเครื่องคอมพิวเตอร์
2. วางโครงร่างจัดวาง Switch และ Hub ในเครือข่าย พร้อมเขียนอธิบายเปรียบเทียบในแง่มุมของประสิทธิภาพการแชร์ช่องสัญญาณ (Collision Domain) และการส่งต่อข้อมูลแบบเจาะจงรายพอร์ตเมื่อผู้จัดการเรียกดูฐานข้อมูลบริษัท
3. วางข้อเสนอแนะในการตั้งค่า Access Control List (ACL) ใน Firewall ของออฟฟิศเพื่อป้องกันพนักงานดาวน์โหลดข้อมูลภายนอกจากไอพีแอดเดรสที่ระบุพิกัดอันตรายข้ามเครือข่าย`}
          />
        </div>

      </main>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   1. MAC FRAME BUILDER & OUI DECODER SIMULATOR (Subtopic 4.1.1)
   ═══════════════════════════════════════════════════════════════════ */
const VENDOR_PRESETS = [
  { company: 'Cisco Systems, Inc.', prefix: '00-60-2F', desc: 'ผู้นำฮาร์ดแวร์สวิตช์องค์กรรุ่นใหญ่' },
  { company: 'Intel Corporation', prefix: '00-1A-11', desc: 'ชิปการ์ดแลนไร้สายและเมนบอร์ดพีซี' },
  { company: 'Apple Inc.', prefix: '00-25-00', desc: 'ชิปเครือข่ายตระกูล Mac & iPhone' },
  { company: 'Realtek Semiconductor', prefix: '00-E0-4C', desc: 'ชิปการ์ดเสียงและแลนบนบอร์ดหลักที่คุ้นเคย' },
  { company: 'Google LLC', prefix: '3C-5E-C3', desc: 'เซิร์ฟเวอร์ยักษ์ใหญ่และฮาร์ดแวร์เน็ตเวิร์กคลาวด์' }
];

function MacFrameBuilder() {
  const [macInput, setMacInput] = useState('00-60-2F-3A-07-E4');
  const [payloadText, setPayloadText] = useState('Hello ครูแม็ค! ส่งข้อมูลแพ็กเก็ต Layer 2');
  const [copied, setCopied] = useState(false);

  // Normalize input format
  const cleanMac = macInput.replace(/[^A-Fa-f0-9]/g, '').toUpperCase();
  const formatMacDisplay = (cleanVal) => {
    const parts = [];
    for (let i = 0; i < cleanVal.length && i < 12; i += 2) {
      parts.push(cleanVal.slice(i, i + 2));
    }
    return parts.join('-');
  };

  const currentFormatted = formatMacDisplay(cleanMac);
  const isValid = cleanMac.length === 12;
  const ouiPart = cleanMac.slice(0, 6);
  const nicPart = cleanMac.slice(6, 12);

  // Find vendor matching
  const matchedVendor = VENDOR_PRESETS.find(p => p.prefix.replace(/-/g, '') === ouiPart);
  const vendorName = matchedVendor ? matchedVendor.company : 'Unknown Manufacturer (ค่ายผู้ผลิตทั่วไป)';

  const handleApplyPreset = (preset) => {
    // Generate random 6 characters for NIC Specific
    let randomHex = '';
    const hexChars = '0123456789ABCDEF';
    for (let i = 0; i < 6; i++) {
      randomHex += hexChars[Math.floor(Math.random() * 16)];
    }
    const newMac = `${preset.prefix}-${randomHex.slice(0, 2)}-${randomHex.slice(2, 4)}-${randomHex.slice(4, 6)}`;
    setMacInput(newMac);
  };

  // FCS Checksum Mock
  const mockFcs = isValid ? `0x${((cleanMac.charCodeAt(4) + payloadText.length) * 7919).toString(16).toUpperCase().slice(-8)}` : '0x00000000';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFormatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SimulatorShell
      icon={<Cpu className="w-6 h-6 text-cyan-500" />}
      title="เครื่องจำลองโครงสร้างและถอดรหัส MAC Address & Ethernet Frame"
      accentBg="bg-cyan-50"
      iconColor="text-cyan-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left font-sans">
        
        {/* Left Interactive Configurator Panel */}
        <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[420px] text-xs text-slate-200">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold font-sans">MAC ENGINE VISUALIZER</span>
          
          <div className="space-y-4">
            <div>
              <h6 className="text-[13px] font-bold text-white flex items-center gap-1.5"><Sliders className="w-4 h-4 text-cyan-400" /> MAC Address & Frame Inputs</h6>
              <p className="text-[10px] text-slate-400 leading-normal">
                ป้อนรหัส MAC Address ขนาด 48 บิต หรือเลือกใช้แม่แบบพรีเซ็ตยักษ์ใหญ่ระดับโลกด้านการผลิตชิป
              </p>
            </div>

            {/* Input field */}
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 font-bold block">1. ป้อนรหัส MAC Address (Hex format 0-9, A-F):</label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={17}
                  value={macInput}
                  onChange={(e) => setMacInput(e.target.value)}
                  className={`w-full pl-3 pr-20 py-2.5 bg-slate-950 border rounded-lg text-xs font-mono font-bold tracking-widest text-sky-400 focus:outline-none ${
                    isValid ? 'border-slate-800 focus:border-cyan-500' : 'border-rose-500/50 focus:border-rose-500'
                  }`}
                />
                <button
                  onClick={handleCopy}
                  className="absolute right-2 top-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold rounded cursor-pointer text-slate-300 active:scale-95"
                >
                  {copied ? 'คัดลอกแล้ว!' : 'คัดลอก'}
                </button>
              </div>
              {!isValid && (
                <p className="text-[9.5px] text-rose-400 leading-none">⚠️ หมายเลข MAC ไม่ครบถ้วน (ต้องการรหัสเลขฐานสิบหก 12 หลัก)</p>
              )}
            </div>

            {/* Preset select chips */}
            <div className="space-y-1.5 pt-1.5">
              <span className="text-[10px] text-slate-400 font-bold block">2. เลือกพรีเซ็ตค่ายการผลิต (OUI Presets):</span>
              <div className="flex flex-wrap gap-2">
                {VENDOR_PRESETS.map((preset) => (
                  <button
                    key={preset.prefix}
                    onClick={() => handleApplyPreset(preset)}
                    className="py-1 px-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 rounded-lg text-[10.5px] cursor-pointer font-bold active:scale-95 transition-all text-left"
                  >
                    {preset.company.split(' ')[0]} ({preset.prefix})
                  </button>
                ))}
              </div>
            </div>

            {/* Payload input */}
            <div className="space-y-2 pt-2">
              <label className="text-[10px] text-slate-400 font-bold block">3. ระบุเนื้อหาคำสั่ง Payload (ส่งในเครือข่าย LAN):</label>
              <input
                type="text"
                value={payloadText}
                onChange={(e) => setPayloadText(e.target.value)}
                maxLength={40}
                className="w-full pl-3 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>
          </div>

          {/* Decoded manufacturer banner */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl mt-4 flex items-start gap-2.5 leading-normal">
            <span className="p-1 rounded bg-indigo-950/80 border border-indigo-900/50 text-indigo-400 shrink-0"><ShieldCheck className="w-4 h-4" /></span>
            <div className="text-[10.5px]">
              <span className="font-bold text-slate-200 block">ค่ายผู้ผลิตที่สืบค้นพิจารณา (OUI Match):</span>
              <span className="text-cyan-400 font-bold block mt-0.5">{vendorName}</span>
              {matchedVendor && (
                <span className="text-[9.5px] text-slate-500 block leading-tight mt-0.5">{matchedVendor.desc}</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Frame Structural Layout Display */}
        <div className="flex flex-col justify-between space-y-6">
          <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">โครงสร้างเฟรม Ethernet II (Layer 2 Packet Structure)</span>
          
          <div className="text-slate-600 text-sm leading-relaxed space-y-4">
            <p>
              ในระดับ Data Link Layer ข้อมูลจะถูกบรรจุลงในโครงสร้างที่ชื่อว่า <strong>Ethernet Frame</strong> 
              โดยมีการนำรหัส MAC Address วางไว้ส่วนหัว (Header) เพื่อนำทางสายสัญญาณ
            </p>

            {/* Visual Frame Structuring grid */}
            <div className="space-y-2 font-mono text-[11px] text-left">
              {/* Destination MAC */}
              <div className="bg-[#1e293b] rounded-xl border border-slate-700/60 p-2.5 hover:border-cyan-500/40 transition-all">
                <div className="flex justify-between items-center text-slate-400 text-[9.5px] mb-1 font-bold">
                  <span>DESTINATION MAC ADDRESS (ผู้รับปลายทาง)</span>
                  <span>6 Bytes (48 bits)</span>
                </div>
                <div className="font-bold text-emerald-400 text-xs tracking-wider">
                  FF-FF-FF-FF-FF-FF <span className="font-sans text-[9px] font-normal text-slate-400 ml-2">(จำลองการส่งข้ามพอร์ต Broadcast)</span>
                </div>
              </div>

              {/* Source MAC */}
              <div className="bg-[#1e293b] rounded-xl border border-slate-700/60 p-2.5 hover:border-cyan-500/40 transition-all">
                <div className="flex justify-between items-center text-slate-400 text-[9.5px] mb-1 font-bold">
                  <span>SOURCE MAC ADDRESS (ต้นทางผู้ส่ง)</span>
                  <span>6 Bytes (48 bits)</span>
                </div>
                <div className="text-xs tracking-wider flex flex-wrap gap-x-2">
                  <span className="font-bold text-indigo-400 font-mono">{isValid ? currentFormatted.slice(0, 8) : '00-60-2F'}</span>
                  <span className="text-slate-500 font-bold select-none">-</span>
                  <span className="font-bold text-amber-400 font-mono">{isValid ? currentFormatted.slice(9) : '3A-07-E4'}</span>
                </div>
                <div className="flex gap-4 text-[8px] font-sans text-slate-400 mt-1 font-bold">
                  <span className="text-indigo-400 flex items-center gap-0.5">• 3 Bytes OUI</span>
                  <span className="text-amber-400 flex items-center gap-0.5">• 3 Bytes NIC Specific</span>
                </div>
              </div>

              {/* EtherType */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#1e293b] rounded-xl border border-slate-700/60 p-2.5 text-left">
                  <span className="text-slate-400 text-[9.5px] font-bold block mb-1">ETHERTYPE (ประเภทโปรโตคอล)</span>
                  <span className="font-bold text-sky-400 text-xs">0x0800 (IPv4)</span>
                  <span className="font-sans text-[8.5px] text-slate-500 block leading-tight mt-0.5">2 Bytes</span>
                </div>
                <div className="bg-[#1e293b] rounded-xl border border-slate-700/60 p-2.5 text-left">
                  <span className="text-slate-400 text-[9.5px] font-bold block mb-1">FCS / CRC32 CHECKSUM</span>
                  <span className="font-bold text-pink-400 text-xs">{mockFcs}</span>
                  <span className="font-sans text-[8.5px] text-slate-500 block leading-tight mt-0.5">4 Bytes (ตรวจสอบความสมบูรณ์บิต)</span>
                </div>
              </div>

              {/* Payload Field */}
              <div className="bg-[#1e293b]/70 rounded-xl border border-slate-800 p-3 text-left">
                <div className="flex justify-between items-center text-slate-400 text-[9.5px] mb-1 font-bold">
                  <span>PAYLOAD DATA (ขนาดบิตเนื้อหาภายใน)</span>
                  <span>{payloadText.length} Bytes</span>
                </div>
                <div className="font-bold text-white text-xs py-0.5 font-sans leading-normal">
                  "{payloadText}"
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-sans text-xs space-y-1.5">
            <h6 className="font-bold text-slate-800 flex items-center gap-1.5"><Info className="w-4 h-4 text-cyan-500" /> คำแนะนำช่างเทคนิค:</h6>
            <p className="text-[12px] leading-relaxed">
              ในทางปฏิบัติ ช่างไอทีจะใช้โปรแกรมค้นหาใน Windows Command Prompt โดยพิมพ์คำสั่ง <span className="font-mono text-xs font-bold bg-slate-200 text-slate-800 px-1 py-0.5 rounded">getmac /v</span> หรือ <span className="font-mono text-xs font-bold bg-slate-200 text-slate-800 px-1 py-0.5 rounded">ipconfig /all</span> เพื่อตรวจสอบหมายเลข MAC Address ของการ์ดแลนในเครื่อง ซึ่งจะเรียกว่า **Physical Address**
            </p>
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. HUB BROADCAST & CSMA/CD SIMULATOR (Subtopic 4.1.2)
   ═══════════════════════════════════════════════════════════════════ */
function HubCollisionSimulator() {
  const [activeNode, setActiveNode] = useState('none');
  const [transState, setTransState] = useState('idle'); // idle | broadcasting | collision | jamming | backoff | success
  const [logs, setLogs] = useState(['[READY] ระบบบัสของ Hub สแตนด์บาย รอการส่งสัญญาณ...']);
  const [backoffTime, setBackoffTime] = useState(0);
  const flowTimer = useRef(null);

  // PC coordinate positions mapping (Absolute Center is x = 160, y = 160)
  const nodeCoords = {
    A: { x: 60, y: 60, label: 'PC A (MAC: 00-1A...)' },
    B: { x: 260, y: 60, label: 'PC B (MAC: 00-60...)' },
    C: { x: 60, y: 260, label: 'PC C (MAC: 00-E0...)' },
    D: { x: 260, y: 260, label: 'PC D (MAC: 00-25...)' }
  };

  const triggerNormalSend = () => {
    if (transState !== 'idle' && transState !== 'backoff') return;
    setActiveNode('A');
    setTransState('broadcasting');
    setLogs([
      '[PC A] เริ่มปล่อยกระแสไฟฟ้าส่งสัญญาณ LAN...',
      '[HUB] สัญญาณเดินทางมาถึงพอร์ตที่ 1 ของฮับตรงกลาง...',
      '[HUB BROADCAST] ฮับประมวลผล Layer 1 ทำการคัดลอกสัญญาณและกระจาย (Flood) ไปยังทุกพอร์ตที่ต่ออยู่ทันที!'
    ]);

    let step = 0;
    if (flowTimer.current) clearInterval(flowTimer.current);

    flowTimer.current = setInterval(() => {
      step += 1;
      if (step === 1) {
        setLogs(current => [
          ...current,
          '[HUB BROADCAST] >> ส่งสัญญาณไปหา PC B, PC C และ PC D ในลักษณะคู่ขนาน...',
          '[PC B] ตรวจพบ Destination IP ตรงกับตัวเอง จึงรับแพ็กเก็ตเสร็จสมบูรณ์ ✅',
          '[PC C] ตรวจพบ Destination IP ไม่ตรงกับตนเอง จึงล้างทิ้งข้อมูลใน RAM',
          '[PC D] ตรวจพบ Destination IP ไม่ตรงกับตนเอง จึงล้างทิ้งข้อมูลใน RAM'
        ]);
        setTransState('success');
        clearInterval(flowTimer.current);
      }
    }, 2000);
  };

  const triggerCollision = () => {
    if (transState !== 'idle' && transState !== 'backoff') return;
    setActiveNode('AC');
    setTransState('broadcasting');
    setLogs([
      '[MUTUAL TRANSMIT] PC A และ PC C เริ่มส่งบิตข้อมูลออกมาพร้อมกันในสล็อตเวลาเดียวกัน...',
      '[DATA LINE] สัญญาณกระแสไฟฟ้ากำลังไหลเวียนเข้าสู่บัสเดียวกัน...'
    ]);

    if (flowTimer.current) clearInterval(flowTimer.current);
    let step = 0;

    flowTimer.current = setInterval(() => {
      step += 1;
      if (step === 1) {
        setTransState('collision');
        setLogs(current => [
          ...current,
          '💥 [COLLISION] สัญญาณปะทะชนกันรุนแรงที่แผงบัสของ Hub ตรงกลาง!',
          '💥 [COLLISION] แรงดันไฟฟ้าสะสมสูงเกินกว่าพอร์ตระดับฟิสิกส์จะรองรับ ข้อมูลชำรุดเสียหายทันที'
        ]);
      }
      else if (step === 2) {
        setTransState('jamming');
        setLogs(current => [
          ...current,
          '🚨 [CSMA/CD PROTOCOL] ฮับตรวจจับการชนกันสำเร็จ ส่งสัญญาณ Jam Signal ไปยังทุกพอร์ตทันที!',
          '🚨 [ALERT] คอมพิวเตอร์ทุกเครื่องรับคำสั่ง Jam และทำความสะอาดบัส หยุดการส่งสัญญาณทั้งหมดทันที'
        ]);
      }
      else if (step === 3) {
        setTransState('backoff');
        setBackoffTime(5);
        setLogs(current => [
          ...current,
          '⏱️ [RANDOM BACKOFF] เข้าสู่โหมดรันเวลาถอยหลัง (สุ่มถอยเวลาระดับมิลลิวินาที) เพื่อป้องกันการส่งชนซ้ำซ้อน...'
        ]);
        clearInterval(flowTimer.current);
      }
    }, 1500);
  };

  const handleReset = () => {
    if (flowTimer.current) clearInterval(flowTimer.current);
    setActiveNode('none');
    setTransState('idle');
    setBackoffTime(0);
    setLogs(['[READY] ระบบบัสของ Hub สแตนด์บาย รอการส่งสัญญาณ...']);
  };

  useEffect(() => {
    let countdown;
    if (transState === 'backoff' && backoffTime > 0) {
      countdown = setTimeout(() => {
        setBackoffTime(prev => {
          if (prev <= 1) {
            setTransState('idle');
            setLogs(current => [...current, '[READY] บัสว่างแล้ว! ยินดีต้อนรับสู่สิทธิ์การส่งครั้งถัดไป']);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearTimeout(countdown);
  }, [transState, backoffTime]);

  useEffect(() => {
    return () => {
      if (flowTimer.current) clearInterval(flowTimer.current);
    };
  }, []);

  return (
    <SimulatorShell
      icon={<Terminal className="w-6 h-6 text-cyan-500" />}
      title="เครื่องจำลองระบบบัส Hub Broadcast & สัญญาณชนกัน (CSMA/CD)"
      accentBg="bg-cyan-50"
      iconColor="text-cyan-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left">
        
        {/* Left Column: Symmetrical circular SVG design */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between items-center relative min-h-[420px]">
          <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">PHYSICAL LAYER COLLISION DIAGRAM</span>
          
          <svg viewBox="0 0 320 320" className="w-72 h-72 z-10 my-auto">
            {/* Absolute Center is x = 160, y = 160 */}
            
            {/* Hub Central Device */}
            <rect x="120" y="130" width="80" height="60" rx="10" fill="#1E293B" stroke={
              transState === 'collision' ? '#F43F5E' :
              transState === 'jamming' ? '#F59E0B' :
              transState === 'success' ? '#10B981' : '#475569'
            } strokeWidth="2.5" />
            <text x="160" y="158" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">HUB (L1)</text>
            <text x="160" y="174" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Physical Broadcaster</text>

            {/* Wires - Symmetrically routed from center (160, 160) to each PC node center */}
            {/* Port A Wire: 160,160 to 60,60 */}
            <line x1="160" y1="160" x2="60" y2="60" stroke={
              transState === 'jamming' ? '#F59E0B' :
              (activeNode === 'A' || activeNode === 'AC') && transState !== 'idle' ? '#06B6D4' : '#334155'
            } strokeWidth="3" />
            
            {/* Port B Wire: 160,160 to 260,60 */}
            <line x1="160" y1="160" x2="260" y2="60" stroke={
              transState === 'jamming' ? '#F59E0B' :
              activeNode === 'A' && transState === 'success' ? '#10B981' : '#334155'
            } strokeWidth="3" />

            {/* Port C Wire: 160,160 to 60,260 */}
            <line x1="160" y1="160" x2="60" y2="260" stroke={
              transState === 'jamming' ? '#F59E0B' :
              activeNode === 'AC' && transState !== 'idle' ? '#06B6D4' : '#334155'
            } strokeWidth="3" />

            {/* Port D Wire: 160,160 to 260,260 */}
            <line x1="160" y1="160" x2="260" y2="260" stroke={
              transState === 'jamming' ? '#F59E0B' :
              activeNode === 'A' && transState === 'success' ? '#10B981' : '#334155'
            } strokeWidth="3" />

            {/* Glowing signal balls flowing on paths */}
            {activeNode === 'A' && transState === 'broadcasting' && (
              <circle cx="110" cy="110" r="5" fill="#22D3EE" className="animate-[pulse_1s_infinite]">
                <animate attributeName="cx" from="60" to="160" dur="1s" repeatCount="indefinite" />
                <animate attributeName="cy" from="60" to="160" dur="1s" repeatCount="indefinite" />
              </circle>
            )}

            {activeNode === 'A' && transState === 'success' && (
              <>
                {/* Broadcast wave circles */}
                <circle cx="210" cy="110" r="5" fill="#10B981">
                  <animate attributeName="cx" from="160" to="260" dur="1s" repeatCount="indefinite" />
                  <animate attributeName="cy" from="160" to="60" dur="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="110" cy="210" r="5" fill="#10B981">
                  <animate attributeName="cx" from="160" to="60" dur="1s" repeatCount="indefinite" />
                  <animate attributeName="cy" from="160" to="260" dur="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="210" cy="210" r="5" fill="#10B981">
                  <animate attributeName="cx" from="160" to="260" dur="1s" repeatCount="indefinite" />
                  <animate attributeName="cy" from="160" to="260" dur="1s" repeatCount="indefinite" />
                </circle>
              </>
            )}

            {activeNode === 'AC' && transState === 'broadcasting' && (
              <>
                <circle cx="110" cy="110" r="5" fill="#06B6D4">
                  <animate attributeName="cx" from="60" to="160" dur="0.8s" repeatCount="indefinite" />
                  <animate attributeName="cy" from="60" to="160" dur="0.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="110" cy="210" r="5" fill="#06B6D4">
                  <animate attributeName="cx" from="60" to="160" dur="0.8s" repeatCount="indefinite" />
                  <animate attributeName="cy" from="260" to="160" dur="0.8s" repeatCount="indefinite" />
                </circle>
              </>
            )}

            {/* Collision Shockwave at (160, 160) */}
            {transState === 'collision' && (
              <circle cx="160" cy="160" r="25" fill="none" stroke="#EF4444" strokeWidth="3" className="animate-[ping_0.8s_infinite]" />
            )}

            {/* PCs Symmetrical Layout */}
            {/* PC A */}
            <rect x="30" y="30" width="60" height="40" rx="6" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
            <text x="60" y="54" textAnchor="middle" fill="#E2E8F0" fontSize="9" fontWeight="bold" fontFamily="sans-serif">PC A</text>
            
            {/* PC B */}
            <rect x="230" y="30" width="60" height="40" rx="6" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
            <text x="260" y="54" textAnchor="middle" fill="#E2E8F0" fontSize="9" fontWeight="bold" fontFamily="sans-serif">PC B</text>

            {/* PC C */}
            <rect x="30" y="240" width="60" height="40" rx="6" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
            <text x="60" y="264" textAnchor="middle" fill="#E2E8F0" fontSize="9" fontWeight="bold" fontFamily="sans-serif">PC C</text>

            {/* PC D */}
            <rect x="230" y="240" width="60" height="40" rx="6" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
            <text x="260" y="264" textAnchor="middle" fill="#E2E8F0" fontSize="9" fontWeight="bold" fontFamily="sans-serif">PC D</text>
          </svg>

          {/* Symmetrical countdown backoff container */}
          {transState === 'backoff' && (
            <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center rounded-2xl z-20 space-y-2 p-6 text-center border border-slate-800">
              <RefreshCw className="w-10 h-10 text-amber-500 animate-spin" />
              <p className="font-bold text-white text-[14px]">CSMA/CD Backoff Active</p>
              <p className="text-[11px] text-slate-400">ระบบตรวจพบข้อมูลชนกัน กำลังสุ่มระงับเวลาพิมพ์: <span className="font-mono text-amber-400 font-bold text-xs">{backoffTime}s</span></p>
            </div>
          )}

          {/* Reset & Status bar */}
          <div className="w-full flex gap-3 text-slate-500 text-[10px] font-mono justify-between items-center border-t border-slate-900 pt-3">
            <span>STATE: <span className={`font-bold ${transState === 'success' ? 'text-emerald-400' : transState === 'collision' || transState === 'jamming' ? 'text-rose-400' : 'text-slate-400'}`}>{transState.toUpperCase()}</span></span>
            <button onClick={handleReset} className="px-2 py-1 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded cursor-pointer active:scale-95 transition-all text-right font-bold">CLEAR LAB</button>
          </div>
        </div>

        {/* Right Column: Execution Controls & Console logger */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">ทดลองส่งข้อมูลเพื่อตรวจการทำงาน</span>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={triggerNormalSend}
                disabled={transState !== 'idle'}
                className="p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 active:scale-98 flex justify-between items-center group border-slate-200 bg-white hover:border-cyan-500/40 hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-100"
              >
                <div className="grow text-left">
                  <p className="text-sm font-bold text-slate-800">1. ส่งปกติ (PC A ส่งไปหา PC B)</p>
                  <p className="text-[11px] text-slate-500 font-normal leading-normal mt-0.5">ข้อมูลไหลผ่านบัสฮับ สังเกตการ Broadcast ไปยังคอมพิวเตอร์พอร์ตอื่นๆ ที่ไม่เกี่ยวข้องด้วย</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={triggerCollision}
                disabled={transState !== 'idle'}
                className="p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 active:scale-98 flex justify-between items-center group border-slate-200 bg-white hover:border-rose-500/40 hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-100"
              >
                <div className="grow text-left">
                  <p className="text-sm font-bold text-rose-950">2. ส่งพร้อมกันจนเกิดการชน (A และ C ส่งชนกัน)</p>
                  <p className="text-[11px] text-slate-500 font-normal leading-normal mt-0.5">จำลองการชนกันของสัญญาณไฟฟ้าใน Hub พร้อมแสดงพฤติกรรมการกู้ระบบด้วยระเบียบ CSMA/CD</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Console Logger box */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-900 mt-5">
            <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase tracking-wider flex justify-between items-center border-b border-slate-900 pb-1.5 font-sans">
              <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> Hub Physical Log Console</span>
              {transState !== 'idle' && transState !== 'success' && transState !== 'backoff' && (
                <span className="text-cyan-400 flex items-center gap-1 text-[9px]"><RefreshCw className="w-2.5 h-2.5 animate-spin" /> ELECTRICAL TRANSIT</span>
              )}
            </div>

            <div className="space-y-1.5 min-h-[140px] max-h-[140px] overflow-y-auto leading-relaxed">
              {logs.map((log, index) => (
                <div key={index} className="flex gap-2 text-xs font-mono">
                  <span className="text-slate-700 select-none">&gt;&gt;</span>
                  <p className={`${
                    log.includes('✅') || log.includes('เสร็จสมบูรณ์')
                      ? 'text-emerald-400 font-bold' 
                      : log.startsWith('💥') 
                      ? 'text-rose-400 font-bold'
                      : log.startsWith('🚨') || log.startsWith('⏱️')
                      ? 'text-amber-300 font-bold' 
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
   3. SWITCH MAC TABLE LEARNING SIMULATOR (Subtopic 4.1.3)
   ═══════════════════════════════════════════════════════════════════ */
function SwitchLearningSimulator() {
  const [macTable, setMacTable] = useState([]); // Array of { port: number, mac: string }
  const [transState, setTransState] = useState('idle'); // idle | sending | flooding | unicasting | learned | done
  const [logs, setLogs] = useState(['[READY] รอการส่งข้อมูลระดับเฟรมของ Switch...']);
  const [currentSender, setCurrentSender] = useState('');
  const [currentReceiver, setCurrentReceiver] = useState('');
  const timerRef = useRef(null);

  const pcDetails = {
    A: { port: 1, mac: '00-1A-11-AC-DE-01' },
    B: { port: 2, mac: '00-60-2F-AC-DE-02' },
    C: { port: 3, mac: '00-E0-4C-AC-DE-03' },
    D: { port: 4, mac: '00-25-00-AC-DE-04' }
  };

  const handleStartLab = (senderKey, receiverKey) => {
    if (transState !== 'idle') return;
    setCurrentSender(senderKey);
    setCurrentReceiver(receiverKey);
    setTransState('sending');

    const sMac = pcDetails[senderKey].mac;
    const rMac = pcDetails[receiverKey].mac;
    const sPort = pcDetails[senderKey].port;

    setLogs([
      `[PC ${senderKey}] ทำการแพ็กเก็ตส่งเฟรม: Source MAC=${sMac} | Destination MAC=${rMac}`,
      `[SWITCH L2] ได้รับเฟรมข้อมูลที่พอร์ตทางกายภาพ ${sPort}...`
    ]);

    let step = 0;
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      step += 1;
      if (step === 1) {
        // Learn the sender
        const alreadyLearned = macTable.some(item => item.mac === sMac);
        if (!alreadyLearned) {
          setMacTable(prev => [...prev, { port: sPort, mac: sMac }]);
          setLogs(current => [
            ...current,
            `💡 [MAC TABLE UPDATE] สวิตช์ตรวจหาและบันทึกค่า: Port ${sPort} -> MAC ${sMac} ลงตารางเรียบร้อย`
          ]);
        } else {
          setLogs(current => [
            ...current,
            `💡 [MAC TABLE INSPECT] พอร์ต ${sPort} มีรหัส MAC ${sMac} อยู่ในตารางเรียบร้อยแล้ว`
          ]);
        }
      }
      else if (step === 2) {
        // Check if receiver is in table
        const receiverLearned = macTable.some(item => item.mac === rMac);
        if (!receiverLearned) {
          setTransState('flooding');
          setLogs(current => [
            ...current,
            `⚠️ [DESTINATION UNKNOWN] สวิตช์ไม่พบที่พอร์ตปลายทางของ MAC ${rMac} ในตาราง`,
            `🔍 [FLOODING] สวิตช์ทำการ Flood ข้อมูลบิตออกทุกพอร์ต (ยกเว้นพอร์ตต้นทาง ${sPort}) เพื่อตามหาผู้รับ...`
          ]);
        } else {
          setTransState('unicasting');
          const targetPort = pcDetails[receiverKey].port;
          setLogs(current => [
            ...current,
            `✨ [DESTINATION FOUND] สวิตช์ค้นพบ MAC ${rMac} ตรงกับพอร์ต ${targetPort} ในตาราง!`,
            `✨ [UNICAST TRANSMISSION] สวิตช์นำส่งข้อมูลวิ่งตรงจากพอร์ต ${sPort} ไปยังพอร์ต ${targetPort} ข้ามสัญญาณช่องทางอื่นทั้งหมดเงียบเชียบ ✅`
          ]);
        }
      }
      else if (step === 3) {
        // Flooding action completed, learn the receiver
        if (transState === 'flooding' || !macTable.some(item => item.mac === rMac)) {
          const rPort = pcDetails[receiverKey].port;
          setMacTable(prev => [...prev, { port: rPort, mac: rMac }]);
          setLogs(current => [
            ...current,
            `💡 [RESPONSE LEARNED] PC ${receiverKey} ตอบรับการสื่อสาร สวิตช์จดบันทึกประวัติทันที: Port ${rPort} -> MAC ${rMac}`,
            `[COMPLETE] สวิตช์ดำเนินการเรียนรู้พฤติกรรมการเชื่อมสำเร็จเรียบร้อย`
          ]);
        }
        setTransState('done');
        clearInterval(timerRef.current);
      }
    }, 1800);
  };

  const handleResetLab = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setMacTable([]);
    setTransState('idle');
    setCurrentSender('');
    setCurrentReceiver('');
    setLogs(['[READY] รอการส่งข้อมูลระดับเฟรมของ Switch...']);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <SimulatorShell
      icon={<Network className="w-6 h-6 text-cyan-500" />}
      title="เครื่องจำลองตรรกะการเรียนรู้ของสวิตช์ (Switch MAC Table Learning Lab)"
      accentBg="bg-cyan-50"
      iconColor="text-cyan-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch select-none text-left font-sans">
        
        {/* Left Column: Symmetrical Circular Layout with Central Switch */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between items-center relative min-h-[380px] lg:col-span-1">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">SWITCH PORT TOPOLOGY</span>
          
          <svg viewBox="0 0 320 320" className="w-64 h-64 z-10 my-auto">
            {/* Absolute Center x=160, y=160 */}
            
            {/* Switch Central Box */}
            <rect x="110" y="125" width="100" height="70" rx="10" fill="#0F172A" stroke={
              transState === 'flooding' ? '#EF4444' :
              transState === 'unicasting' ? '#10B981' : '#0891B2'
            } strokeWidth="2.5" />
            <text x="160" y="156" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">SWITCH (L2)</text>
            <text x="160" y="172" textAnchor="middle" fill="#67E8F9" fontSize="8" fontFamily="sans-serif">MAC Learning Engine</text>

            {/* Ports and Symmetrical Wires from center (160,160) */}
            {/* Port 1 (PC A): 160,160 to 60,60 */}
            <line x1="160" y1="160" x2="60" y2="60" stroke={currentSender === 'A' || currentReceiver === 'A' ? '#22D3EE' : '#334155'} strokeWidth="2.5" />
            <text x="100" y="100" fill="#94A3B8" fontSize="8" fontWeight="bold" fontFamily="mono">P1</text>

            {/* Port 2 (PC B): 160,160 to 260,60 */}
            <line x1="160" y1="160" x2="260" y2="60" stroke={
              (transState === 'flooding' && currentSender !== 'B') || currentSender === 'B' || currentReceiver === 'B' ? '#22D3EE' : '#334155'
            } strokeWidth="2.5" />
            <text x="210" y="100" fill="#94A3B8" fontSize="8" fontWeight="bold" fontFamily="mono">P2</text>

            {/* Port 3 (PC C): 160,160 to 60,260 */}
            <line x1="160" y1="160" x2="60" y2="260" stroke={
              (transState === 'flooding' && currentSender !== 'C') || currentSender === 'C' || currentReceiver === 'C' ? '#22D3EE' : '#334155'
            } strokeWidth="2.5" />
            <text x="100" y="210" fill="#94A3B8" fontSize="8" fontWeight="bold" fontFamily="mono">P3</text>

            {/* Port 4 (PC D): 160,160 to 260,260 */}
            <line x1="160" y1="160" x2="260" y2="260" stroke={
              (transState === 'flooding' && currentSender !== 'D') || currentSender === 'D' || currentReceiver === 'D' ? '#22D3EE' : '#334155'
            } strokeWidth="2.5" />
            <text x="210" y="210" fill="#94A3B8" fontSize="8" fontWeight="bold" fontFamily="mono">P4</text>

            {/* PC Nodes */}
            <circle cx="60" cy="60" r="18" fill="#1E293B" stroke="#475569" />
            <text x="60" y="63" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="bold">PC A</text>

            <circle cx="260" cy="60" r="18" fill="#1E293B" stroke="#475569" />
            <text x="260" y="63" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="bold">PC B</text>

            <circle cx="60" cy="260" r="18" fill="#1E293B" stroke="#475569" />
            <text x="60" y="263" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="bold">PC C</text>

            <circle cx="260" cy="260" r="18" fill="#1E293B" stroke="#475569" />
            <text x="260" y="263" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="bold">PC D</text>
          </svg>
        </div>

        {/* Center Column: Live Dynamic MAC Table */}
        <div className="flex flex-col justify-between space-y-4 lg:col-span-1">
          <div className="space-y-3">
            <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block">ตารางความจำ Switch MAC Table</span>
            
            <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-4 min-h-[180px] flex flex-col justify-between">
              <table className="w-full text-[10.5px] font-mono text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500">
                    <th className="pb-1.5 font-bold">PORT</th>
                    <th className="pb-1.5 font-bold">MAC ADDRESS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {macTable.length > 0 ? (
                    macTable.map((item, idx) => (
                      <tr key={idx} className="text-cyan-400 hover:bg-slate-900/50">
                        <td className="py-2.5 font-bold">Port {item.port}</td>
                        <td className="py-2.5 font-bold">{item.mac}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="py-8 text-center text-slate-600 font-sans italic text-[11px]">
                        [ตารางค่าว่างเปล่า - Switch กำลังรอเรียนรู้เฟรมข้อมูลเริ่มต้น]
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="text-[8px] text-slate-500 border-t border-slate-900 pt-2 font-sans font-bold flex justify-between">
                <span>ตระกูลเรียนรู้: Dynamic CAM</span>
                <span className="text-cyan-500">{macTable.length}/4 อุปกรณ์จำเรียบร้อย</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleResetLab}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white font-bold text-xs cursor-pointer border border-slate-800 active:scale-98 transition-all text-center"
            >
              รีเซ็ตตาราง Switch เป็นค่าว่าง (RESET)
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic interactive controls & Console logger */}
        <div className="flex flex-col justify-between lg:col-span-1">
          <div className="space-y-3">
            <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block">เลือกมาตรการยิงข้อมูลข้ามระบบ</span>
            
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleStartLab('A', 'B')}
                disabled={transState !== 'idle'}
                className="p-3 bg-white border border-slate-200 hover:border-cyan-500/40 rounded-xl text-left cursor-pointer active:scale-98 text-xs font-bold text-slate-700 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-100"
              >
                ยิงข้อมูล: PC A ➔ PC B
              </button>
              <button
                onClick={() => handleStartLab('A', 'C')}
                disabled={transState !== 'idle'}
                className="p-3 bg-white border border-slate-200 hover:border-cyan-500/40 rounded-xl text-left cursor-pointer active:scale-98 text-xs font-bold text-slate-700 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-100"
              >
                ยิงข้อมูล: PC A ➔ PC C
              </button>
              <button
                onClick={() => handleStartLab('B', 'A')}
                disabled={transState !== 'idle'}
                className="p-3 bg-white border border-slate-200 hover:border-cyan-500/40 rounded-xl text-left cursor-pointer active:scale-98 text-xs font-bold text-slate-700 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-100"
              >
                ยิงข้อมูล: PC B ➔ PC A
              </button>
              <button
                onClick={() => handleStartLab('D', 'B')}
                disabled={transState !== 'idle'}
                className="p-3 bg-white border border-slate-200 hover:border-cyan-500/40 rounded-xl text-left cursor-pointer active:scale-98 text-xs font-bold text-slate-700 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-100"
              >
                ยิงข้อมูล: PC D ➔ PC B
              </button>
            </div>
          </div>

          {/* Console Logger box */}
          <div className="bg-slate-950 rounded-xl p-3 border border-slate-900 mt-4">
            <div className="text-slate-500 text-[9.5px] font-mono mb-2 uppercase tracking-wider flex justify-between items-center border-b border-slate-900 pb-1 pb-1.5 font-sans">
              <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> L2 Switch Console</span>
              {transState !== 'idle' && transState !== 'done' && (
                <span className="text-cyan-400 flex items-center gap-1 text-[8.5px]"><RefreshCw className="w-2.5 h-2.5 animate-spin" /> DISPATCHING</span>
              )}
            </div>

            <div className="space-y-1.5 min-h-[110px] max-h-[110px] overflow-y-auto leading-relaxed">
              {logs.map((log, index) => (
                <div key={index} className="flex gap-1.5 text-[11px] font-mono">
                  <span className="text-slate-700 select-none">&gt;</span>
                  <p className={`${
                    log.includes('✨') || log.includes('✅')
                      ? 'text-emerald-400 font-bold' 
                      : log.startsWith('💡') 
                      ? 'text-cyan-300 font-bold'
                      : log.startsWith('⚠️') || log.startsWith('🔍')
                      ? 'text-rose-300' 
                      : 'text-slate-400'
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
   4. ROUTER ROUTING TABLE & NAT SIMULATOR (Subtopic 4.1.4)
   ═══════════════════════════════════════════════════════════════════ */
function RouterRoutingSimulator() {
  const [step, setStep] = useState(0); // 0: idle | 1: lan_switch | 2: router_inside | 3: router_outside_nat | 4: destination_complete
  const [logs, setLogs] = useState(['[READY] ระบบนำทางเราเตอร์ว่าง รอการส่งผ่าน IP Packet ข้าม Subnet...']);
  const timer = useRef(null);

  const startRouting = () => {
    if (step !== 0) return;
    setStep(1);
    setLogs([
      '[PC Host] ประกอบชุดข้อมูล IP Packet: Src=192.168.1.15 | Dest=8.8.8.8 | TTL=64',
      '[PC Host] ปล่อยสิทธิ์ออกพอร์ตแลนส่งต่อหา Switch A ท้องถิ่น'
    ]);

    let currentStep = 1;
    if (timer.current) clearInterval(timer.current);

    timer.current = setInterval(() => {
      currentStep += 1;
      if (currentStep === 2) {
        setStep(2);
        setLogs(current => [
          ...current,
          '[SWITCH A] รับสัญญาณ Layer 2 และส่งพอร์ตต่อไปยัง Default Gateway (เสาพิกัดเราเตอร์ 192.168.1.1)...',
          '🔍 [ROUTER INSPECTION] เราเตอร์ได้รับข้อมูลที่พอร์ต LAN ตรวจสอบ IP Header: Destination IP (8.8.8.8) อยู่ขอบเขตเครือข่ายภายนอก'
        ]);
      }
      else if (currentStep === 3) {
        setStep(3);
        setLogs(current => [
          ...current,
          '🗺️ [ROUTING TABLE MATCH] เราเตอร์วิเคราะห์เส้นทางข้ามเครือข่าย ค้นพบแมตช์พอร์ต WAN ออกไปยัง ISP Gateway...',
          '⚡ [NAT TRANSLATION] เพื่อให้ข้อมูลสื่อสารกลับมาหาไอพีส่วนตัวได้ เราเตอร์เปลี่ยนค่า IP Header: แปลง Source IP 192.168.1.15 ➔ Public WAN IP 203.0.113.1 และสลักตาราง Socket NAT Table',
          '⚡ [TTL DECREMENT] ลดทอนค่า Time To Live (TTL): 64 ➔ 63 เพื่อป้องกันบิตข้อมูลลูปค้างข้ามอินเทอร์เน็ตถาวร'
        ]);
      }
      else if (currentStep === 4) {
        setStep(4);
        setLogs(current => [
          ...current,
          '☁️ [PUBLIC CLOUD REACH] แพ็กเก็ตส่งผ่านสายเคเบิล ISP ถึงโฮสต์เซิร์ฟเวอร์ความมั่นคง Google DNS (8.8.8.8) เรียบร้อย ✅ [สำเร็จ]',
          '[COMPLETE] การเลือกเส้นทางและการทำ NAT Gateway ข้ามเครือข่ายสัมฤทธิผลสมบูรณ์'
        ]);
        clearInterval(timer.current);
      }
    }, 2000);
  };

  const handleReset = () => {
    if (timer.current) clearInterval(timer.current);
    setStep(0);
    setLogs(['[READY] ระบบนำทางเราเตอร์ว่าง รอการส่งผ่าน IP Packet ข้าม Subnet...']);
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <SimulatorShell
      icon={<Activity className="w-6 h-6 text-cyan-500" />}
      title="เครื่องจำลองการเลือกเส้นทางเราเตอร์ & ตรรกะ NAT Gateway"
      accentBg="bg-cyan-50"
      iconColor="text-cyan-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch select-none text-left font-sans">
        
        {/* Left Network diagram display using Symmetrical SVG mapping */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between items-center relative min-h-[400px] lg:col-span-2">
          <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">ROUTER & NAT TOPOLOGY LAYOUT</span>
          
          <svg viewBox="0 0 450 320" className="w-full max-w-[400px] h-72 z-10 my-auto">
            {/* Coordinates Symmetrical layout:
               PC: x=50, y=80
               Switch A: x=140, y=80
               Router (NAT): x=240, y=160
               Cloud Server (8.8.8.8): x=380, y=240
            */}

            {/* Subnet A LAN boundaries visual */}
            <rect x="15" y="30" width="180" height="110" rx="8" fill="#1e293b" fillOpacity="0.3" stroke="#475569" strokeDasharray="3,3" />
            <text x="25" y="45" fill="#94A3B8" fontSize="8" fontWeight="bold">LAN SUBNET (192.168.1.0/24)</text>

            {/* Wires */}
            {/* PC to Switch */}
            <line x1="60" y1="80" x2="140" y2="80" stroke={step >= 1 ? '#06B6D4' : '#334155'} strokeWidth="2.5" />
            {/* Switch to Router */}
            <line x1="140" y1="80" x2="240" y2="160" stroke={step >= 2 ? '#06B6D4' : '#334155'} strokeWidth="2.5" />
            {/* Router to Cloud WAN */}
            <line x1="240" y1="160" x2="380" y2="240" stroke={step >= 3 ? '#10B981' : '#334155'} strokeWidth="2.5" />

            {/* Glowing flowing Packet */}
            {step === 1 && (
              <circle cx="100" cy="80" r="5.5" fill="#22D3EE">
                <animate attributeName="cx" from="60" to="140" dur="1s" repeatCount="indefinite" />
              </circle>
            )}
            {step === 2 && (
              <circle cx="190" cy="120" r="5.5" fill="#22D3EE">
                <animate attributeName="cx" from="140" to="240" dur="1s" repeatCount="indefinite" />
                <animate attributeName="cy" from="80" to="160" dur="1s" repeatCount="indefinite" />
              </circle>
            )}
            {step === 3 && (
              <circle cx="310" cy="200" r="5.5" fill="#10B981">
                <animate attributeName="cx" from="240" to="380" dur="1s" repeatCount="indefinite" />
                <animate attributeName="cy" from="160" to="240" dur="1s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Nodes */}
            {/* PC Host */}
            <rect x="25" y="65" width="50" height="30" rx="4" fill="#0F172A" stroke="#475569" />
            <text x="50" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">PC Host</text>
            <text x="50" y="90" textAnchor="middle" fill="#94A3B8" fontSize="6.5" fontFamily="mono">192.168.1.15</text>

            {/* Switch A */}
            <rect x="115" y="65" width="50" height="30" rx="4" fill="#0F172A" stroke="#475569" />
            <text x="140" y="80" textAnchor="middle" fill="#E2E8F0" fontSize="8" fontWeight="bold">Switch A</text>
            <text x="140" y="90" textAnchor="middle" fill="#67E8F9" fontSize="6.5" fontFamily="mono">L2 Device</text>

            {/* Router Gateway */}
            <circle cx="240" cy="160" r="30" fill="#0F172A" stroke={step >= 3 ? '#10B981' : '#0891B2'} strokeWidth="2.5" />
            <text x="240" y="158" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="bold">ROUTER (NAT)</text>
            <text x="240" y="168" textAnchor="middle" fill="#22D3EE" fontSize="6" fontFamily="mono">LAN: 192.168.1.1</text>
            <text x="240" y="176" textAnchor="middle" fill="#10B981" fontSize="6" fontFamily="mono">WAN: 203.0.113.1</text>

            {/* Cloud Target */}
            <rect x="350" y="225" width="60" height="35" rx="5" fill="#0F172A" stroke={step === 4 ? '#10B981' : '#475569'} strokeWidth="2" />
            <text x="380" y="240" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">Google Cloud</text>
            <text x="380" y="250" textAnchor="middle" fill="#F472B6" fontSize="7" fontFamily="mono">IP: 8.8.8.8</text>
          </svg>
        </div>

        {/* Right Info and NAT tables */}
        <div className="flex flex-col justify-between space-y-4 lg:col-span-1">
          <div className="space-y-4">
            <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block">สลักตารางแปลไอพี NAT Table (Live)</span>
            
            <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-4 min-h-[160px] flex flex-col justify-between">
              <table className="w-full text-[9.5px] font-mono text-slate-200">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500">
                    <th className="pb-1.5 font-bold">INTERNAL SOCKET</th>
                    <th className="pb-1.5 font-bold">NAT WAN SOCKET</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {step >= 3 ? (
                    <tr className="text-emerald-400 font-bold">
                      <td className="py-2.5">192.168.1.15:49152</td>
                      <td className="py-2.5">203.0.113.1:51024</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={2} className="py-8 text-center text-slate-600 font-sans italic text-[10.5px]">
                        [NAT Table ว่างเปล่า - รอการแปลงข้อมูลข้าม Gateway]
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Dynamic Header Inspector */}
              <div className="border-t border-slate-900 pt-3.5 space-y-1.5">
                <span className="text-[9px] text-slate-500 font-bold font-sans block">LIVE IP HEADER INSPECTOR:</span>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 font-mono text-[9px] space-y-1">
                  <div><span className="text-slate-500">SOURCE IP:</span> <span className="text-cyan-400 font-bold">{step >= 3 ? '203.0.113.1 (WAN Translation)' : '192.168.1.15'}</span></div>
                  <div><span className="text-slate-500">DESTIN IP:</span> <span className="text-pink-400 font-bold">8.8.8.8</span></div>
                  <div><span className="text-slate-500">TTL INDEX:</span> <span className="text-amber-400 font-bold">{step >= 3 ? '63 (Decremented)' : '64'}</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {step === 0 ? (
              <button
                onClick={startRouting}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl cursor-pointer active:scale-98 shadow-md"
              >
                กดยิงส่งชุดข้อมูลข้าม IP Subnet
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white font-bold text-xs rounded-xl cursor-pointer border border-slate-800 active:scale-98 transition-all"
              >
                เคลียร์ข้อมูลจำลอง (RESET)
              </button>
            )}
          </div>
        </div>

      </div>
      
      {/* Dynamic log console */}
      <div className="bg-slate-950 rounded-xl p-4 border border-slate-900 mt-5 text-left">
        <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase tracking-wider flex justify-between items-center border-b border-slate-900 pb-1.5 font-sans">
          <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> L3 Router Gateway Trace Logs</span>
          {step > 0 && step < 4 && (
            <span className="text-cyan-400 flex items-center gap-1 text-[9px]"><RefreshCw className="w-2.5 h-2.5 animate-spin" /> ROUTING IN PROGRESS</span>
          )}
        </div>

        <div className="space-y-1.5 min-h-[90px] max-h-[110px] overflow-y-auto leading-relaxed">
          {logs.map((log, index) => (
            <div key={index} className="flex gap-2 text-xs font-mono">
              <span className="text-slate-700 select-none">&gt;&gt;</span>
              <p className={`${
                log.includes('✅') 
                  ? 'text-emerald-400 font-bold' 
                  : log.startsWith('⚡') 
                  ? 'text-cyan-300 font-bold'
                  : log.startsWith('🗺️') || log.startsWith('🔍')
                  ? 'text-amber-300 font-bold' 
                  : 'text-slate-300'
              }`}>
                {log}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   5. TRIPLE INTEGRATED NETWORK LAB (Subtopic 4.1.5, 4.1.6, 4.1.7)
   ═══════════════════════════════════════════════════════════════════ */
function TripleNetworkLab() {
  const [activeTab, setActiveTab] = useState('wap'); // 'wap' | 'firewall' | 'modem'

  // WAP state parameters
  const [frequency, setFrequency] = useState('2.4GHz');
  const [obstacle, setObstacle] = useState('none');
  const obstaclePenalties = { none: 0, wood: 15, glass: 20, concrete: 55, metal: 85 };

  const basePower = frequency === '2.4GHz' ? 95 : 85; // 5GHz naturally attenuates faster
  const obstaclePenalty = obstaclePenalties[obstacle] + (frequency === '5GHz' && obstacle !== 'none' ? 10 : 0); // 5GHz suffers more loss in solid materials
  const finalSignal = Math.max(5, basePower - obstaclePenalty);

  // Firewall state parameters
  const [firewallRules, setFirewallRules] = useState([
    { id: 1, action: 'DENY', ip: '10.0.0.99', port: 'Any', desc: 'บล็อกไอพีพนักงานที่แอบแฮกระบบ' },
    { id: 2, action: 'DENY', ip: 'Any', port: '80', desc: 'ปิดการเชื่อมต่อ HTTP (บังคับใช้ HTTPS)' },
    { id: 3, action: 'ALLOW', ip: 'Any', port: 'Any', desc: 'เปิดช่องสัญญาณสื่อสารสากลปกติ' }
  ]);
  const [attackerIp, setAttackerIp] = useState('10.0.0.99');
  const [attackerPort, setAttackerPort] = useState('80');
  const [fwLogs, setFwLogs] = useState(['[READY] ป้อมป้องสกัดข้อมูล Firewall สแตนด์บาย...']);

  const handleFirewallTest = () => {
    // Audit packet based on ACL Rules
    let matchedRule = firewallRules.find(rule => 
      (rule.ip === 'Any' || rule.ip === attackerIp) && 
      (rule.port === 'Any' || rule.port === attackerPort)
    );

    if (!matchedRule) {
      matchedRule = { action: 'ALLOW', desc: 'Default Rule' };
    }

    if (matchedRule.action === 'DENY') {
      setFwLogs(current => [
        `🚨 [PACKET DROP] ตรวจพบการละเมิดกฎ! ปฏิเสธแพ็กเก็ตจาก ${attackerIp}:${attackerPort} ข้ามระบบขอบเขตสำเร็จ`,
        `💡 กฎที่ทำงานบล็อก: ${matchedRule.desc}`,
        ...current
      ]);
    } else {
      setFwLogs(current => [
        `✅ [PACKET ALLOWED] ผ่านสิทธิ์ข้ามเครื่องเรียบร้อย: ข้อมูลจาก ${attackerIp}:${attackerPort} เดินทางสู่ Server ภายในได้สำเร็จ`,
        ...current
      ]);
    }
  };

  // Modem state parameters
  const [modBitstream, setModBitstream] = useState([1, 0, 1, 1, 0, 1, 0]);
  const [modulationType, setModulationType] = useState('ASK'); // ASK | FSK | PSK

  return (
    <SimulatorShell
      icon={<Sliders className="w-6 h-6 text-cyan-500" />}
      title="แผงควบคุมและห้องวิจัยสัญญาณ WAP, Firewall & Modem Lab"
      accentBg="bg-cyan-50"
      iconColor="text-cyan-600"
    >
      <div className="space-y-6 select-none font-sans text-left">
        
        {/* Navigation Tabs Header */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('wap')}
            className={`py-2 px-5 font-bold text-xs cursor-pointer border-b-2 transition-all ${
              activeTab === 'wap'
                ? 'border-cyan-500 text-cyan-600 bg-cyan-50/30'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🛰️ WAP WiFi Lab
          </button>
          <button
            onClick={() => setActiveTab('firewall')}
            className={`py-2 px-5 font-bold text-xs cursor-pointer border-b-2 transition-all ${
              activeTab === 'firewall'
                ? 'border-cyan-500 text-cyan-600 bg-cyan-50/30'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🛡️ Firewall Rule ACL
          </button>
          <button
            onClick={() => setActiveTab('modem')}
            className={`py-2 px-5 font-bold text-xs cursor-pointer border-b-2 transition-all ${
              activeTab === 'modem'
                ? 'border-cyan-500 text-cyan-600 bg-cyan-50/30'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            〰️ Modem Modulation Graph
          </button>
        </div>

        {/* 1. WAP TAB PANEL */}
        {activeTab === 'wap' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[300px] text-xs text-slate-200">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">WIFI WAVELENGTH SIMULATOR</span>
              
              <div className="space-y-4">
                <div>
                  <h6 className="text-[13px] font-bold text-white flex items-center gap-1.5"><Radio className="w-4 h-4 text-cyan-400" /> WiFi Signal Parameters</h6>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    วิเคราะห์กลไกความแรงสัญญาณถดถอย (Attenuation) เมื่อคลื่นวิ่งชนสิ่งกีดขวางวัสดุชนิดต่างๆ
                  </p>
                </div>

                {/* Frequency Selector */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 font-bold block">1. เลือกย่านความถี่คลื่นวิทยุ (Frequency Band):</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFrequency('2.4GHz')}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                        frequency === '2.4GHz'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      2.4 GHz (ส่งไกล ทะลุทะลวงดี แบนด์วิดท์ต่ำ)
                    </button>
                    <button
                      onClick={() => setFrequency('5GHz')}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                        frequency === '5GHz'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      5 GHz (ส่งสั้น ทะลุทะลวงแย่ แบนด์วิดท์สูงลิ่ว)
                    </button>
                  </div>
                </div>

                {/* Obstacle Selector */}
                <div className="space-y-1.5 pt-1.5">
                  <span className="text-[10px] text-slate-400 font-bold block">2. เลือกประเภทกำแพงสิ่งกีดขวาง (Obstacle Material):</span>
                  <div className="flex flex-wrap gap-2">
                    {['none', 'wood', 'glass', 'concrete', 'metal'].map(mat => (
                      <button
                        key={mat}
                        onClick={() => setObstacle(mat)}
                        className={`py-1 px-2.5 rounded-lg text-[10.5px] cursor-pointer transition-all font-bold ${
                          obstacle === mat
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {mat === 'none' ? 'ไม่มีสิ่งกีดขวาง' :
                         mat === 'wood' ? 'ไม้หนา (Wood)' :
                         mat === 'glass' ? 'กระจกนิรภัย (Glass)' :
                         mat === 'concrete' ? 'กำแพงปูน (Concrete)' : 'แผ่นโลหะสะท้อน (Metal)'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Attenuation Warning */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl mt-4 text-[10.5px] leading-relaxed text-slate-400">
                📌 <strong>เกร็ดความรู้:</strong> ความถี่สูงอย่าง 5GHz มีพลังงานระดับบิตข้อมูลสูง ทว่ามีขีดจำกัดทางฟิสิกส์คลื่นสะท้อนต่ำกว่า ทำให้เกิดการลดทอนความสูงยอดคลื่น (High Attenuation) เมื่อกั้นด้วยแผ่นวัสดุหนาแน่น
              </div>
            </div>

            {/* Signal visual representation column */}
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between items-center relative min-h-[300px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">LIVE SIGNAL WAVE AND INDEX</span>
              
              <div className="my-auto w-full space-y-6 text-center text-slate-200">
                {/* Visual gauge */}
                <div className="space-y-2 max-w-xs mx-auto">
                  <span className="text-xs text-slate-400 block font-bold">WiFi Signal Indicator strength:</span>
                  <div className="text-4xl font-mono font-bold tracking-tight text-cyan-400">
                    {finalSignal} <span className="text-xs text-slate-500">dBm (Mocked Index)</span>
                  </div>
                  
                  {/* Gauge bar */}
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div className={`h-full transition-all duration-500 ${
                      finalSignal > 60 ? 'bg-emerald-500' :
                      finalSignal > 30 ? 'bg-amber-400' : 'bg-rose-500'
                    }`} style={{ width: `${finalSignal}%` }} />
                  </div>

                  <span className="text-[10px] text-slate-400 block leading-tight font-sans mt-1">
                    {finalSignal > 60 ? '✅ สัญญาณดีเยี่ยม! เล่นเน็ตไหลลื่น รบกวนสัญญาณต่ำ' :
                     finalSignal > 30 ? '⚠️ สัญญาณปานกลาง - ระวังแพ็กเก็ตหลุดลอยชั่วคราว' :
                     '❌ สัญญาณวิกฤต! ข้อมูลขาดหาย (High Attenuation) การสื่อสารล้มเหลว'}
                  </span>
                </div>

                {/* Animated emitting waves */}
                <div className="relative w-28 h-20 mx-auto flex items-end justify-center overflow-hidden">
                  <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center relative">
                    <Wifi className="w-5 h-5 text-cyan-400 z-10" />
                    {finalSignal > 30 && (
                      <>
                        <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-ping" />
                        <div className="absolute inset-0 bg-cyan-400/10 rounded-full animate-[ping_1.5s_infinite]" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. FIREWALL TAB PANEL */}
        {activeTab === 'firewall' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Control panel & custom inputs */}
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[340px] text-xs text-slate-200 lg:col-span-1">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">FIREWALL PACKET FILTER</span>
              
              <div className="space-y-4">
                <div>
                  <h6 className="text-[13px] font-bold text-white flex items-center gap-1.5"><Sliders className="w-4 h-4 text-cyan-400" /> Packet Generator Parameters</h6>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    จำลองแพ็กเก็ตประสงค์ร้ายยิงถล่มเครือข่าย เพื่อทดสอบความทนทานของป้อมสกัด Firewall
                  </p>
                </div>

                {/* Attacker IP */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 font-bold block">1. ป้อนไอพีแพ็กเก็ตต้นทาง (Source IP):</label>
                  <input
                    type="text"
                    value={attackerIp}
                    onChange={(e) => setAttackerIp(e.target.value)}
                    className="w-full pl-3 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 font-mono font-bold"
                  />
                </div>

                {/* Attacker Port */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 font-bold block">2. ป้อนเป้าหมายพอร์ตสัญญาณ (Destination Port):</label>
                  <input
                    type="text"
                    value={attackerPort}
                    onChange={(e) => setAttackerPort(e.target.value)}
                    className="w-full pl-3 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  onClick={handleFirewallTest}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl cursor-pointer active:scale-98 shadow-md"
                >
                  🚀 ยิงยิงข้อมูลทดสอบการรับสิทธิ์ (Inject Packet)
                </button>
              </div>
            </div>

            {/* Firewall Rules ACL Table */}
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[340px] text-xs text-slate-200 lg:col-span-1">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold font-sans">ACCESS CONTROL LIST</span>
              
              <div className="space-y-3">
                <h6 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block">ตารางบัญชีสิทธิ์ Access Control Lists (ACL)</h6>
                
                <div className="space-y-2 max-h-[220px] overflow-y-auto min-h-[180px]">
                  {firewallRules.map(rule => (
                    <div key={rule.id} className="p-3 bg-slate-950 border border-slate-900 rounded-xl flex justify-between items-center gap-2">
                      <div className="space-y-1">
                        <span className="font-bold text-white text-[11px] block">{rule.desc}</span>
                        <span className="font-mono text-[9px] text-slate-500 block">IP: {rule.ip} | Port: {rule.port}</span>
                      </div>
                      <span className={`py-1 px-2.5 font-bold text-[9px] rounded-md ${
                        rule.action === 'DENY' 
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {rule.action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[8px] text-slate-500 border-t border-slate-900 pt-2 font-mono">
                * กฎสืบเช็คจากบนลงล่าง (Top-Down inspection) ตรวจตราเสร็จแล้วหยุดรัน
              </div>
            </div>

            {/* Firewall Logs console panel */}
            <div className="flex flex-col justify-between lg:col-span-1">
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-900 min-h-[260px] flex flex-col justify-between">
                <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase tracking-wider flex justify-between items-center border-b border-slate-900 pb-1.5">
                  <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> Firewall Defense Event logs</span>
                </div>

                <div className="space-y-1.5 min-h-[190px] max-h-[190px] overflow-y-auto leading-relaxed">
                  {fwLogs.map((log, index) => (
                    <div key={index} className="flex gap-2 text-xs font-mono">
                      <span className="text-slate-700 select-none">&gt;</span>
                      <p className={`${
                        log.startsWith('✅') 
                          ? 'text-emerald-400 font-bold' 
                          : log.startsWith('🚨') 
                          ? 'text-rose-400 font-bold'
                          : 'text-slate-300'
                      }`}>
                        {log}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => setFwLogs(['[READY] ป้องกันสกัดข้อมูล Firewall สแตนด์บาย...'])}
                className="w-full mt-3 py-2 bg-slate-900 border border-slate-800 hover:text-white text-slate-400 font-bold rounded-lg text-xs cursor-pointer active:scale-95 transition-all text-center"
              >
                เคลียร์เหตุการณ์บันทึก (CLEAR LOGS)
              </button>
            </div>
          </div>
        )}

        {/* 3. MODEM MODULATION GRAPH PANEL */}
        {activeTab === 'modem' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Controls bitstream config */}
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[300px] text-xs text-slate-200 lg:col-span-1">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">DIGITAL SIGNAL INPUTS</span>
              
              <div className="space-y-4">
                <div>
                  <h6 className="text-[13px] font-bold text-white flex items-center gap-1.5"><Sliders className="w-4 h-4 text-cyan-400" /> Modulation Setup</h6>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    ปรับเปลี่ยนรหัสเลขฐานสอง และประเภทวิธีเปลี่ยนระดับยอดคลื่น (Modulation) เพื่อส่งออกทางโทรศัพท์อนาล็อก
                  </p>
                </div>

                {/* Modulation type selector */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 font-bold block">1. เลือกประเภทการแปลงสัญญาณ (Modulation Type):</span>
                  <div className="flex flex-col gap-2">
                    {[
                      { type: 'ASK', label: 'ASK (Amplitude Shift Keying)', desc: 'ปรับยอดความสูงคลื่น (Amplitude)' },
                      { type: 'FSK', label: 'FSK (Frequency Shift Keying)', desc: 'ปรับความเร็วความถี่คลื่น (Frequency)' },
                      { type: 'PSK', label: 'PSK (Phase Shift Keying)', desc: 'สับมุมเฟสองศาของยอดคลื่น (Phase)' }
                    ].map(mod => (
                      <button
                        key={mod.type}
                        onClick={() => setModulationType(mod.type)}
                        className={`p-2.5 rounded-lg text-left cursor-pointer transition-all border ${
                          modulationType === mod.type
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="text-xs block">{mod.label}</span>
                        <span className="text-[8.5px] font-normal text-slate-500 leading-none">{mod.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-[8.5px] text-slate-500 pt-2 font-mono leading-tight">
                * โมเด็มแปลงจาก สัญญาณดิจิทัล (0/1) ใน LAN ➔ สัญญาณอนาล็อก (Sine Wave) ในสายโทรศัพท์ภายนอก
              </div>
            </div>

            {/* Symmetrical SVG wave graph rendering */}
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative min-h-[300px] lg:col-span-2 text-left font-mono">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">LIVE ANALOG SINE WAVE GRAPH</span>
              
              <div className="my-auto space-y-4 pt-4">
                <div className="flex gap-2 justify-center font-bold text-xs text-white">
                  <span>บิตสตรีมนำเข้า (Binary bits):</span>
                  {modBitstream.map((bit, idx) => (
                    <span key={idx} className="bg-slate-800 px-2 py-0.5 rounded text-cyan-400">{bit}</span>
                  ))}
                </div>

                {/* SVG Graph representation */}
                <div className="w-full bg-slate-900/60 p-4 rounded-xl border border-slate-900 relative">
                  <svg viewBox="0 0 350 100" className="w-full h-24 overflow-visible">
                    {/* Center line reference */}
                    <line x1="0" y1="50" x2="350" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />

                    {/* Construct dynamic wave path based on bits and type */}
                    <path
                      d={(() => {
                        let pathD = 'M 0 50';
                        const segmentWidth = 350 / modBitstream.length; // 50 units per bit

                        modBitstream.forEach((bit, idx) => {
                          const startX = idx * segmentWidth;
                          const halfX = startX + segmentWidth / 2;
                          const endX = startX + segmentWidth;

                          if (modulationType === 'ASK') {
                            // Amplitude shift: 1 has big wave, 0 has tiny flat wave
                            const amp = bit === 1 ? 30 : 6;
                            pathD += ` Q ${startX + segmentWidth/4} ${50 - amp}, ${halfX} 50`;
                            pathD += ` Q ${startX + (3*segmentWidth)/4} ${50 + amp}, ${endX} 50`;
                          }
                          else if (modulationType === 'FSK') {
                            // Frequency shift: 1 has rapid waves, 0 has slow waves
                            if (bit === 1) {
                              const q = segmentWidth / 4;
                              pathD += ` Q ${startX + q/2} ${50 - 25}, ${startX + q} 50`;
                              pathD += ` Q ${startX + 1.5*q} ${50 + 25}, ${halfX} 50`;
                              pathD += ` Q ${startX + 2.5*q} ${50 - 25}, ${startX + 3*q} 50`;
                              pathD += ` Q ${startX + 3.5*q} ${50 + 25}, ${endX} 50`;
                            } else {
                              pathD += ` Q ${startX + segmentWidth/4} ${50 - 25}, ${halfX} 50`;
                              pathD += ` Q ${startX + (3*segmentWidth)/4} ${50 + 25}, ${endX} 50`;
                            }
                          }
                          else if (modulationType === 'PSK') {
                            // Phase shift: 1 starts up, 0 starts down
                            const phaseMult = bit === 1 ? 1 : -1;
                            pathD += ` Q ${startX + segmentWidth/4} ${50 - 25 * phaseMult}, ${halfX} 50`;
                            pathD += ` Q ${startX + (3*segmentWidth)/4} ${50 + 25 * phaseMult}, ${endX} 50`;
                          }
                        });

                        return pathD;
                      })()}
                      fill="none"
                      stroke="#22D3EE"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="flex justify-between text-[8px] text-slate-500">
                  <span>0 Hz (ขอบล่างบอร์ด)</span>
                  <span>ความถี่ที่ส่งสัญญาณ: {modulationType === 'FSK' ? '1200 / 2200 Baud' : '1200 Baud'}</span>
                  <span>100% Modulated (ขอบบนบอร์ด)</span>
                </div>
              </div>

              <div className="text-[9.5px] leading-relaxed text-slate-400 font-sans border-t border-slate-900 pt-3">
                💡 <strong>วิเคราะห์กราฟ:</strong> การเลือกใช้ **{modulationType}** จะสับรูปแบบโครงสร้าง Sine Wave อนาล็อกสอดคล้องกับเลขบิตกระแสไฟฟ้า 0 หรือ 1 ที่ป้อนเข้ามาอย่างสมบูรณ์ 100%
              </div>
            </div>
          </div>
        )}

      </div>
    </SimulatorShell>
  );
}
