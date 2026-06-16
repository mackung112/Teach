import React from 'react';
import { PlayCircle, StopCircle, SquareActivity, ArrowRight, GitMerge, GitBranch, AlignCenterVertical, Columns } from 'lucide-react';

export default function Ooad2_2() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16">
      
      <section className="space-y-6">
        <div className="border-b border-zinc-200/80 pb-4">
          <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
            Elements of Activity Diagram
          </span>
          <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
            2.2 องค์ประกอบของ Activity Diagram
          </h3>
        </div>

        <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
          การวาด Activity Diagram จะใช้สัญลักษณ์มาตรฐานของ UML เพื่อให้ทุกคนสื่อสารตรงกัน โดยมีองค์ประกอบหลัก 8 อย่างที่คุณต้องจำให้แม่นยำ
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 2.2.1 Start */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-md rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:border-slate-800/20">
            <div className="h-20 w-full flex items-center justify-center bg-slate-50 rounded-xl mb-5 border border-slate-200">
              <div className="w-8 h-8 bg-slate-800 rounded-full shadow-md group-hover:scale-110 transition-transform"></div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-slate-100 text-slate-600 font-mono text-[11px] px-2 py-0.5 rounded-md">2.2.1</span>
              <h4 className="text-[18px] font-bold text-zinc-900">จุดเริ่มต้น (Start)</h4>
            </div>
            <p className="text-[15px] text-zinc-600 leading-relaxed">
              จุดวงกลมทึบสีดำ แสดงถึงจุดเริ่มต้นของกระบวนการทั้งหมด ในหนึ่งแผนภาพ <strong>ควรมีเพียง 1 จุดเริ่มต้นเท่านั้น</strong> (ยกเว้นระบบซับซ้อนมาก)
            </p>
          </div>

          {/* 2.2.2 End */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-md rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:border-slate-800/20">
            <div className="h-20 w-full flex items-center justify-center bg-slate-50 rounded-xl mb-5 border border-slate-200">
              <div className="w-8 h-8 rounded-full border-[3px] border-slate-800 flex items-center justify-center bg-white shadow-md group-hover:scale-110 transition-transform">
                <div className="w-4 h-4 bg-slate-800 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-slate-100 text-slate-600 font-mono text-[11px] px-2 py-0.5 rounded-md">2.2.2</span>
              <h4 className="text-[18px] font-bold text-zinc-900">จุดสิ้นสุด (End)</h4>
            </div>
            <p className="text-[15px] text-zinc-600 leading-relaxed">
              จุดวงกลมทึบซ้อนอยู่ในวงกลมโปร่ง แสดงถึงจุดที่กระบวนการสิ้นสุดลงอย่างสมบูรณ์ สามารถมีได้ <strong>หลายจุด</strong> ในหนึ่งแผนภาพ
            </p>
          </div>

          {/* 2.2.3 Activity */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-md rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:border-indigo-500/30 border-b-[4px] border-b-transparent hover:border-b-indigo-500">
            <div className="h-20 w-full flex items-center justify-center bg-indigo-50/50 rounded-xl mb-5 border border-indigo-100">
              <div className="px-6 py-2 border-2 border-indigo-500 bg-white rounded-xl text-indigo-700 font-semibold shadow-sm group-hover:scale-105 transition-transform">
                Activity Name
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-100 text-indigo-700 font-mono text-[11px] px-2 py-0.5 rounded-md">2.2.3</span>
              <h4 className="text-[18px] font-bold text-zinc-900">กิจกรรม (Activity)</h4>
            </div>
            <p className="text-[15px] text-zinc-600 leading-relaxed">
              สี่เหลี่ยมขอบมน ภายในระบุชื่อกิจกรรมที่เป็น <strong>คำกริยา (Verb)</strong> เช่น "ตรวจสอบสลิป" หรือ "ตัดเงินในบัตร"
            </p>
          </div>

          {/* 2.2.4 Transition */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-md rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:border-zinc-400">
            <div className="h-20 w-full flex items-center justify-center bg-slate-50 rounded-xl mb-5 border border-slate-200">
              <div className="w-full max-w-[120px] h-0.5 bg-slate-400 relative">
                <div className="absolute right-[-2px] top-[-5px] border-[6px] border-transparent border-l-slate-400"></div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-slate-100 text-slate-600 font-mono text-[11px] px-2 py-0.5 rounded-md">2.2.4</span>
              <h4 className="text-[18px] font-bold text-zinc-900">เส้นเชื่อม (Transition)</h4>
            </div>
            <p className="text-[15px] text-zinc-600 leading-relaxed">
              เส้นลูกศรชี้ทิศทาง แสดงการไหลของกระบวนการจากกิจกรรมหนึ่งไปสู่อีกกิจกรรมหนึ่งตามลำดับเวลา
            </p>
          </div>

          {/* 2.2.5 Decision */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-md rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:border-orange-500/30 border-b-[4px] border-b-transparent hover:border-b-orange-500">
            <div className="h-20 w-full flex items-center justify-center bg-orange-50/50 rounded-xl mb-5 border border-orange-100 relative">
              <div className="w-10 h-10 border-[3px] border-orange-500 bg-white rotate-45 group-hover:scale-110 transition-transform"></div>
              <div className="absolute top-1/2 -translate-y-1/2 left-4 text-[10px] text-orange-600 font-bold">[True]</div>
              <div className="absolute top-1/2 -translate-y-1/2 right-4 text-[10px] text-orange-600 font-bold">[False]</div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-orange-100 text-orange-700 font-mono text-[11px] px-2 py-0.5 rounded-md">2.2.5</span>
              <h4 className="text-[18px] font-bold text-zinc-900">การตัดสินใจ (Decision)</h4>
            </div>
            <p className="text-[15px] text-zinc-600 leading-relaxed">
              สี่เหลี่ยมขนมเปียกปูน มี 1 เส้นเข้า แต่ <strong>มีหลายเส้นออก</strong> ใช้สร้างทางแยกตามเงื่อนไข (Condition) เช่น [รหัสผ่านถูก] หรือ [รหัสผ่านผิด]
            </p>
          </div>

          {/* 2.2.6 Merge */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-md rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:border-emerald-500/30 border-b-[4px] border-b-transparent hover:border-b-emerald-500">
            <div className="h-20 w-full flex items-center justify-center bg-emerald-50/50 rounded-xl mb-5 border border-emerald-100 relative">
              <div className="w-10 h-10 border-[3px] border-emerald-500 bg-white rotate-45 group-hover:scale-110 transition-transform"></div>
              {/* Fake incoming arrows */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-emerald-300"></div>
              <div className="absolute top-1/2 -translate-y-1/2 left-10 w-4 h-0.5 bg-emerald-300"></div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-100 text-emerald-700 font-mono text-[11px] px-2 py-0.5 rounded-md">2.2.6</span>
              <h4 className="text-[18px] font-bold text-zinc-900">การรวมกลุ่ม (Merge)</h4>
            </div>
            <p className="text-[15px] text-zinc-600 leading-relaxed">
              สัญลักษณ์เหมือน Decision แต่ทำหน้าที่กลับกัน คือ <strong>มีหลายเส้นเข้า แต่มี 1 เส้นออก</strong> ใช้รวมเส้นทางที่แยกออกไปจาก Decision ให้กลับมาเส้นหลัก
            </p>
          </div>

          {/* 2.2.7 Fork */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-md rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:border-cyan-500/30 border-b-[4px] border-b-transparent hover:border-b-cyan-500">
            <div className="h-20 w-full flex items-center justify-center bg-cyan-50/50 rounded-xl mb-5 border border-cyan-100">
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-3 bg-cyan-400"></div>
                <div className="w-16 h-2 bg-cyan-600 rounded-full group-hover:scale-x-110 transition-transform"></div>
                <div className="flex justify-between w-12 mt-1">
                  <div className="w-0.5 h-3 bg-cyan-400"></div>
                  <div className="w-0.5 h-3 bg-cyan-400"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-100 text-cyan-700 font-mono text-[11px] px-2 py-0.5 rounded-md">2.2.7</span>
              <h4 className="text-[18px] font-bold text-zinc-900">การแยกกลุ่ม (Fork)</h4>
            </div>
            <p className="text-[15px] text-zinc-600 leading-relaxed">
              เส้นทึบหนาแนวนอนหรือแนวตั้ง มี 1 เส้นเข้า มี <strong>หลายเส้นออก</strong> ใช้แยกลำดับการทำงานให้เกิดขึ้น <strong>พร้อมๆ กัน (Parallel)</strong>
            </p>
          </div>

          {/* 2.2.8 Join */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-md rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:border-blue-500/30 border-b-[4px] border-b-transparent hover:border-b-blue-500">
            <div className="h-20 w-full flex items-center justify-center bg-blue-50/50 rounded-xl mb-5 border border-blue-100">
              <div className="flex flex-col items-center">
                <div className="flex justify-between w-12 mb-1">
                  <div className="w-0.5 h-3 bg-blue-400"></div>
                  <div className="w-0.5 h-3 bg-blue-400"></div>
                </div>
                <div className="w-16 h-2 bg-blue-600 rounded-full group-hover:scale-x-110 transition-transform"></div>
                <div className="w-0.5 h-3 bg-blue-400"></div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-700 font-mono text-[11px] px-2 py-0.5 rounded-md">2.2.8</span>
              <h4 className="text-[18px] font-bold text-zinc-900">การรวมกลุ่ม (Join)</h4>
            </div>
            <p className="text-[15px] text-zinc-600 leading-relaxed">
              สัญลักษณ์เหมือน Fork แต่ <strong>มีหลายเส้นเข้า มี 1 เส้นออก</strong> ใช้สำหรับ <strong>รอ</strong> ให้การทำงานแบบขนานทั้งหมดเสร็จสิ้นก่อน ค่อยดำเนินงานต่อไป
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
