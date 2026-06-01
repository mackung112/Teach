import React, { useState } from 'react';
import {
  Activity,
  Layers,
  HelpCircle,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle,
  Info,
  Briefcase,
  Code,
  Wrench,
  BarChart2
} from 'lucide-react';
import {
  AmbientBackdrop,
  OptionSelector,
  ConceptCard,
  SectionBlock,
  QuizEngine
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

export default function DSA1_5() {
  const [cycleStep, setCycleStep] = useState(0);

  const currentBlobs = [
    { color: 'bg-amber-500/10', size: 'w-[45rem] h-[45rem]', position: '-top-20 -left-20', opacity: 'opacity-40' },
    { color: 'bg-orange-500/5', size: 'w-[40rem] h-[40rem]', position: 'top-1/3 -right-20', opacity: 'opacity-30' },
    { color: 'bg-rose-500/10', size: 'w-[35rem] h-[35rem]', position: '-bottom-20 left-1/4', opacity: 'opacity-25' }
  ];

  const quizQuestions = [
    {
      title: 'ขั้นตอนแรกในวงจรพัฒนาอัลกอริทึม',
      desc: 'ในวงจรการพัฒนาอัลกอริทึม (Algorithm Development Life Cycle) ขั้นตอนแรกสุดที่ขาดไม่ได้คือขั้นตอนใด?',
      tip: 'เราไม่สามารถออกแบบได้หากยังไม่ทราบข้อกำหนดและข้อจำกัดของปัญหา',
      options: [
        { key: 'A', text: 'การเขียนโค้ดจริงลงในโปรแกรม (Coding)', isCorrect: false },
        { key: 'B', text: 'การวิเคราะห์ปัญหาและข้อกำหนด (Problem Analysis)', isCorrect: true },
        { key: 'C', text: 'การรัน Big O เพื่อวัดความเร็ว (Performance Profiling)', isCorrect: false },
        { key: 'D', text: 'การบำรุงรักษาระบบ (Maintenance)', isCorrect: false }
      ]
    },
    {
      title: 'การระบุข้อกำหนด (Specifications)',
      desc: 'ข้อใดไม่ใช่สิ่งที่นักพัฒนาต้องระบุให้ชัดเจนในขั้นตอนการวิเคราะห์ปัญหา (Problem Analysis)?',
      tip: 'คิดถึงส่วนที่เรายังไม่ทำในขั้นแรก คือการเขียนภาษาโค้ดพิกเซล',
      options: [
        { key: 'A', text: 'ข้อมูลนำเข้า (Input) ที่เป็นไปได้ทั้งหมด', isCorrect: false },
        { key: 'B', text: 'ข้อมูลผลลัพธ์ (Output) และขอบเขตที่ต้องการ', isCorrect: false },
        { key: 'C', text: 'การเลือกภาษาคอมพิวเตอร์และเขียนซอร์สโค้ดโปรแกรมเสร็จสมบูรณ์', isCorrect: true },
        { key: 'D', text: 'เงื่อนไขและข้อจำกัด (Constraints) ของความถูกต้องระบบ', isCorrect: false }
      ]
    },
    {
      title: 'จุดประสงค์ของการออกแบบขั้นตอนวิธี',
      desc: 'ทำไมเราจึงควรออกแบบอัลกอริทึมด้วยรหัสเทียมหรือผังงานก่อนลงมือเขียนโค้ดจริง?',
      tip: 'เพื่อแยกตรรกะออกจากไวยากรณ์ภาษาโปรแกรม และป้องกันการแก้ไขโค้ดซ้ำซาก',
      options: [
        { key: 'A', text: 'เพื่อประเมินตรรกะความถูกต้องของลอจิกโดยปราศจากความยุ่งยากของไวยากรณ์ภาษาโปรแกรมมิ่ง', isCorrect: true },
        { key: 'B', text: 'เพื่อจองแรมขนาด 8 ไบต์ให้พร้อมรับ Random Access', isCorrect: false },
        { key: 'C', text: 'เพื่อให้ระบบบิลด์เว็บรันได้ทันทีโดยไม่ต้องใช้ Compiler', isCorrect: false },
        { key: 'D', text: 'เพื่อดึงข้อมูลสแต็กคิวเข้าสู่ไดร์เวอร์บอร์ด', isCorrect: false }
      ]
    },
    {
      title: 'ขั้นตอนการทดสอบ (Testing Phase)',
      desc: 'การทำ "Dry Run" หรือการไล่ตรวจสอบค่าตัวแปรตามขั้นตอนวิธีด้วยกระดาษและดินสอ จัดอยู่ในส่วนใดของวงจรการพัฒนา?',
      tip: 'การไล่ตรวจสอบความถูกต้องของลอจิกก่อนนำไปดีพลอยรันจริง',
      options: [
        { key: 'A', text: 'การวิเคราะห์ความต้องการ', isCorrect: false },
        { key: 'B', text: 'การทดสอบและการตรวจสอบความถูกต้อง (Testing & Verification)', isCorrect: true },
        { key: 'C', text: 'การเขียนโค้ดและคอมไพล์ภาษาคอมพิวเตอร์', isCorrect: false },
        { key: 'D', text: 'การจัดทำคู่มือและบำรุงรักษาโปรเจกต์', isCorrect: false }
      ]
    },
    {
      title: 'การบำรุงรักษาและปรับปรุงประสิทธิภาพ',
      desc: 'ในขั้นสุดท้ายของวงจรพัฒนา (Maintenance & Tuning) กิจกรรมหลักที่มุ่งเน้นเพิ่มเสถียรภาพคือข้อใด?',
      tip: 'การตรวจสอบและคอยซ่อมแซมจุดบกพร่องตามที่ผู้ใช้แจ้งเข้ามาภายหลังใช้งานจริง',
      options: [
        { key: 'A', text: 'การเขียนอัลกอริทึมขึ้นใหม่โดยห้ามวิเคราะห์ผลลัพธ์', isCorrect: false },
        { key: 'B', text: 'การเขียนข้อความคำใบ้คำตอบในเกมโจทย์', isCorrect: false },
        { key: 'C', text: 'การค้นหาและแก้ไขข้อบกพร่องเชิงรันไทม์ (Bug Fixes) และการเพิ่มความเร็วประสิทธิภาพตามพฤติกรรมการใช้งานจริง', isCorrect: true },
        { key: 'D', text: 'การเพิ่มขนาด Pointer เป็น 16 ไบต์', isCorrect: false }
      ]
    }
  ];

  const teacherTaskText = `ใบงานวิชาการที่ 1.5: แบบฝึกหัดการประยุกต์ใช้วงจรการพัฒนาอัลกอริทึม (ADLC)

คำสั่ง:
1. ให้นักเรียนคัดเลือกปัญหาทางธุรกิจในชีวิตประจำวัน 1 อย่าง (เช่น "ระบบจองคิวตัดผมออนไลน์" หรือ "ระบบแนะนำเมนูอาหารตามความชอบ")
2. เขียนอธิบายการพัฒนาตามวงจรขั้นตอนวิธีทั้ง 5 ระยะ (วิเคราะห์ -> ออกแบบ -> เขียนโค้ด -> ทดสอบ -> บำรุงรักษา)
   - ระบุ Input/Output และข้อจำกัดเชิงเทคนิคในระยะวิเคราะห์ให้ละเอียด
   - เขียนรหัสเทียม (Pseudocode) หรือผังงานอย่างง่ายในระยะออกแบบ
3. จัดส่งผลงานรายงานรูปแบบ Markdown ความยาวอย่างน้อย 1 หน้ากระดาษ เอ4 ส่งท้ายบทเรียนเพื่อบันทึกคะแนนสะสม`;

  const stepsInfo = [
    {
      title: '1. วิเคราะห์ปัญหา (Problem Analysis)',
      desc: 'ระบุเป้าหมายให้ชัดเจนว่าต้องการแก้อะไร คัดสรรส่วนนำเข้า (Input) ผลลัพธ์คาดหวัง (Output) และประเมินข้อจำกัดเชิงเทคนิคทางกายภาพ (Constraints)',
      icon: HelpCircle,
      accent: 'amber',
      metric: 'ความชัดเจนความต้องการ: 100%'
    },
    {
      title: '2. ออกแบบขั้นตอนวิธี (Algorithm Design)',
      desc: 'จัดเรียงลำดับลอจิกเป็นขั้น ๆ โดยเขียนสื่อสารออกมาในรูปแบบของรหัสเทียม (Pseudocode) หรือผังงานเรขาคณิต (Flowchart) เพื่อแยกตรรกะออกจากภาษาเขียนโปรแกรม',
      icon: Layers,
      accent: 'orange',
      metric: 'เสถียรภาพสถาปัตยกรรมลอจิก: สูงสุด'
    },
    {
      title: '3. เขียนรหัสคอมพิวเตอร์ (Implementation / Coding)',
      desc: 'แปลงผังงานหรือรหัสเทียมที่ออกแบบไว้ให้กลายเป็นซอร์สโค้ดโปรแกรมจริงในภาษาคอมพิวเตอร์เป้าหมาย (เช่น Python, MySQL, C++) โดยพิจารณาหลักไวยากรณ์',
      icon: Code,
      accent: 'rose',
      metric: 'ภาษาคัดสรร: Python / SQL'
    },
    {
      title: '4. ทดสอบและตรวจสอบ (Testing & Verification)',
      desc: 'รันซอฟต์แวร์เสมือนจริงกับกรณีทดสอบต่าง ๆ (Test Cases) รวมถึงขอบเขตข้อมูลขอบ (Edge Cases) เพื่อดักจับบัก Runtime Errors และแก้ไขให้เรียบร้อย',
      icon: BarChart2,
      accent: 'emerald',
      metric: 'อัตราความถูกต้อง (Accuracy): 100%'
    },
    {
      title: '5. บำรุงรักษาและปรับแต่ง (Maintenance & Tuning)',
      desc: 'คอยสอดส่องซ่อมแซมจุดบกพร่องตามที่ผู้ใช้รายงาน (Bug Fixes) และทำการจูนระบบเพิ่มประสิทธิภาพ (Performance Optimization) เช่น ปรับปรุง Big O ให้ต่ำลง',
      icon: Wrench,
      accent: 'violet',
      metric: 'การบำรุงรักษา: ต่อเนื่องเสถียรภาพ'
    }
  ];

  return (
    <div className="w-full relative">
      {/* 1️⃣ Layer 1: Ambient Backdrop */}
      <AmbientBackdrop blobs={currentBlobs} blur="blur-[130px]" />

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* Section 1: ADLC Theory */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              บทเรียนวิชาการ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              วงจรการพัฒนาขั้นตอนวิธี (Algorithm Development Cycle)
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              ขั้นตอนวิธีที่มีความพรีเมียมและประหยัดซีพียู ไม่ได้เกิดขึ้นจากการนั่งเขียนโค้ดดิบโดยทันที แต่เกิดจากการบริหารตามกระบวนการที่เป็นระบบเรียกว่า <span className="bg-amber-50 border border-amber-200/60 text-amber-900 px-2 py-0.5 rounded text-[14.5px] font-mono font-semibold">วงจรการพัฒนาอัลกอริทึม (Algorithm Development Life Cycle)</span> เพื่อให้แน่ใจว่าลอจิกตอบโจทย์ รันรวดเร็ว และกู้คืนจากข้อผิดพลาดได้อย่างมีแบบแผน
            </p>

            <div className="bg-amber-50/60 backdrop-blur-md border border-amber-200/60 rounded-2xl p-5 border-l-[3px] border-l-amber-500">
              <p className="text-zinc-700 text-[15px] md:text-base leading-relaxed font-normal">
                การข้ามขั้นตอนใดขั้นตอนหนึ่งไป (เช่น ข้ามระยะการออกแบบและกระโดดไปพิมพ์โค้ดทันที) มักทำให้โปรเจกต์ประสบภาวะล้มเหลว ลอจิกรวนหาข้อบกพร่องยาก และจำเป็นต้องรื้อถอนเขียนโครงสร้างใหม่ทั้งหมดในภายหลัง สิ้นเปลืองทั้งเวลาและ RAM อย่างมหาศาล
              </p>
            </div>

            {/* Premium Concept Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <ConceptCard
                symbol="Requirement Analysis"
                title="วิเคราะห์อย่างเป็นวิทยาศาสตร์"
                description="การเจาะลึกข้อกำหนด ข้อมูลนำเข้า ผลผลิตที่ตอบโจทย์ และจำกัดปริมาณ RAM พื้นที่ประมวลผลสูงสุด"
                accent="amber"
              />
              <ConceptCard
                symbol="Design & Flow"
                title="ออกแบบตรรกะแบบแยกอิสระ"
                description="การสร้างผังงานและการเขียนรหัสเทียมเพื่อควบคุมการไหลของระบบก่อนลงลึกเขียนโค้ด"
                accent="orange"
              />
              <ConceptCard
                symbol="Dry Run & Test"
                title="ทดสอบด้วย Test Case ทรงพลัง"
                description="การจำลองสภาพแวดล้อมที่ท้าทายเพื่อคัดสรรตัวดักจับ Runtime Exception และประเมินสมรรถนะบิกโอ"
                accent="rose"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Development Cycle Simulator */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              ตัวจำลองวงจรการพัฒนา
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แผนผังแสดงทิศทางการไหลและการทำงานแบบวงกลม
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              คลิกสัมผัสปุ่มขั้นตอนในฝั่งแผงควบคุมควบคุม (Control Panel) เพื่อศึกษาวิธีคิดเป้าหมาย และดูการเรืองแสงเชื่อมต่อเส้นทางของผังจำลองด้านล่างทีละขั้นตอน
            </p>

            {/* High-Fidelity Simulator Shell */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
              {/* Left Control Panel (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">CONTROL PANEL</span>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-white">
                    <Activity className="w-5 h-5 text-amber-400" />
                    <h4 className="text-lg font-bold">เลือกตำแหน่งระยะในวงจรพัฒนา</h4>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {stepsInfo.map((s, idx) => {
                      const Icon = s.icon;
                      const isActive = cycleStep === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setCycleStep(idx)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                            isActive
                              ? 'bg-amber-600 border-amber-500 text-white font-bold shadow-lg shadow-amber-500/25 scale-[1.01]'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                          <span className="text-[13.5px] font-medium">{s.title}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Narration Description Box */}
                  <div className="bg-black/40 border border-slate-800 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-amber-300 text-xs font-bold font-mono">
                      <Info className="w-4 h-4" /> ภารกิจหลักในระยะนี้:
                    </div>
                    <p className="text-slate-350 text-[13.5px] leading-relaxed">
                      {stepsInfo[cycleStep].desc}
                    </p>
                  </div>
                </div>

                {/* Micro metrics */}
                <div className="mt-8 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                    <span className="block text-[10px] text-slate-500 font-mono tracking-wider">LIFECYCLE STATUS</span>
                    <span className="text-lg font-bold font-mono text-white">ACTIVE PHASE</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                    <span className="block text-[10px] text-slate-500 font-mono tracking-wider">KPI METRIC</span>
                    <span className="text-[11.5px] font-bold font-mono text-white truncate block mt-1">
                      {stepsInfo[cycleStep].metric}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Visualizer Panel (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] p-6 border border-white/5 shadow-2xl relative flex flex-col items-center justify-center min-h-[400px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">VISUALIZER SCREEN</span>
                <span className="text-[9px] font-mono text-amber-400 absolute top-3 right-4 font-bold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 animate-pulse" /> circular development loop
                </span>

                <div className="relative w-[300px] h-[300px] mt-4 select-none">
                  {/* SVG circular arrows connecting geometric centers */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 300 300">
                    <defs>
                      <marker
                        id="arrow-amber"
                        viewBox="0 0 10 10"
                        refX="20"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 1 L 9 5 L 0 9 z" fill="#D97706" />
                      </marker>
                    </defs>

                    {/* Circular flow path connecting 5 nodes placed symmetrically */}
                    {/* Node 0: (150, 45) */}
                    {/* Node 1: (240, 115) */}
                    {/* Node 2: (210, 220) */}
                    {/* Node 3: (90, 220) */}
                    {/* Node 4: (60, 115) */}
                    <path
                      d="M 150 45 Q 210 65 240 115 Q 255 170 210 220 Q 150 255 90 220 Q 45 170 60 115 Q 90 65 150 45"
                      fill="none"
                      stroke="#1E293B"
                      strokeWidth="3.5"
                    />

                    {/* Highlights active path segment */}
                    {cycleStep === 0 && (
                      <path d="M 150 45 Q 210 65 240 115" fill="none" stroke="#D97706" strokeWidth="4.5" markerEnd="url(#arrow-amber)" />
                    )}
                    {cycleStep === 1 && (
                      <path d="M 240 115 Q 255 170 210 220" fill="none" stroke="#D97706" strokeWidth="4.5" markerEnd="url(#arrow-amber)" />
                    )}
                    {cycleStep === 2 && (
                      <path d="M 210 220 Q 150 255 90 220" fill="none" stroke="#D97706" strokeWidth="4.5" markerEnd="url(#arrow-amber)" />
                    )}
                    {cycleStep === 3 && (
                      <path d="M 90 220 Q 45 170 60 115" fill="none" stroke="#D97706" strokeWidth="4.5" markerEnd="url(#arrow-amber)" />
                    )}
                    {cycleStep === 4 && (
                      <path d="M 60 115 Q 90 65 150 45" fill="none" stroke="#D97706" strokeWidth="4.5" markerEnd="url(#arrow-amber)" />
                    )}
                  </svg>

                  {/* HTML nodes positioned absolutely on top */}
                  <div className="absolute inset-0 font-mono text-[10px]">
                    {/* Node 0: วิเคราะห์ปัญหา (150, 45) */}
                    <div
                      className={`absolute top-[20px] left-[105px] w-22 h-12 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all duration-300 z-20 ${
                        cycleStep === 0
                          ? 'bg-amber-600/30 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(217,119,6,0.3)] font-bold scale-105'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5 mb-0.5" />
                      <span>1. วิเคราะห์</span>
                    </div>

                    {/* Node 1: ออกแบบ (240, 115) */}
                    <div
                      className={`absolute top-[90px] left-[195px] w-22 h-12 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all duration-300 z-20 ${
                        cycleStep === 1
                          ? 'bg-amber-600/30 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(217,119,6,0.3)] font-bold scale-105'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 mb-0.5" />
                      <span>2. ออกแบบ</span>
                    </div>

                    {/* Node 2: เขียนโค้ด (210, 220) */}
                    <div
                      className={`absolute top-[195px] left-[165px] w-22 h-12 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all duration-300 z-20 ${
                        cycleStep === 2
                          ? 'bg-amber-600/30 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(217,119,6,0.3)] font-bold scale-105'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      <Code className="w-3.5 h-3.5 mb-0.5" />
                      <span>3. เขียนโค้ด</span>
                    </div>

                    {/* Node 3: ทดสอบ (90, 220) */}
                    <div
                      className={`absolute top-[195px] left-[45px] w-22 h-12 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all duration-300 z-20 ${
                        cycleStep === 3
                          ? 'bg-amber-600/30 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(217,119,6,0.3)] font-bold scale-105'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      <BarChart2 className="w-3.5 h-3.5 mb-0.5" />
                      <span>4. ทดสอบ</span>
                    </div>

                    {/* Node 4: บำรุงรักษา (60, 115) */}
                    <div
                      className={`absolute top-[90px] left-[15px] w-22 h-12 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all duration-300 z-20 ${
                        cycleStep === 4
                          ? 'bg-amber-600/30 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(217,119,6,0.3)] font-bold scale-105'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      <Wrench className="w-3.5 h-3.5 mb-0.5" />
                      <span>5. บำรุงรักษา</span>
                    </div>
                  </div>
                </div>

                {/* Subtitle legends */}
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-slate-400 border-t border-slate-900 pt-4 w-full justify-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-slate-900 border border-slate-800" />
                    <span>ระยะวิพากษ์ทั่วไป</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-amber-650/30 border border-amber-550" />
                    <span>ระยะกำลังประมวลผล (Active Segment)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Gamification Quiz Engine */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              ทดสอบสมรรถนะ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบทดสอบทบทวนวงจรความคืบหน้าการพัฒนาซอฟต์แวร์
            </h3>
          </div>

          <div className="pt-2">
            <QuizEngine
              title="แบบทดสอบวงจรการพัฒนาขั้นตอนวิธี ADLC"
              description="ตอบคำถามวิเคราะห์ลำดับวิทยากลลูปพัฒนาตามเกณฑ์มาตรฐาน SOT"
              levels={quizQuestions}
              accentColor="from-amber-600/20 to-orange-500/10"
              icon={<Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />}
            />
          </div>
        </section>

        {/* Section 5: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ภารกิจส่งงาน: การระบุกระบวนการบริหารโครงการขั้นตอนวิธี"
          taskText={teacherTaskText}
        />
      </main>
    </div>
  );
}
