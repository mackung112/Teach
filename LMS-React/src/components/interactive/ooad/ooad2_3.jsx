import React, { useState, useEffect } from 'react';
import { Play, Square, Navigation } from 'lucide-react';

export default function Ooad2_3() {
  const [activeNode, setActiveNode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [history, setHistory] = useState([]);

  // Node definitions for sequence execution
  const flowSequence = [
    { id: 'start', next: 'select' },
    { id: 'select', next: 'checkout' },
    { id: 'checkout', next: 'decision' },
    { id: 'decision', next: () => paymentMethod === 'credit' ? 'pay_credit' : 'pay_transfer' },
    { id: 'pay_credit', next: 'merge' },
    { id: 'pay_transfer', next: 'merge' },
    { id: 'merge', next: 'prepare' },
    { id: 'prepare', next: 'ship' },
    { id: 'ship', next: 'end' },
    { id: 'end', next: null },
  ];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      if (activeNode === null) {
        setActiveNode('start');
        setHistory(['start']);
      } else {
        const currentNode = flowSequence.find(n => n.id === activeNode);
        if (currentNode && currentNode.next) {
          const nextId = typeof currentNode.next === 'function' ? currentNode.next() : currentNode.next;
          timer = setTimeout(() => {
            setActiveNode(nextId);
            setHistory(prev => [...prev, nextId]);
          }, 1000);
        } else {
          timer = setTimeout(() => {
            setIsPlaying(false);
          }, 1000);
        }
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, activeNode, paymentMethod]);

  const resetFlow = () => {
    setActiveNode(null);
    setHistory([]);
    setIsPlaying(false);
  };

  const isPassed = (toId) => history.includes(toId);
  const isActive = (id) => activeNode === id;

  const renderArrowMarker = (id, color) => (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="10" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
      <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={color} />
    </marker>
  );

  const getPathProps = (toId) => {
    return isPassed(toId) 
      ? { stroke: '#4F46E5', filter: 'drop-shadow(0 0 4px rgba(79,70,229,0.5))' } 
      : { stroke: '#94A3B8' };
  };

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16">
      
      <section className="space-y-6">
        <div className="border-b border-zinc-200/80 pb-4">
          <span className="text-sm font-bold text-orange-500 tracking-wider uppercase">
            Drawing Techniques
          </span>
          <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
            2.3 เทคนิคการวาด Activity Diagram
          </h3>
        </div>

        <div className="bg-orange-50/60 backdrop-blur-md border border-orange-200/60 rounded-2xl p-6 border-l-[3px] border-l-orange-500 leading-relaxed">
          <h4 className="font-bold text-orange-800 mb-2 text-[18px]">เทคนิคสำคัญในการวาด:</h4>
          <ul className="space-y-2 text-orange-800/80 text-[16px]">
            <li className="flex items-center gap-2"><Navigation className="w-4 h-4" /> <strong>ไหลจากบนลงล่าง หรือซ้ายไปขวา</strong> เพื่อให้อ่านง่ายเป็นธรรมชาติ</li>
            <li className="flex items-center gap-2"><Navigation className="w-4 h-4" /> <strong>ตั้งชื่อ Activity เป็นคำกริยา</strong> เสมอ เช่น "บันทึกข้อมูล" ไม่ใช่แค่ "ข้อมูล"</li>
            <li className="flex items-center gap-2"><Navigation className="w-4 h-4" /> <strong>ทุก Decision ต้องมี Merge เสมอ</strong> ถ้ามีทางแยก ต้องมีทางรวมกลับเข้าเส้นหลัก เพื่อไม่ให้เส้นทางสูญหาย (Dead End)</li>
            <li className="flex items-center gap-2"><Navigation className="w-4 h-4" /> <strong>ทุก Fork ต้องมี Join เสมอ</strong> เพื่อซิงค์การทำงานแบบคู่ขนานให้เสร็จพร้อมกันก่อนไปต่อ</li>
          </ul>
        </div>
      </section>

      <section className="bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl relative">
        <div className="absolute top-4 right-6 text-[9px] font-mono text-slate-500 tracking-widest font-bold">
          INTERACTIVE ACTIVITY DIAGRAM SIMULATOR
        </div>

        <div className="mb-8 mt-2">
          <h4 className="text-[24px] font-semibold text-white mb-2">จำลองกระบวนการสั่งซื้อสินค้า</h4>
          <p className="text-slate-400 text-[16px]">ลองเปลี่ยนเงื่อนไขวิธีการชำระเงินเพื่อดูทิศทางการไหล (Control Flow) ของ Diagram</p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Controls */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="bg-slate-950/90 rounded-2xl p-6 border border-white/5 shadow-inner">
              <h5 className="text-slate-300 font-semibold mb-4 text-[16px]">ตั้งค่าเงื่อนไข (Decision)</h5>
              
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.02]
                  ${paymentMethod === 'credit' ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(79,70,229,0.15)]' : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600'}`}>
                  <input type="radio" name="payment" value="credit" 
                    checked={paymentMethod === 'credit'} 
                    onChange={(e) => { setPaymentMethod(e.target.value); resetFlow(); }}
                    className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${paymentMethod === 'credit' ? 'border-indigo-500' : 'border-slate-500'}`}>
                    {paymentMethod === 'credit' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>}
                  </div>
                  <span className="text-slate-200 text-[16px]">บัตรเครดิต</span>
                </label>

                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.02]
                  ${paymentMethod === 'transfer' ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(79,70,229,0.15)]' : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600'}`}>
                  <input type="radio" name="payment" value="transfer" 
                    checked={paymentMethod === 'transfer'} 
                    onChange={(e) => { setPaymentMethod(e.target.value); resetFlow(); }}
                    className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${paymentMethod === 'transfer' ? 'border-indigo-500' : 'border-slate-500'}`}>
                    {paymentMethod === 'transfer' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>}
                  </div>
                  <span className="text-slate-200 text-[16px]">โอนเงิน/สลิป</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => { setIsPlaying(true); if(activeNode === 'end') setActiveNode(null); }}
                disabled={isPlaying}
                className={`flex-1 flex items-center justify-center gap-2 h-[46px] rounded-xl font-semibold transition-all duration-200
                  ${isPlaying ? 'bg-slate-800 text-slate-400 cursor-not-allowed' : ''}
                  ${!isPlaying ? 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-[1.02] active:scale-98 cursor-pointer shadow-[0_0_15px_rgba(79,70,229,0.3)]' : ''}`}>
                <Play className="w-5 h-5 fill-current" />
                เริ่ม Run Diagram
              </button>
              
              <button 
                onClick={resetFlow}
                className="px-4 h-[46px] rounded-xl font-semibold border-2 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:scale-[1.02] active:scale-98 cursor-pointer transition-all duration-200">
                <Square className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>

          {/* Diagram Canvas */}
          <div className="flex-1 bg-slate-50 rounded-2xl p-6 relative flex justify-center border-[4px] border-slate-200 overflow-x-auto shadow-inner" style={{ minHeight: '800px' }}>
            <div className="absolute top-3 left-4 text-[10px] font-mono text-slate-400 tracking-widest font-bold">
              UML CANVAS
            </div>
            
            <div className="relative shrink-0 w-[400px]" style={{ height: '760px' }}>
              {/* SVG Lines Overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <defs>
                  {renderArrowMarker('arrow-slate', '#94A3B8')}
                  {renderArrowMarker('arrow-indigo', '#4F46E5')}
                </defs>

                <path d="M 200 68 L 200 95" {...getPathProps('select')} strokeWidth="2.5" fill="none" markerEnd={`url(#arrow-${isPassed('select') ? 'indigo' : 'slate'})`} />
                <path d="M 200 148 L 200 175" {...getPathProps('checkout')} strokeWidth="2.5" fill="none" markerEnd={`url(#arrow-${isPassed('checkout') ? 'indigo' : 'slate'})`} />
                <path d="M 200 228 L 200 255" {...getPathProps('decision')} strokeWidth="2.5" fill="none" markerEnd={`url(#arrow-${isPassed('decision') ? 'indigo' : 'slate'})`} />
                
                {/* Decision to Credit */}
                <path d="M 168 292 L 100 292 L 100 355" {...getPathProps('pay_credit')} strokeWidth="2.5" fill="none" markerEnd={`url(#arrow-${isPassed('pay_credit') ? 'indigo' : 'slate'})`} />
                
                {/* Decision to Transfer */}
                <path d="M 232 292 L 300 292 L 300 355" {...getPathProps('pay_transfer')} strokeWidth="2.5" fill="none" markerEnd={`url(#arrow-${isPassed('pay_transfer') ? 'indigo' : 'slate'})`} />

                {/* Credit to Merge */}
                <path d="M 100 408 L 100 482 L 163 482" {...(isPassed('merge') && isPassed('pay_credit') ? { stroke: '#4F46E5', filter: 'drop-shadow(0 0 4px rgba(79,70,229,0.5))' } : { stroke: '#94A3B8' })} strokeWidth="2.5" fill="none" markerEnd={`url(#arrow-${isPassed('merge') && isPassed('pay_credit') ? 'indigo' : 'slate'})`} />

                {/* Transfer to Merge */}
                <path d="M 300 408 L 300 482 L 237 482" {...(isPassed('merge') && isPassed('pay_transfer') ? { stroke: '#4F46E5', filter: 'drop-shadow(0 0 4px rgba(79,70,229,0.5))' } : { stroke: '#94A3B8' })} strokeWidth="2.5" fill="none" markerEnd={`url(#arrow-${isPassed('merge') && isPassed('pay_transfer') ? 'indigo' : 'slate'})`} />

                <path d="M 200 514 L 200 545" {...getPathProps('prepare')} strokeWidth="2.5" fill="none" markerEnd={`url(#arrow-${isPassed('prepare') ? 'indigo' : 'slate'})`} />
                <path d="M 200 598 L 200 625" {...getPathProps('ship')} strokeWidth="2.5" fill="none" markerEnd={`url(#arrow-${isPassed('ship') ? 'indigo' : 'slate'})`} />
                <path d="M 200 678 L 200 705" {...getPathProps('end')} strokeWidth="2.5" fill="none" markerEnd={`url(#arrow-${isPassed('end') ? 'indigo' : 'slate'})`} />
              </svg>

              {/* HTML Nodes Overlay */}
              <div className="absolute inset-0 z-10">
                
                {/* Start Node */}
                <div className={`absolute w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-all duration-300
                  ${isActive('start') ? 'bg-indigo-600 ring-4 ring-indigo-200 scale-110' : (isPassed('start') ? 'bg-emerald-600' : 'bg-slate-800')}`}
                  style={{ top: 20, left: 176 }}>
                </div>
                <div className="absolute text-center w-32 text-xs font-bold text-slate-500" style={{ top: 76, left: 136 }}>Initial Node</div>

                {/* Select Action */}
                <div className={`absolute w-[180px] h-[48px] rounded-[24px] border-[2px] flex items-center justify-center shadow-sm transition-all duration-300
                  ${isActive('select') ? 'bg-indigo-50 border-indigo-600 text-indigo-700 ring-4 ring-indigo-100 scale-105 font-bold' : ''}
                  ${isPassed('select') && !isActive('select') ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-semibold' : ''}
                  ${!isActive('select') && !isPassed('select') ? 'bg-white border-slate-300 text-slate-700 font-semibold' : ''}`}
                  style={{ top: 100, left: 110 }}>
                  เลือกสินค้าลงตะกร้า
                </div>

                {/* Checkout Action */}
                <div className={`absolute w-[180px] h-[48px] rounded-[24px] border-[2px] flex items-center justify-center shadow-sm transition-all duration-300
                  ${isActive('checkout') ? 'bg-indigo-50 border-indigo-600 text-indigo-700 ring-4 ring-indigo-100 scale-105 font-bold' : ''}
                  ${isPassed('checkout') && !isActive('checkout') ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-semibold' : ''}
                  ${!isActive('checkout') && !isPassed('checkout') ? 'bg-white border-slate-300 text-slate-700 font-semibold' : ''}`}
                  style={{ top: 180, left: 110 }}>
                  ยืนยันการสั่งซื้อ
                </div>

                {/* Decision Node */}
                <div className="absolute flex items-center justify-center transition-all duration-300" style={{ top: 260, left: 168, width: 64, height: 64 }}>
                  <div className={`w-[44px] h-[44px] border-[3px] bg-white rotate-45 shadow-sm transition-colors duration-300
                    ${isActive('decision') ? 'border-indigo-600 ring-[6px] ring-indigo-100 scale-110' : (isPassed('decision') ? 'border-emerald-500' : 'border-slate-300')}`}></div>
                </div>
                <div className="absolute text-center w-32 text-[11px] font-bold text-slate-500" style={{ top: 326, left: 136 }}>[Decision]</div>

                {/* Path Labels for Decision */}
                <div className="absolute text-[12px] font-bold text-indigo-600 bg-white px-1" style={{ top: 278, left: 110 }}>[บัตรเครดิต]</div>
                <div className="absolute text-[12px] font-bold text-teal-600 bg-white px-1" style={{ top: 278, left: 236 }}>[โอนเงิน]</div>

                {/* Pay Credit Action */}
                <div className={`absolute w-[160px] h-[48px] rounded-[24px] border-[2px] flex items-center justify-center shadow-sm transition-all duration-300
                  ${isActive('pay_credit') ? 'bg-indigo-50 border-indigo-600 text-indigo-700 ring-4 ring-indigo-100 scale-105 font-bold' : ''}
                  ${isPassed('pay_credit') && !isActive('pay_credit') ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-semibold' : ''}
                  ${!isActive('pay_credit') && !isPassed('pay_credit') ? 'bg-white border-slate-300 text-slate-700 font-semibold' : ''}`}
                  style={{ top: 360, left: 20 }}>
                  ตัดบัตรเครดิต
                </div>

                {/* Pay Transfer Action */}
                <div className={`absolute w-[160px] h-[48px] rounded-[24px] border-[2px] flex items-center justify-center shadow-sm transition-all duration-300
                  ${isActive('pay_transfer') ? 'bg-indigo-50 border-indigo-600 text-indigo-700 ring-4 ring-indigo-100 scale-105 font-bold' : ''}
                  ${isPassed('pay_transfer') && !isActive('pay_transfer') ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-semibold' : ''}
                  ${!isActive('pay_transfer') && !isPassed('pay_transfer') ? 'bg-white border-slate-300 text-slate-700 font-semibold' : ''}`}
                  style={{ top: 360, left: 220 }}>
                  ตรวจสอบสลิปโอนเงิน
                </div>

                {/* Merge Node */}
                <div className="absolute flex items-center justify-center transition-all duration-300" style={{ top: 450, left: 168, width: 64, height: 64 }}>
                  <div className={`w-[44px] h-[44px] border-[3px] bg-white rotate-45 shadow-sm transition-colors duration-300
                    ${isActive('merge') ? 'border-indigo-600 ring-[6px] ring-indigo-100 scale-110' : (isPassed('merge') ? 'border-emerald-500' : 'border-slate-300')}`}></div>
                </div>
                <div className="absolute text-center w-32 text-[11px] font-bold text-slate-500" style={{ top: 516, left: 136 }}>[Merge]</div>

                {/* Prepare Action */}
                <div className={`absolute w-[180px] h-[48px] rounded-[24px] border-[2px] flex items-center justify-center shadow-sm transition-all duration-300
                  ${isActive('prepare') ? 'bg-indigo-50 border-indigo-600 text-indigo-700 ring-4 ring-indigo-100 scale-105 font-bold' : ''}
                  ${isPassed('prepare') && !isActive('prepare') ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-semibold' : ''}
                  ${!isActive('prepare') && !isPassed('prepare') ? 'bg-white border-slate-300 text-slate-700 font-semibold' : ''}`}
                  style={{ top: 550, left: 110 }}>
                  จัดเตรียมสินค้า
                </div>

                {/* Ship Action */}
                <div className={`absolute w-[180px] h-[48px] rounded-[24px] border-[2px] flex items-center justify-center shadow-sm transition-all duration-300
                  ${isActive('ship') ? 'bg-indigo-50 border-indigo-600 text-indigo-700 ring-4 ring-indigo-100 scale-105 font-bold' : ''}
                  ${isPassed('ship') && !isActive('ship') ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-semibold' : ''}
                  ${!isActive('ship') && !isPassed('ship') ? 'bg-white border-slate-300 text-slate-700 font-semibold' : ''}`}
                  style={{ top: 630, left: 110 }}>
                  จัดส่งสินค้า
                </div>

                {/* Final Node */}
                <div className={`absolute w-12 h-12 rounded-full border-[4px] bg-white flex items-center justify-center transition-all duration-300 shadow-md
                  ${isActive('end') ? 'border-indigo-600 ring-4 ring-indigo-200 scale-110' : (isPassed('end') ? 'border-emerald-600' : 'border-slate-800')}`}
                  style={{ top: 710, left: 176 }}>
                  <div className={`w-6 h-6 rounded-full transition-colors duration-300 ${isActive('end') || isPassed('end') ? 'bg-emerald-600' : 'bg-slate-800'}`}></div>
                </div>
                <div className="absolute text-center w-32 text-xs font-bold text-slate-500" style={{ top: 766, left: 136 }}>Final Node</div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
