import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  HelpCircle,
  Activity,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle,
  Info,
  Database,
  GitCommit,
  Grid
} from 'lucide-react';
import {
  AmbientBackdrop,
  OptionSelector,
  ConceptCard,
  SectionBlock,
  QuizEngine
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

export default function DSA1_8() {
  const [selectedType, setSelectedType] = useState('list');

  const currentBlobs = [
    { color: 'bg-indigo-500/10', size: 'w-[45rem] h-[45rem]', position: '-top-40 -left-40', opacity: 'opacity-40' },
    { color: 'bg-cyan-500/5', size: 'w-[40rem] h-[40rem]', position: 'top-1/4 -right-20', opacity: 'opacity-30' },
    { color: 'bg-violet-500/10', size: 'w-[35rem] h-[35rem]', position: '-bottom-20 left-1/3', opacity: 'opacity-25' }
  ];

  const quizQuestions = [
    {
      title: 'ความแตกต่างของ List และ Tuple',
      desc: 'ข้อใดคือความแตกต่างพื้นฐานเชิงโครงสร้างที่สำคัญที่สุดระหว่าง List และ Tuple ในภาษา Python?',
      tip: 'คิดถึงคีย์เวิร์ดเรื่องการเปลี่ยนแปลงข้อมูลหลังจากที่ถูกจองพื้นที่แรมแล้ว',
      options: [
        { key: 'A', text: 'List เก็บเฉพาะตัวเลข ส่วน Tuple เก็บเฉพาะอักขระเดี่ยว', isCorrect: false },
        { key: 'B', text: 'List มีลักษณะยืดหยุ่นแก้ไขได้ (Mutable) ส่วน Tuple มีค่าตายตัวไม่สามารถแก้ไขได้อีกหลังจากสร้างขึ้น (Immutable)', isCorrect: true },
        { key: 'C', text: 'Tuple ใช้พื้นที่หน่วยความจำแรมต่อโหนดกว้างกว่า List ถึง 8 ไบต์', isCorrect: false },
        { key: 'D', text: 'List จัดวางแบบไม่ต่อเนื่อง ส่วน Tuple จัดวางแบบใยข่ายกราฟ', isCorrect: false }
      ]
    },
    {
      title: 'กลไก Hashing ของ Dictionary',
      desc: 'ทำไมโครงสร้างแบบพจนานุกรม (Dictionary) ใน Python จึงเข้าค้นคืนค่า (Value) ผ่านกุญแจดัชนี (Key) ได้รวดเร็ว O(1) คงที่?',
      tip: 'ใช้ฟังก์ชันวิเศษแปลงกุญแจให้กลายเป็นที่อยู่ตำแหน่งช่องในพริบตา',
      options: [
        { key: 'A', text: 'เพราะระบบปฏิบัติการบังคับให้ประมวลผลผ่านลำดับขั้น Tree', isCorrect: false },
        { key: 'B', text: 'เพราะมีกลไกฟังก์ชันแฮช (Hash Function) แปลงกุญแจ Key ให้เป็นดัชนีชี้ตำแหน่งช่องเก็บแรมได้โดยตรง O(1) โดยไม่ต้องรันลูปค้นหา', isCorrect: true },
        { key: 'C', text: 'เพราะ Dictionary จองเนื้อที่ขนาดสแต็กต่อเนื่องกัน', isCorrect: false },
        { key: 'D', text: 'เพราะบังคับห้ามเก็บข้อมูลซ้ำกันในตาราง', isCorrect: false }
      ]
    },
    {
      title: 'ลักษณะเด่นของโครงสร้าง Set',
      desc: 'เมื่อทำการเพิ่มสมาชิกที่ "ซ้ำกัน" ลงในโครงสร้างข้อมูลแบบ Set (เซต) ใน Python ผลลัพธ์ทางกายภาพจะเป็นอย่างไร?',
      tip: 'เซตตามทฤษฎีคณิตศาสตร์จะยอมรับเฉพาะสมาชิกที่ไม่ซ้ำกันเท่านั้น',
      options: [
        { key: 'A', text: 'รายงานสรุป IndexError บนคอนโซลทันที', isCorrect: false },
        { key: 'B', text: 'ทำการเขียนทับและเก็บข้อมูลสมาชิกที่ซ้ำตัวนั้นเพียง 1 ตัวเดี่ยวเท่านั้น โดยตัดข้อมูลส่วนเกินออก', isCorrect: true },
        { key: 'C', text: 'ระบบจะสลับโครงสร้างแปลงเป็น Tuple เพื่อความปลอดภัย', isCorrect: false },
        { key: 'D', text: 'จะเกิดการจองพอยน์เตอร์ Overhead ขนาด 8 ไบต์ต่อเนื่อง', isCorrect: false }
      ]
    },
    {
      title: 'การเข้าถึงข้อมูล Dictionary',
      desc: 'ข้อใดคือไวยากรณ์ในการดึงค่า "salary" ของระเบียนพนักงาน จากตัวแปร dict_emp ในภาษา Python?',
      tip: 'Dictionary ใช้เครื่องหมายวงเล็บเหลี่ยมในการอ้างชื่อคีย์',
      options: [
        { key: 'A', text: 'dict_emp["salary"]', isCorrect: true },
        { key: 'B', text: 'dict_emp.salary()', isCorrect: false },
        { key: 'C', text: 'dict_emp(salary)', isCorrect: false },
        { key: 'D', text: 'dict_emp->salary', isCorrect: false }
      ]
    },
    {
      title: 'ข้อจำกัดด้านความเร็วของ Set',
      desc: 'ในมิติการทำงานเชิงคณิตศาสตร์คอมพิวเตอร์ โครงสร้าง Set เหมาะกับการนำมาประยุกต์ใช้งานข้อใดที่สุด?',
      tip: 'เซตเหมาะกับการดึงค่าเฉพาะส่วนที่ตัดตัวซ้ำและตรวจสอบความเป็นสมาชิก',
      options: [
        { key: 'A', text: 'การเรียงลำดับขยับขยายข้อมูลแบบ O(N²)', isCorrect: false },
        { key: 'B', text: 'การค้นหาตรวจสอบความเป็นสมาชิก (Membership test) และการตัดข้อมูลรายการที่มีลักษณะซ้ำซากออกอย่างฉับไว O(1)', isCorrect: true },
        { key: 'C', text: 'การจัดตารางทำงานส่งคิว printer job buffer', isCorrect: false },
        { key: 'D', text: 'การแปลงค่าพารามิเตอร์ของระบบเสียงดาร', isCorrect: false }
      ]
    }
  ];

  const teacherTaskText = `ใบงานวิชาการที่ 1.8: การประเมินสมรรถนะการเลือกใช้ Built-in Data Types ของ Python

คำสั่ง:
1. ให้นักเรียนจำลองสถานการณ์การเขียนโค้ดเพื่อแก้โจทย์ปัญหาธุรกิจ:
   - "หากนักเรียนต้องสร้างระบบเก็บรหัสประจำตัวของลูกค้าหน้าร้านที่มาชำระเงิน โดยห้ามมิให้รหัสบันทึกเกิดความซ้ำซ้อนกันในฐานข้อมูล" นักเรียนจะคัดเลือกโครงสร้างชนิดใด (List, Tuple, Dictionary, หรือ Set) เพราะเหตุใด?
2. อ้างอิงจากตัวจำลองประเภท Built-in Types (Interactive Lab):
   - จงอธิบายขั้นตอนวิธีแฮชชิ่ง (Hashing) ในกลไกการทำงานเบื้องหลังของโครงสร้าง Dictionary และเหตุใดความเร็วในการสืบค้นจึงเร็วกว่าการท่องไปใน List
3. รวบยอดผลวิเคราะห์ความรู้ส่งในรูปแบบรายงาน Markdown หรือเอกสารสรุปความรู้ท้ายภาคเรียน`;

  return (
    <div className="w-full relative">
      {/* 1️⃣ Layer 1: Ambient Backdrop */}
      <AmbientBackdrop blobs={currentBlobs} blur="blur-[130px]" />

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* Section 1: Built-in Types Theory */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              บทเรียนวิชาการ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              Built-in Data Types ของ Python
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              เพื่อให้การพัฒนาซอฟต์แวร์เสร็จสมบูรณ์รวดเร็วและคงมาตรฐานตรรกะระดับสากล ภาษา Python จึงได้บรรจุโครงสร้างจัดเก็บข้อมูลในตัว <span className="bg-indigo-50 border border-indigo-200/60 text-indigo-900 px-2 py-0.5 rounded text-[14.5px] font-mono font-semibold">Built-in Data Types</span> มาพร้อมใช้งานอย่างหลากหลาย ได้แก่ **List**, **Tuple**, **Dictionary**, และ **Set** ซึ่งแต่ละชนิดได้รับการจองประสิทธิภาพและคำสั่งจัดการ (Methods) ในระดับระบบไว้แล้ว
            </p>

            <div className="bg-indigo-50/60 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-5 border-l-[3px] border-l-indigo-600">
              <p className="text-zinc-700 text-[15px] md:text-base leading-relaxed font-normal">
                ความท้าทายหลักของนักเรียนสาขาคอมพิวเตอร์คือการวิเคราะห์และคัดสรรชนิดข้อมูลที่สอดคล้องกับคุณลักษณะลอจิก เช่น หากต้องการชุดข้อมูลคงที่เพื่อป้องกันการเขียนทับโดยไม่ได้ตั้งใจ (เช่น พิกัดแผนที่หรือค่าคงที่ระบบ) การเลือกใช้ **Tuple** ย่อมปลอดภัยกว่าใช้ **List** หรือหากต้องการระบบสืบค้นพฤติกรรมข้อมูลด้วยความเร็วสูงสุด การใช้แฮชอย่าง **Dictionary** จะมีความรวดเร็วกว่าการสแกน O(N) ใน List อย่างมหาศาล
              </p>
            </div>

            {/* Premium Concept Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
              <ConceptCard
                symbol="List: []"
                title="ยืดหยุ่นปรับขนาดได้"
                description="อาเรย์แบบพลวัต (Dynamic Array) จองแรมแบบขยายขนาดอัตโนมัติ แก้ไขได้อิสระ (Mutable)"
                accent="emerald"
              />
              <ConceptCard
                symbol="Tuple: ()"
                title="ปลอดภัยล็อกค่าถาวร"
                description="โครงสร้างข้อมูลแบบคงที่ตายตัว ไม่สามารถเขียนทับหรือลบโหนดได้ (Immutable)"
                accent="cyan"
              />
              <ConceptCard
                symbol="Dict: {}"
                title="ค้นหา O(1) ด้วย Hashing"
                description="การจัดเก็บคู่กุญแจและผลลัพธ์ (Key-Value) ค้นหาข้อมูลฉับพลันด้วยกลไกฟังก์ชันแฮช"
                accent="indigo"
              />
              <ConceptCard
                symbol="Set: set()"
                title="ตัดรายการข้อมูลซ้ำ"
                description="คัดกรองจัดเก็บสมาชิกเฉพาะตัวไม่ซ้ำซ้อนกันตามทฤษฎีเซตคณิตศาสตร์ ปฏิบัติการยูเนียนอินเตอร์เซกชัน"
                accent="violet"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Built-in Types Interactive Lab Simulator */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ตัวจำลองคลังข้อมูลและ RAM Layout
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบจำลองโครงสร้างหน่วยความจำของชนิดข้อมูล Python ในแรม
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              ปรับเปลี่ยนตัวเลือกชนิดข้อมูล Python ด้านล่าง เพื่อศึกษาโครงสร้างการจัดสรรแรม แอดเดรส และการแมปปิ้งคีย์/แฮชใน Virtual Memory อย่างเป็นรูปธรรม
            </p>

            {/* High-Fidelity Simulator Shell */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
              {/* Left Control Panel (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">CONTROL PANEL</span>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-white">
                    <Database className="w-5 h-5 text-indigo-400" />
                    <h4 className="text-lg font-bold">เลือกชนิดข้อมูลเพื่อวิเคราะห์ RAM</h4>
                  </div>

                  <OptionSelector
                    options={[
                      { value: 'list', label: 'Python List [Mutable Array]' },
                      { value: 'tuple', label: 'Python Tuple (Immutable Block)' },
                      { value: 'dict', label: 'Python Dictionary {Key: Value}' },
                      { value: 'set', label: 'Python Set {Unique Elements}' }
                    ]}
                    value={selectedType}
                    onChange={(val) => setSelectedType(val)}
                    cols={1}
                    mode="pill"
                    activeColor="bg-indigo-600 border-indigo-500 text-white font-bold shadow-md shadow-indigo-500/20"
                  />

                  {/* Narration Description Box */}
                  <div className="bg-black/40 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold font-mono">
                      <Info className="w-4 h-4" /> สถาปัตยกรรมภายในหน่วยความจำ:
                    </div>
                    {selectedType === 'list' && (
                      <p className="text-slate-300 text-sm leading-relaxed">
                        **Python List:** จัดสรรแรมต่อเนื่องกัน อ้างอิงด้วยดัชนี `0, 1, 2` สภาพเป็นอาเรย์แบบพลวัต (Dynamic Array) สามารถเพิ่มค่า (Append) หรือลบค่าได้อิสระ แรมจะจัดสรรขยายขนาดเผื่อไว้ล่วงหน้า
                      </p>
                    )}
                    {selectedType === 'tuple' && (
                      <p className="text-slate-300 text-sm leading-relaxed">
                        **Python Tuple:** เมื่อสร้างขึ้น แรมจะบล็อกพื้นที่ขนาดคงที่พอดีตัวแปรถาวร ห้ามทำการแทรก เพิ่ม หรือแก้ไขค่าใด ๆ การบล็อกนี้ทำให้มีขนาดพื้นที่และ Pointer Overhead ที่เบาบางกว่า List และปลอดภัย 100%
                      </p>
                    )}
                    {selectedType === 'dict' && (
                      <p className="text-slate-350 text-sm leading-relaxed">
                        **Python Dictionary:** อาศัยระบบตารางแฮช (Hash Table) เมื่อป้อน Key (เช่น \'a\') จะผ่านสมการ Hash ออกมาเป็นดัชนีแรมชี้พิกัดช่องเก็บทันที ทำให้ไม่ต้องวนลูปสแกน O(N) รวดเร็วคงที่ **O(1)**
                      </p>
                    )}
                    {selectedType === 'set' && (
                      <p className="text-slate-300 text-sm leading-relaxed">
                        **Python Set:** เป็นตารางแฮชเช่นเดียวกันแต่จัดเก็บเฉพาะค่ากุญแจ (Keys Only) โดยตัดข้อมูลที่ซ้ำกันออกไปโดยอัตโนมัติ เหมาะสำหรับลอจิกคัดกรองตัวสะกดเดี่ยวและการคำนวณเซตคณิตศาสตร์
                      </p>
                    )}
                  </div>
                </div>

                {/* Micro metrics */}
                <div className="mt-8 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                    <span className="block text-[10px] text-slate-500 font-mono tracking-wider">MUTABILITY STATE</span>
                    <span className="text-lg font-bold font-mono text-white">
                      {selectedType === 'list' || selectedType === 'dict' || selectedType === 'set' ? 'MUTABLE' : 'IMMUTABLE'}
                    </span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                    <span className="block text-[10px] text-slate-500 font-mono tracking-wider">SEARCH COMPLEXITY</span>
                    <span className="text-lg font-bold font-mono text-white">
                      {selectedType === 'dict' || selectedType === 'set' ? 'O(1) Hash' : 'O(N) Search'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Visualizer Panel (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] p-6 border border-white/5 shadow-2xl relative flex flex-col items-center justify-center min-h-[400px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">VISUALIZER SCREEN</span>
                <span className="text-[9px] font-mono text-indigo-400 absolute top-3 right-4 font-bold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 animate-pulse" /> VIRTUAL RAM DATA TYPE SCHEMATIC
                </span>

                <div className="w-full max-w-sm space-y-6 mt-4">
                  {selectedType === 'list' && (
                    <div className="space-y-4">
                      <span className="block text-[10px] font-mono text-slate-500 text-center uppercase tracking-wider">Sequential List Memory [Indices 0, 1, 2]</span>
                      <div className="grid grid-cols-3 gap-3 p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80">
                        <div className="h-16 rounded-xl border border-indigo-500 bg-indigo-600/20 flex flex-col justify-center items-center font-mono text-indigo-300">
                          <span className="text-[8px] opacity-60">Index 0</span>
                          <span className="font-bold">100</span>
                        </div>
                        <div className="h-16 rounded-xl border border-indigo-500 bg-indigo-600/20 flex flex-col justify-center items-center font-mono text-indigo-300">
                          <span className="text-[8px] opacity-60">Index 1</span>
                          <span className="font-bold">200</span>
                        </div>
                        <div className="h-16 rounded-xl border border-indigo-500 bg-indigo-600/20 flex flex-col justify-center items-center font-mono text-indigo-300">
                          <span className="text-[8px] opacity-60">Index 2</span>
                          <span className="font-bold">300</span>
                        </div>
                      </div>
                      <div className="text-center text-[10.5px] font-mono text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                        สามารถประมวลผลคำสั่ง my_list.append(400) ได้
                      </div>
                    </div>
                  )}

                  {selectedType === 'tuple' && (
                    <div className="space-y-4">
                      <span className="block text-[10px] font-mono text-slate-500 text-center uppercase tracking-wider">Locked Tuple Block (Static Size)</span>
                      <div className="grid grid-cols-3 gap-3 p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80">
                        <div className="h-16 rounded-xl border border-cyan-500 bg-cyan-600/20 flex flex-col justify-center items-center font-mono text-cyan-300">
                          <span className="text-[8px] opacity-60">Field 0</span>
                          <span className="font-bold">99.9</span>
                        </div>
                        <div className="h-16 rounded-xl border border-cyan-500 bg-cyan-600/20 flex flex-col justify-center items-center font-mono text-cyan-300">
                          <span className="text-[8px] opacity-60">Field 1</span>
                          <span className="font-bold">\'A\'</span>
                        </div>
                        <div className="h-16 rounded-xl border border-cyan-500 bg-cyan-600/20 flex flex-col justify-center items-center font-mono text-cyan-300">
                          <span className="text-[8px] opacity-60">Field 2</span>
                          <span className="font-bold">2026</span>
                        </div>
                      </div>
                      <div className="text-center text-[10.5px] font-mono text-rose-450 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
                        คำสั่ง tuple.append() หรือแก้ไข จะเกิด TypeError ปิดกั้นถาวร
                      </div>
                    </div>
                  )}

                  {selectedType === 'dict' && (
                    <div className="space-y-4">
                      <span className="block text-[10px] font-mono text-slate-500 text-center uppercase tracking-wider">Hash Index Key-Value Pairs</span>
                      <div className="flex flex-col gap-2.5 p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 font-mono text-[12px]">
                        <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                          <span className="text-indigo-400">\'id\' (Hash 0x02)</span>
                          <span className="text-slate-400">---&gt;</span>
                          <span className="text-emerald-400 font-bold">1001</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                          <span className="text-indigo-400">\'name\' (Hash 0x05)</span>
                          <span className="text-slate-400">---&gt;</span>
                          <span className="text-emerald-400 font-bold">\'Somchai\'</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                          <span className="text-indigo-400">\'role\' (Hash 0x09)</span>
                          <span className="text-slate-400">---&gt;</span>
                          <span className="text-emerald-400 font-bold">\'Admin\'</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-center text-slate-400 font-mono">
                        ค้นหาดึงค่าได้ความเร็วคงที่ **O(1)** โดยข้ามการค้นหาเชิงลูป N
                      </p>
                    </div>
                  )}

                  {selectedType === 'set' && (
                    <div className="space-y-4">
                      <span className="block text-[10px] font-mono text-slate-500 text-center uppercase tracking-wider">Set Hash Slots (Duplicates Discarded)</span>
                      <div className="flex flex-wrap justify-center gap-3 p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80">
                        <div className="w-14 h-14 rounded-full border border-violet-500 bg-violet-600/20 flex items-center justify-center font-mono font-bold text-violet-300 shadow-[0_0_8px_rgba(139,92,246,0.2)]">
                          10
                        </div>
                        <div className="w-14 h-14 rounded-full border border-violet-500 bg-violet-600/20 flex items-center justify-center font-mono font-bold text-violet-300">
                          20
                        </div>
                        <div className="w-14 h-14 rounded-full border border-violet-500 bg-violet-600/20 flex items-center justify-center font-mono font-bold text-violet-300">
                          30
                        </div>
                      </div>
                      <div className="text-center text-[10.5px] font-mono text-amber-400 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                        หากนำ [10, 10, 20] มาใส่ จะเหลือจัดเก็บเฉพาะ [10, 20] เท่านั้น
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Gamification Quiz Engine */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ทดสอบสมรรถนะ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบทดสอบประเมินคุณลักษณะชนิดข้อมูล Built-in Python
            </h3>
          </div>

          <div className="pt-2">
            <QuizEngine
              title="แบบทดสอบคุณสมบัติชนิดข้อมูล List, Tuple, Dict, Set"
              description="ตอบคำถามลอจิกวิเคราะห์ขีดความจำและความแตกต่างในแรมเสมือนตามเกณฑ์ SOT"
              levels={quizQuestions}
              accentColor="from-teal-600/20 to-emerald-500/10"
              icon={<Sparkles className="w-6 h-6 text-teal-400 animate-pulse" />}
            />
          </div>
        </section>

        {/* Section 5: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ภารกิจส่งงาน: การประเมินสมรรถนะชนิดข้อมูลและประสิทธิภาพ Python"
          taskText={teacherTaskText}
        />
      </main>
    </div>
  );
}
