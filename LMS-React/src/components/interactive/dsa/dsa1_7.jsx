import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  HelpCircle,
  Activity,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle,
  Info,
  Terminal
} from 'lucide-react';
import {
  AmbientBackdrop,
  OptionSelector,
  ConsoleScreen,
  ConceptCard,
  SectionBlock,
  QuizEngine
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

export default function DSA1_7() {
  const [selectedSnippet, setSelectedSnippet] = useState('variables');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const snippets = {
    variables: {
      title: 'ตัวแปร & โครงสร้างเงื่อนไข',
      code: `score = 85\n\nif score >= 80:\n    result = "เกรด 4"\nelif score >= 70:\n    result = "เกรด 3"\nelse:\n    result = "เกรดต่ำกว่า 3"\n\nprint(f"ผลคะแนน {score} ได้: {result}")`,
      output: 'ผลคะแนน 85 ได้: เกรด 4'
    },
    loops: {
      title: 'โครงสร้างวนซ้ำ (Loops)',
      code: `data = [10, 20, 30]\ntotal = 0\n\nfor val in data:\n    total += val\n    print(f"กำลังบวก {val} | ผลสะสม: {total}")\n\nprint(f"ผลรวมสุทธิ: {total}")`,
      output: 'กำลังบวก 10 | ผลสะสม: 10\nกำลังบวก 20 | ผลสะสม: 30\nกำลังบวก 30 | ผลสะสม: 60\nผลรวมสุทธิ: 60'
    },
    exceptions: {
      title: 'ดักจับข้อผิดพลาด (try-except)',
      code: `try:\n    numbers = [5, 10]\n    # พยายามเข้าถึงดัชนีที่ไม่มีอยู่\n    val = numbers[5]\n    print("ผลลัพธ์:", val)\nexcept IndexError as err:\n    print("เกิดข้อผิดพลาด: ดัชนีเกินขอบเขตอาเรย์ (Index Out of Range)")`,
      output: 'เกิดข้อผิดพลาด: ดัชนีเกินขอบเขตอาเรย์ (Index Out of Range)'
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput('');
    setTimeout(() => {
      setConsoleOutput(snippets[selectedSnippet].output);
      setIsRunning(false);
    }, 1000);
  };

  const currentBlobs = [
    { color: 'bg-emerald-500/10', size: 'w-[45rem] h-[45rem]', position: '-top-40 -left-40', opacity: 'opacity-40' },
    { color: 'bg-indigo-500/5', size: 'w-[40rem] h-[40rem]', position: 'top-1/4 -right-20', opacity: 'opacity-30' },
    { color: 'bg-cyan-500/10', size: 'w-[35rem] h-[35rem]', position: '-bottom-20 left-1/3', opacity: 'opacity-25' }
  ];

  const quizQuestions = [
    {
      title: 'ไวยากรณ์การสร้าง List ใน Python',
      desc: 'ในภาษา Python หากต้องการจองพื้นที่อาร์เรย์แบบไดนามิกหรือลิสต์ (List) เปล่า ๆ จะเขียนไวยากรณ์ข้อใดถูกต้อง?',
      tip: 'ลิสต์ใน Python ใช้เครื่องหมายวงเล็บเหลี่ยม (Square Brackets)',
      options: [
        { key: 'A', text: 'my_list = {}', isCorrect: false },
        { key: 'B', text: 'my_list = []', isCorrect: true },
        { key: 'C', text: 'my_list = ()', isCorrect: false },
        { key: 'D', text: 'my_list = set()', isCorrect: false }
      ]
    },
    {
      title: 'การดักจับข้อผิดพลาด (Exception Handling)',
      desc: 'ในไวยากรณ์โครงสร้างดักจับกรณีเกิดข้อบกพร่อง (Exceptions) ใน Python เรานิยมเรียกคำสั่งควบคุมข้อใดควบคู่กับ block คำสั่ง try?',
      tip: 'ภาษา Python ใช้คำว่า except แทนการใช้ catch เหมือนในภาษา Java หรือ C#',
      options: [
        { key: 'A', text: 'catch', isCorrect: false },
        { key: 'B', text: 'except', isCorrect: true },
        { key: 'C', text: 'throw', isCorrect: false },
        { key: 'D', text: 'rescue', isCorrect: false }
      ]
    },
    {
      title: 'ชนิดข้อมูลผิดพลาดจากการอ้างดัชนี',
      desc: 'หากโปรแกรมมีการสั่งอ่านค่าจาก List นอกเหนือช่วงขนาดของดัชนีสูงสุด (เช่น อาร์เรย์มี 2 ตัว แต่อ่านตัวที่ 5) Python จะรายงาน Error ชนิดใด?',
      tip: 'ดัชนีภาษาอังกฤษคือ Index',
      options: [
        { key: 'A', text: 'KeyError', isCorrect: false },
        { key: 'B', text: 'IndexError', isCorrect: true },
        { key: 'C', text: 'ValueError', isCorrect: false },
        { key: 'D', text: 'TypeError', isCorrect: false }
      ]
    },
    {
      title: 'การวนลูปแบบ For ใน Python',
      desc: 'การใช้งาน `for x in range(0, 5):` จะทำให้โค้ดด้านในทำงานวนซ้ำทั้งหมดกี่ครั้ง และค่า x สุดท้ายมีค่าเท่าใด?',
      tip: 'ช่วง range(start, end) จะทำงานตั้งแต่ start ไปจนถึงก่อน end 1 ค่า',
      options: [
        { key: 'A', text: '5 ครั้ง, ค่า x สุดท้ายคือ 4', isCorrect: true },
        { key: 'B', text: '5 ครั้ง, ค่า x สุดท้ายคือ 5', isCorrect: false },
        { key: 'C', text: '4 ครั้ง, ค่า x สุดท้ายคือ 4', isCorrect: false },
        { key: 'D', text: '6 ครั้ง, ค่า x สุดท้ายคือ 5', isCorrect: false }
      ]
    },
    {
      title: 'โครงสร้างแบบมีเงื่อนไขใน Python',
      desc: 'ในภาษา Python คีย์เวิร์ดใดถูกนำมาใช้สำหรับการสร้างเงื่อนไขย่อยทางเลือกถัดไป (Else If)?',
      tip: 'ย่อมาจากคำว่า Else และ If ผสมกัน',
      options: [
        { key: 'A', text: 'elseif', isCorrect: false },
        { key: 'B', text: 'elif', isCorrect: true },
        { key: 'C', text: 'else if', isCorrect: false },
        { key: 'D', text: 'case', isCorrect: false }
      ]
    }
  ];

  const teacherTaskText = `ใบงานวิชาการที่ 1.7: ทบทวนทักษะและตรรกะการจับข้อผิดพลาด Python สำหรับ DSA

คำสั่ง:
1. ให้นักเรียนเขียนจำลองฟังก์ชันภาษา Python ขึ้นมา 1 ฟังก์ชัน:
   - ฟังก์ชันรับอาร์เรย์ตัวเลขนำเข้า (List) และอินเด็กซ์ที่ระบุเป้าหมาย
   - ภายในใช้บล็อกโครงสร้าง try-except ดักจับการระบุอินเด็กซ์เกินขอบเขต (IndexError) และทำการพิมพ์แจ้งเตือนเป็นมิตรแทนการปล่อยให้โปรแกรมค้างดับ
2. อ้างอิงจากตัวจำลอง Python Console:
   - จงอธิบายพฤติกรรมการไหลของโปรแกรมเมื่อมี Error เกิดขึ้นภายใต้ try-except และเหตุใดการดักจับข้อผิดพลาดจึงมีความจำเป็นในงานอาชีพ
3. ร่างโค้ดจำลองลงบนกระดาษ หรือส่งซอร์สโค้ดสรุปลงในพื้นที่กระดานส่งรายงาน`;

  return (
    <div className="w-full relative">
      {/* 1️⃣ Layer 1: Ambient Backdrop */}
      <AmbientBackdrop blobs={currentBlobs} blur="blur-[130px]" />

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* Section 1: Python Review Theory */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              บทเรียนวิชาการ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ทบทวนภาษา Python สำหรับโครงสร้างข้อมูล
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              ภาษา <span className="bg-indigo-50 border border-indigo-200/60 text-indigo-900 px-2 py-0.5 rounded text-[14.5px] font-mono font-semibold">Python</span> จัดเป็นหนึ่งในภาษาที่ได้รับความนิยมสูงที่สุดในการเรียนรู้และทดลองเขียนหัวข้อวิทยาการข้อมูล โครงสร้างข้อมูล และขั้นตอนวิธี เนื่องจากไวยากรณ์ที่มีความโปร่งเบา คล้ายคลึงกับรหัสเทียม (Pseudocode) ของมนุษย์ ทำให้เรามุ่งเน้นการแก้ลอจิกและ Big O ได้โดยไม่สับสนกับเครื่องหมายจัดระเบียบ
            </p>

            <div className="bg-indigo-50/60 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-5 border-l-[3px] border-l-indigo-600">
              <p className="text-zinc-700 text-[15px] md:text-base leading-relaxed font-normal">
                อย่างไรก็ดี การเขียนโปรแกรมสำหรับควบคุมโครงสร้างระดับลึก (เช่น Linked List หรือ Stack) มีข้อกำหนดที่นักเรียนจำเป็นต้องแม่นยำในเรื่องลูป การเรียกฟังก์ชันย่อย และบล็อกการจัดการข้อผิดพลาด (Exception Handling) เพื่อป้องกันไม่ให้โครงสร้างบิตเกิดเสียหายเชิงรันไทม์
              </p>
            </div>

            {/* Premium Concept Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <ConceptCard
                symbol="Variables & Conditions"
                title="ตัวแปรและการเปรียบเทียบ"
                description="การสร้างค่าคงที่และการตัดสินใจเลือกเส้นทางการทำงานแบบ elif ไวยากรณ์กระชับสบายตา"
                accent="emerald"
              />
              <ConceptCard
                symbol="Iterative Loops"
                title="ลูปวนซ้ำประมวลผล"
                description="การท่องผ่านสมาชิก (List Traversal) ทีละโหนดด้วยคำสั่ง for loop เพื่อประมวลผล Big O คลาส N"
                accent="cyan"
              />
              <ConceptCard
                symbol="try-except Block"
                title="การดักจับข้อผิดพลาด"
                description="การควบคุมความมั่นคงปลอดภัยเมื่ออ้างอิงอินเด็กซ์เกินขอบเขต ป้องกันบักแอปพลิเคชันค้างถาวร"
                accent="indigo"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Console Screen Simulator */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ตัวจำลองผลลัพธ์โค้ด
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              หน้าจอจำลอง Python Virtual Terminal
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              เลือกหัวข้อโค้ดโปรแกรม Python ที่ต้องการทบทวนในแผงควบคุม และกดปุ่ม **RUN CODE** เพื่อประมวลผลและศึกษาข้อความแสดงผลที่ Virtual Output Console ด้านล่าง
            </p>

            {/* High-Fidelity Simulator Shell with Console Screen */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
              {/* Left Control Panel (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">CONTROL PANEL</span>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-white">
                    <Terminal className="w-5 h-5 text-indigo-400" />
                    <h4 className="text-lg font-bold">เลือกสคริปต์ไวยากรณ์ทบทวน</h4>
                  </div>

                  <OptionSelector
                    options={[
                      { value: 'variables', label: 'ตัวแปร & โครงสร้างเงื่อนไข' },
                      { value: 'loops', label: 'โครงสร้างวนซ้ำ (For Loop)' },
                      { value: 'exceptions', label: 'ดักจับข้อบกพร่อง (Exceptions)' }
                    ]}
                    value={selectedSnippet}
                    onChange={(val) => { setSelectedSnippet(val); setConsoleOutput(''); }}
                    cols={1}
                    mode="pill"
                    activeColor="bg-indigo-600 border-indigo-500 text-white font-bold shadow-md shadow-indigo-500/20"
                  />

                  {/* Interactive Button to run */}
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-98 transition-all disabled:opacity-50"
                  >
                    <Play className="w-4 h-4 text-white" /> RUN PYTHON SCRIPT
                  </button>
                </div>

                {/* Info Callout */}
                <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] leading-relaxed text-slate-400 bg-black/20 p-3 rounded-xl border border-slate-800">
                  <strong>ข้อมูลจำลอง:</strong> เมื่อรันโค้ด ระบบปฏิบัติการจำลองจะทำการพักตัวแปรดิบลงบนพื้นที่หน่วยความจำแรมเสมือนจริง และส่งผลลัพธ์ของ Print Command สะท้อนขึ้นคอนโซล
                </div>
              </div>

              {/* Right Data Panel (7 Cols) with ConsoleScreen */}
              <div className="lg:col-span-7 flex flex-col justify-stretch">
                <ConsoleScreen
                  label="# virtual python runner v3.9"
                  accentLabel="live terminal script"
                  accentColor="text-indigo-400"
                  codeBlock={
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner font-mono text-[13px] text-slate-300 leading-relaxed overflow-x-auto min-h-[150px]">
                      <pre>{snippets[selectedSnippet].code}</pre>
                    </div>
                  }
                  isLoading={isRunning}
                  output={consoleOutput}
                  outputColor="text-emerald-400"
                  placeholder="คลิกปุ่ม RUN PYTHON SCRIPT เพื่อดูเอาต์พุตผลลัพธ์จำลอง"
                  multiline={true}
                />
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
              แบบทดสอบประเมินไวยากรณ์ทบทวนพื้นฐาน Python
            </h3>
          </div>

          <div className="pt-2">
            <QuizEngine
              title="แบบทดสอบตรรกะและไวยากรณ์ Python สำหรับโครงสร้างข้อมูล"
              description="ตอบคำถามเพื่อวิเคราะห์เงื่อนไข ดัชนีอาร์เรย์ และ try-except ปราศจากบั๊กค้างระบบ"
              levels={quizQuestions}
              accentColor="from-teal-600/20 to-emerald-500/10"
              icon={<Sparkles className="w-6 h-6 text-teal-400 animate-pulse" />}
            />
          </div>
        </section>

        {/* Section 5: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ภารกิจส่งงาน: การดักจับโครงสร้างข้อผิดพลาดอาเรย์ด้วย Python"
          taskText={teacherTaskText}
        />
      </main>
    </div>
  );
}
