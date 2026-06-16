# วิเคราะห์และออกแบบระบบเชิงวัตถุ (31910-2003)

## Unit 1: การจัดทำเอกสาร SRS

- 1.1 องค์ประกอบของ SRS
- 1.2 โครงสร้างมาตรฐานของ SRS
  - 1.2.1 บทนำ (Introduction)
  - 1.2.2 คำอธิบายโดยรวม (Overall Description)
  - 1.2.3 ข้อกำหนดเชิงฟังก์ชัน (Functional Requirements)
  - 1.2.4 ข้อกำหนดที่ไม่ใช่เชิงฟังก์ชัน (Non-Functional Requirements)
  - 1.2.5 เงื่อนไข/ข้อจำกัด & สมมติฐาน (Constraints & Assumptions)
  - 1.2.6 เกณฑ์การยอมรับ (Acceptance Criteria)
  - 1.2.7 ภาคผนวก (Appendix)
- 1.3 ตัวอย่าง SRS งานระบบจัดการข้อมูลนักศึกษา (Project 1)
- 1.4 ตัวอย่าง SRS งานระบบจัดการข้อมูลสินค้าคงคลัง (Project 2)
- 1.5 ตัวอย่าง SRS งานระบบจัดการข้อมูลการจอง (Project 3)

## Unit 2: Activity Diagram (UML)

- 2.1 ทำความรู้จักกับ Activity Diagram
- 2.2 องค์ประกอบของ Activity Diagram
  - 2.2.1 จุดเริ่มต้น (Start)
  - 2.2.2 จุดสิ้นสุด (End)
  - 2.2.3 กิจกรรม (Activity)
  - 2.2.4 เส้นเชื่อม (Transition)
  - 2.2.5 การตัดสินใจ (Decision)
  - 2.2.6 การรวมกลุ่ม (Merge)
  - 2.2.7 การแยกกลุ่ม (Fork)
  - 2.2.8 การรวมกลุ่ม (Join)
- 2.3 เทคนิคการวาด Activity Diagram
- 2.4 การแปลง Activity Diagram เป็นโค้ด

## Unit 3: การจัดทำเอกสารข้อกำหนดความต้องการ (SRS Document)

- 3.1 บทบาทและความสำคัญของเอกสาร SRS (Software Requirements Specification)
- 3.2 มาตรฐานของเอกสาร SRS (เช่น IEEE 830 หรือมาตรฐาน ISO ที่เกี่ยวข้อง)
- 3.3 โครงสร้างหลักของเอกสาร SRS
  - 3.3.1 บทนำ (Introduction: Purpose, Scope, Definitions)
  - 3.3.2 คำอธิบายทั่วไป (Overall Description: Product Perspective, User Characteristics, Constraints)
  - 3.3.3 ข้อกำหนดเฉพาะ (Specific Requirements: External Interfaces, Functions, Performance)
- 3.4 เทคนิคการเขียนเนื้อหาและลักษณะของ SRS ที่ดี (Correct, Unambiguous, Complete, Consistent)
- 3.5 การสอบทานและการอนุมัติเอกสาร (Requirements Validation & Sign-off)

## Unit 4: แผนภาพยูสเคส (Use Case Diagram และ Use Case Specification)

- 4.1 ทำความรู้จักกับ UML (Unified Modeling Language)
  - 4.1.1 ประวัติและวิวัฒนาการของ UML
- 4.2 ประเภทของแผนภาพ UML
  - 4.2.1 Structural Diagram (แผนภาพโครงสร้าง)
  - 4.2.2 Behavioral Diagram (แผนภาพพฤติกรรม)
- 4.3 องค์ประกอบของ Use Case Diagram
  - 4.3.1 ระบบและขอบเขตของระบบ (System & System Boundary)
  - 4.3.2 ผู้กระทำ (Actor - Primary และ Secondary)
  - 4.3.3 กรณีการใช้งาน (Use Case)
- 4.4 ความสัมพันธ์ใน Use Case Diagram
  - 4.4.1 ความสัมพันธ์แบบ Association
  - 4.4.2 ความสัมพันธ์แบบ Include (<<include>>)
  - 4.4.3 ความสัมพันธ์แบบ Extend (<<extend>>)
  - 4.4.4 ความสัมพันธ์แบบ Generalization ของ Actor และ Use Case
- 4.5 การเขียนคำอธิบายยูสเคส (Use Case Specification / Use Case Description)
  - 4.5.1 Pre-conditions และ Post-conditions
  - 4.5.2 Normal Flow (Basic Course of Events)
  - 4.5.3 Alternate Flow และ Exception Flow

## Unit 5: พื้นฐานการคิดเชิงวัตถุ (Object-Oriented Concepts)

- 5.1 แนวคิดเชิงวัตถุ (Object-Oriented Paradigm)
- 5.2 ความแตกต่างและความสัมพันธ์ระหว่าง Class กับ Object (Instance)
- 5.3 องค์ประกอบของคลาส
  - 5.3.1 ชื่อคลาส (Class Name)
  - 5.3.2 คุณลักษณะ (Attributes / Properties / State)
  - 5.3.3 พฤติกรรม (Methods / Operations / Behaviors)
