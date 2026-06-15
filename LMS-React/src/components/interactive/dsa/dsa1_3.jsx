import React, { useState } from 'react';
import { 
  Layers, 
  Database, 
  HelpCircle, 
  Play, 
  RotateCcw, 
  ArrowRight, 
  Cpu, 
  Shield, 
  Sparkles, 
  Sliders, 
  Code,
  Terminal,
  Activity,
  Plus,
  Minus,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  SimulatorShell, 
  ConceptCard, 
  AmbientBackdrop,
  ConsoleScreen,
  QuizEngine
} from '../shared';

// Custom CSS animations for flow lines and glowing effects
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes float-subtle {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
      100% { transform: translateY(0px); }
    }
    @keyframes flow-line-dsa {
      to {
        stroke-dashoffset: -40;
      }
    }
    @keyframes pulse-indigo-glow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.7)); }
    }
    @keyframes pulse-emerald-glow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.8)); }
    }
    .animate-float-subtle { animation: float-subtle 4s ease-in-out infinite; }
    .animate-flow-line-dsa { animation: flow-line-dsa 1.2s linear infinite; }
    .animate-pulse-indigo-glow { animation: pulse-indigo-glow 1.5s ease-in-out infinite; }
    .animate-pulse-emerald-glow { animation: pulse-emerald-glow 1.2s ease-in-out infinite; }
  `}} />
);

export default function DSA1_3() {
  // ─── Layer 1: Ambient Background Blobs (Indigo/Emerald Theme) ───
  const blobs = [
    { color: 'bg-indigo-200',   size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-30' },
    { color: 'bg-emerald-100',  size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-25' },
    { color: 'bg-sky-200',      size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-25' },
    { color: 'bg-slate-200',    size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-20' }
  ];

  // ─── State for Tuple vs List Simulator ───
  const [selectedStructure, setSelectedStructure] = useState('List'); // List | Tuple
  const [selectedOperation, setSelectedOperation] = useState('Append'); // Append | Modify | Delete
  const [listItems, setListItems] = useState(['Red', 'Green', 'Blue']);
  const [tupleItems, setTupleItems] = useState(['Red', 'Green', 'Blue']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(-1); // -1: idle, 0: API Interface, 1: Logic Control, 2: RAM Write, 3: Complete/Error
  const [terminalLogs, setTerminalLogs] = useState(['[SYSTEM READY] แพลตฟอร์มจำลองความแตกต่าง Mutability (Tuple vs List) พร้อมทำงานแล้ว']);
  const [hasError, setHasError] = useState(false);
  const [inputVal, setInputVal] = useState('Yellow');

  // List: base empty size 56 bytes + 8 bytes per allocated capacity slot (start with 4)
  // Tuple: base empty size 40 bytes + 8 bytes per item (exactly 3)
  const getCapacityAndBytes = (structure, items) => {
    if (structure === 'List') {
      const len = items.length;
      let capacity = 4;
      if (len > 4) capacity = 8;
      if (len > 8) capacity = 16;
      const bytes = 56 + 8 * capacity;
      return { capacity, bytes };
    } else {
      // Tuple: size is exact to the element size
      const bytes = 40 + 8 * items.length;
      return { capacity: items.length, bytes };
    }
  };

  const handleRunOperation = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setHasError(false);
    setActiveStep(0);

    const targetItems = selectedStructure === 'List' ? listItems : tupleItems;

    // Operation strings for logging
    let cmdString = '';
    if (selectedStructure === 'List') {
      if (selectedOperation === 'Append') cmdString = `my_list.append('${inputVal}')`;
      if (selectedOperation === 'Modify') cmdString = `my_list[1] = 'Cyan'`;
      if (selectedOperation === 'Delete') cmdString = `my_list.pop()`;
    } else {
      if (selectedOperation === 'Append') cmdString = `my_tuple + ('${inputVal}',)`;
      if (selectedOperation === 'Modify') cmdString = `my_tuple[1] = 'Cyan'`;
      if (selectedOperation === 'Delete') cmdString = `del my_tuple[-1]`;
    }

    setTerminalLogs([
      `>>> ${cmdString}`,
      `[STEP 1 - API CALL] ส่งคำขอปฏิบัติการระดับผู้ใช้เข้าสู่อินเตอร์เฟซประเภทข้อมูล`
    ]);

    // Step 1: Logic Verification
    setTimeout(() => {
      setActiveStep(1);
      if (selectedStructure === 'List') {
        setTerminalLogs(prev => [
          ...prev,
          `[STEP 2 - LOGIC CONTROL] โครงสร้างแบบ Mutable (List) รองรับการเขียนทับ/เปลี่ยนแปลง`,
          `[STEP 2 - LOGIC CONTROL] ตรวจสอบขีดความสามารถการจัดสรร (Capacity: ${getCapacityAndBytes('List', targetItems).capacity} ช่อง)`
        ]);
      } else {
        // Tuple
        if (selectedOperation === 'Append') {
          setTerminalLogs(prev => [
            ...prev,
            `[STEP 2 - LOGIC CONTROL] การต่อข้อมูล Tuple จำเป็นต้องคัดลอกค่าและคืนค่าวัตถุใหม่ชิ้นอื่น (New Tuple Created)`,
            `[STEP 2 - LOGIC CONTROL] ระบบจะทำการจัดสรรพื้นที่แรมแยกส่วนต่างหากเป็น O(n)`
          ]);
        } else {
          // Modify / Delete
          setHasError(true);
          setTerminalLogs(prev => [
            ...prev,
            `[❌ ERROR CONTROL] โครงสร้างแบบ Immutable (Tuple) ไม่รองรับการเขียนข้อมูลทับในตำแหน่งเดิม!`,
            `[❌ ERROR CONTROL] ระบบแจ้งบล็อกการเข้าถึง (Access Violation) และโยนข้อผิดพลาด`
          ]);
        }
      }
    }, 1200);

    // Step 2: RAM Write or Abort
    setTimeout(() => {
      setActiveStep(2);
      if (selectedStructure === 'List') {
        setTerminalLogs(prev => [
          ...prev,
          `[STEP 3 - PHYSICAL WRITE] กำลังดำเนินการบันทึกข้อมูลและอัปเดตสมาชิกลงหน่วยความจำหลัก`,
          `[STEP 3 - PHYSICAL WRITE] เขียนค่าลงในตำแหน่ง Heap Address สำเร็จเรียบร้อย`
        ]);

        // Execute changes on List
        if (selectedOperation === 'Append') {
          setListItems(prev => [...prev, inputVal]);
        } else if (selectedOperation === 'Modify') {
          setListItems(prev => {
            const next = [...prev];
            if (next.length > 1) next[1] = 'Cyan';
            return next;
          });
        } else if (selectedOperation === 'Delete') {
          setListItems(prev => prev.slice(0, -1));
        }
      } else {
        // Tuple
        if (selectedOperation === 'Append') {
          setTerminalLogs(prev => [
            ...prev,
            `[STEP 3 - PHYSICAL WRITE] จองที่ว่างใหม่เพื่อสร้างวัตถุใหม่ใน Heap RAM`,
            `[STEP 3 - PHYSICAL WRITE] ย้ายข้อมูลสมาชิกเก่าไปรวมกับตัวต่อท้ายในพิกัดใหม่สำเร็จ`
          ]);
          setTupleItems(prev => [...prev, inputVal]);
        } else {
          // Modify / Delete (Error state)
          setTerminalLogs(prev => [
            ...prev,
            `[⚠️ ABORTED] การเขียนลงหน่วยความจำล้มเหลว: โล่ป้องกัน Immutable Lock ทำงาน`,
            `[⚠️ ABORTED] ยกเลิกคำสั่ง (No modification permitted on Heap)`
          ]);
        }
      }
    }, 2400);

    // Step 3: Complete / Show Traceback
    setTimeout(() => {
      setActiveStep(3);
      if (selectedStructure === 'List') {
        setTerminalLogs(prev => [
          ...prev,
          `[STEP 4 - DONE] การทำงานเสร็จสมบูรณ์: สถานะ List ถูกเปลี่ยนสภาพเรียบร้อย`
        ]);
        setIsProcessing(false);
      } else {
        if (selectedOperation === 'Append') {
          setTerminalLogs(prev => [
            ...prev,
            `[STEP 4 - DONE] การรวมตัวแปร Tuple ใหม่เสร็จสมบูรณ์`
          ]);
          setIsProcessing(false);
        } else {
          // Error Traceback (Show actual Python errors)
          const errorMsg = selectedOperation === 'Modify'
            ? `TypeError: 'tuple' object does not support item assignment`
            : `TypeError: 'tuple' object does not support item deletion`;
          setTerminalLogs(prev => [
            ...prev,
            `Traceback (most recent call last):`,
            `  File "<stdin>", line 1, in <module>`,
            `${errorMsg}`
          ]);
          setIsProcessing(false);
        }
      }
    }, 3600);
  };

  const handleResetSimulator = () => {
    setListItems(['Red', 'Green', 'Blue']);
    setTupleItems(['Red', 'Green', 'Blue']);
    setActiveStep(-1);
    setHasError(false);
    setTerminalLogs(['[SYSTEM RESET] รีเซ็ตโครงสร้างและขนาดตัวอย่างหน่วยความจำสู่สภาวะเริ่มต้น']);
    setIsProcessing(false);
  };

  // ─── Quiz Engine Configurations ───
  const quizLevels = [
    {
      title: "คุณสมบัติพื้นฐานของ Tuple",
      desc: "ข้อใดคือคุณสมบัติหลักที่ทำให้โครงสร้างข้อมูลแบบทิวเพิล (Tuple) แตกต่างจากโครงสร้างข้อมูลแบบรายการ (List)",
      options: [
        { key: "A", text: "เป็นแบบมิวเทเบิล (Mutable) ที่แก้ไข เพิ่ม หรือลดข้อมูลสมาชิกในจุดเดิมได้เสรี", isCorrect: false },
        { key: "B", text: "เป็นแบบอิมมิวเทเบิล (Immutable) ที่เมื่อสร้างแล้วจะไม่สามารถแก้ไขสมาชิกภายในได้", isCorrect: true },
        { key: "C", text: "ไม่รักษาลำดับข้อมูล (Unordered) และไม่ยินยอมให้มีข้อมูลสมาชิกที่ซ้ำซ้อนกันได้", isCorrect: false },
        { key: "D", text: "สามารถเรียกอ่านข้อมูลได้รวดเร็วกว่าโครงสร้างข้อมูลประเภทอื่นถึง 100 เท่าเสมอ", isCorrect: false }
      ],
      tip: "คำว่า Immutable (อิมมิวเทเบิล) หมายถึงการคงที่ของโครงสร้างและข้อมูลภายใน ทำให้สิทธิ์การเขียนทับถูกล็อกอย่างถาวร"
    },
    {
      title: "การประกาศตัวแปร Tuple สมาชิกเดี่ยว",
      desc: "ในภาษา Python หากต้องการสร้างตัวแปร Tuple ที่เก็บข้อมูลสมาชิกตัวเดียวคือสตริง 'A' ข้อใดคือรูปแบบการเขียนรหัสคำสั่งที่ถูกต้อง",
      options: [
        { key: "A", text: "my_tuple = ('A')", isCorrect: false },
        { key: "B", text: "my_tuple = tuple['A']", isCorrect: false },
        { key: "C", text: "my_tuple = ('A',)", isCorrect: true },
        { key: "D", text: "my_tuple = define tuple('A')", isCorrect: false }
      ],
      tip: "การเขียน Tuple สมาชิกตัวเดียวจำเป็นต้องใส่เครื่องหมายจุลภาค (Comma) ท้ายสุด เผื่อให้ตัวแปรภาษา Python เข้าใจว่าไม่ใช่วงเล็บคณิตศาสตร์ปกติ"
    },
    {
      title: "ประสิทธิภาพและการใช้หน่วยความจำ",
      desc: "เหตุใด Tuple จึงประหยัดหน่วยความจำแรม (RAM) มากกว่าโครงสร้างข้อมูลแบบ List ในการเก็บค่าชุดเดียวกัน",
      options: [
        { key: "A", text: "เนื่องจาก Tuple จัดสรรพื้นที่คงที่พอดีตัวเลขสมาชิก โดยไม่มี Overhead เผื่อขยายขนาด (Dynamic capacity buffer)", isCorrect: true },
        { key: "B", text: "เนื่องจาก Tuple นำข้อมูลไปเก็บบันทึกบนพื้นที่ฮาร์ดดิสก์แบบออฟไลน์", isCorrect: false },
        { key: "C", text: "เนื่องจาก Tuple ไม่สามารถประมวลผลข้อมูลที่มีลักษณะเป็นสายอักขระ (String) ได้", isCorrect: false },
        { key: "D", text: "เนื่องจาก Tuple จะส่งข้อมูลไปประมวลผลบนการ์ดแสดงผลกราฟิก (GPU) เสมอ", isCorrect: false }
      ],
      tip: "List จัดสรรหน่วยความจำแบบ Dynamic Array ซึ่งต้องคอยคัดลอกและจองความจุเผื่อขยาย (Overallocation Buffer) ทำให้ใช้แรมมากกว่า Tuple ที่เป็น Static Array"
    },
    {
      title: "การประยุกต์ใช้ Tuple ในฐานะ Key",
      desc: "ข้อใดถือเป็นประโยชน์สูงสุดของการมีพฤติกรรมแบบคงที่ (Immutable) ของ Tuple ในการสถาปนาระบบฐานข้อมูลระดับสูง",
      options: [
        { key: "A", text: "สามารถนำ Tuple ไปจัดเรียงข้อมูลด้วยความชันเชิงเส้น O(1)", isCorrect: false },
        { key: "B", text: "สามารถนำ Tuple ไปใช้เป็น Key ใน Dictionary หรือสมาชิกใน Set ได้เพราะเป็นออบเจกต์ประเภท Hashable", isCorrect: true },
        { key: "C", text: "ช่วยเพิ่มปริมาณการดาวน์โหลดข้อมูลข้ามเครือข่ายอินเทอร์เน็ตได้ราบรื่นขึ้น", isCorrect: false },
        { key: "D", text: "ทำให้ตัวแปลภาษา Python เปลี่ยนระบบเป็นโปรแกรมสแตนด์อโลน (Executable File) ได้ทันที", isCorrect: false }
      ],
      tip: "ในการใช้โครงสร้าง Hash Table ค่าคีย์ต้องมีเสถียรภาพคงที่ (Hashable) โดย List (Mutable) จะไม่อนุญาตให้นำมาใช้เป็นคีย์ได้เด็ดขาด"
    }
  ];

  const pythonCode = `# 1. การสร้างและประกาศตัวแปรทิวเพิล (Tuple Creation)
