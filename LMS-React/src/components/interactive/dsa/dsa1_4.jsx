import React, { useState, useEffect, useRef } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  SimulatorShell,
  ConceptCard,
  SectionBlock,
  AmbientBackdrop
} from '../shared';
import {
  Cpu,
  Layers,
  Database,
  ArrowRight,
  Play,
  RotateCcw,
  AlertTriangle,
  Zap,
  Info,
  Network,
  Activity,
  Sliders,
  Sparkles,
  RefreshCw,
  Plus,
  Trash2,
  FileCode,
  SquareDot,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';

export default function DSA1_4() {
  // ─── 1. Blobs for Layer 1 Background ──────────────────────────────────────
  const DSA1_4_BLOBS = [
    { color: 'bg-emerald-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-40' },
    { color: 'bg-teal-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-35' },
    { color: 'bg-cyan-200',    size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-emerald-100', size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-25' }
  ];

  // ─── State for Topic 1: Algorithm representation (Tabs) ───────────────────
  const [representationTab, setRepresentationTab] = useState('natural');
  const [hoveredNode, setHoveredNode] = useState(null);

  const flowchartNodes = {
    start: { title: 'Start Node', desc: 'จุดเริ่มต้นการสั่งวิเคราะห์อัลกอริทึม' },
    input: { title: 'Input N', desc: 'รับค่าอินพุตตัวเลข N จากผู้ใช้งาน (เช่น 10,000)' },
    init: { title: 'Initialize Variables', desc: 'ประกาศตัวแปรสะสม sum = 0 และ i = 1 ในหน่วยความจำ' },
    decision: { title: 'Loop Decision (i <= N)', desc: 'ตรวจสอบว่ารอบตัวนับ i เกินขนาดตัวเลข N หรือไม่' },
    action: { title: 'Accumulate & Increment', desc: 'สะสมค่า sum += i และเพิ่มรอบตัวนับ i++ ในลูป' },
    output: { title: 'Output Result', desc: 'แสดงผลรวมสุทธิ sum ออกทางหน้าจอสำเร็จ' },
    end: { title: 'End Node', desc: 'สิ้นสุดการประมวลผลขั้นตอนวิธีอย่างสมบูรณ์' }
  };

  // ─── State for AlgoQuality-Sim Simulator ─────────────────────────────────
  const [selectedAlgo, setSelectedAlgo] = useState('good'); // good | bad | broken
  const [inputN, setInputN] = useState(10000);
  const [isRunning, setIsRunning] = useState(false);
  const [iterations, setIterations] = useState(0);
  const [simStatus, setSimStatus] = useState('idle'); // idle | processing | completed | crash
  const [simResult, setSimResult] = useState(null);
  const [simTime, setSimTime] = useState(null);
  
  const timerRef = useRef(null);

  // Simulation execution loop
  const startSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIterations(0);
    setSimResult(null);
    setSimTime(null);
    setSimStatus('processing');

    const startTime = performance.now();

    if (selectedAlgo === 'good') {
      // Good O(1) Algorithm: Calculates immediately using Math Formula N*(N+1)/2
      setTimeout(() => {
        const res = (inputN * (inputN + 1)) / 2;
        setIterations(1);
        setSimResult(res);
        setSimStatus('completed');
        setIsRunning(false);
        setSimTime((performance.now() - startTime).toFixed(3));
      }, 500);
    } else if (selectedAlgo === 'bad') {
      // Bad O(N) Algorithm: Simulates loops
      let count = 0;
      const stepSize = Math.max(1, Math.ceil(inputN / 40));
      
      timerRef.current = setInterval(() => {
        count += stepSize;
        if (count >= inputN) {
          clearInterval(timerRef.current);
          const res = (inputN * (inputN + 1)) / 2;
          setIterations(inputN);
          setSimResult(res);
          setSimStatus('completed');
          setIsRunning(false);
          setSimTime((performance.now() - startTime).toFixed(2));
        } else {
          setIterations(count);
        }
      }, 30);
    } else {
      // Broken Algorithm: Infinite loop simulation
      let count = 0;
      timerRef.current = setInterval(() => {
        count += 35000;
        setIterations(count);
        if (count >= 1000000) {
          setSimStatus('crash');
        }
      }, 30);
    }
  };

  const stopSimulation = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    if (simStatus === 'processing') setSimStatus('idle');
  };

  const resetSimulation = () => {
    stopSimulation();
    setIterations(0);
    setSimResult(null);
    setSimTime(null);
    setSimStatus('idle');
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Scorecard evaluation mapping for the active algorithm
  const getScorecard = () => {
    const scores = {
      correctness: { label: 'มีความถูกต้องแม่นยำ (Correctness)', pass: false, desc: 'รันแล้วต้องได้คำตอบที่ถูกต้องทุกเคส' },
      definiteness: { label: 'มีความชัดเจนไม่คลุมเครือ (Definiteness)', pass: true, desc: 'คำสั่งแจ่มแจ้ง ตีความได้ประเด็นเดียว' },
      finiteness: { label: 'มีจุดสิ้นสุดการทำงาน (Finiteness)', pass: false, desc: 'ต้องทำงานเสร็จสิ้นภายในขีดจำกัดสเตป' },
      efficiency: { label: 'มีประสิทธิภาพสูง (Efficiency)', pass: false, desc: 'ประหยัดเวลา CPU และแรมหน่วยความจำ' },
      feasibility: { label: 'ทำงานได้จริงมีความเป็นไปได้ (Feasibility)', pass: true, desc: 'เขียนโปรแกรมรันได้ภายใต้ฮาร์ดแวร์จริง' }
    };

    if (selectedAlgo === 'good') {
      scores.correctness.pass = true;
      scores.finiteness.pass = true;
      scores.efficiency.pass = true;
    } else if (selectedAlgo === 'bad') {
      scores.correctness.pass = true;
      scores.finiteness.pass = true;
      scores.efficiency.pass = false; // Fails efficiency because of slow O(N) linear loop
    } else {
      // Broken infinite
      scores.correctness.pass = false; // Never finishes, so incorrect
      scores.finiteness.pass = false; // Fails finiteness (Infinite loop)
      scores.efficiency.pass = false; // Infinite loop ruins efficiency
    }

    return scores;
  };

  const scoreCard = getScorecard();

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={DSA1_4_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Definition of Algorithm ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              ขั้นตอนวิธี / นิยามความหมาย
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              นิยามและความหมายของอัลกอริทึม
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left text description (Fluid Open-Air style) */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
                  <strong className="text-zinc-950 font-semibold">อัลกอริทึม (Algorithm) หรือ ขั้นตอนวิธี</strong> คือ 
                  ชุดคำสั่งหรือกระบวนการทำงานที่ถูกกำหนดขึ้นอย่างเป็นลำดับขั้นตอน มีความชัดเจนและไม่คลุมเครือ 
                  ใช้เพื่อแก้ไขปัญหา (Problem Solving) หรือประมวลผลข้อมูลให้ออกมาเป็นผลลัพธ์ (Output) ที่ถูกต้อง 
                  ผ่านการสั่งงานระดับทรานซิสเตอร์ในระบบฮาร์ดแวร์คอมพิวเตอร์
                </p>

                <div className="bg-emerald-50/60 backdrop-blur-md border border-emerald-200/60 rounded-2xl p-5 border-l-[3px] border-l-emerald-500 leading-relaxed">
                  <h4 className="font-semibold text-emerald-900 text-[15px] mb-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                    การป้อนเข้าและส่งออก
                  </h4>
                  <p className="text-[13.5px] text-slate-600 leading-relaxed">
                    ขั้นตอนวิธีที่ดีจะรับข้อมูลเข้า (Input) เข้าสู่สมการคำนวณหรือลูปวนรอบที่กำหนด 
                    และนำส่งผลลัพธ์ (Output) ที่ถูกต้องกลับออกไปให้ผู้ใช้งานทุกกรณีอย่างไร้ข้อผิดพลาด
                  </p>
                </div>
              </div>

              {/* Tab switching buttons */}
              <div className="space-y-3 pt-4">
                <span className="text-xs font-bold text-slate-400 tracking-wider block uppercase">เลือกรูปแบบการแสดงออกของอัลกอริทึม (Representation):</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'natural', label: 'ภาษาธรรมชาติ (Natural)' },
                    { id: 'pseudocode', label: 'รหัสจำลอง (Pseudocode)' },
                    { id: 'flowchart', label: 'ผังงาน (Flowchart)' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setRepresentationTab(tab.id)}
                      className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 cursor-pointer
                        ${representationTab === tab.id
                          ? 'bg-emerald-600 text-white shadow shadow-emerald-600/25 border-emerald-500'
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-50'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Display Board for representations */}
            <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between min-h-[380px]">
              <div className="h-full flex flex-col justify-between">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 border-b border-slate-800 pb-2 mb-3">
                  <span># ALGORITHM REPRESENTATION ENGINE</span>
                  <span className="text-emerald-400">interactive view</span>
                </div>

                {representationTab === 'natural' && (
                  <div className="space-y-4 py-2 grow flex flex-col justify-center animate-fadeIn">
                    <h4 className="text-[15px] font-bold text-white flex items-center gap-1.5 font-sans">
                      <SquareDot className="w-4 h-4 text-emerald-400" />
                      ภาษาธรรมชาติ (Natural Language)
                    </h4>
                    <p className="text-[13px] text-zinc-400 leading-relaxed font-sans">
                      การอธิบายขั้นตอนการทำงานด้วยภาษาพูดทั่วไปของมนุษย์ เพื่อให้อ่านเข้าใจได้ในเบื้องต้น เช่น:
                    </p>
                    <div className="bg-black/40 border border-slate-800 p-4 rounded-xl font-sans text-xs text-zinc-300 space-y-2">
                      <p>1. เริ่มต้น: รับค่าตัวเลขหลัก $N$ จากผู้ใช้งาน</p>
                      <p>2. ตั้งค่าตัวแปรผลรวมสะสมเริ่มต้นเป็น 0 และตัวนับรอบเริ่มที่ 1</p>
                      <p>3. ตราบใดที่ตัวนับรอบน้อยกว่าหรือเท่ากับ $N$ ให้บวกตัวนับรอบเข้ากับผลรวมสะสม แล้วบวกตัวนับเพิ่มขึ้นทีละ 1 จากนั้นทำซ้ำ</p>
                      <p>4. พิมพ์ผลรวมสะสมสุทธิออกทางหน้าจอ และจบการทำงาน</p>
                    </div>
                  </div>
                )}

                {representationTab === 'pseudocode' && (
                  <div className="space-y-3 py-2 grow flex flex-col justify-center animate-fadeIn">
                    <h4 className="text-[15px] font-bold text-white flex items-center gap-1.5 font-sans">
                      <FileCode className="w-4 h-4 text-emerald-400" />
                      รหัสจำลอง (Pseudocode)
                    </h4>
                    <p className="text-[13px] text-zinc-400 leading-relaxed font-sans">
                      การเขียนรหัสลอจิกจำลองที่ลอกเลียนไวยากรณ์ภาษาคอมพิวเตอร์อย่างเป็นระเบียบ แต่ยังอ่านเข้าใจง่าย:
                    </p>
                    <pre className="bg-black/50 p-4 rounded-xl border border-slate-800 font-mono text-[12.5px] text-emerald-350 leading-relaxed overflow-x-auto">
{`ALGORITHM CalculateSum(N)
  INPUT: Integer N
  OUTPUT: Integer sum of 1 to N
  
  sum = 0
  i = 1
  WHILE i <= N DO
    sum = sum + i
    i = i + 1
  ENDWHILE
  
  RETURN sum
END`}
                    </pre>
                  </div>
                )}

                {representationTab === 'flowchart' && (
                  <div className="grow flex flex-col justify-between items-stretch animate-fadeIn">
                    <div className="flex gap-4 items-stretch h-[280px]">
                      {/* Flowchart Diagram SVG (Absolute Center Connection concept) */}
                      <div className="w-[180px] bg-black/40 border border-slate-850 rounded-xl overflow-hidden relative shadow-inner shrink-0">
                        <svg className="absolute inset-0 w-full h-full">
                          {/* Flow lines */}
                          <g stroke="#334155" strokeWidth="2">
                            <line x1="90" y1="35" x2="90" y2="70" />
                            <line x1="90" y1="100" x2="90" y2="135" />
                            <line x1="90" y1="165" x2="90" y2="195" />
                            <line x1="90" y1="235" x2="90" y2="265" />
                            <line x1="90" y1="295" x2="90" y2="330" />
                            {/* Loop right horizontal line */}
                            <line x1="125" y1="215" x2="155" y2="215" />
                            {/* Loop back vertical line */}
                            <line x1="155" y1="215" x2="155" y2="150" />
                            <line x1="155" y1="150" x2="90" y2="150" />
                          </g>

                          {/* Nodes circles/rects */}
                          {/* Start */}
                          <rect x="65" y="15" width="50" height="20" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="1.5" onMouseEnter={() => setHoveredNode('start')} onMouseLeave={() => setHoveredNode(null)} />
                          <text x="90" y="29" fill="#f8fafc" textAnchor="middle" className="text-[9px] font-bold font-mono cursor-default">START</text>

                          {/* Input N */}
                          <polygon points="70,70 120,70 110,100 60,100" fill="#1e293b" stroke="#475569" strokeWidth="1.5" onMouseEnter={() => setHoveredNode('input')} onMouseLeave={() => setHoveredNode(null)} />
                          <text x="90" y="89" fill="#f8fafc" textAnchor="middle" className="text-[9px] font-bold font-mono cursor-default">INPUT N</text>

                          {/* Init */}
                          <rect x="50" y="135" width="80" height="30" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1.5" onMouseEnter={() => setHoveredNode('init')} onMouseLeave={() => setHoveredNode(null)} />
                          <text x="90" y="153" fill="#f8fafc" textAnchor="middle" className="text-[8px] font-bold font-mono cursor-default">sum = 0, i = 1</text>

                          {/* Decision i <= N */}
                          <polygon points="90,195 125,215 90,235 55,215" fill="#1e293b" stroke="#475569" strokeWidth="1.5" onMouseEnter={() => setHoveredNode('decision')} onMouseLeave={() => setHoveredNode(null)} />
                          <text x="90" y="218" fill="#f8fafc" textAnchor="middle" className="text-[8px] font-bold font-mono cursor-default">i &lt;= N ?</text>

                          {/* Loop action */}
                          <rect x="125" y="195" width="5" height="5" opacity="0" onMouseEnter={() => setHoveredNode('action')} onMouseLeave={() => setHoveredNode(null)} />

                          {/* Output */}
                          <polygon points="65,265 115,265 105,295 55,295" fill="#1e293b" stroke="#475569" strokeWidth="1.5" onMouseEnter={() => setHoveredNode('output')} onMouseLeave={() => setHoveredNode(null)} />
                          <text x="85" y="284" fill="#f8fafc" textAnchor="middle" className="text-[9px] font-bold font-mono cursor-default">PRINT sum</text>

                          {/* End */}
                          <rect x="65" y="330" width="50" height="20" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="1.5" onMouseEnter={() => setHoveredNode('end')} onMouseLeave={() => setHoveredNode(null)} />
                          <text x="90" y="344" fill="#f8fafc" textAnchor="middle" className="text-[9px] font-bold font-mono cursor-default">END</text>
                        </svg>
                      </div>

                      {/* Hover details explanation panel */}
                      <div className="grow bg-slate-950/45 p-4 rounded-xl border border-slate-800 flex flex-col justify-center">
                        {hoveredNode ? (
                          <div className="space-y-2 animate-fadeIn">
                            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                              {flowchartNodes[hoveredNode].title}
                            </span>
                            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                              {flowchartNodes[hoveredNode].desc}
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-500 italic text-center block">
                            นำเมาส์ไปชี้วางบนสัญลักษณ์ผังงานด้านซ้าย เพื่อดูคำอธิบายตรรกะรายขั้นตอน...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Characteristics of a Good Algorithm ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              มาตรฐานอุตสาหกรรม / คุณสมบัติที่ยอมรับ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              คุณสมบัติของอัลกอริทึมที่ดี
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { id: 1, title: 'มีความถูกต้องแม่นยำ (Correctness)', desc: 'ต้องให้ผลลัพธ์ที่ถูกต้องแม่นยำในทุกชุดข้อมูลนำเข้า (Inputs) ไม่ใช่ถูกต้องแค่บางกรณีเท่านั้น' },
              { id: 2, title: 'มีความชัดเจนไม่คลุมเครือ (Definiteness)', desc: 'ขั้นตอนวิธีมีลำดับชัดเจน ตีความได้ความหมายเดียว คอมพิวเตอร์เข้าใจตรรกะได้ตรงจุด' },
              { id: 3, title: 'มีจุดสิ้นสุดการทำงาน (Finiteness)', desc: 'ทำงานเสร็จภายในเวลาและจำนวนสเตปที่จำกัด ห้ามตกเข้าสู่ลูปอนันต์ (Infinite Loop) ถาวร' },
              { id: 4, title: 'มีประสิทธิภาพสูง (Efficiency)', desc: 'ต้องแก้ปัญหาโดยประหยัดทรัพยากร ทั้งประหยัดเวลา CPU และลดภาระหน่วยความจำ RAM' },
              { id: 5, title: 'ทำงานได้จริงเป็นไปได้ (Feasibility)', desc: 'สามารถแปลงมาเขียนเป็นโปรแกรมรันได้ภายใต้เทคโนโลยี และข้อจำกัดแรม/ซีพียูในโลกจริง' }
            ].map((prop) => (
              <div
                key={prop.id}
                className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between min-h-[190px]"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">0{prop.id}</span>
                  </div>
                  <h4 className="text-[14.5px] font-bold text-zinc-900 mb-1 leading-snug">{prop.title}</h4>
                  <p className="text-[12.5px] text-slate-500 leading-relaxed font-sans">{prop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Section 3: Interactive Simulator (AlgoQuality-Sim) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              ตัวจำลองประสิทธิภาพซอฟต์แวร์ / AlgoQuality-Sim
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ห้องจำลองวัดคุณสมบัติความสิ้นสุดและประสิทธิภาพ
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทดลองสลับรันขั้นตอนวิธี 3 รูปแบบที่รับมือปัญหาบวกเลข 1 ถึง N เดียวกัน 
            เพื่อสังเกตข้อบกพร่องเรื่องลูปอนันต์ (Finiteness) และประสิทธิภาพความเร็วแบบเรียลไทม์:
          </p>

          <SimulatorShell
            dark
            title="Algorithm Quality & Finiteness Analyzer"
            icon={<Activity className="w-8 h-8 text-emerald-400" />}
            glowColors="from-emerald-600/20 to-teal-500/10"
            iconColor="text-emerald-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Left Control Sandbox */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[460px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  ALGORITHM SELECTOR
                </div>

                <div className="space-y-6">
                  {/* Select Algorithm Mode */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">1. เลือกรูปแบบขั้นตอนวิธี (Algorithm):</span>
                    <div className="flex flex-col gap-2">
                      {[
                        { id: 'good', label: 'สูตรคณิตศาสตร์คงที่ (Good - O(1))', desc: 'หาคำตอบตรงๆ ด้วยสมการ N * (N + 1) / 2', accent: 'border-emerald-500 text-emerald-400 bg-emerald-950/25' },
                        { id: 'bad', label: 'วนลูปบวกเพิ่มทีละ 1 (Bad - O(N))', desc: 'บวกวนไปเรื่อยๆ จนกว่าตัวนับรอบจะถึง N', accent: 'border-amber-500 text-amber-400 bg-amber-950/25' },
                        { id: 'broken', label: 'ลูปอนันต์ไม่มีเบรก (Broken - Infinite)', desc: 'จำลองสภาวะ while True: ขาดจุดสิ้นสุด', accent: 'border-rose-500 text-rose-400 bg-rose-950/25' }
                      ].map((item) => (
                        <label
                          key={item.id}
                          className={`flex flex-col p-3 rounded-xl border text-xs cursor-pointer transition-all duration-200
                            ${selectedAlgo === item.id
                              ? item.accent
                              : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800/85'
                            } ${isRunning ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                          <div className="flex items-center gap-2 font-bold">
                            <input
                              type="radio"
                              name="algoSelect"
                              value={item.id}
                              checked={selectedAlgo === item.id}
                              onChange={() => setSelectedAlgo(item.id)}
                              disabled={isRunning}
                              className="accent-emerald-500 cursor-pointer"
                            />
                            <span>{item.label}</span>
                          </div>
                          <span className="text-[10px] opacity-70 mt-1 font-sans font-normal">{item.desc}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Input Number N */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">2. ขนาดตัวเลขอินพุต N:</span>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min={10}
                        max={10000000}
                        value={inputN}
                        onChange={(e) => setInputN(Math.min(10000000, Math.max(10, parseInt(e.target.value) || 0)))}
                        disabled={isRunning}
                        className="bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-xs rounded-xl px-3.5 py-2 text-white grow font-mono font-bold"
                      />
                      <div className="flex gap-1.5">
                        {[10000, 100000, 1000000].map((val) => (
                          <button
                            key={val}
                            onClick={() => setInputN(val)}
                            disabled={isRunning}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[10px] font-bold px-2 rounded-lg cursor-pointer transition-all disabled:opacity-40"
                          >
                            {val.toLocaleString()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trigger simulation controls */}
                <div className="mt-8 pt-4 border-t border-slate-800 flex gap-3">
                  {isRunning ? (
                    <button
                      onClick={stopSimulation}
                      className="grow bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
                    >
                      <XCircle className="w-4 h-4" /> สั่งกู้ระบบและหยุด (STOP)
                    </button>
                  ) : (
                    <button
                      onClick={startTimeSimulation => startSimulation()}
                      disabled={inputN <= 0}
                      className="grow bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40 active:scale-95 transition-all disabled:opacity-40"
                    >
                      <Play className="w-4 h-4" /> สั่งวิเคราะห์ตรรกะ (RUN)
                    </button>
                  )}

                  <button
                    onClick={resetSimulation}
                    disabled={isRunning}
                    className="px-4 py-3 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-40"
                  >
                    <RotateCcw className="w-4 h-4" /> รีเซ็ต
                  </button>
                </div>
              </div>

              {/* Right Visual Analyzer Dashboard */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[460px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                  ANALYSIS VISUAL MONITOR
                </div>

                <div className="space-y-6 mt-4 grow flex flex-col justify-between">
                  {/* Step counter and status indicator lights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Step counter monitor */}
                    <div className="bg-slate-900 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between h-[96px] relative overflow-hidden">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Iteration Loop Step Counter:</span>
                      <span className="text-2xl font-bold font-mono text-white tracking-widest mt-1">
                        {iterations.toLocaleString()}
                      </span>
                      <span className="text-[9.5px] text-zinc-500 font-mono">
                        {selectedAlgo === 'good' ? 'O(1) Step constant' : selectedAlgo === 'bad' ? 'O(N) Loops step' : 'Infinite Loop steps...'}
                      </span>
                    </div>

                    {/* Status Indicator */}
                    <div className="bg-slate-900 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between h-[96px]">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">System Status Indicator:</span>
                      
                      <div className="flex items-center gap-3 mt-1.5">
                        {simStatus === 'idle' && (
                          <>
                            <div className="w-4 h-4 rounded-full bg-slate-750" />
                            <span className="text-sm font-semibold text-slate-400 font-sans">STANDBY</span>
                          </>
                        )}
                        {simStatus === 'processing' && (
                          <>
                            <div className="w-4 h-4 rounded-full bg-amber-500 animate-ping" />
                            <span className="text-sm font-semibold text-amber-400 font-sans">PROCESSING...</span>
                          </>
                        )}
                        {simStatus === 'completed' && (
                          <>
                            <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/40" />
                            <span className="text-sm font-semibold text-emerald-400 font-sans">🟢 COMPLETED ({simTime} ms)</span>
                          </>
                        )}
                        {simStatus === 'crash' && (
                          <>
                            <div className="w-4 h-4 rounded-full bg-red-500 animate-ping" />
                            <span className="text-sm font-semibold text-red-500 font-sans">🔴 INFINITE LOOP WARNING</span>
                          </>
                        )}
                      </div>
                      
                      <span className="text-[9.5px] text-zinc-500 font-mono">
                        {simResult !== null ? `Result sum: ${simResult.toLocaleString()}` : simStatus === 'crash' ? 'MEMORY EXHAUSTED IN Heap' : 'Waiting for calculation...'}
                      </span>
                    </div>
                  </div>

                  {/* Quality criteria Scorecard (Evaluation Card) */}
                  <div className="bg-slate-900 border border-slate-850 rounded-2xl p-4">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      เกณฑ์การประเมินคุณภาพขั้นตอนวิธี (Evaluation Card):
                    </div>

                    <div className="space-y-2.5">
                      {Object.entries(scoreCard).map(([key, item]) => (
                        <div key={key} className="flex justify-between items-center text-xs border-b border-slate-850/50 pb-2">
                          <span className="text-slate-350">{item.label}</span>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] text-zinc-500 hidden md:inline">{item.desc}</span>
                            {item.pass ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-500 animate-pulse" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SimulatorShell>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="วิเคราะห์การออกแบบขั้นตอนวิธีและความสิ้นสุดของการทำงาน"
          taskText={`คำชี้แจง: ให้นักเรียนสั่งวิเคราะห์จำลองและสลับทดสอบปุ่ม RUN อัลกอริทึมแต่ละโหมดใน AlgoQuality-Sim ด้านบน จากนั้นประเมินและเขียนตอบคำถามวิชาการต่อไปนี้ลงในระบบการศึกษา:

1. จากผลการจำลองเหตุใด "สูตรคณิตศาสตร์คงที่ (Algorithm 1)" จึงมีประสิทธิภาพด้านเวลาที่โดดเด่นกว่า "ลูปวนรอบสะสม (Algorithm 2)" อย่างเห็นได้ชัดเมื่อ N มีขนาด 1,000,000 แถว
   - อธิบายในแง่ของจำนวนขั้นตอนการวนลูปประมวลผล (Iteration steps)
2. เมื่อทดลองเลือกประเภท "ลูปอนันต์ไม่มีเบรก (Algorithm 3)" เกิดผลกระทบใดต่อระบบจำลอง
   - อ้างอิงผลลัพธ์ของ Step Counter และความสิ้นสุด (Finiteness)
   - อธิบายผลวิกฤตที่จะเกิดขึ้นจริงบนฮาร์ดแวร์หากอัลกอริทึมไม่มี Finiteness
3. จงเขียนรหัสจำลอง (Pseudocode) อัลกอริทึมเพื่อแก้ปัญหาการหาค่าสูงสุดจากชุดข้อมูลแบบอาร์เรย์ตัวเลข [A₁, A₂, ..., Aₙ] พร้อมประเมินตามคุณสมบัติ 5 ประการ`}
        />
      </main>
    </div>
  );
}
