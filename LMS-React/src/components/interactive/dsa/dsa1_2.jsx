import React, { useState, useEffect } from 'react';
import {
  Activity,
  Sliders,
  Play,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Info,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  Grid,
  GitCommit,
  Layers,
  Database
} from 'lucide-react';
import {
  AmbientBackdrop,
  OptionSelector,
  ConceptCard,
  SectionBlock,
  QuizEngine
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

export default function DSA1_2() {
  // --- Simulator 1: RAM Space & Overhead Analyzer States ---
  const [dataCount, setDataCount] = useState(100); // N elements from 10 to 1000

  // Calculate memory usage
  // Array: N * 4 bytes
  const arrayBytes = dataCount * 4;
  // Linked List: N * (4 bytes data + 8 bytes pointer) = N * 12 bytes
  const listBytes = dataCount * 12;
  const overheadBytes = dataCount * 8; // The 8-byte pointer overhead on 64-bit OS

  // --- Simulator 2: Operations Performance Visualizer States ---
  const [simMode, setSimMode] = useState('array'); // array | linked_list
  const [simStep, setSimStep] = useState(0);
  const [cpuCycles, setCpuCycles] = useState(0);

  // Reset simulator 2
  const handleResetSim2 = () => {
    setSimStep(0);
    setCpuCycles(0);
  };

  // Next step in simulator 2
  const handleStepSim2 = () => {
    if (simMode === 'array') {
      if (simStep < 5) {
        setSimStep((s) => s + 1);
        setCpuCycles((c) => c + 1);
      }
    } else {
      if (simStep < 3) {
        setSimStep((s) => s + 1);
        setCpuCycles((c) => c + 1);
      }
    }
  };

  const quizLevels = [
    {
      title: 'ความซับซ้อนด้านเวลา (Time Complexity)',
      desc: 'ในเชิง Time Complexity การค้นหาข้อมูลตามลำดับ (Linear Search) ในโครงสร้างข้อมูลแบบอาเรย์ จะใช้เวลาเฉลี่ยในกรณีแย่ที่สุด (Worst Case) เท่าใด?',
      tip: 'ในกรณีแย่ที่สุด เราต้องสแกนตั้งแต่ตัวแรกไปจนถึงตัวสุดท้าย N ตัว',
      options: [
        { key: 'A', text: 'O(1)', isCorrect: false },
        { key: 'B', text: 'O(log N)', isCorrect: false },
        { key: 'C', text: 'O(N)', isCorrect: true },
        { key: 'D', text: 'O(N²)', isCorrect: false }
      ]
    },
    {
      title: 'มิติด้านพื้นที่จัดเก็บ (Space Complexity)',
      desc: 'ทำไม Linked List จึงใช้พื้นที่หน่วยความจำแรม (RAM Space) มากกว่า Array ในการเก็บข้อมูลตัวเลขปริมาณที่เท่ากัน?',
      tip: 'คิดถึงส่วนเสริมของแต่ละโหนดในระบบปฏิบัติการ 64-bit',
      options: [
        { key: 'A', text: 'เพราะ Linked List บังคับเก็บข้อมูลแบบทศนิยม', isCorrect: false },
        { key: 'B', text: 'เพราะแต่ละโหนดต้องแบ่งแรมไปเก็บ Address Pointer อีก 8 ไบต์ชี้โหนดถัดไป', isCorrect: true },
        { key: 'C', text: 'เพราะ Array มีความเร็วเฉลี่ยเร็วกว่าซีพียู', isCorrect: false },
        { key: 'D', text: 'เพราะหน่วยเก็บข้อมูล Linked List ปิดกั้นการจองหน่วยความจำแบบไดนามิก', isCorrect: false }
      ]
    },
    {
      title: 'ประสิทธิภาพการแทรกที่หัว (Insert at Index 0)',
      desc: 'หากซอฟต์แวร์ของนักเรียนมีความจำเป็นต้องทำการแทรกข้อมูลใหม่ที่ตำแหน่งหัวแถว (Index 0) อยู่ตลอดเวลา โครงสร้างข้อมูลใดมีประสิทธิภาพความเร็วที่เหมาะสมที่สุด?',
      tip: 'Array ต้องเลื่อนข้อมูลทุกตัว O(N) ส่วน Linked List แค่สลับการชี้ O(1)',
      options: [
        { key: 'A', text: 'Array เพราะใช้ Random Access O(1)', isCorrect: false },
        { key: 'B', text: 'Linked List เพราะแทรกค่า O(1) โดยเพียงปรับพอยน์เตอร์ชี้ ไม่ต้องขยับข้อมูลเดิม', isCorrect: true },
        { key: 'C', text: 'Stack เพราะจองแรมกว้างที่สุด', isCorrect: false },
        { key: 'D', text: 'Primitive types เพราะทำงานได้อิสระ', isCorrect: false }
      ]
    },
    {
      title: 'ความคุ้มค่าแบบ Time-Space Tradeoff',
      desc: 'ข้อใดอธิบายหลักการของ "Time-Space Tradeoff" ในทางสถาปัตยกรรมซอฟต์แวร์ได้ชัดเจนที่สุด?',
      tip: 'การได้บางสิ่งและต้องสละบางสิ่งเพื่อสมดุลประสิทธิภาพ',
      options: [
        { key: 'A', text: 'การเพิ่มความเร็วการทำงานของระบบ โดยแลกกับการใช้พื้นที่เก็บข้อมูลที่เพิ่มขึ้น หรือกลับกัน', isCorrect: true },
        { key: 'B', text: 'การบังคับให้โปรแกรมเขียนโค้ดสั้นลงเพื่อให้ซีพียูทำงานได้ในเวลาคงที่', isCorrect: false },
        { key: 'C', text: 'การแปลงค่าพิกัดความต่างเวลาแรมเพื่อให้จองเนื้อที่ถาวร', isCorrect: false },
        { key: 'D', text: 'การบีบอัดไฟล์ให้อัตราลดลงโดยไม่ส่งผลต่อแรม', isCorrect: false }
      ]
    },
    {
      title: 'Pointer Overhead บนสถาปัตยกรรม 64-bit',
      desc: 'ในสภาวะการใช้งานระบบปฏิบัติการ 64-bit แอดเดรสพอยน์เตอร์ชี้ตำแหน่งหน่วยความจำจะกินขนาดพื้นที่แรมโหนดละกี่ไบต์?',
      tip: 'ระบบ 64-bit คือแอดเดรสขนาด 64 บิต ซึ่งเท่ากับกี่ไบต์?',
      options: [
        { key: 'A', text: '2 ไบต์', isCorrect: false },
        { key: 'B', text: '4 ไบต์', isCorrect: false },
        { key: 'C', text: '8 ไบต์', isCorrect: true },
        { key: 'D', text: '16 ไบต์', isCorrect: false }
      ]
    }
  ];

  const teacherTaskText = `ใบงานวิชาการที่ 1.2: การวิเคราะห์เชิงปริมาณด้านประสิทธิภาพ Time-Space Complexity

คำสั่ง:
1. ให้นักเรียนตอบคำถามเชิงวิเคราะห์และคำนวณ:
   - สมมติว่าต้องการเก็บค่าข้อมูลเกรดตัวอักษรของนักเรียนจำนวน 500,000 คน (ข้อมูลอักขระใช้ 1 ไบต์)
   - หากใช้ Static Array (ขนาด 1 ไบต์ต่อช่อง) จะสิ้นเปลือง RAM ทั้งหมดกี่ไบต์?
   - หากใช้ Singly Linked List บนระบบ 64-bit (1 ไบต์เก็บข้อมูล + 8 ไบต์พอยน์เตอร์) จะสิ้นเปลือง RAM ทั้งหมดกี่ไบต์? และคิดเป็นภาระ Pointer Overhead กี่เปอร์เซ็นต์?
2. อ้างอิงจากตัวจำลอง Insert Visualizer:
   - ให้นักเรียนสรุปเหตุผลทางวิชาการและวาดผังการเปรียบเทียบ CPU cycles เมื่อแทรกค่าขนาดใหญ่ที่หัวแถวของ Array และ Linked List
3. เขียนรายงานบทวิเคราะห์เชิงวิศวกรรมนี้ส่งในรูปแบบ PDF หรือหน้าเอกสารมาร์กดาวน์เพื่อรับการประเมินคะแนนปลายภาคเรียน`;

  const currentBlobs = [
    { color: 'bg-cyan-500/10', size: 'w-[45rem] h-[45rem]', position: '-top-40 -right-40', opacity: 'opacity-40' },
    { color: 'bg-indigo-500/5', size: 'w-[40rem] h-[40rem]', position: 'top-1/4 -left-20', opacity: 'opacity-30' },
    { color: 'bg-violet-500/10', size: 'w-[35rem] h-[35rem]', position: '-bottom-20 right-1/3', opacity: 'opacity-25' }
  ];

  return (
    <div className="w-full relative">
      {/* 1️⃣ Layer 1: Ambient Backdrop */}
      <AmbientBackdrop blobs={currentBlobs} blur="blur-[130px]" />

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* Section 1: Quantitative View on Software Performance */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-600 tracking-wider uppercase">
              มิติด้านประสิทธิภาพ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงสร้างข้อมูลกับมิติด้านเวลาและพื้นที่
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              ในการสร้างและพัฒนาซอฟต์แวร์ระดับอาชีพ การคัดเลือกโครงสร้างข้อมูลไม่ได้พิจารณาเพียงความสะดวกในการเขียนโค้ด แต่ต้องวัดผลลัพธ์เชิงตัวเลขได้อย่างแม่นยำใน 2 มิติหลัก คือ <span className="bg-cyan-50 border border-cyan-200/60 text-cyan-900 px-2 py-0.5 rounded text-[14.5px] font-mono font-semibold">เวลาประมวลผล (Time Complexity)</span> ซึ่งแสดงถึงความเร็วในการตอบสนองและจำนวนขั้นตอนของชุดคำสั่ง (CPU Cycles) และ <span className="bg-cyan-50 border border-cyan-200/60 text-cyan-900 px-2 py-0.5 rounded text-[14.5px] font-mono font-semibold">พื้นที่หน่วยความจำชั่วคราว (Space Complexity)</span> ที่ระบุขนาดความสิ้นเปลืองของทรัพยากร RAM ในการพักจัดเก็บ
            </p>

            <div className="bg-cyan-50/60 backdrop-blur-md border border-cyan-200/60 rounded-2xl p-5 border-l-[3px] border-l-cyan-500">
              <p className="text-zinc-700 text-[15px] md:text-base leading-relaxed font-normal">
                ในระบบปฏิบัติการสมัยใหม่ที่เป็นแบบ **64-bit** ข้อมูลพอยน์เตอร์ชี้ตำแหน่ง (Memory Address Pointer) จะต้องใช้พื้นที่ในการระบุพิกัดแรมมากถึง **8 ไบต์ (64 บิต)** เสมอ ส่งผลให้โครงสร้างข้อมูลแบบไม่ต่อเนื่องที่ต้องใช้พอยน์เตอร์ในการระบุการเชื่อมโยง เช่น **Linked List** หรือ **Binary Tree** ต้องเกิดภาระค่าใช้จ่ายพื้นที่จัดเก็บเพิ่มเติมที่เรียกว่า **Pointer Overhead** ซึ่งอาจส่งผลเสียต่อการจำกัดพื้นที่หากปริมาณข้อมูลมีจำนวนมหาศาล
              </p>
            </div>

            {/* Premium Concept Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <ConceptCard
                symbol="Worst Case"
                title="ขีดจำกัดกรณีแย่ที่สุด"
                description="การคำนวณและประเมินประสิทธิภาพความเร็วของขั้นตอนวิธีเมื่อเผชิญกับสภาพข้อมูลที่ยากที่สุด O(N)"
                accent="cyan"
              />
              <ConceptCard
                symbol="Pointer Overhead"
                title="ภาระพื้นที่จัดเก็บส่วนเกิน"
                description="แอดเดรสขนาด 8 ไบต์ (64-bit) ที่ต้องเพิ่มเข้าไปเคียงคู่กับข้อมูลดิบในทุกเซลล์โหนดเชื่อมโยง"
                accent="indigo"
              />
              <ConceptCard
                symbol="Time-Space Tradeoff"
                title="ความคุ้มค่าแลกเปลี่ยน"
                description="หลักลอจิกการเขียนโปรแกรมที่ยอมสละแรมเก็บข้อมูลเพื่อเพิ่มความเร็วในการตอบสนอง และในทางกลับกัน"
                accent="violet"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Simulator 1 - RAM Space & Overhead Analyzer */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-600 tracking-wider uppercase">
              ตัววิเคราะห์การใช้แรม
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตัวประเมินความสิ้นเปลืองพื้นที่ RAM และ Pointer Overhead
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              ลองขยับแถบสไลเดอร์เพื่อกำหนดจำนวนข้อมูล $N$ (ตั้งแต่ 10 ถึง 1000 รายการ) เพื่อคำนวณหาปริมาณพื้นที่หน่วยความจำชั่วคราวชิ้นจริงที่ระบบปฏิบัติการต้องจองในการเก็บค่าข้อมูลแบบ **Array** เทียบกับ **Linked List** พร้อมการแยกส่วน Pointer Overhead ให้เห็นอย่างเป็นประจักษ์
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
              {/* Left Control (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">CONTROL PANEL</span>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-white">
                    <Sliders className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-lg font-bold">ปรับเปลี่ยนจำนวนข้อมูล N</h4>
                  </div>

                  {/* Range Slider for N */}
                  <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400">ขนาดจำนวนรายการ (N):</span>
                      <span className="text-cyan-400 font-bold text-base">{dataCount} รายการ</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      step="10"
                      value={dataCount}
                      onChange={(e) => setDataCount(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>N = 10</span>
                      <span>N = 1000</span>
                    </div>
                  </div>

                  {/* Summary of calculations */}
                  <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-3.5 text-sm font-mono">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">// ผลคำนวณทางทฤษฎี (64-bit OS)</div>
                    <div className="flex justify-between text-emerald-300">
                      <span>Array (4B ต่อตัว):</span>
                      <span className="font-bold">{arrayBytes.toLocaleString()} Bytes</span>
                    </div>
                    <div className="flex justify-between text-violet-300">
                      <span>Linked List (12B ต่อตัว):</span>
                      <span className="font-bold">{listBytes.toLocaleString()} Bytes</span>
                    </div>
                    <div className="w-full h-px bg-slate-800" />
                    <div className="flex justify-between text-amber-400 text-xs">
                      <span>Pointer Overhead สิ้นเปลือง:</span>
                      <span className="font-bold">+{overheadBytes.toLocaleString()} Bytes ({((overheadBytes/listBytes)*100).toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] leading-relaxed text-slate-400 mt-4 bg-black/20 p-3 rounded-xl border border-slate-800">
                  <strong>ข้อสังเกต:</strong> ทุกครั้งที่เราเก็บตัวแปร 4 ไบต์ใน Linked List บนระบบ 64-bit เราต้องเสียเนื้อที่อีก 8 ไบต์ (Pointer) ทำให้ตัวชี้แอดเดรสเป็นภาระขนาดความยาวถึง **66.7%** ของข้อมูลทั้งหมด
                </div>
              </div>

              {/* Right Graph Panel (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[400px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">VISUALIZER SCREEN</span>
                <span className="text-[9px] font-mono text-cyan-400 absolute top-3 right-4 font-bold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> DYNAMIC RAM SPACE COMPARATOR
                </span>

                {/* Graph Visualization */}
                <div className="flex-1 flex flex-col justify-center gap-8 w-full px-4 mt-6">
                  {/* Array Memory Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-slate-350">
                      <span className="flex items-center gap-1.5"><Grid className="w-4 h-4 text-emerald-400" /> Array Memory</span>
                      <span className="text-emerald-400 font-bold">{arrayBytes} Bytes</span>
                    </div>
                    <div className="w-full bg-slate-900 h-8 rounded-xl overflow-hidden border border-slate-850 relative">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-l-xl"
                        style={{ width: `${(arrayBytes / listBytes) * 100}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white font-bold drop-shadow">
                        {((arrayBytes / listBytes) * 100).toFixed(0)}% ของแรมที่ใช้
                      </span>
                    </div>
                  </div>

                  {/* Linked List Memory Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-slate-350">
                      <span className="flex items-center gap-1.5"><GitCommit className="w-4 h-4 text-violet-400" /> Linked List Memory</span>
                      <span className="text-violet-400 font-bold">{listBytes} Bytes</span>
                    </div>
                    <div className="w-full bg-slate-900 h-8 rounded-xl overflow-hidden border border-slate-850 relative">
                      {/* Flex containers to show Data vs Overhead */}
                      <div className="h-full w-full flex">
                        <div
                          className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-300 rounded-l-xl flex items-center justify-center"
                          style={{ width: `${(arrayBytes / listBytes) * 100}%` }}
                        >
                          <span className="text-[8px] font-mono text-white font-bold drop-shadow truncate px-1">ข้อมูล (33%)</span>
                        </div>
                        <div
                          className="h-full bg-gradient-to-r from-amber-500/80 to-orange-500/80 transition-all duration-300 flex items-center justify-center shadow-inner relative"
                          style={{ width: `${(overheadBytes / listBytes) * 100}%` }}
                        >
                          <span className="text-[8px] font-mono text-white font-bold drop-shadow truncate px-1 animate-pulse">Overhead (67%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtitle legends */}
                <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-slate-400 border-t border-slate-900 pt-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-emerald-500" />
                    <span>ข้อมูลอาเรย์ต่อเนื่อง (Data Value)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-violet-500" />
                    <span>ข้อมูลโหนดเชื่อมลิสต์ (Node Value)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-amber-500" />
                    <span>พอยน์เตอร์พิกัดชี้แอดเดรส (Pointer Overhead)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Simulator 2 - Array Shift vs Linked List Link */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-600 tracking-wider uppercase">
              ตัวจำลองการแทรกค่า
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แอนิเมชันเปรียบเทียบการจัดสลับอาเรย์ O(N) และการเปลี่ยนสายพอยน์เตอร์ O(1)
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              เพื่อให้เห็นภาพตรรกะเบื้องหลังการแทรกข้อมูลใหม่ที่ตำแหน่งเริ่มต้น (Index 0) โปรดคลิกเปลี่ยนโหมดของ <span className="bg-cyan-50 border border-cyan-200/60 text-cyan-900 px-2 py-0.5 rounded text-[14.5px] font-mono font-semibold">ขั้นตอนวิธีแทรกค่าเสมือนจริง (Operations Visualizer)</span> และกดปุ่ม STEP เพื่อเลื่อนขั้นตอนและนับจำนวน CPU cycles ที่เกิดขึ้นจริง
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
              {/* Left Control Panel (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">CONTROL PANEL</span>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-white">
                    <Layers className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-lg font-bold">เลือกประเภทจำลองแทรกค่า</h4>
                  </div>

                  <OptionSelector
                    options={[
                      { value: 'array', label: 'เลื่อนตำแหน่งใน Array (Shift)' },
                      { value: 'linked_list', label: 'สลับขั้วใน Linked List (Link)' }
                    ]}
                    value={simMode}
                    onChange={(val) => { setSimMode(val); handleResetSim2(); }}
                    cols={2}
                    mode="pill"
                    activeColor="bg-cyan-600 border-cyan-500 text-white font-bold shadow-md shadow-cyan-500/20"
                  />

                  {/* Narration Description Box */}
                  <div className="bg-black/40 border border-slate-800 rounded-2xl p-4 space-y-3 min-h-[160px] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold font-mono">
                        <Info className="w-4 h-4" /> ขั้นตอนปัจจุบัน (ขั้นที่ {simStep}):
                      </div>
                      
                      {simMode === 'array' && (
                        <p className="text-slate-350 text-sm leading-relaxed mt-2">
                          {simStep === 0 && 'สภาพเริ่มต้น: อาเรย์มีข้อมูล 4 ชิ้นจองในช่องต่อเนื่อง และมีช่องปลายแถวว่างอยู่ชิ้นหนึ่ง มีเป้าหมายจะนำค่าพิเศษ 99 มาแทรกที่ช่องแรก (Index 0)'}
                          {simStep === 1 && 'ขั้นตอนที่ 1: เราไม่สามารถเขียนทับ Index 0 ได้เพราะข้อมูลดั้งเดิมจะหาย จึงต้องขยับดึงข้อมูลตัวสุดท้าย (40) เลื่อนขวาไปทางขวา 1 ช่อง'}
                          {simStep === 2 && 'ขั้นตอนที่ 2: ดำเนินการย้ายข้อมูลหลักที่ Index 2 (30) ไปแทนช่องขวาถัดไป'}
                          {simStep === 3 && 'ขั้นตอนที่ 3: ดำเนินการย้ายข้อมูลหลักที่ Index 1 (20) ไปแทนช่องขวาถัดไป'}
                          {simStep === 4 && 'ขั้นตอนที่ 4: ดำเนินการย้ายข้อมูลชิ้นเริ่มต้นเดิมที่ Index 0 (10) ไปแทนช่อง Index 1 จนช่องแรกสุดว่างสมบูรณ์'}
                          {simStep === 5 && 'ขั้นตอนที่ 5: เขียนบันทึกค่าพิเศษ 99 ลงในช่อง Index 0 ที่ว่างเปล่าได้สำเร็จ! เสร็จสิ้นขั้นตอนการเลื่อน Shift ทั้งหมด'}
                        </p>
                      )}

                      {simMode === 'linked_list' && (
                        <p className="text-slate-350 text-sm leading-relaxed mt-2">
                          {simStep === 0 && 'สภาพเริ่มต้น: รายการโหนดเชื่อมโยงกระจายตัวอยู่ทั่วไปในแรม มีค่าหัว (Head) ชี้อยู่ที่โหนดเลข 10 มีเป้าหมายจะแทรกโหนดใหม่เลข 99 ให้เป็นตัวแรกสุด'}
                          {simStep === 1 && 'ขั้นตอนที่ 1: ทำการจองและสร้างโหนดใหม่เลข 99 ขึ้นมารอในแรมที่ว่างเปล่า'}
                          {simStep === 2 && 'ขั้นตอนที่ 2: ตั้งค่าพอยน์เตอร์ Next ของโหนดใหม่เลข 99 ให้ชี้ไปแอดเดรสของโหนดหัวเดิม (10) เพื่อเชื่อมสายการไหล'}
                          {simStep === 3 && 'ขั้นตอนที่ 3: ปรับเปลี่ยนพอยน์เตอร์ Head ชี้หลักของทั้งระบบ ให้โยนกลับมาจับที่โหนด 99 เป็นอันสิ้นสุดกระบวนการ! ไม่ต้องเลื่อนข้อมูลใด ๆ ในแรม'}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3 mt-4 pt-4 border-t border-slate-800/80">
                      <button
                        onClick={handleStepSim2}
                        disabled={(simMode === 'array' && simStep === 5) || (simMode === 'linked_list' && simStep === 3)}
                        className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-all disabled:opacity-50"
                      >
                        <Play className="w-3.5 h-3.5" /> STEP NEXT
                      </button>
                      <button
                        onClick={handleResetSim2}
                        className="p-2 border border-slate-700 hover:bg-slate-800 text-slate-400 rounded-xl cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Micro Metrics */}
                <div className="mt-8 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                    <span className="block text-[10px] text-slate-500 font-mono tracking-wider">CPU STEPS</span>
                    <span className="text-lg font-bold font-mono text-white">{cpuCycles} คำสั่ง</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                    <span className="block text-[10px] text-slate-500 font-mono tracking-wider">BIG O (INSERT)</span>
                    <span className="text-lg font-bold font-mono text-white">
                      {simMode === 'array' ? 'O(N)' : 'O(1)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Visualizer Panel (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] p-6 border border-white/5 shadow-2xl relative flex flex-col items-center justify-center min-h-[400px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">VISUALIZER SCREEN</span>
                
                {/* Array Visualization Interface */}
                {simMode === 'array' && (
                  <div className="w-full max-w-md space-y-8 py-6">
                    {/* Element to Insert */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2">ข้อมูลพิเศษที่จะแทรก:</span>
                      <div className={`w-14 h-14 rounded-xl border-2 border-cyan-500 bg-cyan-600/20 text-cyan-300 font-mono font-bold text-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all ${simStep >= 5 ? 'opacity-40 scale-90' : 'animate-pulse'}`}>
                        99
                      </div>
                    </div>

                    {/* Array Cells Row */}
                    <div className="space-y-2">
                      <span className="block text-[10px] font-mono text-slate-500 text-center">MEMORY ADDRESS REGISTERS</span>
                      <div className="grid grid-cols-5 gap-2.5 p-3.5 bg-slate-900/60 rounded-2xl border border-slate-800/80 shadow-inner">
                        {/* Index 0 */}
                        <div className={`h-16 rounded-xl border flex flex-col justify-center items-center transition-all duration-300 ${simStep >= 5 ? 'bg-cyan-950/40 border-cyan-500 text-cyan-300' : simStep >= 4 ? 'bg-slate-900 border-slate-800/60 text-white/60' : 'bg-indigo-950/40 border-indigo-500 text-indigo-300'}`}>
                          <span className="text-[9px] font-mono opacity-50">Idx: 0</span>
                          <span className="text-[15px] font-mono font-bold">{simStep >= 5 ? '99' : simStep >= 4 ? '-' : '10'}</span>
                        </div>
                        {/* Index 1 */}
                        <div className={`h-16 rounded-xl border flex flex-col justify-center items-center transition-all duration-300 ${simStep >= 4 ? 'bg-indigo-950/40 border-indigo-500 text-indigo-300' : simStep >= 3 ? 'bg-slate-900 border-slate-800/60 text-white/60' : 'bg-indigo-950/40 border-indigo-500 text-indigo-300'}`}>
                          <span className="text-[9px] font-mono opacity-50">Idx: 1</span>
                          <span className="text-[15px] font-mono font-bold">{simStep >= 4 ? '10' : simStep >= 3 ? '-' : '20'}</span>
                        </div>
                        {/* Index 2 */}
                        <div className={`h-16 rounded-xl border flex flex-col justify-center items-center transition-all duration-300 ${simStep >= 3 ? 'bg-indigo-950/40 border-indigo-500 text-indigo-300' : simStep >= 2 ? 'bg-slate-900 border-slate-800/60 text-white/60' : 'bg-indigo-950/40 border-indigo-500 text-indigo-300'}`}>
                          <span className="text-[9px] font-mono opacity-50">Idx: 2</span>
                          <span className="text-[15px] font-mono font-bold">{simStep >= 3 ? '20' : simStep >= 2 ? '-' : '30'}</span>
                        </div>
                        {/* Index 3 */}
                        <div className={`h-16 rounded-xl border flex flex-col justify-center items-center transition-all duration-300 ${simStep >= 2 ? 'bg-indigo-950/40 border-indigo-500 text-indigo-300' : simStep >= 1 ? 'bg-slate-900 border-slate-800/60 text-white/60' : 'bg-indigo-950/40 border-indigo-500 text-indigo-300'}`}>
                          <span className="text-[9px] font-mono opacity-50">Idx: 3</span>
                          <span className="text-[15px] font-mono font-bold">{simStep >= 2 ? '30' : simStep >= 1 ? '-' : '40'}</span>
                        </div>
                        {/* Index 4 */}
                        <div className={`h-16 rounded-xl border flex flex-col justify-center items-center transition-all duration-300 ${simStep >= 1 ? 'bg-indigo-950/40 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-800/60 text-white/60 border-dashed'}`}>
                          <span className="text-[9px] font-mono opacity-50">Idx: 4</span>
                          <span className="text-[15px] font-mono font-bold">{simStep >= 1 ? '40' : '-'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Linked List Visualization Interface */}
                {simMode === 'linked_list' && (
                  <div className="w-full max-w-md relative h-64 flex flex-col justify-center">
                    {/* SVG Connections */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                      <defs>
                        <marker
                          id="arrow-cyan"
                          viewBox="0 0 10 10"
                          refX="9"
                          refY="5"
                          markerWidth="6"
                          markerHeight="6"
                          orient="auto-start-reverse"
                        >
                          <path d="M 0 1 L 9 5 L 0 9 z" fill="#06B6D4" />
                        </marker>
                      </defs>

                      {/* Head link: Initially to Node 10, then to Node 99 if simStep >= 3 */}
                      {simStep < 3 ? (
                        <path
                          d="M 50 128 L 120 128"
                          fill="none"
                          stroke="#E2E8F0"
                          strokeWidth="2.5"
                          markerEnd="url(#arrow-cyan)"
                        />
                      ) : (
                        <path
                          d="M 50 128 Q 110 50 150 90"
                          fill="none"
                          stroke="#06B6D4"
                          strokeWidth="3.5"
                          markerEnd="url(#arrow-cyan)"
                          className="animate-pulse"
                        />
                      )}

                      {/* Node 99 Link to Node 10 if simStep >= 2 */}
                      {simStep >= 2 && (
                        <path
                          d="M 200 90 Q 230 150 180 128"
                          fill="none"
                          stroke="#06B6D4"
                          strokeWidth="3.5"
                          strokeDasharray="5,3"
                          markerEnd="url(#arrow-cyan)"
                        />
                      )}

                      {/* Node 10 link to Node 20 */}
                      <path
                        d="M 215 128 L 265 128"
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="2"
                        markerEnd="url(#arrow-cyan)"
                      />

                      {/* Node 20 link to Node 30 */}
                      <path
                        d="M 335 128 L 385 128"
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="2"
                        markerEnd="url(#arrow-cyan)"
                      />
                    </svg>

                    {/* Nodes row layout */}
                    <div className="relative z-20 flex justify-between items-center w-full px-2">
                      {/* HEAD pointer label */}
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase mb-1">HEAD</span>
                        <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-mono text-slate-350">
                          {simStep >= 3 ? '0x99' : '0x10'}
                        </div>
                      </div>

                      {/* Node 10 */}
                      <div className="flex flex-col items-center ml-4">
                        <span className="text-[8px] font-mono text-slate-500">Addr: 0x10</span>
                        <div className="w-16 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/80 text-indigo-300 flex flex-col items-center justify-center text-xs font-mono">
                          <span className="font-bold">10</span>
                          <span className="text-[8px] opacity-60">Next: 0x20</span>
                        </div>
                      </div>

                      {/* Node 20 */}
                      <div className="flex flex-col items-center">
                        <span className="text-[8px] font-mono text-slate-500">Addr: 0x20</span>
                        <div className="w-16 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/80 text-indigo-300 flex flex-col items-center justify-center text-xs font-mono">
                          <span className="font-bold">20</span>
                          <span className="text-[8px] opacity-60">Next: 0x30</span>
                        </div>
                      </div>

                      {/* Node 30 */}
                      <div className="flex flex-col items-center">
                        <span className="text-[8px] font-mono text-slate-500">Addr: 0x30</span>
                        <div className="w-16 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/80 text-indigo-300 flex flex-col items-center justify-center text-xs font-mono">
                          <span className="font-bold">30</span>
                          <span className="text-[8px] opacity-60">Next: Null</span>
                        </div>
                      </div>
                    </div>

                    {/* New Node 99 (renders above the list flow) */}
                    {simStep >= 1 && (
                      <div className="absolute top-2 left-1/3 transform -translate-x-1/2 z-20 flex flex-col items-center animate-fade-in">
                        <span className="text-[8px] font-mono text-cyan-400 font-bold">Addr: 0x99 (NEW)</span>
                        <div className={`w-20 h-12 rounded-xl border flex flex-col items-center justify-center text-xs font-mono transition-all duration-300 ${simStep >= 2 ? 'bg-cyan-950/40 border-cyan-500 text-cyan-300' : 'bg-slate-900 border-slate-800 text-white/60 border-dashed animate-pulse'}`}>
                          <span className="font-bold">99</span>
                          <span className="text-[8px] opacity-75">{simStep >= 2 ? 'Next: 0x10' : 'Next: ?'}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Gamification Quiz Engine */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-600 tracking-wider uppercase">
              ทดสอบสมรรถนะ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบทดสอบประเมินมิติด้านประสิทธิภาพของขั้นตอนวิธี
            </h3>
          </div>

          <div className="pt-2">
            <QuizEngine
              title="แบบทดสอบตรรกะความซับซ้อนและการวิเคราะห์เชิงปริมาณ"
              description="ตอบคำถามวิชาการเพื่อสะท้อนความเข้าใจในภารกิจคำนวณ RAM Overhead และ Shifting ในอาเรย์เสมือน"
              levels={quizLevels}
              accentColor="from-cyan-600/20 to-teal-500/10"
              icon={<TrendingUp className="w-6 h-6 text-cyan-400 animate-pulse" />}
            />
          </div>
        </section>

        {/* Section 5: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ภารกิจส่งงาน: การประเมินผลเชิงปริมาณของการประมวลผลระบบองค์กร"
          taskText={teacherTaskText}
        />
      </main>
    </div>
  );
}