student_record = ("Mack", 28, "Computer Engineering")
single_element = (99,)  # ต้องมีเครื่องหมายจุลภาคต่อท้ายเสมอสำหรับสมาชิกเดี่ยว

# 2. การเข้าถึงสมาชิกผ่านค่าดัชนี (Index Access)
name = student_record[0]  # ผลลัพธ์: "Mack"
age = student_record[1]   # ผลลัพธ์: 28

# 3. การกระจายค่าตัวแปรในบรรทัดเดียว (Tuple Unpacking)
name, age, department = student_record
print(f"ชื่อ: {name}, อายุ: {age}, แผนกวิชา: {department}")

# 4. เมธอดมาตรฐานการสืบค้นข้อมูลใน Tuple
scores = (95, 80, 95, 100)
num_95 = scores.count(95)   # ผลลัพธ์: 2 (นับจำนวนข้อมูล 95 ในทิวเพิล)
pos_80 = scores.index(80)   # ผลลัพธ์: 1 (หาดัชนีตำแหน่งแรกของ 80)

# 5. การจำลองข้อผิดพลาดเมื่อพยายามแก้ไขข้อมูล (TypeError)
try:
    student_record[1] = 29  # พยายามแก้ไขอายุเป็น 29
except TypeError as error:
    print(f"ขัดข้องตามระบบความปลอดภัย: {error}")
    # ผลลัพธ์: TypeError: 'tuple' object does not support item assignment`;

  return (
    <div className="font-sans text-slate-800 pb-24 relative" id="dsa1_3-component-root">
      <CustomStyles />

      {/* Layer 1: Ambient Background Blobs */}
      <AmbientBackdrop blobs={blobs} />

      {/* Layer 3: Main Page Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10" id="main-content-layout">

        {/* Section 1: Intro to Tuple */}
        <section className="space-y-6" aria-labelledby="section-intro-title">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              วิทยาการคอมพิวเตอร์และชนิดข้อมูลพื้นฐาน
            </span>
            <h2 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1" id="section-intro-title">
              โครงสร้างข้อมูลแบบทิวเพิล (Tuple) และการล็อกข้อมูลในหน่วยความจำ
            </h2>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ในการเขียนโปรแกรมระดับวิศวกรรมคอมพิวเตอร์ <span className="mx-1 px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200/50 text-indigo-700 font-mono text-[14px]">Tuple</span> คือโครงสร้างข้อมูลประเภทเรียงลำดับดัชนี (Sequence) ที่มีคุณสมบัติเฉพาะตัวคือเป็น <strong>อิมมิวเทเบิล (Immutable)</strong> หรือไม่สามารถเปลี่ยนสภาพข้อมูลและโครงสร้างได้ภายหลังการสถาปนาขึ้นในหน่วยความจำ แตกต่างจากโครงสร้างข้อมูลแบบรายการ (List) ที่มีความลื่นไหลเป็นมิวเทเบิล (Mutable):
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="tuple-properties-cards">
            <ConceptCard
              symbol="Immutable"
              title="สิทธิ์แบบอ่านอย่างเดียว"
              description="เมื่อข้อมูลถูกเขียนลง Heap Memory แล้ว จะไม่สามารถลบ แก้ไข หรือเพิ่มสมาชิกแทรกระหว่างแถวได้อีก"
              accent="indigo"
            />
            <ConceptCard
              symbol="Ordered"
              title="การรักษาลำดับดัชนี"
              description="ระบุพิกัดสมาชิกด้วยระบบดัชนีแบบ 0-based index โดยตำแหน่งและทิศทางการจัดเรียงจะคงที่เสมอ"
              accent="sky"
            />
            <ConceptCard
              symbol="Hetero"
              title="เก็บข้อมูลหลากหลายประเภท"
              description="สามารถจัดเก็บสมาชิกร่วมกันที่มีชนิดข้อมูลต่างกันได้ในหนึ่ง Tuple เช่น สตริง บูลีน หรือออบเจกต์"
              accent="emerald"
            />
            <ConceptCard
              symbol="Hashable"
              title="การตรวจสอบเสถียรภาพคีย์"
              description="การันตีความมั่นคงของค่าข้อมูล ทำให้สามารถนำไปจัดทำคีย์ในพจนานุกรม (Dict Key) ได้ปลอดภัย"
              accent="purple"
            />
          </div>
        </section>

        {/* Section 2: Pros & Cons of Tuple */}
        <section className="space-y-6" aria-labelledby="section-proscons-title">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              การประเมินโครงสร้างวิศวกรรมซอฟต์แวร์
            </span>
            <h3 className="text-[24px] font-semibold text-zinc-900 leading-tight mt-1" id="section-proscons-title">
              วิเคราะห์เปรียบเทียบข้อดีและข้อเสียของโครงสร้างข้อมูล Tuple
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="proscons-details-container">
            {/* Pros card */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3px] border-l-emerald-500/80">
              <span className="text-sm font-mono font-bold text-emerald-600 uppercase tracking-widest block mb-3">🟢 ADVANTAGES / ข้อดีเด่นชัด</span>
              <ul className="space-y-3.5">
                {[
                  "มีความเร็วในการเรียกอ่านและประมวลผลข้อมูลสูงกว่า List เล็กน้อยเนื่องจากตรรกะระบบไม่ยุ่งยาก",
                  "ประหยัดพื้นที่หน่วยความจำแรม (RAM Allocation) ได้อย่างยอดเยี่ยม เพราะตัดความจุส่วนเกินสำรองออก 100%",
                  "ความปลอดภัยของข้อมูลสูง (Data Integrity) ป้องกันข้อผิดพลาดจากการเผลอเขียนทับโดยไม่ได้รับอนุญาต",
                  "สามารถแฮชค่าข้อมูลได้คงที่ (Hashable) นำไปใช้เป็น Key ของ Dictionary หรือลงทะเบียนใน Set ได้ปลอดภัย"
                ].map((item, idx) => (
                  <li key={idx} className="text-[14px] md:text-[15px] text-slate-700 leading-relaxed flex items-start gap-2.5">
                    <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons card */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3px] border-l-rose-500/80">
              <span className="text-sm font-mono font-bold text-rose-600 uppercase tracking-widest block mb-3">🔴 DISADVANTAGES / ข้อจำกัดการทำงาน</span>
              <ul className="space-y-3.5">
                {[
                  "ขาดความยืดหยุ่นในการเขียนตรรกะ เนื่องจากไม่สนับสนุนเมธอดปรับขนาดข้อมูล เช่น append, insert, หรือ pop",
                  "หากจำเป็นต้องแก้ไขข้อมูล ต้องเสียเวลาทำซ้ำด้วยการแปลงโครงสร้างเป็น List เพื่อแก้ไข หรือจองแรมสถาปนาตัวใหม่ขึ้นมาทดแทน",
                  "อาจสร้างความสับสนและเป็นอุปสรรคต่อการปรับปรุงระบบ (Maintenance) หากนำไปใช้งานในที่ที่ความต้องการระบบมีการปรับเปลี่ยนบ่อย",
                  "มีเมธอดให้เรียกประมวลผลแบบเบ็ดเสร็จในภาษาน้อยมาก (มีเพียง count และ index เป็นเครื่องมือจำกัด)"
                ].map((item, idx) => (
                  <li key={idx} className="text-[14px] md:text-[15px] text-slate-700 leading-relaxed flex items-start gap-2.5">
                    <ArrowRight className="w-4 h-4 text-rose-500 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── Section: Summary of Basic Tuple Methods ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              คู่มือวิทยาการคำนวณ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              สรุปคำสั่งและฟังก์ชันพื้นฐานในการจัดการทิวเพิล (Tuple Methods Summary)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            เนื่องจากทิวเพิลเป็นประเภทข้อมูลแบบคงที่ (Immutable) เมธอดพื้นฐานในการจัดการข้อมูลจึงมีอย่างจำกัด โดยมีคำสั่งหลักที่ใช้สืบค้นและดำเนินงานดังนี้:
          </p>

          <div className="flex flex-col gap-3.5">
            {[
              {
                method: "len(tuple)",
                desc: "ฟังก์ชันตรวจสอบจำนวนสมาชิกทั้งหมดที่มีอยู่ใน Tuple",
                complexity: "O(1) constant time",
                theme: "border-l-indigo-500 bg-indigo-50/40 text-indigo-950",
                badge: "text-indigo-700 bg-indigo-100"
              },
              {
                method: "tuple.count(x)",
                desc: "นับจำนวนข้อมูล x ทั้งหมดที่มีอยู่ใน Tuple",
                complexity: "O(n) linear time",
                theme: "border-l-sky-500 bg-sky-50/40 text-sky-950",
                badge: "text-sky-700 bg-sky-100"
              },
              {
                method: "tuple.index(x)",
                desc: "ค้นหาและคืนค่าตำแหน่งดัชนีตัวแรกที่ตรวจพบข้อมูล x (หากไม่พบจะเกิด ValueError)",
                complexity: "O(n) linear time",
                theme: "border-l-violet-500 bg-violet-50/40 text-violet-950",
                badge: "text-violet-700 bg-violet-100"
              },
              {
                method: "tuple1 + tuple2",
                desc: "สั่งรวมข้อมูลทิวเพิลสองตัวเข้าด้วยกัน เพื่อสถาปนาวัตถุ Tuple ใหม่แยกออกมา",
                complexity: "O(n1 + n2) linear time",
                theme: "border-l-emerald-500 bg-emerald-50/40 text-emerald-950",
                badge: "text-emerald-700 bg-emerald-100"
              }
            ].map((m, idx) => (
              <div key={idx} className={`p-4 md:p-5 rounded-2xl border border-slate-200 border-l-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${m.theme}`}>
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 grow">
                  <span className={`inline-block font-mono text-[14px] font-bold px-3 py-1 rounded-lg ${m.badge} shrink-0 w-fit`}>
                    {m.method}
                  </span>
                  <p className="text-[15px] leading-relaxed opacity-95">{m.desc}</p>
                </div>
                <div className="text-[11px] font-mono opacity-70 uppercase font-bold tracking-wider pt-2 md:pt-0 border-t md:border-t-0 border-slate-200/60 md:pl-5 md:border-l border-slate-200/60 shrink-0">
                  Time Complexity: <span className="font-semibold text-slate-800">{m.complexity}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Dynamic Mutability & Memory Allocation Simulator */}
        <section className="space-y-6" aria-labelledby="section-simulator-title">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ตัวจำลองระดับวิศวกรรมสถาปัตยกรรมหน่วยความจำ
            </span>
            <h3 className="text-[24px] font-semibold text-zinc-900 leading-tight mt-1" id="section-simulator-title">
              บอร์ดทดสอบสิทธิเขียนและเปรียบเทียบขนาดแรม (Tuple vs List Memory Allocation)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ทดลองจำลองการทำธุรกรรมลงสู่หน่วยความจำ โดยเลือกว่าจะกระทำลงบน <strong>List (Mutable)</strong> หรือ <strong>Tuple (Immutable)</strong> จากนั้นระบุเมธอดความต้องการการจัดการ เพื่อติดตามกระบวนการไหลและสังเกตพฤติกรรมในหน่วยประมวลผล และดูขนาดไบต์ตามจริงในหน่วยความจำ RAM:
          </p>

          <SimulatorShell
            dark
            title="Mutability & Memory Footprint Sandbox"
            icon={<Sliders className="w-8 h-8 text-indigo-400" />}
            glowColors="from-slate-900/30 to-indigo-950/20"
            iconColor="text-indigo-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4" id="sim-panels-grid">
              
              {/* Left Column: Control Panel */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[480px]" id="sim-control-panel">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">COMPILE TERMINAL</span>
                
                <div className="space-y-5">
                  {/* Select Structure */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">1. เลือกประเภทโครงสร้างหน่วยความจำเป้าหมาย:</span>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => { if (!isProcessing) setSelectedStructure('List'); }}
                        disabled={isProcessing}
                        id="btn-select-list"
                        className={`py-2 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all flex items-center justify-center gap-1.5
                          ${selectedStructure === 'List'
                            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                            : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-700'
                          }`}
                      >
                        <Unlock className="w-3.5 h-3.5" /> List (Mutable)
                      </button>
                      <button
                        onClick={() => { if (!isProcessing) setSelectedStructure('Tuple'); }}
                        disabled={isProcessing}
                        id="btn-select-tuple"
                        className={`py-2 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all flex items-center justify-center gap-1.5
                          ${selectedStructure === 'Tuple'
                            ? 'border-indigo-500 bg-indigo-950/40 text-indigo-300'
                            : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-700'
                          }`}
                      >
                        <Lock className="w-3.5 h-3.5" /> Tuple (Immutable)
                      </button>
                    </div>
                  </div>

                  {/* Select Operation */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">2. เลือกคำสั่งในการจัดการข้อมูล:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { op: 'Append', label: 'เพิ่มข้อมูล' },
                        { op: 'Modify', label: 'แก้ไขค่า' },
                        { op: 'Delete', label: 'ลบข้อมูล' }
                      ].map(item => (
                        <button
                          key={item.op}
                          onClick={() => { if (!isProcessing) setSelectedOperation(item.op); }}
                          disabled={isProcessing}
                          id={`btn-op-${item.op.toLowerCase()}`}
                          className={`py-2 rounded-xl border text-center font-bold text-[11px] cursor-pointer transition-all
                            ${selectedOperation === item.op
                              ? 'border-indigo-400 bg-indigo-950/30 text-indigo-300'
                              : 'border-slate-800 bg-slate-950/20 text-slate-400 hover:border-slate-700'
                            }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input value if Append is selected */}
                  {selectedOperation === 'Append' && (
                    <div className="space-y-2 animate-fadeIn">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">3. ระบุค่าข้อมูลสมาชิกเพื่อเพิ่มต่อท้าย:</span>
                      <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value.substring(0, 10))}
                        disabled={isProcessing}
                        id="input-val-box"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-40"
                        placeholder="ข้อความความยาวไม่เกิน 10 ตัวอักษร"
                      />
                    </div>
                  )}

                  {/* Run button */}
                  <div className="pt-2">
                    <button
                      onClick={handleRunOperation}
                      disabled={isProcessing || (selectedStructure === 'List' ? listItems.length : tupleItems.length) === 0 && selectedOperation === 'Delete'}
                      id="btn-run-sim"
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-slate-950/55 disabled:opacity-40"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      รันคำสั่งเชิงโต้ตอบ (Execute Code)
                    </button>
                  </div>
                </div>

                {/* Log Screen & Reset */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <button
                    onClick={handleResetSimulator}
                    disabled={isProcessing}
                    id="btn-reset-sim"
                    className="w-full py-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตหน่วยความจำจำลอง
                  </button>

                  <div className="bg-black/90 p-3 rounded-xl border border-slate-950 font-mono text-[11px] leading-relaxed text-indigo-400 overflow-y-auto max-h-[120px] min-h-[100px]" id="terminal-screen">
                    <span className="text-slate-500 border-b border-slate-900 pb-1 mb-1.5 uppercase tracking-wide text-[8.5px] font-bold block">Trace Output Console:</span>
                    {terminalLogs.map((log, idx) => (
                      <div key={idx} className={log.startsWith('TypeError') || log.startsWith('  File') || log.startsWith('Traceback') ? 'text-rose-400 font-bold' : 'text-indigo-300'}>
                        <span className="text-slate-700 select-none">&gt; </span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic SVG Memory View */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[480px]" id="sim-visual-panel">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-4 font-bold tracking-widest">MEMORY ALLOCATION AND PATH SYSTEM</span>

                <div className="space-y-6 mt-6 flex-1 flex flex-col justify-between">
                  {/* SVG Pipeline */}
                  <div className="relative bg-slate-900/30 rounded-xl border border-slate-900/80 p-4 grow flex items-center justify-center min-h-[220px]" id="svg-board-canvas">
                    <svg viewBox="0 0 560 220" className="w-full h-full" id="svg-paths-container">
                      <defs>
                        <marker id="arrow-gray" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
                        </marker>
                        <marker id="arrow-emerald" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                        </marker>
                        <marker id="arrow-indigo" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366f1" />
                        </marker>
                      </defs>

                      {/* Connection Line: API to List Node: M 280,50 L 160,50 L 160,120 */}
                      <path 
                        d="M 280,50 L 160,50 L 160,120" 
                        fill="none" 
                        stroke={activeStep >= 0 && selectedStructure === 'List' ? "#10b981" : "#334155"} 
                        strokeWidth="3"
                        strokeDasharray={activeStep === 0 && selectedStructure === 'List' ? "6,4" : "none"}
                        className={activeStep === 0 && selectedStructure === 'List' ? "animate-flow-line-dsa" : ""}
                        markerEnd={activeStep >= 1 && selectedStructure === 'List' ? "url(#arrow-emerald)" : "url(#arrow-gray)"}
                      />

                      {/* Connection Line: API to Tuple Node: M 280,50 L 400,50 L 400,120 */}
                      <path 
                        d="M 280,50 L 400,50 L 400,120" 
                        fill="none" 
                        stroke={activeStep >= 0 && selectedStructure === 'Tuple' ? "#6366f1" : "#334155"} 
                        strokeWidth="3"
                        strokeDasharray={activeStep === 0 && selectedStructure === 'Tuple' ? "6,4" : "none"}
                        className={activeStep === 0 && selectedStructure === 'Tuple' ? "animate-flow-line-dsa" : ""}
                        markerEnd={activeStep >= 1 && selectedStructure === 'Tuple' ? "url(#arrow-indigo)" : "url(#arrow-gray)"}
                      />

                      {/* Connection Line: List Node to RAM: M 160,120 L 160,190 L 280,190 */}
                      <path 
                        d="M 160,120 L 160,190 L 280,190" 
                        fill="none" 
                        stroke={activeStep >= 1 && selectedStructure === 'List' ? "#10b981" : "#334155"} 
                        strokeWidth="2.5"
                        strokeDasharray={activeStep === 1 && selectedStructure === 'List' ? "6,4" : "none"}
                        className={activeStep === 1 && selectedStructure === 'List' ? "animate-flow-line-dsa" : ""}
                        markerEnd={activeStep >= 2 && selectedStructure === 'List' ? "url(#arrow-emerald)" : "url(#arrow-gray)"}
                      />

                      {/* Connection Line: Tuple Node to RAM: M 400,120 L 400,190 L 280,190 */}
                      <path 
                        d="M 400,120 L 400,190 L 280,190" 
                        fill="none" 
                        stroke={activeStep >= 1 && selectedStructure === 'Tuple' && !hasError ? "#6366f1" : hasError && activeStep >= 1 && selectedStructure === 'Tuple' ? "#f43f5e" : "#334155"} 
                        strokeWidth="2.5"
                        strokeDasharray={activeStep === 1 && selectedStructure === 'Tuple' ? "6,4" : "none"}
                        className={activeStep === 1 && selectedStructure === 'Tuple' ? "animate-flow-line-dsa" : ""}
                        markerEnd={activeStep >= 2 && selectedStructure === 'Tuple' && !hasError ? "url(#arrow-indigo)" : "url(#arrow-gray)"}
                      />

                      {/* Running Dot animation */}
                      {isProcessing && activeStep === 0 && (
                        <circle r="5.5" fill={selectedStructure === 'List' ? "#10b981" : "#6366f1"} className="animate-pulse">
                          <animateMotion dur="1s" repeatCount="indefinite" path={selectedStructure === 'List' ? "M 280,50 L 160,50 L 160,120" : "M 280,50 L 400,50 L 400,120"} />
                        </circle>
                      )}

                      {/* Node 1: Public Interface API */}
                      <g transform="translate(280, 50)">
                        <circle r="26" fill="#1e293b" stroke={activeStep === 0 ? (selectedStructure === 'List' ? "#10b981" : "#6366f1") : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-10, -10)">
                          <Code className={`w-5 h-5 ${activeStep === 0 ? (selectedStructure === 'List' ? 'text-emerald-400' : 'text-indigo-400') : 'text-slate-400'}`} />
                        </g>
                        <text x="0" y="-33" textAnchor="middle" className="fill-slate-400 font-mono text-[9px] font-bold uppercase tracking-wider">User API Operations</text>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-500 font-sans text-[8.5px] font-bold">Python Code Call</text>
                      </g>

                      {/* Node 2: List Heap allocation logic */}
                      <g transform="translate(160, 120)">
                        <circle r="24" fill="#1e293b" stroke={activeStep === 1 && selectedStructure === 'List' ? "#10b981" : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-9, -9)">
                          <Unlock className={`w-4.5 h-4.5 ${activeStep === 1 && selectedStructure === 'List' ? 'text-emerald-400' : 'text-slate-400'}`} />
                        </g>
                        <text x="-32" y="4" textAnchor="end" className="fill-slate-400 font-sans text-[8.5px] font-bold">List (Dynamic Array)</text>
                      </g>

                      {/* Node 3: Tuple Heap allocation logic */}
                      <g transform="translate(400, 120)">
                        <circle r="24" fill="#1e293b" stroke={activeStep === 1 && selectedStructure === 'Tuple' ? (hasError ? "#ef4444" : "#6366f1") : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-9, -9)">
                          <Lock className={`w-4.5 h-4.5 ${activeStep === 1 && selectedStructure === 'Tuple' ? (hasError ? 'text-red-400' : 'text-indigo-400') : 'text-slate-400'}`} />
                        </g>
                        <text x="32" y="4" textAnchor="start" className="fill-slate-400 font-sans text-[8.5px] font-bold">Tuple (Static Array)</text>
                      </g>

                      {/* Node 4: Physical Memory */}
                      <g transform="translate(280, 190)">
                        <circle r="20" fill={activeStep >= 2 ? (hasError ? "#7f1d1d" : "#064e3b") : "#111827"} stroke={activeStep >= 2 ? (hasError ? "#ef4444" : "#10b981") : "#374151"} strokeWidth="2" className={activeStep === 2 ? "animate-pulse" : ""} />
                        <g transform="translate(-8, -8)">
                          <Database className={`w-4 h-4 ${activeStep >= 2 ? (hasError ? "text-red-400" : "text-emerald-400") : "text-slate-600"}`} />
                        </g>
                        <text x="0" y="32" textAnchor="middle" className="fill-slate-400 font-sans text-[8.5px] font-bold uppercase">Physical Memory (RAM)</text>
                      </g>
                    </svg>
                  </div>

                  {/* Physical RAM Visualizer boxes */}
                  <div className="bg-slate-900 border border-slate-850 rounded-xl p-4 space-y-4" id="ram-visualizer-box">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">
                        {selectedStructure.toUpperCase()} HEAP STRUCTURE
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono
                        ${selectedStructure === 'List'
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-900'
                          : 'bg-indigo-950/80 text-indigo-400 border border-indigo-900'
                        }`}
                      >
                        {selectedStructure === 'List' ? '📊 DYNAMIC LIST RECONSTRUCTION' : '🔒 IMMUTABLE TUPLE LAYOUT'}
                      </span>
                    </div>

                    {/* Contiguous slot grids representation */}
                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-900/80 min-h-[90px] flex flex-col justify-center items-center">
                      {selectedStructure === 'List' ? (
                        /* List representation: shows elements + overallocated buffer */
                        <div className="w-full" id="list-elements-row">
                          <div className="flex gap-1.5 justify-center flex-wrap">
                            {listItems.map((item, idx) => (
                              <div key={idx} className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-lg border border-emerald-500/30 bg-emerald-950/30 flex items-center justify-center font-bold text-xs text-white transition-all duration-300">
                                  {item}
                                </div>
                                <span className="text-[8.5px] text-slate-500 mt-1 font-mono">[{idx}]</span>
                              </div>
                            ))}
                            {/* Empty Buffer Slots to show dynamic pre-allocation */}
                            {Array.from({ length: getCapacityAndBytes('List', listItems).capacity - listItems.length }).map((_, i) => (
                              <div key={i} className="flex flex-col items-center opacity-30">
                                <div className="w-12 h-12 rounded-lg border border-dashed border-slate-750 bg-transparent flex items-center justify-center text-slate-500 text-[10px] font-mono">
                                  N/A
                                </div>
                                <span className="text-[8.5px] text-slate-650 mt-1 font-mono">[{listItems.length + i}]</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        /* Tuple representation: shows exactly items layout with locks */
                        <div className="w-full" id="tuple-elements-row">
                          <div className="flex gap-1.5 justify-center flex-wrap items-center">
                            {tupleItems.map((item, idx) => (
                              <div key={idx} className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-xl border border-indigo-500/50 bg-indigo-950/40 flex items-center justify-center font-bold text-xs text-white transition-all duration-300 relative">
                                  <Lock className="w-2.5 h-2.5 text-indigo-400 absolute top-1 right-1 opacity-70" />
                                  {item}
                                </div>
                                <span className="text-[8.5px] text-slate-500 mt-1 font-mono">[{idx}]</span>
                              </div>
                            ))}
                            {tupleItems.length === 0 && (
                              <span className="text-slate-600 italic text-xs">ทิวเพิลว่างเปล่า (Empty Tuple)</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Capacity and Memory Details */}
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-1">
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 space-y-1">
                        <span className="text-slate-500 block text-[9.5px] font-bold uppercase">ALLOCATED CAPACITY / ความจุจอง</span>
                        <span className="text-white font-bold text-sm">
                          {selectedStructure === 'List' 
                            ? `${listItems.length} / ${getCapacityAndBytes('List', listItems).capacity} ช่อง (จองเผื่อ)`
                            : `${tupleItems.length} / ${tupleItems.length} ช่อง (คงที่พอดีตัว)`
                          }
                        </span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 space-y-1">
                        <span className="text-slate-500 block text-[9.5px] font-bold uppercase">MEMORY FOOTPRINT / ขนาดไบต์</span>
                        <span className={selectedStructure === 'List' ? 'text-emerald-400 font-bold text-sm' : 'text-indigo-400 font-bold text-sm'}>
                          {getCapacityAndBytes(selectedStructure, selectedStructure === 'List' ? listItems : tupleItems).bytes} Bytes (sys.getsizeof)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* Section 4: Python Code and Syntax */}
        <section className="space-y-6" aria-labelledby="section-code-title">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ตัวอย่างการประกาศและใช้งาน
            </span>
            <h3 className="text-[24px] font-semibold text-zinc-900 leading-tight mt-1" id="section-code-title">
              ไวยากรณ์และการเข้าถึงข้อมูล Tuple ในภาษา Python
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ในเชิงปฏิบัติ ทิวเพิลมีประโยชน์อย่างมากในการเก็บข้อมูลคงที่ (Record/Metadata) ที่ต้องการความเสถียร โดยนักศึกษาสามารถสังเกตตัวอย่างรูปแบบการสร้าง การนำข้อมูลออก (Unpacking) ตลอดจนการจัดการข้อผิดพลาดเมื่อมีตรรกะพยายามเขียนทับค่า:
          </p>

          <div className="max-w-5xl mx-auto" id="python-console-display">
            <ConsoleScreen
              label="# python/tuple_demonstration.py"
              accentLabel="tuple data structures"
              accentColor="text-indigo-400"
              codeBlock={
                <pre className="text-[13.5px] font-mono text-zinc-300 leading-relaxed overflow-x-auto">
                  {pythonCode}
                </pre>
              }
              output="ทิวเพิลไม่อนุญาตให้แก้ไขข้อมูล (Immutable) จึงใช้ประโยชน์ในการกระจายค่าและป้องกันข้อมูลระบบเปลี่ยนสถานะ"
              outputColor="text-indigo-400"
              multiline={true}
            />
          </div>
        </section>

        {/* Section 5: Quiz Challenge */}
        <section className="space-y-6" aria-labelledby="section-quiz-title">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ด่านประเมินผลการเรียนรู้
            </span>
            <h3 className="text-[24px] font-semibold text-zinc-900 leading-tight mt-1" id="section-quiz-title">
              มินิเกมวัดความรู้: กฎเกณฑ์และประสิทธิภาพของทิวเพิล (Tuple Arena)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ตอบคำถามวิชาการ 4 ระดับ เพื่อประเมินความเข้าใจเกี่ยวกับกลไกแรม มิวทาบิลิลี่ และการนำ Tuple ไปประยุกต์ใช้งานจริงในงานอาชีพนักพัฒนา:
          </p>

          <div className="max-w-4.5xl mx-auto" id="quiz-engine-wrapper">
            <QuizEngine
              title="มินิเกม: ท้าทายสิทธิเข้าถึงข้อมูล Tuple"
              description="ตอบคำถามประมวลข้อกำหนดทางวิศวกรรมคอมพิวเตอร์และการประเมินความรู้โครงสร้างข้อมูลทิวเพิล"
              levels={quizLevels}
              accentColor="from-indigo-600/20 to-emerald-500/10"
              icon={<Shield className="w-6 h-6 text-indigo-400" />}
            />
          </div>
        </section>

        {/* Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ภารกิจวิเคราะห์ขนาดข้อมูลคงที่และการนำ Tuple ไปใช้งานจริง"
          taskText={`[โจทย์ปฏิบัติการวิเคราะห์โครงสร้างข้อมูล Tuple (Immutable Record)]

ให้นักศึกษาปฏิบัติกิจกรรมทางวิชาการและเขียนคำอธิบายเชิงสถาปัตยกรรมหน่วยความจำดังนี้:

1. เขียนสคริปต์ภาษา Python เพื่อจัดเก็บข้อมูลพิกัดทางภูมิศาสตร์ (ละติจูด, ลองจิจูด) ในรูปแบบ Tuple (เช่น location = (13.7563, 100.5018))
2. เปรียบเทียบตำแหน่งแอดเดรสหน่วยความจำ (ฟังก์ชัน id) และขนาดพื้นที่ในแรม (ฟังก์ชัน sys.getsizeof จากโมดูล sys) ระหว่าง Tuple ดังกล่าวกับโครงสร้างข้อมูล List ที่บรรจุค่าข้อมูลชนิดเดียวกัน
3. อธิบายและวิเคราะห์เชิงเหตุและผล: เหตุใดการใช้งานพิกัดภูมิศาสตร์จึงสมควรจัดเก็บบันทึกด้วย Tuple มากกว่า List และคุณสมบัติคงที่ (Immutable) ของทิวเพิลช่วยป้องกันข้อผิดพลาดเชิงตรรกะในระบบนำทางพิกัดดาวเทียมได้อย่างไร`}
        />

      </main>
    </div>
  );
}
