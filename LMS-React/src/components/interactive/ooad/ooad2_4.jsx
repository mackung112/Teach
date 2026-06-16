import React, { useState, useEffect } from 'react';
import { 
  SimulatorShell, 
  ContentCard, 
  SectionBlock, 
  AmbientBackdrop 
} from '../shared';
import { 
  ArrowRightLeft, 
  Clock, 
  User, 
  MonitorSmartphone, 
  Server, 
  Database,
  PlayCircle,
  RotateCcw,
  MessageSquareShare
} from 'lucide-react';

const SEQUENCE_BLOBS = [
  { color: 'bg-indigo-500', size: 'w-72 h-72', top: '-10%', left: '-10%', delay: '0s' },
  { color: 'bg-violet-500', size: 'w-80 h-80', bottom: '-20%', right: '-10%', delay: '2s' },
];

export default function OOAD2_4() {
  const [step, setStep] = useState(0); // 0: Idle, 1: Fill Form, 2: Validate, 3: Send API, 4: Query DB, 5: DB Return, 6: API Return, 7: Show UI
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      if (step < 7) {
        timer = setTimeout(() => setStep(prev => prev + 1), 1500);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [step, isPlaying]);

  const handleStart = () => {
    setStep(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 w-full">
      <SimulatorShell title="2.4 แผนภาพลำดับเวลา (Sequence Diagram)">
      <AmbientBackdrop blobs={SEQUENCE_BLOBS} />
      
      <div className="space-y-8 relative z-10">
        <SectionBlock title="Sequence Diagram คืออะไร?">
          <ContentCard 
            title="อธิบายการสื่อสารตามลำดับเวลา (Time-based Interaction)"
            icon={<Clock className="w-5 h-5 text-indigo-400" />}
            color="indigo"
          >
            <p className="text-slate-300 mb-4 text-sm leading-relaxed">
              <strong>Sequence Diagram</strong> ใช้เพื่ออธิบายการทำงานร่วมกันของอ็อบเจกต์ (Objects) ว่ามีการพูดคุยหรือส่งข้อความ (Message) หากันอย่างไร ตามลำดับเวลาที่เกิดขึ้นจริงตั้งแต่ต้นจนจบ นิยมใช้เพื่อแสดงพฤติกรรมใน 1 Use Case แบบ Step-by-Step
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <h4 className="text-indigo-300 font-bold text-sm mb-2">องค์ประกอบหลัก</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li><strong className="text-indigo-200">Actor:</strong> ผู้ใช้งานหรือระบบภายนอกที่เริ่มต้นกระบวนการ</li>
                  <li><strong className="text-indigo-200">Lifeline:</strong> เส้นประแนวตั้ง แสดงช่วงชีวิตหรือเวลาที่อ็อบเจกต์นั้นมีอยู่</li>
                  <li><strong className="text-indigo-200">Activation Box:</strong> กล่องสี่เหลี่ยมบนเส้น Lifeline แสดงช่วงที่อ็อบเจกต์กำลังประมวลผล</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <h4 className="text-violet-300 font-bold text-sm mb-2">การสื่อสาร (Messages)</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li><strong className="text-violet-200">Sync Message:</strong> ลูกศรทึบ (ส่งแล้วรอคำตอบ)</li>
                  <li><strong className="text-violet-200">Return Message:</strong> ลูกศรเส้นประ (ส่งคำตอบกลับ)</li>
                  <li><strong className="text-violet-200">Self Message:</strong> ลูกศรวนกลับมาหาตัวเอง (ทำงานภายใน)</li>
                  <li><strong className="text-violet-200">Fragment (alt/opt/loop):</strong> กล่องคลุมเงื่อนไขการทำงาน</li>
                </ul>
              </div>
            </div>
          </ContentCard>
        </SectionBlock>

        <SectionBlock title="Interactive: Message Tracer Simulator">
          <ContentCard 
            title="จำลองการส่งข้อความ: ระบบ Login (Full Flow)" 
            icon={<MessageSquareShare className="w-5 h-5 text-violet-400" />}
            color="violet"
          >
            <div className="mb-6 flex justify-between items-center">
              <p className="text-sm text-slate-300">
                จำลองการสื่อสารระหว่าง <strong>User, UI, API Server, และ Database</strong> เมื่อทำการเข้าสู่ระบบ
              </p>
              <div className="flex gap-2">
                {!isPlaying && step === 0 && (
                  <button onClick={handleStart} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors">
                    <PlayCircle className="w-4 h-4" /> จำลองเหตุการณ์
                  </button>
                )}
                <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
                  <RotateCcw className="w-4 h-4" /> เริ่มใหม่
                </button>
              </div>
            </div>

            {/* Sequence Diagram Simulator */}
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-6 relative overflow-x-auto backdrop-blur-md font-mono min-h-[500px]">
              <div className="min-w-[700px] relative h-[450px]">
                
                {/* Headers (Actors / Objects) */}
                <div className="flex justify-between px-10 absolute top-0 left-0 right-0 z-20">
                  <div className="flex flex-col items-center gap-2 w-24">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-500 text-slate-300">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-slate-400 font-bold">:User</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 w-24">
                    <div className="w-24 py-2 bg-blue-900/50 rounded border-2 border-blue-500/50 flex items-center justify-center text-blue-300">
                      <MonitorSmartphone className="w-4 h-4 mr-2" /> UI
                    </div>
                    <span className="text-xs text-slate-400 font-bold">Login Page</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 w-24">
                    <div className="w-24 py-2 bg-indigo-900/50 rounded border-2 border-indigo-500/50 flex items-center justify-center text-indigo-300">
                      <Server className="w-4 h-4 mr-2" /> API
                    </div>
                    <span className="text-xs text-slate-400 font-bold">AuthService</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 w-24">
                    <div className="w-24 py-2 bg-purple-900/50 rounded border-2 border-purple-500/50 flex items-center justify-center text-purple-300">
                      <Database className="w-4 h-4 mr-2" /> DB
                    </div>
                    <span className="text-xs text-slate-400 font-bold">SqlDB</span>
                  </div>
                </div>

                {/* Lifelines */}
                <div className="absolute top-16 bottom-0 left-[5.5rem] w-px border-l-2 border-dashed border-slate-600/50 z-0"></div>
                <div className="absolute top-16 bottom-0 left-[calc(33.33%-2rem)] w-px border-l-2 border-dashed border-slate-600/50 z-0"></div>
                <div className="absolute top-16 bottom-0 right-[calc(33.33%-2rem)] w-px border-l-2 border-dashed border-slate-600/50 z-0"></div>
                <div className="absolute top-16 bottom-0 right-[5.5rem] w-px border-l-2 border-dashed border-slate-600/50 z-0"></div>

                {/* --- Messages & Activations --- */}

                {/* UI Activation Box */}
                <div className={`absolute top-24 left-[calc(33.33%-2rem-6px)] w-3 bg-blue-500/50 border border-blue-400 rounded-sm z-10 transition-all duration-500 ${step >= 1 ? 'h-[320px] opacity-100' : 'h-0 opacity-0'}`}></div>

                {/* Step 1: User fills form */}
                <div className={`absolute top-[110px] left-[5.5rem] right-[calc(66.66%+2rem)] h-px bg-slate-400 z-10 transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-300 whitespace-nowrap bg-slate-900 px-1">1: fillForm(user, pass)</div>
                  <div className="absolute right-0 -mt-[4px] w-0 h-0 border-t-[4px] border-b-[4px] border-l-[8px] border-transparent border-l-slate-400"></div>
                  {step === 1 && <div className="absolute top-0 left-0 h-full w-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse"></div>}
                </div>

                {/* Step 2: Validate Self Message */}
                <div className={`absolute top-[140px] left-[calc(33.33%-2rem+6px)] w-8 h-10 border-t border-r border-b border-blue-400 z-10 rounded-r transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute -top-5 left-10 text-[10px] text-blue-300 whitespace-nowrap bg-slate-900 px-1">2: validate()</div>
                  <div className="absolute bottom-0 left-0 -ml-[4px] -mb-[4px] w-0 h-0 border-t-[4px] border-b-[4px] border-r-[8px] border-transparent border-r-blue-400"></div>
                  {step === 2 && <div className="absolute top-0 right-0 w-1 h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse"></div>}
                </div>

                {/* Fragment: alt (Validation Success) */}
                <div className={`absolute top-[190px] left-[4rem] right-[4rem] h-[240px] border border-slate-600/50 bg-slate-800/20 z-0 transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute top-0 left-0 px-2 py-1 bg-slate-700/50 border-r border-b border-slate-600/50 text-[10px] font-bold text-slate-300 rounded-br">alt [isValid]</div>
                </div>

                {/* API Activation Box */}
                <div className={`absolute top-[210px] right-[calc(33.33%-2rem-6px)] w-3 bg-indigo-500/50 border border-indigo-400 rounded-sm z-10 transition-all duration-500 ${step >= 3 ? 'h-[160px] opacity-100' : 'h-0 opacity-0'}`}></div>

                {/* Step 3: Send API */}
                <div className={`absolute top-[220px] left-[calc(33.33%-2rem+6px)] right-[calc(33.33%-2rem+6px)] h-px bg-indigo-400 z-10 transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-indigo-300 whitespace-nowrap bg-slate-900 px-1">3: authenticate(request)</div>
                  <div className="absolute right-0 -mt-[4px] w-0 h-0 border-t-[4px] border-b-[4px] border-l-[8px] border-transparent border-l-indigo-400"></div>
                  {step === 3 && <div className="absolute top-0 left-0 h-full w-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse"></div>}
                </div>

                {/* DB Activation Box */}
                <div className={`absolute top-[250px] right-[calc(5.5rem-6px)] w-3 bg-purple-500/50 border border-purple-400 rounded-sm z-10 transition-all duration-500 ${step >= 4 ? 'h-[80px] opacity-100' : 'h-0 opacity-0'}`}></div>

                {/* Step 4: Query DB */}
                <div className={`absolute top-[260px] left-[calc(66.66%+2rem+6px)] right-[5.5rem] h-px bg-purple-400 z-10 transition-opacity duration-500 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-purple-300 whitespace-nowrap bg-slate-900 px-1">4: queryUser(username)</div>
                  <div className="absolute right-0 -mt-[4px] w-0 h-0 border-t-[4px] border-b-[4px] border-l-[8px] border-transparent border-l-purple-400"></div>
                  {step === 4 && <div className="absolute top-0 left-0 h-full w-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse"></div>}
                </div>

                {/* Step 5: DB Return */}
                <div className={`absolute top-[310px] right-[calc(33.33%-2rem-6px)] left-[calc(66.66%+2rem+6px)] h-px border-b border-dashed border-purple-400 z-10 transition-opacity duration-500 ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-purple-300 whitespace-nowrap bg-slate-900 px-1">5: userData</div>
                  <div className="absolute left-0 -mt-[4px] w-0 h-0 border-t-[4px] border-b-[4px] border-r-[8px] border-transparent border-r-purple-400"></div>
                  {step === 5 && <div className="absolute top-0 left-0 h-full w-full border-b border-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse"></div>}
                </div>

                {/* Step 6: API Return */}
                <div className={`absolute top-[350px] right-[calc(66.66%+2rem-6px)] left-[calc(33.33%-2rem+6px)] h-px border-b border-dashed border-indigo-400 z-10 transition-opacity duration-500 ${step >= 6 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-indigo-300 whitespace-nowrap bg-slate-900 px-1">6: token (JWT)</div>
                  <div className="absolute left-0 -mt-[4px] w-0 h-0 border-t-[4px] border-b-[4px] border-r-[8px] border-transparent border-r-indigo-400"></div>
                  {step === 6 && <div className="absolute top-0 left-0 h-full w-full border-b border-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse"></div>}
                </div>

                {/* Step 7: Show UI */}
                <div className={`absolute top-[400px] right-[calc(100%-5.5rem)] left-[5.5rem] h-px border-b border-dashed border-blue-400 z-10 transition-opacity duration-500 ${step >= 7 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-blue-300 whitespace-nowrap bg-slate-900 px-1">7: redirect(/dashboard)</div>
                  <div className="absolute left-0 -mt-[4px] w-0 h-0 border-t-[4px] border-b-[4px] border-r-[8px] border-transparent border-r-blue-400"></div>
                  {step === 7 && <div className="absolute top-0 left-0 h-full w-full border-b border-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse"></div>}
                </div>

              </div>
            </div>

            {/* Status Panel */}
            <div className="mt-4 bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
              <h4 className="text-slate-300 font-bold text-sm mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" /> สถานะปัจจุบัน (Timeline: {step}/7)
              </h4>
              <p className="text-slate-400 text-sm">
                {step === 0 && "รอผู้ใช้เริ่มกระบวนการ..."}
                {step === 1 && <span className="text-slate-200">User &rarr; UI: ผู้ใช้กรอกข้อมูล Username และ Password</span>}
                {step === 2 && <span className="text-blue-300">UI &rarr; UI (Self Message): ตรวจสอบความถูกต้องของข้อมูล (Validation) ฝั่งหน้าบ้าน</span>}
                {step === 3 && <span className="text-indigo-300">UI &rarr; API (Sync Message): ส่งข้อมูลไปให้ Server ทำการ Authentication รอคำตอบ...</span>}
                {step === 4 && <span className="text-purple-300">API &rarr; DB (Sync Message): Server Query ข้อมูลผู้ใช้จากฐานข้อมูล</span>}
                {step === 5 && <span className="text-purple-300">DB &rarr; API (Return Message): ฐานข้อมูลส่งข้อมูลดิบกลับมาให้ Server</span>}
                {step === 6 && <span className="text-indigo-300">API &rarr; UI (Return Message): Server ตรวจสอบรหัสสำเร็จ สร้าง Token และส่งกลับให้หน้าจอ</span>}
                {step === 7 && <span className="text-blue-300">UI &rarr; User (Return): หน้าจอเปลี่ยนไปที่ /dashboard ให้ผู้ใช้เริ่มใช้งานได้</span>}
              </p>
            </div>
          </ContentCard>
        </SectionBlock>
      </div>
    </SimulatorShell>
    </div>
  );
}
