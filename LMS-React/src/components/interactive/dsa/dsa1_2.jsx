import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  SimulatorShell,
  ConceptCard,
  AmbientBackdrop
} from '../shared';
import {
  Database,
  ArrowRight,
  Play,
  RotateCcw,
  Cpu,
  Layers,
  List,
  CheckCircle2,
  Info,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  Plus,
  Trash2,
  Sliders,
  Sparkles
} from 'lucide-react';

export default function DSA1_2() {
  // ─── 1. Blobs for Layer 1 Background ──────────────────────────────────────
  const DSA1_2_BLOBS = [
    { color: 'bg-indigo-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-40' },
    { color: 'bg-cyan-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-35' },
    { color: 'bg-blue-200',    size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-teal-200',    size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-25' }
  ];

  // ─── 2. Python List Dynamic Array Simulator State ──────────────────────────
  const [listItems, setListItems] = useState([10, 20, 30]);
  const [capacity, setCapacity] = useState(4);
  const [activeCellIdx, setActiveCellIdx] = useState(-1);
  const [shiftDirection, setShiftDirection] = useState(null); // 'left' | 'right' | null
  const [simLog, setSimLog] = useState(['เริ่มต้นความจุ List (Capacity) = 4, ขนาดข้อมูลจริง (Size) = 3']);
  const [isAnimating, setIsAnimating] = useState(false);

  // Dynamic Array Python memory reallocation simulator
  const handleAppend = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextValue = Math.floor(Math.random() * 90) + 10;
    const currentSize = listItems.length;
    const newSize = currentSize + 1;
    let logs = [];
    
    if (newSize > capacity) {
      // Reallocation! Python doubles or increases capacity
      const newCapacity = capacity * 2;
      setCapacity(newCapacity);
      logs.push(`[แรมล้น] ขนาดข้อมูลจริง (${newSize}) เกินความจุของอาเรย์เดิม (${capacity})`);
      logs.push(`[จองแรมเพิ่ม] ทำการขยายพื้นที่หน่วยความจำสำรองใหม่: ${capacity} → ${newCapacity} ช่อง`);
      logs.push(`[โอนข้อมูล] คัดลอกตำแหน่งข้อมูลเดิมไปบล็อกแรมใหม่ (O(n) overhead)`);
      
      setActiveCellIdx(currentSize);
      setTimeout(() => {
        setListItems(prev => [...prev, nextValue]);
        logs.push(`[สำเร็จ] ต่อท้ายข้อมูล ${nextValue} เข้าในดัชนีที่ ${currentSize} (O(1) amortized)`);
        setSimLog(logs);
        setIsAnimating(false);
        setActiveCellIdx(-1);
      }, 1500);
    } else {
      logs.push(`[ต่อท้าย] พบความจุเพียงพอ (Size: ${newSize} <= Capacity: ${capacity})`);
      setActiveCellIdx(currentSize);
      setTimeout(() => {
        setListItems(prev => [...prev, nextValue]);
        logs.push(`[สำเร็จ] ต่อท้ายข้อมูล ${nextValue} เข้าในดัชนีที่ ${currentSize} (ใช้เวลาคงที่ O(1))`);
        setSimLog(logs);
        setIsAnimating(false);
        setActiveCellIdx(-1);
      }, 800);
    }

    setSimLog(logs);
  };

  const handleInsertAtStart = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const insertValue = 99;
    const currentSize = listItems.length;
    const newSize = currentSize + 1;
    let logs = [`[แทรกหน้าสุด] แทรกข้อมูล ${insertValue} ที่ดัชนี 0`];
    
    let nextCapacity = capacity;
    if (newSize > capacity) {
      nextCapacity = capacity * 2;
      setCapacity(nextCapacity);
      logs.push(`[แรมล้น] ทำการปรับความจุหน่วยความจำใหม่: ${capacity} → ${nextCapacity} ช่อง`);
    }

    logs.push(`[ขยับข้อมูล] ข้อมูลเดิมจำนวน ${currentSize} ตัว ต้องเคลื่อนย้ายสไลด์ไปทางขวาทีละดัชนี (O(n) complexity)`);
    setShiftDirection('right');
    setSimLog([...logs]);

    // Animate shifting
    setTimeout(() => {
      setListItems(prev => {
        const nextList = [insertValue, ...prev];
        logs.push(`[สำเร็จ] ขยับข้อมูลทุกตัวเรียบร้อย และบรรจุ ${insertValue} ลงช่องดัชนีที่ 0`);
        setSimLog(logs);
        setShiftDirection(null);
        setIsAnimating(false);
        return nextList;
      });
    }, 1500);
  };

  const handlePop = () => {
    if (isAnimating || listItems.length === 0) return;
    setIsAnimating(true);

    const popIndex = listItems.length - 1;
    const poppedVal = listItems[popIndex];
    let logs = [`[ลบท้ายสุด] ทำการดึงและลบค่าข้อมูล ${poppedVal} ออกจากดัชนีสุดท้าย ${popIndex}`];
    
    setActiveCellIdx(popIndex);
    
    setTimeout(() => {
      setListItems(prev => prev.slice(0, -1));
      logs.push(`[สำเร็จ] ลบค่าเสร็จสิ้น ไม่เกิดการเคลื่อนย้ายตำแหน่งข้อมูลตัวอื่น (ใช้เวลาคงที่ O(1))`);
      setSimLog(logs);
      setIsAnimating(false);
      setActiveCellIdx(-1);
    }, 800);

    setSimLog(logs);
  };

  const handleRemoveFromStart = () => {
    if (isAnimating || listItems.length === 0) return;
    setIsAnimating(true);

    const removedVal = listItems[0];
    let logs = [`[ลบหน้าสุด] สั่งลบข้อมูลดัชนีที่ 0 (ค่าคือ ${removedVal})`];
    logs.push(`[ขยับข้อมูล] ข้อมูลที่เหลือทั้งหมดต้องขยับสไลด์มาทางซ้าย 1 ตำแหน่งเพื่อทดแทนช่องที่ว่างลง (O(n) complexity)`);
    
    setShiftDirection('left');
    setSimLog([...logs]);

    setTimeout(() => {
      setListItems(prev => {
        const nextList = prev.slice(1);
        logs.push(`[สำเร็จ] จัดระเบียบข้อมูลใหม่เสร็จสิ้นโดยการสไลด์ค่าทุกตัว`);
        setSimLog(logs);
        setShiftDirection(null);
        setIsAnimating(false);
        return nextList;
      });
    }, 1500);
  };

  const handleResetSim = () => {
    if (isAnimating) return;
    setListItems([10, 20, 30]);
    setCapacity(4);
    setSimLog(['ทำการรีเซ็ตความจุ List (Capacity) = 4, ขนาดข้อมูล (Size) = 3']);
    setActiveCellIdx(-1);
    setShiftDirection(null);
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={DSA1_2_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: What is a List ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ความหมายและนิยาม
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงสร้างข้อมูลแบบรายการ (List) คืออะไร
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              ในทางวิทยาการคอมพิวเตอร์ <strong className="mx-1 px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[14px]">List</strong> 
              คือ โครงสร้างข้อมูลพื้นฐานที่ใช้เก็บรวบรวมกลุ่มของข้อมูลแบบเรียงลำดับต่อเนื่องกัน โดยในภาษาโปรแกรมชั้นนำอย่าง Python ตัวแปรประเภท List 
              จะมีความพิเศษในฐานะที่เป็น <strong>Dynamic Array (อาเรย์ปรับขนาดได้)</strong> ซึ่งทำงานอยู่เบื้องหลัง ทำให้ผู้พัฒนาสามารถจัดเก็บข้อมูลโดยไม่ต้องระบุความจุหน่วยความจำล่วงหน้า
            </p>

            {/* List Properties Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <ConceptCard
                symbol="Index"
                title="อ้างอิงผ่านตำแหน่งดัชนี"
                description="สมาชิกทุกตัวใน List จะมีพิกัดชี้วัดเป็นตัวเลขจำนวนเต็ม เริ่มต้นตั้งแต่ดัชนี 0 เป็นตัวแรกสุด"
                accent="indigo"
              />
              <ConceptCard
                symbol="Mutable"
                title="แก้ไขข้อมูลได้ตลอดเวลา"
                description="คุณสามารถแก้ไข เพิ่ม หรือลบข้อมูลใน List ได้โดยตรงในหน่วยความจำโดยไม่ต้องจองออบเจกต์ขึ้นมาใหม่"
                accent="cyan"
              />
              <ConceptCard
                symbol="Hetero"
                title="เก็บคละชนิดข้อมูลได้"
                description="ในหนึ่ง List สามารถเก็บ Integer, String, Float หรือแม้กระทั่งออบเจกต์ของคลาสรวมอยู่ด้วยกันได้"
                accent="emerald"
              />
              <ConceptCard
                symbol="Dynamic"
                title="ขยายขนาดได้แบบออโต้"
                description="เมื่อมีข้อมูลใหม่เพิ่มเข้ามาแต่แรมเดิมล้น ระบบจะโคลนจองข้อมูลพื้นที่สำรองที่ใหญ่ขึ้นให้อัตโนมัติ"
                accent="violet"
              />
            </div>
          </div>
        </section>

        {/* ─── Section 2: Pros & Cons ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              การประเมินประสิทธิภาพ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ข้อดีและข้อเสียของโครงสร้างแบบรายการ
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Pros card */}
            <div className="bg-emerald-50/60 backdrop-blur-md border border-emerald-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-[20px] font-bold text-emerald-950 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ข้อดีเด่นของ List
                </h4>
                <div className="space-y-4 text-[14.5px] text-slate-700 leading-relaxed font-sans">
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-1" />
                    <p>
                      <strong>ความเร็วการสุ่มเข้าถึง $O(1)$ (Random Access):</strong> ค้นหาข้อมูลได้ทันทีเมื่อรู้ดัชนี เช่น `my_list[5]` เพราะหน่วยความจำถูกจองต่อเนื่องกันในแรม
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-1" />
                    <p>
                      <strong>การต่อท้ายความเร็วสูง:</strong> เมธอด `append()` ใช้เวลาเฉลี่ยคงที่ $O(1)$ Amortized เนื่องจากตัวแปรมักจะมีการจองแรมสำรองไว้ด้านท้ายเสมอ
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-1" />
                    <p>
                      <strong>เขียนโปรแกรมง่าย:</strong> มีคำสั่งอำนวยความสะดวกครบถ้วนและประยุกต์ใช้ทำหน้าที่โครงสร้างข้อมูลอื่นได้ (เช่น Stack)
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-100 text-xs font-semibold text-emerald-800 font-mono">
                RECOMMENDED FOR: FAST APPENDS & INDEX LOOKUPS
              </div>
            </div>

            {/* Cons card */}
            <div className="bg-rose-50/60 backdrop-blur-md border border-rose-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-[20px] font-bold text-rose-950 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-rose-500" />
                  ข้อเสียและข้อจำกัดของ List
                </h4>
                <div className="space-y-4 text-[14.5px] text-slate-700 leading-relaxed font-sans">
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-1" />
                    <p>
                      <strong>การแทรก/ลบจุดแรกเริ่มช้า $O(n)$:</strong> การใช้ `insert(0, val)` หรือ `pop(0)` บังคับให้ระบบต้องเลื่อนขยับสมาชิกอื่นทั้งหมดที่เหลือหลีกทาง
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-1" />
                    <p>
                      <strong>การค้นหาช้าแบบเชิงเส้น $O(n)$:</strong> หากต้องการหาข้อมูลที่เก็บแต่ไม่รู้ดัชนี จำเป็นต้องวนลูปเปรียบเทียบทีละตัวตั้งแต่หัวแถว
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-1" />
                    <p>
                      <strong>Overhead ในแรม:</strong> การปรับขนาดออโต้มีกรรมวิธีการจองแรมสำรองเกินขนาดจริง (Over-allocation) เสมอ ทำให้สูญเสียหน่วยความจำบางส่วน
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-rose-100 text-xs font-semibold text-rose-800 font-mono">
                LIMITATION: SLOW SEARCH & SLOW FRONT-INSERTION
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3: Interactive Python List Dynamic Array Simulator ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ตัวจำลองการทำงานเชิงลึก
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ห้องทดลองการจัดการหน่วยความจำของ Python List
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทดลองโต้ตอบโดยกดสั่ง เพิ่ม แทรก หรือลบข้อมูลในลิสต์ เพื่อศึกษาการเปลี่ยนแปลงของขนาดข้อมูลจริง (Size), 
            การจองแรมส่วนเกิน (Capacity) และการขยับย้ายสไลด์สมาชิกภายในหน่วยความจำเมื่อแทรกข้อมูลตรงส่วนหัว:
          </p>

          <SimulatorShell
            dark
            title="Python List (Dynamic Array) Memory Allocator Simulator"
            icon={<Sliders className="w-8 h-8 text-teal-400" />}
            glowColors="from-zinc-900/30 to-zinc-950/10"
            iconColor="text-teal-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Controls (Left) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[440px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  CONTROLLER
                </div>

                <div className="space-y-6">
                  {/* Stats Panel */}
                  <div className="grid grid-cols-2 gap-4 bg-black/40 p-4 rounded-xl border border-slate-800">
                    <div className="text-center">
                      <span className="text-[10px] text-slate-400 font-mono block uppercase">ข้อมูลจริง (Size)</span>
                      <span className="font-mono text-2xl font-bold text-teal-400">{listItems.length} ตัว</span>
                    </div>
                    <div className="text-center border-l border-slate-800">
                      <span className="text-[10px] text-slate-400 font-mono block uppercase">จองในแรม (Capacity)</span>
                      <span className="font-mono text-2xl font-bold text-amber-400">{capacity} ช่อง</span>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">1. เลือกสั่งคำสั่งใช้งาน List:</span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={handleAppend}
                        disabled={isAnimating}
                        className="py-2.5 px-3 bg-teal-900/80 hover:bg-teal-800 border border-teal-700/60 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-45"
                      >
                        <Plus className="w-4 h-4 text-teal-400" /> append(สุ่ม) [ท้ายสุด]
                      </button>

                      <button
                        onClick={handleInsertAtStart}
                        disabled={isAnimating}
                        className="py-2.5 px-3 bg-indigo-900/80 hover:bg-indigo-800 border border-indigo-700/60 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-45"
                      >
                        <Plus className="w-4 h-4 text-indigo-400" /> insert(0, 99) [หน้าสุด]
                      </button>

                      <button
                        onClick={handlePop}
                        disabled={isAnimating || listItems.length === 0}
                        className="py-2.5 px-3 bg-rose-950/80 hover:bg-rose-900 border border-rose-800/60 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-45"
                      >
                        <Trash2 className="w-4 h-4 text-rose-400" /> pop() [ท้ายสุด]
                      </button>

                      <button
                        onClick={handleRemoveFromStart}
                        disabled={isAnimating || listItems.length === 0}
                        className="py-2.5 px-3 bg-amber-950/80 hover:bg-amber-900 border border-amber-800/60 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-45"
                      >
                        <Trash2 className="w-4 h-4 text-amber-400" /> pop(0) [หน้าสุด]
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reset & Output Console */}
                <div className="mt-8 pt-4 border-t border-slate-800 space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={handleResetSim}
                      disabled={isAnimating}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 disabled:opacity-40"
                    >
                      <RotateCcw className="w-4 h-4" /> รีเซ็ตหน่วยความจำจำลอง
                    </button>
                  </div>

                  <div className="bg-black/60 p-3.5 rounded-xl border border-slate-950 min-h-[90px] font-mono text-[11.5px] leading-relaxed text-teal-400 select-all overflow-y-auto max-h-[140px]">
                    <div className="text-zinc-500 border-b border-slate-900 pb-1 mb-2 uppercase tracking-wide text-[9px] font-bold">Memory Tracer Logs:</div>
                    {simLog.map((line, idx) => (
                      <div key={idx} className="animate-fadeIn">
                        <span className="text-zinc-500">&gt; </span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Memory Visual Grid Display (Right) */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[440px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                  RAM PHYSICAL MEMORY VIEW
                </div>

                <div className="space-y-8 mt-6 grow flex flex-col justify-between">
                  
                  {/* Dynamic Slots */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wide">
                      <span>บล็อกหน่วยความจำเสมือน:</span>
                      {shiftDirection && (
                        <span className={`text-[10px] animate-pulse font-mono ${shiftDirection === 'right' ? 'text-indigo-400' : 'text-amber-400'}`}>
                          {shiftDirection === 'right' ? 'SHIFT RIGHTING...' : 'SHIFT LEFTING...'}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-4 gap-4 bg-slate-900/60 border border-slate-900 p-5 rounded-2xl">
                      {Array.from({ length: capacity }).map((_, idx) => {
                        const hasVal = idx < listItems.length;
                        const val = hasVal ? listItems[idx] : null;
                        const isActive = idx === activeCellIdx;
                        
                        let cellClass = 'border-slate-800 text-slate-650 bg-slate-950/20 border-dashed';
                        if (hasVal) {
                          cellClass = 'border-indigo-600 text-white bg-indigo-950/60 scale-100 shadow-[0_0_10px_rgba(79,70,229,0.1)]';
                        }
                        if (isActive) {
                          cellClass = 'border-teal-500 text-teal-300 bg-teal-950/80 scale-105 shadow-[0_0_15px_rgba(20,184,166,0.4)]';
                        }

                        return (
                          <div
                            key={idx}
                            className={`border rounded-2xl p-3 flex flex-col items-center justify-between min-h-[95px] transition-all duration-500 relative overflow-hidden
                              ${cellClass}`}
                          >
                            <span className="text-[9px] font-mono opacity-50">Addr 0x{1000 + idx * 4}</span>
                            <span className="font-mono font-bold text-[18px] my-1 tracking-wider">
                              {hasVal ? val : '-'}
                            </span>
                            
                            {/* Index tag */}
                            <span className="text-[10px] font-mono text-zinc-500">[{idx}]</span>

                            {/* Shift Arrow overlay */}
                            {shiftDirection === 'right' && hasVal && idx < listItems.length && (
                              <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-xs flex items-center justify-center animate-slideRight">
                                <ArrowRight className="w-5 h-5 text-indigo-400 animate-pulse" />
                              </div>
                            )}
                            {shiftDirection === 'left' && hasVal && (
                              <div className="absolute inset-0 bg-amber-950/40 backdrop-blur-xs flex items-center justify-center animate-slideLeft">
                                <ArrowRight className="w-5 h-5 text-amber-400 rotate-180 animate-pulse" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic Analysis Panel */}
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                    <h5 className="text-[12px] font-bold text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-teal-400" />
                      วิเคราะห์สถาปัตยกรรม (Memory Analysis):
                    </h5>
                    <p className="text-[12px] text-slate-400 leading-relaxed font-sans">
                      {listItems.length === 0 ? (
                        'รายการว่างเปล่า (Empty List) ไม่มีข้อมูลถูกจองในแรมดัชนีหลัก'
                      ) : (
                        `ปัจจุบันมีข้อมูลใช้งานจริง ${listItems.length} ช่อง ความจุสำรองทั้งหมด ${capacity} ช่อง โดยเกิดหน่วยความจำสูญเสียในรูปแรมสำรอง (Overhead) = ${(capacity - listItems.length) * 4} Bytes (หรือ ${capacity - listItems.length} ช่องว่างที่ไม่ได้ใช้งานแต่อัลโลเคตเก็บไว้เตรียม append)`
                      )}
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* ─── Section 4: Python List Syntax & Usage ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              คู่มือเขียนรหัสโปรแกรม
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              วิธีการใช้งานโครงสร้าง List ในภาษา Python
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            การประกาศใช้งานและจัดการข้อมูลของรายการ (List) ใน Python มีไวยากรณ์เรียบง่ายและเป็นระเบียบ โดยมีคำสั่งมาตรฐานที่สำคัญดังนี้:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "1. การประกาศค่าและเข้าถึง (Init & Access)",
                desc: "สร้างลิสต์เปล่าหรือลิสต์ที่มีค่าเริ่มต้น และอ้างอิงตำแหน่งด้วยดัชนี",
                code: `# สร้างลิสต์ที่มีสมาชิก\nnumbers = [10, 20, 30]\n\n# เข้าถึงดัชนี 1\nval = numbers[1]  # ได้ค่า 20`,
                accent: "indigo"
              },
              {
                title: "2. การเพิ่มและแทรกข้อมูล (Insert & Append)",
                desc: "ต่อท้ายข้อมูลด้วย append() หรือเลือกดัชนีที่จะแทรกด้วย insert()",
                code: `# ต่อท้ายสุด O(1)\nnumbers.append(40)\n\n# แทรกที่หน้าสุด O(n)\nnumbers.insert(0, 99)`,
                accent: "cyan"
              },
              {
                title: "3. การลบข้อมูล (Remove & Pop)",
                desc: "ลบตัวท้ายออกด้วย pop() หรือลบดัชนีที่ต้องการ หรือระบุลบด้วยค่าข้อมูล",
                code: `# ลบตัวท้ายสุด O(1)\nnumbers.pop()\n\n# ลบดัชนี 0 ออก O(n)\nnumbers.pop(0)`,
                accent: "emerald"
              }
            ].map((card, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-xl border border-slate-200/50 shadow-sm rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between min-h-[220px]">
                <div>
                  <h4 className="font-bold text-slate-800 text-[15px] leading-tight mb-1">{card.title}</h4>
                  <p className="text-[12.5px] text-slate-500 leading-relaxed mb-4">{card.desc}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl font-mono text-[11.5px] text-slate-700 leading-normal whitespace-pre">
                  <code>{card.code}</code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="ภารกิจท้ายบทเรียน: วิเคราะห์การใช้หน่วยความจำและสถิติของอาเรย์ยืดหยุ่น"
          taskText={`[โจทย์ปฏิบัติประจำวิชาโครงสร้างข้อมูลและอัลกอริทึม]

ให้นักเรียนวิเคราะห์ประสิทธิภาพของ List ในภาษา Python ตามข้อกำหนดดังนี้:

1. เขียนชุดคำสั่งโปรแกรมรับค่าคะแนนสอบของเพื่อนนักเรียนในห้องเรียน โดยให้เพิ่มเข้าลิสต์คะแนนทีละคนผ่าน append()
2. เขียนฟังก์ชัน calc_average_score(scores) วนลูปเพื่อคำนวณหาคะแนนเฉลี่ย และคืนค่าสถิตินั้นกลับออกมา
3. เขียนฟังก์ชัน remove_outliers(scores) เพื่อลบคะแนนที่ต่ำกว่าเกณฑ์เฉลี่ยออกทั้งหมดโดยใช้ pop() หรือ remove()
4. อธิบายเหตุผลพร้อมคอมเมนต์วิเคราะห์ความซับซ้อนเชิงเวลา (Time Complexity) ของฟังก์ชัน remove_outliers เปรียบเทียบกับการ append คะแนนในกรณีแย่ที่สุด (Worst Case) ด้วยสัญกรณ์ Big O พร้อมเขียนเปรียบเทียบคำอธิบายข้อดี-ข้อเสียให้เข้าใจง่ายที่สุด

ส่งงานโดยคัดลอกโจทย์ชุดนี้ไปตรวจสอบและส่งคำสั่งปฏิบัติการเพื่อวัดผลในห้องเรียน`}
        />

      </main>

    </div>
  );
}
