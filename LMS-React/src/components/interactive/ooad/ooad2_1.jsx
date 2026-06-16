import React from 'react';
import { Activity, GitCommit, GitPullRequest, Map, Lightbulb, Users } from 'lucide-react';

export default function Ooad2_1() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16">
      
      <section className="space-y-6">
        <div className="border-b border-zinc-200/80 pb-4">
          <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
            Introduction to Activity Diagram
          </span>
          <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
            2.1 ทำความรู้จักกับ Activity Diagram
          </h3>
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-8 lg:p-10 border-l-[3.5px] border-l-indigo-500/80">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="p-4 rounded-2xl bg-indigo-50/80 text-indigo-600 shadow-inner shrink-0">
              <Activity className="w-10 h-10" />
            </div>
            <div className="space-y-4 flex-1">
              <h4 className="text-[22px] font-bold text-zinc-900">Activity Diagram คืออะไร?</h4>
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
                <strong>Activity Diagram (แผนภาพกิจกรรม)</strong> คือแผนภาพเชิงพฤติกรรม (Behavioral Diagram) หนึ่งในมาตรฐาน UML ที่ถูกใช้เพื่อแสดง <strong>"การไหลของการทำงาน (Workflow)"</strong> หรือลำดับของกิจกรรมที่เกิดขึ้นในระบบทีละขั้นตอน 
              </p>
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
                ถึงแม้จะมีหน้าตาคล้ายคลึงกับ Flowchart แบบดั้งเดิม แต่ Activity Diagram มีขีดความสามารถที่สูงกว่ามาก เพราะถูกออกแบบมาเพื่อรองรับ <strong>การทำงานแบบขนาน (Parallel Processing)</strong> และสามารถแยกแยะได้ว่า <em>ใคร</em> เป็นผู้รับผิดชอบกิจกรรมนั้นๆ ผ่านการใช้งานเส้นแบ่งเลน (Swimlane)
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-teal-50/80 text-teal-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Map className="w-5 h-5" />
              </div>
              <h4 className="text-[18px] font-semibold text-zinc-900">อธิบาย Business Process</h4>
            </div>
            <p className="text-[15px] md:text-[16px] text-zinc-600 leading-relaxed">
              เหมาะสำหรับอธิบายกระบวนการทางธุรกิจที่ซับซ้อนให้เข้าใจง่าย เช่น ขั้นตอนการสั่งซื้อสินค้า, การขออนุมัติเอกสาร
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-50/80 text-amber-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <GitPullRequest className="w-5 h-5" />
              </div>
              <h4 className="text-[18px] font-semibold text-zinc-900">แสดงการขนาน (Parallel)</h4>
            </div>
            <p className="text-[15px] md:text-[16px] text-zinc-600 leading-relaxed">
              สามารถวาดกิจกรรมที่เกิดขึ้นพร้อมๆ กันในเวลาเดียวได้ชัดเจน ซึ่ง Flowchart ทั่วไปทำได้ยาก
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-rose-50/80 text-rose-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-[18px] font-semibold text-zinc-900">ขยายความ Use Case</h4>
            </div>
            <p className="text-[15px] md:text-[16px] text-zinc-600 leading-relaxed">
              มักถูกใช้คู่กับ Use Case Diagram เพื่อเจาะลึกว่า Use Case นั้นๆ มีขั้นตอนการทำงานภายในอย่างไร
            </p>
          </div>
        </div>
      </section>

      <section className="bg-indigo-50/60 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-6 md:p-8 border-l-[3px] border-l-indigo-500 flex flex-col md:flex-row gap-6 items-center">
        <div className="p-4 bg-white rounded-full shadow-sm shrink-0">
          <Lightbulb className="w-8 h-8 text-amber-500" />
        </div>
        <div>
          <h4 className="text-[20px] font-bold text-indigo-900 mb-2">ทำไมเราจึงต้องเรียน Activity Diagram?</h4>
          <p className="text-[16px] md:text-[17px] text-indigo-800/80 leading-relaxed">
            เมื่อระบบใหญ่ขึ้น การเขียนอธิบายการทำงานด้วยตัวอักษรจะทำให้เกิดความเข้าใจผิดได้ง่าย แผนภาพกิจกรรมคือภาษาสากลที่ทำให้โปรแกรมเมอร์ (Developer), นักวิเคราะห์ระบบ (SA), และลูกค้า (User) <strong>มองเห็นภาพรวมของระบบตรงกัน</strong> ช่วยลดข้อผิดพลาดในการเขียนโค้ดที่ผิดตรรกะหรือตกหล่นเงื่อนไขสำคัญไป
          </p>
        </div>
      </section>

    </main>
  );
}
