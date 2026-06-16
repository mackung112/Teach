import React, { useState } from 'react';
import { 
  SimulatorShell, 
  ContentCard, 
  SectionBlock, 
  AmbientBackdrop 
} from '../shared';
import { 
  Users, 
  UserCircle,
  Settings,
  ShieldCheck,
  MousePointer2,
  BoxSelect,
  Link,
  ChevronRight
} from 'lucide-react';

const USECASE_BLOBS = [
  { color: 'bg-green-500', size: 'w-72 h-72', top: '-10%', left: '-10%', delay: '0s' },
  { color: 'bg-emerald-500', size: 'w-80 h-80', bottom: '-20%', right: '-10%', delay: '2s' },
];

export default function OOAD2_5() {
  const [activeElement, setActiveElement] = useState('none');

  const usecaseData = {
    none: {
      title: 'แผนภาพยูสเคส (Use Case Diagram)',
      desc: 'ชี้เมาส์ไปที่ส่วนต่างๆ ของแผนภาพระบบโหวต (Voting System) เพื่อดูคำอธิบาย'
    },
    actor_user: {
      title: 'Actor: ผู้ใช้ (User)',
      desc: 'สิ่งภายนอกระบบที่เป็นคนกระทำกับระบบ วาดด้วยรูปคน (Stickman)'
    },
    actor_timer: {
      title: 'Actor: ระบบตั้งเวลา (Timer)',
      desc: 'สิ่งภายนอกที่ไม่ใช่คน (เช่น ระบบอื่น หรือ เวลา) ก็ถือเป็น Actor ได้ แต่มักวาดด้วยสัญลักษณ์อื่นที่ไม่ใช่คน'
    },
    boundary: {
      title: 'System Boundary (ขอบเขตระบบ)',
      desc: 'กรอบสี่เหลี่ยมที่ครอบ Use case ทั้งหมดไว้ เพื่อบอกขอบเขตว่าอะไรอยู่ในระบบ และอะไรอยู่ภายนอกระบบ'
    },
    uc_auth: {
      title: 'Use case: ยืนยันตัวตน',
      desc: 'ฟังก์ชันหรือความสามารถหลักของระบบ วาดด้วยวงรี'
    },
    uc_vote: {
      title: 'Use case: ตั้งหัวข้อโหวต',
      desc: 'ผู้ใช้สามารถสร้างหัวข้อโหวตใหม่ได้ในระบบ'
    },
    uc_close_vote: {
      title: 'Use case: ปิดโหวต',
      desc: 'ความสามารถในการปิดโหวต ซึ่งสามารถถูกเรียกใช้งานได้จาก Actor'
    },
    uc_pin: {
      title: 'Use case: ยืนยันด้วย PIN',
      desc: 'ฟังก์ชันเสริมที่ถูกเรียกใช้ในบางกรณี ไม่ได้ทำงานด้วยตัวเองโดดๆ'
    },
    uc_private_vote: {
      title: 'Use case: ตั้งหัวข้อโหวตลับ',
      desc: 'ฟังก์ชันที่มีความสามารถคล้ายการตั้งหัวข้อโหวตปกติ แต่มีการเพิ่มเงื่อนไขความลับ'
    },
    rel_association: {
      title: 'Association (ความสัมพันธ์)',
      desc: 'เส้นตรงที่เชื่อมระหว่าง Actor กับ Use case เพื่อบอกว่าใครมีสิทธิ์ทำอะไรได้บ้างในระบบ'
    },
    rel_include: {
      title: '<<include>> (จำเป็นต้องทำ)',
      desc: 'ลูกศรเส้นประชี้ไปยัง Use case ที่ "ต้องทำเสมอ" เช่น จะตั้งโหวตได้ "ต้อง" ยืนยันตัวตนก่อน'
    },
    rel_extend: {
      title: '<<extend>> (เสริมเข้ามา)',
      desc: 'ลูกศรเส้นประชี้ไปยัง Use case หลัก เพื่อบอกว่าความสามารถนี้อาจถูก "เรียกเสริม" ในบางกรณี (ทางเลือก)'
    },
    rel_generalization: {
      title: 'Generalization (สืบทอด)',
      desc: 'ลูกศรสามเหลี่ยมโปร่ง บอกว่า Use case นี้เป็นประเภทย่อยของ Use case หลัก (เหมือนการสืบทอดใน Class)'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 w-full">
      <SimulatorShell title="2.5 แผนภาพยูสเคส (Use Case Diagram)">
      <AmbientBackdrop blobs={USECASE_BLOBS} />
      
      <div className="space-y-8 relative z-10">
        <SectionBlock title="Use Case Diagram คืออะไร?">
          <ContentCard 
            title="อธิบายภาพรวมของระบบแบบเข้าใจง่าย (Bird's-eye View)"
            icon={<Users className="w-5 h-5 text-green-400" />}
            color="green"
          >
            <p className="text-slate-300 mb-4 text-sm leading-relaxed">
              <strong>Use Case Diagram</strong> เป็นแผนภาพที่ใช้อธิบายว่าในระบบมี "ใคร" (Actor) ทำ "อะไร" (Use Case) ได้บ้าง เหมาะมากสำหรับใช้คุยกับลูกค้าหรือคนในทีมที่ไม่ใช่โปรแกรมเมอร์ให้เข้าใจภาพรวมของระบบตรงกันอย่างรวดเร็ว โดยซ่อนความซับซ้อนทางเทคนิคไว้ทั้งหมด
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <h4 className="text-green-300 font-bold text-sm mb-2">องค์ประกอบหลัก</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li><strong className="text-green-200">Actor:</strong> ผู้ใช้งานหรือระบบภายนอก (รูปคนหรือกล่อง)</li>
                  <li><strong className="text-green-200">Use Case:</strong> ฟังก์ชันการทำงานของระบบ (วงรี)</li>
                  <li><strong className="text-green-200">System Boundary:</strong> ขอบเขตของระบบ (กรอบสี่เหลี่ยม)</li>
                  <li><strong className="text-green-200">Association:</strong> เส้นเชื่อมโยงบอกสิทธิ์การใช้งาน (เส้นทึบ)</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <h4 className="text-emerald-300 font-bold text-sm mb-2">ความสัมพันธ์ระดับ Use Case</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li><strong className="text-emerald-200">&lt;&lt;include&gt;&gt;:</strong> บังคับต้องทำ ขาดไม่ได้ (เส้นประ + ลูกศรเปิด)</li>
                  <li><strong className="text-emerald-200">&lt;&lt;extend&gt;&gt;:</strong> ทางเลือกเสริม อาจจะทำหรือไม่ทำก็ได้</li>
                  <li><strong className="text-emerald-200">Generalization:</strong> ต่อยอดความสามารถ (ลูกศรสามเหลี่ยม)</li>
                </ul>
              </div>
            </div>
          </ContentCard>
        </SectionBlock>

        <SectionBlock title="Interactive: Boundary & Relationship Explorer">
          <ContentCard 
            title="จำลองระบบโหวต (Voting System)" 
            icon={<BoxSelect className="w-5 h-5 text-emerald-400" />}
            color="emerald"
          >
            <p className="text-sm text-slate-300 mb-6 flex items-center gap-2">
              <MousePointer2 className="w-4 h-4 text-emerald-400" />
              ชี้เมาส์ (Hover) ไปที่องค์ประกอบต่างๆ เพื่อดูความหมายและการนำไปใช้งาน
            </p>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Diagram Area */}
              <div 
                className="flex-[2] bg-slate-900/80 border border-slate-700/50 rounded-xl p-8 relative overflow-x-auto backdrop-blur-md min-h-[550px] flex justify-center items-center"
                onMouseLeave={() => setActiveElement('none')}
              >
                <div className="relative w-full max-w-[600px] h-[450px]">
                  
                  {/* System Boundary */}
                  <div 
                    className={`absolute inset-y-0 left-[100px] right-[100px] border-2 rounded-lg bg-slate-800/30 transition-all duration-300 ${activeElement === 'boundary' ? 'border-emerald-400 bg-emerald-900/20 shadow-[0_0_15px_rgba(52,211,153,0.3)]' : 'border-slate-600 border-dashed'}`}
                    onMouseEnter={() => setActiveElement('boundary')}
                  >
                    <div className="absolute top-2 left-4 text-sm font-bold text-slate-400">Voting System</div>
                  </div>

                  {/* Actor 1: User */}
                  <div 
                    className="absolute top-24 left-0 flex flex-col items-center gap-2 cursor-pointer z-10 w-20"
                    onMouseEnter={() => setActiveElement('actor_user')}
                  >
                    <div className={`transition-all ${activeElement === 'actor_user' ? 'text-emerald-400 scale-110 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'text-slate-300'}`}>
                      <UserCircle className="w-12 h-12" />
                    </div>
                    <span className={`text-xs font-bold ${activeElement === 'actor_user' ? 'text-emerald-400' : 'text-slate-400'}`}>ผู้ใช้</span>
                  </div>

                  {/* Actor 2: Timer */}
                  <div 
                    className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col items-center gap-2 cursor-pointer z-10 w-24"
                    onMouseEnter={() => setActiveElement('actor_timer')}
                  >
                    <div className={`transition-all p-3 rounded-lg border-2 ${activeElement === 'actor_timer' ? 'border-emerald-400 bg-emerald-900/40 text-emerald-400 scale-110 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'border-slate-500 bg-slate-800 text-slate-300'}`}>
                      <Settings className="w-8 h-8" />
                    </div>
                    <span className={`text-xs font-bold ${activeElement === 'actor_timer' ? 'text-emerald-400' : 'text-slate-400'}`}>ระบบจัดการเวลา</span>
                  </div>

                  {/* Use Case 1: Auth */}
                  <div 
                    className={`absolute top-12 left-1/2 -translate-x-1/2 w-32 h-16 rounded-[50%] flex flex-col items-center justify-center border-2 cursor-pointer z-10 transition-all ${activeElement === 'uc_auth' ? 'border-green-400 bg-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.5)] scale-105' : 'border-slate-500 bg-slate-800'}`}
                    onMouseEnter={() => setActiveElement('uc_auth')}
                  >
                    <ShieldCheck className={`w-4 h-4 mb-1 ${activeElement === 'uc_auth' ? 'text-green-300' : 'text-slate-400'}`} />
                    <span className={`text-xs font-bold ${activeElement === 'uc_auth' ? 'text-green-200' : 'text-slate-300'}`}>ยืนยันตัวตน</span>
                  </div>

                  {/* Use Case 1.1: PIN (Extend) */}
                  <div 
                    className={`absolute top-12 right-[120px] w-28 h-12 rounded-[50%] flex items-center justify-center border-2 cursor-pointer z-10 transition-all ${activeElement === 'uc_pin' ? 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.5)] scale-105' : 'border-slate-500 bg-slate-800'}`}
                    onMouseEnter={() => setActiveElement('uc_pin')}
                  >
                    <span className={`text-xs font-bold ${activeElement === 'uc_pin' ? 'text-emerald-200' : 'text-slate-300'}`}>ยืนยัน PIN</span>
                  </div>

                  {/* Use Case 2: Create Vote */}
                  <div 
                    className={`absolute top-40 left-[120px] w-36 h-16 rounded-[50%] flex items-center justify-center border-2 cursor-pointer z-10 transition-all ${activeElement === 'uc_vote' ? 'border-green-400 bg-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.5)] scale-105' : 'border-slate-500 bg-slate-800'}`}
                    onMouseEnter={() => setActiveElement('uc_vote')}
                  >
                    <span className={`text-xs font-bold ${activeElement === 'uc_vote' ? 'text-green-200' : 'text-slate-300'}`}>ตั้งหัวข้อโหวต</span>
                  </div>

                  {/* Use Case 2.1: Private Vote (Generalization) */}
                  <div 
                    className={`absolute bottom-24 left-[120px] w-36 h-16 rounded-[50%] flex items-center justify-center border-2 cursor-pointer z-10 transition-all ${activeElement === 'uc_private_vote' ? 'border-green-400 bg-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.5)] scale-105' : 'border-slate-500 bg-slate-800'}`}
                    onMouseEnter={() => setActiveElement('uc_private_vote')}
                  >
                    <span className={`text-xs font-bold ${activeElement === 'uc_private_vote' ? 'text-green-200' : 'text-slate-300'}`}>ตั้งโหวตกลุ่มลับ</span>
                  </div>

                  {/* Use Case 3: Close Vote */}
                  <div 
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-16 rounded-[50%] flex items-center justify-center border-2 cursor-pointer z-10 transition-all ${activeElement === 'uc_close_vote' ? 'border-green-400 bg-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.5)] scale-105' : 'border-slate-500 bg-slate-800'}`}
                    onMouseEnter={() => setActiveElement('uc_close_vote')}
                  >
                    <span className={`text-xs font-bold ${activeElement === 'uc_close_vote' ? 'text-green-200' : 'text-slate-300'}`}>ปิดโหวต</span>
                  </div>

                  {/* --- Lines & Relationships --- */}

                  {/* User -> Auth (Association) */}
                  <div 
                    className="absolute top-[100px] left-[60px] w-[140px] h-[20px] -rotate-12 cursor-pointer z-0 group"
                    onMouseEnter={() => setActiveElement('rel_association')}
                  >
                    <div className={`w-full h-[2px] mt-[9px] transition-colors ${activeElement === 'rel_association' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-500'}`}></div>
                  </div>

                  {/* User -> Create Vote (Association) */}
                  <div 
                    className="absolute top-[130px] left-[60px] w-[70px] h-[60px] rotate-45 cursor-pointer z-0 group"
                    onMouseEnter={() => setActiveElement('rel_association')}
                  >
                    <div className={`w-full h-[2px] mt-[29px] transition-colors ${activeElement === 'rel_association' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-500'}`}></div>
                  </div>

                  {/* User -> Close Vote (Association) */}
                  <div 
                    className="absolute top-[140px] left-[50px] w-[170px] h-[100px] rotate-24 cursor-pointer z-0 group"
                    onMouseEnter={() => setActiveElement('rel_association')}
                  >
                     {/* Using SVG for precise cross-diagonal lines */}
                     <svg className="absolute inset-0 w-full h-full pointer-events-none">
                       <line x1="10" y1="0" x2="160" y2="90" stroke={activeElement === 'rel_association' ? '#34d399' : '#64748b'} strokeWidth="2" className="transition-colors" />
                     </svg>
                  </div>

                  {/* Timer -> Close Vote (Association) */}
                  <div 
                    className="absolute top-[230px] right-[80px] w-[110px] h-[20px] cursor-pointer z-0 group"
                    onMouseEnter={() => setActiveElement('rel_association')}
                  >
                    <div className={`w-full h-[2px] mt-[9px] transition-colors ${activeElement === 'rel_association' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-500'}`}></div>
                  </div>

                  {/* PIN -> Auth (Extend) */}
                  <div 
                    className="absolute top-16 right-[230px] w-[45px] h-[20px] cursor-pointer z-0 group flex items-center justify-start"
                    onMouseEnter={() => setActiveElement('rel_extend')}
                  >
                    {/* Arrow head pointing left */}
                    <ChevronRight className={`absolute left-[-10px] w-5 h-5 rotate-180 transition-colors ${activeElement === 'rel_extend' ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <div className={`w-full h-0 border-t-2 border-dashed transition-colors ${activeElement === 'rel_extend' ? 'border-emerald-400' : 'border-slate-500'}`}></div>
                    <div className="absolute -top-4 left-0 text-[10px] font-bold text-slate-400 whitespace-nowrap bg-slate-900 px-1">&lt;&lt;extend&gt;&gt;</div>
                  </div>

                  {/* Create Vote -> Auth (Include) */}
                  <div 
                    className="absolute top-28 left-[220px] w-[40px] h-[60px] cursor-pointer z-0 group flex flex-col items-center justify-start"
                    onMouseEnter={() => setActiveElement('rel_include')}
                  >
                    {/* Arrow head pointing up */}
                    <ChevronRight className={`absolute top-[-10px] left-[6px] w-5 h-5 -rotate-90 transition-colors ${activeElement === 'rel_include' ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <div className={`h-full w-0 border-l-2 border-dashed transition-colors ${activeElement === 'rel_include' ? 'border-emerald-400' : 'border-slate-500'}`}></div>
                    <div className="absolute top-1/2 left-2 text-[10px] font-bold text-slate-400 whitespace-nowrap bg-slate-900 px-1 rotate-0">&lt;&lt;include&gt;&gt;</div>
                  </div>

                  {/* Private Vote -> Create Vote (Generalization) */}
                  <div 
                    className="absolute bottom-40 left-[180px] w-[20px] h-[40px] cursor-pointer z-0 group flex flex-col items-center justify-start"
                    onMouseEnter={() => setActiveElement('rel_generalization')}
                  >
                    {/* Generalization Triangle Arrow pointing up */}
                    <div className={`w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent transition-colors z-20 ${activeElement === 'rel_generalization' ? 'border-b-emerald-400 scale-125' : 'border-b-white'} -mb-[1px]`}></div>
                    <div className={`h-full w-[2px] transition-colors ${activeElement === 'rel_generalization' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-500'}`}></div>
                  </div>

                </div>
              </div>

              {/* Info Panel */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl h-full flex flex-col">
                  <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Link className="w-5 h-5" /> คำอธิบายสัญลักษณ์
                  </h3>
                  
                  <div className="flex-1 flex flex-col justify-center">
                    <div key={activeElement} className="animate-fade-in">
                      <h4 className="text-lg font-bold text-slate-200 mb-2">{usecaseData[activeElement].title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800/80">
                        {usecaseData[activeElement].desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 text-xs text-slate-500 bg-slate-900/50 p-3 rounded text-center border border-slate-800/50">
                    <strong>ข้อควรระวัง:</strong> อย่าเขียนทุกเงื่อนไขลงใน Use Case Diagram มันควรเป็นแค่ภาพกว้างๆ ส่วนรายละเอียดให้ไปเขียนใน Use Case Specification แทน
                  </div>
                </div>
              </div>

            </div>
          </ContentCard>
        </SectionBlock>
      </div>
    </SimulatorShell>
    </div>
  );
}
