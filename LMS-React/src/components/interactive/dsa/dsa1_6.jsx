import React, { useState } from 'react';
import {
  Activity,
  Sliders,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Zap,
  CheckCircle,
  Info,
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

export default function DSA1_6() {
  const [dataN, setDataN] = useState(50); // N size slider from 5 to 100

  // Calculate dynamic values for each Big O
  const o1 = 1;
  const oLogN = Math.max(1, Math.round(Math.log2(dataN)));
  const oN = dataN;
  const oN2 = dataN * dataN;

  const currentBlobs = [
    { color: 'bg-rose-500/10', size: 'w-[45rem] h-[45rem]', position: '-top-40 -left-40', opacity: 'opacity-40' },
    { color: 'bg-orange-500/5', size: 'w-[40rem] h-[40rem]', position: 'top-1/4 -right-20', opacity: 'opacity-30' },
    { color: 'bg-violet-500/10', size: 'w-[35rem] h-[35rem]', position: '-bottom-20 left-1/3', opacity: 'opacity-25' }
  ];

  const quizQuestions = [
    {
      title: 'ความหมายของ Big O',
      desc: 'ในเชิงวิศวกรรมคอมพิวเตอร์ สัญกรณ์ Big O (Big O Notation) มีหน้าที่หลักในการระบุสิ่งใด?',
      tip: 'Big O บ่งบอกขอบเขตบนอัตราการเติบโตของการทำงานเมื่อข้อมูลนำเข้าเพิ่มขนาดขึ้น',
      options: [
        { key: 'A', text: 'จำนวนตัวอักษรบรรทัดโค้ดในไฟล์ดั้งเดิม', isCorrect: false },
        { key: 'B', text: 'อัตราการเติบโตหรือการขยายตัวของขั้นตอนประมวลผล (Growth Rate) เมื่อขนาดข้อมูลนำเข้า N ขยายตัวขึ้นสู่กรณีแย่ที่สุด', isCorrect: true },
        { key: 'C', text: 'ราคาค่าตัวของอุปกรณ์ NVMe SSD บนบอร์ดระบบ', isCorrect: false },
        { key: 'D', text: 'ปริมาณสายเชื่อมโยง UTP ทางกายภาพ', isCorrect: false }
      ]
    },
    {
      title: 'ลำดับประสิทธิภาพของ Big O',
      desc: 'ข้อใดเรียงลำดับดัชนีประสิทธิภาพ Big O จากระดับที่ "เร็วที่สุด (ประมวลผลน้อยสุด)" ไปยัง "ช้าที่สุด (ประมวลผลมากสุด)" ได้ถูกต้อง?',
      tip: 'Constant time ไวกว่า Logarithmic, Linear ไวกว่า Quadratic',
      options: [
        { key: 'A', text: 'O(N²) < O(N) < O(log N) < O(1)', isCorrect: false },
        { key: 'B', text: 'O(1) < O(log N) < O(N) < O(N²)', isCorrect: true },
        { key: 'C', text: 'O(N) < O(1) < O(N²) < O(log N)', isCorrect: false },
        { key: 'D', text: 'O(log N) < O(N²) < O(1) < O(N)', isCorrect: false }
      ]
    },
    {
      title: 'ความซับซ้อนแบบ O(1)',
      desc: 'ขั้นตอนวิธีแบบใดจัดอยู่ในประเภทความซับซ้อนเชิงเวลาแบบ O(1) หรือคงที่ (Constant Time)?',
      tip: 'ทำงานเสร็จสิ้นในขั้นตอนเดียวโดยไม่ต้องวนลูปสแกนขนาด N',
      options: [
        { key: 'A', text: 'การค้นหาข้อมูลในตาราง Linked List ขนาด 1,000 โหนดย้อนกลับ', isCorrect: false },
        { key: 'B', text: 'การเข้าถึงข้อมูลช่องดัชนีระบุช่อง (Index Access) ใน Array ต่อเนื่อง O(1)', isCorrect: true },
        { key: 'C', text: 'การเรียงข้อมูลแบบฟอง (Bubble Sort) ข้อมูลขนาด N', isCorrect: false },
        { key: 'D', text: 'การท่องผ่านต้นไม้ค้นหาทวิภาคครบทุกโหนด', isCorrect: false }
      ]
    },
    {
      title: 'ความซับซ้อนแบบ O(N²)',
      desc: 'การทำงานที่มีโครงสร้างลูปสองชั้นซ้อนกัน (Nested Loops) ในการประมวลผลสแกนอาร์เรย์ขนาด N มักจะมีความซับซ้อนเชิงเวลาในระดับใด?',
      tip: 'ลูปนอกหมุน N ครั้ง ในลูปในหมุน N ครั้งต่อรอบ จะได้ผลรวมกี่ครั้ง?',
      options: [
        { key: 'A', text: 'O(1)', isCorrect: false },
        { key: 'B', text: 'O(log N)', isCorrect: false },
        { key: 'C', text: 'O(N²)', isCorrect: true },
        { key: 'D', text: 'O(N)', isCorrect: false }
      ]
    },
    {
      title: 'Space Complexity คืออะไร',
      desc: 'ในมิติความซับซ้อนเชิงพื้นที่ (Space Complexity) ตัวจำลองจะตรวจสอบมิติด้านใด?',
      tip: 'มิติพื้นที่บ่งชี้อัตราการจองเนื้อที่เพื่อพักข้อมูล',
      options: [
        { key: 'A', text: 'จำนวนมอนิเตอร์กล้องวงจรปิดทางกายภาพ', isCorrect: false },
        { key: 'B', text: 'เนื้อที่ RAM จัดสรรชั่วคราวสูงสุดที่ขั้นตอนวิธีต้องการเพื่อประมวลผลจนสำเร็จลุล่วง', isCorrect: true },
        { key: 'C', text: 'ความเร็วสูงสุดในการดีพลอยขึ้น Cloud Server', isCorrect: false },
        { key: 'D', text: 'อัตราการลดพื้นที่ของไดร์เวอร์เสียง', isCorrect: false }
      ]
    }
  ];

  const teacherTaskText = `ใบงานวิชาการที่ 1.6: การวิเคราะห์สมรรถนะ Big O และเปรียบเทียบขีดจำกัดขั้นตอนวิธี

คำสั่ง:
1. ให้นักเรียนเขียนอธิบายลักษณะเฉพาะตัวของสัญกรณ์ Big O คลาสต่อไปนี้: O(1), O(log N), O(N), O(N log N) และ O(N²) พร้อมยกตัวอย่างขั้นตอนวิธีจริงประกอบ
2. อ้างอิงจากแบบจำลองเส้นโค้ง Big O (Growth Curve Visualizer):
   - เมื่อจำนวนนำเข้า N เพิ่มขึ้นจาก 10 เป็น 100 อัตราการคำนวณของขั้นตอนแบบ O(N) และ O(N²) มีระดับการขยายตัวต่างกันกี่เท่า?
   - จงอธิบายสาเหตุที่โครงสร้างแบบ O(log N) จึงจัดเป็นสุดยอดสมรรถนะในการทำระบบค้นหาเมื่อเทียบกับ O(N)
3. จัดส่งบันทึกวิเคราะห์ผลลงสู่พื้นที่กระดานดำบทสรุปท้ายภาคเรียน`;

  return (
    <div className="w-full relative">
      {/* 1️⃣ Layer 1: Ambient Backdrop */}
      <AmbientBackdrop blobs={currentBlobs} blur="blur-[130px]" />

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* Section 1: Big O Theory */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-rose-600 tracking-wider uppercase">
              บทเรียนวิชาการ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การวิเคราะห์ประสิทธิภาพเบื้องต้น (Algorithm Analysis)
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              ในทางวิทยาศาสตร์คอมพิวเตอร์ <span className="bg-rose-50 border border-rose-200/60 text-rose-900 px-2 py-0.5 rounded text-[14.5px] font-mono font-semibold">สัญกรณ์ Big O (Big O Notation)</span> คือ สัญกรณ์ทางคณิตศาสตร์ที่นำมาอธิบาย **ขอบเขตบน** ของอัตราการขยายตัวในขั้นตอนประมวลผล (Growth Rate) ของขั้นตอนวิธีเมื่อขนาดของปริมาณข้อมูลนำเข้า (N) เพิ่มขึ้นจนถึงขีดสุด ช่วยให้นักพัฒนาคาดการณ์ความเร็วและพฤติกรรมของซอฟต์แวร์โดยตัดทอนตัวแปรความเร็วชิปประมวลผลและการตั้งค่าทางฮาร์ดแวร์ออกไป
            </p>

            <div className="bg-rose-50/60 backdrop-blur-md border border-rose-200/60 rounded-2xl p-5 border-l-[3px] border-l-rose-500">
              <p className="text-zinc-700 text-[15px] md:text-base leading-relaxed font-normal">
                บ่อยครั้งที่โปรแกรมรันได้รวดเร็วเมื่อทดสอบกับข้อมูล 10 ตัวอย่าง แต่อาจทำให้ระบบค้างพังสนิทเมื่อเปลี่ยนไปรันใช้งานจริงบนอุตสาหกรรมที่มีข้อมูลนำเข้านับล้านรายการ การคำนวณและเข้าใจ Big O ล่วงหน้าจึงเป็นการป้องกันความเสี่ยงด้านความเสถียรที่ดีที่สุด
              </p>
            </div>

            {/* Concept Cards for Big O Classes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
              <ConceptCard
                symbol="O(1)"
                title="Constant Time"
                description="ขั้นตอนประมวลผลคงที่ ไม่ขึ้นตรงต่อขนาด N เลย รวดเร็วที่สุดในตรรกะระบบ"
                accent="emerald"
              />
              <ConceptCard
                symbol="O(log N)"
                title="Logarithmic Time"
                description="การลดภาระลงทีละครึ่งต่อหนึ่งสเตป เช่น Binary Search ประสิทธิภาพความเร็วชั้นนำ"
                accent="cyan"
              />
              <ConceptCard
                symbol="O(N)"
                title="Linear Time"
                description="เติบโตเป็นเส้นตรงหนึ่งต่อหนึ่งตามปริมาณข้อมูลนำเข้า N เช่น ลูปสแกนหนึ่งรอบ"
                accent="amber"
              />
              <ConceptCard
                symbol="O(N²)"
                title="Quadratic Time"
                description="เติบโตทวีคูณกำลังสอง มีโครงสร้างลูปสองชั้นซ้อนกัน ความเร็วตกร่วงโรยอย่างรวดเร็ว"
                accent="rose"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Big O Growth Curve Visualizer */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-rose-600 tracking-wider uppercase">
              ตัวจำลองเส้นโค้งสมรรถนะ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตารางจำลองกราฟอัตราการเติบโตและการคำนวณซีพียู
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              ปรับสไลเดอร์ขนาดข้อมูล $N$ ด้านล่างเพื่อดูจำนวน CPU Operations ที่เกิดขึ้นจริงสะท้อนอัตราส่วนความต่างอย่างเป็นประจักษ์ชัดเจน
            </p>

            {/* High-Fidelity Simulator Shell */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
              {/* Left Control Panel (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">CONTROL PANEL</span>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-white">
                    <Sliders className="w-5 h-5 text-rose-400" />
                    <h4 className="text-lg font-bold">กำหนดขนาดตัวแปรนำเข้า N</h4>
                  </div>

                  {/* Slider Control */}
                  <div className="bg-black/40 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400">ขนาดข้อมูล (N):</span>
                      <span className="text-rose-400 font-bold text-base">{dataN} รายการ</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={dataN}
                      onChange={(e) => setDataN(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>N = 5</span>
                      <span>N = 100</span>
                    </div>
                  </div>

                  {/* Operational Summary Grid */}
                  <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-3 font-mono text-xs">
                    <div className="text-slate-500 font-bold uppercase tracking-wider">// จำนวนขั้นตอนการทำงาน (CPU Ops)</div>
                    <div className="flex justify-between text-emerald-400">
                      <span>คงที่ O(1):</span>
                      <span className="font-bold">{o1} ขั้นตอน</span>
                    </div>
                    <div className="flex justify-between text-cyan-400">
                      <span>ลดครึ่ง O(log N):</span>
                      <span className="font-bold">~{oLogN} ขั้นตอน</span>
                    </div>
                    <div className="flex justify-between text-amber-400">
                      <span>เส้นตรง O(N):</span>
                      <span className="font-bold">{oN} ขั้นตอน</span>
                    </div>
                    <div className="flex justify-between text-rose-400">
                      <span>กำลังสอง O(N²):</span>
                      <span className="font-bold">{oN2.toLocaleString()} ขั้นตอน</span>
                    </div>
                  </div>
                </div>

                {/* Warning callout */}
                <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] leading-relaxed text-slate-400 bg-black/20 p-3 rounded-xl border border-slate-800">
                  <strong>ตรรกะเปรียบเทียบ:</strong> ที่ N = {dataN} การทำงานของขั้นตอน $O(N^2)$ มีความต้องการขั้นตอนประมวลผลสูงถึง **{oN2.toLocaleString()} ขั้น** ซึ่งช้ากว่า $O(\log N)$ ที่ประมวลผลเพียง **{oLogN} ขั้น** อย่างลึกซึ้งมหาศาล!
                </div>
              </div>

              {/* Right Graph Panel (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[420px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">VISUALIZER SCREEN</span>
                <span className="text-[9px] font-mono text-rose-400 absolute top-3 right-4 font-bold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 animate-pulse" /> DYNAMIC BIG O GROWTH CURVE
                </span>

                {/* Coordinate Grid in SVG */}
                <div className="flex-1 flex items-center justify-center w-full mt-6">
                  <svg className="w-[300px] h-[300px] border-b-2 border-l-2 border-slate-700 relative z-10" viewBox="0 0 100 100">
                    {/* SVG grid lines */}
                    <line x1="0" y1="20" x2="100" y2="20" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2" />
                    <line x1="0" y1="40" x2="100" y2="40" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2" />
                    <line x1="0" y1="60" x2="100" y2="60" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2" />
                    <line x1="0" y1="80" x2="100" y2="80" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2" />
                    <line x1="20" y1="0" x2="20" y2="100" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2" />
                    <line x1="40" y1="0" x2="40" y2="100" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2" />
                    <line x1="60" y1="0" x2="60" y2="100" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2" />
                    <line x1="80" y1="0" x2="80" y2="100" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2" />

                    {/* Chart curves */}
                    {/* O(1): Constant line near bottom (y = 95) */}
                    <line x1="0" y1="95" x2="100" y2="95" stroke="#10B981" strokeWidth="2.5" />

                    {/* O(log N): Curve (y = 95 - 4*log2(x)) */}
                    <path d="M 1 95 Q 20 80 100 70" fill="none" stroke="#06B6D4" strokeWidth="2.5" />

                    {/* O(N): Straight line going diagonally up (y = 95 - x*0.8) */}
                    <line x1="0" y1="95" x2="100" y2="15" stroke="#F59E0B" strokeWidth="2.5" />

                    {/* O(N^2): Sharp curve rising immediately */}
                    <path d="M 0 95 Q 15 90 30 10" fill="none" stroke="#EF4444" strokeWidth="2.5" />

                    {/* Dynamic Point Marker representing the active N size */}
                    {/* Normalized coordinates based on N */}
                    <circle cx={dataN} cy={95 - dataN * 0.8} r="4" fill="#F59E0B" className="animate-ping" />
                    <circle cx={dataN} cy={95 - dataN * 0.8} r="3.5" fill="#F59E0B" />
                  </svg>
                </div>

                {/* Subtitle legends */}
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-slate-400 border-t border-slate-900 pt-4 w-full justify-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-emerald-500" />
                    <span>O(1)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-cyan-500" />
                    <span>O(log N)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-amber-500" />
                    <span>O(N)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-rose-500" />
                    <span>O(N²)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Gamification Quiz Engine */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-rose-600 tracking-wider uppercase">
              ทดสอบสมรรถนะ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบทดสอบประเมินสมรรถนะ Big O และความเร็ว
            </h3>
          </div>

          <div className="pt-2">
            <QuizEngine
              title="แบบทดสอบสัญกรณ์ Big O และขั้นตอนวิธี"
              description="ตอบคำถามเพื่อวิเคราะห์ความเร็วของอัลกอริทึมในการขยายตัวกรณี Worst Case ตามเกณฑ์ SOT"
              levels={quizQuestions}
              accentColor="from-rose-600/20 to-orange-500/10"
              icon={<BarChart2 className="w-6 h-6 text-rose-400 animate-pulse" />}
            />
          </div>
        </section>

        {/* Section 5: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ภารกิจส่งงาน: การวิเคราะห์สมรรถนะการจัดคลาสประสิทธิภาพ Big O"
          taskText={teacherTaskText}
        />
      </main>
    </div>
  );
}
