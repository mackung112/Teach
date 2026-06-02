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
  CheckCircle2,
  Zap,
  Info,
  Network,
  HelpCircle,
  FolderTree,
  ChevronRight,
  Workflow,
  Sparkles,
  RefreshCw,
  Plus,
  Trash2
} from 'lucide-react';

export default function DSA1_1() {
  // ─── 1. Blobs for Layer 1 Background ──────────────────────────────────────
  const DSA1_1_BLOBS = [
    { color: 'bg-emerald-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-40' },
    { color: 'bg-teal-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-35' },
    { color: 'bg-cyan-200',    size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-emerald-100', size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-25' }
  ];

  // ─── State for Topic 1: Mathematical Model ───────────────────────────────
  const [activeFormulaPart, setActiveFormulaPart] = useState('all');

  const formulaParts = {
    all: {
      math: '\\text{Data Structure} = \\text{Data Objects} + \\text{Relationships} + \\text{Functions/Operations}',
      title: 'แบบจำลองคณิตศาสตร์ของโครงสร้างข้อมูล (Mathematical Model)',
      desc: 'โครงสร้างข้อมูลประกอบด้วย 3 ส่วนสำคัญที่ทำงานร่วมกันในหน่วยความจำ ไม่ใช่เพียงแค่ข้อมูลเปล่าดิบๆ เท่านั้น',
      example: 'การรวมองค์ประกอบเหล่านี้สร้างขอบเขตตรรกะที่เป็นระบบสำหรับการเขียนโปรแกรมจริง'
    },
    objects: {
      math: 'D = \\{d_1, d_2, ..., d_n\\}',
      title: 'วัตถุข้อมูล (Data Objects)',
      desc: 'เซตหรือสมาชิกของค่าข้อมูลดิบ (Raw Values/Members) ที่จะนำมาประมวลผล เช่น ค่าตัวเลข ทศนิยม หรือสตริงอักขระชื่อคน',
      example: 'Python: d = ["Alice", "Bob", "Charlie"]'
    },
    relations: {
      math: 'R = \\{r_1, r_2, ..., r_m\\}',
      title: 'ความสัมพันธ์เชิงโครงสร้าง (Relationships)',
      desc: 'กฎเกณฑ์หรือตรรกะเชื่อมโยงทางโครงสร้างระหว่างสมาชิก (เช่น ลำดับก่อน-หลัง, ความเป็นพ่อ-ลูก, ระยะห่าง หรือตำแหน่งแอดเดรสถัดไป)',
      example: 'Python Node: self.next = next_node'
    },
    ops: {
      math: 'F = \\{f_1, f_2, ..., f_k\\}',
      title: 'การดำเนินการและฟังก์ชัน (Functions/Operations)',
      desc: 'เซตของฟังก์ชันหรือชุดคำสั่งทางกฎหมายที่ระบบอนุญาตให้ใช้ดำเนินการและแก้ไขจัดการข้อมูลได้อย่างปลอดภัย เช่น การค้นหา (Search) เพิ่ม (Insert) ลบ (Delete)',
      example: 'Python Method: def append(self, data): ...'
    }
  };

  // ─── State for Topic 3: Hover mapping ─────────────────────────────────────
  const [hoveredMap, setHoveredMap] = useState(null);

  // ─── State for RAM Visualizer Simulator ────────────────────────────────────
  const [layoutMode, setLayoutMode] = useState('contiguous'); // contiguous | linked | hierarchical
  const [sandboxQueue, setSandboxQueue] = useState(['อลิส', 'บ็อบ', 'ชาลี', 'เดฟ']);
  const [inputValue, setInputValue] = useState('');
  
  // Simulation control states
  const [mappedCount, setMappedCount] = useState(0);
  const [isAllocating, setIsAllocating] = useState(false);
  const [flashingAddress, setFlashingAddress] = useState(null);
  const [animStepText, setAnimStepText] = useState('พร้อมสำหรับการจำลองจัดสรรหน่วยความจำ');

  // Customer sandbox modifications
  const addCustomer = () => {
    if (!inputValue.trim()) return;
    if (sandboxQueue.length >= 5) {
      setAnimStepText('Sandbox รองรับลูกค้าสูงสุดได้ 5 คนสำหรับการเรียนรู้ที่กระชับ');
      return;
    }
    setSandboxQueue([...sandboxQueue, inputValue.trim()]);
    setInputValue('');
    resetSimulation();
  };

  const removeCustomer = (index) => {
    const updated = sandboxQueue.filter((_, i) => i !== index);
    setSandboxQueue(updated);
    resetSimulation();
  };

  const resetSimulation = () => {
    setMappedCount(0);
    setIsAllocating(false);
    setFlashingAddress(null);
    setAnimStepText('พร้อมสำหรับการจำลองจัดสรรหน่วยความจำ');
  };

  // Trigger step-by-step allocation
  const runAllocation = () => {
    if (isAllocating) return;
    setIsAllocating(true);
    setMappedCount(0);
    setFlashingAddress(null);

    let currentStep = 0;
    const totalSteps = sandboxQueue.length;

    if (totalSteps === 0) {
      setIsAllocating(false);
      setAnimStepText('กรุณาเพิ่มสมาชิกในแถวสแตนด์บายฝั่งซ้ายก่อนสั่งประมวลผล');
      return;
    }

    const interval = setInterval(() => {
      if (currentStep < totalSteps) {
        const nextCustomer = sandboxQueue[currentStep];
        let targetAddr = '';
        let stepInfo = '';

        if (layoutMode === 'contiguous') {
          // Sequential: 0x001, 0x002, 0x003, ...
          const addrs = ['0x001', '0x002', '0x003', '0x004', '0x005'];
          targetAddr = addrs[currentStep];
          stepInfo = `[ขั้นที่ ${currentStep + 1}] บันทึก "${nextCustomer}" ลงแอดเดรสต่อเนื่องถัดไป ${targetAddr} แบบต่อเนื่อง O(1)`;
        } else if (layoutMode === 'linked') {
          // Scattered: Alice(0x001) -> Bob(0x005) -> Charlie(0x003) -> Dave(0x008) -> Eve(0x006)
          const addrs = ['0x001', '0x005', '0x003', '0x008', '0x006'];
          targetAddr = addrs[currentStep];
          const nextAddr = currentStep + 1 < totalSteps ? addrs[currentStep + 1] : '0x000';
          stepInfo = `[ขั้นที่ ${currentStep + 1}] บันทึก "${nextCustomer}" ในแอดเดรสที่ว่าง ${targetAddr} และสร้างพอยเตอร์ชี้ไปปลายทาง ${nextAddr}`;
        } else {
          // Hierarchical: Alice(0x001 - Root) -> Bob(0x003 - Left), Charlie(0x005 - Right) -> Dave(0x007 - SubLeft), Eve(0x008 - SubRight)
          const addrs = ['0x001', '0x003', '0x005', '0x007', '0x008'];
          targetAddr = addrs[currentStep];
          stepInfo = `[ขั้นที่ ${currentStep + 1}] จัดวาง "${nextCustomer}" ลงโครงสร้างลำดับชั้นที่แอดเดรส ${targetAddr} ตามตรรกะกิ่งไม้`;
        }

        // Set address to flash/pulse orange
        setFlashingAddress(targetAddr);
        setAnimStepText(stepInfo);
        setMappedCount(prev => prev + 1);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsAllocating(false);
        setFlashingAddress(null);
        setAnimStepText('การจำลองจัดสรรหน่วยความจำทั้งหมดเสร็จสมบูรณ์เรียบร้อย');
      }
    }, 1200);
  };

  useEffect(() => {
    resetSimulation();
  }, [layoutMode, sandboxQueue]);

  // Coordinates system for grid overlay lines (Width: 320, Height: 440)
  // Columns: Left Col (X: 75), Right Col (X: 245)
  // Rows: 
  // Row 0 (0x001, 0x002): Y: 55
  // Row 1 (0x003, 0x004): Y: 155
  // Row 2 (0x005, 0x006): Y: 255
  // Row 3 (0x007, 0x008): Y: 355
  const cellPositions = {
    '0x001': { x: 75,  y: 55  },
    '0x002': { x: 245, y: 55  },
    '0x003': { x: 75,  y: 155 },
    '0x004': { x: 245, y: 155 },
    '0x005': { x: 75,  y: 255 },
    '0x006': { x: 245, y: 255 },
    '0x007': { x: 75,  y: 355 },
    '0x008': { x: 245, y: 355 }
  };

  // Helper geometry mapping: Calculate offset start and end points for lines with arrow markers
  const getOffsetLine = (x1, y1, x2, y2, offset = 32) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len === 0) return { x1, y1, x2, y2 };
    const ux = dx / len;
    const uy = dy / len;
    return {
      x1: x1 + ux * offset,
      y1: y1 + uy * offset,
      x2: x2 - ux * offset,
      y2: y2 - uy * offset
    };
  };

  // Compute memory values according to layout and current mappedCount
  const getMemoryState = () => {
    const blocks = {
      '0x001': { name: '', next: '', desc: '', active: false },
      '0x002': { name: '', next: '', desc: '', active: false },
      '0x003': { name: '', next: '', desc: '', active: false },
      '0x004': { name: '', next: '', desc: '', active: false },
      '0x005': { name: '', next: '', desc: '', active: false },
      '0x006': { name: '', next: '', desc: '', active: false },
      '0x007': { name: '', next: '', desc: '', active: false },
      '0x008': { name: '', next: '', desc: '', active: false }
    };

    if (layoutMode === 'contiguous') {
      const order = ['0x001', '0x002', '0x003', '0x004', '0x005'];
      for (let i = 0; i < mappedCount; i++) {
        if (i < sandboxQueue.length) {
          const addr = order[i];
          blocks[addr] = {
            name: sandboxQueue[i],
            next: (i + 1 < sandboxQueue.length) ? order[i + 1] : '0x000',
            desc: `Index ${i}`,
            active: true
          };
        }
      }
    } else if (layoutMode === 'linked') {
      const order = ['0x001', '0x005', '0x003', '0x008', '0x006'];
      for (let i = 0; i < mappedCount; i++) {
        if (i < sandboxQueue.length) {
          const addr = order[i];
          blocks[addr] = {
            name: sandboxQueue[i],
            next: (i + 1 < sandboxQueue.length) ? order[i + 1] : '0x000',
            desc: `Node ${i}`,
            active: true
          };
        }
      }
    } else {
      // Hierarchical Layout (Binary tree representation)
      // Alice (Root - 0x001) -> L: Bob(0x003), R: Charlie(0x005)
      // Bob (Left - 0x003) -> L: Dave(0x007)
      // Charlie (Right - 0x005) -> R: Eve (0x008)
      const order = ['0x001', '0x003', '0x005', '0x007', '0x008'];
      
      if (mappedCount > 0) {
        blocks['0x001'] = { name: sandboxQueue[0], next: '0x003, 0x005', desc: 'Root Node', active: true };
      }
      if (mappedCount > 1) {
        blocks['0x003'] = { name: sandboxQueue[1], next: '0x007', desc: 'Left Branch', active: true };
      }
      if (mappedCount > 2) {
        blocks['0x005'] = { name: sandboxQueue[2], next: '0x008', desc: 'Right Branch', active: true };
      }
      if (mappedCount > 3) {
        blocks['0x007'] = { name: sandboxQueue[3], next: '0x000', desc: 'Leaf Left', active: true };
      }
      if (mappedCount > 4) {
        blocks['0x008'] = { name: sandboxQueue[4], next: '0x000', desc: 'Leaf Right', active: true };
      }
    }

    return blocks;
  };

  const memBlocks = getMemoryState();

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={DSA1_1_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Definition and Axioms ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              ความรู้พื้นฐาน / นิยามและสัจพจน์
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              นิยามและสัจพจน์ของโครงสร้างข้อมูล
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left explanation text block (Fluid Open-Air style) */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
                  ในทางวิศวกรรมคอมพิวเตอร์ <strong className="text-zinc-950 font-semibold">โครงสร้างข้อมูล (Data Structure)</strong> ไม่ใช่เป็นเพียงการเก็บข้อมูลดิบเปล่าๆ ในหน่วยความจำ 
                  แต่เป็นนิยามเชิงตรรกะที่จัดระเบียบและจัดการข้อมูลให้คอมพิวเตอร์เข้าถึง ปรับปรุงแก้ไข 
                  และประมวลผลข้อมูลเหล่านั้นได้อย่างมีประสิทธิภาพสูงสุดภายใต้สภาวะทรัพยากรระบบที่มีอยู่อย่างจำกัด
                </p>

                <div className="bg-emerald-50/60 backdrop-blur-md border border-emerald-200/60 rounded-2xl p-5 border-l-[3px] border-l-emerald-500 leading-relaxed">
                  <h4 className="font-semibold text-emerald-900 text-[15px] mb-1.5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    นิยามและข้อตกลงทางวิชาการ
                  </h4>
                  <p className="text-[14px] text-slate-600 leading-relaxed">
                    โครงสร้างข้อมูลประกอบด้วยเซตข้อมูลจำกัดที่มีความสัมพันธ์เชื่อมโยงถึงกันอย่างมีระบบ 
                    พร้อมสัจพจน์ระบุกติกาการทำงานที่อนุญาตให้กระทำต่อสมาชิกแต่ละตัว
                  </p>
                </div>
              </div>

              {/* Dynamic Model selector triggers */}
              <div className="space-y-3 pt-4">
                <span className="text-xs font-bold text-slate-400 tracking-wider block uppercase">เลือกส่วนประกอบของแบบจำลองคณิตศาสตร์:</span>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(formulaParts).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveFormulaPart(key)}
                      className={`px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 cursor-pointer
                        ${activeFormulaPart === key
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 border-emerald-500'
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-50'
                        }`}
                    >
                      {key === 'all' && 'สูตรรวม (Mathematical Model)'}
                      {key === 'objects' && 'วัตถุข้อมูล (Objects)'}
                      {key === 'relations' && 'ความสัมพันธ์ (Relationships)'}
                      {key === 'ops' && 'ฟังก์ชันประมวลผล (Operations)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Formula board */}
            <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 border-b border-slate-800 pb-2 mb-4">
                  <span># MATHEMATICAL DATA MODEL SYSTEM</span>
                  <span className="text-emerald-400">active schema</span>
                </div>

                <div className="py-4 px-3 bg-black/40 rounded-2xl border border-slate-800 flex items-center justify-center min-h-[90px] shadow-inner mb-4">
                  <code className="font-mono text-sm md:text-base text-emerald-400 text-center font-bold break-all leading-relaxed">
                    {activeFormulaPart === 'all' && 'Data Structure = Data Objects + Relationships + Functions'}
                    {activeFormulaPart === 'objects' && 'D = { d₁, d₂, ..., dₙ }'}
                    {activeFormulaPart === 'relations' && 'R = { r₁, r₂, ..., r_m }'}
                    {activeFormulaPart === 'ops' && 'F = { f₁, f₂, ..., f_k }'}
                  </code>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[15px] font-bold text-white flex items-center gap-1.5 font-sans">
                    <Zap className="w-4 h-4 text-amber-400" />
                    {formulaParts[activeFormulaPart].title}
                  </h4>
                  <p className="text-[13px] text-zinc-400 leading-relaxed font-sans">
                    {formulaParts[activeFormulaPart].desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800">
                <span className="text-[11px] font-mono text-emerald-500/95 block font-medium">
                  {formulaParts[activeFormulaPart].example}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Roles in Software Architecture ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              สถาปัตยกรรมซอฟต์แวร์ / บทบาทหน้าที่
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              บทบาทและหน้าที่หลักในสถาปัตยกรรมซอฟต์แวร์
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Concept Card 1 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="text-[16px] font-bold text-zinc-950">สะพานเชื่อมกายภาพและนามธรรม</h4>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                ฮาร์ดแวร์คอมพิวเตอร์ระดับล่างมองเห็น RAM เป็นเพียงหน่วยความจำเลขฐานสองเรียงต่อกัน 
                โครงสร้างข้อมูลช่วยแปลงให้กลายเป็นแบบจำลองทางความคิดของมนุษย์ (Abstraction Layer) 
                เช่น แปลงแรมเป็นโครงสร้างต้นไม้ (Tree) หรือเครือข่ายความสัมพันธ์เชิงกราฟ (Graph)
              </p>
            </div>

            {/* Concept Card 2 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <h4 className="text-[16px] font-bold text-zinc-950">การบริหารพื้นที่หน่วยความจำ</h4>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                ทำหน้าที่จัดสรรแรมอย่างคุ้มค่า ไม่ว่าจะเป็นการจัดสรรแบบคงที่ใน Stack (Static Allocation) 
                หรือการจองเนื้อที่ยืดหยุ่นปรับลดขนาดได้บน Heap Memory (Dynamic Allocation) 
                เพื่อลดปัญหาพื้นที่ว่างที่เสียเปล่าและป้องกันปัญหาหน่วยความจำรั่วไหล (Memory Leak)
              </p>
            </div>

            {/* Concept Card 3 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                  <Layers className="w-6 h-6" />
                </div>
                <h4 className="text-[16px] font-bold text-zinc-950">การควบคุมความซับซ้อนของซอฟต์แวร์</h4>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                การวิเคราะห์เลือกใช้ประเภทโครงสร้างข้อมูลที่สอดรับกับโจทย์ปัญหาจะส่งผลให้ 
                สปริงเกอร์ซอร์สโค้ดสะอาดขึ้น (Clean Code) ลดความซับซ้อนของลูป ประหยัดทรัพยากร CPU 
                และทำให้นักพัฒนาบำรุงรักษาระบบซอฟต์แวร์ขนาดใหญ่ได้อย่างเป็นระบบ
              </p>
            </div>
          </div>
        </section>

        {/* ─── Section 3: Real-world Mapping ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              การจำลองโมเดล / จากโลกจริงสู่ระบบดิจิทัล
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การจำลองภาพสถานการณ์จริงสู่ระบบดิจิทัล
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            เพื่อเปลี่ยนแนวคิดนามธรรมให้เป็นรูปธรรม นักเรียนสามารถมองความสัมพันธ์ของโครงสร้างข้อมูลในชีวิตประจำวัน 
            เปรียบเทียบกับรูปแบบการจำลองของหน่วยประมวลผลคอมพิวเตอร์ดังนี้:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Real World Card 1 */}
            <div 
              onMouseEnter={() => setHoveredMap(1)}
              onMouseLeave={() => setHoveredMap(null)}
              className="bg-white rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:shadow-lg relative overflow-hidden"
            >
              <div className="text-xs font-bold text-emerald-600 mb-1">REAL-WORLD SITUATION 1</div>
              <h4 className="text-lg font-bold text-slate-900 mb-3">ระบบคิวรอรับบริการธนาคาร</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-700">ลำดับ: มาก่อน บริการก่อน</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">FIFO</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                <span>จำลองในระบบด้วย:</span>
                <span className="text-emerald-600 underline decoration-2">คิว (Queue Data Structure)</span>
              </div>
              {hoveredMap === 1 && (
                <div className="absolute inset-0 bg-slate-950/95 text-emerald-400 p-5 flex flex-col justify-between font-mono text-xs transition-opacity duration-300 animate-fadeIn">
                  <div>
                    <span className="text-zinc-500 block mb-1"># Python Code: Queue mapping</span>
                    <code>
                      queue = []<br />
                      queue.append("Customer A") # Enqueue<br />
                      queue.pop(0) # Dequeue
                    </code>
                  </div>
                  <span className="text-[10px] text-zinc-400 italic">ความเที่ยงตรงของลำดับ O(1)</span>
                </div>
              )}
            </div>

            {/* Real World Card 2 */}
            <div 
              onMouseEnter={() => setHoveredMap(2)}
              onMouseLeave={() => setHoveredMap(null)}
              className="bg-white rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:shadow-lg relative overflow-hidden"
            >
              <div className="text-xs font-bold text-emerald-600 mb-1">REAL-WORLD SITUATION 2</div>
              <h4 className="text-lg font-bold text-slate-900 mb-3">ปุ่มประวัติย้อนกลับเว็บเพจ (Back Button)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-700">ลำดับ: หน้าล่าสุด ถูกดึงกลับก่อน</span>
                <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full font-bold">LIFO</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                <span>จำลองในระบบด้วย:</span>
                <span className="text-cyan-600 underline decoration-2">สแต็ก (Stack Data Structure)</span>
              </div>
              {hoveredMap === 2 && (
                <div className="absolute inset-0 bg-slate-950/95 text-cyan-400 p-5 flex flex-col justify-between font-mono text-xs transition-opacity duration-300 animate-fadeIn">
                  <div>
                    <span className="text-zinc-500 block mb-1"># Python Code: Stack mapping</span>
                    <code>
                      stack = []<br />
                      stack.append("Page_1.html") # Push<br />
                      stack.pop() # Pop (ล่าสุดออกก่อน)
                    </code>
                  </div>
                  <span className="text-[10px] text-zinc-400 italic">การกู้คืนสถานะตามเวลา O(1)</span>
                </div>
              )}
            </div>

            {/* Real World Card 3 */}
            <div 
              onMouseEnter={() => setHoveredMap(3)}
              onMouseLeave={() => setHoveredMap(null)}
              className="bg-white rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:shadow-lg relative overflow-hidden"
            >
              <div className="text-xs font-bold text-emerald-600 mb-1">REAL-WORLD SITUATION 3</div>
              <h4 className="text-lg font-bold text-slate-900 mb-3">โครงสร้างไดเรกทอรีแฟ้มจัดเก็บเอกสาร</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-700">โครงสร้าง: แตกแขนงโฟลเดอร์ย่อย</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">Tree-based</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                <span>จำลองในระบบด้วย:</span>
                <span className="text-amber-600 underline decoration-2">ต้นไม้ (Tree Data Structure)</span>
              </div>
              {hoveredMap === 3 && (
                <div className="absolute inset-0 bg-slate-950/95 text-amber-400 p-5 flex flex-col justify-between font-mono text-xs transition-opacity duration-300 animate-fadeIn">
                  <div>
                    <span className="text-zinc-500 block mb-1"># Python Class: Tree Node</span>
                    <code>
                      class FolderNode:<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;def __init__(self, name):<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.name = name<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.children = []
                    </code>
                  </div>
                  <span className="text-[10px] text-zinc-400 italic">ความสัมพันธ์แบบเป็นลำดับชั้น</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── Section 4: Interactive Simulator (RAM Visualizer) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              เครื่องจำลองเชิงโต้ตอบ / RAM Visualizer
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตัวจำลองความสัมพันธ์ของหน่วยความจำเชิงกายภาพ
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            เรียนรู้การจัดเก็บข้อมูลระดับแอดเดรสจริงในแรมคอมพิวเตอร์เปรียบเทียบ 3 รูปแบบความต้องการ: 
            สังเกตความต่างของพื้นที่จัดเก็บที่ต่อเนื่องกัน (Contiguous) กับแบบกระจายตัวและเชื่อมด้วยที่อยู่ (Linked List)
          </p>

          <SimulatorShell
            dark
            title="RAM Visualizer & Data Structural Mapper Agent"
            icon={<Cpu className="w-8 h-8 text-emerald-400" />}
            glowColors="from-emerald-600/20 to-teal-500/10"
            iconColor="text-emerald-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Left Panel: Control and Sandbox */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[480px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  SANDBOX CONTROLLER
                </div>

                <div className="space-y-6">
                  {/* Select Structure Layout Mode */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">1. เลือกรูปแบบโครงสร้างข้อมูล:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { mode: 'contiguous', label: 'แบบต่อเนื่อง (Array)', accent: 'border-emerald-500 text-emerald-400 bg-emerald-950/20' },
                        { mode: 'linked', label: 'แบบเชื่อมโยง (List)', accent: 'border-cyan-500 text-cyan-400 bg-cyan-950/20' },
                        { mode: 'hierarchical', label: 'แบบลำดับชั้น (Tree)', accent: 'border-amber-500 text-amber-400 bg-amber-950/20' }
                      ].map((item) => (
                        <button
                          key={item.mode}
                          onClick={() => setLayoutMode(item.mode)}
                          disabled={isAllocating}
                          className={`p-2.5 rounded-xl border text-[12px] font-semibold text-center cursor-pointer transition-all duration-200 leading-snug
                            ${layoutMode === item.mode
                              ? item.accent
                              : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
                            } ${isAllocating ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sandbox customers standby list */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">2. รายชื่อในแถวคิวสแตนด์บาย (โลกจริง):</span>
                      <span className="text-[10px] text-zinc-500 font-mono">จำนวน: {sandboxQueue.length}/5</span>
                    </div>

                    <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 min-h-[90px] flex flex-wrap gap-2 items-center">
                      {sandboxQueue.length === 0 && (
                        <span className="text-xs text-slate-600 italic">ไม่มีคิวลูกค้าที่รอการจัดสรรหน่วยความจำ</span>
                      )}
                      {sandboxQueue.map((cust, idx) => (
                        <div
                          key={idx}
                          className="px-2.5 py-1.5 bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1.5 hover:border-slate-500 transition-all"
                        >
                          <span>{cust}</span>
                          <button
                            onClick={() => removeCustomer(idx)}
                            disabled={isAllocating}
                            className="text-slate-500 hover:text-red-400 hover:scale-110 transition-all shrink-0 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add custom element input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="ชื่อคิว (เช่น ส้ม, เอก)"
                        maxLength={8}
                        disabled={isAllocating}
                        className="bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-xs rounded-xl px-3 py-2 text-white placeholder-slate-600 grow"
                      />
                      <button
                        onClick={addCustomer}
                        disabled={isAllocating || !inputValue.trim()}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-3.5 py-2 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-3.5 h-3.5" /> เพิ่ม
                      </button>
                    </div>
                  </div>
                </div>

                {/* Simulator Action control buttons */}
                <div className="mt-8 pt-4 border-t border-slate-800 space-y-4">
                  <div className="flex gap-3">
                    <button
                      onClick={runAllocation}
                      disabled={isAllocating || sandboxQueue.length === 0}
                      className="grow bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40 active:scale-[0.98] transition-all disabled:opacity-45 disabled:cursor-not-allowed"
                    >
                      {isAllocating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> กำลังจัดสรรหน่วยความจำ...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" /> เริ่มจำลองการจัดสรร (MAP)
                        </>
                      )}
                    </button>

                    <button
                      onClick={resetSimulation}
                      disabled={isAllocating}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <RotateCcw className="w-4 h-4" /> รีเซ็ต
                    </button>
                  </div>

                  {/* Simulator terminal output message */}
                  <div className="bg-black/60 p-3 rounded-xl border border-slate-950 min-h-[50px] flex items-center font-mono text-[11.5px] leading-relaxed text-emerald-400">
                    <div>
                      <span className="text-zinc-500">&gt; </span>
                      <span>{animStepText}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: Memory Grid Display */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[480px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                  PHYSICAL RAM GRID DISPLAY
                </div>

                <div className="relative w-full h-[400px] mt-4 flex items-center justify-center">
                  
                  {/* Grid cells layout (4 Rows, 2 Columns) */}
                  <div className="grid grid-cols-2 gap-x-28 gap-y-6 w-full max-w-[480px] z-10 relative">
                    {[
                      { addr: '0x001', col: 'left' },
                      { addr: '0x002', col: 'right' },
                      { addr: '0x003', col: 'left' },
                      { addr: '0x004', col: 'right' },
                      { addr: '0x005', col: 'left' },
                      { addr: '0x006', col: 'right' },
                      { addr: '0x007', col: 'left' },
                      { addr: '0x008', col: 'right' }
                    ].map((cell) => {
                      const block = memBlocks[cell.addr];
                      const isFlashing = flashingAddress === cell.addr;
                      const hasData = block.active && block.name;

                      return (
                        <div
                          key={cell.addr}
                          className={`bg-slate-900 border rounded-xl p-3 flex flex-col justify-between h-[76px] transition-all duration-350 relative overflow-hidden
                            ${isFlashing 
                              ? 'border-orange-500 ring-2 ring-orange-500/35 bg-orange-950/20 scale-[1.03] shadow-lg shadow-orange-950/50' 
                              : hasData
                                ? layoutMode === 'contiguous'
                                  ? 'border-emerald-500/50 bg-emerald-950/10'
                                  : layoutMode === 'linked'
                                    ? 'border-cyan-500/50 bg-cyan-950/10'
                                    : 'border-amber-500/50 bg-amber-950/10'
                                : 'border-slate-800'
                            }`}
                        >
                          {/* Top row of cell */}
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-zinc-500 font-bold">{cell.addr}</span>
                            {hasData ? (
                              <span className={`text-[9px] font-mono font-semibold uppercase px-1.5 py-0.2 rounded
                                ${layoutMode === 'contiguous'
                                  ? 'text-emerald-400 bg-emerald-950/40'
                                  : layoutMode === 'linked'
                                    ? 'text-cyan-400 bg-cyan-950/40'
                                    : 'text-amber-400 bg-amber-950/40'
                                }`}>
                                {block.desc}
                              </span>
                            ) : (
                              <span className="text-[9px] font-mono text-zinc-700 italic">EMPTY</span>
                            )}
                          </div>

                          {/* Customer value of cell */}
                          <div className="mt-1 flex items-center justify-between">
                            {hasData ? (
                              <span className="text-white text-[13.5px] font-semibold tracking-wide animate-fadeIn">
                                {block.name}
                              </span>
                            ) : (
                              <span className="text-zinc-700 text-xs">-</span>
                            )}
                          </div>

                          {/* Pointer sub-block at the bottom of the cell */}
                          {hasData && (
                            <div className="text-[9px] font-mono text-slate-400 border-t border-slate-800 mt-1 pt-0.5 flex justify-between">
                              {layoutMode === 'contiguous' && (
                                <>
                                  <span>Offset Addr</span>
                                  <span className="text-emerald-400 font-semibold">{block.next}</span>
                                </>
                              )}
                              {layoutMode === 'linked' && (
                                <>
                                  <span>Next Node Pointer</span>
                                  <span className="text-cyan-400 font-semibold">{block.next}</span>
                                </>
                              )}
                              {layoutMode === 'hierarchical' && (
                                <>
                                  <span>Child Branch Ptr</span>
                                  <span className="text-amber-400 font-semibold">{block.next}</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Absolute Overlay SVG for rendering references and pointer arrows */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <defs>
                      <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10B981" />
                      </marker>
                      <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#06B6D4" />
                      </marker>
                      <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#F59E0B" />
                      </marker>
                    </defs>

                    {/* Array sequential indicators in Contiguous mode */}
                    {layoutMode === 'contiguous' && mappedCount > 1 && (
                      <g className="animate-fadeIn">
                        {Array.from({ length: Math.min(mappedCount - 1, sandboxQueue.length - 1) }).map((_, idx) => {
                          const order = ['0x001', '0x002', '0x003', '0x004', '0x005'];
                          const from = order[idx];
                          const to = order[idx + 1];
                          const p1 = cellPositions[from];
                          const p2 = cellPositions[to];

                          const line = getOffsetLine(p1.x, p1.y, p2.x, p2.y, 34);

                          return (
                            <path
                              key={idx}
                              d={`M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`}
                              fill="none"
                              stroke="#10B981"
                              strokeWidth="2"
                              strokeDasharray="4 4"
                              markerEnd="url(#arrow-emerald)"
                              className="opacity-70"
                            />
                          );
                        })}
                      </g>
                    )}

                    {/* Linked List pointer references in Linked mode */}
                    {layoutMode === 'linked' && mappedCount > 1 && (
                      <g className="animate-fadeIn">
                        {Array.from({ length: Math.min(mappedCount - 1, sandboxQueue.length - 1) }).map((_, idx) => {
                          const order = ['0x001', '0x005', '0x003', '0x008', '0x006'];
                          const from = order[idx];
                          const to = order[idx + 1];
                          const p1 = cellPositions[from];
                          const p2 = cellPositions[to];

                          // Create elegant Bezier curve curves for scattered references
                          const line = getOffsetLine(p1.x, p1.y, p2.x, p2.y, 34);
                          const dx = line.x2 - line.x1;
                          const dy = line.y2 - line.y1;
                          
                          // Control point offset for smooth curve
                          const cx1 = line.x1 + dx * 0.25 - (dy * 0.15);
                          const cy1 = line.y1 + dy * 0.25 + (dx * 0.15);
                          const cx2 = line.x1 + dx * 0.75 - (dy * 0.15);
                          const cy2 = line.y1 + dy * 0.75 + (dx * 0.15);

                          return (
                            <path
                              key={idx}
                              d={`M ${line.x1} ${line.y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${line.x2} ${line.y2}`}
                              fill="none"
                              stroke="#06B6D4"
                              strokeWidth="2.5"
                              markerEnd="url(#arrow-cyan)"
                              className="opacity-85 shadow-lg"
                            />
                          );
                        })}
                      </g>
                    )}

                    {/* Tree branched hierarchical lines in Hierarchical mode */}
                    {layoutMode === 'hierarchical' && mappedCount > 1 && (
                      <g className="animate-fadeIn">
                        {/* Root 0x001 to Left Child 0x003 */}
                        {mappedCount > 1 && (
                          <path
                            d={`M ${getOffsetLine(cellPositions['0x001'].x, cellPositions['0x001'].y, cellPositions['0x003'].x, cellPositions['0x003'].y, 34).x1} ${getOffsetLine(cellPositions['0x001'].x, cellPositions['0x001'].y, cellPositions['0x003'].x, cellPositions['0x003'].y, 34).y1} L ${getOffsetLine(cellPositions['0x001'].x, cellPositions['0x001'].y, cellPositions['0x003'].x, cellPositions['0x003'].y, 34).x2} ${getOffsetLine(cellPositions['0x001'].x, cellPositions['0x001'].y, cellPositions['0x003'].x, cellPositions['0x003'].y, 34).y2}`}
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="2.5"
                            markerEnd="url(#arrow-amber)"
                          />
                        )}
                        {/* Root 0x001 to Right Child 0x005 */}
                        {mappedCount > 2 && (
                          <path
                            d={`M ${getOffsetLine(cellPositions['0x001'].x, cellPositions['0x001'].y, cellPositions['0x005'].x, cellPositions['0x005'].y, 34).x1} ${getOffsetLine(cellPositions['0x001'].x, cellPositions['0x001'].y, cellPositions['0x005'].x, cellPositions['0x005'].y, 34).y1} L ${getOffsetLine(cellPositions['0x001'].x, cellPositions['0x001'].y, cellPositions['0x005'].x, cellPositions['0x005'].y, 34).x2} ${getOffsetLine(cellPositions['0x001'].x, cellPositions['0x001'].y, cellPositions['0x005'].x, cellPositions['0x005'].y, 34).y2}`}
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="2.5"
                            markerEnd="url(#arrow-amber)"
                          />
                        )}
                        {/* Bob 0x003 to Dave 0x007 */}
                        {mappedCount > 3 && (
                          <path
                            d={`M ${getOffsetLine(cellPositions['0x003'].x, cellPositions['0x003'].y, cellPositions['0x007'].x, cellPositions['0x007'].y, 34).x1} ${getOffsetLine(cellPositions['0x003'].x, cellPositions['0x003'].y, cellPositions['0x007'].x, cellPositions['0x007'].y, 34).y1} L ${getOffsetLine(cellPositions['0x003'].x, cellPositions['0x003'].y, cellPositions['0x007'].x, cellPositions['0x007'].y, 34).x2} ${getOffsetLine(cellPositions['0x003'].x, cellPositions['0x003'].y, cellPositions['0x007'].x, cellPositions['0x007'].y, 34).y2}`}
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="2.5"
                            markerEnd="url(#arrow-amber)"
                          />
                        )}
                        {/* Charlie 0x005 to Eve 0x008 */}
                        {mappedCount > 4 && (
                          <path
                            d={`M ${getOffsetLine(cellPositions['0x005'].x, cellPositions['0x005'].y, cellPositions['0x008'].x, cellPositions['0x008'].y, 34).x1} ${getOffsetLine(cellPositions['0x005'].x, cellPositions['0x005'].y, cellPositions['0x008'].x, cellPositions['0x008'].y, 34).y1} L ${getOffsetLine(cellPositions['0x005'].x, cellPositions['0x005'].y, cellPositions['0x008'].x, cellPositions['0x008'].y, 34).x2} ${getOffsetLine(cellPositions['0x005'].x, cellPositions['0x005'].y, cellPositions['0x008'].x, cellPositions['0x008'].y, 34).y2}`}
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="2.5"
                            markerEnd="url(#arrow-amber)"
                          />
                        )}
                      </g>
                    )}
                  </svg>
                </div>
              </div>
            </div>
          </SimulatorShell>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="วิเคราะห์การคำนวณและประเมินประสิทธิภาพการใช้แรมคอมพิวเตอร์"
          taskText={`คำชี้แจง: ให้นักเรียนสลับทดลองใช้แผงควบคุมจำลอง RAM Visualizer ด้านบน จากนั้นประเมินและเปรียบเทียบการเก็บข้อมูลในหน่วยความจำจริง และตอบคำถามทางวิชาการข้อต่อไปนี้ลงในระบบการศึกษา:

1. เปรียบเทียบความแตกต่างระหว่างโครงสร้างจัดเก็บแบบ "ต่อเนื่องกัน (Contiguous Storage)" และแบบ "กระจายเชื่อมด้วยที่อยู่ (Linked/Pointer Storage)" ในประเด็นของ:
   - ตรรกะประสิทธิภาพการเข้าถึงสมาชิกแบบสุ่ม (Random Access Time Complexity)
   - ภาระขนาดหน่วยความจำเพิ่มเติมภายนอก (Pointer Memory Overhead)
2. หากชุดคำสั่งโปรแกรมระบบต้องการจองจัดเก็บเลขที่สมาชิกคิวธนาคารเป็นจำนวนเต็มขนาด 4 ไบต์ (Integer) จำนวนรวม 1,000 คน
   - จงคำนวณหาขนาดพื้นที่ RAM สุทธิทั้งหมด (หน่วยเป็นไบต์) เมื่อจัดเก็บแบบ อะเรย์ต่อเนื่อง (Array) เทียบกับแบบ รายการเชื่อมโยงทางเดียว (Singly Linked List) ที่มี Pointer Address ขนาด 8 ไบต์ต่อช่องบนสถาปัตยกรรมระบบ 64-bit
   - อธิบายข้อจำกัดเมื่อมีหน่วยความจำภายนอกแตกกระจายตัว (External Memory Fragmentation) ในระบบ`}
        />
      </main>
    </div>
  );
}
