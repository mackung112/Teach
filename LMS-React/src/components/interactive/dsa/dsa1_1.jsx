import React, { useState } from 'react';
import {
  Cpu,
  Database,
  Binary,
  Layers,
  HelpCircle,
  Activity,
  ArrowRight,
  Play,
  RotateCcw,
  Info,
  Sparkles,
  Zap,
  CheckCircle,
  Code
} from 'lucide-react';
import {
  AmbientBackdrop,
  OptionSelector,
  ConceptCard,
  SectionBlock,
  QuizEngine
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

// ─── RAM Grid Coordinates ───
// Col c: 0, 1, 2, 3  -->  x = c * 96 + 16
// Row r: 0, 1, 2, 3  -->  y = r * 96 + 16
// Geometric Center:
// cx = c * 96 + 56
// cy = r * 96 + 56

export default function DSA1_1() {
  // State for Virtual RAM Allocator
  const [allocationMode, setAllocationMode] = useState('primitive');

  // Memory Cell definitions for the 4x4 RAM
  // Addr: 0x1000 to 0x100F
  const cells = [
    { index: 0, address: '0x1000', row: 0, col: 0 },
    { index: 1, address: '0x1001', row: 0, col: 1 },
    { index: 2, address: '0x1002', row: 0, col: 2 },
    { index: 3, address: '0x1003', row: 0, col: 3 },
    { index: 4, address: '0x1004', row: 1, col: 0 },
    { index: 5, address: '0x1005', row: 1, col: 1 },
    { index: 6, address: '0x1006', row: 1, col: 2 },
    { index: 7, address: '0x1007', row: 1, col: 3 },
    { index: 8, address: '0x1008', row: 2, col: 0 },
    { index: 9, address: '0x1009', row: 2, col: 1 },
    { index: 10, address: '0x100A', row: 2, col: 2 },
    { index: 11, address: '0x100B', row: 2, col: 3 },
    { index: 12, address: '0x100C', row: 3, col: 0 },
    { index: 13, address: '0x100D', row: 3, col: 1 },
    { index: 14, address: '0x100E', row: 3, col: 2 },
    { index: 15, address: '0x100F', row: 3, col: 3 }
  ];

  // Dynamic RAM Cell renderer config based on allocation mode
  const getCellConfig = (cell) => {
    if (allocationMode === 'primitive') {
      // Scattered independent variables
      if (cell.index === 1) {
        return {
          active: true,
          label: 'age = 18',
          subLabel: '(int: 4B)',
          colorClass: 'bg-emerald-500/20 border-emerald-500 text-emerald-400',
          textColor: 'text-emerald-300'
        };
      }
      if (cell.index === 7) {
        return {
          active: true,
          label: 'grade = \'A\'',
          subLabel: '(char: 1B)',
          colorClass: 'bg-cyan-500/20 border-cyan-500 text-cyan-400',
          textColor: 'text-cyan-300'
        };
      }
      if (cell.index === 8) {
        return {
          active: true,
          label: 'status = True',
          subLabel: '(bool: 1B)',
          colorClass: 'bg-amber-500/20 border-amber-500 text-amber-400',
          textColor: 'text-amber-300'
        };
      }
    } else if (allocationMode === 'array') {
      // Contiguous Sequential block (index 4 to 7)
      if (cell.index >= 4 && cell.index <= 7) {
        const arrIdx = cell.index - 4;
        const values = [10, 20, 30, 40];
        return {
          active: true,
          label: `arr[${arrIdx}] = ${values[arrIdx]}`,
          subLabel: `(Index: ${arrIdx})`,
          colorClass: 'bg-indigo-600/30 border-indigo-500 text-indigo-200 shadow-[0_0_15px_rgba(79,70,229,0.25)]',
          textColor: 'text-indigo-100 font-semibold'
        };
      }
    } else if (allocationMode === 'linked_list') {
      // Non-contiguous Scattered block linked via pointers
      // Head: 0x1002 (val: 95) -> 0x100B (val: 73) -> 0x1005 (val: 88) -> 0x100E (val: 54, next: Null)
      if (cell.index === 2) {
        return {
          active: true,
          label: 'Node (Head)',
          subLabel: 'Val: 95 | Ptr: 0x100B',
          colorClass: 'bg-violet-600/30 border-violet-500 text-violet-200 ring-2 ring-violet-500/30',
          textColor: 'text-violet-100'
        };
      }
      if (cell.index === 11) {
        return {
          active: true,
          label: 'Node',
          subLabel: 'Val: 73 | Ptr: 0x1005',
          colorClass: 'bg-violet-600/25 border-violet-500/80 text-violet-200',
          textColor: 'text-violet-100'
        };
      }
      if (cell.index === 5) {
        return {
          active: true,
          label: 'Node',
          subLabel: 'Val: 88 | Ptr: 0x100E',
          colorClass: 'bg-violet-600/25 border-violet-500/80 text-violet-200',
          textColor: 'text-violet-100'
        };
      }
      if (cell.index === 14) {
        return {
          active: true,
          label: 'Node (Tail)',
          subLabel: 'Val: 54 | Ptr: Null',
          colorClass: 'bg-violet-600/30 border-violet-500 text-violet-200 shadow-[0_0_10px_rgba(139,92,246,0.2)]',
          textColor: 'text-violet-100'
        };
      }
    }

    return {
      active: false,
      label: 'ว่างเปล่า (Empty)',
      subLabel: '0x0000',
      colorClass: 'bg-slate-900/40 border-slate-800 text-slate-600',
      textColor: 'text-slate-500'
    };
  };

  const currentBlobs = [
    { color: 'bg-indigo-500/10', size: 'w-[45rem] h-[45rem]', position: '-top-40 -left-40', opacity: 'opacity-40' },
    { color: 'bg-cyan-500/5', size: 'w-[40rem] h-[40rem]', position: 'top-1/4 -right-20', opacity: 'opacity-30' },
    { color: 'bg-violet-500/10', size: 'w-[35rem] h-[35rem]', position: '-bottom-20 left-1/3', opacity: 'opacity-25' }
  ];

  const quizQuestions = [
    {
      title: 'ความหมายของโครงสร้างข้อมูล',
      desc: 'ข้อใดอธิบายความหมายและจุดประสงค์ของการใช้ "โครงสร้างข้อมูล" ในทางวิศวกรรมซอฟต์แวร์ได้ถูกต้องที่สุด?',
      tip: 'เน้นความมีระเบียบในคอมพิวเตอร์และการประมวลผลที่มีประสิทธิภาพ',
      options: [
        { key: 'A', text: 'การจัดระเบียบและจัดสรรพื้นที่หน่วยความจำสำหรับเขียนโค้ดสั้นลง', isCorrect: false },
        { key: 'B', text: 'วิธีการจัดเก็บและจัดความสัมพันธ์ของข้อมูลอย่างมีตรรกะเพื่อให้เข้าถึงและปรับแต่งได้อย่างรวดเร็ว', isCorrect: true },
        { key: 'C', text: 'การกำหนดชนิดตัวแปรให้เป็นเลขฐานสองเพื่อลดอัตราพลังงานซีพียู', isCorrect: false },
        { key: 'D', text: 'การเขียนฟังก์ชันประยุกต์ลูปเพื่อเชื่อมสายสัญญาณบอร์ดเมนบอร์ด', isCorrect: false }
      ]
    },
    {
      title: 'ประเภทของโครงสร้างข้อมูล',
      desc: 'ข้อมูลชนิดใดจัดเป็นโครงสร้างข้อมูลแบบเชิงเส้น (Linear Data Structure)?',
      tip: 'Linear Data Structure จะมีความสัมพันธ์ต่อกันแบบ 1-to-1 จากโหนดแรกไปโหนดถัดไป',
      options: [
        { key: 'A', text: 'โครงสร้างแบบต้นไม้ (Tree)', isCorrect: false },
        { key: 'B', text: 'โครงสร้างแบบกราฟ (Graph)', isCorrect: false },
        { key: 'C', text: 'แถวคิว (Queue) และสแต็ก (Stack)', isCorrect: true },
        { key: 'D', text: 'ข้อมูลแบบพรีมิทีฟ (float)', isCorrect: false }
      ]
    },
    {
      title: 'การเข้าถึงข้อมูลแบบ Array',
      desc: 'ทำไมโครงสร้างข้อมูลแบบ Array จึงเข้าถึงข้อมูลแบบสุ่ม (Random Access) ณ ดัชนีใด ๆ ได้ภายในความเร็ว O(1)?',
      tip: 'Array จองหน่วยความจำแบบ Contiguous (ต่อเนื่องกัน) ทำให้คำนวณแอดเดรสได้ง่าย',
      options: [
        { key: 'A', text: 'เพราะข้อมูลมีขนาดยืดหยุ่นปรับได้ตลอดเวลา', isCorrect: false },
        { key: 'B', text: 'เพราะองค์ประกอบถูกจองในแอดเดรส RAM ต่อเนื่องกัน ทำให้คำนวณตำแหน่งได้ทันที', isCorrect: true },
        { key: 'C', text: 'เพราะตัวประมวลผลลูปจะใช้ Big O ขนาดเล็กสแกนทีละช่อง', isCorrect: false },
        { key: 'D', text: 'เพราะมี Pointer ชี้ข้ามช่องแบบพรีมิทีฟ', isCorrect: false }
      ]
    },
    {
      title: 'ลักษณะเด่นของ Linked List',
      desc: 'สถาปัตยกรรมแบบ Linked List แตกต่างจาก Array ในมิติของการจองแรม (Memory Allocation) อย่างไร?',
      tip: 'Linked List ไม่ต้องการแรมที่ต่อเนื่องกัน แต่ต้องอาศัยที่อยู่พอยน์เตอร์เชื่อมความสัมพันธ์',
      options: [
        { key: 'A', text: 'ใช้แรมต่อเนื่องกันทำให้ปรับขนาดได้ไวกว่า O(1)', isCorrect: false },
        { key: 'B', text: 'จองพื้นที่กระจัดกระจายแบบไม่ต่อเนื่อง (Non-contiguous) โดยโยงค่าด้วย Next Address Pointer', isCorrect: true },
        { key: 'C', text: 'จัดสรรพื้นที่เก็บเฉพาะค่าคงที่ที่เป็นตัวอักษรสตริงใน ALU เท่านั้น', isCorrect: false },
        { key: 'D', text: 'บังคับให้เก็บเฉพาะค่าพรีมิทีฟเชิงเดี่ยวที่หัวแถวเท่านั้น', isCorrect: false }
      ]
    },
    {
      title: 'ข้อจำกัดของโครงสร้างแบบไม่ต่อเนื่อง',
      desc: 'ข้อใดคือข้อจำกัดที่เด่นชัดของการจัดสรรหน่วยความจำแบบไม่ต่อเนื่อง (Linked List) เมื่อเทียบกับแบบต่อเนื่อง (Array)?',
      tip: 'ใน Linked List เราไม่มี Random Access และต้องแบ่งพื้นที่เก็บแอดเดรส',
      options: [
        { key: 'A', text: 'ไม่สามารถเพิ่มข้อมูลที่ท้ายแถวได้', isCorrect: false },
        { key: 'B', text: 'สูญเสียความเร็ว Random Access และมีภาระพื้นที่เก็บแอดเดรสพอยน์เตอร์ชี้โหนดถัดไป', isCorrect: true },
        { key: 'C', text: 'ระบบจะไม่อนุญาตให้ใช้เลขจำนวนเต็มในโครงสร้างข้อมูลเชิงเส้น', isCorrect: false },
        { key: 'D', text: 'ทำให้ไม่สามารถพัฒนาซอฟต์แวร์ขนาดใหญ่บนระบบ 64-bit ได้', isCorrect: false }
      ]
    }
  ];

  const teacherTaskText = `ใบงานวิชาการที่ 1.1: การประเมินโครงสร้างและพฤติกรรมการจัดเก็บข้อมูลบนหน่วยความจำ

คำสั่ง:
1. ให้นักเรียนวิเคราะห์และเขียนอธิบายความแตกต่างระหว่างการจัดสรรหน่วยความจำแบบต่อเนื่อง (Contiguous Allocation) และแบบไม่ต่อเนื่อง (Non-contiguous Allocation)
2. อ้างอิงจากแบบจำลองแรมเสมือน (Physical RAM Allocator):
   - หากต้องการสร้างตัวเก็บข้อมูลจำนวน 100,000 ชิ้น เพื่อรองรับการค้นหาข้อมูลอย่างสม่ำเสมอ ณ ตำแหน่งสุ่ม (Random Access) นักเรียนจะคัดเลือกโครงสร้างแบบใด เพราะเหตุใด?
   - ในกรณีที่ระบบมีทรัพยากรหน่วยความจำแรมจำกัดและกระจายตัวไม่ต่อเนื่อง (Fragmented Memory) โครงสร้างข้อมูลแบบใดจะมีความได้เปรียบ?
3. สรุปคำตอบพร้อมวิเคราะห์ผลลัพธ์ลงในเอกสารรายงานรูปแบบ Markdown ความยาวอย่างน้อย 1 หน้ากระดาษ เอ4 ส่งท้ายบทเรียน`;

  return (
    <div className="w-full relative">
      {/* 1️⃣ Layer 1: Ambient Backdrop */}
      <AmbientBackdrop blobs={currentBlobs} blur="blur-[130px]" />

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* Section 1: Introduction to Data Structures */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              บทเรียนวิชาการ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ความหมายและบทบาทของโครงสร้างข้อมูล
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              ในทางวิทยาการคอมพิวเตอร์และวิศวกรรมซอฟต์แวร์ <span className="bg-indigo-50 border border-indigo-200/60 text-indigo-900 px-2 py-0.5 rounded text-[14.5px] font-mono font-semibold">โครงสร้างข้อมูล (Data Structure)</span> คือ วิธีการที่เป็นระบบในการจัดระเบียบ จัดกลุ่ม และเก็บรักษาข้อมูลในหน่วยความจำชั่วคราว (RAM) ของเครื่องคอมพิวเตอร์ เพื่อให้การเขียนโปรแกรมและการนำข้อมูลเหล่านั้นไปเข้าสู่ระบบประมวลผล (Algorithms) สามารถเข้าถึง ค้นหา แก้ไข และจัดทำได้อย่างรวดเร็ว ถูกต้อง และประหยัดทรัพยากรหน่วยประมวลผลกลางมากที่สุด
            </p>

            <div className="bg-indigo-50/60 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-5 border-l-[3px] border-l-indigo-600">
              <p className="text-zinc-700 text-[15px] md:text-base leading-relaxed font-normal">
                หากเปรียบเทียบข้อมูลเป็น **หนังสือ** หน่วยความจำคอมพิวเตอร์คือ **ห้องสมุดขนาดใหญ่** 
                การโยนหนังสือกองระเกะระกะบนพื้นคือการจัดเก็บอย่างไร้โครงสร้าง ในขณะที่การจัดวางบนหมวดหมู่แยกชั้น วางบนตู้ดัชนี หรือมีระบบหมายเลขชี้พิกัด คือรูปแบบ **โครงสร้างข้อมูล** ที่ทำให้พนักงานหาหนังสือแต่ละเล่มได้เจอทันทีโดยไม่ต้องรื้อค้นหนังสือทั้งห้องสมุด
              </p>
            </div>

            {/* Semantic Concept Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <ConceptCard
                symbol="Data Access"
                title="การเข้าถึงและค้นคืนข้อมูล"
                description="วิธีการดึงข้อมูลจากแรมโดยอิงตามรหัสดัชนี (Index) หรือคีย์ (Key) ช่วยลดขั้นตอนการทำงานของซีพียู"
                accent="indigo"
              />
              <ConceptCard
                symbol="Data Insertion"
                title="การปรับเปลี่ยนเชิงโครงสร้าง"
                description="กระบวนการแทรกโหนด (Insert) หรือการนำข้อมูลออก (Delete) อย่างมีความปลอดภัยและยืดหยุ่นต่อหน่วยความจำ"
                accent="cyan"
              />
              <ConceptCard
                symbol="Memory Optimization"
                title="ความคุ้มค่าของการใช้แรม"
                description="การลดภาระความหนาแน่นส่วนเกิน (Overhead Space) เพื่อให้พื้นที่หน่วยความจำสามารถประมวลผลได้ราบรื่น"
                accent="violet"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Data Types Hierarchy (Primitive vs Composite) */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              โครงสร้างข้อมูลพื้นฐาน
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ระดับชั้นของประเภทข้อมูล
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              เพื่อให้คอมพิวเตอร์ประเมินและบริหารแรมได้อย่างแม่นยำ ข้อมูลจึงถูกแบ่งออกเป็นระดับตามความซับซ้อน ได้แก่ <span className="bg-indigo-50 border border-indigo-200/60 text-indigo-900 px-2 py-0.5 rounded text-[14.5px] font-mono font-semibold">Primitive Data Types</span> ซึ่งจัดเป็นข้อมูลชนิดเดี่ยวที่ไม่สามารถแบ่งแยกโครงสร้างย่อยลงไปได้อีก และ <span className="bg-indigo-50 border border-indigo-200/60 text-indigo-900 px-2 py-0.5 rounded text-[14.5px] font-mono font-semibold">Composite Data Types</span> ที่เกิดจากการจัดกลุ่มนำข้อมูลหลายตัวมารวบยอดเชื่อมโยงความสัมพันธ์กัน
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
              <SectionBlock
                title="ข้อมูลแบบเชิงเดี่ยว (Primitive Data Types)"
                variant="default"
                accent="emerald"
              >
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    จัดเป็นชนิดข้อมูลพื้นฐานขั้นต่ำสุดที่ระบบปฏิบัติการคอมพิวเตอร์และชิปเซตประมวลผลรู้จักได้ทันทีในระดับเลขฐานสอง มักใช้พื้นที่ RAM ในขนาดคงที่แน่นอน
                  </p>
                  <ul className="space-y-2.5 text-slate-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="p-1 rounded bg-emerald-50 text-emerald-600 mt-0.5 shrink-0">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </span>
                      <span><strong>Integer (int):</strong> เลขจำนวนเต็มไม่มีทศนิยม (เช่น 42) ใช้พื้นที่จัดเก็บ 4 ไบต์ (32-bit) หรือ 8 ไบต์ (64-bit)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="p-1 rounded bg-emerald-50 text-emerald-600 mt-0.5 shrink-0">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </span>
                      <span><strong>Floating Point (float):</strong> ตัวเลขที่มีจุดทศนิยมสำหรับการคำนวณทางวิทยาศาสตร์ (เช่น 3.14)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="p-1 rounded bg-emerald-50 text-emerald-600 mt-0.5 shrink-0">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </span>
                      <span><strong>Character (char):</strong> อักขระเดี่ยว ๆ ตามตาราง ASCII หรือ Unicode (เช่น \'A\') ใช้พื้นที่ 1-2 ไบต์</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="p-1 rounded bg-emerald-50 text-emerald-600 mt-0.5 shrink-0">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </span>
                      <span><strong>Boolean (bool):</strong> ค่าสถานะตรรกะความจริงทางคณิตศาสตร์ มีเพียง True หรือ False ใช้พื้นที่ 1 ไบต์</span>
                    </li>
                  </ul>
                </div>
              </SectionBlock>

              <SectionBlock
                title="ข้อมูลแบบโครงสร้างเชิงประกอบ (Composite / Structured)"
                variant="default"
                accent="indigo"
              >
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    โครงสร้างที่เกิดจากการนำชนิดข้อมูลแบบพรีมิทีฟหลายตัวมาประกอบกันตามรูปแบบตรรกะ เพื่อให้เกิดระบบระเบียนหรือการเข้าถึงข้อมูลที่สมบูรณ์ขึ้น
                  </p>
                  <ul className="space-y-2.5 text-slate-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="p-1 rounded bg-indigo-50 text-indigo-600 mt-0.5 shrink-0">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </span>
                      <span><strong>Array (อาเรย์):</strong> การรวมกลุ่มชนิดข้อมูลประเภทเดียวกัน เรียงลำดับติดกันในหน่วยความจำ เข้าถึงด้วยอินเด็กซ์ดัชนี</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="p-1 rounded bg-indigo-50 text-indigo-600 mt-0.5 shrink-0">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </span>
                      <span><strong>Record / Struct:</strong> การรวบรวมฟิลด์ข้อมูลต่างชนิดกันเข้ามาบันทึกรวมเป็นวัตถุชิ้นเดียวกัน (เช่น ข้อมูลพนักงานประกอบด้วย ชื่อ อายุ และเงินเดือน)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="p-1 rounded bg-indigo-50 text-indigo-600 mt-0.5 shrink-0">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </span>
                      <span><strong>Linked List (รายการเชื่อมโยง):</strong> การจัดกลุ่มข้อมูลที่อยู่ต่างตำแหน่งแรมกัน แต่มีพอยน์เตอร์ลิงก์เชื่อมความสัมพันธ์เดินหน้า</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="p-1 rounded bg-indigo-50 text-indigo-600 mt-0.5 shrink-0">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </span>
                      <span><strong>Abstract Data Types (ADT):</strong> โครงสร้างเชิงตรรกะขั้นสูงที่ควบคุมลักษณะการเข้าถึง เช่น Stack, Queue หรือ Dictionary</span>
                    </li>
                  </ul>
                </div>
              </SectionBlock>
            </div>
          </div>
        </section>

        {/* Section 3: Physical RAM Allocator Simulator */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ตัวจำลองหน่วยความจำเสมือน
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตารางจัดสรรหน่วยความจำและตัวจำลอง RAM
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              เพื่อให้เข้าใจแจ่มชัดถึงความแตกต่างของพฤติกรรมการจัดวางข้อมูลจริงบนชิปแรม ขอให้นักเรียนเลือกคลิกปรับเปลี่ยนโหมดของ <span className="bg-indigo-50 border border-indigo-200/60 text-indigo-900 px-2 py-0.5 rounded text-[14.5px] font-mono font-semibold">ตัวจำลองแรมเสมือน (Physical RAM Allocator)</span> ด้านล่าง เพื่อศึกษาการเรียงตัวของบิตข้อมูล แอดเดรส และเส้นสัญญาณเชื่อมโยงแบบเรียลไทม์
            </p>

            {/* High-Fidelity Simulator Shell */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Control Panel (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">CONTROL PANEL</span>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-white">
                    <Cpu className="w-5 h-5 text-indigo-400" />
                    <h4 className="text-lg font-bold">เลือกลักษณะการจัดสรรแรม</h4>
                  </div>

                  {/* Option Selector Pill Mode */}
                  <OptionSelector
                    options={[
                      { value: 'primitive', label: 'ข้อมูลเชิงเดี่ยว (Primitive)' },
                      { value: 'array', label: 'อาเรย์ต่อเนื่อง (Contiguous Array)' },
                      { value: 'linked_list', label: 'ลิสต์กระจายตัว (Linked List)' }
                    ]}
                    value={allocationMode}
                    onChange={(val) => setAllocationMode(val)}
                    cols={2}
                    mode="pill"
                    activeColor="bg-indigo-600 border-indigo-500 text-white font-bold shadow-md shadow-indigo-500/20"
                  />

                  {/* Narration Description Box */}
                  <div className="bg-black/40 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold font-mono">
                      <Info className="w-4 h-4" /> คำอธิบายพฤติกรรมหน่วยความจำ:
                    </div>
                    {allocationMode === 'primitive' && (
                      <p className="text-slate-300 text-sm leading-relaxed">
                        ข้อมูลเดี่ยวประเภท **Integer**, **Character** และ **Boolean** จะจองช่องแรมตามขนาดของชนิดข้อมูล โดยจัดเก็บในที่อยู่ที่ว่างโดยอิสระ กระจัดกระจาย ไม่ขึ้นตรงต่อกัน ไม่มีโครงสร้างเชื่อมต่อความสัมพันธ์ เหมาะแก่การเป็นตัวแปรประมวลผลทั่วไป
                      </p>
                    )}
                    {allocationMode === 'array' && (
                      <p className="text-slate-300 text-sm leading-relaxed">
                        **Contiguous Allocation (การจัดสรรแบบต่อเนื่อง):** แรมจะล็อกพิกัดจองช่องยาวเรียงลำดับต่อเนื่องติดกัน 4 ช่องทันที การมีแอดเดรสเรียงชิดกันทำให้นักเรียนใช้ลอจิกคณิตศาสตร์บวกดัชนีเข้าถึงค่าใด ๆ ได้ทันทีในเวลา **O(1)** แต่มีข้อเสียคือปรับเพิ่มลดขนาดได้ยาก และต้องการแรมผืนใหญ่ต่อเนื่อง
                      </p>
                    )}
                    {allocationMode === 'linked_list' && (
                      <p className="text-slate-300 text-sm leading-relaxed">
                        **Non-contiguous Allocation (การจัดสรรแบบไม่ต่อเนื่อง):** ข้อมูลจัดวางกระจายตัวตามช่องที่ว่างในแรมอย่างมีอิสระ แต่ละเซลล์จะบรรจุค่าข้อมูลส่วนหนึ่ง และแอดเดรสของช่องถัดไป (Pointer) อีกส่วนหนึ่ง การเชื่อมโยงนี้เรียกว่า **Linked List** ซึ่งย่อขยายขนาดจัดเก็บได้อิสระ แต่สูญเสียความสามารถเข้าถึงแบบสุ่ม (ต้องท่องไปทีละโหนด)
                      </p>
                    )}
                  </div>
                </div>

                {/* Micro metrics */}
                <div className="mt-8 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                    <span className="block text-[10px] text-slate-500 font-mono tracking-wider">BIG O (ACCESS)</span>
                    <span className="text-lg font-bold font-mono text-white">
                      {allocationMode === 'array' ? 'O(1) Direct' : allocationMode === 'linked_list' ? 'O(N) Traversal' : 'O(1) Independent'}
                    </span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                    <span className="block text-[10px] text-slate-500 font-mono tracking-wider">RAM EFFICIENCY</span>
                    <span className="text-lg font-bold font-mono text-white">
                      {allocationMode === 'array' ? '100% (Dense)' : allocationMode === 'linked_list' ? '70% (Pointer Cost)' : '95%'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Visualizer Panel (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] p-6 border border-white/5 shadow-2xl relative flex flex-col items-center justify-center min-h-[450px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">VISUALIZER SCREEN</span>
                <span className="text-[9px] font-mono text-indigo-400 absolute top-3 right-4 font-bold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 animate-pulse" /> 16-CELL PHYSICAL RAM SIMULATOR
                </span>

                <div className="relative w-[384px] h-[384px] select-none mt-4">
                  {/* SVG Overlay for Connections (Only in Linked List Mode) */}
                  {allocationMode === 'linked_list' && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                      <defs>
                        <marker
                          id="arrow-violet"
                          viewBox="0 0 10 10"
                          refX="26"
                          refY="5"
                          markerWidth="6"
                          markerHeight="6"
                          orient="auto-start-reverse"
                        >
                          <path d="M 0 1 L 9 5 L 0 9 z" fill="#8B5CF6" />
                        </marker>
                      </defs>

                      {/* Path 1: Cell 2 (cx: 248, cy: 56) to Cell 11 (cx: 344, cy: 248) */}
                      <path
                        d="M 248 56 L 344 248"
                        fill="none"
                        stroke="#8B5CF6"
                        strokeWidth="3.5"
                        strokeDasharray="6,4"
                        markerEnd="url(#arrow-violet)"
                        className="animate-[dash_20s_linear_infinite]"
                      />

                      {/* Path 2: Cell 11 (cx: 344, cy: 248) to Cell 5 (cx: 152, cy: 152) */}
                      <path
                        d="M 344 248 L 152 152"
                        fill="none"
                        stroke="#8B5CF6"
                        strokeWidth="3.5"
                        strokeDasharray="6,4"
                        markerEnd="url(#arrow-violet)"
                        className="animate-[dash_20s_linear_infinite]"
                      />

                      {/* Path 3: Cell 5 (cx: 152, cy: 152) to Cell 14 (cx: 248, cy: 344) */}
                      <path
                        d="M 152 152 L 248 344"
                        fill="none"
                        stroke="#8B5CF6"
                        strokeWidth="3.5"
                        strokeDasharray="6,4"
                        markerEnd="url(#arrow-violet)"
                        className="animate-[dash_20s_linear_infinite]"
                      />
                    </svg>
                  )}

                  {/* HTML Grid of Cells placed with exact pixel offsets */}
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-4 p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 shadow-inner">
                    {cells.map((cell) => {
                      const cfg = getCellConfig(cell);
                      return (
                        <div
                          key={cell.index}
                          className={`rounded-xl border p-2 flex flex-col justify-between items-center transition-all duration-300 ${cfg.colorClass}`}
                        >
                          {/* Cell Address Header */}
                          <div className="w-full flex justify-between items-center text-[9px] font-mono opacity-60">
                            <span>[{cell.index}]</span>
                            <span>{cell.address}</span>
                          </div>

                          {/* Cell Main Value & Metadata */}
                          <div className="text-center py-1 flex flex-col items-center">
                            <span className={`text-[12.5px] font-mono leading-tight truncate max-w-[70px] ${cfg.textColor}`}>
                              {cfg.active ? cfg.label.split(' = ')[1] || cfg.label : 'Null'}
                            </span>
                            <span className="text-[8px] font-mono opacity-50 block mt-0.5">
                              {cfg.active ? cfg.label.split(' = ')[0] : 'EMPTY'}
                            </span>
                          </div>

                          {/* Bottom descriptive code label */}
                          <div className="text-[7.5px] font-mono tracking-wide opacity-70 truncate max-w-full text-center">
                            {cfg.subLabel}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Subtitle legends */}
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-slate-900 border border-slate-800" />
                    <span>แอดเดรสว่าง (Null)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-indigo-600/30 border border-indigo-500" />
                    <span>อาเรย์เดนส์ (Dense Array)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-violet-600/30 border border-violet-500" />
                    <span>โหนดเชื่อมลิสต์ (Linked Node)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Gamification Quiz Engine */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ทดสอบสมรรถนะ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบประเมินและทบทวนความรู้ประจำหน่วยเรียน
            </h3>
          </div>

          <div className="pt-2">
            <QuizEngine
              title="แบบทดสอบตรรกะความหมายและบทบาทโครงสร้างข้อมูล"
              description="ตอบคำถามวิชาการเพื่อสะท้อนความเข้าใจในหลักการจัดสรรหน่วยความจำเบื้องต้นให้ผ่านเกณฑ์คะแนนสะสม"
              levels={quizQuestions}
              accentColor="from-teal-600/20 to-cyan-500/10"
              icon={<Binary className="w-6 h-6 text-indigo-400" />}
            />
          </div>
        </section>

        {/* Section 5: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ภารกิจส่งงาน: วิเคราะห์แบบจำลองแรมเสมือนจริงในอุตสาหกรรม"
          taskText={teacherTaskText}
        />
      </main>
    </div>
  );
}
