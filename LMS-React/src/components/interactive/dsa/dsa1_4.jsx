import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  HelpCircle,
  Activity,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle,
  Info,
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

export default function DSA1_4() {
  const [problemSelected, setProblemSelected] = useState('even_odd'); // even_odd | find_max
  const [activeStep, setActiveStep] = useState(0);

  const currentBlobs = [
    { color: 'bg-emerald-500/10', size: 'w-[45rem] h-[45rem]', position: '-top-40 -left-40', opacity: 'opacity-40' },
    { color: 'bg-indigo-500/5', size: 'w-[40rem] h-[40rem]', position: 'top-1/4 -right-20', opacity: 'opacity-30' },
    { color: 'bg-teal-500/10', size: 'w-[35rem] h-[35rem]', position: '-bottom-20 left-1/3', opacity: 'opacity-25' }
  ];

  const quizQuestions = [
    {
      title: 'คุณสมบัติของอัลกอริทึมที่ดี',
      desc: 'ข้อใดจัดเป็นคุณสมบัติที่สำคัญที่สุดประการหนึ่งของ "อัลกอริทึมที่ดี" ในทางวิทยาการคอมพิวเตอร์?',
      tip: 'คิดถึงความชัดเจนตรงตัวและการมีจุดสิ้นสุดการทำงาน',
      options: [
        { key: 'A', text: 'ต้องมีขนาดยาวกว่า 1,000 บรรทัดขึ้นไป', isCorrect: false },
        { key: 'B', text: 'มีความคลุมเครือเพื่อให้นักพัฒนาเขียนเพิ่มได้ง่าย', isCorrect: false },
        { key: 'C', text: 'มีคำนิยามที่ชัดเจน (Definiteness) ปราศจากความคลุมเครือ และต้องมีจุดสิ้นสุดการทำงาน (Finiteness) 100%', isCorrect: true },
        { key: 'D', text: 'ต้องทำงานเฉพาะในสภาพแวดล้อมระบบ SQL เท่านั้น', isCorrect: false }
      ]
    },
    {
      title: 'การสิ้นสุดของขั้นตอนวิธี (Finiteness)',
      desc: 'หากโปรแกรมของนักเรียนทำงานวนรอบแบบไม่สิ้นสุด (Infinite Loop) โปรแกรมดังกล่าวขัดต่อหลักการข้อใดของขั้นตอนวิธี?',
      tip: 'Finiteness คือความมีขอบเขตและจุดสิ้นสุด',
      options: [
        { key: 'A', text: 'การมีผลลัพธ์ (Output)', isCorrect: false },
        { key: 'B', text: 'ความมีจุดสิ้นสุด (Finiteness)', isCorrect: true },
        { key: 'C', text: 'การนำเข้าข้อมูล (Input)', isCorrect: false },
        { key: 'D', text: 'ความมีประสิทธิภาพ (Effectiveness)', isCorrect: false }
      ]
    },
    {
      title: 'รหัสเทียม (Pseudocode) คืออะไร',
      desc: 'ข้อใดกล่าวถึงคำอธิบายเชิงขั้นตอนวิธีด้วย "รหัสเทียม (Pseudocode)" ได้อย่างถูกต้อง?',
      tip: 'รหัสเทียมไม่ใช่โค้ดภาษาคอมพิวเตอร์ที่คอมไพล์ได้จริง',
      options: [
        { key: 'A', text: 'การเขียนโค้ดสั้น ๆ เพื่อสแกนบาร์โค้ดในแรม', isCorrect: false },
        { key: 'B', text: 'การอธิบายขั้นตอนการทำงานด้วยภาษาข้อความผสมผสานสัญกรณ์คณิตศาสตร์ คล้ายภาษาโปรแกรมแต่เข้าใจง่ายสำหรับมนุษย์', isCorrect: true },
        { key: 'C', text: 'ภาพวาดรูปทรงเรขาคณิตเชื่อมโยงเส้นทางลอจิก', isCorrect: false },
        { key: 'D', text: 'ฐานข้อมูลชนิดพิเศษจองแรม O(1)', isCorrect: false }
      ]
    },
    {
      title: 'สัญลักษณ์ใน Flowchart',
      desc: 'ในสัญลักษณ์ผังงาน (Flowchart) รูปทรงสี่เหลี่ยมข้าวหลามตัด (Decision Diamond) มีหน้าที่และประยุกต์ใช้งานอย่างไร?',
      tip: 'ข้าวหลามตัดมีจุดเด่นคือมีทิศทางตัดสินใจแยกออกสองสาย',
      options: [
        { key: 'A', text: 'ใช้สำหรับเป็นจุดเริ่มต้นและจุดสิ้นสุดของขั้นตอนวิธี', isCorrect: false },
        { key: 'B', text: 'ใช้แสดงถึงการประมวลผลคำสั่งเชิงเดี่ยวทั่วไป', isCorrect: false },
        { key: 'C', text: 'ใช้ระบุการเปรียบเทียบเงื่อนไข (Conditional check) มีทิศทางแยกออกเป็น จริง (True) หรือ เท็จ (False)', isCorrect: true },
        { key: 'D', text: 'ใช้สำหรับการพิมพ์รายงานข้อมูลออกทางกระดาษ', isCorrect: false }
      ]
    },
    {
      title: 'ความชัดเจนของขั้นตอนวิธี (Effectiveness)',
      desc: 'ข้อใดจัดอยู่ในเรื่อง "ความมีประสิทธิผลและสามารถปฏิบัติได้จริง (Effectiveness)" ของอัลกอริทึม?',
      tip: 'ขั้นตอนต้องมีความชัดเจนและทำได้ง่ายจริงด้วยทรัพยากรที่มีอยู่',
      options: [
        { key: 'A', text: 'ทุกขั้นตอนในอัลกอริทึมต้องมีความเรียบง่าย สามารถดำเนินการประมวลผลจริงได้ด้วยกระดาษและดินสอในเวลาที่ขอบเขตจำกัด', isCorrect: true },
        { key: 'B', text: 'การนำเข้าข้อมูลดิบประเภทพรีมิทีฟเท่านั้น', isCorrect: false },
        { key: 'C', text: 'การใช้หน่วยประมวลผลเครือข่ายความเร็วสูง', isCorrect: false },
        { key: 'D', text: 'การห้ามดักจับข้อผิดพลาดในโค้ดระบบ', isCorrect: false }
      ]
    }
  ];

  const teacherTaskText = `ใบงานวิชาการที่ 1.4: การวิเคราะห์และออกแบบขั้นตอนวิธีอย่างมีตรรกะ

คำสั่ง:
1. ให้นักเรียนระบุคุณสมบัติ 5 ประการของขั้นตอนวิธีที่ดี พร้อมอธิบาย Rationale ความคุ้มค่าในเชิงตรรกะคอมพิวเตอร์
2. อ้างอิงจากตัวจำลองขั้นตอนวิธี (Operations Visualizer):
   - จงร่างผังงาน (Flowchart) ด้วยมือ และเปรียบเทียบตรรกะของการเลือกหาค่ามากที่สุดของตัวเลขสองตัวเทียบกับตัวเลขสามตัว
3. จัดส่งผลงานรายงานภาพผังงาน พร้อมเอกสารอธิบายในรูปแบบ Markdown ลงสู่บอร์ดระบบส่งงาน`;

  const resetSimulator = () => {
    setActiveStep(0);
  };

  const nextStep = () => {
    if (problemSelected === 'even_odd') {
      if (activeStep < 4) setActiveStep((s) => s + 1);
    } else {
      if (activeStep < 4) setActiveStep((s) => s + 1);
    }
  };

  return (
    <div className="w-full relative">
      {/* 1️⃣ Layer 1: Ambient Backdrop */}
      <AmbientBackdrop blobs={currentBlobs} blur="blur-[130px]" />

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* Section 1: Algorithm Properties Theory */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              บทเรียนวิชาการ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ความหมายและคุณสมบัติของอัลกอริทึมที่ดี
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              ในทางวิทยาการคอมพิวเตอร์ <span className="bg-teal-50 border border-teal-200/60 text-teal-900 px-2 py-0.5 rounded text-[14.5px] font-mono font-semibold">อัลกอริทึม (Algorithm)</span> หรือขั้นตอนวิธี คือ ลำดับขั้นตอนการทำงานที่ชัดเจนและเป็นระบบในการแก้ปัญหาหนึ่ง ๆ โดยได้รับตัวแปรนำเข้า (Input) แล้วผ่านกระบวนการประมวลผลอย่างมีประสิทธิภาพเพื่อผลิตผลลัพธ์ (Output) ปลายทางออกมาตามเป้าหมาย
            </p>

            <div className="bg-teal-50/60 backdrop-blur-md border border-teal-200/60 rounded-2xl p-5 border-l-[3px] border-l-teal-500">
              <p className="text-zinc-700 text-[15px] md:text-base leading-relaxed font-normal">
                การสร้างอัลกอริทึมที่ดีถือเป็นกุญแจสำคัญในการลดปริมาณการใช้ CPU Cycles และความเสถียรของแอปพลิเคชัน โค้ดที่รวดเร็วต้องเริ่มจากการวางแนวคิดตรรกะที่รัดกุมรอบคอบและไม่มีช่องโหว่ความคลุมเครือ
              </p>
            </div>

            {/* Concept Cards for 5 Properties */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <ConceptCard
                symbol="Finiteness"
                title="ความมีจุดสิ้นสุด"
                description="ขั้นตอนวิธีต้องมีจุดจบการทำงานเสมอหลังจากดำเนินการในจำนวนครั้งที่จำกัด ปราศจาก Infinite Loop"
                accent="teal"
              />
              <ConceptCard
                symbol="Definiteness"
                title="ความชัดเจนตรงตัว"
                description="ทุกขั้นตอนประมวลผลต้องมีคำนิยามลอจิกที่ชัดเจน ไม่คลุมเครือ และแปลได้ทิศทางเดียวเสมอ"
                accent="cyan"
              />
              <ConceptCard
                symbol="Effectiveness"
                title="ความสามารถในการทำจริง"
                description="คำสั่งต้องมีความเรียบง่าย สามารถคำนวณหรือปฏิบัติได้จริงโดยมีข้อจำกัดด้านเวลาและอุปกรณ์"
                accent="emerald"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Flowchart vs Pseudocode Visualizer */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              เครื่องจำลองการเดินขั้นตอนวิธี
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตัวเปรียบเทียบกระบวนการทำงานแบบผังงานและลอจิกคู่ขนาน
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              รับชมและศึกษาการจำลองการเดินกระแสของขั้นตอนวิธี โดยกดเลือกโจทย์ปัญหา และคลิกปุ่ม **STEP NEXT** เพื่อตรวจสอบว่าข้อมูลนำไหลผ่านรูปทรงและบล็อกคำสั่งอย่างไร
            </p>

            {/* High-Fidelity Simulator Shell */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
              {/* Left Control Panel (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">CONTROL PANEL</span>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-white">
                    <Code className="w-5 h-5 text-teal-400" />
                    <h4 className="text-lg font-bold">เลือกโจทย์ประมวลผลลอจิก</h4>
                  </div>

                  <OptionSelector
                    options={[
                      { value: 'even_odd', label: 'ตรวจสอบเลขคู่/เลขคี่ (Even/Odd)' },
                      { value: 'find_max', label: 'หาค่ามากสุดของ 2 จำนวน (Max)' }
                    ]}
                    value={problemSelected}
                    onChange={(val) => { setProblemSelected(val); resetSimulator(); }}
                    cols={1}
                    mode="pill"
                    activeColor="bg-teal-600 border-teal-500 text-white font-bold shadow-md shadow-teal-500/20"
                  />

                  {/* Narration Description Box */}
                  <div className="bg-black/40 border border-slate-800 rounded-2xl p-4 space-y-3 min-h-[180px] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-teal-300 text-xs font-bold font-mono">
                        <Info className="w-4 h-4" /> ตรรกะขั้นปัจจุบัน (ขั้นตอนที่ {activeStep + 1}):
                      </div>
                      
                      {problemSelected === 'even_odd' && (
                        <p className="text-slate-350 text-sm leading-relaxed mt-2">
                          {activeStep === 0 && 'ขั้นตอนที่ 1 (Start / Input): รับค่าตัวแปรนำเข้าจำนวนเต็ม N = 15 เข้าสู่หน่วยวิเคราะห์ในระบบ'}
                          {activeStep === 1 && 'ขั้นตอนที่ 2 (Calculate): ดำเนินการคัดเศษในคณิตศาสตร์คอมพิวเตอร์ ด้วยสูตร Modulo: (เศษ = N % 2)'}
                          {activeStep === 2 && 'ขั้นตอนที่ 3 (Decision): ตรวจเช็คสมมติฐานตรรกะเงื่อนไข: (เศษ == 0 หรือไม่?) ซึ่งผลลัพธ์ของ 15 % 2 คือเศษ 1 ทำให้ผลประเมินคำนวณเป็น FALSE (เท็จ)'}
                          {activeStep === 3 && 'ขั้นตอนที่ 4 (Output): ระบบสืบทราบทิศทางลอจิกและส่งข้อความแสดงออกทางหน้าจอ (Output): "15 เป็นเลขคี่ (Odd)"'}
                          {activeStep === 4 && 'ขั้นตอนที่ 5 (End): สิ้นสุดขั้นตอนวิธีประมวลผลเสร็จสิ้นสมบูรณ์ (Finiteness)'}
                        </p>
                      )}

                      {problemSelected === 'find_max' && (
                        <p className="text-slate-350 text-sm leading-relaxed mt-2">
                          {activeStep === 0 && 'ขั้นตอนที่ 1 (Start / Input): ทำการยอมรับตัวแปรสองรายการ A = 42 และ B = 73 เข้าสู่ระบบเปรียบเทียบ'}
                          {activeStep === 1 && 'ขั้นตอนที่ 2 (Decision): ประเมินค่าความต่างของขนาดผ่านเงื่อนไขตรรกะ: (A > B หรือไม่?) ในระบบพารามิเตอร์ส่งกลับผลประเมินได้เป็น FALSE (เนื่องจาก 42 ไม่ได้มากกว่า 73)'}
                          {activeStep === 2 && 'ขั้นตอนที่ 3 (Process): วิ่งเข้าเงื่อนไขย่อย (False Branch): กำหนดให้ตัวแปรผลลัพธ์มีค่าเท่ากับ B (Max = B)'}
                          {activeStep === 3 && 'ขั้นตอนที่ 4 (Output): ส่งค่าตัวแปรผลรวมออกมอนิเตอร์สรุปผลลัพธ์: "ค่ามากที่สุดคือ 73"'}
                          {activeStep === 4 && 'ขั้นตอนที่ 5 (End): จบกระบวนการเปรียบเทียบอย่างสมบูรณ์ ปลดปล่อยตัวแปรออกจากแรม'}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3 mt-4 pt-4 border-t border-slate-850">
                      <button
                        onClick={nextStep}
                        disabled={activeStep === 4}
                        className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-all disabled:opacity-50"
                      >
                        <Play className="w-3.5 h-3.5" /> STEP NEXT
                      </button>
                      <button
                        onClick={resetSimulator}
                        className="p-2 border border-slate-700 hover:bg-slate-800 text-slate-400 rounded-xl cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Micro metrics */}
                <div className="mt-8 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                    <span className="block text-[10px] text-slate-500 font-mono tracking-wider">BIG O (COMPLEXITY)</span>
                    <span className="text-lg font-bold font-mono text-white">O(1) Constant</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                    <span className="block text-[10px] text-slate-500 font-mono tracking-wider">FINITENESS STATE</span>
                    <span className="text-lg font-bold font-mono text-white">
                      {activeStep === 4 ? 'TERMINATED' : 'RUNNING'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Visualizer Panel (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] p-6 border border-white/5 shadow-2xl relative flex flex-col items-center justify-center min-h-[420px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">VISUALIZER SCREEN</span>
                <span className="text-[9px] font-mono text-teal-400 absolute top-3 right-4 font-bold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 animate-pulse" /> INTERACTIVE FLOWCHART TRACER
                </span>

                <div className="relative w-[360px] h-[360px] mt-4 select-none">
                  {/* SVG Flowchart Arrows connecting centers of symbols */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <defs>
                      <marker
                        id="arrow-teal"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 1 L 9 5 L 0 9 z" fill="#0D9488" />
                      </marker>
                    </defs>

                    {/* Step connections in even_odd mode */}
                    {problemSelected === 'even_odd' && (
                      <>
                        {/* Start (180, 40) to Calc (180, 110) */}
                        <path d="M 180 40 L 180 110" fill="none" stroke={activeStep >= 1 ? '#0D9488' : '#334155'} strokeWidth="3" markerEnd="url(#arrow-teal)" />
                        {/* Calc to Decision (180, 180) */}
                        <path d="M 180 110 L 180 180" fill="none" stroke={activeStep >= 2 ? '#0D9488' : '#334155'} strokeWidth="3" markerEnd="url(#arrow-teal)" />
                        
                        {/* Decision to Output (Right) if False (since N=15 is odd) */}
                        <path d="M 180 180 L 270 180 L 270 250" fill="none" stroke={activeStep >= 3 ? '#0D9488' : '#334155'} strokeWidth="3" markerEnd="url(#arrow-teal)" />
                        
                        {/* Output to End (180, 310) */}
                        <path d="M 270 250 L 270 290 L 180 290 L 180 310" fill="none" stroke={activeStep >= 4 ? '#0D9488' : '#334155'} strokeWidth="3" markerEnd="url(#arrow-teal)" />
                      </>
                    )}

                    {/* Step connections in find_max mode */}
                    {problemSelected === 'find_max' && (
                      <>
                        {/* Start to Decision */}
                        <path d="M 180 40 L 180 110" fill="none" stroke={activeStep >= 1 ? '#0D9488' : '#334155'} strokeWidth="3" markerEnd="url(#arrow-teal)" />
                        {/* Decision to Process (Right) (since A > B is false) */}
                        <path d="M 180 110 L 270 110 L 270 180" fill="none" stroke={activeStep >= 2 ? '#0D9488' : '#334155'} strokeWidth="3" markerEnd="url(#arrow-teal)" />
                        {/* Process to Output */}
                        <path d="M 270 180 L 270 250" fill="none" stroke={activeStep >= 3 ? '#0D9488' : '#334155'} strokeWidth="3" markerEnd="url(#arrow-teal)" />
                        {/* Output to End */}
                        <path d="M 270 250 L 270 290 L 180 290 L 180 310" fill="none" stroke={activeStep >= 4 ? '#0D9488' : '#334155'} strokeWidth="3" markerEnd="url(#arrow-teal)" />
                      </>
                    )}
                  </svg>

                  {/* Flowchart Elements */}
                  <div className="absolute inset-0 font-mono text-[10.5px]">
                    {problemSelected === 'even_odd' && (
                      <>
                        {/* Start Capsule */}
                        <div className={`absolute top-[16px] left-[130px] w-25 h-8 rounded-full border-2 flex items-center justify-center transition-all ${activeStep === 0 ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-[0_0_15px_rgba(13,148,136,0.3)] font-bold' : 'bg-slate-900 border-slate-800 text-white/40'}`}>
                          START: N=15
                        </div>

                        {/* Process: Calc Mod */}
                        <div className={`absolute top-[96px] left-[110px] w-35 h-8 border-2 flex items-center justify-center transition-all ${activeStep === 1 ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-[0_0_15px_rgba(13,148,136,0.3)] font-bold' : 'bg-slate-900 border-slate-800 text-white/40'}`}>
                          เศษ = N % 2
                        </div>

                        {/* Decision Diamond */}
                        <div className={`absolute top-[166px] left-[130px] w-24 h-12 border-2 rotate-45 flex items-center justify-center transition-all ${activeStep === 2 ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-[0_0_15px_rgba(13,148,136,0.3)] font-bold' : 'bg-slate-900 border-slate-800 text-white/40'}`}>
                          <span className="-rotate-45 font-bold text-[8.5px]">เศษ == 0?</span>
                        </div>

                        {/* Output Block (False Path - Odd) */}
                        <div className={`absolute top-[236px] left-[200px] w-35 h-8 border-2 flex items-center justify-center transition-all skew-x-12 ${activeStep === 3 ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-[0_0_15px_rgba(13,148,136,0.3)] font-bold' : 'bg-slate-900 border-slate-800 text-white/40'}`}>
                          <span className="-skew-x-12">PRINT: เลขคี่</span>
                        </div>

                        {/* End Capsule */}
                        <div className={`absolute top-[316px] left-[130px] w-25 h-8 rounded-full border-2 flex items-center justify-center transition-all ${activeStep === 4 ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-[0_0_15px_rgba(13,148,136,0.3)] font-bold animate-pulse' : 'bg-slate-900 border-slate-800 text-white/40'}`}>
                          END
                        </div>
                      </>
                    )}

                    {problemSelected === 'find_max' && (
                      <>
                        {/* Start Capsule */}
                        <div className={`absolute top-[16px] left-[120px] w-28 h-8 rounded-full border-2 flex items-center justify-center transition-all ${activeStep === 0 ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-[0_0_15px_rgba(13,148,136,0.3)] font-bold' : 'bg-slate-900 border-slate-800 text-white/40'}`}>
                          START: A=42, B=73
                        </div>

                        {/* Decision Diamond */}
                        <div className={`absolute top-[96px] left-[130px] w-24 h-12 border-2 rotate-45 flex items-center justify-center transition-all ${activeStep === 1 ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-[0_0_15px_rgba(13,148,136,0.3)] font-bold' : 'bg-slate-900 border-slate-800 text-white/40'}`}>
                          <span className="-rotate-45 font-bold text-[8.5px]">A &gt; B?</span>
                        </div>

                        {/* Process: Max = B (False Path) */}
                        <div className={`absolute top-[166px] left-[210px] w-30 h-8 border-2 flex items-center justify-center transition-all ${activeStep === 2 ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-[0_0_15px_rgba(13,148,136,0.3)] font-bold' : 'bg-slate-900 border-slate-800 text-white/40'}`}>
                          Max = B
                        </div>

                        {/* Output Block */}
                        <div className={`absolute top-[236px] left-[210px] w-30 h-8 border-2 flex items-center justify-center transition-all skew-x-12 ${activeStep === 3 ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-[0_0_15px_rgba(13,148,136,0.3)] font-bold' : 'bg-slate-900 border-slate-800 text-white/40'}`}>
                          <span className="-skew-x-12">PRINT: Max</span>
                        </div>

                        {/* End Capsule */}
                        <div className={`absolute top-[316px] left-[130px] w-25 h-8 rounded-full border-2 flex items-center justify-center transition-all ${activeStep === 4 ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-[0_0_15px_rgba(13,148,136,0.3)] font-bold animate-pulse' : 'bg-slate-900 border-slate-800 text-white/40'}`}>
                          END
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Subtitle legends */}
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-slate-400 border-t border-slate-900 pt-4 w-full justify-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-slate-900 border border-slate-800" />
                    <span>โหนดที่ยังไม่ทำงาน (Idle)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-teal-600/30 border border-teal-500" />
                    <span>กำลังทำงานอยู่ (Active / Glowing)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Gamification Quiz Engine */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              ทดสอบสมรรถนะ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบทดสอบประเมินคุณสมบัติขั้นตอนวิธีระดับมาตรฐาน
            </h3>
          </div>

          <div className="pt-2">
            <QuizEngine
              title="แบบทดสอบคุณลักษณะตรรกะอัลกอริทึมที่ดี"
              description="ตอบคำถามทบทวนหลัก Finiteness และ Decision flowchart ในวิทยากลลอจิกคอมพิวเตอร์"
              levels={quizQuestions}
              accentColor="from-teal-600/20 to-emerald-500/10"
              icon={<Sparkles className="w-6 h-6 text-teal-400 animate-pulse" />}
            />
          </div>
        </section>

        {/* Section 5: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ภารกิจส่งงาน: การระดมแนวคิดประเมินคุณสมบัติอัลกอริทึมที่ดี"
          taskText={teacherTaskText}
        />
      </main>
    </div>
  );
}
