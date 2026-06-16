import React from 'react';
import { Code, Terminal, ArrowRight, Waypoints } from 'lucide-react';

export default function Ooad2_4() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16">
      
      <section className="space-y-6">
        <div className="border-b border-zinc-200/80 pb-4">
          <span className="text-sm font-bold text-rose-500 tracking-wider uppercase">
            From Diagram to Code
          </span>
          <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
            2.4 การแปลง Activity Diagram เป็นโค้ด
          </h3>
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-8 border-l-[3.5px] border-l-rose-500/80">
          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
            ประโยชน์ที่แท้จริงของการวาด Activity Diagram คือการเป็น <strong>พิมพ์เขียว (Blueprint)</strong> ให้โปรแกรมเมอร์นำไปเขียนโค้ดได้อย่างถูกต้องและไม่มีเงื่อนไขตกหล่น โหนดแต่ละประเภทบนแผนภาพสามารถแปลงเป็นคำสั่ง (Syntax) ในภาษาโปรแกรมได้โดยตรง
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Example 1: Decision to If-Else */}
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 border border-slate-700 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 bg-slate-800/80 rounded-bl-2xl">
              <Code className="w-5 h-5 text-rose-400" />
            </div>
            
            <h4 className="text-[20px] font-bold text-white mb-6">1. Decision ➜ If-Else</h4>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 flex flex-col items-center bg-slate-800/50 p-6 rounded-xl border border-slate-700 w-full">
                <div className="w-12 h-12 border-[3px] border-orange-500 bg-white rotate-45 mb-4 shadow-[0_0_15px_rgba(249,115,22,0.3)]"></div>
                <div className="flex justify-between w-full text-[13px] font-bold">
                  <span className="text-orange-400">[Credit]</span>
                  <span className="text-orange-400">[Transfer]</span>
                </div>
              </div>
              
              <div className="shrink-0 text-slate-500">
                <ArrowRight className="w-8 h-8" />
              </div>
              
              <div className="flex-1 w-full bg-[#1E1E1E] rounded-xl p-4 border border-slate-700 font-mono text-[13.5px] leading-relaxed shadow-inner">
                <span className="text-rose-400">if</span> (payment == <span className="text-green-400">'credit'</span>) {'{'}
                <br/>
                &nbsp;&nbsp;<span className="text-blue-400">processCreditCard</span>();
                <br/>
                {'}'} <span className="text-rose-400">else</span> {'{'}
                <br/>
                &nbsp;&nbsp;<span className="text-blue-400">verifySlip</span>();
                <br/>
                {'}'}
              </div>
            </div>
          </div>

          {/* Example 2: Activity to Function Call */}
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 border border-slate-700 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 bg-slate-800/80 rounded-bl-2xl">
              <Terminal className="w-5 h-5 text-indigo-400" />
            </div>
            
            <h4 className="text-[20px] font-bold text-white mb-6">2. Activity ➜ Function Call</h4>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 flex flex-col items-center bg-slate-800/50 p-6 rounded-xl border border-slate-700 w-full">
                <div className="px-6 py-3 border-[2px] border-indigo-500 bg-white rounded-[12px] text-indigo-700 font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                  จัดส่งสินค้า
                </div>
              </div>
              
              <div className="shrink-0 text-slate-500">
                <ArrowRight className="w-8 h-8" />
              </div>
              
              <div className="flex-1 w-full bg-[#1E1E1E] rounded-xl p-4 border border-slate-700 font-mono text-[13.5px] leading-relaxed shadow-inner">
                <span className="text-slate-400">// เรียกใช้งานฟังก์ชัน</span>
                <br/>
                <span className="text-blue-400">shipOrder</span>(orderId);
                <br/>
                <span className="text-slate-400">// หรือ</span>
                <br/>
                <span className="text-blue-400">updateStatus</span>(<span className="text-green-400">'shipped'</span>);
              </div>
            </div>
          </div>

          {/* Example 3: Fork/Join to Parallel/Async */}
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 border border-slate-700 shadow-2xl relative overflow-hidden group lg:col-span-2">
            <div className="absolute top-0 right-0 p-4 bg-slate-800/80 rounded-bl-2xl">
              <Waypoints className="w-5 h-5 text-cyan-400" />
            </div>
            
            <h4 className="text-[20px] font-bold text-white mb-6">3. Fork & Join ➜ Async / Parallel Threads</h4>
            
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-1 flex flex-col items-center bg-slate-800/50 p-6 rounded-xl border border-slate-700 w-full">
                <div className="w-32 h-2 bg-cyan-500 rounded-full mb-4 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                <div className="flex justify-between w-24 px-2">
                  <div className="px-3 py-1.5 border border-cyan-500 bg-white rounded-lg text-cyan-700 font-bold text-xs">A</div>
                  <div className="px-3 py-1.5 border border-cyan-500 bg-white rounded-lg text-cyan-700 font-bold text-xs">B</div>
                </div>
              </div>
              
              <div className="shrink-0 text-slate-500">
                <ArrowRight className="w-8 h-8 rotate-90 lg:rotate-0" />
              </div>
              
              <div className="flex-[2] w-full bg-[#1E1E1E] rounded-xl p-5 border border-slate-700 font-mono text-[13.5px] leading-relaxed shadow-inner">
                <span className="text-slate-400">// JavaScript Promise.all (รอ Join ให้เสร็จทั้งหมด)</span>
                <br/>
                <span className="text-rose-400">await</span> Promise.<span className="text-blue-400">all</span>([
                <br/>
                &nbsp;&nbsp;<span className="text-blue-400">taskA</span>(), <span className="text-slate-400">// Fork สายที่ 1</span>
                <br/>
                &nbsp;&nbsp;<span className="text-blue-400">taskB</span>()  <span className="text-slate-400">// Fork สายที่ 2</span>
                <br/>
                ]);
                <br/>
                <span className="text-slate-400">// เมื่อ A และ B เสร็จสิ้น (Join) ค่อยไปต่อ</span>
                <br/>
                <span className="text-blue-400">nextTask</span>();
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
