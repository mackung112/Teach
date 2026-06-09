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
  CheckCircle2,
  Info,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  Plus,
  Trash2,
  Sliders,
  HelpCircle
} from 'lucide-react';

export default function DSA1_4() {
  // ─── 1. Blobs for Layer 1 Background ──────────────────────────────────────
  const DSA1_4_BLOBS = [
    { color: 'bg-indigo-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-40' },
    { color: 'bg-cyan-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-35' },
    { color: 'bg-blue-200',    size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-violet-200', size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-25' }
  ];

  // ─── 2. Hash Table Data Definition ─────────────────────────────────────────
  const PRESET_KEYS = [
    { key: "gpa", val: "3.8", asciiSum: 312, hashIdx: 0, desc: "ดัชนี = 312 % 8 = 0" },
    { key: "name", val: "Mac", asciiSum: 282, hashIdx: 2, desc: "ดัชนี = 282 % 8 = 2" },
    { key: "age", val: "25", asciiSum: 301, hashIdx: 5, desc: "ดัชนี = 301 % 8 = 5" },
    { key: "tag", val: "staff", asciiSum: 316, hashIdx: 4, desc: "ดัชนี = 316 % 8 = 4 (ตำแหน่งปกติ)" },
    { key: "gat", val: "test", asciiSum: 316, hashIdx: 4, desc: "ดัชนี = 316 % 8 = 4 (ชนกับ tag! ต้องชนเลื่อนหาช่องว่าง)" }
  ];

  // ─── 3. Hash Table Simulator States ────────────────────────────────────────
  const [buckets, setBuckets] = useState(Array(8).fill(null)); // { key, val, asciiSum, probeCount }
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  
  // Animation states
  const [currentStep, setCurrentStep] = useState('idle'); // idle | math | check | collision | done
  const [inspectingIdx, setInspectingIdx] = useState(-1);
  const [simLog, setSimLog] = useState(['ระบบเตรียมพร้อมทดสอบแฮชตาราง']);
  const [isSimulating, setIsSimulating] = useState(false);

  const runInsertSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(false); // We control dynamically
    
    const item = PRESET_KEYS[selectedPresetIdx];
    
    // Check if key already exists
    const exists = buckets.find(b => b && b.key === item.key);
    if (exists) {
      setSimLog([`[เกิดข้อผิดพลาด] คีย์ "${item.key}" มีอยู่ใน Dictionary แล้ว คีย์ห้ามซ้ำซ้อนกัน!`]);
      return;
    }

    setIsSimulating(true);
    let logs = [`[เริ่มบันทึกคีย์] ทำการแฮชและบันทึกคีย์ "${item.key}" : "${item.val}"`];
    setSimLog([...logs]);

    // Step 1: Calculate ASCII sum
    setCurrentStep('math');
    logs.push(`1. คำนวณผลรวมรหัส ASCII ของอักขระ: ${item.key.split('').map(c => `${c}(${c.charCodeAt(0)})`).join(' + ')} = ${item.asciiSum}`);
    setSimLog([...logs]);

    setTimeout(() => {
      // Step 2: Modulo size (8)
      const idealIdx = item.hashIdx;
      logs.push(`2. คำนวณตำแหน่ง Ideal Index: ${item.asciiSum} % 8 = ${idealIdx}`);
      setSimLog([...logs]);
      setInspectingIdx(idealIdx);
      setCurrentStep('check');

      setTimeout(() => {
        // Step 3: Inspect bucket
        inspectBucketStep(idealIdx, idealIdx, item, 0, logs);
      }, 1500);

    }, 1500);
  };

  const inspectBucketStep = (idealIdx, currentIdx, item, probeCount, currentLogs) => {
    let logs = [...currentLogs];
    setInspectingIdx(currentIdx);

    const bucketVal = buckets[currentIdx];
    
    if (bucketVal === null) {
      // Slot is empty! Save here
      logs.push(`3. ตรวจสอบดัชนี ${currentIdx} -> ว่างเปล่า! จัดเก็บข้อมูลลงช่องนี้สำเร็จ`);
      if (probeCount > 0) {
        logs.push(`[แก้ไขสำเร็จ] ลำเลียงตัวแปรหลีกชนด้วยกรรมวิธี Linear Probing (ชนย้ายไป ${probeCount} ครั้ง)`);
      }
      setSimLog(logs);
      
      setBuckets(prev => {
        const next = [...prev];
        next[currentIdx] = {
          key: item.key,
          val: item.val,
          asciiSum: item.asciiSum,
          probeCount: probeCount
        };
        return next;
      });

      setCurrentStep('done');
      setIsSimulating(false);
      setInspectingIdx(-1);
    } else {
      // Collision!
      logs.push(`3. ตรวจสอบดัชนี ${currentIdx} -> ตรวจพบข้อมูลเดิม "${bucketVal.key}" (ชนกัน! Hash Collision)`);
      setCurrentStep('collision');
      setSimLog([...logs]);

      setTimeout(() => {
        // Probe next bucket
        const nextIdx = (currentIdx + 1) % 8;
        logs.push(`[เลื่อนหาช่อง] ขยับตรวจสอบช่องหน่วยความจำถัดไป: (${currentIdx} + 1) % 8 = ${nextIdx}`);
        setSimLog([...logs]);
        setCurrentStep('check');

        setTimeout(() => {
          inspectBucketStep(idealIdx, nextIdx, item, probeCount + 1, logs);
        }, 1500);

      }, 1500);
    }
  };

  const handleClearTable = () => {
    if (isSimulating) return;
    setBuckets(Array(8).fill(null));
    setSelectedPresetIdx(0);
    setCurrentStep('idle');
    setInspectingIdx(-1);
    setSimLog(['ระบบทำการล้างตารางแฮช สแตนด์บายตารางเปล่า']);
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={DSA1_4_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: What is a Dictionary ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              โครงสร้างคู่กุญแจและค่า
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงสร้างข้อมูลแบบ Dictionary คืออะไร
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              ในทางวิทยาการคอมพิวเตอร์ <strong className="mx-1 px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[14px]">Dictionary</strong> 
              (หรือ Hash Map ในภาษาอื่น) คือโครงสร้างข้อมูลแบบนามธรรมที่จับคู่ระหว่าง **กุญแจ (Key)** กับ **ค่าข้อมูล (Value)** 
              โดยเป้าหมายหลักคือต้องการค้นหาข้อมูลได้รวดเร็วทันทีโดยไม่ต้องวนลูปไล่หาทีละตัวเหมือน Array หรือ List
            </p>

            {/* Dictionary Properties */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <ConceptCard
                symbol="Key-Value"
                title="คู่กุญแจและค่า"
                description="จัดเก็บข้อมูลเป็นคู่เสมอ เช่น คีย์คือรหัสนักเรียน คู่กับค่าข้อมูลคือชื่อนักเรียน"
                accent="indigo"
              />
              <ConceptCard
                symbol="Unique Keys"
                title="คีย์ห้ามซ้ำซ้อน"
                description="คีย์ในหนึ่ง Dictionary ห้ามมีค่าซ้ำกันเด็ดขาด แต่ค่าข้อมูล (Values) สามารถซ้ำกันได้"
                accent="cyan"
              />
              <ConceptCard
                symbol="Hashable"
                title="คีย์ต้องไม่เปลี่ยนรูป"
                description="คีย์ต้องเป็นข้อมูลชนิดที่ไม่สามารถเปลี่ยนรูปได้ (Immutable/Hashable) เช่น String หรือ Number"
                accent="emerald"
              />
              <ConceptCard
                symbol="Fast Lookups"
                title="สืบค้นฉับไว O(1)"
                description="ระบบใช้แฮชฟังก์ชันคำนวณระบุตำแหน่งจัดเก็บได้โดยตรงในแรมโดยไม่ต้องวนรอบค้นหา"
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
              ข้อดีและข้อเสียของ Dictionary
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Pros card */}
            <div className="bg-emerald-50/60 backdrop-blur-md border border-emerald-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-[20px] font-bold text-emerald-950 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ข้อดีเด่นของ Dictionary
                </h4>
                <div className="space-y-4 text-[14.5px] text-slate-700 leading-relaxed font-sans">
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-1" />
                    <p>
                      <strong>ความเร็วสืบค้นสม่ำเสมอ $O(1)$ (Constant Time):</strong> ค้นหา เพิ่ม และลบข้อมูลได้ด้วยความเร็วคงที่ทันที ไม่ว่าปริมาณข้อมูลจะสเกลใหญ่ระดับล้านโหนดก็ตาม
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-1" />
                    <p>
                      <strong>โครงสร้างแบบกึ่งโครงสร้าง (Semi-structured):</strong> เก็บข้อมูลอธิบายลักษณะเฉพาะแบบจับกลุ่มได้ยืดหยุ่นกว่า Array ลำดับตัวเลข
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-100 text-xs font-semibold text-emerald-800 font-mono">
                RECOMMENDED FOR: INSTANT LOOKUPS & ID-VALUE ASSOCIATIONS
              </div>
            </div>

            {/* Cons card */}
            <div className="bg-rose-50/60 backdrop-blur-md border border-rose-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-[20px] font-bold text-rose-950 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-rose-500" />
                  ข้อเสียและข้อจำกัดของ Dictionary
                </h4>
                <div className="space-y-4 text-[14.5px] text-slate-700 leading-relaxed font-sans">
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-1" />
                    <p>
                      <strong>การสูญเสียพื้นที่แรมสำรอง (Memory Overhead):</strong> ตารางแฮชต้องจองพื้นที่แรมให้กว้างกว่าขนาดข้อมูลจริงค่อนข้างมาก เพื่อลดปัญหาแฮชชนกัน
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-1" />
                    <p>
                      <strong>ปัญหาแฮชชนกัน (Hash Collision):</strong> หากคำนวณตำแหน่งแล้วได้พิกัดช่องแรมเดียวกัน ระบบต้องมีกระบวนการแก้ไขที่ส่งผลให้ประสิทธิภาพความเร็วลดลงเหลือ $O(n)$ ชั่วคราว
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-rose-100 text-xs font-semibold text-rose-800 font-mono">
                LIMITATION: MEMORY OVERHEAD & HASH COLLISION RESOLUTION
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3: Interactive Hash Lab Simulator ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ตัวจำลองตารางแฮช
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ห้องทดลองวิเคราะห์กลไกแฮชและการชนกันของคีย์ (Hash Collision)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทดลองเพิ่มกุญแจข้อมูลลงในตารางแฮชขนาด 8 ช่องเสมือน โดยทดลองสั่งเพิ่มคีย์ปกติ และลองสั่งเพิ่มคีย์ที่แฮชได้ผลลัพธ์ดัชนีชนกัน 
            (เช่น <strong>"tag"</strong> กับ <strong>"gat"</strong>) เพื่อสังเกตขั้นตอนคำนวณและการตรวจสอบช่องแรมว่าง (Probing) แบบเป็นขั้นตอน:
          </p>

          <SimulatorShell
            dark
            title="Python Dictionary Hash Table & Probing Tracer"
            icon={<Cpu className="w-8 h-8 text-teal-400" />}
            glowColors="from-zinc-900/30 to-zinc-950/10"
            iconColor="text-teal-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Controller Panel (Left) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[460px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  CONTROLLER
                </div>

                <div className="space-y-6">
                  {/* Preset key selector */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">1. เลือกคีย์ข้อมูลที่จะแฮชลงหน่วยความจำ:</span>
                    <div className="flex flex-col gap-2">
                      {PRESET_KEYS.map((item, idx) => {
                        const isAdded = buckets.some(b => b && b.key === item.key);
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              if (!isSimulating) {
                                setSelectedPresetIdx(idx);
                                setCurrentStep('idle');
                              }
                            }}
                            disabled={isSimulating}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 flex justify-between items-center text-xs font-semibold
                              ${selectedPresetIdx === idx
                                ? 'bg-indigo-650 border-indigo-500 text-white shadow shadow-indigo-500/20'
                                : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-white'
                              }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold">"{item.key}" : "{item.val}"</span>
                              {isAdded && <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">ADDED</span>}
                            </div>
                            <span className="text-[10px] opacity-75 font-mono text-teal-400">{item.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Simulation Control Buttons */}
                <div className="mt-8 pt-4 border-t border-slate-800 space-y-4">
                  <div className="flex gap-3">
                    <button
                      onClick={runInsertSimulation}
                      disabled={isSimulating}
                      className="grow bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98] transition-all disabled:opacity-45"
                    >
                      {isSimulating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> กำลังตรวจสอบระบบ...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" /> สั่งจำลองการแฮชบันทึก
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleClearTable}
                      disabled={isSimulating}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-40"
                    >
                      <RotateCcw className="w-4 h-4" /> ล้างตาราง
                    </button>
                  </div>

                  {/* Terminal Console Logs */}
                  <div className="bg-black/60 p-3.5 rounded-xl border border-slate-950 min-h-[120px] font-mono text-[11.5px] leading-relaxed text-teal-400 select-all overflow-y-auto max-h-[170px]">
                    <div className="text-zinc-500 border-b border-slate-900 pb-1 mb-2 uppercase tracking-wide text-[9px] font-bold">Hash Trace Output console:</div>
                    {simLog.map((line, idx) => (
                      <div key={idx} className="animate-fadeIn">
                        <span className="text-zinc-500">&gt; </span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Hash Table Visual Grid Display (Right) */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[460px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                  HASH BUCKETS TABLE VIEW
                </div>

                <div className="space-y-4 mt-6 grow flex flex-col justify-between">
                  
                  {/* Dynamic Slots */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">ตารางความจุหน่วยความจำ (Hash buckets [0-7]):</span>
                    
                    <div className="flex flex-col gap-2 bg-slate-900/40 border border-slate-900 p-4 rounded-xl">
                      {buckets.map((b, idx) => {
                        const isInspecting = idx === inspectingIdx;
                        const hasVal = b !== null;
                        
                        let cellClass = 'border-slate-800 bg-slate-950/20 text-slate-600 border-dashed';
                        if (hasVal) {
                          cellClass = 'border-indigo-650 bg-indigo-950/40 text-white';
                        }
                        if (isInspecting) {
                          if (currentStep === 'collision') {
                            cellClass = 'border-rose-500 bg-rose-950/60 text-rose-300 scale-[1.01] shadow-[0_0_10px_rgba(239,68,68,0.3)]';
                          } else {
                            cellClass = 'border-teal-500 bg-teal-950/60 text-teal-300 scale-[1.01] shadow-[0_0_12px_rgba(20,184,166,0.3)]';
                          }
                        }

                        return (
                          <div
                            key={idx}
                            className={`border rounded-xl p-2.5 flex items-center justify-between text-xs font-mono transition-all duration-300
                              ${cellClass}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-slate-500">[{idx}]</span>
                              {hasVal ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-teal-400 font-bold">"{b.key}"</span>
                                  <span className="text-slate-400 font-sans">➔</span>
                                  <span className="text-indigo-200">"{b.val}"</span>
                                </div>
                              ) : (
                                <span className="text-slate-600 font-sans italic">-- ว่างเปล่า --</span>
                              )}
                            </div>

                            {hasVal && (
                              <div className="flex items-center gap-2 text-[10px] opacity-60">
                                <span>ASCII: {b.asciiSum}</span>
                                {b.probeCount > 0 && <span className="text-amber-400 font-bold bg-amber-950/60 px-1 rounded">PROBED +{b.probeCount}</span>}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Math Formula Bar */}
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-[11px] leading-relaxed text-slate-400">
                    <span className="text-teal-400 font-bold block mb-1">คณิตศาสตร์การแฮช (Mathematical formula bar):</span>
                    {currentStep === 'idle' ? (
                      'สแตนด์บายคำนวณ: เลือก preset คีย์แล้วกดปุ่มสั่งประมวลผลแฮชบันทึก'
                    ) : (
                      <div>
                        <span>Hash function: </span>
                        <code className="text-white">index = (sum of ASCII codes of key) % table_size</code>
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* ─── Section 4: Python Dictionary Syntax & Usage ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              คู่มือเขียนรหัสโปรแกรม
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              วิธีการใช้งานโครงสร้าง Dictionary ในภาษา Python
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            การประกาศและใช้คู่กุญแจและค่าข้อมูลมีรูปแบบที่เข้าใจง่าย พร้อมเมธอดมาตรฐานในการเข้าถึงออบเจกต์ภายในดังนี้:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "1. การประกาศและดึงข้อมูล (Init & Read)",
                desc: "ใช้ปีกกา {} ประกาศคู่ข้อมูล และดึงค่าผ่านคีย์ตรงๆ",
                code: `# สร้าง Dictionary\nuser = {"name": "Mac", "age": 25}\n\n# ดึงข้อมูลผ่านคีย์ตรงๆ O(1)\nprint(user["name"])  # ได้ค่า "Mac"`,
                accent: "indigo"
              },
              {
                title: "2. การเพิ่มและแก้ไขข้อมูล (Insert & Update)",
                desc: "อ้างอิงคีย์เพื่อกำหนดค่าใหม่ หากคีย์นั้นยังไม่มีระบบจะเพิ่มเข้าให้ทันที",
                code: `# แก้ไขข้อมูล O(1)\nuser["age"] = 26\n\n# เพิ่มคีย์-ค่าใหม่ O(1)\nuser["gpa"] = 3.8`,
                accent: "cyan"
              },
              {
                title: "3. เมธอดสืบค้นข้อมูล (Iterate dict)",
                desc: "ดึงคีย์ทั้งหมด ดึงค่าทั้งหมด หรือดึงค่าแบบทีละคู่เพื่อวนลูปใช้งาน",
                code: `# ดึงคีย์ทั้งหมด\nkeys = user.keys()\n\n# วนลูปจับคู่\nfor k, v in user.items():\n    print(f"Key: {k}, Val: {v}")`,
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
          title="ภารกิจท้ายบทเรียน: สร้างสคริปต์ตรวจจับพจนานุกรมและความความซับซ้อนเชิงสืบค้น"
          taskText={`[โจทย์ปฏิบัติประจำวิชาโครงสร้างข้อมูลและอัลกอริทึม]

ให้นักเรียนสร้างระบบจำลองฐานข้อมูลประวัตินักเรียนขนาดมินิด้วยภาษา Python โดยปฏิบัติภารกิจต่อไปนี้:

1. ประกาศตัวแปรประเภท Dictionary เพื่อจัดเก็บคีย์เป็น รหัสนักเรียน (Student ID - เช่น "S001") จับคู่กับออบเจกต์ประวัตินักเรียน (ประกอบด้วย ชื่อ-นามสกุล, คะแนนสอบ)
2. เขียนฟังก์ชัน search_student_details(database, target_id) ค้นหาประวัติของนักเรียนตามรหัสที่กำหนด
3. ดักจับข้อผิดพลาด (Exception Handling / KeyCheck) หากไม่พบรหัสนักเรียนในพจนานุกรม ให้พิมพ์แจ้งเตือนเป็นข้อความ "ไม่พบรหัสประจำตัวที่ระบุ" โดยมีตัวจับทางความปลอดภัย
4. เขียนคำอธิบายเปรียบเทียบในเชิงความเร็ววิเคราะห์ Big O Notation ในการค้นหาผ่านรหัส Student ID ด้วย Dictionary เปรียบเทียบกับการสืบค้นแบบเชิงเส้นผ่านรายชื่อนักเรียนด้วย List ธรรมดาในกรณี Worst Case

ส่งงานโดยนำชุดคำสั่งรหัสโปรแกรมทั้งหมดนำมาเขียนอธิบายสรุปตรรกะร่วมกันในชั้นเรียน`}
        />

      </main>

    </div>
  );
}
