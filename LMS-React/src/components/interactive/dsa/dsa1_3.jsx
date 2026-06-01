import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  Network,
  HelpCircle,
  Activity,
  ArrowRight,
  GitCommit,
  GitMerge,
  Sparkles,
  Zap,
  CheckCircle,
  Info
} from 'lucide-react';
import {
  AmbientBackdrop,
  OptionSelector,
  ConceptCard,
  SectionBlock,
  QuizEngine
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

export default function DSA1_3() {
  const [classificationMode, setClassificationMode] = useState('primitive');

  const currentBlobs = [
    { color: 'bg-violet-500/10', size: 'w-[45rem] h-[45rem]', position: '-top-20 -left-20', opacity: 'opacity-40' },
    { color: 'bg-indigo-500/5', size: 'w-[40rem] h-[40rem]', position: 'top-1/3 -right-20', opacity: 'opacity-30' },
    { color: 'bg-emerald-500/10', size: 'w-[35rem] h-[35rem]', position: '-bottom-20 left-1/4', opacity: 'opacity-25' }
  ];

  const quizQuestions = [
    {
      title: 'การจำแนกประเภทโครงสร้างข้อมูล',
      desc: 'ข้อใดคือหลักเกณฑ์หลักในการแบ่งแยกโครงสร้างข้อมูลระหว่าง "แบบเชิงเส้น (Linear)" และ "แบบไม่เชิงเส้น (Non-Linear)"?',
      tip: 'คิดถึงมิติความสัมพันธ์ของข้อมูลแบบต่อเนื่อง 1-to-1 กับ 1-to-many',
      options: [
        { key: 'A', text: 'ชนิดข้อมูลที่จัดเก็บว่าต้องเป็นจำนวนเต็มหรือตัวอักษร', isCorrect: false },
        { key: 'B', text: 'ลำดับความสัมพันธ์การไหลของโหนด: เชิงเส้นไหลต่อเนี่องหนึ่งต่อหนึ่ง ในขณะที่แบบไม่เชิงเส้นมีกิ่งก้านสาขาเชื่อมโยงหลายทาง', isCorrect: true },
        { key: 'C', text: 'ความเร็วในการจองพื้นที่ของแรมบนระบบปฏิบัติการ 64-bit', isCorrect: false },
        { key: 'D', text: 'สิทธิ์ในการใช้งานฟังก์ชันประมวลผล Python built-in', isCorrect: false }
      ]
    },
    {
      title: 'ประเภทข้อมูลพรีมิทีฟ',
      desc: 'ชนิดข้อมูลใดจัดอยู่ในกลุ่ม "ข้อมูลแบบพื้นฐาน (Primitive Data Types)" ในภาษาคอมพิวเตอร์ทั่วไป?',
      tip: 'ข้อมูลเชิงเดี่ยวที่ชิปเซตซีพียูประมวลผลลอจิกฐานสองได้โดยตรง',
      options: [
        { key: 'A', text: 'Class และ Struct', isCorrect: false },
        { key: 'B', text: 'float, int และ char', isCorrect: true },
        { key: 'C', text: 'Stack และ Queue', isCorrect: false },
        { key: 'D', text: 'Array และ Linked List', isCorrect: false }
      ]
    },
    {
      title: 'ข้อใดไม่ใช่โครงสร้างข้อมูลเชิงเส้น',
      desc: 'โครงสร้างข้อมูลชนิดใดต่อไปนี้ จัดอยู่ในกลุ่มโครงสร้างข้อมูลแบบไม่เชิงเส้น (Non-Linear Data Structure)?',
      tip: 'เป็นโครงสร้างที่มีระบบลำดับขั้น (Hierarchical) หรือใยข่ายความสัมพันธ์',
      options: [
        { key: 'A', text: 'อาเรย์ (Array)', isCorrect: false },
        { key: 'B', text: 'แถวคิว (Queue)', isCorrect: false },
        { key: 'C', text: 'ต้นไม้ค้นหาทวิภาค (Binary Search Tree)', isCorrect: true },
        { key: 'D', text: 'สแต็ก (Stack)', isCorrect: false }
      ]
    },
    {
      title: 'การเชื่อมต่อของกราฟ',
      desc: 'โครงสร้างข้อมูลประเภทกราฟ (Graph) จัดอยู่ในกลุ่มใด และมีการเชื่อมต่อแบบใด?',
      tip: 'กราฟสามารถเชื่อมโยงโหนดทั่วไปได้แบบใยข่ายเครือข่าย',
      options: [
        { key: 'A', text: 'ไม่เชิงเส้น (Non-Linear) เชื่อมต่อได้อิสระแบบข่ายใย (Network) ระหว่างโหนด', isCorrect: true },
        { key: 'B', text: 'เชิงเส้น (Linear) เชื่อมต่อแบบวงกลมเท่านั้น', isCorrect: false },
        { key: 'C', text: 'พรีมิทีฟ (Primitive) จัดวางบนแรมแบบกระจัดกระจาย', isCorrect: false },
        { key: 'D', text: 'ข้อมูลแบบระเบียบชั้นสูงควบคุมด้วย Queue', isCorrect: false }
      ]
    },
    {
      title: 'การเข้าถึงข้อมูล Tree',
      desc: 'ลักษณะเด่นของต้นไม้ (Tree) ในฐานะโครงสร้างข้อมูลแบบไม่เชิงเส้นคืออะไร?',
      tip: 'มีจุดเริ่มต้นยอดสูงสุดเพียงโหนดเดียว',
      options: [
        { key: 'A', text: 'ไม่มีพอยน์เตอร์ชี้ตำแหน่ง', isCorrect: false },
        { key: 'B', text: 'เก็บข้อมูลต่อกันแบบยาวต่อเนื่องในแรมผืนใหญ่', isCorrect: false },
        { key: 'C', text: 'มีความสัมพันธ์แบบลำดับขั้น (Hierarchical) เริ่มต้นจากรากสูงสุด (Root Node) ลงมาหาใบ', isCorrect: true },
        { key: 'D', text: 'เหมาะกับการทำประวัติย้อนหลัง Undo เสมอ', isCorrect: false }
      ]
    }
  ];

  const teacherTaskText = `ใบงานวิชาการที่ 1.3: แผนผังจำแนกประเภทโครงสร้างข้อมูลระดับอาชีพ

คำสั่ง:
1. ให้นักเรียนจำแนกและเขียนสรุปลักษณะของโครงสร้างข้อมูลทั้ง 3 ระดับ (Primitive, Linear, Non-Linear) อธิบายความเหมาะสมในการนำไปประยุกต์ใช้งานเชิงวิศวกรรมคอมพิวเตอร์
2. อ้างอิงจากตัวจำลองประเภทโครงสร้างข้อมูล (Classification Visualizer):
   - จงอธิบายพฤติกรรมโครงสร้างทางกายภาพเมื่อข้อมูลเดินทางผ่านเส้นเชื่อมโยงแบบเชิงเส้น และเหตุใดการค้นหาในโครงสร้างแบบไม่เชิงเส้น (เช่น Tree) จึงทำได้เร็วกว่าในบางสถานการณ์
3. จัดทำผลงานเป็นรายงานสรุปแบบวิชาการ ส่งรายงานรูปแบบมาร์กดาวน์ลงสู่ระบบปลายภาคเรียน`;

  return (
    <div className="w-full relative">
      {/* 1️⃣ Layer 1: Ambient Backdrop */}
      <AmbientBackdrop blobs={currentBlobs} blur="blur-[130px]" />

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* Section 1: Data Classification Theory */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-violet-600 tracking-wider uppercase">
              บทเรียนวิชาการ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การจำแนกประเภทของโครงสร้างข้อมูล
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              เพื่อประโยชน์ในการคัดสรรเครื่องมือจัดวางข้อมูลให้เหมาะสมกับปัญหา วิศวกรคอมพิวเตอร์ได้ทำการจำแนก <span className="bg-violet-50 border border-violet-200/60 text-violet-900 px-2 py-0.5 rounded text-[14.5px] font-mono font-semibold">ประเภทของโครงสร้างข้อมูล (Data Structure Classifications)</span> ออกเป็น 3 ตระกูลหลัก ตามความซับซ้อนของรูปแบบและทิศทางการจัดเรียงตัวของโหนดข้อมูล
            </p>

            <div className="bg-violet-50/60 backdrop-blur-md border border-violet-200/60 rounded-2xl p-5 border-l-[3px] border-l-violet-500">
              <p className="text-zinc-700 text-[15px] md:text-base leading-relaxed font-normal">
                ความรู้ความเข้าใจเรื่องการจำแนกจะช่วยให้นักเรียนสามารถเลือกหยิบโครงสร้างข้อมูลไปประกอบกับฟังก์ชันและเงื่อนไขได้อย่างเป็นเหตุเป็นผล ป้องกันการใช้โครงสร้างข้อมูลที่ซับซ้อนเกินจำเป็น (เช่น การเลือกใช้กราฟในการเก็บรายการซื้อของง่าย ๆ ซึ่งจะทำให้สิ้นเปลืองพื้นที่ RAM และประมวลผลล่าช้า)
              </p>
            </div>

            {/* Premium Concept Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <ConceptCard
                symbol="Primitive"
                title="ข้อมูลแบบพื้นฐาน"
                description="หน่วยข้อมูลขนาดเล็กคงที่ จองแรมแบบคงที่ จัดการกับระบบเลขจำนวนเต็ม ทศนิยม และอักขระเดี่ยว"
                accent="emerald"
              />
              <ConceptCard
                symbol="Linear"
                title="โครงสร้างข้อมูลเชิงเส้น"
                description="การจัดกลุ่มข้อมูลเชื่อมโยงกันแบบเรียงลำดับต่อเนื่อง 1-to-1 จากแรกสุดไปหาท้ายสุด เช่น อาเรย์ ลิสต์ สแต็ก คิว"
                accent="indigo"
              />
              <ConceptCard
                symbol="Non-Linear"
                title="โครงสร้างแบบไม่เชิงเส้น"
                description="การจัดกลุ่มข้อมูลแบบลำดับขั้นหรือใยข่ายความสัมพันธ์หลายทิศทาง 1-to-many เช่น ต้นไม้ และแผนผังกราฟ"
                accent="violet"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Classification Visualizer */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-violet-600 tracking-wider uppercase">
              ตัวจำลองประเภทโครงสร้างข้อมูล
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบจำลองแผนภาพความสัมพันธ์และระดับชั้นข้อมูล
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              ปรับเปลี่ยนตัวเลือกของสวิตช์ควบคุมด้านล่าง เพื่อรับชมแผนผังแสดงโครงสร้างทางกายภาพ ทิศทางการไหล และความเชื่อมโยงความสัมพันธ์ของข้อมูลดิบบนตารางจำลอง
            </p>

            {/* High-Fidelity Simulator Shell */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
              {/* Left Control Panel (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">CONTROL PANEL</span>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-white">
                    <Layers className="w-5 h-5 text-violet-400" />
                    <h4 className="text-lg font-bold">เลือกหมวดหมู่เพื่อจำลองภาพ</h4>
                  </div>

                  <OptionSelector
                    options={[
                      { value: 'primitive', label: 'ข้อมูลพื้นฐาน (Primitive)' },
                      { value: 'linear', label: 'แบบเชิงเส้น (Linear)' },
                      { value: 'non_linear', label: 'แบบไม่เชิงเส้น (Non-Linear)' }
                    ]}
                    value={classificationMode}
                    onChange={(val) => setClassificationMode(val)}
                    cols={1}
                    mode="pill"
                    activeColor="bg-violet-600 border-violet-500 text-white font-bold shadow-md shadow-violet-500/20"
                  />

                  {/* Narration Description Box */}
                  <div className="bg-black/40 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-violet-300 text-xs font-bold font-mono">
                      <Info className="w-4 h-4" /> พฤติกรรมเชิงโครงสร้างข้อมูล:
                    </div>
                    {classificationMode === 'primitive' && (
                      <p className="text-slate-300 text-sm leading-relaxed">
                        **Primitive Data Types:** ชนิดข้อมูลเดี่ยว ๆ ไม่มีฟิลด์แยกย่อย จองพื้นที่เป็นกล่องบล็อกเดี่ยว ๆ ในหน่วยความจำแรม เหมาะแก่การเป็นตัวแปรพารามิเตอร์พื้นฐานของการเขียนคำสั่งประมวลผลลอจิกทั่วไป
                      </p>
                    )}
                    {classificationMode === 'linear' && (
                      <p className="text-slate-300 text-sm leading-relaxed">
                        **Linear Structures (โครงสร้างเชิงเส้น):** ทุกโหนดข้อมูลจะมีความสัมพันธ์เชื่อมโยงกับโหนดอื่นในทิศทางหนึ่งต่อหนึ่ง มีเส้นทางการท่องผ่าน (Traversal) ที่เรียงลำดับแน่นอนจากหัวไปท้าย เช่น อาเรย์ต่อเนื่อง รายการเชื่อมโยง (Linked List) หรือโครงสร้างเข้าออกสิทธิพิเศษอย่างคิวและสแต็ก
                      </p>
                    )}
                    {classificationMode === 'non_linear' && (
                      <p className="text-slate-300 text-sm leading-relaxed">
                        **Non-Linear Structures (โครงสร้างไม่เชิงเส้น):** ความสัมพันธ์ของข้อมูลไม่มีทางเดินต่อเป็นเส้นตรงเส้นเดียว แต่จะแผ่ขยายออกเป็นรูปกิ่งก้านสาขา (Tree - ลำดับระเบียบชั้น) หรือรูปแบบข่ายเชื่อมโยงเครือข่ายโยงใย (Graph - เครือข่ายสัมพันธ์หลายขั้ว) เหมาะกับข้อมูลที่มีความซับซ้อนสูงและทิศทางหลายเงื่อนไข
                      </p>
                    )}
                  </div>
                </div>

                {/* Micro metrics */}
                <div className="mt-8 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                    <span className="block text-[10px] text-slate-500 font-mono tracking-wider">RELATIONSHIP</span>
                    <span className="text-lg font-bold font-mono text-white">
                      {classificationMode === 'primitive' ? 'None' : classificationMode === 'linear' ? '1-to-1' : '1-to-Many'}
                    </span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                    <span className="block text-[10px] text-slate-500 font-mono tracking-wider">TRAVERSAL</span>
                    <span className="text-lg font-bold font-mono text-white">
                      {classificationMode === 'primitive' ? 'Direct' : classificationMode === 'linear' ? 'Sequential' : 'Multi-Path'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Visualizer Panel (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] p-6 border border-white/5 shadow-2xl relative flex flex-col items-center justify-center min-h-[400px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">VISUALIZER SCREEN</span>
                <span className="text-[9px] font-mono text-violet-400 absolute top-3 right-4 font-bold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 animate-pulse" /> CLASSIFICATION GRAPH VISUALIZER
                </span>

                <div className="relative w-[384px] h-[288px] mt-4">
                  {/* SVG Overlay to connect absolute centers */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <defs>
                      <marker
                        id="arrow-violet"
                        viewBox="0 0 10 10"
                        refX="25"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 1 L 9 5 L 0 9 z" fill="#8B5CF6" />
                      </marker>
                    </defs>

                    {/* Linear Mode Connections */}
                    {classificationMode === 'linear' && (
                      <>
                        {/* Node A (cx: 60, cy: 144) to Node B (cx: 148, cy: 144) */}
                        <path d="M 60 144 L 148 144" fill="none" stroke="#8B5CF6" strokeWidth="3" markerEnd="url(#arrow-violet)" />
                        {/* Node B to Node C */}
                        <path d="M 148 144 L 236 144" fill="none" stroke="#8B5CF6" strokeWidth="3" markerEnd="url(#arrow-violet)" />
                        {/* Node C to Node D */}
                        <path d="M 236 144 L 324 144" fill="none" stroke="#8B5CF6" strokeWidth="3" markerEnd="url(#arrow-violet)" />
                      </>
                    )}

                    {/* Non-Linear Tree Mode Connections */}
                    {classificationMode === 'non_linear' && (
                      <>
                        {/* Root Node (cx: 192, cy: 50) to Child Left B (cx: 100, cy: 160) */}
                        <path d="M 192 50 L 100 160" fill="none" stroke="#8B5CF6" strokeWidth="3" markerEnd="url(#arrow-violet)" />
                        {/* Root Node to Child Right C (cx: 284, cy: 160) */}
                        <path d="M 192 50 L 284 160" fill="none" stroke="#8B5CF6" strokeWidth="3" markerEnd="url(#arrow-violet)" />
                        {/* Child Left B to Leaf D (cx: 50, cy: 250) */}
                        <path d="M 100 160 L 50 250" fill="none" stroke="#8B5CF6" strokeWidth="3" markerEnd="url(#arrow-violet)" />
                        {/* Child Left B to Leaf E (cx: 150, cy: 250) */}
                        <path d="M 100 160 L 150 250" fill="none" stroke="#8B5CF6" strokeWidth="3" markerEnd="url(#arrow-violet)" />
                      </>
                    )}
                  </svg>

                  {/* HTML elements positioned at exact center matching coordinates */}
                  <div className="absolute inset-0">
                    {classificationMode === 'primitive' && (
                      <div className="w-full h-full flex justify-center items-center gap-8">
                        <div className="w-18 h-18 rounded-2xl bg-emerald-600/20 border-2 border-emerald-500 text-emerald-300 flex flex-col items-center justify-center font-mono animate-pulse">
                          <span className="text-[10px] opacity-60">int</span>
                          <span className="font-bold text-lg">10</span>
                        </div>
                        <div className="w-18 h-18 rounded-2xl bg-emerald-600/20 border-2 border-emerald-500 text-emerald-300 flex flex-col items-center justify-center font-mono">
                          <span className="text-[10px] opacity-60">char</span>
                          <span className="font-bold text-lg">\'X\'</span>
                        </div>
                        <div className="w-18 h-18 rounded-2xl bg-emerald-600/20 border-2 border-emerald-500 text-emerald-300 flex flex-col items-center justify-center font-mono">
                          <span className="text-[10px] opacity-60">bool</span>
                          <span className="font-bold text-lg">True</span>
                        </div>
                      </div>
                    )}

                    {classificationMode === 'linear' && (
                      <div className="w-full h-full relative">
                        {/* Node A (cx: 60, cy: 144) -> x = 60 - 28 = 32 */}
                        <div className="absolute top-[116px] left-[20px] w-20 h-14 rounded-xl bg-indigo-600/25 border-2 border-indigo-500 text-indigo-200 flex flex-col items-center justify-center font-mono">
                          <span className="text-[8px] opacity-50">Head (1st)</span>
                          <span className="font-bold text-sm">Node: 10</span>
                        </div>
                        {/* Node B (cx: 148, cy: 144) -> x = 148 - 40 = 108 */}
                        <div className="absolute top-[116px] left-[108px] w-20 h-14 rounded-xl bg-indigo-600/25 border-2 border-indigo-500/80 text-indigo-200 flex flex-col items-center justify-center font-mono">
                          <span className="text-[8px] opacity-50">2nd Node</span>
                          <span className="font-bold text-sm">Node: 20</span>
                        </div>
                        {/* Node C (cx: 236, cy: 144) -> x = 196 */}
                        <div className="absolute top-[116px] left-[196px] w-20 h-14 rounded-xl bg-indigo-600/25 border-2 border-indigo-500/80 text-indigo-200 flex flex-col items-center justify-center font-mono">
                          <span className="text-[8px] opacity-50">3rd Node</span>
                          <span className="font-bold text-sm">Node: 30</span>
                        </div>
                        {/* Node D (cx: 324, cy: 144) -> x = 284 */}
                        <div className="absolute top-[116px] left-[284px] w-20 h-14 rounded-xl bg-indigo-600/25 border-2 border-indigo-500 text-indigo-200 flex flex-col items-center justify-center font-mono">
                          <span className="text-[8px] opacity-50">Tail (4th)</span>
                          <span className="font-bold text-sm">Node: 40</span>
                        </div>
                      </div>
                    )}

                    {classificationMode === 'non_linear' && (
                      <div className="w-full h-full relative">
                        {/* Root Node (cx: 192, cy: 50) */}
                        <div className="absolute top-[16px] left-[152px] w-20 h-14 rounded-xl bg-violet-600/30 border-2 border-violet-500 text-violet-100 flex flex-col items-center justify-center font-mono shadow-[0_0_10px_rgba(139,92,246,0.25)]">
                          <span className="text-[8px] opacity-50">Root Node</span>
                          <span className="font-bold text-sm">Root: 50</span>
                        </div>

                        {/* Child Left B (cx: 100, cy: 160) */}
                        <div className="absolute top-[126px] left-[60px] w-20 h-14 rounded-xl bg-violet-600/20 border border-violet-500/80 text-violet-200 flex flex-col items-center justify-center font-mono">
                          <span className="text-[8px] opacity-50">Left Child</span>
                          <span className="font-bold text-sm">Node: 30</span>
                        </div>

                        {/* Child Right C (cx: 284, cy: 160) */}
                        <div className="absolute top-[126px] left-[244px] w-20 h-14 rounded-xl bg-violet-600/20 border border-violet-500/80 text-violet-200 flex flex-col items-center justify-center font-mono">
                          <span className="text-[8px] opacity-50">Right Child</span>
                          <span className="font-bold text-sm">Node: 70</span>
                        </div>

                        {/* Leaf D (cx: 50, cy: 250) */}
                        <div className="absolute top-[216px] left-[10px] w-20 h-14 rounded-xl bg-violet-600/15 border border-violet-500/60 text-violet-300 flex flex-col items-center justify-center font-mono">
                          <span className="text-[8px] opacity-50">Leaf Node</span>
                          <span className="font-bold text-sm">Leaf: 15</span>
                        </div>

                        {/* Leaf E (cx: 150, cy: 250) */}
                        <div className="absolute top-[216px] left-[110px] w-20 h-14 rounded-xl bg-violet-600/15 border border-violet-500/60 text-violet-300 flex flex-col items-center justify-center font-mono">
                          <span className="text-[8px] opacity-50">Leaf Node</span>
                          <span className="font-bold text-sm">Leaf: 35</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subtitle legends */}
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-slate-400 border-t border-slate-900 pt-4 w-full justify-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-emerald-500" />
                    <span>ข้อมูลแบบเดี่ยว (Primitive)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-indigo-500" />
                    <span>ข้อมูลแบบแถวเชิงเส้น (Linear)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-violet-500" />
                    <span>ข้อมูลสัมพันธ์ซับซ้อน (Non-Linear)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Gamification Quiz Engine */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-violet-600 tracking-wider uppercase">
              ทดสอบสมรรถนะ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบทดสอบประเมินประเภทและโครงสร้างข้อมูล
            </h3>
          </div>

          <div className="pt-2">
            <QuizEngine
              title="แบบทดสอบตรรกะการจำแนกประเภทข้อมูลเชิงวิศวกรรม"
              description="ตอบคำถามเพื่อวิเคราะห์ความเร็วของเชิงเส้นเทียบกับเชิงลำดับขั้นในตารางระบบจำลอง"
              levels={quizQuestions}
              accentColor="from-teal-600/20 to-emerald-500/10"
              icon={<Network className="w-6 h-6 text-teal-400 animate-pulse" />}
            />
          </div>
        </section>

        {/* Section 5: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ภารกิจส่งงาน: รายงานจำแนกการเลือกใช้งานโครงสร้างข้อมูลในระบบ"
          taskText={teacherTaskText}
        />
      </main>
    </div>
  );
}
