import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Database,
  Binary,
  Layers,
  ArrowRight,
  Activity,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Check,
  HelpCircle,
  Clock,
  Info,
  ChevronRight,
  UserCheck,
  BarChart3,
  BookOpen,
  Search,
  CheckCircle,
  Sliders,
  Terminal,
  FileCode
} from 'lucide-react';
import TeacherTask from '../../ui/TeacherTask';

// ─── Ambient Backdrop Blobs for DSA theme (Violet/Indigo/Sky) ───
const DSA1_1_BLOBS = [
  { color: 'bg-violet-200', size: 'w-[500px] h-[500px]', position: '-top-40 -left-40', opacity: 'opacity-40' },
  { color: 'bg-indigo-200', size: 'w-[450px] h-[450px]', position: 'top-1/4 -right-20', opacity: 'opacity-35' },
  { color: 'bg-sky-200', size: 'w-[400px] h-[400px]', position: '-bottom-20 left-1/3', opacity: 'opacity-30' },
  { color: 'bg-purple-200', size: 'w-[350px] h-[350px]', position: 'bottom-1/3 left-10', opacity: 'opacity-25' }
];

export default function DSA1_1() {
  // ==========================================
  // Part 1: Niklaus Wirth's Classic Equation Interaction
  // ==========================================
  const [equationHover, setEquationHover] = useState(null); // 'algo', 'ds', 'program'
  const [wirthPulse, setWirthPulse] = useState(false);

  const triggerWirthPulse = () => {
    setWirthPulse(true);
    setTimeout(() => setWirthPulse(false), 800);
  };

  // ==========================================
  // Part 2: Book Search Simulator (Pile vs Shelf)
  // ==========================================
  const initialBooks = [
    { id: 1, title: 'วิทยาการคอมพิวเตอร์', genre: 'CS', shelf: 'ค' },
    { id: 2, title: 'แคลคูลัสประยุกต์', genre: 'Math', shelf: 'ค' },
    { id: 3, title: 'ฟิสิกส์วิศวกรรม', genre: 'Physics', shelf: 'ฟ' },
    { id: 4, title: 'จริยธรรมวิชาชีพ', genre: 'Ethics', shelf: 'จ' },
    { id: 5, title: 'โครงสร้างข้อมูล', genre: 'CS', shelf: 'ค' },
    { id: 6, title: 'การเขียนโปรแกรม', genre: 'CS', shelf: 'ค' },
    { id: 7, title: 'สถิติวิเคราะห์', genre: 'Math', shelf: 'ส' },
    { id: 8, title: 'การสื่อสารข้อมูล', genre: 'Network', shelf: 'ก' }
  ];

  const [bookTarget] = useState('โครงสร้างข้อมูล');
  const [searchMode, setSearchMode] = useState('pile'); // 'pile' or 'shelf'
  const [searching, setSearching] = useState(false);
  const [checkedBookIndex, setCheckedBookIndex] = useState(-1);
  const [searchSteps, setSearchSteps] = useState(0);
  const [searchStatus, setSearchStatus] = useState('idle'); // 'idle', 'searching', 'found'

  const startBookSearch = () => {
    if (searching) return;
    setSearching(true);
    setCheckedBookIndex(-1);
    setSearchSteps(0);
    setSearchStatus('searching');

    if (searchMode === 'pile') {
      // Linear Search O(N) step-by-step
      let current = 0;
      const interval = setInterval(() => {
        setCheckedBookIndex(current);
        setSearchSteps(prev => prev + 1);

        if (initialBooks[current].title === bookTarget) {
          setSearchStatus('found');
          setSearching(false);
          clearInterval(interval);
        } else if (current === initialBooks.length - 1) {
          setSearchStatus('not_found');
          setSearching(false);
          clearInterval(interval);
        } else {
          current++;
        }
      }, 400);
    } else {
      // Organized direct Shelf look-up (O(1) / O(log N) scale simulation)
      setTimeout(() => {
        setSearchSteps(1); // Step 1: Filter by shelf group 'ค'
        setCheckedBookIndex(-2); // Special highlight for shelf group
      }, 300);

      setTimeout(() => {
        setSearchSteps(2); // Step 2: Jump directly to 'โครงสร้างข้อมูล'
        const targetIdx = initialBooks.findIndex(b => b.title === bookTarget);
        setCheckedBookIndex(targetIdx);
        setSearchStatus('found');
        setSearching(false);
      }, 800);
    }
  };

  const resetBookSearch = () => {
    setCheckedBookIndex(-1);
    setSearchSteps(0);
    setSearchStatus('idle');
    setSearching(false);
  };

  // ==========================================
  // Part 3: Recipe Algorithm Sequence Game
  // ==========================================
  const recipeSteps = [
    { id: 'step-whisk', text: 'ตีไข่และปรุงรสในชามผสมให้เข้ากัน', order: 1, label: 'ตีไข่และปรุงรส' },
    { id: 'step-heat', text: 'ตั้งกระทะบนเตาไฟแล้วเทน้ำมันให้ร้อนพอดี', order: 2, label: 'ตั้งกระทะและเทน้ำมัน' },
    { id: 'step-fry', text: 'เทไข่ที่ตีไว้ลงทอดจนสุกเหลืองหอมทั้งสองด้าน', order: 3, label: 'เทไข่ลงทอด' },
    { id: 'step-plate', text: 'ตักไข่เจียวขึ้นสะเด็ดน้ำมันจัดใส่จานพร้อมเสิร์ฟ', order: 4, label: 'จัดใส่จานพร้อมเสิร์ฟ' }
  ];

  const [selectedRecipeSteps, setSelectedRecipeSteps] = useState([]);
  const [recipeStatus, setRecipeStatus] = useState('idle'); // 'idle', 'success', 'failed'

  const handleToggleRecipeStep = (step) => {
    if (recipeStatus !== 'idle') return;
    if (selectedRecipeSteps.find(s => s.id === step.id)) {
      setSelectedRecipeSteps(prev => prev.filter(s => s.id !== step.id));
    } else {
      setSelectedRecipeSteps(prev => [...prev, step]);
    }
  };

  const checkRecipeAlgorithm = () => {
    if (selectedRecipeSteps.length !== recipeSteps.length) {
      setRecipeStatus('incomplete');
      return;
    }

    const isCorrect = selectedRecipeSteps.every((step, idx) => step.order === idx + 1);
    if (isCorrect) {
      setRecipeStatus('success');
    } else {
      setRecipeStatus('failed');
    }
  };

  const resetRecipeAlgorithm = () => {
    setSelectedRecipeSteps([]);
    setRecipeStatus('idle');
  };

  // ==========================================
  // Part 4: Support Ticket Line Simulator (Array vs Queue)
  // ==========================================
  const [simMode, setSimMode] = useState('array'); // 'array' (Bad) or 'queue' (Good)
  const [customers, setCustomers] = useState([
    { id: 0, name: 'สมชาย', active: true },
    { id: 1, name: 'สมหญิง', active: true },
    { id: 2, name: 'สมศักดิ์', active: true },
    { id: 3, name: 'สมศรี', active: true },
    { id: 4, name: 'สมหมาย', active: true }
  ]);
  const [servedHistory, setServedHistory] = useState([]);
  const [simRunning, setSimRunning] = useState(false);
  const [simStepIndex, setSimStepIndex] = useState(0); // Active customer index pointer
  const [cpuOperations, setCpuOperations] = useState(0);
  const [memoryShifts, setMemoryShifts] = useState([]); // Animating shifts
  const [simStatusMsg, setSimStatusMsg] = useState('พร้อมจำลองการให้บริการ');

  const runSupportSimulation = async () => {
    if (simRunning) return;
    setSimRunning(true);
    setServedHistory([]);
    setCpuOperations(0);

    const initialCustomers = [
      { id: 0, name: 'สมชาย', active: true },
      { id: 1, name: 'สมหญิง', active: true },
      { id: 2, name: 'สมศักดิ์', active: true },
      { id: 3, name: 'สมศรี', active: true },
      { id: 4, name: 'สมหมาย', active: true }
    ];
    setCustomers(initialCustomers);

    if (simMode === 'array') {
      let currentQueue = [...initialCustomers];
      setSimStatusMsg('--- เริ่มระบบจำลองแบบที่ 1 (Bad Design: Array) ---');
      
      for (let step = 0; step < 5; step++) {
        // Serve customer at index 0
        const currentServed = currentQueue[0];
        setSimStatusMsg(`กำลังบริการ: ${currentServed.name}`);
        setCpuOperations(prev => prev + 1); // 1 operation for fetch

        // Highlight serving
        setCustomers(prev =>
          prev.map((c, i) => (i === 0 ? { ...c, serving: true } : c))
        );
        await new Promise(resolve => setTimeout(resolve, 800));

        // Add to history
        setServedHistory(prev => [...prev, currentServed.name]);

        // De-queue element (pop 0)
        currentQueue.shift();
        
        // Memory Shift Animation
        if (currentQueue.length > 0) {
          setSimStatusMsg(`[Memory overhead] ทำการขยับสไลด์ข้อมูลแรมย้ายข้อมูลใน Memory เพื่อเลื่อนตำแหน่ง...`);
          for (let shiftIdx = 0; shiftIdx < currentQueue.length; shiftIdx++) {
            setMemoryShifts(prev => [...prev, shiftIdx]);
            setCpuOperations(prev => prev + 1); // increment shifts count
            await new Promise(resolve => setTimeout(resolve, 250));
          }
          setMemoryShifts([]);
        }

        // Update main state list to match the shifted array
        setCustomers(
          currentQueue.map((c) => ({ ...c, serving: false }))
        );
        await new Promise(resolve => setTimeout(resolve, 400));
      }
      setSimStatusMsg('จบการทำงาน: ระบบทำงานช้าและหน่วงลงอย่างเห็นได้ชัดเมื่อปริมาณข้อมูลเพิ่มขึ้น');
    } else {
      // Good Design: Queue (O(1) popleft)
      let headPointer = 0;
      setSimStatusMsg('--- เริ่มระบบจำลองแบบที่ 2 (Optimized: Queue) ---');

      for (let step = 0; step < 5; step++) {
        const currentServed = customers[headPointer];
        setSimStatusMsg(`กำลังบริการอย่างรวดเร็ว (O(1) popleft): ${currentServed.name}`);
        setCpuOperations(prev => prev + 1); // 1 operation for fetch

        // Highlight head pointer & serving
        setSimStepIndex(headPointer);
        setCustomers(prev =>
          prev.map((c, i) => (i === headPointer ? { ...c, serving: true } : c))
        );
        await new Promise(resolve => setTimeout(resolve, 800));

        // Add to history
        setServedHistory(prev => [...prev, currentServed.name]);

        // Serve complete
        setCustomers(prev =>
          prev.map((c, i) => (i === headPointer ? { ...c, serving: false, active: false } : c))
        );

        headPointer++;
        setSimStepIndex(headPointer);
        await new Promise(resolve => setTimeout(resolve, 450));
      }
      setSimStepIndex(-1);
      setSimStatusMsg('จบการทำงาน: ระบบทำงานเสร็จทันที มีความเสถียรและความจุสูงมาก');
    }

    setSimRunning(false);
  };

  const resetSupportSimulation = () => {
    setCustomers([
      { id: 0, name: 'สมชาย', active: true },
      { id: 1, name: 'สมหญิง', active: true },
      { id: 2, name: 'สมศักดิ์', active: true },
      { id: 3, name: 'สมศรี', active: true },
      { id: 4, name: 'สมหมาย', active: true }
    ]);
    setServedHistory([]);
    setCpuOperations(0);
    setSimStepIndex(0);
    setMemoryShifts([]);
    setSimStatusMsg('พร้อมจำลองการให้บริการ');
    setSimRunning(false);
  };

  useEffect(() => {
    resetSupportSimulation();
  }, [simMode]);

  // ==========================================
  // Teacher Task Content
  // ==========================================
  const teacherTaskContent = `วิเคราะห์ประสิทธิภาพการจัดสรรแถวข้อมูลบริการลูกค้า:
1. ให้นักเรียนจำลองการทำตารางคำนวณเปรียบเทียบจำนวนการทำงานของ CPU (Total CPU Operations) ในการดึงข้อมูลและจัดการหน่วยความจำ
   ระหว่างการใช้โครงสร้าง Array (ที่มีการสไลด์ขยับข้อมูล) และ Queue (ที่เป็น Pointer-based O(1))
   เมื่อกำหนดให้มีจำนวนลูกค้าในแถวรับบริการเพิ่มขึ้นตั้งแต่ N = 5, 10, 100, 1000 และ 10000 คน
2. จงวิเคราะห์ความแตกต่างของ Time Complexity ในรูปสัญกรณ์ Big O ของกระบวนการ Dequeue ทั้ง 2 วิธีนี้
3. แนบคำตอบลงในไฟล์ข้อความหรือสมุดบันทึกปฏิบัติการวิชาวิทยาการคอมพิวเตอร์พร้อมอธิบาย Rationale ให้ชัดเจน`;

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* 1️⃣ Layer 1: Ambient Backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {DSA1_1_BLOBS.map((blob, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${blob.color} ${blob.size} ${blob.position} blur-[120px] ${blob.opacity}`}
          />
        ))}
      </div>

      {/* 3️⃣ Layer 3: Main Layout Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* Wirth's Classic Equation block */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <p className="text-sm font-bold text-indigo-600 tracking-widest uppercase">
            หลักการรากฐานทางวิศวกรรมคอมพิวเตอร์
          </p>
          
          <div 
            onClick={triggerWirthPulse}
            className={`bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden ${
              wirthPulse ? 'scale-[0.99] ring-2 ring-indigo-500/20' : ''
            }`}
          >
            <div className="absolute top-2 right-4 text-[10px] font-mono text-slate-400 font-bold tracking-widest">Wirth's Law</div>
            
            <span className="text-zinc-400 text-sm font-medium italic block mb-3">Niklaus Wirth (1976)</span>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 font-mono text-xl md:text-3xl font-extrabold text-slate-900 leading-none">
              <span 
                onMouseEnter={() => setEquationHover('algo')}
                onMouseLeave={() => setEquationHover(null)}
                className={`px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  equationHover === 'algo'
                    ? 'bg-violet-100 text-violet-955 scale-105'
                    : 'text-slate-900'
                }`}
              >
                Algorithms
              </span>
              <span className="text-indigo-500 font-sans font-normal">+</span>
              <span 
                onMouseEnter={() => setEquationHover('ds')}
                onMouseLeave={() => setEquationHover(null)}
                className={`px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  equationHover === 'ds'
                    ? 'bg-teal-100 text-teal-955 scale-105'
                    : 'text-slate-900'
                }`}
              >
                Data Structures
              </span>
              <span className="text-indigo-500 font-sans font-normal">=</span>
              <span 
                onMouseEnter={() => setEquationHover('program')}
                onMouseLeave={() => setEquationHover(null)}
                className={`px-5 py-3 rounded-2xl bg-slate-900 text-white shadow-md transition-all duration-300 ${
                  equationHover === 'program' ? 'scale-110 shadow-xl ring-4 ring-indigo-500/10' : ''
                }`}
              >
                Programs
              </span>
            </div>
            
            <p className="text-[15px] leading-relaxed text-zinc-500 font-sans mt-6 max-w-xl mx-auto">
              การสร้างระบบซอฟต์แวร์หรือระบบคอมพิวเตอร์ สิ่งที่เป็นรากฐานสำคัญที่สุดคือความสัมพันธ์ระหว่างข้อมูลและการประมวลผล 
              ดั่งวาทะคลาสสิกของ Niklaus Wirth นักวิทยาศาสตร์คอมพิวเตอร์ชื่อดังที่กล่าวไว้ข้างต้น
            </p>
          </div>
        </div>

        {/* Section 1: Definition of Data Structure */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-violet-600 tracking-wider uppercase">
              วิทยาการเก็บข้อมูลขั้นสูง
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              นิยามของโครงสร้างข้อมูล (Data Structure)
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-5">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                โครงสร้างข้อมูล คือ รูปแบบเฉพาะในการจัดเก็บ จัดระเบียบ และบริหารจัดการข้อมูลในหน่วยความจำของคอมพิวเตอร์ 
                เพื่อให้โปรแกรมสามารถเข้าถึง ค้นหา แก้ไข หรือลบข้อมูลเหล่านั้นได้อย่างมีประสิทธิภาพสูงสุด
              </p>
              
              <div className="bg-violet-50/60 backdrop-blur-md border border-violet-200/60 rounded-2xl p-5 border-l-[4px] border-l-violet-500 leading-relaxed space-y-3 shadow-sm">
                <h4 className="font-bold text-violet-900 text-base flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-violet-600" />
                  เปรียบเทียบในชีวิตจริง
                </h4>
                <p className="text-[15px] text-slate-600 font-sans leading-relaxed">
                  หากคุณครูมีหนังสือ 1,000 เล่ม ถ้าวางกองรวมกันไว้บนพื้นห้องสมุด (ไม่มีโครงสร้าง) 
                  เวลาจะหาหนังสือเล่มที่ต้องการจะยากและใช้เวลานานมาก แต่ถ้าเราจัดเก็บใน <strong className="text-violet-800">"ชั้นวางหนังสือ"</strong> 
                  โดยจัดเรียงตามประเภทหรือตัวอักษรอย่างมีระบบระเบียบ (มีโครงสร้างข้อมูล) เราจะเข้าถึงหนังสือเล่มที่ต้องการได้ในเวลาไม่กี่วินาที
                </p>
              </div>
            </div>

            {/* Books Shelf Search Simulator Panel */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                <h4 className="font-bold text-slate-800 flex items-center gap-2 text-[15px]">
                  <Sliders className="w-4 h-4 text-violet-500" /> 
                  เปรียบเทียบโมเดลการจัดเก็บและการค้นหาหนังสือ
                </h4>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => { setSearchMode('pile'); resetBookSearch(); }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      searchMode === 'pile'
                        ? 'bg-rose-100 text-rose-900 border border-rose-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    วางกระจัดกระจายบนพื้น
                  </button>
                  <button
                    onClick={() => { setSearchMode('shelf'); resetBookSearch(); }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      searchMode === 'shelf'
                        ? 'bg-emerald-100 text-emerald-950 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    จัดระเบียบในชั้นวาง
                  </button>
                </div>
              </div>

              {/* Graphical Book Shelf/Pile Display */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 min-h-[170px] flex flex-wrap gap-2.5 items-center justify-center relative overflow-hidden font-sans">
                <div className="absolute top-2 right-3 text-[10px] font-mono text-zinc-500 font-semibold uppercase tracking-wider">
                  {searchMode === 'pile' ? 'Unordered Heap Model' : 'Classified Index Tree'}
                </div>

                {searchMode === 'pile' ? (
                  // Scattered Books
                  <div className="flex flex-wrap gap-2 justify-center max-w-sm">
                    {initialBooks.map((book, idx) => (
                      <div
                        key={book.id}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold select-none border transition-all duration-300 ${
                          checkedBookIndex === idx
                            ? book.title === bookTarget
                              ? 'bg-emerald-500 border-emerald-400 text-white scale-110 shadow-lg'
                              : 'bg-rose-500 border-rose-400 text-white scale-105 shadow-md'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {book.title}
                      </div>
                    ))}
                  </div>
                ) : (
                  // Structured Shelves
                  <div className="w-full space-y-3 font-sans">
                    <div className="border-b border-slate-800 pb-1.5 flex items-center gap-3">
                      <span className="w-6 h-6 rounded bg-slate-800 text-[11px] font-mono font-bold flex items-center justify-center text-indigo-400">ก-จ</span>
                      <div className="flex gap-2">
                        {initialBooks.filter(b => b.shelf === 'ก' || b.shelf === 'จ').map((book) => (
                          <div
                            key={book.id}
                            className={`px-2 py-1 rounded text-[11px] border bg-slate-800/50 border-slate-700 text-slate-400 ${
                              checkedBookIndex === initialBooks.indexOf(book) ? 'ring-2 ring-rose-500' : ''
                            }`}
                          >
                            {book.title}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-b border-slate-800 pb-1.5 flex items-center gap-3">
                      <span className="w-6 h-6 rounded bg-slate-800 text-[11px] font-mono font-bold flex items-center justify-center text-indigo-400">ฟ-ส</span>
                      <div className="flex gap-2">
                        {initialBooks.filter(b => b.shelf === 'ฟ' || b.shelf === 'ส').map((book) => (
                          <div
                            key={book.id}
                            className={`px-2 py-1 rounded text-[11px] border bg-slate-800/50 border-slate-700 text-slate-400`}
                          >
                            {book.title}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={`pb-1 flex items-center gap-3 rounded-lg p-1.5 transition-all duration-300 ${
                      checkedBookIndex === -2 ? 'bg-indigo-950/40 border border-indigo-900/30' : ''
                    }`}>
                      <span className="w-6 h-6 rounded bg-slate-800 text-[11px] font-mono font-bold flex items-center justify-center text-emerald-400">ค</span>
                      <div className="flex gap-2">
                        {initialBooks.filter(b => b.shelf === 'ค').map((book) => {
                          const originalIdx = initialBooks.indexOf(book);
                          return (
                            <div
                              key={book.id}
                              className={`px-2.5 py-1.5 rounded text-[11px] font-semibold border transition-all duration-300 ${
                                checkedBookIndex === originalIdx
                                  ? 'bg-emerald-500 border-emerald-400 text-white scale-115 shadow-lg'
                                  : 'bg-slate-800 border-slate-700 text-slate-300'
                              }`}
                            >
                              {book.title}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Status and Actions */}
              <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="text-sm font-sans text-slate-600">
                  ต้องการหา: <strong className="text-indigo-600 font-bold">"{bookTarget}"</strong>
                  {searchSteps > 0 && (
                    <span className="ml-3 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200">
                      ตรวจสอบไป {searchSteps} ครั้ง
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={startBookSearch}
                    disabled={searching}
                    className={`px-4.5 py-2 rounded-xl text-white font-semibold flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-md ${
                      searching 
                        ? 'bg-zinc-400 cursor-not-allowed shadow-none' 
                        : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg shadow-indigo-600/10'
                    }`}
                  >
                    <Search className="w-4 h-4" /> เริ่มค้นหา
                  </button>
                  <button
                    onClick={resetBookSearch}
                    className="px-4.5 py-2 border border-slate-300 text-slate-600 rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 transition-all active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" /> รีเซ็ต
                  </button>
                </div>
              </div>

              {/* Analytics Callout */}
              <div className="mt-4 p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-3 text-xs leading-relaxed text-slate-600">
                <Info className="w-5 h-5 text-indigo-500 shrink-0" />
                <div>
                  {searchStatus === 'idle' && 'เลือกรูปแบบการจัดระเบียบแล้วคลิก "เริ่มค้นหา" เพื่อเปรียบเทียบขั้นตอนการทำงาน'}
                  {searchStatus === 'searching' && 'ระบบจำลองกำลังประมวลผลคำสั่งเชิงตรรกะในหน่วยความจำชั่วคราว...'}
                  {searchStatus === 'found' && (
                    <span>
                      พบหนังสือที่ต้องการ! วิธี {searchMode === 'pile' ? 'สุ่มกองบนพื้น' : 'ระบบชั้นวางจำแนกคีย์'} ใช้พลังงาน CPU 
                      ในการสืบค้น <strong>{searchSteps} สเต็ป</strong> สะท้อนผลลัพธ์ประสิทธิภาพที่ต่างกันอย่างเด่นชัด
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Definition of Algorithm */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              ตรรกะประมวลผลเชิงลำดับ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              นิยามของอัลกอริทึม (Algorithm)
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-5">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                อัลกอริทึม คือ ลำดับขั้นตอนหรือกระบวนการทำงานที่มีจุดเริ่มต้นและจุดสิ้นสุดที่ชัดเจน เพื่อใช้ในการแก้ปัญหาใดปัญหาหนึ่ง 
                โดยเปลี่ยนจาก "ข้อมูลเข้า (Input)" ให้กลายเป็น "ผลลัพธ์ที่ถูกต้อง (Output)"
              </p>

              <div className="bg-teal-50/60 backdrop-blur-md border border-teal-200/60 rounded-2xl p-5 border-l-[4px] border-l-teal-500 leading-relaxed space-y-3 shadow-sm">
                <h4 className="font-bold text-teal-900 text-base flex items-center gap-2">
                  <Activity className="w-5 h-5 text-teal-600" />
                  เปรียบเทียบในชีวิตจริง
                </h4>
                <p className="text-[15px] text-slate-600 font-sans leading-relaxed">
                  อัลกอริทึมเปรียบเหมือน <strong>"สูตรอาหาร"</strong> ที่บอกว่าต้องทำสิ่งใดก่อน-หลัง เช่น 1. ตีไข่และปรุงรส 2. ตั้งกระทะและเทน้ำมัน 3. เทไข่ลงทอดจนสุกเหลือง 4. ตักขึ้นใส่จาน 
                  หากสลับขั้นตอน (เช่น เอาไข่ดิบใส่จานก่อนตีไข่ลงทอด) ผลลัพธ์ที่ได้ก็อาจจะไม่ใช่เมนูไข่เจียวที่ถูกต้องสำเร็จตามโจทย์
                </p>
              </div>
            </div>

            {/* Interactive Recipe Step Algorithm Sorter */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                <h4 className="font-bold text-slate-800 flex items-center gap-2 text-[15px]">
                  <Sliders className="w-4 h-4 text-teal-500" />
                  จำลองประกอบชุดอัลกอริทึม (ลำดับขั้นตอนทำไข่เจียว)
                </h4>
              </div>

              {/* Step selection list */}
              <div className="space-y-3 font-sans">
                <p className="text-[13px] text-slate-500 font-medium">คลิกเลือกขั้นตอนด้านล่างเรียงต่อกันตามลำดับก่อนหลัง (1 ถึง 4):</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recipeSteps.map((step) => {
                    const activeIndex = selectedRecipeSteps.findIndex(s => s.id === step.id);
                    const isSelected = activeIndex !== -1;
                    return (
                      <button
                        key={step.id}
                        onClick={() => handleToggleRecipeStep(step)}
                        className={`p-3.5 rounded-xl border-2 font-semibold text-xs text-left cursor-pointer transition-all active:scale-[0.98] flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-800 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span>{step.label}</span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                            {activeIndex + 1}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Simulated Sequence Workspace */}
                <div className="mt-5 bg-slate-900 border border-white/5 rounded-2xl p-5 min-h-[120px] font-mono text-[13px]">
                  <div className="text-zinc-500 mb-2 flex justify-between items-center">
                    <span>// Active Algorithm Timeline</span>
                    {recipeStatus === 'success' && <span className="text-emerald-400 font-bold">✓ ลำดับถูกต้องสมบูรณ์</span>}
                    {recipeStatus === 'failed' && <span className="text-rose-400 font-bold">✗ ลำดับการประมวลผลผิดพลาด</span>}
                  </div>

                  {selectedRecipeSteps.length === 0 && (
                    <p className="text-slate-500 animate-pulse italic">กรุณาเลือกขั้นตอนเพื่อวางระบบอัลกอริทึม...</p>
                  )}

                  <div className="space-y-1.5">
                    {selectedRecipeSteps.map((step, idx) => (
                      <div key={step.id} className="text-teal-400 flex items-center gap-2 animate-fadeIn">
                        <span className="text-slate-600 text-[11px]">{idx + 1}.</span>
                        <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="text-slate-300">{step.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="mt-4 flex justify-between items-center gap-3">
                <div className="text-xs text-slate-500 font-medium">
                  สถานะบิลด์: {' '}
                  {recipeStatus === 'idle' && <span className="text-slate-600">รอยืนยันคอมไพล์</span>}
                  {recipeStatus === 'incomplete' && <span className="text-amber-600 font-bold">จัดเรียงไม่ครบขั้นตอน</span>}
                  {recipeStatus === 'success' && <span className="text-emerald-600 font-bold">ทำงานสำเร็จลุล่วง 100%</span>}
                  {recipeStatus === 'failed' && <span className="text-rose-600 font-bold">ขัดข้อง (Logical Bug)</span>}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={checkRecipeAlgorithm}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-[13px] cursor-pointer flex items-center gap-1.5 shadow-md shadow-teal-600/10 transition-all active:scale-95"
                  >
                    <CheckCircle className="w-4 h-4" /> ตรวจสอบอัลกอริทึม
                  </button>
                  <button
                    onClick={resetRecipeAlgorithm}
                    className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 transition-all active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" /> รีเซ็ต
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Simulation (Bad vs Good Design) */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ห้องปฏิบัติการทดลองระบบคอมพิวเตอร์
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              สถานการณ์จำลอง (Simulation): แสดงความสำคัญของการเลือกใช้คู่หูคู่นี้
            </h3>
          </div>

          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-3 font-sans text-[15px] text-slate-600 leading-relaxed shadow-sm">
            <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-full font-bold text-xs">
              📌 [โจทย์จำลอง]
            </span>
            <p className="mt-2 text-[16px] font-medium text-slate-800">
              บริษัทแห่งหนึ่งมีรายชื่อลูกค้าที่รอคิวรับบริการเขียนใส่กระดาษไว้ 5 คนตามลำดับการเดินเข้ามา ได้แก่: <strong className="text-indigo-600">["สมชาย", "สมหญิง", "สมศักดิ์", "สมศรี", "สมหมาย"]</strong>
            </p>
            <p>เป้าหมายคือ ต้องการเรียกคิวลูกค้ามาบริการทีละคน ลองมาเปรียบเทียบการออกแบบ 2 รูปแบบที่ให้ผลลัพธ์ต่างกันมหาศาล:</p>
          </div>

          {/* DUAL PANEL SIMULATOR SHELL */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Control Panel */}
            <div className="lg:col-span-5 bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                CONTROL INTERFACE V1.0
              </span>

              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-indigo-400" />
                    เลือกรูปแบบการจำลอง
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    <button
                      onClick={() => setSimMode('array')}
                      disabled={simRunning}
                      className={`p-4 rounded-xl text-left border cursor-pointer transition-all ${
                        simMode === 'array'
                          ? 'bg-rose-950/30 border-rose-500/50 text-white shadow-lg ring-1 ring-rose-500/20'
                          : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 disabled:opacity-50'
                      }`}
                    >
                      <div className="font-bold text-xs flex items-center gap-2 mb-1 text-rose-400">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        🛠️ การจำลองรูปแบบที่ 1 (Bad Design)
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-1">
                        <strong>โครงสร้างข้อมูลที่ใช้:</strong> กล่องหย่อนบัตรคิว (ดึงเข้า-ออกสุ่มๆ หรือเลือกหยิบจากตรงกลางลำบาก)<br/>
                        <strong>อัลกอริทึม:</strong> ดึงชื่อลูกค้าคนแรกสุดออกไปบริการ (pop(0)) ส่งผลให้ข้อมูลที่เหลือทั้งหมดต้องขยับสไลด์ในหน่วยความจำใหม่ทุกครั้ง
                      </p>
                    </button>

                    <button
                      onClick={() => setSimMode('queue')}
                      disabled={simRunning}
                      className={`p-4 rounded-xl text-left border cursor-pointer transition-all ${
                        simMode === 'queue'
                          ? 'bg-emerald-950/30 border-emerald-500/50 text-white shadow-lg ring-1 ring-emerald-500/20'
                          : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 disabled:opacity-50'
                      }`}
                    >
                      <div className="font-bold text-xs flex items-center gap-2 mb-1 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        🚀 การจำลองรูปแบบที่ 2 (Good Design)
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-1">
                        <strong>โครงสร้างข้อมูลที่ใช้:</strong> Queue (คิว) แบบท่อตรง (FIFO: เข้าก่อนออกก่อน)<br/>
                        <strong>อัลกอริทึม:</strong> ดึงข้อมูลจากหัวแถวออกไปบริการทันที (popleft) โดยไม่ต้องวนลูปและไม่ต้องขยับตำแหน่งข้อมูลอื่น
                      </p>
                    </button>
                  </div>
                </div>

                {/* Operations Dashboard metrics */}
                <div className="grid grid-cols-2 gap-3.5 bg-slate-950/60 p-4 border border-white/5 rounded-xl">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono font-bold tracking-wider block">
                      TOTAL CPU SHIFTS
                    </span>
                    <div className="font-mono text-xl font-bold text-indigo-300">
                      {cpuOperations} Ops
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono font-bold tracking-wider block">
                      DEQUEUE SPEED
                    </span>
                    <div className={`font-mono text-xl font-bold ${simMode === 'array' ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {simMode === 'array' ? 'O(N) - Linear' : 'O(1) - Constant'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={runSupportSimulation}
                  disabled={simRunning}
                  className={`flex-1 py-3 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all active:scale-[0.98] ${
                    simRunning
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none border border-slate-700'
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/10'
                  }`}
                >
                  <Play className="w-4 h-4" /> เริ่มจำลองการทำงาน
                </button>
                <button
                  onClick={resetSupportSimulation}
                  className="px-4 py-3 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-bold text-xs cursor-pointer transition-all active:scale-[0.98]"
                >
                  <RotateCcw className="w-4 h-4" /> รีเซ็ต
                </button>
              </div>
            </div>

            {/* Right Panel: Visualization Workspace */}
            <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">
                OSCILLOSCOPE MEMORY BUFFER
              </span>

              {/* Status banner */}
              <div className="mt-4 bg-slate-900 border border-white/5 rounded-xl px-4 py-3 font-mono text-[12.5px] text-slate-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="line-clamp-1">{simStatusMsg}</span>
              </div>

              {/* Visualized memory slots */}
              <div className="my-8 space-y-6">
                <div className="text-[10px] font-mono text-slate-400 tracking-wider">
                  ขอบเขตบล็อกหน่วยความจำแรม (RAM Address Buffer Matrix)
                </div>
                
                <div className="grid grid-cols-5 gap-3.5 relative">
                  {customers.map((cust, idx) => {
                    const isHead = idx === simStepIndex && simMode === 'queue';
                    const isShiftTarget = memoryShifts.includes(idx);
                    
                    return (
                      <div
                        key={cust.id}
                        className={`relative p-3.5 rounded-xl border font-mono text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[90px] ${
                          cust.serving
                            ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-500/20'
                            : !cust.active
                            ? 'bg-slate-950 border-slate-900 text-slate-700 opacity-25'
                            : isShiftTarget
                            ? 'bg-rose-950/50 border-rose-500/50 text-rose-300'
                            : 'bg-slate-900/90 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="text-[9px] text-slate-500 font-bold block mb-1">Index {idx}</span>
                        <div className="font-semibold text-xs leading-tight font-sans">{cust.active ? cust.name : '[Empty]'}</div>
                        
                        {/* Pointer tag */}
                        {isHead && (
                          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded leading-none">Head</span>
                            <span className="w-1.5 h-1.5 bg-emerald-500 rotate-45 -mt-0.5" />
                          </div>
                        )}

                        {simMode === 'array' && cust.active && idx === 0 && (
                          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <span className="text-[9px] bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded leading-none">Pop 0</span>
                            <span className="w-1.5 h-1.5 bg-rose-500 rotate-45 -mt-0.5" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* History and comparison block */}
              <div className="border-t border-white/5 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 border border-white/5 rounded-xl p-3.5">
                  <div className="text-[10px] font-mono text-slate-400 font-bold tracking-wider mb-2 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                    คิวที่ได้รับการบริการสำเร็จเรียบร้อยแล้ว
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-sans">
                    {servedHistory.length === 0 && (
                      <span className="text-xs text-slate-600 italic">ว่างเปล่า (รอการประมวลผล)</span>
                    )}
                    {servedHistory.map((name, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-slate-950 text-slate-300 font-semibold text-[11px] border border-slate-800">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-white/5 rounded-xl p-3.5 flex flex-col justify-between animate-fadeIn">
                  <div className="text-[10px] font-mono text-slate-400 font-bold tracking-wider flex items-center gap-1">
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                    ตารางสถิติจำลองการเข้าถึง
                  </div>
                  
                  <div className="space-y-1.5 mt-2 font-sans">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Array serve (ขยับหน่วยความจำ):</span>
                      <strong className="text-rose-400">O(n) Shifts</strong>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Queue popleft (ความเร็วเสถียร):</span>
                      <strong className="text-emerald-400">O(1) Direct</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PYTHON CODE SIMULATION PANELS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            
            {/* Bad Design Python Code */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-2 right-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                Bad Python Simulation
              </div>
              <div>
                <h4 className="font-mono text-xs text-rose-400 mb-3 flex items-center gap-2">
                  <FileCode className="w-4 h-4" /> โค้ดจำลองรูปแบบที่ 1 (Bad Design - Array List)
                </h4>
                <pre className="font-mono text-[12.5px] text-slate-300 overflow-x-auto p-4 bg-slate-950/60 border border-slate-950 rounded-xl leading-relaxed">
{`import time

# สมมติใช้โครงสร้างข้อมูลแบบ List ที่เราไม่ได้จัดระเบียบ 
# แต่อัลกอริทึมบังคับว่าต้องหาคนที่เข้ามาก่อน ซึ่งโปรแกรมต้องวนลูปหาทุกครั้ง
queue_list = ["สมชาย", "สมหญิง", "สมศักดิ์", "สมศรี", "สมหมาย"]

def serve_customer_bad_way():
    print("--- เริ่มระบบจำลองแบบที่ 1 ---")
    while len(queue_list) > 0:
        # อัลกอริทึมที่ไม่มีประสิทธิภาพ: ต้องสั่ง pop(0) 
        # ซึ่งในคอมพิวเตอร์ ข้อมูลที่เหลือทั้งหมดต้องขยับตำแหน่งในหน่วยความจำใหม่ทุกครั้ง (เสียเวลา)
        current_customer = queue_list.pop(0) 
        print(self_simulated_delay(f"กำลังบริการ: {current_customer}"))
    print("จบการทำงาน: ระบบทำงานช้าเมื่อปริมาณข้อมูลเพิ่มขึ้น\\n")`}
                </pre>
              </div>
              <div className="mt-3 p-3 bg-rose-950/20 border border-rose-900/30 rounded-xl text-xs text-rose-300 leading-relaxed font-sans">
                <strong>ผลลัพธ์เชิงวิเคราะห์:</strong> หากมีลูกค้า 5 คน อาจจะไม่รู้สึกว่าช้า แต่ถ้าสถานการณ์จำลองนี้มีลูกค้า 1,000,000 คน คอมพิวเตอร์จะต้องขยับสไลด์ย้ายตำแหน่งข้อมูลในแรมถึง 1 ล้านช่องในทุกๆ การเรียกคิว ทำให้ระบบเกิดอาการค้างหรือกระตุก (Lag)
              </div>
            </div>

            {/* Good Design Python Code */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-2 right-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                Optimized Python Simulation
              </div>
              <div>
                <h4 className="font-mono text-xs text-emerald-400 mb-3 flex items-center gap-2">
                  <FileCode className="w-4 h-4" /> โค้ดจำลองรูปแบบที่ 2 (Good Design - Queue)
                </h4>
                <pre className="font-mono text-[12.5px] text-slate-300 overflow-x-auto p-4 bg-slate-950/60 border border-slate-950 rounded-xl leading-relaxed">
{`from collections import deque
import time

# เลือกใช้โครงสร้างข้อมูลที่เป็น Queue โดยเฉพาะ (Double-ended queue)
optimized_queue = deque(["สมชาย", "สมหญิง", "สมศักดิ์", "สมศรี", "สมหมาย"])

def serve_customer_good_way():
    print("--- เริ่มระบบจำลองแบบที่ 2 (Optimized) ---")
    while len(optimized_queue) > 0:
        # อัลกอริทึมประสิทธิภาพสูง: popleft() ของ deque 
        # ใช้เวลาคงที่ (O(1)) ไม่ว่าจะมีข้อมูลในคิวล้านคนก็ทำงานเสร็จทันที ไม่ต้องขยับหน่วยความจำ
        current_customer = optimized_queue.popleft()
        print(f"กำลังบริการอย่างรวดเร็ว: {current_customer}")
    print("จบการทำงาน: ระบบทำงานเสร็จทันที มีความเสถียรสูงมาก")`}
                </pre>
              </div>
              <div className="mt-3 p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-xl text-xs text-emerald-300 leading-relaxed font-sans">
                <strong>ผลลัพธ์เชิงวิเคราะห์:</strong> การประยุกต์ใช้โครงสร้างคิว (`collections.deque`) และฟังก์ชัน Dequeue (`popleft()`) ช่วยชี้ตำแหน่งพอยน์เตอร์ตรงจุด ทำให้คอมพิวเตอร์เข้าถึงข้อมูลเป้าหมายได้ในเวลา O(1) คงที่สมบูรณ์แบบไม่ว่าปริมาณคิวจะทวีคูณเท่าไรก็ตาม
              </div>
            </div>

          </div>
        </section>

        {/* Section 4: Summary */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-violet-600 tracking-wider uppercase">
              ข้อมูลสรุปทางวิศวกรรมคอมพิวเตอร์
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              สรุปความสำคัญจากตัวอย่างจำลอง
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
            จากสถานการณ์จำลองทางเทคนิคด้านบน จะเห็นสรุปประเด็นใจความสำคัญหลักได้ดังนี้ครับ:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Metric 1 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-violet-500/40 transition-all duration-300 cursor-pointer group">
              <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-inner w-fit mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-[17px] font-bold text-slate-800 mb-2 leading-snug">ความเร็ว (Time Complexity)</h4>
              <p className="text-[14px] text-slate-500 leading-relaxed font-sans">
                การเลือกใช้โครงสร้างข้อมูลที่แมตช์จับคู่กับอัลกอริทึมที่ถูกต้อง (ในสถานการณ์นี้คือ `deque` + `popleft`) 
                ทำให้คอมพิวเตอร์ไม่ต้องทำงานหนักซ้ำซ้อน ลดขั้นตอนการเคลื่อนตำแหน่งแรมได้อย่างหมดจด
              </p>
            </div>

            {/* Metric 2 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-violet-500/40 transition-all duration-300 cursor-pointer group">
              <div className="p-3 rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 shadow-inner w-fit mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h4 className="text-[17px] font-bold text-slate-800 mb-2 leading-snug">การรองรับอนาคต (Scalability)</h4>
              <p className="text-[14px] text-slate-500 leading-relaxed font-sans">
                หากระบบขยายตัวไปเป็นระดับบิ๊กดาต้า (Big Data) ซอฟต์แวร์ที่ออกแบบด้วยโครงสร้างข้อมูลที่สอดคล้อง
                จะไม่มีอาการระบบล่ม และยังคงความสามารถในการรักษาความเร็วเฉลี่ยได้อย่างดีเยี่ยมนิ่งคงที่
              </p>
            </div>

            {/* Metric 3 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-violet-500/40 transition-all duration-300 cursor-pointer group">
              <div className="p-3 rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 shadow-inner w-fit mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-[17px] font-bold text-slate-800 mb-2 leading-snug">ความคุ้มค่าทรัพยากร (Resource Optimization)</h4>
              <p className="text-[14px] text-slate-500 leading-relaxed font-sans">
                ช่วยประหยัดการเข้าสืบค้นและดักจับหน่วยความจำ RAM อย่างไม่มีประสิทธิภาพ ส่งผลต่อการถนอมการประมวลผลของ CPU 
                ทำให้อุปกรณ์ฮาร์ดแวร์โดยรวมสามารถกระจายและขยายขีดความสามารถการทำคำสั่งอื่นได้อย่างเสรี
              </p>
            </div>
          </div>
        </section>

        {/* 4️⃣ Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้บทเรียน 1.1)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}