- 5.4 หลักการสำคัญ 4 ประการของ OOP (Four Pillars of OOP)
  - 5.4.1 Abstraction (นามธรรม)
  - 5.4.2 Encapsulation (การห่อหุ้ม)
  - 5.4.3 Inheritance (การสืบทอด)
  - 5.4.4 Polymorphism (พหุสัณฐาน)
- 5.5 เทคนิคการสกัดคลาสและเมธอดจากข้อกำหนด (Noun-Verb Analysis)
  - 5.5.1 หาคลาสจากคำนาม (Nouns)
  - 5.5.2 หาเมธอดจากคำกริยา (Verbs)

## Unit 6: กระบวนการวิเคราะห์และออกแบบเชิงวัตถุ (OOAD Process)

- 6.1 ความแตกต่างระหว่าง Object-Oriented Analysis (OOA) และ Object-Oriented Design (OOD)
- 6.2 การวิเคราะห์คลาสด้วยเครื่องมือ CRC Cards (Class-Responsibility-Collaborator)
  - 6.2.1 Class (การระบุคลาส)
  - 6.2.2 Responsibilities (ความรับผิดชอบของคลาส)
  - 6.2.3 Collaborators (ผู้ร่วมงาน/คลาสที่ต้องติดต่อด้วย)
- 6.3 หลักการออกแบบคลาสที่ดี (SOLID Principles เบื้องต้น)
  - 6.3.1 Single Responsibility Principle (SRP)
  - 6.3.2 การหลีกเลี่ยง God Class หรือ Blob Anti-pattern
- 6.4 การเชื่อมโยง Use Case สู่ CRC Cards และ Class Model

## Unit 7: แผนภาพคลาส (Class Diagram)

- 7.1 สัญลักษณ์และการวาด Class Diagram
  - 7.1.1 กล่องสี่เหลี่ยม 3 ส่วน (Name, Attributes, Operations)
- 7.2 สัญลักษณ์การเข้าถึงข้อมูล (Visibility Modifiers)
  - 7.2.1 (+) Public
  - 7.2.2 (-) Private
  - 7.2.3 (#) Protected
  - 7.2.4 (~) Package (เบื้องต้น)
- 7.3 การกำหนดชนิดข้อมูล (Data Types) และค่าเริ่มต้น (Initial Value)
- 7.4 ความสัมพันธ์ระหว่างคลาส (Relationships)
  - 7.4.1 Association (รวมถึง Multiplicity / Cardinality: 1..1, 1.._, 0.._)
  - 7.4.2 Aggregation (has-a)
  - 7.4.3 Composition (part-of / strong has-a)
  - 7.4.4 Generalization / Inheritance (is-a)
  - 7.4.5 Dependency (uses)
- 7.5 การเปลี่ยนจาก Analysis Class Diagram ไปสู่ Design Class Diagram

## Unit 8: แผนภาพพฤติกรรม (Behavioral Diagrams: Activity & Sequence)

- 8.1 Activity Diagram (แผนภาพกิจกรรม)
  - 8.1.1 องค์ประกอบ: Initial Node, Final Node, Action, Control Flow
  - 8.1.2 Decision Node และ Merge Node (เงื่อนไข)
  - 8.1.3 Fork และ Join (การทำงานแบบคู่ขนาน/พร้อมกัน)
  - 8.1.4 Swimlanes (Partition) สำหรับระบุผู้รับผิดชอบกิจกรรม
  - 8.1.5 การนำ Activity Diagram มาอธิบาย Use Case
- 8.2 Sequence Diagram (แผนภาพลำดับเหตุการณ์)
  - 8.2.1 องค์ประกอบ: Actor, Object, แกนเวลา (Lifelines)
  - 8.2.2 แถบการทำงาน (Activation Bar / Execution Occurrence)
  - 8.2.3 ข้อความ (Messages): Synchronous, Asynchronous, Return Message
  - 8.2.4 Self-Message และ Creation/Destruction of Objects
  - 8.2.5 Combined Fragments เบื้องต้น (alt, opt, loop) เพื่อจัดการเงื่อนไขและการวนซ้ำ

## Unit 9: การประยุกต์ใช้และโครงงานขนาดเล็ก (Mini Project)

- 9.1 การตรวจสอบความสอดคล้อง (Consistency) ของโมเดลทั้งหมด
  - 9.1.1 ความเชื่อมโยงระหว่าง Use Case, Activity, Sequence และ Class Diagram
- 9.2 การออกแบบสถาปัตยกรรมซอฟต์แวร์เบื้องต้น (Software Architecture)
  - 9.2.1 สถาปัตยกรรมแบบ 3-Tier (Presentation, Business Logic, Data Access)
  - 9.2.2 รูปแบบ MVC (Model-View-Controller) เบื้องต้น
- 9.3 การออกแบบส่วนติดต่อผู้ใช้ (User Interface Mockup / Wireframing)
  - 9.3.1 หลักการออกแบบ UI/UX เบื้องต้น
  - 9.3.2 เครื่องมือสร้าง Mockup (เช่น Figma, Balsamiq)
- 9.4 การนำเสนอโครงการ (Project Pitching)
  - 9.4.1 การเตรียมเอกสารระบบ (System Documentation)
  - 9.4.2 บทบาทสมมติ (Role-Play Presentation) ในฐานะ System Analyst
