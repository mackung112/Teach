import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  SimulatorShell,
  ConceptCard,
  SectionBlock,
  AmbientBackdrop
} from '../shared';
import {
  Layers,
  Database,
  ArrowRight,
  Sparkles,
  Cpu,
  Activity,
  HelpCircle,
  TrendingUp,
  BarChart2,
  Clock,
  Code,
  Zap,
  Info
} from 'lucide-react';

export default function DSA1_6() {
  // ─── Layer 1: Ambient Background Blobs ─────────────────────────────────────
  const DSA1_6_BLOBS = [
    { color: 'bg-violet-200',  size: 'w-[450px] h-[450px]', position: '-top-32 -left-32',   opacity: 'opacity-40' },
    { color: 'bg-indigo-200',  size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32',  opacity: 'opacity-35' },
    { color: 'bg-cyan-200',    size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-slate-200',   size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3',    opacity: 'opacity-25' }
  ];

  // ─── Playground State ──────────────────────────────────────────────────────
  const [dataSize, setDataSize] = useState(1000); // N value slider (10 to 50000)
  const [enabledLines, setEnabledLines] = useState({
    o1: true,
    ologn: true,
    on: true,
    on2: true
  });
  const [statusMsg, setStatusMsg] = useState('กำหนดค่า N = 1,000. ระบบพล็อตเส้นกราฟ Big O แบบสดลื่นไหล');
  const [activeCodeView, setActiveCodeView] = useState('o1'); // o1 | ologn | on | on2

  // ─── Computational Logic ───
  // Calculate execution steps for graph height normalization
  // We assume X axis is 0 to dataSize, Y axis steps count
  const getO1Steps = () => 1;
  const getOLognSteps = (n) => Math.max(1, Math.round(Math.log2(n)));
  const getONSteps = (n) => n;
  const getON2Steps = (n) => n * n;

  // Convert Slider Value to rounded friendly benchmarks
  const handleSliderChange = (val) => {
    setDataSize(val);
    setStatusMsg(`[SLIDER UPDATE] ปรับสเกลขนาดข้อมูล N = ${val.toLocaleString()} รายการ. อัตราความต่างของบิ๊กโอเวลากำลังสอง (O(n²)) จะพุ่งดิ่งชันขัดเจนขึ้น`);
  };

  const toggleLine = (line) => {
    setEnabledLines(prev => {
      const next = { ...prev, [line]: !prev[line] };
      setStatusMsg(`[GRAPH TOGGLE] สลับการแสดงเส้นกราฟ ${line.toUpperCase()} -> ${next[line] ? 'เปิด' : 'ปิด'}`);
      return next;
    });
  };

  // Convert N size to estimated time assuming 1 step = 1 microsecond (1µs)
  const formatEstimateTime = (steps) => {
    const totalMicroseconds = steps; // 1 step = 1 microsecond
    if (totalMicroseconds < 1000) {
      return `${totalMicroseconds.toFixed(2)} µs (ไมโครวินาที)`;
    } else if (totalMicroseconds < 1000000) {
      return `${(totalMicroseconds / 1000).toFixed(2)} ms (มิลลิวินาที)`;
    } else if (totalMicroseconds < 60000000) {
      return `${(totalMicroseconds / 1000000).toFixed(2)} วินาที`;
    } else {
      return `${(totalMicroseconds / 60000000).toFixed(2)} นาที`;
    }
  };

  // Math helper to generate SVG Polyline paths nicely
  const getSvgPath = (type) => {
    if (!enabledLines[type]) return '';

    const width = 380;
    const height = 240;
    const padding = 15;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    const points = [];
    const segments = 25;

    for (let i = 0; i <= segments; i++) {
      // ratio along X axis
      const ratioX = i / segments;
      const currentN = Math.max(10, ratioX * dataSize);

      // coordinate X
      const x = padding + ratioX * graphWidth;

      // Coordinate Y (inverted since SVG 0 is at top)
      let valY = 0;
      if (type === 'o1') {
        valY = 1;
      } else if (type === 'ologn') {
        valY = Math.log2(currentN) * 12; // Amplify to make it visible
      } else if (type === 'on') {
        // scale linearly. At max N, let it reach 75% height of graph
        valY = (currentN / dataSize) * (graphHeight * 0.7);
      } else if (type === 'on2') {
        // scale quadratically. At max N, let it reach 100% height of graph
        const quadraticRatio = (currentN * currentN) / (dataSize * dataSize);
        valY = quadraticRatio * graphHeight;
      }

      // invert and clamp to screen bounds
      const y = height - padding - Math.min(graphHeight + 5, valY);
      points.push(`${x},${y}`);
    }

    return points.join(' ');
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={DSA1_6_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Complexity Introduction ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-violet-600 tracking-wider uppercase">
              การประเมินประสิทธิภาพในทางคอมพิวเตอร์ / Growth Rate SOT
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              Time Complexity และ Space Complexity
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Description Block */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
                ในการประเมินความสามารถของขั้นตอนวิธีคอมพิวเตอร์ เราจะไม่จับเวลาเป็นหน่วย "วินาที" หรือวัดพื้นที่เก็บไฟล์เป็น "กิโลไบต์" 
                เพราะคอมพิวเตอร์แต่ละเครื่องมีประสิทธิภาพฮาร์ดแวร์ที่ไม่เท่ากัน แต่ในทางสากล เราจะวัดจาก 
                <span className="bg-violet-50/50 border border-violet-200/50 text-violet-700 px-1.5 py-0.5 rounded text-sm font-mono font-bold">อัตราการเติบโตในการใช้ทรัพยากร (Growth Rate)</span> 
                เมื่อปริมาณข้อมูลเข้า ($n$) ขยายตัวเพิ่มขึ้นอย่างมหาศาล โดยแบ่งออกเป็น 2 มิติหลัก:
              </p>

              <div className="bg-violet-50/50 backdrop-blur-md border border-violet-200/60 rounded-2xl p-5 border-l-[3px] border-l-violet-500 leading-relaxed">
                <h4 className="font-semibold text-violet-900 text-[15px] mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-violet-600 animate-pulse" />
                  ความซับซ้อนทางเวลา (Time Complexity)
                </h4>
                <p className="text-[13.5px] text-slate-650 leading-relaxed">
                  สัดส่วนและอัตราจำนวนรอบการทำงานคอมพิวเตอร์พื้นฐาน (Primitive Operations) ที่ซีพียูต้องประมวลผล 
                  โดยจะเพิ่มขึ้นหรือลดลงแปรผันตามขนาดของข้อมูลอินพุต ($n$) เสมอ
                </p>
              </div>

              <div className="bg-cyan-50/50 backdrop-blur-md border border-cyan-200/60 rounded-2xl p-5 border-l-[3px] border-l-cyan-500 leading-relaxed">
                <h4 className="font-semibold text-cyan-900 text-[15px] mb-1 flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-600 animate-pulse" />
                  ความซับซ้อนทางพื้นที่ (Space Complexity)
                </h4>
                <p className="text-[13.5px] text-slate-650 leading-relaxed">
                  สัดส่วนพื้นที่หน่วยความจำชั่วคราว (RAM Memory) ที่อัลกอริทึมต้องการเพิ่มขึ้นมาในระหว่างการรันโค้ด 
                  ไม่นับรวมพื้นที่ขนาดของอาเรย์หรือข้อมูลนำเข้าเริ่มแรกของระบบ
                </p>
              </div>
            </div>

            {/* Right Flowchart Info board */}
            <div className="lg:col-span-5 bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block mb-2">
                  วิเคราะห์สภาพแวดล้อมกรณีประมวลผล (Execution Scenarios)
                </span>
                <h4 className="text-[16px] font-bold text-slate-800 mb-3">สภาวะกรณีการทดสอบความเร็ว</h4>
                
                <div className="space-y-3 font-sans text-xs">
                  <div className="border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-700 block">Worst-case Scenario (กรณีเลวร้ายที่สุด):</span>
                    <p className="text-slate-500 leading-relaxed mt-0.5">
                      ขอบเขตการทำงานสูงสุดที่แย่ที่สุดที่โปรแกรมจะใช้ มักถูกวิเคราะห์ผ่านสัญกรณ์ Big O เพื่อรับประกันว่าซอฟต์แวร์จะไม่ช้าไปกว่าขีดนี้
                    </p>
                  </div>
                  <div className="border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-700 block">Best-case Scenario (กรณีดีที่สุด):</span>
                    <p className="text-slate-500 leading-relaxed mt-0.5">
                      กรณีที่ชุดข้อมูลเอื้ออำนวยให้ทำงานเสร็จทันที เช่น การทำ Linear Search หาตัวเลขแล้วตัวเลขนั้นดันอยู่ที่ index 0 ทันที
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block">Average-case Scenario (กรณีทั่วไป):</span>
                    <p className="text-slate-500 leading-relaxed mt-0.5">
                      ค่าเฉลี่ยสถิติของปริมาณข้อมูลทั่วไปทั้งหมด มักมีค่ายากแก่การคำนวณและวิเคราะห์อย่างแม่นยำ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Big O Notation Cards Grid ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-violet-600 tracking-wider uppercase">
              สัญกรณ์คณิตศาสตร์คอมพิวเตอร์ / Big O Classes
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              สัญกรณ์บิ๊กโอพื้นฐาน (Big O Notation)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            สัญกรณ์บิ๊กโอเป็นสัญลักษณ์สำหรับบอกความซับซ้อนทางเวลาขอบเขตบนสุด (Upper Bound) ในกรณี Worst-case 
            ที่วิศวกรยอมรับในอุตสาหกรรม โดยมีระดับประสิทธิภาพที่ใช้บ่อยดังนี้:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { symbol: 'O(1)', title: 'เวลาคงที่ (Constant)', desc: 'เวลาคงเดิมเสมอไม่ว่าจะเพิ่มข้อมูลเท่าใด เช่น ดึงข้อมูลผ่าน Index หรือเช็ค Hash Table', code: 'first_element = data[0]', result: 'ดีเลิศ (Best)', accent: 'emerald' },
              { symbol: 'O(log n)', title: 'เวลาลอการิทึม (Logarithmic)', desc: 'ความเร็วเพิ่มขึ้นช้ามากเมื่อข้อมูลเพิ่มมหาศาล เพราะตัดข้อมูลทิ้งทีละครึ่งในทุกสเต็ป เช่น Binary Search', code: 'high = mid - 1', result: 'ดีเยี่ยม (Excellent)', accent: 'cyan' },
              { symbol: 'O(n)', title: 'เวลาเชิงเส้น (Linear)', desc: 'เวลาเติบโตเป็นสัดส่วนตรงกับขนาดข้อมูล เช่น การค้นหาตามลำดับแบบตัวต่อตัวตั้งแต่ต้นจนจบ', code: 'for item in data:', result: 'ปานกลาง (Good)', accent: 'amber' },
              { symbol: 'O(n log n)', title: 'เวลากึ่งเส้นตรง (Linearithmic)', desc: 'พบบ่อยในอัลกอริทึมการจัดเรียงชุดตัวเลขที่มีประสิทธิภาพสูงระดับสากล เช่น Merge & Quick Sort', code: 'merge_sort(left_half)', result: 'ยอมรับได้ (Fair)', accent: 'indigo' },
              { symbol: 'O(n²)', title: 'เวลากำลังสอง (Quadratic)', desc: 'ประสิทธิภาพต่ำ โปรแกรมช้าลงพุ่งชัน มักเกิดขึ้นจากลูปซ้อนลูป (Nested loops) ในโค้ด', code: 'for x in data: for y in data:', result: 'ประสิทธิภาพต่ำ (Poor)', accent: 'orange' },
              { symbol: 'O(2ⁿ)', title: 'กำลังเอกซ์โพเนนเชียล (Exponential)', desc: 'เวลาเพิ่มขึ้น 2 เท่าทุกชิ้นข้อมูลที่ป้อนเข้า มักพบในโค้ด Fibonacci แบบ recursive ดั้งเดิม', code: 'return fib(n-1) + fib(n-2)', result: 'วิกฤต (Worst)', accent: 'rose' }
            ].map((card, idx) => (
              <ConceptCard
                key={idx}
                symbol={card.symbol}
                title={card.title}
                description={card.desc}
                code={card.code}
                result={card.result}
                accent={card.accent}
                resultColor="indigo"
              />
            ))}
          </div>
        </section>

        {/* ─── Section 3: Interactive Simulator (BigO-Grapher) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-violet-600 tracking-wider uppercase">
              ตัวเปรียบเทียบสเกลเวลาสด / BigO-Grapher
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แผนภาพวิเคราะห์ความซับซ้อนบิ๊กโอ (Big O Complexity Dynamic Grapher)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ปรับแถบเลื่อนขนาดข้อมูลป้อนเข้า N ด้านล่างเพื่อสังเกตการพล็อตวิถีกราฟเส้นสดของ Big O แต่ละแบบ 
            และศึกษาตัวแปรประมาณเวลาประมวลผลสมมติในตารางสรุปผลอย่างเรียลไทม์:
          </p>

          <SimulatorShell
            dark
            title="Big O Complexity Grapher"
            icon={<BarChart2 className="w-8 h-8 text-violet-400 animate-pulse" />}
            glowColors="from-slate-800/35 to-slate-950/10"
            iconColor="text-violet-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Left control sandbox panel */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[460px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  SANDBOX CONTROLLER
                </span>

                <div className="space-y-6">
                  {/* Slider size N */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                      1. ปรับขนาดข้อมูลนำเข้า N:
                    </span>
                    <input
                      type="range"
                      min="10"
                      max="50000"
                      step="10"
                      value={dataSize}
                      onChange={e => handleSliderChange(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                    />
                    <div className="flex justify-between items-center text-xs font-mono font-bold text-white bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                      <span className="text-slate-400">ขนาดข้อมูล N (Data Size):</span>
                      <span className="text-violet-400 text-sm tracking-wider">{dataSize.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Toggle Lines Switcher */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                      2. เลือกแสดงผลเส้นกราฟบิ๊กโอ (Toggle Lines):
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'o1', label: '🟢 O(1) - Constant', color: 'border-emerald-500 text-emerald-400' },
                        { id: 'ologn', label: '🔵 O(log n) - Logarithmic', color: 'border-cyan-500 text-cyan-400' },
                        { id: 'on', label: '🟡 O(n) - Linear', color: 'border-amber-500 text-amber-400' },
                        { id: 'on2', label: '🟠 O(n²) - Quadratic', color: 'border-rose-500 text-rose-450' }
                      ].map(line => (
                        <button
                          key={line.id}
                          onClick={() => toggleLine(line.id)}
                          className={`p-2.5 rounded-xl border text-[11px] font-bold transition-all text-left cursor-pointer ${
                            enabledLines[line.id]
                              ? `bg-slate-800/80 ${line.color} shadow shadow-slate-900`
                              : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-350'
                          }`}
                        >
                          {line.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Code Viewer Selector */}
                  <div className="space-y-2 pt-1 border-t border-slate-850">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                      3. ดูรหัสคำสั่งขั้นตอนวิธีเปรียบเทียบ (Code Outline):
                    </span>
                    <div className="flex gap-2">
                      {['o1', 'ologn', 'on', 'on2'].map(opt => (
                        <button
                          key={opt}
                          onClick={() => setActiveCodeView(opt)}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold font-mono transition-all uppercase cursor-pointer ${
                            activeCodeView === opt
                              ? 'bg-violet-600 text-white shadow shadow-violet-650/40'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {/* pre element */}
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 text-[11px] text-emerald-350 font-mono overflow-x-auto min-h-[96px]">
                      {activeCodeView === 'o1' && (
                        <pre>{`# O(1) Constant (เข้าถึงทันที)
def get_element(arr, index):
    return arr[index] # 1 Step`}</pre>
                      )}
                      {activeCodeView === 'ologn' && (
                        <pre>{`# O(log N) Logarithmic (ค้นหาทวิภาค)
def binary_search(arr, val):
    # ตัดข้อมูลทิ้งครึ่งนึงในทุกรอบ
    # Max steps: log2(N)`}</pre>
                      )}
                      {activeCodeView === 'on' && (
                        <pre>{`# O(N) Linear (ค้นหาแบบเชิงเส้น)
def find_item(arr, val):
    for x in arr:
        if x == val: return True`}</pre>
                      )}
                      {activeCodeView === 'on2' && (
                        <pre>{`# O(N²) Quadratic (วนลูปสองชั้น)
def print_pairs(arr):
    for x in arr:
        for y in arr:
            print(x, y)`}</pre>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="mt-4 pt-3 border-t border-slate-850 text-[10.5px] font-mono text-emerald-400 bg-black/30 p-2 rounded-lg border border-slate-850">
                  <span className="text-zinc-500 block text-[8px] uppercase tracking-wider mb-0.5">Terminal Log Output:</span>
                  {statusMsg}
                </div>
              </div>

              {/* Right display graph board */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[460px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">
                  COMPLEXITY GRAPH & MICRO-TIME SCALING
                </span>

                <div className="grow flex flex-col justify-center items-center mt-6">
                  {/* Graph Canvas SVG */}
                  <div className="w-full max-w-sm h-[220px] bg-slate-900/40 border border-slate-850 rounded-xl relative overflow-hidden flex items-center justify-center p-3 shadow-inner">
                    <svg className="w-full h-full" viewBox="0 0 380 240">
                      {/* Grid lines */}
                      <g stroke="#1e293b" strokeWidth="1">
                        <line x1="15" y1="20" x2="365" y2="20" />
                        <line x1="15" y1="75" x2="365" y2="75" />
                        <line x1="15" y1="130" x2="365" y2="130" />
                        <line x1="15" y1="185" x2="365" y2="185" />
                        <line x1="15" y1="225" x2="365" y2="225" />
                        <line x1="15" y1="20" x2="15" y2="225" />
                        <line x1="102.5" y1="20" x2="102.5" y2="225" />
                        <line x1="190" y1="20" x2="190" y2="225" />
                        <line x1="277.5" y1="20" x2="277.5" y2="225" />
                        <line x1="365" y1="20" x2="365" y2="225" />
                      </g>

                      {/* Axis Labels */}
                      <text x="190" y="237" fill="#64748b" textAnchor="middle" className="text-[8.5px] font-bold font-mono">ขนาดข้อมูลนำเข้า N →</text>
                      <text x="8" y="120" fill="#64748b" textAnchor="middle" transform="rotate(-90 8 120)" className="text-[8.5px] font-bold font-mono">ขั้นตอนประมวลผล (Steps) →</text>

                      {/* O(1) Constant (Emerald line) */}
                      {enabledLines.o1 && (
                        <polyline
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2.5"
                          points={getSvgPath('o1')}
                          className="transition-all duration-300"
                        />
                      )}

                      {/* O(log n) Logarithmic (Cyan line) */}
                      {enabledLines.ologn && (
                        <polyline
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="2.5"
                          points={getSvgPath('ologn')}
                          className="transition-all duration-300"
                        />
                      )}

                      {/* O(n) Linear (Amber line) */}
                      {enabledLines.on && (
                        <polyline
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="2.5"
                          points={getSvgPath('on')}
                          className="transition-all duration-300"
                        />
                      )}

                      {/* O(n^2) Quadratic (Rose/Red line) */}
                      {enabledLines.on2 && (
                        <polyline
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="2.5"
                          points={getSvgPath('on2')}
                          className="transition-all duration-300"
                        />
                      )}
                    </svg>
                  </div>
                </div>

                {/* Micro-Time Estimation Table */}
                <div className="mt-4 bg-slate-900 border border-slate-850 p-4 rounded-xl">
                  <div className="text-[10px] font-mono text-slate-500 uppercase block mb-2">
                    ตารางคาดการณ์ระยะเวลาคำนวณจริง (Estimated Time @ 1µs per step):
                  </div>

                  <div className="space-y-2.5 font-mono text-xs">
                    {/* O1 Row */}
                    {enabledLines.o1 && (
                      <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                        <span className="text-emerald-400 font-bold shrink-0">O(1) Constant:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 hidden md:inline">1 ขั้นตอนเสถียร</span>
                          <span className="text-white font-bold">{formatEstimateTime(getO1Steps())}</span>
                        </div>
                      </div>
                    )}

                    {/* Ologn Row */}
                    {enabledLines.ologn && (
                      <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                        <span className="text-cyan-400 font-bold shrink-0">O(log n) Logarithmic:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 hidden md:inline">{getOLognSteps(dataSize)} ขั้นตอน</span>
                          <span className="text-white font-bold">{formatEstimateTime(getOLognSteps(dataSize))}</span>
                        </div>
                      </div>
                    )}

                    {/* On Row */}
                    {enabledLines.on && (
                      <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                        <span className="text-amber-400 font-bold shrink-0">O(n) Linear:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 hidden md:inline">{dataSize.toLocaleString()} ขั้นตอน</span>
                          <span className="text-white font-bold">{formatEstimateTime(getONSteps(dataSize))}</span>
                        </div>
                      </div>
                    )}

                    {/* On2 Row */}
                    {enabledLines.on2 && (
                      <div className="flex justify-between items-center pb-0.5">
                        <span className="text-rose-400 font-bold shrink-0">O(n²) Quadratic:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 hidden md:inline">{(dataSize * dataSize).toLocaleString()} ขั้นตอน</span>
                          <span className="text-rose-400 font-bold">
                            {formatEstimateTime(getON2Steps(dataSize))}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SimulatorShell>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="วิเคราะห์และเปรียบเทียบสเกลเวลาบิ๊กโอจากการประมวลผลเชิงพิกัด"
          taskText={`คำชี้แจง: ให้นักเรียนสั่งวิเคราะห์ทดลองและลากปรับตัวเลื่อนขนาดข้อมูล N ในตัวจำลอง BigO-Grapher ด้านบน สังเกตพฤติกรรมความชันของเส้นกราฟที่เกิดการเปลี่ยนรูป และตอบคำถามทางวิชาการต่อไปนี้ลงในระบบการส่งการบ้าน:

1. จากผลการจำลองเหตุใดสัญกรณ์บิ๊กโอเวลากำลังสอง O(n²) จึงจัดเป็นระดับประสิทธิภาพ "ต่ำ" ที่ไม่แนะนำให้นำมาประยุกต์ใช้กับโครงงานที่มีปริมาณข้อมูล N ขนาดใหญ่
   - อธิบายอิงจากอัตราความชันของกราฟ และระยะเวลาคาดการณ์ในตารางสรุปผลเมื่อ N ปรับตัวสูงขึ้นสู่ระดับ 50,000 รายการ
2. เหตุใดขั้นตอนวิธีประเภทลอการิทึม O(log n) จึงมีอัตราการประหยัดพลังงานซีพียูที่ยอดเยี่ยมกว่าแบบ O(n) เชิงเส้นอย่างทวีคูณ
   - อ้างอิงกลไกการค้นหาแบบทวิภาค (Binary Search) และลักษณะการตัดปริมาณความยาวข้อมูลในหน่วยประมวลผล
3. จงเขียนตัวอย่างตรรกะโค้ดจำลอง (Pseudocode) หรือโค้ดจริงภาษาคอมพิวเตอร์ ที่มีระดับ Time Complexity แตกต่างกันดังนี้:
   - ตรรกะแบบเวลาคงที่ O(1) จำนวน 1 ตัวอย่าง
   - ตรรกะแบบเวลาเชิงเส้น O(n) จำนวน 1 ตัวอย่าง`}
        />
      </main>
    </div>
  );
}
