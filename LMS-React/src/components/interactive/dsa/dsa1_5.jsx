import React, { useState, useEffect, useRef } from 'react';
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
  Play,
  RotateCcw,
  Sparkles,
  Cpu,
  Activity,
  HelpCircle,
  CheckCircle2,
  XCircle,
  FileCode,
  Terminal,
  BarChart2,
  AlertTriangle,
  Lightbulb,
  Workflow
} from 'lucide-react';

export default function DSA1_5() {
  // ─── Layer 1: Ambient Background Blobs ─────────────────────────────────────
  const DSA1_5_BLOBS = [
    { color: 'bg-emerald-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32',   opacity: 'opacity-40' },
    { color: 'bg-teal-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32',  opacity: 'opacity-35' },
    { color: 'bg-cyan-200',    size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-amber-100',   size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3',    opacity: 'opacity-25' }
  ];

  // ─── Playground State ──────────────────────────────────────────────────────
  const [activeStep, setActiveStep] = useState('analysis'); // analysis | design | coding | testing | optimization
  const [statusMsg, setStatusMsg] = useState('ยินดีต้อนรับเข้าสู่วงจรพัฒนาอัลกอริทึม! เริ่มต้นที่สเตปวิเคราะห์ปัญหา');
  
  // Design State (Flowchart ordering)
  const [flowchartOrder, setFlowchartOrder] = useState({
    box1: '', // input_n
    box2: '', // compare_cards
    box3: ''  // swap_cards
  });

  // Coding State (Python code dropdowns)
  const [codingSwapLogic, setCodingSwapLogic] = useState(''); // empty | correct | incorrect_1 | incorrect_2
  
  // Testing State
  const [testStatus, setTestStatus] = useState('idle'); // idle | running | completed
  const [testResults, setTestResults] = useState({
    normal: { input: '[5, 2, 9, 1]', output: 'ยังไม่ได้ทดสอบ', status: 'pending' },
    edge: { input: '[1, 2, 5, 9]', output: 'ยังไม่ได้ทดสอบ', status: 'pending' },
    boundary: { input: '[]', output: 'ยังไม่ได้ทดสอบ', status: 'pending' }
  });

  // Optimization State
  const [isOptimized, setIsOptimized] = useState(false);

  // Helper for status classes
  const getStepStatusClass = (stepName) => {
    let isActive = false;
    if (stepName === 'analysis') isActive = true;
    else if (stepName === 'design') {
      isActive = flowchartOrder.box1 === 'input' && flowchartOrder.box2 === 'compare' && flowchartOrder.box3 === 'swap';
    } else if (stepName === 'coding') {
      isActive = codingSwapLogic === 'correct';
    } else if (stepName === 'testing') {
      isActive = testResults.normal.status === 'passed' && testResults.edge.status === 'passed' && testResults.boundary.status === 'passed';
    } else if (stepName === 'optimization') {
      isActive = isOptimized;
    }

    return isActive
      ? 'bg-emerald-800 border-emerald-700 text-emerald-100 font-bold'
      : 'bg-slate-800 border-slate-700 text-zinc-400';
  };

  // ─── Event Handlers ────────────────────────────────────────────────────────
  
  // 1. Flowchart ordering validator
  const handleFlowchartSelect = (box, val) => {
    const nextOrder = { ...flowchartOrder, [box]: val };
    setFlowchartOrder(nextOrder);
    
    const isCorrect = nextOrder.box1 === 'input' && nextOrder.box2 === 'compare' && nextOrder.box3 === 'swap';
    if (isCorrect) {
      setStatusMsg('[FLOWCHART PASSED] ออกแบบผังงานถูกต้องตามลำดับตรรกะ! ดำเนินการต่อที่แท็บแปลงโค้ด (Coding)');
    } else {
      setStatusMsg(`[DESIGN] อัปเดตผังงาน ${box} เป็น ${val === 'input' ? 'รับไพ่' : val === 'compare' ? 'เปรียบเทียบค่า' : 'สลับไพ่'}`);
    }
  };

  // 2. Python Code selection
  const handleCodingSelect = (val) => {
    setCodingSwapLogic(val);
    if (val === 'correct') {
      setStatusMsg('[CODING PASSED] เขียนตรรกะการสลับตัวแปรสำเร็จ! โค้ดพร้อมสำหรับการนำไปรันในห้องทดสอบ (Testing)');
    } else if (val === 'incorrect_1') {
      setStatusMsg('[CODING WARNING] ตรรกะการสลับข้อมูลบกพร่อง การทำ cards[j] = cards[j+1] ทันทีโดยไม่มีการฝากค่า จะทำให้ข้อมูลเดิมสูญหาย!');
    } else {
      setStatusMsg('[CODING WARNING] โครงสร้างสลับข้อมูลไม่สมบูรณ์ ข้อมูลในแรมจะซ้ำและสูญหาย');
    }
  };

  // 3. Test Runner
  const handleRunTests = () => {
    if (flowchartOrder.box1 !== 'input' || flowchartOrder.box2 !== 'compare' || flowchartOrder.box3 !== 'swap') {
      setStatusMsg('[TEST BLOCKED] ผังงานอัลกอริทึมยังออกแบบไม่ถูกต้อง กรุณากลับไปเช็คผังงานในแท็บ Design ก่อน!');
      return;
    }
    if (codingSwapLogic === '') {
      setStatusMsg('[TEST BLOCKED] ยังไม่ได้เลือกตรรกะแปลงเป็นโค้ด Python กรุณาทำในแท็บ Coding ก่อน!');
      return;
    }

    setTestStatus('running');
    setStatusMsg('[TESTING] กำลังรันระบบและฟีดชุดข้อมูล Normal, Edge และ Boundary เข้าสู่หน่วยประมวลผล...');

    setTimeout(() => {
      if (codingSwapLogic === 'correct') {
        setTestResults({
          normal: { input: '[5, 2, 9, 1]', output: '[1, 2, 5, 9]', status: 'passed' },
          edge: { input: '[1, 2, 5, 9]', output: '[1, 2, 5, 9]', status: 'passed' },
          boundary: { input: '[]', output: '[]', status: 'passed' }
        });
        setStatusMsg('[TESTS PASSED] 🟢 ยอดเยี่ยม! อัลกอริทึมของคุณผ่าน Test Cases ทั้ง 3 รูปแบบได้อย่างถูกต้อง 100%!');
      } else {
        // Incorrect logics will fail normal and edge
        setTestResults({
          normal: { input: '[5, 2, 9, 1]', output: '[5, 5, 9, 9]', status: 'failed' },
          edge: { input: '[1, 2, 5, 9]', output: '[1, 2, 5, 9]', status: 'passed' }, // Already sorted might pass but normal fails
          boundary: { input: '[]', output: 'Crash! (No Data)', status: 'failed' }
        });
        setStatusMsg('[TESTS FAILED] 🔴 บั๊กทำงาน! ผลการทดสอบไม่ถูกต้องเนื่องจากเลือกตรรกะสลับตัวแปรผิดพลาดในขั้นตอน Coding');
      }
      setTestStatus('completed');
    }, 1500);
  };

  const handleResetPlayground = () => {
    setFlowchartOrder({ box1: '', box2: '', box3: '' });
    setCodingSwapLogic('');
    setTestStatus('idle');
    setTestResults({
      normal: { input: '[5, 2, 9, 1]', output: 'ยังไม่ได้ทดสอบ', status: 'pending' },
      edge: { input: '[1, 2, 5, 9]', output: 'ยังไม่ได้ทดสอบ', status: 'pending' },
      boundary: { input: '[]', output: 'ยังไม่ได้ทดสอบ', status: 'pending' }
    });
    setIsOptimized(false);
    setActiveStep('analysis');
    setStatusMsg('รีเซ็ตระบบวงจรพัฒนาเริ่มต้นเรียบร้อยแล้ว');
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={DSA1_5_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Overview of Algorithm Lifecycle ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              วงจรการพัฒนาซอฟต์แวร์ต้นน้ำ / Development Lifecycle
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              วงจรการพัฒนาอัลกอริทึม (Algorithm Development Cycle)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            การสร้างขั้นตอนวิธีที่มีความเสถียรและมีประสิทธิภาพสูง ไม่ใช่เรื่องของการเปิดเครื่องแล้วลงมือพิมพ์โค้ดทันที 
            แต่นักพัฒนาที่ดีต้องผ่านกระบวนการที่เป็นระบบ 5 ขั้นตอนหลัก ซึ่งช่วยให้แก้ปัญหาได้อย่างถูกต้องตั้งแต่แนวคิด 
            ลดโอกาสเกิดข้อผิดพลาดในขณะที่ระบบทำงานจริง และประหยัดทรัพยากรฮาร์ดแวร์ได้อย่างคุ้มค่าที่สุด
          </p>

          {/* 5 Steps Description Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { id: 1, title: 'การวิเคราะห์ปัญหา', sub: 'Problem Analysis', desc: 'ทำความเข้าใจข้อมูลเข้า (Input), รูปแบบผลลัพธ์ (Output) และข้อจำกัดด้านแรม/ความเร็ว (Constraints) ให้ชัดเจนก่อนออกแบบ', accent: 'emerald' },
              { id: 2, title: 'การออกแบบขั้นตอนวิธี', sub: 'Algorithm Design', desc: 'วางแผนสเต็ปทำงานโดยอิสระจากภาษาโปรแกรม ด้วยเครื่องมืออย่างภาษาพูด (Natural), รหัสจำลอง (Pseudocode) หรือผังงาน (Flowchart)', accent: 'cyan' },
              { id: 3, title: 'การแปลงเป็นรหัสโปรแกรม', sub: 'Implementation', desc: 'เขียนซอร์สโค้ด (Source Code) จริง เช่น Python โดยคัดเลือกโครงสร้างข้อมูล (Data Structures) ที่เข้ากันมารับตรรกะในแรม', accent: 'indigo' },
              { id: 4, title: 'การทดสอบหาข้อผิดพลาด', sub: 'Testing & Debugging', desc: 'ทดสอบโปรแกรมด้วยกรณีข้อมูลปกติ (Normal), ข้อมูลขอบเขต (Boundary) และข้อมูลล้มเหลว (Edge Case) เพื่อตรวจสอบความเสถียร', accent: 'amber' },
              { id: 5, title: 'การปรับปรุงประสิทธิภาพ', sub: 'Optimization', desc: 'หาจุดคอขวด (Bottleneck) ปรับลดลูปหรือสัญกรณ์ Big O ให้ทำงานได้เร็วขึ้น หรือลดการใช้ RAM เพื่อการบำรุงรักษาอย่างยั่งยืน', accent: 'violet' }
            ].map((step) => (
              <div
                key={step.id}
                className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">ขั้นตอนที่ {step.id}</span>
                  </div>
                  <h4 className="text-[14.5px] font-bold text-zinc-900 leading-snug">{step.title}</h4>
                  <span className="text-[10px] font-mono font-bold text-slate-400 block mb-2 uppercase tracking-wide">{step.sub}</span>
                  <p className="text-[12px] text-slate-500 leading-relaxed font-sans">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Section 2: Interactive Simulator (AlgoCycle-Playground) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              เครื่องมือฝึกทักษะต้นน้ำ / AlgoCycle-Playground
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ห้องปฏิบัติการวงจรพัฒนาขั้นตอนวิธีแบบเสมือนจริง
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            สวมบทบาทเป็นวิศวกรซอฟต์แวร์ต้นน้ำ เพื่อไขโจทย์ปัญหา **"เรียงลำดับตัวเลขบนหน้าไพ่ (Card Sorting Algorithm)"** 
            ด้วยการเดินทางไปตามสถานีต่าง ๆ ในวงจรพัฒนา:
          </p>

          <SimulatorShell
            dark
            title="Algorithm Lifecycle Playground"
            icon={<Workflow className="w-8 h-8 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />}
            glowColors="from-emerald-600/20 to-teal-500/10"
            iconColor="text-emerald-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Left Sandbox Control Panel */}
              <div className="lg:col-span-6 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[520px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  LIFECYCLE STEP WIZARD
                </span>

                <div className="space-y-5">
                  {/* Step Selector Tab Pills */}
                  <div className="flex flex-wrap gap-1.5 border-b border-slate-800 pb-3">
                    {[
                      { id: 'analysis', label: '1. วิเคราะห์ (Analysis)' },
                      { id: 'design', label: '2. ออกแบบ (Design)' },
                      { id: 'coding', label: '3. เขียนรหัส (Coding)' },
                      { id: 'testing', label: '4. ทดสอบ (Testing)' },
                      { id: 'optimization', label: '5. ปรับปรุง (Optimize)' }
                    ].map(step => (
                      <button
                        key={step.id}
                        onClick={() => {
                          setActiveStep(step.id);
                          setStatusMsg(`เปลี่ยนมาศึกษาขั้นตอน: ${step.label}`);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          activeStep === step.id
                            ? 'bg-emerald-600 text-white shadow shadow-emerald-600/20'
                            : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {step.label}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Controls based on Active Step */}
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-4">
                    
                    {activeStep === 'analysis' && (
                      <div className="space-y-3 animate-fadeIn text-xs leading-relaxed text-slate-350">
                        <h4 className="text-[13px] font-bold text-white flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-emerald-400" />
                          การวิเคราะห์ความต้องการและเงื่อนไขโจทย์ (Problem Spec)
                        </h4>
                        <p>
                          ก่อนเริ่มเขียนโค้ด วิศวกรต้องกำหนดขอบเขตและรูปแบบของข้อมูลให้แน่ชัดดังนี้:
                        </p>
                        <div className="space-y-2 border-t border-slate-800 pt-2 font-mono">
                          <div>
                            <span className="text-emerald-400 block font-bold">ข้อมูลนำเข้า (Input):</span>
                            <span>อาเรย์ของชุดตัวเลขไม่เรียงลำดับ เช่น <code className="text-white bg-slate-900 px-1 py-0.5 rounded">[5, 2, 9, 1]</code></span>
                          </div>
                          <div>
                            <span className="text-emerald-400 block font-bold">ผลลัพธ์ที่ต้องการ (Output):</span>
                            <span>อาเรย์ที่จัดเรียงจากน้อยไปมากสมบูรณ์แบบ <code className="text-white bg-slate-900 px-1 py-0.5 rounded">[1, 2, 5, 9]</code></span>
                          </div>
                          <div>
                            <span className="text-emerald-400 block font-bold">ข้อจำกัด (Constraints):</span>
                            <span>ต้องไม่เพิ่มการใช้แรมชั่วคราวเกินจำเป็น ($Space: O(1)$), และต้องทำงานเสร็จทันที</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setActiveStep('design')}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg cursor-pointer transition-all mt-2"
                        >
                          ผ่านการวิเคราะห์ -&gt; เริ่มออกแบบโครงสร้าง (Design)
                        </button>
                      </div>
                    )}

                    {activeStep === 'design' && (
                      <div className="space-y-3 animate-fadeIn text-xs text-slate-350 leading-relaxed">
                        <h4 className="text-[13px] font-bold text-white flex items-center gap-1.5">
                          <Workflow className="w-4 h-4 text-emerald-400" />
                          ออกแบบแผนผังขั้นตอนการแลกเปลี่ยนค่า (Flowchart Design)
                        </h4>
                        <p>
                          เลือกส่วนประกอบของผังงานให้ถูกต้องตามขั้นตอนวิธีเปรียบเทียบข้อมูลเพื่อสลับค่าตัวแปร:
                        </p>

                        <div className="space-y-3 border-t border-slate-850 pt-2">
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-mono text-[10px]">บล็อกที่ 1 (จุดเริ่มและนำข้อมูลเข้า):</span>
                            <select
                              value={flowchartOrder.box1}
                              onChange={e => handleFlowchartSelect('box1', e.target.value)}
                              className="bg-slate-900 border border-slate-800 text-[11px] text-white rounded p-1.5 w-[160px] cursor-pointer"
                            >
                              <option value="">-- กรุณาเลือก --</option>
                              <option value="swap">สลับไพ่ (Process)</option>
                              <option value="input">รับข้อมูลไพ่ (Input)</option>
                              <option value="compare">เปรียบเทียบค่า (Decision)</option>
                            </select>
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <span className="font-mono text-[10px]">บล็อกที่ 2 (เงื่อนไขเปรียบเทียบค่าคู่ไพ่):</span>
                            <select
                              value={flowchartOrder.box2}
                              onChange={e => handleFlowchartSelect('box2', e.target.value)}
                              className="bg-slate-900 border border-slate-800 text-[11px] text-white rounded p-1.5 w-[160px] cursor-pointer"
                            >
                              <option value="">-- กรุณาเลือก --</option>
                              <option value="swap">สลับไพ่ (Process)</option>
                              <option value="input">รับข้อมูลไพ่ (Input)</option>
                              <option value="compare">เปรียบเทียบค่า (Decision)</option>
                            </select>
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <span className="font-mono text-[10px]">บล็อกที่ 3 (ขั้นตอนประมวลผลสลับลำดับ):</span>
                            <select
                              value={flowchartOrder.box3}
                              onChange={e => handleFlowchartSelect('box3', e.target.value)}
                              className="bg-slate-900 border border-slate-800 text-[11px] text-white rounded p-1.5 w-[160px] cursor-pointer"
                            >
                              <option value="">-- กรุณาเลือก --</option>
                              <option value="swap">สลับไพ่ (Process)</option>
                              <option value="input">รับข้อมูลไพ่ (Input)</option>
                              <option value="compare">เปรียบเทียบค่า (Decision)</option>
                            </select>
                          </div>
                        </div>

                        {flowchartOrder.box1 === 'input' && flowchartOrder.box2 === 'compare' && flowchartOrder.box3 === 'swap' ? (
                          <button
                            onClick={() => setActiveStep('coding')}
                            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg cursor-pointer transition-all mt-2"
                          >
                            ตรรกะถูกต้อง -&gt; แปลงผังงานเป็นชุดโค้ด (Coding)
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-500 italic block text-center mt-2">
                            * คำแนะนำ: ลำดับที่ถูกต้องคือ รับข้อมูล -&gt; เปรียบเทียบ -&gt; สลับข้อมูล
                          </span>
                        )}
                      </div>
                    )}

                    {activeStep === 'coding' && (
                      <div className="space-y-3 animate-fadeIn text-xs text-slate-350 leading-relaxed">
                        <h4 className="text-[13px] font-bold text-white flex items-center gap-1.5">
                          <FileCode className="w-4 h-4 text-emerald-400" />
                          แปลงผังงานเป็นโค้ดสลับข้อมูล (Python Swapping Implementation)
                        </h4>
                        <p>
                          เลือกส่วนคำสั่ง (Coding Option) เพื่อสลับค่าในตัวแปรอย่างถูกต้องในหน่วยความจำ RAM:
                        </p>

                        <div className="flex flex-col gap-2 pt-2">
                          {[
                            {
                              id: 'correct',
                              label: 'ตัวเลือก A (ใช้ตัวแปรชั่วคราวฝากค่า)',
                              desc: 'temp = cards[j]\ncards[j] = cards[j+1]\ncards[j+1] = temp'
                            },
                            {
                              id: 'incorrect_1',
                              label: 'ตัวเลือก B (เขียนทับโดยไม่เก็บค่า)',
                              desc: 'cards[j] = cards[j+1]\ncards[j+1] = cards[j]'
                            },
                            {
                              id: 'incorrect_2',
                              label: 'ตัวเลือก C (สลับค่าวนทับค่าชั่วคราว)',
                              desc: 'temp = cards[j+1]\ntemp = cards[j]\ncards[j] = cards[j+1]'
                            }
                          ].map(item => (
                            <label
                              key={item.id}
                              className={`flex flex-col p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                                codingSwapLogic === item.id
                                  ? 'bg-emerald-950/30 border-emerald-500 text-emerald-300'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-2 font-bold">
                                <input
                                  type="radio"
                                  name="codeSelect"
                                  value={item.id}
                                  checked={codingSwapLogic === item.id}
                                  onChange={() => handleCodingSelect(item.id)}
                                  className="accent-emerald-500 cursor-pointer"
                                />
                                <span>{item.label}</span>
                              </div>
                              <pre className="text-[10px] bg-black/45 p-1.5 rounded mt-1.5 text-zinc-300 font-mono overflow-x-auto leading-relaxed">
                                {item.desc}
                              </pre>
                            </label>
                          ))}
                        </div>

                        {codingSwapLogic === 'correct' && (
                          <button
                            onClick={() => setActiveStep('testing')}
                            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg cursor-pointer transition-all mt-2"
                          >
                            รหัสพร้อมแล้ว -&gt; รันเพื่อจำลองทดสอบ (Testing)
                          </button>
                        )}
                      </div>
                    )}

                    {activeStep === 'testing' && (
                      <div className="space-y-3 animate-fadeIn text-xs text-slate-350 leading-relaxed">
                        <h4 className="text-[13px] font-bold text-white flex items-center gap-1.5">
                          <Terminal className="w-4 h-4 text-emerald-400" />
                          ทดสอบความถูกต้องและขอบเขตข้อมูล (Test Matrix Simulator)
                        </h4>
                        <p>
                          ส่งชุดข้อมูลเข้าทดสอบ 3 รูปแบบเพื่อตรวจจับบั๊กและพฤติกรรมในสถานการณ์ขอบเขตข้อมูล (Boundary Cases):
                        </p>

                        <div className="space-y-2 font-mono text-[10.5px]">
                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-850 flex justify-between items-center">
                            <div>
                              <span className="text-zinc-500 block">1. Normal (ข้อมูลทั่วไป):</span>
                              <span className="text-white font-bold">{testResults.normal.input}</span>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-slate-400 block">{testResults.normal.output}</span>
                              {testResults.normal.status === 'passed' ? (
                                <span className="text-emerald-400 font-bold">✔ PASSED</span>
                              ) : testResults.normal.status === 'failed' ? (
                                <span className="text-rose-450 font-bold">✘ FAILED</span>
                              ) : (
                                <span className="text-slate-650">PENDING</span>
                              )}
                            </div>
                          </div>

                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-850 flex justify-between items-center">
                            <div>
                              <span className="text-zinc-500 block">2. Edge (จัดเรียงอยู่แล้ว):</span>
                              <span className="text-white font-bold">{testResults.edge.input}</span>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-slate-400 block">{testResults.edge.output}</span>
                              {testResults.edge.status === 'passed' ? (
                                <span className="text-emerald-400 font-bold">✔ PASSED</span>
                              ) : testResults.edge.status === 'failed' ? (
                                <span className="text-rose-450 font-bold">✘ FAILED</span>
                              ) : (
                                <span className="text-slate-650">PENDING</span>
                              )}
                            </div>
                          </div>

                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-850 flex justify-between items-center">
                            <div>
                              <span className="text-zinc-500 block">3. Boundary (อาร์เรย์ว่างเปล่า):</span>
                              <span className="text-white font-bold">[]</span>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-slate-400 block">{testResults.boundary.output}</span>
                              {testResults.boundary.status === 'passed' ? (
                                <span className="text-emerald-400 font-bold">✔ PASSED</span>
                              ) : testResults.boundary.status === 'failed' ? (
                                <span className="text-rose-450 font-bold">✘ CRASH/BUG</span>
                              ) : (
                                <span className="text-slate-650">PENDING</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={handleRunTests}
                          disabled={testStatus === 'running'}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg cursor-pointer transition-all disabled:opacity-40"
                        >
                          {testStatus === 'running' ? 'กำลังส่งข้อมูลจำลอง...' : 'สั่งประมวลผลชุดตรวจสอบ (Run Tests)'}
                        </button>

                        {testResults.normal.status === 'passed' && testResults.edge.status === 'passed' && testResults.boundary.status === 'passed' && (
                          <button
                            onClick={() => setActiveStep('optimization')}
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg cursor-pointer transition-all mt-1"
                          >
                            รันผ่านหมด -&gt; ขั้นตอนวิเคราะห์ประสิทธิภาพ (Optimize)
                          </button>
                        )}
                      </div>
                    )}

                    {activeStep === 'optimization' && (
                      <div className="space-y-3 animate-fadeIn text-xs text-slate-350 leading-relaxed">
                        <h4 className="text-[13px] font-bold text-white flex items-center gap-1.5">
                          <BarChart2 className="w-4 h-4 text-indigo-400" />
                          ค้นหาคอขวดและปรับประสิทธิภาพ (Optimization & Scaling)
                        </h4>
                        <p>
                          อัลกอริทึมของคุณประมวลผลได้ถูกต้องครบถ้วนแล้ว! แต่เมื่อวิเคราะห์ Big O พบว่าใช้รูปแบบ Bubble Sort มีความซับซ้อนเวลา $O(N^2)$:
                        </p>

                        <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg space-y-1.5 font-mono text-[10.5px]">
                          <div>
                            <span className="text-slate-500">รูปแบบตรรกะปัจจุบัน: </span>
                            <span className="text-rose-450 font-bold">Bubble Sort O(N²)</span>
                          </div>
                          <div>
                            <span className="text-slate-500">จำนวนขั้นตอนหาก N=50,000: </span>
                            <span className="text-rose-400">2,500,000,000 steps</span>
                          </div>
                          <div>
                            <span className="text-slate-500">เวลาทำงานคาดการณ์: </span>
                            <span className="text-rose-450 font-bold">~ 41 นาที (ซอฟต์แวร์ค้าง!)</span>
                          </div>
                        </div>

                        {!isOptimized ? (
                          <button
                            onClick={() => {
                              setIsOptimized(true);
                              setStatusMsg('[OPTIMIZED] 🟢 ปรับเปลี่ยนอัลกอริทึมจาก Bubble Sort เป็น Quick Sort (O(N log N)) ประสิทธิภาพประหยัดเวลา CPU ดีขึ้น 50,000 เท่า!');
                            }}
                            className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-550 text-white text-xs font-bold rounded-lg cursor-pointer transition-all"
                          >
                            สั่งเปลี่ยนเป็น Quick Sort O(N log N)
                          </button>
                        ) : (
                          <div className="bg-emerald-950/20 border border-emerald-900/60 p-3 rounded-lg text-[10.5px] font-mono space-y-1">
                            <span className="text-emerald-400 font-bold block">🟢 OPTIMIZED SUCCESSFULLY!</span>
                            <p className="text-slate-400">
                              เปลี่ยนสถาปัตยกรรมเรียงข้อมูลเป็น Quick/Merge Sort ขนาดขั้นตอนคำสั่งเหลือเพียง 780,000 สเตป และใช้เวลาเพียง 0.05 วินาที!
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Reset Control */}
                  <button
                    onClick={handleResetPlayground}
                    className="w-full py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตวงจรรันระบบใหม่
                  </button>
                </div>

                {/* Status Bar */}
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400 leading-relaxed bg-black/30 p-2.5 rounded-lg border border-slate-850">
                  <span className="text-zinc-500 block text-[9px] uppercase tracking-wider mb-0.5">Terminal Log Output:</span>
                  {statusMsg}
                </div>
              </div>

              {/* Right Visual Board */}
              <div className="lg:col-span-6 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[520px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">
                  RAM STEP MONITOR & COMPILER OUTLINE
                </span>

                <div className="grow flex flex-col justify-center items-center mt-6">
                  {activeStep === 'analysis' && (
                    <div className="w-full max-w-sm space-y-4 animate-fadeIn text-center">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Input Data Arrays structure:</span>
                      <div className="flex gap-2 justify-center">
                        {[5, 2, 9, 1].map((val, idx) => (
                          <div key={idx} className="w-12 h-16 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between p-1.5 items-center">
                            <span className="text-[8px] font-mono text-slate-500">[{idx}]</span>
                            <span className="text-base font-bold text-white font-mono">{val}</span>
                            <span className="text-[7.5px] font-mono text-emerald-500">0x1{idx * 4}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border border-dashed border-slate-800 rounded-xl p-4 bg-slate-900/30 text-xs font-mono text-slate-400">
                        <span className="text-emerald-400 block font-bold text-[10px] uppercase mb-1">Constraints:</span>
                        ต้องการใช้หน่วยความจำจำกัด และเรียงจากน้อยไปมาก
                      </div>
                    </div>
                  )}

                  {activeStep === 'design' && (
                    <div className="w-full max-w-xs space-y-4 animate-fadeIn flex flex-col items-center">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Flowchart Logical Junctions:</span>
                      
                      {/* Box 1 */}
                      <div className={`w-36 h-10 border rounded-lg flex items-center justify-center font-mono text-[10px] font-bold text-white transition-all ${
                        flowchartOrder.box1 === 'input' ? 'bg-emerald-950/80 border-emerald-500' : 'bg-slate-900 border-slate-800 opacity-60'
                      }`}>
                        {flowchartOrder.box1 ? (flowchartOrder.box1 === 'input' ? 'INPUT cards' : flowchartOrder.box1 === 'compare' ? 'cards[j] > cards[j+1]?' : 'SWAP cards') : '???'}
                      </div>
                      <div className="w-0.5 h-4 bg-slate-800" />

                      {/* Box 2 */}
                      <div className={`w-36 h-10 border rounded-lg flex items-center justify-center font-mono text-[10px] font-bold text-white transition-all ${
                        flowchartOrder.box2 === 'compare' ? 'bg-emerald-950/80 border-emerald-500' : 'bg-slate-900 border-slate-800 opacity-60'
                      }`}>
                        {flowchartOrder.box2 ? (flowchartOrder.box2 === 'input' ? 'INPUT cards' : flowchartOrder.box2 === 'compare' ? 'cards[j] > cards[j+1]?' : 'SWAP cards') : '???'}
                      </div>
                      <div className="w-0.5 h-4 bg-slate-800" />

                      {/* Box 3 */}
                      <div className={`w-36 h-10 border rounded-lg flex items-center justify-center font-mono text-[10px] font-bold text-white transition-all ${
                        flowchartOrder.box3 === 'swap' ? 'bg-emerald-950/80 border-emerald-500' : 'bg-slate-900 border-slate-800 opacity-60'
                      }`}>
                        {flowchartOrder.box3 ? (flowchartOrder.box3 === 'input' ? 'INPUT cards' : flowchartOrder.box3 === 'compare' ? 'cards[j] > cards[j+1]?' : 'SWAP cards') : '???'}
                      </div>
                    </div>
                  )}

                  {activeStep === 'coding' && (
                    <div className="w-full max-w-sm animate-fadeIn">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">RAM Instruction Outline:</span>
                      <pre className="bg-slate-900/60 p-4 rounded-xl border border-slate-850 font-mono text-[11px] text-emerald-350 leading-relaxed overflow-x-auto">
{`def bubble_sort(cards):
    n = len(cards)
    for i in range(n):
        for j in range(0, n-i-1):
            if cards[j] > cards[j+1]:
                # Swap operations:
                ${codingSwapLogic === 'correct' ? 'temp = cards[j]\n                cards[j] = cards[j+1]\n                cards[j+1] = temp' : codingSwapLogic === 'incorrect_1' ? 'cards[j] = cards[j+1]\n                cards[j+1] = cards[j] (BUG)' : codingSwapLogic === 'incorrect_2' ? 'temp = cards[j+1]\n                temp = cards[j] (BUG)' : '__________ (จองช่องว่าง)'}
    return cards`}
                      </pre>
                    </div>
                  )}

                  {activeStep === 'testing' && (
                    <div className="w-full max-w-xs space-y-4 animate-fadeIn flex flex-col items-center">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2">Test Runner Simulation:</span>
                      
                      <div className="flex gap-1.5 justify-center">
                        {[
                          testResults.normal.status === 'passed' ? '1' : '5',
                          testResults.normal.status === 'passed' ? '2' : '2',
                          testResults.normal.status === 'passed' ? '5' : '9',
                          testResults.normal.status === 'passed' ? '9' : '1'
                        ].map((val, idx) => (
                          <div
                            key={idx}
                            className={`w-10 h-14 border rounded-lg flex items-center justify-center font-mono text-sm font-bold text-white transition-all ${
                              testStatus === 'running' ? 'animate-pulse' : ''
                            } ${
                              testResults.normal.status === 'passed'
                                ? 'bg-emerald-950/70 border-emerald-500'
                                : testResults.normal.status === 'failed'
                                ? 'bg-rose-950/70 border-rose-500'
                                : 'bg-slate-900 border-slate-800'
                            }`}
                          >
                            {val}
                          </div>
                        ))}
                      </div>

                      <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg text-center text-[10.5px] font-mono w-full text-slate-400">
                        {testStatus === 'running' ? (
                          <span className="text-amber-400 animate-pulse block">RUNNING INSTRUMENTATION TESTS...</span>
                        ) : testResults.normal.status === 'passed' ? (
                          <span className="text-emerald-400 font-bold block">🟢 ALL 3 TEST CASES PASSED SUCCESSFULLY</span>
                        ) : testResults.normal.status === 'failed' ? (
                          <span className="text-rose-400 font-bold block">🔴 COMPILER ERROR: DATA LOST ON SWAP</span>
                        ) : (
                          <span>รอกดปุ่มสั่งประมวลผล Test Cases</span>
                        )}
                      </div>
                    </div>
                  )}

                  {activeStep === 'optimization' && (
                    <div className="w-full max-w-sm space-y-4 animate-fadeIn">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Time Complexity Comparison Graph:</span>
                      
                      <div className="border border-slate-850 bg-slate-900/60 p-4 rounded-xl relative overflow-hidden h-[180px] flex items-end gap-3 justify-center">
                        {/* Bubble Sort Graph Bar */}
                        <div className="flex flex-col items-center justify-end h-full w-1/3">
                          <span className="text-[9px] font-mono text-rose-450 font-bold mb-1">41 min</span>
                          <div
                            className={`w-12 bg-rose-500/80 rounded-t-lg transition-all duration-700 ${
                              isOptimized ? 'h-32' : 'h-32'
                            }`}
                          />
                          <span className="text-[9.5px] font-mono text-slate-400 mt-2">Bubble O(N²)</span>
                        </div>

                        {/* Quick Sort Graph Bar */}
                        <div className="flex flex-col items-center justify-end h-full w-1/3">
                          <span className={`text-[9px] font-mono font-bold mb-1 transition-all ${
                            isOptimized ? 'text-emerald-400 font-bold' : 'text-slate-600'
                          }`}>
                            0.05 sec
                          </span>
                          <div
                            className={`w-12 rounded-t-lg transition-all duration-700 ${
                              isOptimized ? 'bg-emerald-500/85 h-0.5' : 'bg-slate-700 h-0'
                            }`}
                          />
                          <span className="text-[9.5px] font-mono text-slate-400 mt-2">Quick O(N log N)</span>
                        </div>
                      </div>

                      <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg text-[10.5px] font-mono text-slate-400 space-y-1">
                        <span className="text-white font-bold block">💡 สรุปการปรับปรุงโค้ด (Optimization SOT):</span>
                        <p>
                          การแก้ไขตรรกะในระดับออกแบบช่วยเพิ่มความเร็วในการแก้ปัญหาขอบเขตได้สูงถึง 50,000 เท่า โดยที่ความถูกต้องของข้อมูล (Correctness) ยังคงตัวเสถียร 100%
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cycle Indicator Grid Status Panel */}
                <div className="mt-4 bg-slate-900 border border-slate-850 rounded-xl p-3.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2">Cycle Step Status Board:</span>
                  <div className="grid grid-cols-5 gap-2 text-center text-[9px] font-mono">
                    {[
                      { id: 'analysis', label: '1. Analysis' },
                      { id: 'design', label: '2. Design' },
                      { id: 'coding', label: '3. Coding' },
                      { id: 'testing', label: '4. Testing' },
                      { id: 'optimization', label: '5. Optimize' }
                    ].map(step => (
                      <div
                        key={step.id}
                        className={`p-1.5 rounded border transition-all ${getStepStatusClass(step.id)}`}
                      >
                        {step.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SimulatorShell>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="วิเคราะห์ขั้นตอนการแก้ปัญหาและการสร้างชุดข้อมูลทดสอบตามวงจรพัฒนา"
          taskText={`คำชี้แจง: ให้นักเรียนสั่งวิเคราะห์ทดลองและโต้ตอบกระบวนการ Lifecycle ตั้งแต่ขั้นตอนที่ 1 ถึง 5 ในห้องปฏิบัติการจำลอง AlgoCycle-Playground ด้านบน จากนั้นเขียนอธิบายเชิงทฤษฎีวิศวกรรมคอมพิวเตอร์ต่อไปนี้ลงในสมุดบันทึก:

1. เหตุใดการเขียนซอร์สโค้ดโปรแกรมในทันทีโดยไม่ผ่าน "ขั้นตอนการวิเคราะห์ปัญหา" และ "การออกแบบขั้นตอนวิธี" จึงจัดเป็นรูปแบบการพัฒนาที่บกพร่อง (Software Anti-pattern)
   - ยกตัวอย่างข้อผิดพลาดด้านเงื่อนไขขอบเขตข้อมูล (Boundary/Edge Case) ที่มักถูกละเลยหากไม่ได้วิเคราะห์ปัญหาก่อนเขียนโค้ด
2. จากการจำลองทำไมการสลับค่าตัวแปรในอาเรย์ระดับ Coding จึงจำเป็นต้องเรียกใช้งานตัวแปรตัวกลาง "temp" มารับฝากข้อมูลชั่วคราว
   - หากเขียนทับข้อมูลตรงๆ จะเกิดผลกระทบใดในหน่วยความจำ RAM พร้อมยกตัวอย่างสถานะตัวแปรประกอบ
3. ในกระบวนการปรับปรุงประสิทธิภาพ (Optimization) เหตุใดการเปลี่ยนรูปแบบขั้นตอนวิธีจาก Bubble Sort เป็น Quick Sort จึงส่งผลต่ออัตราการเจริญเติบโตของเวลาประมวลผล (Time Complexity) อย่างมีนัยสำคัญเมื่อขนาดข้อมูล (N) ขยายตัวในระดับอุตสาหกรรม`}
        />
      </main>
    </div>
  );
}
