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
  Plus,
  Trash2,
  FolderTree,
  Network,
  Activity,
  Binary,
  Maximize2,
  HelpCircle,
  TrendingUp,
  Inbox,
  Workflow
} from 'lucide-react';

export default function DSA1_3() {
  // ─── Layer 1: Ambient Background Blobs ─────────────────────────────────────
  const DSA1_3_BLOBS = [
    { color: 'bg-indigo-200',  size: 'w-[450px] h-[450px]', position: '-top-32 -left-32',   opacity: 'opacity-40' },
    { color: 'bg-cyan-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32',  opacity: 'opacity-35' },
    { color: 'bg-violet-200',  size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-slate-200',   size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3',    opacity: 'opacity-25' }
  ];

  // ─── Simulator State ───────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('primitive'); // primitive | array | linkedlist | stackqueue | tree | graph
  const [speed, setSpeed] = useState(50); // Animation speed slider (1 - 100)
  const [inputText, setInputText] = useState('A');
  const [statusMsg, setStatusMsg] = useState('ระบบพร้อมสำหรับการจำลองจัดวางหน่วยความจำ');
  const [pulseNode, setPulseNode] = useState(null);

  // ─── State for Primitive View ───
  const [primitiveType, setPrimitiveType] = useState('Integer'); // Integer | Float | Character | Boolean
  const [primitiveVal, setPrimitiveVal] = useState('42');
  const [allocatedPrimitive, setAllocatedPrimitive] = useState({
    allocated: true,
    type: 'Integer',
    val: '42',
    address: '0x7ffe3b4a210',
    size: 4,
    binary: '00000000 00000000 00000000 00101010'
  });

  // ─── State for Array View ───
  const [arrayData, setArrayData] = useState(['15', '22', '38', '47', '56', '']);
  const [activeIndex, setActiveIndex] = useState(null);

  // ─── State for Linked List View ───
  // Simulated memory coordinates for scattered allocation
  const [linkedNodes, setLinkedNodes] = useState([
    { id: 1, val: 'A', addr: '0x20F4', nextAddr: '0x35A8', cx: 80,  cy: 80 },
    { id: 2, val: 'B', addr: '0x35A8', nextAddr: '0x401C', cx: 280, cy: 180 },
    { id: 3, val: 'C', addr: '0x401C', nextAddr: 'NULL',   cx: 160, cy: 300 }
  ]);

  // ─── State for Stack & Queue ───
  const [stackData, setStackData] = useState(['Data-1', 'Data-2', 'Data-3']);
  const [queueData, setQueueData] = useState(['Job-A', 'Job-B', 'Job-C']);

  // ─── State for Tree (BST) ───
  const [treeNodes, setTreeNodes] = useState([
    { val: 50, x: 220, y: 50, left: 30, right: 70 },
    { val: 30, x: 120, y: 140, left: 20, right: 40 },
    { val: 70, x: 320, y: 140, left: 60, right: 80 },
    { val: 20, x: 70,  y: 230, left: null, right: null },
    { val: 40, x: 170, y: 230, left: null, right: null },
    { val: 60, x: 270, y: 230, left: null, right: null },
    { val: 80, x: 370, y: 230, left: null, right: null }
  ]);

  // ─── State for Graph View ───
  const [graphPulse, setGraphPulse] = useState(false);
  const graphNodes = [
    { id: 'V1', label: 'โฮสต์ A', cx: 80,  cy: 80 },
    { id: 'V2', label: 'เราเตอร์ B', cx: 240, cy: 80 },
    { id: 'V3', label: 'เซิร์ฟเวอร์ C', cx: 380, cy: 180 },
    { id: 'V4', label: 'สวิตช์ D', cx: 240, cy: 280 },
    { id: 'V5', label: 'โฮสต์ E', cx: 80,  cy: 280 }
  ];
  const graphEdges = [
    { from: 'V1', to: 'V2' },
    { from: 'V2', to: 'V3' },
    { from: 'V3', to: 'V4' },
    { from: 'V4', to: 'V5' },
    { from: 'V5', to: 'V1' },
    { from: 'V2', to: 'V4' }
  ];

  // ─── Operation Timers & Handlers ──────────────────────────────────────────
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // 1. Primitive Allocator
  const handlePrimitiveAlloc = () => {
    let size = 4;
    let binary = '00000000 00000000 00000000 00000000';
    let addr = '0x7ffe' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase();

    if (primitiveType === 'Integer') {
      size = 4;
      const num = parseInt(primitiveVal) || 0;
      binary = (num >>> 0).toString(2).padStart(32, '0').replace(/(.{8})/g, '$1 ').trim();
    } else if (primitiveType === 'Float') {
      size = 8;
      binary = '01000000 01001001 00001111 11011011 ... (64-bit IEEE 754)';
    } else if (primitiveType === 'Character') {
      size = 2;
      const charCode = (primitiveVal.charAt(0) || 'A').charCodeAt(0);
      binary = charCode.toString(2).padStart(16, '0').replace(/(.{8})/g, '$1 ').trim();
    } else if (primitiveType === 'Boolean') {
      size = 1;
      const isTrue = primitiveVal.toLowerCase() === 'true' || primitiveVal === '1';
      binary = isTrue ? '00000001' : '00000000';
    }

    setStatusMsg(`[ALLOCATED] จองพื้นที่หน่วยความจำสำเร็จ ขนาด ${size} Bytes ณ ตำแหน่ง ${addr}`);
    setAllocatedPrimitive({
      allocated: true,
      type: primitiveType,
      val: primitiveVal,
      address: addr,
      size,
      binary
    });

    setPulseNode('primitive');
    setTimeout(() => setPulseNode(null), 800);
  };

  // 2. Array Handlers
  const handleArraySet = (idx, val) => {
    const nextArr = [...arrayData];
    nextArr[idx] = val;
    setArrayData(nextArr);
    setActiveIndex(idx);
    setStatusMsg(`[ARRAY UPDATE] กำหนดค่าดัชนี [${idx}] = "${val}" ที่พิกัดแรมคงที่ 0x1000 + ${idx * 4} = 0x${(0x1000 + idx * 4).toString(16).toUpperCase()}`);
    setTimeout(() => setActiveIndex(null), 1000);
  };

  // 3. Linked List Handlers
  const handleLinkedListInsert = () => {
    if (!inputText) return;
    const addrs = ['0x1102', '0x22AC', '0x33BD', '0x44DE', '0x55F0', '0x6A28', '0x7B9E', '0x9CE0'];
    const randomAddr = addrs[Math.floor(Math.random() * addrs.length)];
    const rx = Math.floor(Math.random() * 260) + 70;
    const ry = Math.floor(Math.random() * 180) + 80;

    const newNode = {
      id: Date.now(),
      val: inputText.substring(0, 5),
      addr: randomAddr,
      nextAddr: 'NULL',
      cx: rx,
      cy: ry
    };

    setLinkedNodes(prev => {
      if (prev.length === 0) {
        setStatusMsg(`[LINKED LIST] เพิ่มโหนดแรกสุด (Head) ที่ตำแหน่งแรมใหม่ ${randomAddr}`);
        return [newNode];
      }
      
      const updated = [...prev];
      // update predecessor pointer to point to this new node address
      updated[updated.length - 1].nextAddr = randomAddr;
      updated.push(newNode);
      
      setStatusMsg(`[LINKED LIST] เชื่อมพอยเตอร์จากโหนด ${updated[updated.length - 2].val} (${updated[updated.length - 2].addr}) -> ไปยังโหนดใหม่ ${newNode.val} (${newNode.addr})`);
      return updated;
    });

    setPulseNode(newNode.id);
    setTimeout(() => setPulseNode(null), 1000);
  };

  const handleLinkedListClear = () => {
    setLinkedNodes([]);
    setStatusMsg('[LINKED LIST] ล้างข้อมูลโหนดอ้างอิงทั้งหมดในรายการเชื่อมโยงแล้ว');
  };

  // 4. Stack & Queue Operations
  const handleStackPush = () => {
    if (!inputText) return;
    setStackData(prev => [inputText.substring(0, 8), ...prev]);
    setStatusMsg(`[STACK PUSH] นำข้อมูลเข้าสู่กองซ้อน (LIFO) -> ผลัก "${inputText}" ไว้บนสุด (Top)`);
    setPulseNode('stack-top');
    setTimeout(() => setPulseNode(null), 800);
  };

  const handleStackPop = () => {
    if (stackData.length === 0) {
      setStatusMsg('[STACK EMPTY] กองซ้อนว่างเปล่า ไม่สามารถนำข้อมูลออกได้');
      return;
    }
    const popped = stackData[0];
    setStackData(prev => prev.slice(1));
    setStatusMsg(`[STACK POP] ดึงข้อมูลออกจากกองซ้อน (LIFO) -> คืนค่า "${popped}" จากส่วนบนสุด (Top)`);
  };

  const handleQueueEnqueue = () => {
    if (!inputText) return;
    setQueueData(prev => [...prev, inputText.substring(0, 8)]);
    setStatusMsg(`[QUEUE ENQUEUE] นำข้อมูลเข้าสู่แถวคิว (FIFO) -> จัดวาง "${inputText}" ต่อท้ายคิว (Rear)`);
    setPulseNode('queue-rear');
    setTimeout(() => setPulseNode(null), 800);
  };

  const handleQueueDequeue = () => {
    if (queueData.length === 0) {
      setStatusMsg('[QUEUE EMPTY] คิวว่างเปล่า ไม่มีข้อมูลให้ประมวลผล');
      return;
    }
    const dequeued = queueData[0];
    setQueueData(prev => prev.slice(1));
    setStatusMsg(`[QUEUE DEQUEUE] บริการโหนดแรกสุด (FIFO) -> คืนค่าประมวลผล "${dequeued}" จากหัวคิว (Front)`);
  };

  // 5. Tree (BST) Node Search Simulator
  const handleTreeSearch = () => {
    const val = parseInt(inputText) || 50;
    setStatusMsg(`[BST SEARCH] เริ่มต้นค้นหาค่า ${val} จากโหนดราก (Root Node: 50)...`);
    
    // Simulate navigation pulse steps
    const path = [];
    if (val === 50) path.push(50);
    else if (val < 50) {
      path.push(50);
      path.push(30);
      if (val === 30) {}
      else if (val < 30) path.push(20);
      else path.push(40);
    } else {
      path.push(50);
      path.push(70);
      if (val === 70) {}
      else if (val < 70) path.push(60);
      else path.push(80);
    }

    let i = 0;
    const runStep = () => {
      if (i < path.length) {
        const stepVal = path[i];
        setPulseNode(`tree-${stepVal}`);
        setStatusMsg(`[BST SEARCH] กำลังตรวจสอบที่โหนด [${stepVal}] ... (ค่า ${val} ${val === stepVal ? 'ตรงกัน!' : val < stepVal ? '< น้อยกว่า เลี้ยวซ้าย' : '> มากกว่า เลี้ยวขวา'})`);
        i++;
        timerRef.current = setTimeout(runStep, 800 * (1.1 - speed / 100));
      } else {
        setPulseNode(null);
        const found = treeNodes.some(n => n.val === val);
        if (found) {
          setStatusMsg(`[BST FOUND] 🟢 ค้นพบโหนด ${val} ในต้นไม้ค้นหาทวิภาคสำเร็จ! ความซับซ้อน: O(log N)`);
        } else {
          setStatusMsg(`[BST NOT FOUND] 🔴 ไม่พบโหนด ${val} ในต้นไม้ต้นนี้`);
        }
      }
    };
    runStep();
  };

  // 6. Graph Particle Pulse
  const handleGraphPulse = () => {
    setGraphPulse(true);
    setStatusMsg('[GRAPH SIGNAL] ส่งสัญญาณข้อมูลไหลผ่านโครงข่ายแบบไม่เชิงเส้น (แสดงความสัมพันธ์เชิงโครงข่ายปิดแบบมีวงจร)');
    setTimeout(() => {
      setGraphPulse(false);
    }, 2500);
  };

  // Helper to draw clean absolute center lines between nodes
  const getLineCoords = (nodeA, nodeB) => {
    if (!nodeA || !nodeB) return { x1: 0, y1: 0, x2: 0, y2: 0 };
    // Geometric Center-to-Center connection
    return {
      x1: nodeA.cx,
      y1: nodeA.cy,
      x2: nodeB.cx,
      y2: nodeB.cy
    };
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={DSA1_3_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Primitive Data Types ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ชนิดข้อมูลพื้นฐานระดับระบบ / Primitive Types
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ข้อมูลแบบพื้นฐาน (Primitive Data Types)
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              ข้อมูลแบบพื้นฐานเป็นชนิดข้อมูลระดับล่างสุดที่คอมไพเลอร์หรือสถาปัตยกรรมคอมพิวเตอร์รู้จักและควบคุมหน่วยความจำได้โดยตรง (Built-in) 
              ไม่สามารถย่อยสลายเป็นประเภทที่เล็กกว่านี้ได้ การจองหน่วยความจำจะมีขนาดและขอบเขตพื้นที่คงที่แน่นอน 
              โดยระบบจะจองช่องแรมเพื่อเก็บ <span className="bg-indigo-50/50 border border-indigo-200/50 text-indigo-700 px-1.5 py-0.5 rounded text-sm font-mono">ค่าข้อมูลเดี่ยว (Single Value)</span> ลงในช่องเหล่านั้นทันที
            </p>

            {/* Grid of Concept Cards for Primitives */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { symbol: 'int', title: 'จำนวนเต็ม (Integer)', desc: 'ใช้จัดเก็บตัวเลขที่ไม่มีจุดทศนิยม ทั้งบวกและลบ', code: 'x = 42', result: '4 Bytes (32-bit)', accent: 'indigo' },
                { symbol: 'float', title: 'จำนวนจริง (Float / Double)', desc: 'ใช้เก็บตัวเลขทศนิยมความละเอียดสูงหรือสัญกรณ์วิทยาศาสตร์', code: 'pi = 3.1415', result: '8 Bytes (64-bit)', accent: 'cyan' },
                { symbol: 'char', title: 'ตัวอักษร (Character)', desc: 'ใช้เก็บอักขระเดี่ยวตัวเดียวภายใต้รหัสมาตรฐาน ASCII หรือ Unicode', code: "letter = 'A'", result: '2 Bytes (16-bit)', accent: 'violet' },
                { symbol: 'bool', title: 'ค่าตรรกะ (Boolean)', desc: 'เก็บสถานะความจริงทางตรรกศาสตร์ที่มีเพียงสองค่าเท่านั้น', code: 'is_active = True', result: '1 Byte (8-bit)', accent: 'orange' }
              ].map((item, idx) => (
                <ConceptCard
                  key={idx}
                  symbol={item.symbol}
                  title={item.title}
                  description={item.desc}
                  code={item.code}
                  result={item.result}
                  accent={item.accent}
                  resultColor="indigo"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 2: Linear & Non-Linear Structures ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              การจัดเรียงความสัมพันธ์ในหน่วยความจำ / Data Structure Categories
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงสร้างข้อมูลเชิงเส้นและไม่เชิงเส้น
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Block: Linear */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-indigo-500/80 space-y-4">
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase">
                Linear Data Structures
              </span>
              <h4 className="text-[19px] font-bold text-slate-800">โครงสร้างข้อมูลแบบเชิงเส้น</h4>
              <p className="text-[14.5px] text-slate-600 leading-relaxed font-sans">
                สมาชิกทั้งหมดจะถูกจัดเรียงเป็นลำดับต่อเนื่องกันในแนวดิ่งหรือแนวราบ (Sequence) 
                สมาชิกทุกตัวจะมีข้อมูลตัวก่อนหน้า (Predecessor) และข้อมูลตัวถัดไป (Successor) เพียงหนึ่งตัวเท่านั้น 
                เหมาะสำหรับการบันทึกงานที่ต้องการประมวลผลตามลำดับอย่างมีระเบียบ
              </p>
              
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-indigo-700 font-mono">Array</span>
                  <p className="text-[12px] text-slate-500 font-sans mt-0.5">เรียงชิดติดกันในแรม จองขนาดคงที่ เข้าถึงรวดเร็วด้วยดัชนี</p>
                </div>
                <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-indigo-700 font-mono">Linked List</span>
                  <p className="text-[12px] text-slate-500 font-sans mt-0.5">กระจายตัวทับตำแหน่งแรมโยงพอยน์เตอร์ มีความยืดหยุ่นสูง</p>
                </div>
                <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-indigo-700 font-mono">Stack (LIFO)</span>
                  <p className="text-[12px] text-slate-500 font-sans mt-0.5">เข้าทีหลังออกก่อน เช่น กลไกปุ่มย้อนกลับ (Undo)</p>
                </div>
                <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-indigo-700 font-mono">Queue (FIFO)</span>
                  <p className="text-[12px] text-slate-500 font-sans mt-0.5">เข้าก่อนออกก่อน เช่น คิวงานประมวลผลคำสั่งพิมพ์</p>
                </div>
              </div>
            </div>

            {/* Right Block: Non-Linear */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-cyan-500/80 space-y-4">
              <span className="text-xs font-mono font-bold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full uppercase">
                Non-Linear Data Structures
              </span>
              <h4 className="text-[19px] font-bold text-slate-800">โครงสร้างข้อมูลแบบไม่เชิงเส้น</h4>
              <p className="text-[14.5px] text-slate-600 leading-relaxed font-sans">
                ความสัมพันธ์ของสมาชิกเป็นแบบลำดับชั้นหรือโครงข่ายใยแมงมุม (Multi-level relationships) 
                โดยสมาชิก 1 ตัวสามารถชี้โยงไปเชื่อมต่อกับสมาชิกอื่นรอบตัวได้มากกว่าหนึ่งจุด 
                เหมาะสำหรับการประมวลผลรูปแบบแผนผังจำลองและข้อมูลที่มีทิศทางซับซ้อน
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-cyan-700 font-mono">Tree (ต้นไม้)</span>
                  <p className="text-[12px] text-slate-500 font-sans mt-0.5">ความสัมพันธ์ลำดับชั้น มีโหนดรากและโหนดกิ่ง แตกไม่มีวงจรปิด</p>
                </div>
                <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-cyan-700 font-mono">Graph (กราฟ)</span>
                  <p className="text-[12px] text-slate-500 font-sans mt-0.5">โครงข่ายที่มีความยืดหยุ่นสูงสุด สามารถมีวงรอบปิด (Cycles)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3: Interactive Simulator (DSC-Visualizer) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              เครื่องมือจำลองสถานการณ์จริง / Virtual RAM Sandbox
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              เครื่องวิเคราะห์และจำลองการจัดหน่วยความจำ (DSC-Visualizer)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทดลองเลือกประเภทของโครงสร้างข้อมูล และสั่งป้อนข้อมูลด้านล่าง 
            เพื่อสังเกตพฤติกรรมการจองพื้นที่ในหน่วยความจำ RAM จำลอง 
            และเข้าใจความต่างของโครงสร้างจัดวางข้อมูลระดับปฏิบัติการคอมพิวเตอร์อย่างลึกซึ้ง:
          </p>

          <SimulatorShell
            dark
            title="Data Structure Classifier & RAM Visualizer (DSC)"
            icon={<Cpu className="w-8 h-8 text-indigo-400" />}
            glowColors="from-slate-800/35 to-slate-950/10"
            iconColor="text-indigo-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Left Sandbox Control Panel */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[500px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  CONTROL ENGINE
                </span>

                <div className="space-y-5">
                  {/* Structure Selector */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      1. เลือกโครงสร้างข้อมูล (Select Structure)
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'primitive', label: 'ข้อมูลพื้นฐาน (Primitive)' },
                        { id: 'array', label: 'อาร์เรย์ (Array - เชิงเส้น)' },
                        { id: 'linkedlist', label: 'รายการโยง (Linked List)' },
                        { id: 'stackqueue', label: 'กองซ้อน/คิว (Stack/Queue)' },
                        { id: 'tree', label: 'ต้นไม้ทวิภาค (BST)' },
                        { id: 'graph', label: 'กราฟเครือข่าย (Graph)' }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setStatusMsg(`สลับมาที่ห้องจำลองจัดเก็บโครงสร้าง: ${tab.label}`);
                          }}
                          className={`p-2.5 rounded-xl border text-xs text-left transition-all font-semibold cursor-pointer ${
                            activeTab === tab.id
                              ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow shadow-indigo-500/20'
                              : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Inputs Based on Active Tab */}
                  <div className="bg-slate-950/65 rounded-xl p-4 border border-slate-800 space-y-4">
                    <span className="text-[10px] font-mono text-indigo-400 font-bold block uppercase tracking-wider">
                      PARAMETER SANDBOX
                    </span>

                    {activeTab === 'primitive' && (
                      <div className="space-y-3 animate-fadeIn">
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-slate-400 block font-sans">ประเภทข้อมูล (Primitive Type):</label>
                          <div className="flex gap-2">
                            {['Integer', 'Float', 'Character', 'Boolean'].map(type => (
                              <button
                                key={type}
                                onClick={() => {
                                  setPrimitiveType(type);
                                  if (type === 'Integer') setPrimitiveVal('42');
                                  if (type === 'Float') setPrimitiveVal('3.1415');
                                  if (type === 'Character') setPrimitiveVal('A');
                                  if (type === 'Boolean') setPrimitiveVal('True');
                                }}
                                className={`px-2 py-1 rounded text-[10px] font-bold transition-all shrink-0 cursor-pointer ${
                                  primitiveType === type
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] text-slate-400 block">ป้อนค่าข้อมูล (Value Input):</label>
                          <input
                            type="text"
                            value={primitiveVal}
                            onChange={e => setPrimitiveVal(e.target.value)}
                            className="bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 text-xs rounded-lg px-3 py-1.5 text-white w-full font-mono font-bold"
                          />
                        </div>

                        <button
                          onClick={handlePrimitiveAlloc}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg cursor-pointer transition-all shadow shadow-indigo-650/40"
                        >
                          จองแรมหน่วยความจำเดี่ยว (O(1))
                        </button>
                      </div>
                    )}

                    {activeTab === 'array' && (
                      <div className="space-y-3 animate-fadeIn">
                        <span className="text-[11px] text-slate-400 block leading-relaxed">
                          ระบุหรือเปลี่ยนค่าสมาชิกในอาร์เรย์ในแรมคงที่ (Contiguous Memory):
                        </span>
                        
                        <div className="grid grid-cols-3 gap-2">
                          {arrayData.map((val, idx) => (
                            <div key={idx} className="space-y-1">
                              <span className="text-[9px] font-mono text-slate-500 block">ดัชนี [{idx}]</span>
                              <input
                                type="text"
                                value={val}
                                placeholder="ว่าง"
                                onChange={e => handleArraySet(idx, e.target.value)}
                                className="bg-slate-900 border border-slate-800 focus:border-indigo-500 text-center text-xs font-mono font-bold text-indigo-300 rounded p-1 w-full"
                              />
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-500 block italic leading-snug">
                          สูตรลอจิกการเข้าถึง: Address = Base + Index * Size
                        </span>
                      </div>
                    )}

                    {activeTab === 'linkedlist' && (
                      <div className="space-y-3 animate-fadeIn">
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-slate-400 block">ข้อมูลโหนดใหม่ (Node Value):</label>
                          <input
                            type="text"
                            value={inputText}
                            maxLength={5}
                            onChange={e => setInputText(e.target.value)}
                            className="bg-slate-900 border border-slate-800 text-xs rounded px-3 py-1.5 text-white w-full font-mono font-bold"
                          />
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={handleLinkedListInsert}
                            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded cursor-pointer transition-all"
                          >
                            เพิ่มโหนดกระจายในแรม
                          </button>
                          <button
                            onClick={handleLinkedListClear}
                            className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-bold rounded cursor-pointer transition-all"
                          >
                            ล้างโครงสร้าง
                          </button>
                        </div>
                      </div>
                    )}

                    {activeTab === 'stackqueue' && (
                      <div className="space-y-3 animate-fadeIn">
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-slate-400 block">ข้อความนำเข้า (Data Packet):</label>
                          <input
                            type="text"
                            value={inputText}
                            maxLength={8}
                            onChange={e => setInputText(e.target.value)}
                            className="bg-slate-900 border border-slate-800 text-xs rounded px-3 py-1.5 text-white w-full font-mono font-bold"
                          />
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-slate-450 block uppercase">1) กองซ้อน (Stack - LIFO):</span>
                          <div className="flex gap-2">
                            <button
                              onClick={handleStackPush}
                              className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded cursor-pointer transition-all"
                            >
                              Push (นำเข้าบนสุด)
                            </button>
                            <button
                              onClick={handleStackPop}
                              className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-bold rounded cursor-pointer transition-all"
                            >
                              Pop (เอาออกบนสุด)
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2 pt-1">
                          <span className="text-[10px] font-bold text-slate-450 block uppercase">2) คิว (Queue - FIFO):</span>
                          <div className="flex gap-2">
                            <button
                              onClick={handleQueueEnqueue}
                              className="flex-1 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded cursor-pointer transition-all"
                            >
                              Enqueue (ต่อท้ายคิว)
                            </button>
                            <button
                              onClick={handleQueueDequeue}
                              className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-bold rounded cursor-pointer transition-all"
                            >
                              Dequeue (ออกหัวคิว)
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'tree' && (
                      <div className="space-y-3 animate-fadeIn">
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-slate-400 block">ค้นหาตัวเลขในแผนผัง (Number Search):</label>
                          <input
                            type="number"
                            value={inputText}
                            onChange={e => setInputText(e.target.value)}
                            className="bg-slate-900 border border-slate-800 text-xs rounded px-3 py-1.5 text-white w-full font-mono font-bold"
                          />
                        </div>

                        <button
                          onClick={handleTreeSearch}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded cursor-pointer transition-all flex items-center justify-center gap-1.5"
                        >
                          <Play className="w-3.5 h-3.5" /> จำลองท่องระบบค้นหา (BST Tree)
                        </button>
                        <span className="text-[9.5px] text-slate-500 block leading-tight">
                          * โน้ต: ลองป้อนตัวเลขที่มีในแผนผังด้านขวา (เช่น 20, 30, 40, 60...) เพื่อทดสอบตรรกะเลี้ยวซ้ายเลี้ยวขวา
                        </span>
                      </div>
                    )}

                    {activeTab === 'graph' && (
                      <div className="space-y-3 animate-fadeIn">
                        <span className="text-[11px] text-slate-400 block leading-relaxed">
                          กราฟมีโครงข่ายเชื่อมโยงแบบไม่จำกัดทิศทาง มีวงจรปิด (Cycles) สามารถส่งข้อมูลวนกลับมาจุดเดิมได้:
                        </span>

                        <button
                          onClick={handleGraphPulse}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded cursor-pointer transition-all flex items-center justify-center gap-1.5"
                        >
                          <Activity className="w-4 h-4 animate-pulse" /> กระตุ้นพัลส์ส่งผ่านสัญญาณในเน็ตเวิร์ก
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Speed Slider */}
                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase">
                      <span>แอนิเมชันสปีด (Speed Controller):</span>
                      <span>{speed}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={speed}
                      onChange={e => setSpeed(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>
                </div>

                {/* Status bar */}
                <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400 leading-relaxed bg-black/30 p-2.5 rounded-lg border border-slate-850">
                  <span className="text-zinc-500 block text-[9px] uppercase tracking-wider mb-0.5">Terminal Log Output:</span>
                  {statusMsg}
                </div>
              </div>

              {/* Right Virtual RAM / Oscilloscope View Board */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[500px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">
                  RAM VISUALIZER MONITOR & VECTOR DIAGRAM
                </span>

                <div className="grow flex flex-col justify-center items-center mt-6">
                  {/* View 1: Primitive Data Type */}
                  {activeTab === 'primitive' && allocatedPrimitive.allocated && (
                    <div className="w-full max-w-md space-y-6 animate-fadeIn py-6">
                      <div className="grid grid-cols-4 gap-1.5">
                        {Array.from({ length: 4 }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`border rounded-xl p-3 flex flex-col items-center justify-between min-h-[90px] transition-all duration-350 ${
                              pulseNode === 'primitive'
                                ? 'bg-indigo-900/30 border-indigo-500 scale-105 shadow-md shadow-indigo-500/20'
                                : 'bg-slate-900 border-slate-800'
                            }`}
                          >
                            <span className="text-[9px] font-mono text-slate-500">Address</span>
                            <span className="text-[10px] font-mono text-indigo-400 font-bold">
                              0x7f..{idx * 2}
                            </span>
                            <span className="text-[14px] font-mono font-bold text-white mt-1">
                              {idx === 0 ? allocatedPrimitive.val : '00'}
                            </span>
                            <span className="text-[8px] font-mono text-slate-500">
                              Byte {idx + 1}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl space-y-2">
                        <span className="text-[9px] font-mono text-slate-500 uppercase block">Memory Allocation Analysis:</span>
                        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                          <div>
                            <span className="text-slate-400">Data Type: </span>
                            <span className="text-white font-bold">{allocatedPrimitive.type}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Memory Occupied: </span>
                            <span className="text-indigo-400 font-bold">{allocatedPrimitive.size} Bytes</span>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-slate-850">
                          <span className="text-[9px] font-mono text-slate-500 block uppercase">Binary Structure inside RAM:</span>
                          <span className="text-[11.5px] font-mono text-emerald-400 font-bold tracking-wider block mt-0.5">
                            {allocatedPrimitive.binary}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* View 2: Contiguous Array View */}
                  {activeTab === 'array' && (
                    <div className="w-full max-w-lg space-y-6 animate-fadeIn py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Contiguous Address Blocks in RAM:</span>
                        <div className="flex flex-row items-center border border-slate-800 bg-slate-900/60 p-2.5 rounded-2xl overflow-x-auto gap-2">
                          {arrayData.map((val, idx) => (
                            <div
                              key={idx}
                              className={`flex-1 min-w-[70px] border rounded-xl p-2.5 flex flex-col items-center justify-between min-h-[110px] transition-all duration-300 ${
                                activeIndex === idx
                                  ? 'bg-indigo-900/40 border-indigo-400 scale-[1.03] shadow shadow-indigo-400/30'
                                  : 'bg-slate-900 border-slate-850'
                              }`}
                            >
                              <span className="text-[8px] font-mono text-slate-500">Index {idx}</span>
                              <span className="text-[10px] font-mono text-indigo-400 font-semibold">
                                0x10{idx * 4}
                              </span>
                              <div className="h-[36px] flex items-center justify-center">
                                <span className="text-[16px] font-bold text-white font-mono">
                                  {val || '—'}
                                </span>
                              </div>
                              <span className="text-[7.5px] font-mono text-slate-500">4 Bytes</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl space-y-1 text-xs">
                        <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1">Array Theoretical Specs:</span>
                        <div className="grid grid-cols-2 gap-3 font-mono leading-relaxed">
                          <div>
                            <span className="text-slate-400">Allocation Type:</span>
                            <span className="text-white block font-bold">Contiguous (ต่อเนื่อง)</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Random Access:</span>
                            <span className="text-indigo-400 block font-bold">O(1) via Math Index</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Insert / Delete:</span>
                            <span className="text-rose-400 block font-bold">O(N) (Requires Shift)</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Structure Size:</span>
                            <span className="text-white block font-bold">Static Size (คงที่)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* View 3: Scattered Linked List View */}
                  {activeTab === 'linkedlist' && (
                    <div className="w-full h-[320px] bg-slate-950/30 border border-slate-900 rounded-2xl overflow-hidden relative shadow-inner animate-fadeIn">
                      {/* SVG pointer links (Geometric Center Arrow Lines) */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <defs>
                          <marker
                            id="arrow"
                            viewBox="0 0 10 10"
                            refX="38" // Offset to stop at edge of destination node
                            refY="5"
                            markerWidth="6"
                            markerHeight="6"
                            orient="auto-start-reverse"
                          >
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
                          </marker>
                        </defs>

                        {linkedNodes.map((node, idx) => {
                          if (idx === linkedNodes.length - 1) return null;
                          const nextNode = linkedNodes[idx + 1];
                          const coords = getLineCoords(node, nextNode);
                          return (
                            <g key={node.id}>
                              <path
                                d={`M ${coords.x1} ${coords.y1} C ${(coords.x1 + coords.x2)/2} ${coords.y1 - 20}, ${(coords.x1 + coords.x2)/2} ${coords.y2 + 20}, ${coords.x2} ${coords.y2}`}
                                fill="none"
                                stroke="#6366f1"
                                strokeWidth="2.5"
                                strokeDasharray={pulseNode === node.id ? '5 5' : 'none'}
                                className={pulseNode === node.id ? 'animate-pulse' : ''}
                                markerEnd="url(#arrow)"
                              />
                            </g>
                          );
                        })}
                      </svg>

                      {/* Display Nodes */}
                      {linkedNodes.length === 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-sans text-xs italic">
                          ไม่มีโหนดในรายการเชื่อมโยง กรุณาพิมพ์ค่าและกดปุ่มเพิ่มโหนด
                        </div>
                      ) : (
                        linkedNodes.map(node => (
                          <div
                            key={node.id}
                            style={{ left: `${node.cx - 36}px`, top: `${node.cy - 24}px` }}
                            className={`absolute w-[72px] h-[48px] bg-slate-900 border rounded-xl flex overflow-hidden transition-all duration-500 z-10 ${
                              pulseNode === node.id
                                ? 'border-indigo-400 scale-110 shadow-lg shadow-indigo-500/20'
                                : 'border-slate-800'
                            }`}
                          >
                            {/* Data Section */}
                            <div className="w-1/2 bg-slate-950 flex flex-col justify-between p-1 items-center border-r border-slate-800">
                              <span className="text-[6.5px] font-mono text-slate-500">Data</span>
                              <span className="text-xs font-bold text-white font-mono leading-none">{node.val}</span>
                              <span className="text-[6.5px] font-mono text-indigo-400">{node.addr}</span>
                            </div>
                            {/* Pointer Section */}
                            <div className="w-1/2 bg-slate-900/80 flex flex-col justify-between p-1 items-center">
                              <span className="text-[6.5px] font-mono text-slate-500">Next</span>
                              <span className="text-[7.5px] font-mono text-indigo-300 font-bold leading-none">{node.nextAddr}</span>
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* View 4: Stack & Queue Vis */}
                  {activeTab === 'stackqueue' && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn py-4">
                      {/* Stack tube */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase block text-center">STACK TUBE (LIFO):</span>
                        <div className="border-2 border-dashed border-slate-800 border-t-0 bg-slate-900/40 rounded-b-2xl p-4 min-h-[220px] flex flex-col justify-end gap-2 relative overflow-hidden">
                          <span className="text-[9px] font-mono text-slate-600 absolute top-2 right-2">TOP POINTER</span>
                          {stackData.length === 0 ? (
                            <div className="text-center text-slate-600 text-xs italic my-auto">Stack is Empty</div>
                          ) : (
                            stackData.map((item, idx) => (
                              <div
                                key={idx}
                                className={`p-2.5 rounded-xl border border-slate-800 font-mono text-xs font-bold text-white flex justify-between items-center transition-all ${
                                  idx === 0 && pulseNode === 'stack-top'
                                    ? 'bg-indigo-900/40 border-indigo-400 scale-105'
                                    : idx === 0
                                    ? 'bg-slate-950/90 border-slate-750'
                                    : 'bg-slate-900/50 opacity-70'
                                }`}
                              >
                                <span>{item}</span>
                                {idx === 0 && (
                                  <span className="text-[8px] bg-indigo-500 text-white font-sans px-1 py-0.5 rounded leading-none">
                                    TOP
                                  </span>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Queue belt */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase block text-center">QUEUE BELT (FIFO):</span>
                        <div className="border-2 border-dashed border-slate-800 border-l-0 border-r-0 bg-slate-900/40 p-4 min-h-[220px] flex flex-col justify-center gap-2 relative overflow-hidden">
                          <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
                            {queueData.length === 0 ? (
                              <div className="text-center text-slate-600 text-xs italic my-auto">Queue is Empty</div>
                            ) : (
                              queueData.map((item, idx) => (
                                <div
                                  key={idx}
                                  className={`p-2 rounded-xl border border-slate-800 font-mono text-[11px] font-bold text-white flex flex-col items-center justify-between w-[72px] h-[64px] transition-all ${
                                    idx === queueData.length - 1 && pulseNode === 'queue-rear'
                                      ? 'bg-cyan-900/40 border-cyan-400 scale-105'
                                      : idx === 0
                                      ? 'bg-slate-950/90 border-slate-750 border-l-2 border-l-cyan-400'
                                      : 'bg-slate-900/50 opacity-80'
                                  }`}
                                >
                                  <span className="text-[7.5px] text-slate-500">
                                    {idx === 0 ? 'FRONT' : idx === queueData.length - 1 ? 'REAR' : `Node-${idx}`}
                                  </span>
                                  <span className="leading-none">{item}</span>
                                  <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* View 5: Binary Search Tree (BST) */}
                  {activeTab === 'tree' && (
                    <div className="w-full h-[320px] bg-slate-950/30 border border-slate-900 rounded-2xl overflow-hidden relative shadow-inner animate-fadeIn">
                      {/* SVG Connecting Branches (Absolute Center connection) */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {treeNodes.map((node, idx) => {
                          if (node.left) {
                            const leftNode = treeNodes.find(n => n.val === node.left);
                            if (leftNode) {
                              const coords = getLineCoords(node, leftNode);
                              return (
                                <line
                                  key={`l-${idx}`}
                                  x1={coords.x1}
                                  y1={coords.y1}
                                  x2={coords.x2}
                                  y2={coords.y2}
                                  stroke="#475569"
                                  strokeWidth="2"
                                />
                              );
                            }
                          }
                          if (node.right) {
                            const rightNode = treeNodes.find(n => n.val === node.right);
                            if (rightNode) {
                              const coords = getLineCoords(node, rightNode);
                              return (
                                <line
                                  key={`r-${idx}`}
                                  x1={coords.x1}
                                  y1={coords.y1}
                                  x2={coords.x2}
                                  y2={coords.y2}
                                  stroke="#475569"
                                  strokeWidth="2"
                                />
                              );
                            }
                          }
                          return null;
                        })}
                      </svg>

                      {/* BST Nodes */}
                      {treeNodes.map((node, idx) => (
                        <div
                          key={idx}
                          style={{ left: `${node.x - 20}px`, top: `${node.y - 20}px` }}
                          className={`absolute w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 z-10 font-mono text-xs font-bold text-white cursor-default ${
                            pulseNode === `tree-${node.val}`
                              ? 'bg-indigo-600 border-indigo-400 scale-125 shadow-lg shadow-indigo-500/40'
                              : 'bg-slate-900 border-slate-800'
                          }`}
                        >
                          {node.val}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* View 6: Graph Diagram */}
                  {activeTab === 'graph' && (
                    <div className="w-full h-[320px] bg-slate-950/30 border border-slate-900 rounded-2xl overflow-hidden relative shadow-inner animate-fadeIn">
                      {/* SVG Edges (Absolute Center mapping) */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {graphEdges.map((edge, idx) => {
                          const nodeA = graphNodes.find(n => n.id === edge.from);
                          const nodeB = graphNodes.find(n => n.id === edge.to);
                          const coords = getLineCoords(nodeA, nodeB);
                          return (
                            <line
                              key={idx}
                              x1={coords.x1}
                              y1={coords.y1}
                              x2={coords.x2}
                              y2={coords.y2}
                              stroke={graphPulse ? '#818cf8' : '#334155'}
                              strokeWidth={graphPulse ? '2.5' : '1.5'}
                              strokeDasharray={graphPulse ? '4 4' : 'none'}
                              className={graphPulse ? 'animate-[dash_2s_linear_infinite]' : ''}
                            />
                          );
                        })}
                      </svg>

                      {/* Display Vertices */}
                      {graphNodes.map((node, idx) => (
                        <div
                          key={idx}
                          style={{ left: `${node.cx - 36}px`, top: `${node.cy - 20}px` }}
                          className={`absolute w-[72px] h-[40px] rounded-xl border flex flex-col justify-center items-center font-sans text-[10px] font-bold text-white transition-all duration-500 z-10 cursor-default ${
                            graphPulse
                              ? 'bg-indigo-950/80 border-indigo-500 scale-105 shadow shadow-indigo-500/25'
                              : 'bg-slate-900 border-slate-800'
                          }`}
                        >
                          <span className="text-[8px] font-mono text-indigo-400">{node.id}</span>
                          <span className="leading-none">{node.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Theoretical Output Metrics panel */}
                <div className="mt-4 bg-slate-900/60 border border-slate-850 p-4 rounded-xl">
                  <div className="text-[10px] font-mono text-slate-500 uppercase block mb-2">Structure Performance Metrics:</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
                    <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-850">
                      <span className="text-slate-500 text-[9px] block">จัดสรรพื้นที่แรม (Memory Layout)</span>
                      <span className="text-white font-bold block mt-0.5">
                        {activeTab === 'primitive' || activeTab === 'array' ? 'Contiguous (ต่อเนื่อง)' : 'Scattered (กระจายตัว)'}
                      </span>
                    </div>

                    <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-850">
                      <span className="text-slate-500 text-[9px] block">สัญกรณ์ความเร็วค้นหา (Search Big O)</span>
                      <span className="text-indigo-300 font-bold block mt-0.5">
                        {activeTab === 'primitive' ? 'O(1) Direct' : activeTab === 'array' ? 'O(N) Linear' : activeTab === 'tree' ? 'O(log N) Avg' : 'O(N) Traversal'}
                      </span>
                    </div>

                    <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-850 col-span-2 md:col-span-1">
                      <span className="text-slate-500 text-[9px] block">ลักษณะความสัมพันธ์ (Relationship)</span>
                      <span className="text-cyan-300 font-bold block mt-0.5">
                        {activeTab === 'primitive' ? 'เดี่ยว (Single Value)' : activeTab === 'tree' ? 'ลำดับชั้น (Hierarchical)' : activeTab === 'graph' ? 'โครงข่ายโยง (Network)' : 'เชิงเส้น (Sequence)'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SimulatorShell>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="วิเคราะห์เปรียบเทียบการจัดสรรหน่วยความจำและประเภทโครงสร้างข้อมูล"
          taskText={`คำชี้แจง: ให้นักเรียนสั่งวิเคราะห์ทดลองและป้อนข้อมูลเข้าสู่ระบบจำลอง DSC-Visualizer ทั้ง 6 โหมดการจัดสรรหน่วยความจำจำลองด้านบน จากนั้นตอบคำถามทางวิชาการวิศวกรรมคอมพิวเตอร์ต่อไปนี้ลงในระบบส่งการบ้าน:

1. เหตุใดข้อมูลแบบอาร์เรย์ (Array) จึงสามารถคำนวณและเข้าถึงสมาชิกตามดัชนี (Random Access) ได้ด้วยความซับซ้อนระดับคงที่ O(1)
   - อธิบายอิงจากกลไก "การจัดสรรหน่วยความจำแบบต่อเนื่อง" (Contiguous Memory Allocation) และสูตรคณิตศาสตร์คำนวณตำแหน่งแอดเดรส
2. จงเปรียบเทียบข้อดีและข้อจำกัดในหน่วยความจำ RAM ของอาร์เรย์ (Array) เทียบกับรายการเชื่อมโยง (Linked List) ในมิติเรื่องความยืดหยุ่นและการจองหน่วยความจำกระจายตัว
3. สแต็ก (Stack) และคิว (Queue) จัดอยู่ในประเภทโครงสร้างข้อมูลแบบใด และมีหลักการปฏิบัติตามลำดับการรับเข้าและส่งออกต่างกันอย่างไร
   - ยกตัวอย่างระบบจำลองการทำงานจริงในชีวิตประจำวันของคอมพิวเตอร์ที่นำแต่ละตัวไปปรับใช้`}
        />
      </main>
    </div>
  );
}
