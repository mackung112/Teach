import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  ConceptCard,
  SectionBlock,
  AmbientBackdrop,
  SQL1_BLOBS
} from '../shared';
import {
  Database,
  Table,
  Plus,
  Trash2,
  Key,
  Check,
  CheckCircle2,
  AlertCircle,
  Play,
  ArrowRight,
  Lock,
  Settings,
  Terminal,
  Grid,
  Layers,
  HelpCircle,
  FileCode,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

export default function SQL2_1() {
  // ─── Interactive Stepper State ───
  const [activeStep, setActiveStep] = useState(0);

  // ─── Table Schema State ───
  const [columns, setColumns] = useState([
    { name: 'student_id', type: 'VARCHAR(10)', isPK: true },
    { name: 'name', type: 'VARCHAR(50)', isPK: false },
    { name: 'age', type: 'INT', isPK: false }
  ]);

  // ─── Table Records State ───
  const [records, setRecords] = useState([
    { student_id: 'STD01', name: 'แอน (Anna)', age: 18 },
    { student_id: 'STD02', name: 'บ็อบ (Bob)', age: 19 }
  ]);

  // ─── Form Inputs State ───
  // 1. Column Add Form
  const [newColName, setNewColName] = useState('');
  const [newColType, setNewColType] = useState('VARCHAR(50)');
  const [newColIsPK, setNewColIsPK] = useState(false);

  // 2. Record Insert Form (keyed by column name)
  const [newRecordData, setNewRecordData] = useState({
    student_id: '',
    name: '',
    age: ''
  });

  // ─── Output Console Log State ───
  const [outputLogs, setOutputLogs] = useState([
    { status: 'success', time: '08:30:00', action: 'INIT', message: 'สร้างตาราง students สำเร็จ (3 คอลัมน์, 2 แถวข้อมูลเริ่มต้น)' }
  ]);
  const [validationError, setValidationError] = useState('');

  // Sync insert record form fields when columns change
  useEffect(() => {
    setNewRecordData((prev) => {
      const updated = { ...prev };
      columns.forEach((col) => {
        if (updated[col.name] === undefined) {
          updated[col.name] = '';
        }
      });
      // Clean up deleted columns
      Object.keys(updated).forEach((key) => {
        if (!columns.some((col) => col.name === key)) {
          delete updated[key];
        }
      });
      return updated;
    });
  }, [columns]);

  // ─── Stepper Content Definition ───
  const steps = [
    {
      title: 'วิเคราะห์โครงสร้าง (Table Schema Design)',
      badge: 'ขั้นตอนที่ 1',
      icon: Grid,
      color: 'text-blue-500 bg-blue-50 border-blue-200',
      accentColor: 'blue',
      desc: 'กระบวนการระบุและแปลงเอนทิตี (Entity) ในชีวิตจริงให้เป็นโครงร่างตารางเชิงสัมพันธ์ โดยแบ่งแยกข้อมูลออกเป็นคอลัมน์แนวตั้ง (Columns/Fields) และเลือกชนิดข้อมูล (Data Types) ที่เหมาะสมที่สุดกับคอลัมน์นั้นๆ',
      bulletPoints: [
        'กำหนดชื่อของเอนทิตีที่จะบันทึก เช่น ตารางนักเรียน (students)',
        'แยกคุณลักษณะออกเป็นคอลัมน์เพื่อจัดหมวดหมู่ข้อมูล',
        'ระบุชนิดข้อมูลให้ครอบคลุมและมีประสิทธิภาพต่อการจัดเก็บจริงในหน่วยความจำ'
      ],
      highlights: [
        { term: 'Table Name', definition: 'ชื่อของตารางเพื่อระบุวัตถุข้อมูลเชิงระบบ เช่น students' },
        { term: 'Field / Attribute', definition: 'คุณลักษณะแนวตั้งเฉพาะตัวในตาราง เช่น name, age' },
        { term: 'Data Type', definition: 'ข้อกำหนดประเภทข้อมูลสำหรับควบคุมตรรกะ เช่น VARCHAR, INT' }
      ],
      sqlCode: `-- กำหนดแผนผังตารางเบื้องต้นในกระดาษร่าง
-- ตาราง: students
-- รายการคอลัมน์และข้อกำหนดที่วิเคราะห์ได้:
--   - student_id : ข้อความรหัสขนาดสั้น (VARCHAR(10))
--   - name       : ข้อความชื่อ-นามสกุล (VARCHAR(50))
--   - age        : ตัวเลขจำนวนเต็มอายุ (INT)`
    },
    {
      title: 'กำหนดข้อกำหนดคีย์หลัก (Primary Key Constraints)',
      badge: 'ขั้นตอนที่ 2',
      icon: Key,
      color: 'text-amber-500 bg-amber-50 border-amber-200',
      accentColor: 'amber',
      desc: 'การคัดเลือกหนึ่งคอลัมน์ขึ้นมาเพื่อทำหน้าที่เป็น "คีย์หลัก (Primary Key)" ซึ่งเป็นกลไกสำคัญในการชี้ระบุตัวตนประจำแถวข้อมูล โดยมีเงื่อนไขบังคับเชิงสถาปัตยกรรม 2 ข้อ เพื่อป้องกันไม่ให้ข้อมูลสับสนซ้ำซาก',
      bulletPoints: [
        'UNIQUE Constraint: ค่าของคีย์หลักในแต่ละแถวข้อมูลต้องห้ามซ้ำกันเด็ดขาด',
        'NOT NULL Constraint: คีย์หลักห้ามเป็นค่าว่างเปล่า (Null) ต้องระบุเสมอ',
        'Entity Integrity: ช่วยควบคุมความถูกต้องสมบูรณ์ของวัตถุแต่ละตัวในตาราง'
      ],
      highlights: [
        { term: 'Primary Key (PK)', definition: 'คีย์ระบุข้อมูลแถวห้ามซ้ำและห้ามว่างเปล่าประจำตาราง' },
        { term: 'NOT NULL', definition: 'กฎความปลอดภัยทางสคีมาที่บังคับผู้ใช้ป้อนข้อมูลห้ามละเว้น' },
        { term: 'Unique Value', definition: 'ความเฉพาะตัวของข้อมูลเพื่อแยกแยะแต่ละแถวไม่ให้ซ้ำซ้อนกัน' }
      ],
      sqlCode: `-- กำหนดให้ student_id เป็นตัวระบุตัวตน (Primary Key)
-- โครงสร้างความปลอดภัยของ PK:
--   - ป้องกันไม่ให้มีรหัสนักเรียนซ้ำกันในตาราง
--   - บังคับว่าผู้เรียนทุกคนต้องกรอกรหัสประจำตัว`
    },
    {
      title: 'ประกาศตารางจริงด้วย DDL (CREATE TABLE)',
      badge: 'ขั้นตอนที่ 3',
      icon: Database,
      color: 'text-purple-500 bg-purple-50 border-purple-200',
      accentColor: 'purple',
      desc: 'หลังจากเสร็จสิ้นขั้นตอนการร่างแบบและกำหนดกฎความปลอดภัยแล้ว จะใช้ประโยคคำสั่งในกลุ่มภาษาคำนิยามข้อมูล (Data Definition Language หรือ DDL) ส่งสคริปต์สั่งให้ DBMS จัดตั้งตารางเปล่าในระบบ',
      bulletPoints: [
        'ใช้คำสั่ง CREATE TABLE เพื่อประกาศชื่อตารางใหม่',
        'นิยามแต่ละฟิลด์ ชนิดข้อมูล และข้อจำกัดความปลอดภัยคีย์ในวงเล็บ',
        'DBMS จะจองพื้นที่เก็บข้อมูลและสร้างโครงร่างตารางเปล่า (Empty Table Schema)'
      ],
      highlights: [
        { term: 'DDL', definition: 'กลุ่มคำสั่ง SQL สำหรับการกำหนดโครงสร้างและออบเจกต์ในระบบ' },
        { term: 'CREATE TABLE', definition: 'คำสั่งพื้นฐานในการสร้างตารางระเบียนข้อมูลใหม่ในฐานข้อมูล' },
        { term: 'Relation Schema', definition: 'หัวโครงร่างความสัมพันธ์ตารางที่เสร็จสิ้น พร้อมรับข้อมูลป้อนเข้า' }
      ],
      sqlCode: `CREATE TABLE students (
  student_id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  age INT
);
-- ผลลัพธ์: ได้ตาราง students ที่มีโครงสร้างเปล่ารอการบันทึก`
    },
    {
      title: 'แทรกข้อมูลและกรองกฎด้วย DML (INSERT INTO)',
      badge: 'ขั้นตอนที่ 4',
      icon: Play,
      color: 'text-emerald-500 bg-emerald-50 border-emerald-200',
      accentColor: 'emerald',
      desc: 'ขั้นตอนการนำเข้าข้อมูลจริงเข้าสู่ระบบผ่านการใช้ภาษาจัดการข้อมูล (Data Manipulation Language หรือ DML) โดยส่งคำสั่งแทรกระเบียนแถวข้อมูล (Rows) และปล่อยให้ SQL Engine ประเมินกฎความปลอดภัยโดยอัตโนมัติ',
      bulletPoints: [
        'ใช้ประโยคคำสั่ง INSERT INTO ร่วมกับ VALUES เพื่อป้อนแถวข้อมูลใหม่',
        'กลไก SQL Engine สแกนข้อจำกัดคีย์หลักของข้อมูลที่นำเข้าแบบเรียลไทม์',
        'หากคีย์หลักซ้ำหรือเป็นค่าว่าง ระบบจะระงับการทำงานและโยน Error กลับมา'
      ],
      highlights: [
        { term: 'DML', definition: 'กลุ่มคำสั่ง SQL ในการแก้ไขดึงข้อมูลระดับแถว เช่น INSERT, UPDATE' },
        { term: 'INSERT INTO', definition: 'คำสั่ง SQL สำหรับระบุค่าข้อมูลนำเข้าประจำแถวใหม่' },
        { term: 'PK Validation', definition: 'การสแกนเปรียบเทียบค่าคีย์หลักใหม่กับชุดค่าคีย์เดิมในฐานข้อมูล' }
      ],
      sqlCode: `INSERT INTO students (student_id, name, age)
VALUES ('STD01', 'แอน (Anna)', 18);

-- หากป้อนค่าคีย์หลัก (student_id) ซ้ำ:
-- INSERT INTO students (student_id, name, age) VALUES ('STD01', 'บ็อบ', 19);
-- จะเกิดข้อผิดพลาด: Error: Duplicate entry 'STD01' for key 'PRIMARY'`
    },
    {
      title: 'ได้ตารางและสืบค้นผลลัพธ์ (Relation Instance)',
      badge: 'ขั้นตอนที่ 5',
      icon: Table,
      color: 'text-indigo-500 bg-indigo-50 border-indigo-200',
      accentColor: 'indigo',
      desc: 'ผลลัพธ์สูงสุดเมื่อข้อมูลผ่านการคัดกรองความสมบูรณ์และถูกต้องเรียบร้อยแล้ว ข้อมูลจริงจะถูกผูกติดกับแผนผังโครงร่างตารางอย่างถาวรในระบบ RDBMS พร้อมแสดงผลและสืบค้นเรียกใช้งาน',
      bulletPoints: [
        'ข้อมูลจัดกลุ่มเป็นระเบียบแถวแนวนอน (Rows/Records/Tuples) อย่างสวยงาม',
        'สืบค้นข้อมูลออกมาแสดงผลเชิงวิเคราะห์ได้ด้วยคำสั่ง SQL SELECT',
        'พร้อมสำหรับนำไปขยายผล หรือทำข้อผูกมัดความสัมพันธ์กับตารางอื่นๆ'
      ],
      highlights: [
        { term: 'Relation Instance', definition: 'ภาพข้อมูลจริงที่จัดเก็บอยู่ในตาราง ณ เวลาใดเวลาหนึ่ง' },
        { term: 'SELECT Query', definition: 'คำสั่งเรียกดึงข้อมูลระเบียนเพื่อมาเรนเดอร์แสดงผลงาน' },
        { term: 'Physical Table', definition: 'การจัดเก็บกายภาพที่เป็นระบบแถวและคอลัมน์ที่สมบูรณ์' }
      ],
      sqlCode: `SELECT * FROM students;

-- ได้ตารางสมบูรณ์พร้อมแสดงผลใน Workbench:
-- +------------+------------+-----+
-- | student_id | name       | age |
-- +------------+------------+-----+
-- | STD01      | Anna       |  18 |
-- | STD02      | Bob        |  19 |
-- +------------+------------+-----+`
    }
  ];

  // ─── Operations: Add Column ───
  const addColumn = () => {
    const nameClean = newColName.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (!nameClean) {
      setValidationError('กรุณาระบุชื่อคอลัมน์ที่เป็นอักษรภาษาอังกฤษหรือตัวเลข');
      return;
    }

    if (columns.some((col) => col.name === nameClean)) {
      setValidationError(`คอลัมน์ชื่อ '${nameClean}' มีอยู่แล้วในตาราง`);
      return;
    }

    // If new column is marked as Primary Key, unmark others (standard database simplifies to 1 PK here)
    const updatedCols = columns.map((col) => ({
      ...col,
      isPK: newColIsPK ? false : col.isPK
    }));

    const newColumnObj = {
      name: nameClean,
      type: newColType,
      isPK: newColIsPK
    };

    setColumns([...updatedCols, newColumnObj]);

    // Update existing records to have this column as empty value
    setRecords((prev) =>
      prev.map((rec) => ({
        ...rec,
        [nameClean]: newColType.includes('INT') || newColType.includes('DECIMAL') ? 0 : ''
      }))
    );

    const timestamp = new Date().toLocaleTimeString();
    setOutputLogs((prev) => [
      {
        status: 'success',
        time: timestamp,
        action: 'ALTER TABLE',
        message: `ALTER TABLE students ADD COLUMN ${nameClean} ${newColType}${newColIsPK ? ' PRIMARY KEY' : ''};`
      },
      ...prev
    ]);

    // Reset inputs
    setNewColName('');
    setNewColIsPK(false);
    setValidationError('');
  };

  // ─── Operations: Delete Column ───
  const deleteColumn = (colName) => {
    if (columns.length <= 1) {
      setValidationError('ตารางต้องมีคอลัมน์เหลืออยู่อย่างน้อย 1 คอลัมน์');
      return;
    }

    const colToDelete = columns.find((c) => c.name === colName);
    const updatedCols = columns.filter((c) => c.name !== colName);

    // If we deleted the primary key, assign PK to the first column automatically for demo safety
    if (colToDelete?.isPK && updatedCols.length > 0) {
      updatedCols[0].isPK = true;
    }

    setColumns(updatedCols);

    // Remove column value from all records
    setRecords((prev) =>
      prev.map((rec) => {
        const nextRec = { ...rec };
        delete nextRec[colName];
        return nextRec;
      })
    );

    const timestamp = new Date().toLocaleTimeString();
    setOutputLogs((prev) => [
      {
        status: 'success',
        time: timestamp,
        action: 'ALTER TABLE',
        message: `ALTER TABLE students DROP COLUMN ${colName};`
      },
      ...prev
    ]);
  };

  // ─── Operations: Insert Record ───
  const insertRecord = () => {
    setValidationError('');
    
    // Find Primary Key column
    const pkColumn = columns.find((c) => c.isPK);
    if (!pkColumn) {
      setValidationError('โครงสร้างตารางจำเป็นต้องมีคีย์หลัก (Primary Key) ก่อนทำการเพิ่มระเบียนข้อมูล');
      return;
    }

    const pkValue = newRecordData[pkColumn.name]?.trim();

    // 1. PK NOT NULL Check
    if (!pkValue) {
      setValidationError(`ข้อจำกัดความปลอดภัย: คอลัมน์คีย์หลัก '${pkColumn.name}' ห้ามมีค่าว่าง (NOT NULL)`);
      return;
    }

    // 2. PK Duplicate Check
    const isDuplicate = records.some((rec) => String(rec[pkColumn.name]).toLowerCase() === pkValue.toLowerCase());
    if (isDuplicate) {
      const timestamp = new Date().toLocaleTimeString();
      setOutputLogs((prev) => [
        {
          status: 'error',
          time: timestamp,
          action: 'INSERT ERROR',
          message: `Error: Duplicate entry '${pkValue}' for key 'PRIMARY'. (คีย์หลักซ้ำ ห้ามเพิ่มแถวข้อมูล!)`
        },
        ...prev
      ]);
      setValidationError(`ข้อผิดพลาดความปลอดภัย: พบค่าคีย์หลักซ้ำ '${pkValue}' ในระบบ!`);
      return;
    }

    // Formulate new record object
    const newRecordObj = {};
    columns.forEach((col) => {
      const val = newRecordData[col.name];
      if (col.type.includes('INT')) {
        newRecordObj[col.name] = val ? parseInt(val, 10) : 0;
      } else if (col.type.includes('DECIMAL')) {
        newRecordObj[col.name] = val ? parseFloat(val) : 0.0;
      } else {
        newRecordObj[col.name] = val || '';
      }
    });

    setRecords([...records, newRecordObj]);

    // Construct SQL INSERT log
    const colNamesStr = columns.map((c) => c.name).join(', ');
    const colValsStr = columns.map((c) => {
      const val = newRecordObj[c.name];
      return typeof val === 'string' ? `'${val}'` : val;
    }).join(', ');

    const timestamp = new Date().toLocaleTimeString();
    setOutputLogs((prev) => [
      {
        status: 'success',
        time: timestamp,
        action: 'INSERT INTO',
        message: `INSERT INTO students (${colNamesStr}) VALUES (${colValsStr});`
      },
      ...prev
    ]);

    // Reset record inputs, keeping schemas intact
    const resetData = {};
    columns.forEach((col) => {
      resetData[col.name] = '';
    });
    setNewRecordData(resetData);
  };

  // ─── Operations: Delete Record ───
  const deleteRecord = (index) => {
    const targetRec = records[index];
    const pkColumn = columns.find((c) => c.isPK);
    const pkVal = pkColumn ? targetRec[pkColumn.name] : '';

    setRecords(records.filter((_, idx) => idx !== index));

    const timestamp = new Date().toLocaleTimeString();
    setOutputLogs((prev) => [
      {
        status: 'success',
        time: timestamp,
        action: 'DELETE FROM',
        message: `DELETE FROM students WHERE ${pkColumn?.name || 'row'} = '${pkVal}';`
      },
      ...prev
    ]);
  };

  // Reset simulator
  const resetSimulator = () => {
    setColumns([
      { name: 'student_id', type: 'VARCHAR(10)', isPK: true },
      { name: 'name', type: 'VARCHAR(50)', isPK: false },
      { name: 'age', type: 'INT', isPK: false }
    ]);
    setRecords([
      { student_id: 'STD01', name: 'แอน (Anna)', age: 18 },
      { student_id: 'STD02', name: 'บ็อบ (Bob)', age: 19 }
    ]);
    setNewColName('');
    setNewColIsPK(false);
    setNewRecordData({ student_id: '', name: '', age: '' });
    setValidationError('');
    setOutputLogs([
      { status: 'success', time: new Date().toLocaleTimeString(), action: 'RESET', message: 'รีเซ็ตโครงสร้างและข้อมูลตารางกลับเป็นค่าเริ่มต้น' }
    ]);
  };

  const currentStepData = steps[activeStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* Intro - Fluid Open-Air Layout */}
        <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
          ในระบบจัดการฐานข้อมูลเชิงสัมพันธ์ (RDBMS) ตารางเปรียบเสมือนบ้านในการจัดเก็บข้อมูลเชิงกายภาพที่ถาวร 
          การสร้างตารางและนำข้อมูลเข้าใช้งานมีลำดับขั้นตอนที่เป็นวิทยาการคอมพิวเตอร์อย่างเป็นระบบ 
          ตั้งแต่การวิเคราะห์โครงร่างสคีมา จนถึงการสืบค้นข้อมูลที่ผ่านการประเมินกฎควบคุมความปลอดภัย
        </p>

        {/* ─── Section 1: Stepper (กระบวนการสร้างตารางแบบเป็นขั้นตอน) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              วิศวกรรมสถาปัตยกรรมข้อมูล / ลำดับขั้นตอนการพัฒนา
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              กระบวนการ 5 ขั้นตอนจากศูนย์การออกแบบสู่ตารางข้อมูลสมบูรณ์
            </h3>
          </div>

          {/* Timeline Step Indicators */}
          <div className="relative">
            {/* Background Line Connecting Steps */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-200 -translate-y-1/2 z-0 hidden md:block" />
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
              {steps.map((st, idx) => {
                const IsActive = activeStep === idx;
                const IsPassed = activeStep > idx;
                const StIcon = st.icon;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col items-start gap-2 bg-white/60 backdrop-blur-md shadow-sm ${
                      IsActive 
                        ? 'border-blue-500 shadow-md ring-2 ring-blue-500/10 -translate-y-1' 
                        : IsPassed 
                          ? 'border-emerald-300 bg-emerald-50/20' 
                          : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wide font-mono ${
                        IsActive 
                          ? 'bg-blue-100 text-blue-600' 
                          : IsPassed 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-zinc-150 text-zinc-500'
                      }`}>
                        {st.badge}
                      </span>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 ${
                        IsActive 
                          ? 'bg-blue-500 border-blue-400 text-white' 
                          : IsPassed 
                            ? 'bg-emerald-500 border-emerald-400 text-white' 
                            : 'bg-white border-zinc-200 text-zinc-400'
                      }`}>
                        {IsPassed ? <Check className="w-3.5 h-3.5" /> : <StIcon className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                    <span className={`text-[12.5px] font-bold line-clamp-1 leading-snug ${
                      IsActive ? 'text-blue-600' : IsPassed ? 'text-emerald-700' : 'text-slate-700'
                    }`}>
                      {st.title.split(' (')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stepper Content Area (Glassmorphic Container) */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-stretch transition-all duration-300">
            {/* Step Explanation (Left Panel) */}
            <div className="flex-1 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl shadow-inner shrink-0 ${currentStepData.color}`}>
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                      {currentStepData.badge}
                    </span>
                    <h4 className="text-[19px] font-bold text-slate-800 leading-tight">
                      {currentStepData.title}
                    </h4>
                  </div>
                </div>

                <p className="text-[14.5px] text-slate-600 leading-relaxed font-normal">
                  {currentStepData.desc}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2 text-[13.5px] text-slate-500 pl-1">
                  {currentStepData.bulletPoints.map((pt, pidx) => (
                    <li key={pidx} className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Terms & Badges */}
              <div className="pt-4 border-t border-zinc-200/50">
                <span className="text-[10px] font-mono text-zinc-400 block uppercase font-bold tracking-wider mb-2">
                  คีย์เวิร์ดวิชาการหลักประจำขั้น:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentStepData.highlights.map((hl, hidx) => (
                    <div 
                      key={hidx} 
                      className="group/badge relative px-2.5 py-1 bg-zinc-100/75 border border-zinc-200/60 rounded-lg text-[12px] font-semibold text-slate-700 cursor-help hover:bg-zinc-200 hover:text-zinc-900 hover:border-zinc-350 transition-colors"
                    >
                      <span>{hl.term}</span>
                      {/* Tooltip on hover */}
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-52 bg-slate-900 text-white text-[11.5px] rounded-lg p-2 shadow-xl opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all pointer-events-none z-30 font-normal leading-normal">
                        <strong className="block border-b border-white/10 pb-0.5 mb-1 font-mono text-blue-300">{hl.term}</strong>
                        {hl.definition}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step Code Output / SVG Mock (Right Panel) */}
            <div className="w-full lg:w-96 flex flex-col justify-between bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white/90 text-sm font-mono shadow-inner min-h-[260px]">
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-blue-400" />
                  <span>SQL Command Snippet</span>
                </div>
                <span>students_db</span>
              </div>
              
              <pre className="flex-1 text-[13px] leading-relaxed overflow-x-auto text-blue-100 font-mono whitespace-pre-wrap">
                {currentStepData.sqlCode}
              </pre>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5 text-[10px] text-slate-500">
                <span>RDBMS System Output</span>
                <span className="text-emerald-400 font-bold">● ONLINE</span>
              </div>
            </div>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className={`px-4 py-2 border rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeStep === 0 
                  ? 'border-zinc-200 text-zinc-350 cursor-not-allowed opacity-50' 
                  : 'border-zinc-300 text-slate-600 hover:bg-zinc-100 hover:scale-[1.02] active:scale-98'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              ขั้นตอนก่อนหน้า
            </button>

            <span className="text-xs font-mono font-bold text-zinc-400">
              หน้า {activeStep + 1} / {steps.length}
            </span>

            <button
              onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
              disabled={activeStep === steps.length - 1}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeStep === steps.length - 1 
                  ? 'bg-zinc-100 border border-zinc-200 text-zinc-350 cursor-not-allowed opacity-50' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] active:scale-98 shadow-md'
              }`}
            >
              ขั้นตอนถัดไป
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* ─── Section 2: Simulator (Table & Record Builder) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              ตัวจำลองตรรกะ / ปฏิบัติการ Schema
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตารางจำลองออกแบบโครงสร้างและสแกนคีย์ความปลอดภัย
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ปฏิบัติการจำลองการเพิ่มคอลัมน์ (DDL) และทดสอบป้อนแทรกแถวระเบียนจริง (DML) 
            เพื่อสังเกตกลไกการดักจับข้อผิดพลาดกรณีคีย์หลัก (Primary Key Constraint) ซ้ำซ้อนทางโครงสร้างด้วยตนเอง:
          </p>

          {/* ─── Simulator Shell ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="table-simulator">
            
            {/* Schema Controller (Left Panel) */}
            <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[500px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                SCHEMA CONTROLLER
              </span>

              <div className="space-y-6 mt-4">
                <div className="space-y-1">
                  <h4 className="text-[16px] font-bold text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-400" />
                    บริหารจัดการตาราง
                  </h4>
                  <p className="text-[12.5px] text-slate-400">
                    ปรับเปลี่ยนโครงสร้างฟิลด์ หรือป้อนข้อมูลแถวใหม่เพื่อทดสอบข้อจำกัดคีย์หลัก
                  </p>
                </div>

                {/* Form 1: Add Column */}
                <div className="bg-slate-950/70 border border-slate-800/85 rounded-xl p-4 space-y-3">
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wide block">
                    1. เพิ่มคอลัมน์ใหม่ (ALTER TABLE ADD)
                  </span>
                  
                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-[10px] text-slate-500 font-mono mb-1">COLUMN NAME (ภาษาอังกฤษพิมพ์เล็ก)</label>
                      <input 
                        type="text"
                        value={newColName}
                        onChange={(e) => setNewColName(e.target.value)}
                        placeholder="เช่น score, gpa, major"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg py-1.5 px-3 text-xs text-white focus:border-blue-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-500 font-mono mb-1">DATA TYPE</label>
                        <select 
                          value={newColType}
                          onChange={(e) => setNewColType(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white focus:outline-none"
                        >
                          <option value="VARCHAR(50)">VARCHAR(50) [ข้อความ]</option>
                          <option value="INT">INT [จำนวนเต็ม]</option>
                          <option value="DECIMAL(3,2)">DECIMAL(3,2) [ทศนิยม]</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-center pt-4">
                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={newColIsPK}
                            onChange={(e) => setNewColIsPK(e.target.checked)}
                            className="w-3.5 h-3.5 accent-amber-500 cursor-pointer"
                          />
                          ตั้งเป็นคีย์หลัก (PK)
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={addColumn}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      เพิ่มฟิลด์ลงตาราง
                    </button>
                  </div>
                </div>

                {/* Form 2: Insert Record */}
                <div className="bg-slate-950/70 border border-slate-800/85 rounded-xl p-4 space-y-3">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide block">
                    2. เพิ่มระเบียนแถวข้อมูล (INSERT INTO)
                  </span>

                  <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                    {columns.map((col) => (
                      <div key={col.name} className="flex items-center justify-between gap-3">
                        <label className="text-xs font-mono text-slate-300 flex items-center gap-1 text-left truncate w-28 shrink-0">
                          {col.isPK && <Key className="w-3 h-3 text-amber-400 shrink-0" />}
                          {col.name}:
                          <span className="text-[10px] text-slate-500 font-normal">({col.type})</span>
                        </label>
                        <input 
                          type="text"
                          value={newRecordData[col.name] || ''}
                          onChange={(e) => setNewRecordData({
                            ...newRecordData,
                            [col.name]: e.target.value
                          })}
                          placeholder={col.isPK ? 'รหัสห้ามซ้ำ...' : `ระบุค่าฟิลด์ ${col.name}...`}
                          className="bg-slate-900 border border-white/10 rounded-lg py-1 px-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none font-mono grow w-full"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={insertRecord}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md mt-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    แทรกแถวข้อมูล (Insert Row)
                  </button>
                </div>
              </div>

              {/* Error messages / Reset button */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {validationError && (
                    <div className="text-rose-400 text-xs font-semibold flex items-center gap-1 animate-pulse">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span className="truncate">{validationError}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={resetSimulator}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-white/5 text-slate-300 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer"
                >
                  รีเซ็ตตาราง
                </button>
              </div>

            </div>

            {/* Visual Storage Table & Console Logs (Right Panel) */}
            <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl flex flex-col justify-between min-h-[500px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">
                PHYSICAL STORAGE
              </span>

              {/* Window body */}
              <div className="flex-1 mt-6 flex flex-col justify-between">
                
                {/* Physical Table Display */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono text-slate-500 block uppercase font-bold">
                      Table: students
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      จำนวนคอลัมน์: {columns.length} | จำนวนระเบียน: {records.length}
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-white/5 bg-slate-900/40">
                    <table className="w-full text-left text-xs font-mono border-collapse">
                      <thead>
                        <tr className="bg-slate-950 border-b border-white/10 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                          {columns.map((col) => (
                            <th key={col.name} className="p-3 border-r border-white/5 font-mono text-slate-300">
                              <div className="flex items-center gap-1">
                                {col.isPK && <Key className="w-3.5 h-3.5 text-amber-400 shrink-0" title="Primary Key" />}
                                <span>{col.name}</span>
                              </div>
                              <span className="text-[9px] text-slate-500 font-normal normal-case block mt-0.5">({col.type})</span>
                            </th>
                          ))}
                          <th className="p-3 text-slate-400 text-[10px] text-center w-12">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.length === 0 ? (
                          <tr>
                            <td colSpan={columns.length + 1} className="p-6 text-center text-slate-500 italic">
                              ไม่มีระเบียนข้อมูล (Empty Set)
                            </td>
                          </tr>
                        ) : (
                          records.map((rec, recIdx) => (
                            <tr key={recIdx} className="border-b border-white/5 hover:bg-white/5 text-slate-300 text-xs">
                              {columns.map((col) => (
                                <td key={col.name} className="p-3 border-r border-white/5 font-mono">
                                  {rec[col.name] !== undefined ? String(rec[col.name]) : <span className="text-slate-655 font-normal">NULL</span>}
                                </td>
                              ))}
                              <td className="p-2 text-center">
                                <button
                                  onClick={() => deleteRecord(recIdx)}
                                  className="p-1.5 hover:bg-red-950/40 text-red-400/75 hover:text-red-400 rounded transition-all cursor-pointer"
                                  title="ลบแถวข้อมูล"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Schema Columns list with DROP action */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold mb-1.5">
                      คอลัมน์ภายในระบบ (โครงสร้าง DDL):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {columns.map((col) => (
                        <span 
                          key={col.name} 
                          className={`text-[10.5px] font-mono border px-2 py-1 rounded-lg flex items-center gap-1.5 ${
                            col.isPK 
                              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 font-bold' 
                              : 'bg-slate-900 border-white/5 text-slate-300'
                          }`}
                        >
                          {col.isPK && <Key className="w-3 h-3 text-amber-400" />}
                          <span>{col.name} ({col.type})</span>
                          
                          {/* Disable deleting key primary columns or safe default for GUI simulator */}
                          {col.name !== 'student_id' && (
                            <button
                              onClick={() => deleteColumn(col.name)}
                              className="text-slate-500 hover:text-red-400 hover:scale-110 font-bold cursor-pointer ml-1"
                              title={`ลบคอลัมน์ ${col.name} ออกจากตาราง`}
                            >
                              ×
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Console Log Screen (Bottom Panel) */}
                <div className="h-32 bg-slate-950 border border-white/10 rounded-xl overflow-hidden flex flex-col mt-6">
                  <div className="bg-slate-900 border-b border-white/5 px-3 py-1.5 text-[10px] font-mono text-slate-500 font-bold tracking-widest uppercase flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    SQL Engine Query Console Output
                  </div>
                  <div className="flex-1 overflow-y-auto p-2.5 font-mono text-[11.5px] space-y-1.5">
                    {outputLogs.map((log, idx) => (
                      <div key={idx} className={`flex items-start gap-2 ${
                        log.status === 'success' 
                          ? 'text-emerald-400' 
                          : log.status === 'error' 
                            ? 'text-rose-400 animate-pulse' 
                            : 'text-slate-400'
                      }`}>
                        <span className="text-slate-600 shrink-0">[{log.time}]</span>
                        <span className="font-bold shrink-0">{log.action}:</span>
                        <span className="flex-1 break-all">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="การวิเคราะห์เปรียบเทียบและการประเมินสิทธิ์ความปลอดภัยในระดับโครงสร้างตาราง"
          taskText={`คำชี้แจง: ให้นักเรียนตอบคำถามประเมินผลการเรียนรู้ต่อไปนี้ เพื่อแสดงความรู้ความสามารถตามมาตรฐานบทเรียน 2.1:

1. จงอธิบายความหมายเชิงลึกและจุดประสงค์การแบ่งแยกระหว่าง "คอลัมน์ (Columns)" ซึ่งอ้างอิงด้านชนิดข้อมูล (Data Type) และ "แถวข้อมูล (Rows)" ซึ่งอ้างอิงชุดสารสนเทศเฉพาะตัวว่ามีกลไกประสานกันอย่างไร
2. เพราะเหตุใดข้อกำหนดคีย์หลัก (Primary Key - PK) จึงไม่อนุญาตให้ผู้ใช้งานพิมพ์หรือป้อนค่าว่าง (NULL) และห้ามป้อนค่าซ้ำซ้อนกันอย่างเด็ดขาด จงอธิบายผลเสียต่อความสมบูรณ์ถูกต้องของข้อมูล (Data Integrity) หากละเมิดกฎดังกล่าว
3. ในตัวจำลอง หากนักเรียนทำคำสั่งลบคอลัมน์ (DROP COLUMN) ที่มีข้อมูลถูกป้อนสะสมเอาไว้อยู่แล้ว ข้อมูลในฟิลด์นั้นของทุกๆ แถวจะได้รับผลกระทบอย่างไร และสถาปัตยกรรมระบบฐานข้อมูลความปลอดภัยมีแนวทางป้องกันอุบัติเหตุคำสั่งนี้อย่างไร`}
        />
      </main>
    </div>
  );
}
