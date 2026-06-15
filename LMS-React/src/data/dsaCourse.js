const dsaCourse = {
    id: "21900-1002",
    title: "โครงสร้างข้อมูลและอัลกอริทึมเบื้องต้น",
    description: "ศึกษาและปฏิบัติเกี่ยวกับโครงสร้างข้อมูล (Data Structures) และอัลกอริทึม (Algorithms) การวิเคราะห์ประสิทธิภาพความซับซ้อนของระบบ (Big O) โครงสร้างข้อมูลเชิงเส้นและไม่เชิงเส้น การจัดเรียงและค้นหาข้อมูล และการประยุกต์ใช้งานจริงในงานอาชีพ",
    icon: "🧩",
    chapters: [
        {
            id: 1,
            title: "Unit 1: แนะนำโครงสร้างข้อมูลและข้อมูลแบบนามธรรม (Introduction to Data Structures & Abstract Data Type)",
            lessons: [
                { id: "1.1", title: "1.1 ความหมายและความสำคัญของโครงสร้างข้อมูล", mainTitle: "ความหมายและความสำคัญของโครงสร้างข้อมูล", subTitle: "(Introduction to Data Structures)", description: "ทำความเข้าใจว่าทำไมต้องใช้โครงสร้างข้อมูล และประโยชน์ต่อการจัดระบบคอมพิวเตอร์", content: "[dsa1_1]" },
                { id: "1.2", title: "1.2 โครงสร้างข้อมูลแบบรายการ (List)", mainTitle: "โครงสร้างข้อมูลแบบรายการ", subTitle: "(List Data Structure)", description: "ศึกษาคุณสมบัติ ข้อดี ข้อเสีย และวิธีใช้งาน List ในภาษา Python", content: "[dsa1_2]" },
                { id: "1.3", title: "1.3 โครงสร้างข้อมูลแบบทิวเพิล (Tuple)", mainTitle: "โครงสร้างข้อมูลแบบทิวเพิล", subTitle: "(Tuple Data Structure)", description: "ศึกษาคุณสมบัติ ข้อดี ข้อเสีย และวิธีใช้งาน Tuple ในภาษา Python", content: "[dsa1_3]" },
                { id: "1.4", title: "1.4 โครงสร้างข้อมูลแบบจับคู่กุญแจและค่า (Dictionary)", mainTitle: "โครงสร้างข้อมูลแบบจับคู่กุญแจและค่า", subTitle: "(Dictionary Data Structure)", description: "ศึกษาคุณสมบัติ ข้อดี ข้อเสีย และวิธีใช้งาน Dictionary ในภาษา Python", content: "[dsa1_4]" },
                { id: "1.5", title: "1.5 โครงสร้างข้อมูลแบบเซต (Set)", mainTitle: "โครงสร้างข้อมูลแบบเซต", subTitle: "(Set Data Structure)", description: "ศึกษาคุณสมบัติ ข้อดี ข้อเสีย และวิธีใช้งาน Set ในภาษา Python", content: "[dsa1_5]" },
                { id: "1.6", title: "1.6 แนวคิดข้อมูลแบบนามธรรม (Abstract Data Type: ADT) ผ่านตัวแปรเหล่านี้", mainTitle: "แนวคิดข้อมูลแบบนามธรรมผ่านตัวแปร", subTitle: "(Abstract Data Type & Variables)", description: "ทำความเข้าใจและวิเคราะห์ Abstract Data Type (ADT) และความแตกต่างระหว่างชนิดข้อมูลพื้นฐาน", content: "[dsa1_6]" }
            ]
        },
        {
            id: 2,
            title: "Unit 2: Stack (สแตก)",
            lessons: [
                { id: "2.1", title: "2.1 ความรู้เบื้องต้นเกี่ยวกับโครงสร้างข้อมูลแบบสแตก", mainTitle: "ความรู้เบื้องต้นเกี่ยวกับ Stack", subTitle: "(Introduction to Stack)", description: "สแตกคืออะไร และหลักการทำงานแบบเข้าหลังออกก่อน (LIFO)", content: "[dsa2_1]" },
                { id: "2.2", title: "2.2 คุณสมบัติและการทำงานพื้นฐานของสแตก (Stack Operations)", mainTitle: "การทำงานพื้นฐานของ Stack", subTitle: "(Stack Operations)", description: "ปฏิบัติการเพิ่มข้อมูล (Push), นำข้อมูลออก (Pop), การดูตัวบนสุด (Peek), ตรวจสอบค่า isEmpty และ isFull", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "2.3", title: "2.3 วิธีการสร้างและการใช้งานสแตกใน Python", mainTitle: "การใช้งาน Stack ใน Python", subTitle: "(Stack in Python)", description: "การสร้าง Stack โดยประยุกต์ใช้ List, collections.deque และ LifoQueue", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "2.4", title: "2.4 ข้อดีและข้อเสียของโครงสร้างข้อมูลแบบสแตก", mainTitle: "ข้อดีและข้อเสียของ Stack", subTitle: "(Stack Pros & Cons)", description: "การประเมินประสิทธิภาพการจัดการหน่วยความจำและปัญหา Stack Overflow", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" }
            ]
        },
        {
            id: 3,
            title: "Unit 3: คิว (Queue)",
            lessons: [
                { id: "3.1", title: "3.1 ความรู้เบื้องต้นเกี่ยวกับโครงสร้างข้อมูลแบบคิว", mainTitle: "ความรู้เบื้องต้นเกี่ยวกับ Queue", subTitle: "(Introduction to Queue)", description: "คิวคืออะไร และหลักการทำงานแบบเข้าก่อนออกก่อน (FIFO)", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "3.2", title: "3.2 คุณสมบัติและการทำงานพื้นฐานของคิว (Queue Operations)", mainTitle: "การทำงานพื้นฐานของ Queue", subTitle: "(Queue Operations)", description: "ปฏิบัติการเพิ่มข้อมูลท้ายคิว (Enqueue), นำออกหน้าคิว (Dequeue), การดูหน้าสุด (Front/Peek)", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "3.3", title: "3.3 วิธีการสร้างและการใช้งานคิวใน Python", mainTitle: "การใช้งาน Queue ใน Python", subTitle: "(Queue in Python)", description: "การสร้าง Queue โดยประยุกต์ใช้ List, collections.deque และ Queue Module", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "3.4", title: "3.4 ข้อดีและข้อเสียของโครงสร้างข้อมูลแบบคิว", mainTitle: "ข้อดีและข้อเสียของ Queue", subTitle: "(Queue Pros & Cons)", description: "การประเมินประสิทธิภาพคิว และปัญหาการขยับตำแหน่งหน่วยความจำเมื่อใช้ List (Array Position Shifting)", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" }
            ]
        },
        {
            id: 4,
            title: "Unit 4: Tree (ต้นไม้)",
            lessons: [
                { id: "4.1", title: "4.1 ความรู้เบื้องต้นเกี่ยวกับโครงสร้างข้อมูลแบบต้นไม้", mainTitle: "ความรู้เบื้องต้นเกี่ยวกับ Tree", subTitle: "(Introduction to Trees)", description: "ต้นไม้คืออะไร ทำไมจึงเป็น Non-Linear และส่วนประกอบสำคัญ Node, Root, Leaf, Edge", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "4.2", title: "4.2 โครงสร้างต้นไม้แบบไบนารี (Binary Tree)", mainTitle: "ต้นไม้ทวิภาค (Binary Tree)", subTitle: "(Binary Tree & BST)", description: "คุณสมบัติ Binary Tree และ Binary Search Tree (BST) ตลอดจนการหาความกว้างความลึก", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "4.3", title: "4.3 วิธีการท่องเข้าไปในต้นไม้ (Tree Traversal)", mainTitle: "การท่องเข้าไปในต้นไม้", subTitle: "(Tree Traversal)", description: "ศึกษาการท่องต้นไม้แบบลึกก่อน (DFS) ทั้งแบบ In-order, Pre-order และ Post-order", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "4.4", title: "4.4 วิธีการสร้างและการใช้งานโครงสร้างต้นไม้ใน Python", mainTitle: "การเขียนโค้ด Tree ใน Python", subTitle: "(Tree Implementation)", description: "การสร้างโครงสร้าง Node และ Tree ด้วย Class และเขียนฟังก์ชัน Search, Insert", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" }
            ]
        },
        {
            id: 5,
            title: "Unit 5: Graph (กราฟ)",
            lessons: [
                { id: "5.1", title: "5.1 ความรู้เบื้องต้นเกี่ยวกับโครงสร้างข้อมูลแบบกราฟ", mainTitle: "ความรู้เบื้องต้นเกี่ยวกับ Graph", subTitle: "(Introduction to Graph)", description: "กราฟคืออะไร คำศัพท์และส่วนประกอบสำคัญ Vertex, Edge, Directed, Undirected, Weighted", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "5.2", title: "5.2 โครงสร้างกราฟแบบระบุทิศทาง (Directed Graph) และกราฟแบบไม่ระบุทิศทาง (Undirected Graph)", mainTitle: "กราฟระบุทิศทางและไม่ระบุทิศทาง", subTitle: "(Directed & Undirected Graph)", description: "ความต่างและการนำไปประยุกต์ใช้งาน ตลอดจนข้อดีข้อจำกัดของกราฟแต่ละประเภท", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "5.3", title: "5.3 การแทนที่กราฟในหน่วยความจำ (Graph Representation)", mainTitle: "การแทนค่ากราฟในหน่วยความจำ", subTitle: "(Graph Representation)", description: "การเก็บกราฟในแรมผ่าน Adjacency Matrix และ Adjacency List", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "5.4", title: "5.4 วิธีการท่องเข้าไปในกราฟ (Graph Traversal)", mainTitle: "การท่องเที่ยวค้นหาในกราฟ", subTitle: "(Graph Traversal)", description: "ศึกษาขั้นตอนการเดินค้นหาโหนดแบบกว้างก่อน (BFS) และเชิงลึกก่อน (DFS)", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "5.5", title: "5.5 การประยุกต์ใช้กราฟในการแก้ปัญหา", mainTitle: "การนำกราฟไปแก้โจทย์ปัญหา", subTitle: "(Graph Applications)", description: "การคำนวณ Shortest Path ด้วย Dijkstra และ Maze Solving", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" }
            ]
        },
        {
            id: 6,
            title: "Unit 6: อัลกอริทึมการจัดเรียงข้อมูล (Sorting Algorithms)",
            lessons: [
                { id: "6.1", title: "6.1 ความรู้เบื้องต้นเกี่ยวกับอัลกอริทึมการจัดเรียงข้อมูล", mainTitle: "ความรู้เบื้องต้นเกี่ยวกับการเรียงลำดับ", subTitle: "(Introduction to Sorting)", description: "ความสำคัญการจัดเรียงข้อมูล และการวัดประสิทธิภาพเชิงวิเคราะห์ด้วย Big O", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "6.2", title: "6.2 อัลกอริทึมการจัดเรียงข้อมูลแบบง่าย (Simple Sorting Algorithms)", mainTitle: "การเรียงลำดับแบบเรียบง่าย", subTitle: "(Simple Sorting)", description: "หลักการทำงานและวิเคราะห์ความเร็วของ Bubble Sort, Selection Sort และ Insertion Sort", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "6.3", title: "6.3 อัลกอริทึมการจัดเรียงข้อมูลแบบประสิทธิภาพสูง (Efficient Sorting Algorithms)", mainTitle: "การเรียงลำดับความเร็วสูง", subTitle: "(Efficient Sorting)", description: "การเรียงข้อมูลด้วยแนวคิด Divide & Conquer ผ่าน Merge Sort, Quick Sort และ Heap Sort", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "6.4", title: "6.4 อัลกอริทึมการจัดเรียงข้อมูลแบบพิเศษ (Special Sorting Algorithms)", mainTitle: "การจัดเรียงข้อมูลแบบพิเศษ", subTitle: "(Special Sorting)", description: "การจัดเรียงข้อมูลแบบนับสะสมและเลขฐานด้วย Counting Sort และ Radix Sort", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" },
                { id: "6.5", title: "6.5 การประยุกต์ใช้และเปรียบเทียบประสิทธิภาพของอัลกอริทึมการจัดเรียงข้อมูล", mainTitle: "การวิเคราะห์เปรียบเทียบผลลัพธ์", subTitle: "(Sorting Applications & Comparison)", description: "การเปรียบเทียบ Big O ในทุกสภาวะ และเกณฑ์การตัดสินใจเลือกใช้งานให้คุ้มค่าฮาร์ดแวร์ที่สุด", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาหัวข้อนี้อยู่ระหว่างการจัดทำโครงสร้างระบบจำลอง</p>" }
            ]
        }
    ]
};

export default dsaCourse;
