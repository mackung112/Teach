# Class Diagram

## 😢 ปัญหา

เวลาที่เราทำงานกับโปรเจคที่มีโครงสร้างขนาดใหญ่ หรื�� ทำงานร่วมกับคนอื่นนั้นก็จะมีบ่อยครั้งที่เราจะต้องเขียนคลาสเพื่อทำงานร่วมกัน และบ่อยครั้งก็จะพบว่าเรากับเพื่อนตกลงกันไว้อย่างนึง แต่ทำออกมาได้อีกอย่างนึงทั้งๆที่คุยกันแล้วว่าจะต้องสร้างอะไรบ้าง แต่ที่ทำไม่ตรงกับที่คุยก็เพราะความเข้าใจในหัวแต่ละคนไม่เหมือนกันยังไงล่ะ แล้วเราจะแก้ปัญหาเหล่านี้ยังไงดี?

## 😄 วิธีแก้ปัญหา

การออกแบบไม่ว่าจะซับซ้อนหรือไม่ซับซ้อนแค่ไหน เราก็สามารถใช้สิ่งที่เรียกว่า **`Class Diagram`** เข้ามาช่วยให้เราและคนอื่นๆในทีมเห็นเป็นภาพเดียวกันได้ง่ายขึ้น โดยการเปลี่ยนคำอธิบายทั้งหมดให้กลายเป็นรูปภาพแทนนั่นเอง ดังนั้นเราจะลองไปดูตัวอย่างกันเลยว่าเจ้า Class Diagram มันใช้ยังไง

