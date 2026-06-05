import React from 'react';
import { 
  Cpu, 
  HardDrive, 
  Zap, 
  MonitorPlay, 
  CircuitBoard, 
  Server, 
  Lightbulb, 
  CheckCircle2,
  Layers,
  Settings2,
  Maximize,
  Microscope,
  Cpu as SocketIcon,
  Sparkles
} from 'lucide-react';
import TeacherTask from '../../ui/TeacherTask';

const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes float-slow {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
      100% { transform: translateY(0px); }
    }

    .animate-float-slow {
      animation: float-slow 4s ease-in-out infinite;
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 1.5rem;
      transition: all 0.3s ease;
    }
    
    .glass-card:hover {
      border-color: rgba(255, 255, 255, 0.8);
      background: rgba(255, 255, 255, 0.8);
    }
  `}} />
);

const componentsData = {
  CPU: {
    id: 'CPU',
    name: 'หน่วยประมวลผลกลาง',
    engName: 'Central Processing Unit',
    icon: <Cpu className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=80',
    color: 'blue',
    textAccent600: 'text-blue-600',
    borderTopAccent: 'border-t-blue-500',
    deepDiveIconBg: 'p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0',
    deepDiveItemDot: 'absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]',
    specsHeaderBg: 'p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-inner shrink-0',
    specDot: 'w-1.5 h-1.5 rounded-full bg-blue-500',
    glowBgCircle: 'absolute right-0 top-0 w-64 h-64 bg-blue-100 rounded-full blur-[100px] opacity-20 pointer-events-none',
    heroGlow: 'shadow-[0_0_30px_rgba(59,130,246,0.1)]',
    analogyBadge: 'inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50/60 border border-blue-150/60 mb-4 shadow-sm',
    analogyText: 'text-blue-800 text-sm',
    analogy: 'สมองของคน (Brain)',
    desc: 'ชิปประมวลผลหลัก ทำหน้าที่รับคำสั่ง ถอดรหัส คำนวณ และสั่งการอุปกรณ์ฮาร์ดแวร์ทุกชิ้นในระบบ ความเร็วในการทำงานของคอมพิวเตอร์กว่า 70% ขึ้นอยู่กับชิ้นส่วนนี้',
    deepDive: [
      { title: 'แกนประมวลผล (Cores & Threads)', icon: <Layers className="w-5 h-5" />, items: [ { name: 'Cores (คอร์)', detail: 'สมองกลย่อยภายใน CPU ยิ่งเยอะยิ่งแบ่งงานกันทำได้พร้อมกันหลายงาน' }, { name: 'Threads (เธรด)', detail: 'จำลองคอร์เสมือน ทำให้ 1 Core ทำงานได้ 2 อย่างพร้อมกัน' } ] },
      { title: 'ความเร็ว (Clock & Cache)', icon: <Settings2 className="w-5 h-5" />, items: [ { name: 'Clock Speed (GHz)', detail: 'ความเร็วในการคำนวณต่อวินาที แบ่งเป็น Base และ Boost' }, { name: 'Cache (L1, L2, L3)', detail: 'หน่วยความจำส่วนตัวในตัว CPU ใช้เก็บข้อมูลที่หยิบใช้บ่อยๆ ทันที' } ] }
    ],
    specs: [
      'Generation: ค่าย Intel (Gen 12, 13, 14) / ค่าย AMD (Ryzen 5000, 7000 Series)',
      'Socket Compatibility: เช็คซ็อกเก็ตให้ตรงกับเมนบอร์ด (เช่น LGA 1700, AM5)',
      'TDP (Thermal Design Power): ค่าความร้อน ยิ่งสูงยิ่งต้องใช้ชุดน้ำหรือซิงค์พัดลมตัวใหญ่'
    ]
  },
  Motherboard: {
    id: 'Motherboard',
    name: 'แผงวงจรหลัก',
    engName: 'Mainboard / Motherboard',
    icon: <CircuitBoard className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&w=1200&q=80',
    color: 'emerald',
    textAccent600: 'text-emerald-600',
    borderTopAccent: 'border-t-emerald-500',
    deepDiveIconBg: 'p-3 rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0',
    deepDiveItemDot: 'absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
    specsHeaderBg: 'p-3 rounded-2xl bg-emerald-50 text-emerald-600 shadow-inner shrink-0',
    specDot: 'w-1.5 h-1.5 rounded-full bg-emerald-500',
    glowBgCircle: 'absolute right-0 top-0 w-64 h-64 bg-emerald-100 rounded-full blur-[100px] opacity-20 pointer-events-none',
    heroGlow: 'shadow-[0_0_30px_rgba(16,185,129,0.1)]',
    analogyBadge: 'inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50/60 border border-emerald-150/60 mb-4 shadow-sm',
    analogyText: 'text-emerald-800 text-sm',
    analogy: 'ระบบประสาทและโครงกระดูก',
    desc: 'แผงวงจรแผ่นใหญ่ที่สุด ทำหน้าที่เป็นรากฐานและจุดเชื่อมต่อให้ชิ้นส่วนทุกชิ้นสื่อสารกันได้ เป็นตัวกำหนดว่าคอมพิวเตอร์เครื่องนี้จะอัปเกรดอะไรได้บ้างในอนาคต',
    deepDive: [
      { title: 'ซ็อกเก็ตและชิปเซ็ต', icon: <SocketIcon className="w-5 h-5" />, items: [ { name: 'CPU Socket', detail: 'ฐานรองรับ CPU ต้องตรงค่ายเป๊ะๆ เช่น Intel: LGA 1700 / AMD: AM5' }, { name: 'Chipset', detail: 'รหัสย่อบอกระดับความสามารถ: H/A (เริ่มต้น), B (กลาง), Z/X (ท็อปสุด)' } ] },
      { title: 'ส่วนประกอบ On-board', icon: <CircuitBoard className="w-5 h-5" />, items: [ { name: 'VRM (ภาคจ่ายไฟ)', detail: 'วงจรควบคุมไฟให้ CPU ยิ่งมีเฟสเยอะ ยิ่งจ่ายไฟนิ่ง เครื่องเสถียร' }, { name: 'Expansion Slots', detail: 'ช่องเสียบ RAM (DIMM), การ์ดจอ (PCIe x16) และ SSD (M.2 NVMe)' } ] }
    ],
    specs: [
      'Form Factor: ขนาดของบอร์ด (ATX ใหญ่สุด, mATX กลาง, ITX เล็กสุด)',
      'RAM Support: รองรับแรมรุ่นไหน (DDR4/DDR5) และความเร็วบัสสูงสุดเท่าไหร่',
      'Storage & I/O: จำนวนช่องเสียบ M.2, SATA และพอร์ตด้านหลัง (USB-C, Wi-Fi 6)'
    ]
  },
  RAM: {
    id: 'RAM',
    name: 'หน่วยความจำหลัก',
    engName: 'Random Access Memory',
    icon: <Server className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=1200&q=80',
    color: 'purple',
    textAccent600: 'text-purple-600',
    borderTopAccent: 'border-t-purple-500',
    deepDiveIconBg: 'p-3 rounded-2xl bg-purple-50 text-purple-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0',
    deepDiveItemDot: 'absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]',
    specsHeaderBg: 'p-3 rounded-2xl bg-purple-50 text-purple-600 shadow-inner shrink-0',
    specDot: 'w-1.5 h-1.5 rounded-full bg-purple-500',
    glowBgCircle: 'absolute right-0 top-0 w-64 h-64 bg-purple-100 rounded-full blur-[100px] opacity-20 pointer-events-none',
    heroGlow: 'shadow-[0_0_30px_rgba(168,85,247,0.1)]',
    analogyBadge: 'inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50/60 border border-purple-150/60 mb-4 shadow-sm',
    analogyText: 'text-purple-800 text-sm',
    analogy: 'โต๊ะทำงาน (Workspace)',
    desc: 'หน่วยความจำชั่วคราว ดึงข้อมูลจาก SSD มาวางพักไว้ให้ CPU หยิบใช้ได้ไวที่สุด ข้อมูลจะหายทั้งหมดเมื่อปิดเครื่อง ยิ่งความจุเยอะยิ่งเปิดโปรแกรมพร้อมกันได้มาก',
    deepDive: [
      { title: 'เทคโนโลยีและความเร็ว', icon: <Microscope className="w-5 h-5" />, items: [ { name: 'Generation', detail: 'ยุคเทคโนโลยี ปัจจุบันคือ DDR4 และ DDR5 ซึ่ง DDR5 ให้ความเร็วที่สูงกว่า' }, { name: 'Bus Speed', detail: 'ความเร็วในการส่งข้อมูลหา CPU ยิ่งตัวเลขเยอะยิ่งดี (เช่น 3200MHz, 6000MHz)' } ] },
      { title: 'คำแนะนำความจุ', icon: <Layers className="w-5 h-5" />, items: [ { name: '8 GB - 16 GB', detail: '8GB คือขั้นต่ำ 16GB คือมาตรฐานแนะนำสำหรับยุคปัจจุบัน ลื่นไหลพอดี' }, { name: '32 GB ขึ้นไป', detail: 'สำหรับสตรีมมิ่ง งาน 3D Animation หรืองานตัดต่อวิดีโอหนักๆ' } ] }
    ],
    specs: [
      'Dual-Channel: การใส่แรม 2 แถวพร้อมกัน จะได้แบนฎ์วิดท์ดีกว่า (แนะนำให้ซื้อแบบ Kit คู่)',
      'XMP / EXPO: โปรไฟล์โอเวอร์คล็อกแรมจากโรงงาน ต้องเข้าไปเปิดในหน้า BIOS',
      'CAS Latency (CL): ค่าความหน่วง ยิ่งน้อยยิ่งตอบสนองคำสั่งได้เร็ว'
    ]
  },
  Storage: {
    id: 'Storage',
    name: 'อุปกรณ์จัดเก็บข้อมูล',
    engName: 'HDD / SSD',
    icon: <HardDrive className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80',
    color: 'orange',
    textAccent600: 'text-orange-600',
    borderTopAccent: 'border-t-orange-500',
    deepDiveIconBg: 'p-3 rounded-2xl bg-orange-50 text-orange-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0',
    deepDiveItemDot: 'absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]',
    specsHeaderBg: 'p-3 rounded-2xl bg-orange-50 text-orange-600 shadow-inner shrink-0',
    specDot: 'w-1.5 h-1.5 rounded-full bg-orange-500',
    glowBgCircle: 'absolute right-0 top-0 w-64 h-64 bg-orange-100 rounded-full blur-[100px] opacity-20 pointer-events-none',
    heroGlow: 'shadow-[0_0_30px_rgba(249,115,22,0.1)]',
    analogyBadge: 'inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50/60 border border-orange-150/60 mb-4 shadow-sm',
    analogyText: 'text-orange-800 text-sm',
    analogy: 'ตู้เก็บเอกสาร (Filing Cabinet)',
    desc: 'หน่วยความจำแบบถาวร ใช้เก็บระบบปฏิบัติการ (Windows) โปรแกรม เกม และไฟล์ข้อมูลส่วนตัว ข้อมูลจะยังคงอยู่แม้ถอดปลั๊กไฟออก',
    deepDive: [
      { title: 'เทคโนโลยีจัดเก็บ', icon: <Settings2 className="w-5 h-5" />, items: [ { name: 'HDD (Hard Disk Drive)', detail: 'ใช้จานแม่เหล็กหมุน ราคาถูก ความจุเยอะ แต่ช้า เหมาะเก็บไฟล์หนัง/สำรองข้อมูล' }, { name: 'SSD (Solid State Drive)', detail: 'ใช้ชิป Flash Memory ไม่มีชิ้นส่วนขยับ เร็วกว่า HDD หลายสิบเท่า ทนทานต่อแรงกระแทก' } ] },
      { title: 'รูปแบบ SSD ยอดนิยม', icon: <Layers className="w-5 h-5" />, items: [ { name: 'SATA SSD (2.5 นิ้ว)', detail: 'กล่องแบนๆ เสียบสาย SATA ความเร็วตันที่ ~500 MB/s เหมาะอัปเกรดคอมเก่า' }, { name: 'M.2 NVMe', detail: 'เสียบลงบนเมนบอร์ดโดยตรง เล็กเท่าหมากฝรั่ง ความเร็วสูงมาก (3,000 - 10,000+ MB/s)' } ] }
    ],
    specs: [
      'Read/Write Speed (MB/s): ค่าความเร็วอ่านเขียนไฟล์ ยิ่งใช้ M.2 NVMe Gen 4/5 ยิ่งเร็ว',
      'Capacity: ความจุในการเก็บไฟล์ (250GB, 500GB, 1TB, 2TB)',
      'TBW (Terabytes Written): อายุการใช้งานของชิป บอกว่าสามารถเขียนข้อมูลทับได้ทั้งหมดกี่ TB'
    ]
  },
  VGA: {
    id: 'VGA',
    name: 'การ์ดแสดงผล',
    engName: 'Graphic Card / GPU',
    icon: <MonitorPlay className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    color: 'rose',
    textAccent600: 'text-rose-600',
    borderTopAccent: 'border-t-rose-500',
    deepDiveIconBg: 'p-3 rounded-2xl bg-rose-50 text-rose-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0',
    deepDiveItemDot: 'absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.5)]',
    specsHeaderBg: 'p-3 rounded-2xl bg-rose-50 text-rose-600 shadow-inner shrink-0',
    specDot: 'w-1.5 h-1.5 rounded-full bg-rose-500',
    glowBgCircle: 'absolute right-0 top-0 w-64 h-64 bg-rose-100 rounded-full blur-[100px] opacity-20 pointer-events-none',
    heroGlow: 'shadow-[0_0_30px_rgba(225,29,72,0.1)]',
    analogyBadge: 'inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50/60 border border-rose-150/60 mb-4 shadow-sm',
    analogyText: 'text-rose-800 text-sm',
    analogy: 'จิตรกรนักวาดภาพ',
    desc: 'ชิปประมวลผลที่เชี่ยวชาญการคำนวณโครงสร้างภาพและเรขาคณิต รับข้อมูลดิบจาก CPU มาวาด เติมแสงเงา และเรนเดอร์เป็นภาพส่งออกสู่หน้าจอ',
    deepDive: [
      { title: 'ส่วนประกอบของการ์ด', icon: <Microscope className="w-5 h-5" />, items: [ { name: 'GPU Chip', detail: 'สมองของการ์ด ผลิตโดยค่าย NVIDIA (GeForce) หรือ AMD (Radeon)' }, { name: 'VRAM', detail: 'แรมส่วนตัวของการ์ดจอ ใช้พักข้อมูลภาพ ยิ่งจอ 4K ยิ่งต้องใช้ VRAM เยอะ (ควร 8GB+)' } ] },
      { title: 'ประเภทการ์ดจอ', icon: <Maximize className="w-5 h-5" />, items: [ { name: 'Integrated (ออนบอร์ด)', detail: 'ฝังมาใน CPU ไม่มี VRAM ส่วนตัว ดึง RAM เครื่องไปใช้ เหมาะใช้งานทั่วไป' }, { name: 'Dedicated (การ์ดแยก)', detail: 'เสียบลงสล็อต PCIe บนบอร์ด ประสิทธิภาพสูง เหมาะสำหรับงานเกมหรือ 3D' } ] }
    ],
    specs: [
      'Model Series: รุ่นของการ์ดจอ เช่น RTX 4060, RX 7600 (ตัวเลขยิ่งเยอะมักจะยิ่งแรงและแพง)',
      'Power Connectors: ต้องเช็คว่าต้องการไฟเลี้ยงจาก Power Supply กี่เส้น (8-pin, 16-pin)',
      'Ports: พอร์ตส่งสัญญาณภาพด้านหลัง (HDMI 2.1, DisplayPort 1.4)'
    ]
  },
  PSU: {
    id: 'PSU',
    name: 'แหล่งจ่ายไฟ',
    engName: 'Power Supply Unit',
    icon: <Zap className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
    color: 'amber',
    textAccent600: 'text-amber-600',
    borderTopAccent: 'border-t-amber-500',
    deepDiveIconBg: 'p-3 rounded-2xl bg-amber-50 text-amber-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0',
    deepDiveItemDot: 'absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
    specsHeaderBg: 'p-3 rounded-2xl bg-amber-50 text-amber-600 shadow-inner shrink-0',
    specDot: 'w-1.5 h-1.5 rounded-full bg-amber-500',
    glowBgCircle: 'absolute right-0 top-0 w-64 h-64 bg-amber-100 rounded-full blur-[100px] opacity-20 pointer-events-none',
    heroGlow: 'shadow-[0_0_30px_rgba(245,158,11,0.1)]',
    analogyBadge: 'inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50/60 border border-amber-150/60 mb-4 shadow-sm',
    analogyText: 'text-amber-800 text-sm',
    analogy: 'หัวใจสูบฉีดเลือด',
    desc: 'ทำหน้าที่แปลง "ไฟบ้านกระแสสลับ (AC)" เป็น "ไฟคอมพิวเตอร์กระแสตรง (DC 12V, 5V, 3.3V)" เพื่อเลี้ยงชิ้นส่วนทุกชิ้น เป็นชิ้นส่วนที่ห้ามประหยัดงบเด็ดขาด',
    deepDive: [
      { title: 'มาตรฐานและความน่าเชื่อถือ', icon: <Settings2 className="w-5 h-5" />, items: [ { name: '80 PLUS', detail: 'ใบรับรองประสิทธิภาพการแปลงไฟ ยิ่งเกรดสูง (Bronze, Gold, Platinum) ยิ่งประหยัดไฟบ้าน' }, { name: 'Protections', detail: 'ระบบป้องกันตัว เช่น OVP (กันไฟเกิน), SCP (กันไฟช็อต) ช่วยปกป้องเครื่อง' } ] },
      { title: 'การจัดการสายไฟ', icon: <Layers className="w-5 h-5" />, items: [ { name: 'Non / Semi Modular', detail: 'สายฝังติดกล่องถอดไม่ได้ หรือถอดได้แค่สายรอง ราคาถูกแต่อาจรกเคส' }, { name: 'Full Modular', detail: 'ถอดสายได้ทุกเส้น 100% จัดสายง่าย สวยงาม ไม่ขวางทางลมระบายความร้อน' } ] }
    ],
    specs: [
      'Wattage (กำลังไฟ): ต้องคำนวณเผื่อโหลดของ CPU+VGA รวมกัน แล้วบวกเผื่ออีก 150-200W',
      'Tier List: ควรตรวจสอบรีวิวและเกรดคุณภาพไส้ในของ PSU บนอินเทอร์เน็ตก่อนซื้อเสมอ',
      'Form Factor: ขนาดของกล่องจ่ายไฟ (ATX ขนาดมาตรฐาน, SFX สำหรับเคสจิ๋ว)'
    ]
  }
};

export default function IT2_1() {
  return (
    <div className="font-sans pb-24 relative overflow-hidden selection:bg-blue-500/10">
      <CustomStyles />
      
      {/* ─── Layer 1: Ambient Backdrop & 4 Blobs ─── */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-drift pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-drift pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 pointer-events-none" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-1/2 right-0 w-88 h-88 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" style={{ animationDelay: '2s' }}></div>

      {/* Main Content: Continuous Scroll Sections */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 relative z-10">
        
        {/* Map through all components and render them sequentially */}
        {Object.entries(componentsData).map(([key, data]) => (
          <section 
            key={key} 
            id={key} 
            className="py-6 border-b border-zinc-200/60 last:border-0 space-y-6"
          >
            {/* Subtopic Section Header */}
            <div className="border-b border-zinc-200/80 pb-4">
              <span className={`text-sm font-bold ${data.textAccent600} tracking-wider uppercase`}>
                {data.engName}
              </span>
              <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
                {data.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Box 1: Hero Image & Title (Span 8) */}
              <div className={`glass-card col-span-1 md:col-span-12 lg:col-span-8 p-1 overflow-hidden relative group border-t-4 ${data.borderTopAccent} shadow-xl ${data.heroGlow}`}>
                <div className="absolute inset-0 z-0">
                  <img 
                    src={data.imageUrl} 
                    alt={data.id} 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Subtle dark gradient overlay to ensure white text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent z-10"></div>
                </div>

                <div className="relative z-20 h-full min-h-[320px] p-8 sm:p-10 flex flex-col justify-end">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-white/10 backdrop-blur-md w-fit mb-4 text-xs font-bold tracking-widest text-slate-200 shadow-sm">
                    {data.id}
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2 drop-shadow-md">
                    {data.name}
                  </h2>
                  <p className="text-sm text-slate-200 drop-shadow-sm font-medium">
                    {data.engName}
                  </p>
                </div>
                
                {/* Top right icon */}
                <div className={`absolute top-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl flex items-center justify-center z-20 ${data.textAccent600} shadow-md animate-float-slow`}>
                  {React.cloneElement(data.icon, { className: "w-6 h-6" })}
                </div>
              </div>

              {/* Box 2: Analogy & Core Function (Span 4) */}
              <div className="glass-card col-span-1 md:col-span-12 lg:col-span-4 p-8 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="mb-6">
                    <div className={data.analogyBadge}>
                      <Lightbulb className="w-5 h-5 shrink-0" />
                      <span className={data.analogyText}>เปรียบเทียบ: <strong className="font-bold">{data.analogy}</strong></span>
                    </div>
                  </div>
                  
                  <h4 className="text-slate-800 font-bold text-xl mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-slate-400" /> หน้าที่หลัก
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-[16px] md:text-[17px] font-normal">
                    {data.desc}
                  </p>
                </div>
              </div>

              {/* Box 3: Deep Dive Details */}
              <div className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                {data.deepDive.map((section, idx) => (
                  <div key={idx} className="glass-card p-6 sm:p-8 relative overflow-hidden group shadow-xl">
                    
                    <h4 className="flex items-center gap-3 text-xl font-bold text-slate-800 mb-6">
                      <div className={data.deepDiveIconBg}>
                        {section.icon}
                      </div>
                      {section.title}
                    </h4>
                    
                    <div className="space-y-6">
                      {section.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="relative pl-5 border-l-2 border-slate-200">
                          <div className={data.deepDiveItemDot}></div>
                          <strong className="text-slate-800 block mb-1.5 font-semibold text-lg">{item.name}</strong>
                          <p className="text-slate-500 text-sm leading-relaxed">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Box 4: Checklist Specs */}
              <div className="glass-card col-span-1 md:col-span-12 p-8 sm:p-10 relative overflow-hidden mt-2 shadow-xl">
                <div className={data.glowBgCircle}></div>
                
                <h4 className="flex items-center gap-3 text-2xl font-bold text-slate-800 mb-8 relative z-10">
                  <div className={data.specsHeaderBg}>
                     <CheckCircle2 className="w-6 h-6" />
                  </div>
                  สเปคที่ต้องพิจารณาก่อนซื้อ
                </h4>
                
                <div className="grid md:grid-cols-3 gap-x-8 gap-y-6 relative z-10">
                  {data.specs.map((spec, sIdx) => {
                    const [title, desc] = spec.split(': ');
                    return (
                      <div key={sIdx} className="flex flex-col gap-2 bg-white/80 p-5 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow">
                        <strong className="text-slate-800 font-medium flex items-center gap-2">
                           <div className={data.specDot}></div>
                           {title}
                        </strong> 
                        <p className="text-slate-500 text-sm leading-relaxed pl-3.5">
                          {desc}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </section>
        ))}

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <div className="pt-12">
          <TeacherTask
            title="ใบงานปฏิบัติการ: กิจกรรมวิเคราะห์ความเข้ากันได้และการเลือกจัดสเปกคอมพิวเตอร์ตามการใช้งาน (PC Hardware Specification & Compatibility Analysis)"
            taskText={`คำชี้แจง: ให้ผู้เรียนวิเคราะห์คุณลักษณะของชิ้นส่วนฮาร์ดแวร์คอมพิวเตอร์ทั้ง 6 ชิ้น และดำเนินกิจกรรมปฏิบัติการในการตรวจสอบความเข้ากันได้ของการเลือกชิ้นส่วนจัดสเปกคอมพิวเตอร์ (Compatibility Check) สำหรับงาน 3 รูปแบบ โดยระบุข้อมูลดังต่อไปนี้:
  
  1. การเลือกความเข้ากันได้ (Compatibility Verification):
     - การจับคู่ระหว่าง CPU (ค่าย Intel/AMD) และ Socket Compatibility ของ Motherboard (เช่น AM5 กับ AMD Ryzen 7000, LGA 1700 กับ Intel Gen 13/14)
     - การตรวจสอบมาตรฐาน RAM (DDR4 / DDR5) ว่าตรงกับช่องเสียบและข้อจำกัดของเมนบอร์ด
     - การประเมินกำลังไฟฟ้ารวมสูงสุด (Watts) เพื่อเลือกใช้ขนาดของแหล่งจ่ายไฟ (PSU) ที่มีกำลังเพียงพอและได้รับมาตรฐาน 80 PLUS ที่เหมาะสม
  
  2. การออกแบบและจัดสเปกเครื่องคอมพิวเตอร์ 3 ประเภท:
     - งานประเภทที่ 1: สำหรับใช้งานทั่วไป/สำนักงาน (Office Work) เน้นความประหยัดและความทนทาน
     - งานประเภทที่ 2: สำหรับเล่นเกมและความบันเทิงคุณภาพสูง (Gaming PC) เน้นการ์ดจอแยกและการทำงานร่วมกันของ CPU และ GPU
     - งานประเภทที่ 3: สำหรับสตรีมมิ่ง งานกราฟิก 3D หรืองานตัดต่อวิดีโอหนักๆ (Content Creator PC) เน้นแรมความจุสูง SSD ความเร็วส่งถ่ายสูง และระบบระบายความร้อนที่มีประสิทธิภาพ (TDP)
  
  3. การวิเคราะห์เปรียบเทียบคำศัพท์ทางวิชาการ (Textbook Terminology Explanation):
     - อธิบายข้อแตกต่างทางเทคโนโลยีระหว่าง SSD M.2 NVMe และ HDD จานหมุน ในแง่ความเร็วเชิงโครงสร้างและจุดประสงค์ที่เหมาะสม
     - อธิบายหน้าที่ของ VRAM บนการ์ดจอ และลำดับ Cores/Threads ในการทำงานแบบมัลติทาสก์ของ CPU`}
          />
        </div>
        
      </main>
    </div>
  );
}
