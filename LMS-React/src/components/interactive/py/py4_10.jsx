import TeacherTask from '../../ui/TeacherTask';
import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  AlertTriangle,
  GitMerge,
  AlignLeft,
  Bug
} from 'lucide-react';

/* ─────────────────────────────────────────────────
   SVG-based Flowchart — pixel-perfect center alignment
   ───────────────────────────────────────────────── */
const FlowchartSVG = ({ score, condition, hasPlayed }) => {
  /* ── layout constants ── */
  const W = 420;
  const H = 480;
  const cx = W / 2;            // center x = 210

  /* vertical positions */
  const startY  = 30;          // start pill center
  const diamondY = 140;        // diamond center
  const dR = 50;               // diamond half-diagonal

  const trueBoxCx  = 70;      // true-branch box center X
  const trueBoxCy  = 280;     // true-branch box center Y
  const trueBoxW   = 120;
  const trueBoxH   = 44;

  const joinY      = 360;     // join point Y
  const endY       = 430;     // end pill center

  /* ── colours ── */
  const trueColor  = hasPlayed && condition  ? '#10b981' : '#cbd5e1';
  const falseColor = hasPlayed && !condition ? '#f43f5e' : '#cbd5e1';
  const joinColor  = hasPlayed ? (condition ? '#10b981' : '#f43f5e') : '#cbd5e1';
  const trueGlow   = hasPlayed && condition  ? 'drop-shadow(0 0 6px rgba(16,185,129,0.7))' : 'none';
  const falseGlow  = hasPlayed && !condition ? 'drop-shadow(0 0 6px rgba(244,63,94,0.7))'  : 'none';

  const diamondFill   = hasPlayed ? (condition ? '#d1fae5' : '#ffe4e6') : '#ffffff';
  const diamondStroke = hasPlayed ? (condition ? '#34d399' : '#fb7185') : '#94a3b8';

  const trueBoxBorder = hasPlayed && condition ? '#10b981' : '#94a3b8';
  const trueBoxFill   = hasPlayed && condition ? '#ecfdf5' : '#ffffff';
  const trueBoxText   = hasPlayed && condition ? '#047857' : '#94a3b8';
  const trueBoxScale  = hasPlayed && condition ? 'scale(1.06)' : 'scale(1)';

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[420px] mx-auto" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>

      {/* ── Start pill ── */}
      <rect x={cx - 90} y={startY - 16} width={180} height={32} rx={16}
            fill="#cbd5e1" />
      <text x={cx} y={startY + 1} textAnchor="middle" dominantBaseline="central"
            fill="#334155" fontSize={12} fontWeight={700}>
        รับค่า score = {score}
      </text>

      {/* ── Line: start → diamond ── */}
      <line x1={cx} y1={startY + 16} x2={cx} y2={diamondY - dR}
            stroke="#cbd5e1" strokeWidth={2} />

      {/* ── Diamond ── */}
      <polygon
        points={`${cx},${diamondY - dR} ${cx + dR},${diamondY} ${cx},${diamondY + dR} ${cx - dR},${diamondY}`}
        fill={diamondFill} stroke={diamondStroke} strokeWidth={3}
        style={{ transition: 'all 0.5s', filter: hasPlayed ? (condition ? trueGlow : falseGlow) : 'none' }}
      />
      <text x={cx} y={diamondY + 1} textAnchor="middle" dominantBaseline="central"
            fill="#334155" fontSize={13} fontWeight={700} fontFamily="ui-monospace, monospace">
        score &gt;= 50
      </text>

      {/* ── True branch: diamond-left → down → box ── */}
      {/* Horizontal: diamond left tip → trueBoxCx */}
      <line x1={cx - dR} y1={diamondY} x2={trueBoxCx} y2={diamondY}
            stroke={trueColor} strokeWidth={2}
            style={{ transition: 'all 0.5s', filter: trueGlow }} />
      {/* Label "True" */}
      <text x={(cx - dR + trueBoxCx) / 2} y={diamondY - 8} textAnchor="middle"
            fill={hasPlayed && condition ? '#059669' : '#64748b'}
            fontSize={11} fontWeight={700}
            style={{ transition: 'fill 0.5s' }}>
        True
      </text>
      {/* Vertical: down to box top */}
      <line x1={trueBoxCx} y1={diamondY} x2={trueBoxCx} y2={trueBoxCy - trueBoxH / 2}
            stroke={trueColor} strokeWidth={2}
            style={{ transition: 'all 0.5s', filter: trueGlow }} />

      {/* ── True action box ── */}
      <g style={{ transition: 'transform 0.5s', transform: trueBoxScale, transformOrigin: `${trueBoxCx}px ${trueBoxCy}px` }}>
        <rect x={trueBoxCx - trueBoxW / 2} y={trueBoxCy - trueBoxH / 2}
              width={trueBoxW} height={trueBoxH} rx={10}
              fill={trueBoxFill} stroke={trueBoxBorder} strokeWidth={2}
              style={{ transition: 'all 0.5s' }} />
        <text x={trueBoxCx} y={trueBoxCy + 1} textAnchor="middle" dominantBaseline="central"
              fill={trueBoxText} fontSize={11} fontWeight={700}
              style={{ transition: 'fill 0.5s' }}>
          พิมพ์ "สอบผ่าน!"
        </text>
      </g>

      {/* ── True branch: box → down → right to join ── */}
      {/* Vertical: box bottom → joinY */}
      <line x1={trueBoxCx} y1={trueBoxCy + trueBoxH / 2} x2={trueBoxCx} y2={joinY}
            stroke={trueColor} strokeWidth={2}
            style={{ transition: 'all 0.5s', filter: trueGlow }} />
      {/* Horizontal: trueBoxCx → cx (join) */}
      <line x1={trueBoxCx} y1={joinY} x2={cx} y2={joinY}
            stroke={trueColor} strokeWidth={2}
            style={{ transition: 'all 0.5s', filter: trueGlow }} />

      {/* ── False branch: diamond bottom → straight down to join ── */}
      <line x1={cx} y1={diamondY + dR} x2={cx} y2={joinY}
            stroke={falseColor} strokeWidth={2}
            style={{ transition: 'all 0.5s', filter: falseGlow }} />
      {/* Label "False" */}
      <text x={cx + 12} y={diamondY + dR + 18} textAnchor="start"
            fill={hasPlayed && !condition ? '#e11d48' : '#64748b'}
            fontSize={11} fontWeight={700}
            style={{ transition: 'fill 0.5s' }}>
        False
      </text>

      {/* ── Join dot ── */}
      <circle cx={cx} cy={joinY} r={4} fill={joinColor}
              style={{ transition: 'fill 0.5s' }} />

      {/* ── Line: join → end ── */}
      <line x1={cx} y1={joinY} x2={cx} y2={endY - 16}
            stroke={joinColor} strokeWidth={2}
            style={{ transition: 'all 0.5s' }} />

      {/* ── End pill ── */}
      <rect x={cx - 90} y={endY - 16} width={180} height={32} rx={16}
            fill="#cbd5e1" />
      <text x={cx} y={endY + 1} textAnchor="middle" dominantBaseline="central"
            fill="#334155" fontSize={12} fontWeight={700}>
        พิมพ์ "จบโปรแกรม"
      </text>
    </svg>
  );
};