{% hint style="info" %}
**แนะนำให้อ่าน**\
บทความนี้เป็นส่วนหนึ่งของคอร์ส [👶 UML พื้นฐาน](https://saladpuk.gitbook.io/learn/basic/uml) หากเพื่อนๆสนใจอยากดูรายละเอียดของ UML แต่ละตัวว่ามันมีอะไรบ้างก็สามารถกดลิงค์ที่ชื่อคอร์สเข้าไปดูได้เลยนะ หรือจะดูหมวดอื่นๆจาก side menu ก็ได้เน่อ
{% endhint %}

## 🤔 Class Diagram ใช้ยังไง?

สมมุติว่าเราต้องเขียนโปรแกรม **Login** ละกัน แล้วเราจะต้องออกแบบยังไงดีนะ? ดังนั้นเราจะลองให้ **ดช.แมวน้ำ** 🧔 เป็นคนไล่โครงสร้างแบบเร็วๆดูละกันนะ

{% hint style="warning" %}
**ข้อแนะนำ**\
จริงๆในการออกแบบเราไม่ควรจะตั้งต้นจาก Class Diagram นะครับ เราควรจะเอา **Scenarios** ขึ้นมาตั้งก่อน แล้วใช้หลักการของ **TDD** เข้ามาช่วยในการออกแบบ ถ้าเพื่อนคนไหนสนใจสามารถไปอ่านตัวอย่าง TDD แบบเร็วๆได้จากลิงค์นี้ [👦 Test-First Design](https://saladpuk.gitbook.io/learn/basic/test-first-design) หรือถ้าอยากรู้จัก TDD แบบเต็มตัวสามารถดูได้จากคอร์สนี้ครับ [👦 Test-Driven Development](https://saladpuk.gitbook.io/learn/software-testing/tdd101)
{% endhint %}

## 😄 ลองเขียน Class Diagram กัน

โดยปรกติเวลาที่เราใช้ UML เราจะไม่เขียนโค้ดแต่เราจะวาดรูปเล่นกันครับ ดังนั้นมาลองไล่ตามสิ่งที��� **ดช.แมวน้ำ** จะวาดรูปให้ดูทีละขั้นตอน เพื่อที่จะมีโครงสร้างของระบบ Login ดูละกันนะ

### 🔥 Class & Field

🧔 สิ่งแรกที่ตัวระบบ Login จะต้องมีเลยก็คือคลาส **LoginRequest** เอาไว้เก็บข้อมูลที่ผู้ใช้จะป้อนเข้ามา เช่น Username กับ Password ดังนั้นเราก็จะวาดรูปแรกกัน

![](/files/-M-iCsE9ut9N8gP2Kaf2)

ด้านบนถ้าเอาไปเขียนโค้ดก็จะเป็นแบบนี้

```csharp
public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}
```

{% hint style="success" %}
**Class & Fields**\
เวลาที่เราเขียนคลาสเราจะวาดรูปกล่องสี่เหลี่ยมและเขียนชื่อคลาสนั้นๆไว้ด้านบนสุด ถัดมาถ้าภายในคลาสมี **data members** ต่างๆก็จะเขียนเอาไว้ในส่วนถัดไ���โดยที่แต่ละ member จะระบุ **data type** ต่อท้ายไว้ด้วย
{% endhint %}

### 🔥 Method & Parameter

🧔 ถัดไปเราก็จะมีคลาสที่เอาไว้ตรวจสอบว่าผลการ Login นั้นผ่านหรือเปล่าซึ่งจะตั้งชื่อคลาสนั้นว่า **LoginHandler** ละกัน และมันจะมี method 1 ตัวชื่อว่า **CheckLogin** ที่จะตรวจว่า ข้อมูลที่ผู้ใช้ส่งมาสามารถ login ได้หรือเปล่า ตามรูปด้านล่างเลย

![](/files/-Lo6DYKQq_6Sd-zsYVIH)

ด้านบนถ้าเอาไปเขียนโค้ดก็จะเป็นแบบนี้

```csharp
public class LoginHandler
{
    public bool CheckLogin(LoginRequest req)
    {
        // โค้ดตรวจสอบผลการเข้าสู่ระบบ
    }
}
```

{% hint style="success" %}
**Methods**\
ในส่วนของ methods ต่างๆเราจะเขียนเอาไว้ใต้พื้นที่ของ data members
{% endhint %}

### 🔥 Visibility

🧔 อ���อเกือบลืมไป มันจะเก็บจำนวนครั้งที่มีคน Login แล้วไม่สำเร็จเอาไว้ด้วยนะ ซึ่งข้อมูลตัวนี้คนอื่นจะดูได้อย่างเดีย�� ดังนั้นวาดรูปเพิ่มอีกนิสสส

![](/files/-Lrneut4s4X1sAqZWI4x)

{% hint style="success" %}
**Visibility**\
ความสามารถในการเข้าถึงต่างๆ เราจะใช้ใช้เครื่องหมายพิเศษเขียนนำหน้าไว้ตามด้านล่างนี้เลย

* **private** ใช้เครื่องหมาย **`-`**
* **protected** ใช้เครื่องหมาย **`#`**
* **package** ใช้เครื่องหมาย **`~`**
* **public** ใช้เครื่องหมาย **`+`**
  {% endhint %}

### 🔥 Composition (ความสัมพันธ์)

🧔 คราวนี้ในการ Login แต่ละครั้งเราจะต้องมีการเก็บบันทึกการเข้าใช้งานผ่านคลาส **LoginLogger** ด้วยนะ วาดๆๆ

![](/files/-Lntpj_Qt9oKL_IElbbs)

ด้านบนถ้าเอาไปเขียนโค้ดก็จะเป็นแบบนี้ (ขอเขียนแค่ตัวที่ถูกเพิ่มเข้าไปนะ)

```csharp
public class LoginHandler
{
    protected LoginLogger log;
    ...
}
```

{% hint style="success" %}
**Composition**\
รูปแบบความสัมพันธ์ตัวนี้จะมีหัวเป็น **Diamon ทึบ** ชี้ไปหาคลาสที่เป็นเจ้าของ object ซึ่งในรูป LoginHandler จะต้องเก็บ object ของคลาส LoginLogger เอาไว้นั่นเอง

**ลักษระความสัมพันแบบ Composition** คือ ถ้า object ที่เป็นเจ้าของถูกทำลายลงไป พวก object ที่เป็นส่วนประกอบทั้งหมดของมันก็จะต้องถูกทำลายตามไปด้วยเช่นกัน **(ตายยกรัง)**
{% endhint %}

### 🔥 **Aggregation** (ความสัมพันธ์)

🧔 อย่าลืมนะว่าในการเขียน Log นั้นมันจะต้องบันทึกลงฐานข้อมูลด้วย ดังนั้นเราก็จะมีคลาสที่ชื่อว่า **SqlDatabase** เอาไว้เชื่อมต่อจัดการกับ Sql database นั่นเอง วาดต่อๆ

![](/files/-LvkERPHtdNrCEKIzocg)

{% hint style="success" %}
**Aggregation**\
รูปแบบความสัมพันธ์ตัวนี้จะมีหัวเป็น **Diamon ธรรมดา** ชี้ไปหาคลาสที่เป็นเจ้าของ object ซึ่งในรูป LoginLogger จะต้องเก็บ object ของคลาส SqlDatabase เอาไว้นั่นเอง

**ลักษระความสัมพันแบบ Aggregation** คือ แม้ว่า object ที่เป็นเจ้าของถูกทำลายลงไป แต่ object ที่เป็น aggregate นั้นจะยังคงอยู่ต่อ **(ตายเดี่ยว)**
{% endhint %}

{% hint style="info" %}
**Composition vs Aggregation**\
ความสัมพันธ์ 2 แบบนี้ถ้าดูแล้วจะคล้ายกันมัน มันแค่ใช้อธิบายถึงความละเอียดอ่อนใน life cycle ของ object พวกนั้นกับตัวคลาสที่เป็นเจ้าของมันหรือที่เราเรียกว่า container ครับ
{% endhint %}

### 🔥 **Generalization (ความสัมพันธ���)**

🧔 อ๋อเกือบลืมไป เรามีการ Login แบบใช้ความปลอดภัยขั้นสูงด้วย โดยนอกจามันจะตรวจการ login แบบปรกติละมันจะยังตรวจเรื่องอื่นๆด้วย ดังนั้นเจ้าตัวนี้มันจะสืบทอดมาจาก **LoginHandler** เพื่อตรวจสอบตามปรกติและทำการตรวจสอบขั้นสูงต่อ ดังนั้นเราก็จะสร้างคลาส **AdvancedLoginHandler** เพิ่มเข้ามาตามมรูปด้านล่างเลย

![](/files/-LnNFbxowQYg7-CUZDd1)

ด้านบนถ้าเอาไปเขียนโค้ดก็จะเป็นแบบนี้

> โค้ดนี้เป็นตัวอย่างที่ไม่ดีนะ เพราะไม่ได้ทำ virtual & override กับให้กับ CheckLogin เอาไว้ เพราะมันไม่ใช่ส่วนที่เราจะสอน

```csharp
public class AdvancedLoginHandler : LoginHandler
{
    ...
    private bool checkFraud(string username)
    {
        // โค้ดตรวจสอบขั้นสูง
    } 
}
```

{% hint style="success" %}
**Generalization**\
เป็นการบอกความสัมพันธ์ระหว่าง **base class** กับ **sub class** โดยมันจะชี้หัวลูกศรไปหาตัวที่เป็น base class
{% endhint %}

### 🔥 Interface class

🧔 ในคราวตัวโปรแกรมของเหลามันอาจจะมีการต่อ database หลายตัวนะ ดังนั้นเราจะต้องเขียน interface class ที่ชื่อว่า **IDatabase** เอาไว้บ้าง ตามรูป

![](/files/-LnPkfWpIjs5YBez-OEp)

🧔 ซึ่งเจ้า IDatabase ตัวนี้เราก็จะให้มันสามารถเขียน log ได้ละกันเลยขอเพิ่ม method เข้าไปให้มันนิดหน่อย

![](/files/-M1lg1dLXnYvn8tHSK5P)

### 🔥 **Realization (ความสัมพันธ์)**

🧔 ถัดไปเราก็จะให้เจ้าคลาส **SqlDatabase** มาทำการ implement เจ้า IDatabase ไปซะ ซึ่งสิ่งนี้เราเรียกมันว่า **Realization** นั่นเอง ตามรูปด้านล่างเลย

![](/files/-LoQIOWVAsyS_I9fivob)

หรือเราจะเขียนย่อๆแบบนี้ก็ได้เหมือนกัน ต่างกันแค่เราต้องกลับไปไล่ดูว่ามันมี members อะไรบ้างใน interface เท่านั้น

![](/files/-LshWVfncA9QqyZe-vl-)

{% hint style="success" %}
**Realization**\
จะมีลักษณะคล้ายกับ Generalization ต่างกันคือเป็นเส้นประ มีไว้บอกว่าคลาสนั้นๆ implement interface อะไร โดยใช้หัวลูกศรชี้ไปยัง interface class ที่มันจะทำการ implement
{% endhint %}

### 🔥 **Abstract class & Method**

🧔 ไหนเราลองเปลี่ยนเจ้า **AdvancedLoginHandler** ให้กลายเป็น **abstract** คลาสหน่อยละกันเพื่อรองรับการ login หลายๆแบบในอนาคต เราก็จะได้ภาพออกมาเป็นประมาณนี้

![](/files/-LpxN8W_eEx92UG0ArKd)

จา��รูปถ้าแปลงเป็นโค้ดจะได้ประมาณนี้

```csharp
public abstract class AdvancedLoginHandler : LoginHandler
{
    public abstract bool ValidateSpecification(string username);
}
```

{% hint style="info" %}
**Abstract class & method**\
ของที่เป็น abstract เราจะใส่ <\<abstract>> ระบุเอาไว้ก็ได้ และเราจะเขียนให้มันเป็นตัวเอียง
{% endhint %}

## 🤔 มีอย่างอื่นอีกไหม ?

ก่อนที่การออกแบบมันจะลงไปทะเลมากกว่าไปนี้ เพราะผมต้องยำความสามารถทุกอย่างลงไป ดังนั้นขอแยกส่วนที่เหลืออกมาไว้ตรงนี้ละกันนะ และขอบอกเลยว่ามันเขียนออกมาเป็นบทความเฉพาะเรื่องนี้ได้อีกเลยล่ะ ดังนั้นผมจะขออธิบายเฉพาะของที่ได้ใช้บ่อยๆก่อนละกันตามด้านล่างเลย

### 🔥 Static member

🧔 ถ้าภายในคลาส์ของเรามีอะไรที่เป็น static member ไม่ว่าจะเป็น field หรือ method ก็ตามก็สามารถใช้แผนภาพอธิบายมันได้เหมือนกันนะ โดยการขีดเส้นใต้มันลงไปนั่นเอง

![](/files/-LoERAJm2Sjb6HxZkUgH)

จากภาพเมื่อแปลงเป็นโค้ดจะเขียนว่า

```csharp
public class Awesome
{
    public static int GlobalMember;
}
```

### 🔥 Association (ความสัมพันธ์)

🧔 ในบางทีเราก็ขี้เกียจอธิบายความสัมพันธ์ว่าเป็นแบบ Aggregation หรือ Composition เราก็สามารถลากเส้นความสัมพันธ์ระหว่างคลาสลงไปได้ดื้อๆเลย เช่น **อาจารย์** จะต้องไปสอนที่ **ห้องเรียน** เราก็สามารถเขียนความสัมพันธ์ของคลาสทั้งสองได้ว่า

![](/files/-LvAHZACEPma7pWg1LNQ)

#### Navigations

🧔 และในบางครั้งเราก็จะเขียนทิศทางเพื่อระบุว่าใครสามารถ navigate ไปหาใครได้บ้างลงไปด้วย เช่น

Teacher **สามารถ navigate ไป** ClassRoom ได้ ส่วน ClassRoom อาจจะทำได้ก็ได้แค่เราไม่ระบุลงไป ตามรูปด้านล่าง

![](/files/-LsZYWYCMDUGIZx1UT60)

ClassRoom **ไม่สามารถ navigate ไป** Teacher ได้ ส่วน Teacher อาจจะทำได้ก็ได้แค่เราไม่ระบุลงไป ตามรูปด้านล่าง

![](/files/-Lpr4XPlLL4BJMz4vho1)

Teacher **สามารถ navigate ไป** ClassRoom ได้ และ ClassRoom **ไม่สามารถ navigate ไป** Teacher ได้ ตามรูปด้านล่าง

![](/files/-Lqpk3PA13ipT2EEy_RE)

ทั้ง Teacher และ ClassRoom **สามารถ navigate หากันได้**

![](/files/-M0cCr__TXz1cn9RI-Gz)

ทั้ง Teacher และ ClassRoom **ไม่สามารถ navigate หากันได้**

![](/files/-LusrCqs_eAdAnloQ52a)

#### Multiplicity

🧔 บนเ���้นความสัมพันธ์เรายังสามารถระบุจำนวนของความสัมพันธ์ลงไปได้ด้วย เช่น อาจารย์จะสอนหรือไม่สอนก็ได้แต่ถ้าสอนต้องห้ามสอนเกิน 4 วิชา ส่วนห้องเรียนต้องมีอาจารย์สอนอย่างน้อย 1 คนเสมอ ก็จะเขียนเป็นแผนภาพได้เป็น

![](/files/-LvAIp_ypzRNvDAvTVu_)

### 🔥 **Dependency (ความสัมพันธ์)**

🧔 ในบางทีคลาสแต่ละคลาสมันอาจเกิด**ความสัมธ์แบบชั่วคราว**เกิดขึ้นก็ได้ เช่น ในตัวอย่างเราจะเห็นว่าคลาส LoginRequest มันถูกส่งเข้ามาเป็น parameter ให้กับ method ของคลาส LoginHandler เพื่อใช้ตรวจสอบว่า login ได้หรือไม่เท่านั้นเองแล้วก็จบไปไม่ได้ยุ่งเกี่ยวกับอีก ดังนั้นเราจะเขียนเป็นแผนภาพได้ว่า

![](/files/-M1lg1datyZJp0roRrfs)

{% hint style="success" %}
**Dependency**\
ความสัมพันธ์แบบชั่วคราวจะคล้ายๆกับ Association เพียงแค่มันเป็นเส้นประ เพื่อบอกว่า**ความสัมพันธ์ที่เกิดขึ้นนี้ไม่ได้ยั่งยืนเดี๋ยวก็แยกทางกัน**
{% endhint %}

## 😄 แผนภาพและโค้ดทั้งหมด

![หากไม่ชัดให้กดที่รูปเพื่อดูเต็มๆได้นะ](/files/-LpMn_gWnDMV-mqYOU1J)

{% tabs %}
{% tab title="LoginRequest" %}

```csharp
public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}
```

{% endtab %}

{% tab title="LoginHandler" %}

```csharp
public class LoginHandler
{
    protected Logger log;
    private int loggedInFailureCount;

    public virtual bool CheckLogin(LoginRequest req)
    {
        // โค้ดตรวจสอบผลการเข้าสู่ระบบ
    }

    public int LoggedInFailureCount()
    {
        return loggedInFailureCount;
    }
}
```

{% endtab %}

{% tab title="AdvancedLoginHandler" %}

```csharp
public abstract class AdvancedLoginHandler : LoginHandler
{
    public override bool CheckLogin(LoginRequest req)
    {
        return base.CheckLogin(req) && ValidateSpecification(req.Username);
    }

    public abstract bool ValidateSpecification(string username);
}
```

{% endtab %}

{% tab title="LoginLogger" %}

```csharp
public class LoginLogger
{
    private SqlDatabase sqlDb;

    public void LoginSuccess(string username, DateTime timeStamp)
    {
        sqlDb.InsertLoginLog(username, timeStamp);
    }
}
```

{% endtab %}

{% tab title="IDatabase" %}

```csharp
public interface IDatabase
{
    void InsertLoginLog(string username, DateTime timeStamp);
}
```

{% endtab %}

{% tab title="SqlDatabase" %}

```csharp
public class SqlDatabase : IDatabase
{
    public void InsertLoginLog(string username, DateTime timeStamp)
    {
        // Insert เข้าฐานข้อมูล
    }
}
```

{% endtab %}
{% endtabs %}

## 🎯 บทสรุป

เราสามารถใช้แผนภาพเพื่ออธิบายโครงสร้างและความสัมพันธ์ของคลาสต่างๆในระบบได้ ซึ่งม���นจะทำให้ Developer สามารถทำงานร่วมกันได้ง่ายขึ้น และ เราสามารถแก้ไข design ได้ตั้งแต่ขั้นตอนออกแบบเลยโดยไม่ต้องรอให้มันลงไปในระดับโค้ดก่อนเสียด้วย

{% hint style="success" %}
**ข้อแนะนำ**\
การใช้แผนภาพ Class Diagram เราไม่จำเป็นที่จะต้องเขียนลงรายละเอียดถี่ยิบว่ามันเป็นความสัมพันธ์กันแบบไหนเช่นเป็น aggregation หรือ composition บลาๆ เพราะมันจะเปลืองแรงการทำงานเกินไป ควรรีบคุยให้เข้าใจตรงกันแล้วแยกยายไปทำงานต่อก็พอ ยกเว้นเราจะเขียน diagram เพื่อเอาไปทำเป็น Document ส่งงานที่ต้องเขียนเป็นทางการ
{% endhint %}

{% hint style="danger" %}
**คำเตือน 1**\
การใช้ Diagram **��วรใช้แค่ให้ทีมสามารถเข้าใจและทำงานร่วมกันได้เพียงเท่านั้นก็พอ** เพราะสุดท้าย diagram มันก็คือ diagram มันไม่ใช่การทำงานจริงๆของโค้ดเรา เมื่อไหร่ที่ลืมอัพเดท diagram เราก็อาจจะทำงานแล้วหลงทางไปเลยก็ได้
{% endhint %}

{% hint style="danger" %}
**คำเตือน 2**\
การออกแบบที่ดีไม่ควรจะเริ่มต้นจาก Diagram แต่ควรเริ่มต้นจาก scenario แล้วตามด้วยการเขียนเทส เพื่อ drive design ต่างหาก หากเริ่มต้นเขียนจาก diagram มันจะทำให้ดูเหมือนเท่ห์แต่สุดท้ายมันจะกลายเป็น สปาเก็ตตี้โค้ดที่ทำให้โครงสร้างของโปรแกรมมันซับซ้อนโดยใช่เหตุ ดังนั้นเพื่อป้องกันปัญหาที่ว่ามา เพื่อนสามารศึกษาเพิ่มเติมได้จากลิงค์นี้ [👦 Test-First Design](https://saladpuk.gitbook.io/learn/basic/test-first-design) หรือถ้าอยากรู้จัก TDD แบบเต็มตัวสามารถดูได้จากคอร์สนี้ครับ [👦 Test-Driven Development](https://saladpuk.gitbook.io/learn/software-testing/tdd101)
{% endhint %}
