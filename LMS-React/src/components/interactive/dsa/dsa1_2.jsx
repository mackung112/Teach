import React, { useState, useEffect } from 'react';
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
  FolderTree,
  ChevronRight,
  TrendingUp,
  Gauge
} from 'lucide-react';

export default function DSA1_2() {
  // ─── 1. Blobs for Layer 1 Background ──────────────────────────────────────
  const DSA1_2_BLOBS = [
    { color: 'bg-emerald-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-40' },
    { color: 'bg-cyan-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-35' },
    { color: 'bg-teal-200',    size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-emerald-100', size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-25' }
  ];

  // ─── State for Topic 2: Trie Prefix Tree Interactive ────────────────────────
  const [activeTrieWord, setActiveTrieWord] = useState('cat');
  
  const trieWords = {
    cat: { desc: 'คำว่า "cat" ใช้โหนด c → a → t ในการบันทึกข้อมูลหลัก', saving: 'แชร์ราก "c" และ "a" ร่วมกับคำว่า car และ cap' },
    car: { desc: 'คำว่า "car" ใช้โหนด c → a → r ในการบันทึกทางขวา', saving: 'ประหยัด 2 โหนดแรก ("c" และ "a") ไม่ต้องจองซ้ำซ้อน' },
    cap: { desc: 'คำว่า "cap" ใช้โหนด c → a → p ในการบันทึกทางแยก', saving: 'แชร์พื้นที่ส่วนหน้า (Prefix) ร่วมกับ cat และ car' },
    dog: { desc: 'คำว่า "dog" แยกใช้โหนด d → o → g เนื่องจากไม่มีรากเหมือน c', saving: 'แชร์โหนด "d" และ "o" ร่วมกับคำว่า dot' },
    dot: { desc: 'คำว่า "dot" แยกใช้โหนด d → o → t ทอดตัวลงมา', saving: 'ประหยัด 2 โหนดแรก ("d" และ "o") จากการแชร์ข้อมูล dog' }
  };

  // Check if a specific node or edge in the Trie is active based on selected word
  const isNodeActive = (nodeId) => {
    switch (activeTrieWord) {
      case 'cat': return ['root', 'c', 'ca', 'cat'].includes(nodeId);
      case 'car': return ['root', 'c', 'ca', 'car'].includes(nodeId);
      case 'cap': return ['root', 'c', 'ca', 'cap'].includes(nodeId);
      case 'dog': return ['root', 'd', 'do', 'dog'].includes(nodeId);
      case 'dot': return ['root', 'd', 'do', 'dot'].includes(nodeId);
      default: return false;
    }
  };

  // ─── State for SPDS-Sim Simulator ──────────────────────────────────────────
  const [dataSize, setDataSize] = useState(50000);
  const [operationType, setOperationType] = useState('search'); // search | insert | delete
  const [isRunning, setIsRunning] = useState(false);
  
  // Results states
  const [modelATime, setModelATime] = useState(null);
  const [modelBTime, setModelBTime] = useState(null);
  const [modelAMemory, setModelAMemory] = useState(null);
  const [modelBMemory, setModelBMemory] = useState(null);
  const [logLines, setLogLines] = useState(['ระบบเตรียมความพร้อมสำเร็จ สแตนด์บายคำสั่งจำลอง N = 50,000']);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setModelATime(null);
    setModelBTime(null);
    setModelAMemory(null);
    setModelBMemory(null);
    
    setLogLines([
      `[ระบบเริ่มต้น] กำลังจัดเตรียมโครงสร้างข้อมูลเสมือนขนาด N = ${dataSize.toLocaleString()}...`,
      `[โมเดล A] กำลังจำลองหน่วยความจำ Unsorted Array / Standard List...`,
      `[โมเดล B] กำลังจำลองหน่วยความจำประสิทธิภาพสูง Hash Table / Dictionary...`
    ]);

    setTimeout(() => {
      // Simulate tracer logs based on operation type
      const opName = operationType === 'search' ? 'ค้นหาข้อมูลตัวสุดท้าย' : operationType === 'insert' ? 'แทรกข้อมูลตรงกลาง' : 'ลบข้อมูลตัวแรก';
      setLogLines(prev => [
        ...prev,
        `[จำลองสเตป] เริ่มต้นสั่งทำงานแบบจำลอง "${opName}" จำนวนคำสั่งสะสม...`,
        `[หน่วยความจำ] เปิดระบบการวัดหน่วยเก็บข้อมูล (tracemalloc monitor active)...`
      ]);

      setTimeout(() => {
        let tA = 0;
        let tB = 0;
        let mA = 0;
        let mB = 0;

        // Space and Time complexity mapping logic
        if (operationType === 'search') {
          // Model A: O(n) Linear Search
          tA = (dataSize * 0.0035).toFixed(2);
          // Model B: O(1) Hash Table
          tB = 0.02;
          
          // Memory (Array is highly compact, Hash has pointer & bucket overhead)
          mA = Math.round(dataSize * 4 / 1024); // 4B per element
          mB = Math.round(dataSize * 16 / 1024); // 16B per hash node
        } else if (operationType === 'insert') {
          // Model A: O(n) Array Shift
          tA = (dataSize * 0.0012).toFixed(2);
          // Model B: O(1) Linked List pointer append (once found)
          tB = 0.05;

          mA = Math.round(dataSize * 4 / 1024);
          mB = Math.round(dataSize * 12 / 1024); // Data + Next pointer (12B)
        } else {
          // Delete first item: O(n) Shifting in Array vs O(1) Pointer in Linked List
          tA = (dataSize * 0.0028).toFixed(2);
          tB = 0.01;

          mA = Math.round(dataSize * 4 / 1024);
          mB = Math.round(dataSize * 12 / 1024);
        }

        setModelATime(parseFloat(tA));
        setModelBTime(tB);
        setModelAMemory(mA);
        setModelBMemory(mB);
        setIsRunning(false);
        setLogLines(prev => [
          ...prev,
          `[สำเร็จ] Model A (Array): ใช้เวลาประมวลผล ${tA} ms | ขนาดแรมสะสม ${mA.toLocaleString()} KB`,
          `[สำเร็จ] Model B (Hash Table): ใช้เวลาประมวลผล ${tB} ms | ขนาดแรมสะสม ${mB.toLocaleString()} KB`,
          `[สรุปการทดสอบ] การประเมินสมรรถนะเสร็จสมบูรณ์ 100% เรียบร้อยแล้ว`
        ]);
      }, 1000);
    }, 800);
  };

  const resetSimulator = () => {
    setDataSize(50000);
    setOperationType('search');
    setIsRunning(false);
    setModelATime(null);
    setModelBTime(null);
    setModelAMemory(null);
    setModelBMemory(null);
    setLogLines(['ระบบจำลองทำการรีเซ็ตความพร้อม รอรับค่าพารามิเตอร์ใหม่']);
  };

  // Generate scholastic summary dynamically based on simulation states
  const getAnalyticSummary = () => {
    if (modelATime === null || modelBTime === null) return 'กรุณากดปุ่ม "สั่งประมวลผลเพื่อทดสอบ" ด้านบนเพื่อดูสรุปวิชาการ';
    
    const timesFaster = Math.round(modelATime / modelBTime);
    const memOverhead = Math.round((modelBMemory / modelAMemory) * 100);
    
    if (operationType === 'search') {
      return `ในการทำธุรกรรม ค้นหาข้อมูลตัวสุดท้าย (Search) ขนาด N = ${dataSize.toLocaleString()} แถว: โครงสร้างข้อมูล Model B (Hash Table - O(1)) ทำงานได้รวดเร็วกว่า Model A (Array List - O(n)) ถึงประมาณ ${timesFaster.toLocaleString()} เท่า เนื่องจากฟังก์ชันแฮชแปลงคีย์เป็นตำแหน่งเก็บได้ O(1) คงที่ แต่อย่างไรก็ตาม Model B ต้องแลกมาด้วยการจองแรมสะสม (Pointer Overhead) ที่สูงกว่า Model A ถึง ${memOverhead}% สะท้อนกฎข้อแลกเปลี่ยนด้านเวลาและพื้นที่ (Time-Space Tradeoff) ชัดเจน`;
    } else if (operationType === 'insert') {
      return `ในการทำธุรกรรม แทรกข้อมูลตรงกลาง (Insert) ขนาด N = ${dataSize.toLocaleString()} แถว: โครงสร้างข้อมูล Model B (Linked List - O(1) pointer updates) ทำงานได้รวดเร็วกว่า Model A (Array - O(n) element shifts) ถึงประมาณ ${timesFaster.toLocaleString()} เท่า เนื่องจาก Array จำเป็นต้องเลื่อนขยับสไลด์ข้อมูลถัดไปทั้งหมดเพื่อเปิดทางให้ข้อมูลใหม่ แต่ Linked List เพียงแค่ปรับทิศทาง Pointer เชื่อมต่อใหม่เท่านั้น โดยใช้แรมสะสมสะท้อน Overhead สูงกว่า ${memOverhead}%`;
    } else {
      return `ในการทำธุรกรรม ลบข้อมูลตัวแรก (Delete) ขนาด N = ${dataSize.toLocaleString()} แถว: โครงสร้างข้อมูล Model B (Linked List) สามารถปลดสลักเชื่อมพอยเตอร์ใหม่ได้อย่างคล่องตัว O(1) ทำงานเร็วกว่า Model A (Array) ที่ต้อง Shift ย้ายข้อมูลที่เหลือทั้งหมดเข้าแทนที่หัวแถว O(n) ถึง ${timesFaster.toLocaleString()} เท่า โดย Model A ใช้เนื้อที่แน่นหนากว่าและประหยัดแรมสะสมกว่า`;
    }
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={DSA1_2_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Execution Speed & Time Complexity ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              ความเร็วการทำงาน / ความซับซ้อนเชิงเวลา
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ผลกระทบต่อความเร็วในการประมวลผล
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              ในการพัฒนาซอฟต์แวร์ระดับมืออาชีพ **"ความเร็วของระบบ"** ไม่ได้ขึ้นอยู่กับฮาร์ดแวร์ซีพียูเพียงอย่างเดียว 
              แต่ขึ้นตรงกับการบริหารการประมวลผลผ่านตรรกะโครงสร้างข้อมูลที่สอดคล้องกับพฤติกรรมใช้งาน ซึ่งส่งผลกระทบต่อเวลาดังนี้:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Data Access */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono">ACCESS</span>
                  <h4 className="text-[15px] font-bold text-slate-800">การเข้าถึงตำแหน่งข้อมูล (Access)</h4>
                </div>
                <p className="text-[13.5px] text-slate-500 leading-relaxed mb-4">
                  การจองเก็บข้อมูลแบบอะเรย์ (Array) ช่วยให้ระบบเข้าถึงข้อมูลลำดับที่ต้องการได้ทันทีแบบสุ่ม (Random Access) 
                  ด้วยความเร็วระดับเทพคงที่ <strong className="text-emerald-600 font-semibold">$O(1)$</strong> ในขณะที่ Linked List ต้องท่องตรวจสอบผ่านแต่ละโหนดไปตามลำดับ (Sequential Access) เกิดความล่าช้าแปรผันตามขนาดข้อมูล <strong className="text-rose-500 font-semibold">$O(n)$</strong>
                </p>
                <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl font-mono text-[12px] text-slate-700">
                  <span className="text-zinc-500 block mb-0.5"># Index lookup in Array:</span>
                  <code>val = items[499]  # O(1) direct</code>
                </div>
              </div>

              {/* Card 2: Searching */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full font-mono">SEARCH</span>
                  <h4 className="text-[15px] font-bold text-slate-800">การค้นหาตำแหน่งข้อมูล (Searching)</h4>
                </div>
                <p className="text-[13.5px] text-slate-500 leading-relaxed mb-4">
                  หากใช้โครงสร้างแบบไม่ได้จัดเรียง (Unsorted Array) การค้นหาจำเป็นต้องควานหาทีละตัว (Linear Search) <strong className="text-rose-500 font-semibold">$O(n)$</strong> 
                  แต่หากเลือกใช้โครงสร้างประสิทธิภาพสูงประเภท Hash Table (หรือ Dictionary ใน Python) จะช่วยเปลี่ยนคำสั่งสืบค้นให้รวดเร็ว O(1) ผ่านการแปรคีย์ด้วยสมการ Hashing
                </p>
                <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl font-mono text-[12px] text-slate-700">
                  <span className="text-zinc-500 block mb-0.5"># Key check in Dictionary:</span>
                  <code>if "A001" in active_dict:  # O(1)</code>
                </div>
              </div>

              {/* Card 3: Insertion/Deletion */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-mono">EDITING</span>
                  <h4 className="text-[15px] font-bold text-slate-800">การเพิ่มหรือลบลำดับ (Edit)</h4>
                </div>
                <p className="text-[13.5px] text-slate-500 leading-relaxed mb-4">
                  การแทรกข้อมูลตรงกลาง Array จะสร้าง Overhead มหาศาลเนื่องจากระบบจำเป็นต้อง "ขยับเลื่อนสไลด์ (Shift)" ข้อมูลตัวถัดไปทั้งหมดหลีกทาง 
                  แต่สำหรับโครงสร้าง Linked List สามารถลบหรือเพิ่มข้อมูลได้อย่างฉับไวเพียงแก้ไขปลายทางพอยเตอร์ชี้ใหม่ <strong className="text-emerald-600 font-semibold">$O(1)$</strong> เท่านั้น
                </p>
                <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl font-mono text-[12px] text-slate-700">
                  <span className="text-zinc-500 block mb-0.5"># Node reconnection:</span>
                  <code>prev_node.next = new_node  # O(1)</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Memory Utilization & Space Complexity ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              การบริหารพื้นที่ / ความซับซ้อนเชิงเนื้อที่
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ผลกระทบต่อการใช้หน่วยความจำ
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left explanation (Fluid Open-Air style) */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
                  การสูญเสียหน่วยความจำโดยเปล่าประโยชน์ (Memory Waste) เกิดขึ้นได้ง่ายจากการออกแบบโครงสร้างที่ขาดความรอบคอบ 
                  การเลือกประเภทข้อมูลมีบทบาทต่อปริมาณหน่วยเก็บแรมใน 2 แนวทางหลัก:
                </p>

                <div className="bg-emerald-50/60 backdrop-blur-md border border-emerald-200/60 rounded-2xl p-5 border-l-[3px] border-l-emerald-500 leading-relaxed">
                  <h4 className="font-semibold text-emerald-900 text-[15px] mb-1 flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-600" />
                    การจองคงที่ (Static) เทียบกับยืดหยุ่น (Dynamic)
                  </h4>
                  <p className="text-[13.5px] text-slate-600 leading-relaxed">
                    Array แบบดั้งเดิมจำเป็นต้องจองพื้นที่แรมยาวต่อเนื่องกันเป็นบล็อกใหญ่ล่วงหน้าตั้งแต่คอมไพล์ หากข้อมูลมีน้อยแต่จองเยอะจะเกิดความสิ้นเปลืองสูง 
                    ขณะที่ Linked List หรือ Tree จองแรมแบบเปลี่ยนขนาดตามเวลาจริงได้ (Allocate on demand) แต่ก็ต้องแลกมาด้วยภาระพื้นที่เพิ่ม (Pointer Overhead) สำหรับเก็บตำแหน่งอ้างอิง
                  </p>
                </div>
              </div>

              {/* Interactive Word Selectors */}
              <div className="space-y-3 pt-4 border-t border-zinc-100">
                <span className="text-xs font-bold text-slate-400 tracking-wider block uppercase">แชร์หน่วยความจำด้วย Trie (Prefix Tree) สำหรับเก็บคำศัพท์:</span>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(trieWords).map((word) => (
                    <button
                      key={word}
                      onClick={() => setActiveTrieWord(word)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-[12.5px] font-bold cursor-pointer transition-all duration-200
                        ${activeTrieWord === word
                          ? 'bg-emerald-600 text-white shadow shadow-emerald-600/20'
                          : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-800'
                        }`}
                    >
                      "{word}"
                    </button>
                  ))}
                </div>
                
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <h5 className="text-[13.5px] font-bold text-slate-800 mb-0.5">คำอธิบายกลยุทธ์จำลอง:</h5>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {trieWords[activeTrieWord].desc} <br />
                    <span className="text-emerald-600 font-semibold">{trieWords[activeTrieWord].saving}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Prefix Tree SVG visualizer (Trie) */}
            <div className="lg:col-span-6 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between min-h-[360px]">
              <div>
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 border-b border-slate-800 pb-2 mb-4">
                  <span># TRIE PREFIX COMPACTION VISUALIZER</span>
                  <span className="text-emerald-400">memory compression active</span>
                </div>

                <div className="relative w-full h-[280px] flex items-center justify-center bg-black/40 border border-slate-800 rounded-2xl overflow-hidden shadow-inner">
                  {/* SVG Prefix Tree */}
                  <svg className="absolute inset-0 w-full h-full">
                    {/* SVG Connector lines */}
                    <g stroke="#334155" strokeWidth="2">
                      {/* Root to C & D */}
                      <line x1="200" y1="35" x2="110" y2="90" className={isNodeActive('c') ? 'stroke-emerald-400 stroke-[3]' : ''} />
                      <line x1="200" y1="35" x2="290" y2="90" className={isNodeActive('d') ? 'stroke-cyan-400 stroke-[3]' : ''} />

                      {/* C to A */}
                      <line x1="110" y1="90" x2="110" y2="155" className={isNodeActive('ca') ? 'stroke-emerald-400 stroke-[3]' : ''} />
                      {/* D to O */}
                      <line x1="290" y1="90" x2="290" y2="155" className={isNodeActive('do') ? 'stroke-cyan-400 stroke-[3]' : ''} />

                      {/* A to T, R, P */}
                      <line x1="110" y1="155" x2="60" y2="225" className={isNodeActive('cat') ? 'stroke-emerald-400 stroke-[3]' : ''} />
                      <line x1="110" y1="155" x2="110" y2="225" className={isNodeActive('car') ? 'stroke-emerald-400 stroke-[3]' : ''} />
                      <line x1="110" y1="155" x2="160" y2="225" className={isNodeActive('cap') ? 'stroke-emerald-400 stroke-[3]' : ''} />

                      {/* O to G, T */}
                      <line x1="290" y1="155" x2="250" y2="225" className={isNodeActive('dog') ? 'stroke-cyan-400 stroke-[3]' : ''} />
                      <line x1="290" y1="155" x2="330" y2="225" className={isNodeActive('dot') ? 'stroke-cyan-400 stroke-[3]' : ''} />
                    </g>

                    {/* Nodes Circle & Letter text */}
                    {/* Root Node */}
                    <circle cx="200" cy="35" r="16" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                    <text x="200" y="39" fill="#94a3b8" textAnchor="middle" className="font-bold text-xs font-mono">root</text>

                    {/* Left path (c -> a -> t, r, p) */}
                    <g>
                      <circle cx="110" cy="90" r="16" fill={isNodeActive('c') ? '#022c22' : '#1e293b'} stroke={isNodeActive('c') ? '#10b981' : '#475569'} strokeWidth="2" className="transition-all duration-300" />
                      <text x="110" y="95" fill={isNodeActive('c') ? '#10b981' : '#f8fafc'} textAnchor="middle" className="font-bold font-mono text-sm">C</text>

                      <circle cx="110" cy="155" r="16" fill={isNodeActive('ca') ? '#022c22' : '#1e293b'} stroke={isNodeActive('ca') ? '#10b981' : '#475569'} strokeWidth="2" className="transition-all duration-300" />
                      <text x="110" y="160" fill={isNodeActive('ca') ? '#10b981' : '#f8fafc'} textAnchor="middle" className="font-bold font-mono text-sm">A</text>

                      <circle cx="60" cy="225" r="16" fill={isNodeActive('cat') ? '#064e3b' : '#1e293b'} stroke={isNodeActive('cat') ? '#34d399' : '#475569'} strokeWidth="2" className="transition-all duration-300" />
                      <text x="60" y="230" fill={isNodeActive('cat') ? '#34d399' : '#94a3b8'} textAnchor="middle" className="font-bold font-mono text-sm">T</text>

                      <circle cx="110" cy="225" r="16" fill={isNodeActive('car') ? '#064e3b' : '#1e293b'} stroke={isNodeActive('car') ? '#34d399' : '#475569'} strokeWidth="2" className="transition-all duration-300" />
                      <text x="110" y="230" fill={isNodeActive('car') ? '#34d399' : '#94a3b8'} textAnchor="middle" className="font-bold font-mono text-sm">R</text>

                      <circle cx="160" cy="225" r="16" fill={isNodeActive('cap') ? '#064e3b' : '#1e293b'} stroke={isNodeActive('cap') ? '#34d399' : '#475569'} strokeWidth="2" className="transition-all duration-300" />
                      <text x="160" y="230" fill={isNodeActive('cap') ? '#34d399' : '#94a3b8'} textAnchor="middle" className="font-bold font-mono text-sm">P</text>
                    </g>

                    {/* Right path (d -> o -> g, t) */}
                    <g>
                      <circle cx="290" cy="90" r="16" fill={isNodeActive('d') ? '#083344' : '#1e293b'} stroke={isNodeActive('d') ? '#06b6d4' : '#475569'} strokeWidth="2" className="transition-all duration-300" />
                      <text x="290" y="95" fill={isNodeActive('d') ? '#06b6d4' : '#f8fafc'} textAnchor="middle" className="font-bold font-mono text-sm">D</text>

                      <circle cx="290" cy="155" r="16" fill={isNodeActive('do') ? '#083344' : '#1e293b'} stroke={isNodeActive('do') ? '#06b6d4' : '#475569'} strokeWidth="2" className="transition-all duration-300" />
                      <text x="290" y="160" fill={isNodeActive('do') ? '#06b6d4' : '#f8fafc'} textAnchor="middle" className="font-bold font-mono text-sm">O</text>

                      <circle cx="250" cy="225" r="16" fill={isNodeActive('dog') ? '#164e63' : '#1e293b'} stroke={isNodeActive('dog') ? '#22d3ee' : '#475569'} strokeWidth="2" className="transition-all duration-300" />
                      <text x="250" y="230" fill={isNodeActive('dog') ? '#22d3ee' : '#94a3b8'} textAnchor="middle" className="font-bold font-mono text-sm">G</text>

                      <circle cx="330" cy="225" r="16" fill={isNodeActive('dot') ? '#164e63' : '#1e293b'} stroke={isNodeActive('dot') ? '#22d3ee' : '#475569'} strokeWidth="2" className="transition-all duration-300" />
                      <text x="330" y="230" fill={isNodeActive('dot') ? '#22d3ee' : '#94a3b8'} textAnchor="middle" className="font-bold font-mono text-sm">T</text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3: Scalability ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              การสเกลระบบ / รองรับอนาคต
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การรองรับการขยายตัวของระบบ
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Scale comparison Card 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <h4 className="font-bold text-slate-800 text-lg">ขีดจำกัดของข้อมูลขนาดเล็กเทียบกับขนาดใหญ่</h4>
                </div>
                <p className="text-[14px] text-slate-600 leading-relaxed font-sans">
                  เมื่อระบบซอฟต์แวร์ประมวลผลข้อมูลเพียงหลักร้อยหลักพันแถว (Small Scale) ความต่างในแง่ของเวลาหรือแรมของโครงสร้างข้อมูลที่ดีและที่ไม่มีประสิทธิภาพอาจแตกต่างกันเพียงเศษเสี้ยวมิลลิวินาที ทำให้มองไม่เห็นความต่างในทันที 
                  แต่เมื่อสเกลขยายสู่ปริมาณล้านแถว (Big Data) โครงสร้างข้อมูลที่ไม่มีความซับซ้อนที่ดีพอจะนำไปสู่วิกฤตหน่วยความจำล้น (OOM Error) หรือโปรแกรมค้างหน้าจอดับ (Application Freezing)
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-semibold text-slate-500 font-mono">
                <span>Scale factor: N &gt; 100,000</span>
                <span className="text-rose-500">Out of Memory risks</span>
              </div>
            </div>

            {/* Scale comparison Card 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <h4 className="font-bold text-slate-800 text-lg">การวางโครงสร้างเพื่ออนาคต (Future-Proofing)</h4>
                </div>
                <p className="text-[14px] text-slate-600 leading-relaxed font-sans">
                  สถาปนิกซอฟต์แวร์สากลจะประเมินการออกแบบระบบโดยคำนึงถึงขีดความสามารถการเติบโตเชิงสเกลตั้งแต่ขั้นตอนวางพิมพ์เขียว 
                  เพื่อให้มั่นใจว่าเวลาและแรมสะสมจะเพิ่มขึ้นในอัตราส่วนเชิงก้าวหน้าที่ควบคุมได้ (เช่น การเติบโตแบบกึ่งระดับช่วงแอดเดรส $O(\log n)$ หรือคงที่ $O(1)$ แทนที่จะเป็นระดับถล่มทลายอย่างยกกำลังสอง $O(n^2)$)
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-semibold text-slate-500 font-mono">
                <span>Complexity Goal: O(log N)</span>
                <span className="text-emerald-600">Stable Architecture</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 4: Interactive Simulator (SPDS-Sim) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              ตัวจำลองประสิทธิภาพซอฟต์แวร์ / SPDS-Sim
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ห้องทดลองประสิทธิภาพซอฟต์แวร์แบบเรียลไทม์
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทดลองจำลองชุดธุรกรรมค้นหา แทรก หรือลบข้อมูลเพื่อประเมินความเร็วเชิงเวลา (Execution Time) 
            และแรมหน่วยเก็บสะสมสะท้อน (Memory Usage) ในคอมพิวเตอร์เปรียบเทียบเชิงวิชาการ:
          </p>

          <SimulatorShell
            dark
            title="Software Performance & Data Structure Simulator"
            icon={<Activity className="w-8 h-8 text-emerald-400 animate-pulse" />}
            glowColors="from-emerald-600/20 to-cyan-500/10"
            iconColor="text-emerald-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Left Control Panel */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[460px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  SANDBOX CONTROLLER
                </div>

                <div className="space-y-6">
                  {/* Slider N choice */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wide">
                      <span>1. เลือกจำนวนข้อมูล (N):</span>
                      <span className="text-emerald-400 font-mono font-bold text-sm bg-emerald-950/40 px-2 py-0.5 rounded">
                        {dataSize.toLocaleString()} แถว
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={100000}
                      step={dataSize >= 10000 ? 5000 : 1000}
                      value={dataSize}
                      onChange={(e) => setDataSize(parseInt(e.target.value))}
                      disabled={isRunning}
                      className="w-full accent-emerald-500 cursor-pointer disabled:opacity-40"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>1,000</span>
                      <span>50,000</span>
                      <span>100,000</span>
                    </div>
                  </div>

                  {/* Operation Type Selection (Radio Group) */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">2. เลือกประเภทการทำงาน:</span>
                    <div className="flex flex-col gap-2">
                      {[
                        { op: 'search', title: 'ค้นหาตัวข้อมูลท้ายสุด (Search)', complexity: 'O(n) vs O(1)' },
                        { op: 'insert', title: 'แทรกข้อมูลเข้ากึ่งกลาง (Insert)', complexity: 'O(n) vs O(1)' },
                        { op: 'delete', title: 'ลบข้อมูลตัวแรกสุด (Delete)', complexity: 'O(n) vs O(1)' }
                      ].map((item) => (
                        <label
                          key={item.op}
                          className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all duration-200
                            ${operationType === item.op
                              ? 'bg-slate-800 border-emerald-500 text-white shadow shadow-emerald-500/20'
                              : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800/80'
                            } ${isRunning ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="opType"
                              value={item.op}
                              checked={operationType === item.op}
                              onChange={() => setOperationType(item.op)}
                              disabled={isRunning}
                              className="accent-emerald-500 cursor-pointer"
                            />
                            <span>{item.title}</span>
                          </div>
                          <span className="font-mono text-[10px] opacity-75 text-emerald-400 font-bold">{item.complexity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Simulation Control Buttons */}
                <div className="mt-8 pt-4 border-t border-slate-800 space-y-4">
                  <div className="flex gap-3">
                    <button
                      onClick={runSimulation}
                      disabled={isRunning}
                      className="grow bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40 active:scale-[0.98] transition-all disabled:opacity-45 disabled:cursor-not-allowed"
                    >
                      {isRunning ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> กำลังประมวลผล...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" /> สั่งจำลองการประมวลผล
                        </>
                      )}
                    </button>

                    <button
                      onClick={resetSimulator}
                      disabled={isRunning}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <RotateCcw className="w-4 h-4" /> รีเซ็ต
                    </button>
                  </div>

                  {/* Terminal log logs */}
                  <div className="bg-black/60 p-3.5 rounded-xl border border-slate-950 min-h-[90px] font-mono text-[11.5px] leading-relaxed text-emerald-400 select-all overflow-y-auto max-h-[140px]">
                    <div className="text-zinc-500 border-b border-slate-900 pb-1 mb-2 uppercase tracking-wide text-[9px] font-bold">Simulator output console logs:</div>
                    {logLines.map((line, idx) => (
                      <div key={idx} className="animate-fadeIn">
                        <span className="text-zinc-500">&gt; </span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Analytics Dashboard Display */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[460px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                  ANALYTICS DASHBOARD
                </div>

                <div className="space-y-6 mt-4 grow flex flex-col justify-between">
                  {/* Time Complexity Plot Area */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wide">
                      <span>แผนภูมิเปรียบเทียบเวลา (Time Plot Area):</span>
                      <span className="text-[10px] text-zinc-500 font-mono">หน่วย: มิลลิวินาที (ms)</span>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-900 p-4 rounded-2xl space-y-4">
                      {/* Bar A */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400 flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-rose-500" />
                            Model A (Unsorted Array - O(n))
                          </span>
                          <span className="text-rose-400 font-mono font-bold">
                            {modelATime !== null ? `${modelATime} ms` : 'รอสั่งรัน...'}
                          </span>
                        </div>
                        <div className="h-5 bg-slate-950 rounded-full overflow-hidden flex">
                          <div
                            style={{ width: modelATime !== null ? `${Math.min(100, Math.max(8, (modelATime / Math.max(modelATime, 1)) * 100))}%` : '0%' }}
                            className="bg-gradient-to-r from-rose-600 to-pink-500 h-full rounded-full transition-all duration-700 relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                          </div>
                        </div>
                      </div>

                      {/* Bar B */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400 flex items-center gap-1">
                            <Gauge className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                            Model B (Hash Table / List - O(1))
                          </span>
                          <span className="text-emerald-400 font-mono font-bold">
                            {modelBTime !== null ? `${modelBTime} ms` : 'รอสั่งรัน...'}
                          </span>
                        </div>
                        <div className="h-5 bg-slate-950 rounded-full overflow-hidden flex">
                          <div
                            style={{ width: modelBTime !== null ? `${Math.min(100, Math.max(3, (modelBTime / Math.max(modelATime || 1, 1)) * 100))}%` : '0%' }}
                            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Memory Monitor Area */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wide">
                      <span>การวัดขนาดหน่วยความจำสะสม (Memory Monitor Area):</span>
                      <span className="text-[10px] text-zinc-500 font-mono">หน่วย: กิโลไบต์ (KB)</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Memory A */}
                      <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-3.5 flex flex-col justify-between">
                        <span className="text-[11px] font-mono text-slate-500 uppercase">Model A Allocated RAM</span>
                        <span className="text-xl font-bold text-rose-400 font-mono mt-1">
                          {modelAMemory !== null ? `${modelAMemory.toLocaleString()} KB` : 'รอวัดผล...'}
                        </span>
                        <span className="text-[10px] text-zinc-500 mt-1 font-sans">พื้นที่กะทัดรัด (Contiguous 4B/Node)</span>
                      </div>

                      {/* Memory B */}
                      <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-3.5 flex flex-col justify-between">
                        <span className="text-[11px] font-mono text-slate-500 uppercase">Model B Allocated RAM</span>
                        <span className="text-xl font-bold text-emerald-400 font-mono mt-1">
                          {modelBMemory !== null ? `${modelBMemory.toLocaleString()} KB` : 'รอวัดผล...'}
                        </span>
                        <span className="text-[10px] text-zinc-500 mt-1 font-sans">มี Pointer Overhead ({modelAMemory ? Math.round((modelBMemory/modelAMemory)*100) : 0}% ของ A)</span>
                      </div>
                    </div>
                  </div>

                  {/* Analytic Message scholarly summary */}
                  <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl">
                    <h4 className="text-[12.5px] font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                      <Info className="w-4 h-4" /> บทประเมินสรุปทางวิชาการ (Analytic Message):
                    </h4>
                    <p className="text-[12px] text-zinc-300 leading-relaxed font-sans">
                      {getAnalyticSummary()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SimulatorShell>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="วิเคราะห์ความเร็วเชิงเวลาและการออกแบบเพื่อสเกลการทำงาน"
          taskText={`คำชี้แจง: ให้นักเรียนสั่งจำลองและทดลองรันคำนวณเปรียบเทียบในแผงจำลอง SPDS-Sim ด้านบน โดยเลือกขนาด N ระหว่าง 1,000, 50,000, และ 100,000 รายการ จากนั้นวิเคราะห์ผลและเขียนตอบคำถามเชิงลึกในระบบการศึกษา:

1. บันทึกผลลัพธ์ของเวลาประมวลผล (Execution Time) และแรม (Allocated RAM) ของ Model A และ Model B เมื่อจำลองการค้นหา (Search) ข้อมูลที่ขนาด N = 10,000 และ N = 100,000
   - สรุปความเร็วที่เร่งขึ้นเป็นอัตราส่วนกี่เท่า
   - ประเมินผลกระทบด้านขนาดแรมที่จ่ายเพิ่ม (Pointer Memory Overhead) ของ Model B คิดเป็นกี่เปอร์เซ็นต์ของ Model A
2. อธิบายปรากฏการณ์ "ความเร็วและพื้นที่ต่างขั้ว (Time-Space Tradeoff)" ในวิชาวิทยาการคอมพิวเตอร์ผ่านข้อมูลเปรียบเทียบในข้อที่ 1 อย่างมีเหตุผลเชิงวิชาการ
3. หากมีโจทย์ต้องออกแบบระบบค้นหากล่องจดหมายอีเมลของพนักงานระดับสากล 10,000,000 บัญชี 
   - ให้นักเรียนเสนอตัวเลือกโครงสร้างข้อมูลที่เหมาะสม พร้อมอธิบายเหตุผลและประเมินอัตรา Big O ที่ต้องการใช้งานในอนาคต`}
        />
      </main>
    </div>
  );
}