/* ─────────────────────────────────────────────────
   4.10.1 — Simple If Simulator
   ───────────────────────────────────────────────── */
const SimpleIfSim = () => {
  const [score, setScore] = useState(75);
  const [hasPlayed, setHasPlayed] = useState(false);

  const condition = score >= 50;

  const runCode = () => setHasPlayed(true);
  const resetCode = () => setHasPlayed(false);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row mb-16 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-50" />

      {/* ── Code Editor Panel ── */}
      <div className="bg-slate-900 w-full lg:w-1/2 p-8 flex flex-col relative z-10 text-slate-300 font-mono text-lg leading-relaxed border-r border-slate-800">
        <h4 className="font-sans font-bold text-emerald-400 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
          <GitMerge className="w-5 h-5" /> 4.10.1 โครงสร้างคำสั่ง if เชิงเดี่ยว
        </h4>

        <div className="bg-black/30 p-4 rounded-xl border border-slate-800/50 mb-4">
          <span className="text-blue-400">score</span> ={' '}
          <input
            type="number"
            value={score}
            onChange={(e) => { setScore(Number(e.target.value)); resetCode(); }}
            className="bg-slate-800 text-amber-400 w-20 px-2 py-1 rounded outline-none border border-slate-700 focus:border-emerald-500 transition-colors inline-block"
          />
        </div>

        <div className="mt-2 flex flex-col gap-1">
          <div className="text-pink-500">if <span className="text-blue-400">score</span> &gt;= <span className="text-amber-400">50</span>:</div>
          <div className={`ml-8 transition-all duration-300 ${hasPlayed ? (condition ? 'bg-emerald-900/40 outline outline-1 outline-emerald-500/50 rounded p-1' : 'opacity-30') : ''}`}>
            <span className="text-yellow-200">print</span>(<span className="text-emerald-400">"สอบผ่าน!"</span>)
          </div>
          <div className="text-yellow-200 mt-2">print(<span className="text-emerald-400">"จบโปรแกรม"</span>)</div>
        </div>

        <div className="mt-8">
          <button
            onClick={runCode}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            <Play className="w-5 h-5" /> ทดสอบรันโค้ด
          </button>
        </div>
      </div>

      {/* ── Flowchart Panel (SVG) ── */}
      <div className="w-full lg:w-1/2 bg-slate-50 p-8 flex flex-col relative z-10">
        <h4 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
          Flowchart (ผังงานจำลอง)
        </h4>

        <div className="flex-1 flex items-center justify-center">
          <FlowchartSVG score={score} condition={condition} hasPlayed={hasPlayed} />
        </div>

        {/* Terminal Output */}
        {hasPlayed && (
          <div className="mt-8 bg-black rounded-xl p-4 font-mono text-emerald-400 shadow-inner text-sm animate-[fade-in_0.3s_ease-out]">
            <div className="text-slate-500 mb-2">$ python main.py</div>
            {condition && <div>สอบผ่าน!</div>}
            <div>จบโปรแกรม</div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────
   4.10.2 — Indentation Simulator
   ───────────────────────────────────────────────── */
const IndentationSim = () => {
  const [indent, setIndent] = useState(0);

  const getStatus = () => {
    if (indent === 0) return { error: true, msg: 'IndentationError: expected an indented block', type: 'error' };
    if (indent === 1) return { error: false, msg: 'โค้ดทำงานได้ แต่ผิดมาตรฐาน PEP8 (ควรใช้ 4 เคาะ)', type: 'warning' };
    return { error: false, msg: 'โค้ดสมบูรณ์ ทำงานได้ถูกต้องตามมาตรฐาน', type: 'success' };
  };

  const status = getStatus();

  return (
    <div className="bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl p-8 mb-16 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="relative z-10">
        <h4 className="text-xl font-bold text-sky-400 mb-2 flex items-center gap-2"><AlignLeft /> 4.10.2 การเขียนบล็อกคำสั่ง (Indentation)</h4>
        <p className="text-slate-400 mb-8 text-sm">ในภาษา Python <strong>ห้ามใช้ปีกกา {'{}'}</strong> แต่จะใช้ <strong>การย่อหน้า (Indent)</strong> เพื่อบอกว่าคำสั่งไหนอยู่ในบล็อกของ if ลองปรับการย่อหน้าด้านล่างดู</p>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 font-mono text-lg shadow-inner">
              <div className="text-pink-500">if <span className="text-blue-400">True</span>:</div>
              <div className="flex items-center mt-2">
                {indent === 1 && <div className="w-4 h-6 border-l border-b border-slate-600 border-dashed mr-1" />}
                {indent === 2 && <div className="w-8 h-6 border-l border-b border-slate-600 border-dashed mr-1" />}
                <div className={`transition-all duration-300 ${indent === 0 ? 'bg-rose-500/15 ring-1 ring-rose-500/40 pl-2 rounded' : ''}`}>
                  <span className="text-yellow-200">print</span>(<span className="text-emerald-400">"ฉันอยู่ในบล็อก IF"</span>)
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setIndent(0)} className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${indent !== 0 ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-rose-500 text-white border-rose-500'}`}>0 เคาะ (ไม่ย่อหน้า)</button>
              <button onClick={() => setIndent(1)} className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${indent !== 1 ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-amber-500 text-white border-amber-500'}`}>2 เคาะ</button>
              <button onClick={() => setIndent(2)} className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${indent !== 2 ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-emerald-500 text-white border-emerald-500'}`}>4 เคาะ (มาตรฐาน)</button>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className={`h-full p-6 rounded-2xl border-2 flex flex-col justify-center items-center text-center transition-all duration-500 ${status.type === 'error' ? 'bg-rose-950/50 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]' : status.type === 'warning' ? 'bg-amber-950/50 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'bg-emerald-950/50 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]'}`}>
              {status.type === 'error' && <Bug className="w-12 h-12 text-rose-500 mb-4 animate-pulse" />}
              {status.type === 'warning' && <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />}
              {status.type === 'success' && <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />}

              <h5 className={`font-bold font-mono text-lg mb-2 ${status.type === 'error' ? 'text-rose-400' : status.type === 'warning' ? 'text-amber-400' : 'text-emerald-400'}`}>
                {status.error ? 'รันโค้ดพัง! (Syntax Error)' : 'รันโค้ดผ่าน!'}
              </h5>
              <p className="text-slate-300 text-sm leading-relaxed font-mono bg-black/40 px-4 py-2 rounded-lg">
                {status.msg}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


/* ─────────────────────────────────────────────────
   Main Export
   ───────────────────────────────────────────────── */
export default function pyUnit4_10_IfCondition() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรม (If Condition):
1. ให้นักเรียนเขียนโปรแกรมรับค่าอายุ (age) 
2. ตรวจสอบเงื่อนไขว่า ถ้าอายุ >= 18 ให้พิมพ์ข้อความว่า "อนุญาตให้เข้าใช้งานระบบได้"
3. ทดสอบการรันโปรแกรมโดยใส่อายุ 20 และอายุ 15 ว่าได้ผลลัพธ์เหมือนหรือต่างกันอย่างไร (อธิบายหลักการของ if เชิงเดี่ยว)
4. ทดลองลบการย่อหน้า (Indentation) หน้าคำสั่ง print แล้วรันโปรแกรม บันทึกข้อความ Error ที่เกิดขึ้น`;

  return (
    <div className="font-sans pb-24 selection:bg-emerald-600 selection:text-white">
      <div className="text-slate-800">

      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-100/60 blur-[120px]" />
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="text-4xl font-black mb-4 tracking-tight pb-2 leading-normal text-emerald-600">
            สร้างทางเลือกให้โปรแกรมด้วย if
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed">
            <strong>if (ถ้า)</strong> เป็นพื้นฐานที่สุดของการตัดสินใจ หากเงื่อนไขหลัง if เป็น <strong className="text-emerald-500">True</strong> โค้ดในบล็อกจะถูกดึงมาทำ แต่ถ้าเป็น <strong className="text-rose-500">False</strong> คอมพิวเตอร์จะเมินมันไปเลย!
          </p>
        </div>

        {/* 4.10.1 Simulator */}
        <SimpleIfSim />

        {/* 4.10.2 Indentation Simulator */}
        <IndentationSim />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />

      </main>
      </div>
    </div>
  );
}
