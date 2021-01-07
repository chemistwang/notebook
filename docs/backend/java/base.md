# 语言基础



### 1. java程序运行的两个阶段

- 编译阶段

> 编译阶段主要检查java源程序是否符合java语法，符合则能够生成正常字节码文件，不符合则无法生成
> 一个java源文件可以编译生成多个.class文件

- 运行阶段

> java命令会启动java虚拟机（JVM），JVM会启动类加载器classLoader
> classLoader会去硬盘搜索class文件并装载到JVM中
> JVM将class字节码文件解释成二进制并执行
> 操作系统执行二进制和底层硬件平台进行交互


### 2. JDK JRE JVM

- jdk  开发环境
- jre 运行环境
- jvm 虚拟机







# Java

### 一、语言特点

```
- 1. 面向对象（类，对象），封装，继承，多态
- 2. 健壮性
- 3. 跨平台
```
> JDK => JRE => JVM

### 1.数据类型转化
- 自动转换（隐式）：数据类型从小到大
- 强制转换（显式）：不推荐，可能发生精度损失，数据溢出

> byte/short/char这三种类型在运算的时候，都先被提升为int类型，再进行计算
> byte/short/char,若右侧赋值数值没有超过返回，则javac编译器会自动隐含补上(byte)(short)(char),
> boolean类型不能发生数据类型转换

### 2.数据运算
> ASCII
> Unicode码表
> 赋值运算符隐含强制类型转换 (byte a = a + 5)
> 三目运算符注意数据类型要求
> 三元运算符结果必须被使用

### 3.JShell脚本工具

### 4.switch
> switch后面的小括号只能是下列数据类型：
基本数据类型：byte、short、char、int
引用数据类型：String、enum枚举
> switch语句前后顺序可以颠倒，匹配哪一个case就从哪一个位置向下执行，直到break或者整体结束为止

### 5. 项目层次
- 项目 project
- 模块 module
- 包 package

### 6. 方法
- 方法定义在类中，不能在方法中再定义方法
- 参数个数不同，参数类型不同，参数多类型顺序
- 跟方法返回值无关

### 7. 数组 Array

- 引用数据类型，其元素既可以是基本数据类型，也可以是引用数据类型
- 数组有序排列
- 创建数组对象，会在内存中开辟一整块连续空间
- 数组多个数据，类型必须统一
- 数组长度在程序运行期间不可改变
- 分类: 
    - 按维度： 一维数组，二维数组...
    - 按数组元素：基本数据类型元素数组，引用数据类型元素数组

- 一维数组
    - 声明初始化
    
    ```
    int[] idList = new int[]{1,2,3,4,5}; //静态初始化，声明和元素的赋值同时进行
    String[] nameList = new String[10]; //动态初始化
    ```

    - 调用指定位置元素  （下标）
    - 数组长度 `length`
    - 遍历数组 `for`
    - 数组元素默认初始化值 

    ```
    byte short int long 0
    float double 0.0
    char 空
    boolean false
    String null
    ```
    
-  二维数组
    - 声明初始化
    
    ```
    int[][] idList = new int[][]{{1,2,3},{2,4},{6}}; //静态初始化
    int[][] idList = new int[1][3];
    int[][] idList = new int[1][]; 
    ```
      
    - 数组元素默认初始化值 
    
    ```
    外层是一个地址值，内层对应相应的类型
    int[][] idList = new int[1][];
    idList[0] //null 没有指定具体的引用类型，默认为null
    idList[0][0] //选择具体下标会报空指针异常,因为外层没有指针指向
    ```
    
    - 内存解析
      
- 数据结构

```
1. 数据与数据之间的逻辑关系：集合，一对一，一对多，多对多
2. 数据的存储结构：
        线性表（一对一）：顺序表（eg：数组），链表，栈（先进后出，只有一个口），队列（先进先出，有两个口）
        树形结构（一对多）：二叉树
        图形结构（多对多）
```
    
- 算法
    
```
排序，搜索
```

- 数组中涉及常见算法

```
1. 数组元素赋值（杨辉三角，回形数）
2. 数值型数组中元素最大值，最小值，平均数，总和等
3. 数组的复制，反转，查找（线性查找：遍历循环，二分法查找：前提所要查找的数组必须有序，）
4. 数组元素排序算法

> 通常来说，排序的目的是快速查找
> 衡量排序算法的优劣：
> a。时间复杂度（高效率）=》分析关键字的比较次数和记录的移动次数
> b。空间复杂度（低存储）=》分析排序算法中需要多少辅助内存
> c。稳定性 =》 若两个记录A和B关键字值相等，但排序后A，B次序保持不变，则成这种算法稳定
> 
> 排序算法分类：内部排序 + 外部排序
> 内部排序：整个排序过程不需要借助外部存储器（eg：磁盘），所有排序操作都在内存中完成
> 外部排序：参与排序的数据非常多，数据量非常大，计算机无法把整个排序过程放在内存中完成，必须借助于外部存储器（eg：磁盘）。外部排序最常见的是多路归并排序，可以认为外部排序是由多次内部排序组成。
> 
> 十大内部排序算法
> a. 选择排序：直接选择排序，堆排序
> b. 交换排序：**冒泡排序，快速排序**
> c. 插入排序：直接插入排序，折半插入排序，shell排序
> d. 归并排序
> e. 桶式排序
> f. 基数排序
```

- 算法

```
算法5大特征
1. 输入（input）：有0个或多个输入数据，这些输入必须有清楚的描述和定义
2. 输出（output）：至少有1个或多个输出结果，不能没有输出结果
3. 有穷性（有限性，Finiteness）：算法在优先的步骤之后会自动结束而不会无限循环，并且每一个步骤都可以在可接受的时间内完成
4. 确定性（明确性，Definiteness）：算法中的每一步都有确定的含义，不会出现二义性
5. 可行性（有效性，Effectiveness）：算法的每一步都是清楚而且可行，能让用户用纸笔计算而求出答案
```

## 数组工具类

java.util.Arrays

```
boolean equals(int[] a,int[] b) //判断两个数组是否相等
String toString(int[] a) //输出数组信息
void fill(int[] a, int val) //将指定值填充到数组中
void sort(int[] a) //对数组进行排序
int binarySearch(int[] a,int key) //对排序后的数组进行二分法检索指定的值
```

## 数组常见异常

```
ArrayIndexOutOfBoundsException //数组角标越界异常
NullPointerException //空指针异常
```

## JVM（内存解析）

```
stack: 栈,通常指虚拟机栈，存放局部变量
heap: 堆,存放new出来的结构，对象、数组，对象的属性（非static）加载到堆空间中
方法区: 类的加载信息，常量池 + 静态域（static）
```


## 面向对象

> POP（面向过程） & OOP（面向对象）
> POP：强调功能行为，以函数为最小单位，考虑怎么做
> OOP：强调具备功能对象，以类/对象为最小单位，考虑谁去做

> OOP更加强调运用人类在日常的思维逻辑中采用的思想方法与原则，eg，抽象，分类，继承，聚合，多态等
> OOP设计的重点是类的设计

> OOP思想概述
> 程序员从面向过程的`执行者`转化为面向对象的`指挥者`
> OOP分析方法分析问题的思路和步骤：
> - 根据问题需要，选择问题所针对的现实世界中的实体
> - 抽象出类
> - 用计算机语言实现类
> - 将类实例化对象


- 1. java类及类的成员（属性，方法，构造器，代码块，内部类）

```
======== 属性（成员变量） VS 局部变量 ========
- 相同点
> 定义格式相同
> 先声明后使用
> 变量都有对应的作用域

- 不同点
> 类中声明位置不同：属性直接定义在类中；
                 局部变量声明在方法内，方法形参，代码块内，构造器形参，构造器内部变量
> 权限修饰符：属性可以在声明时，使用权限修饰符（private，public，缺省，protected）;
            局部不能使用  
> 默认初始化值: 属性根据其类型，都有默认初始化值；
>             局部没有，调用之前一定要显式赋值
> 内存中加载位置：属性加载到堆（heap）空间中（非static）；
>              局部加载到栈（stack）中
```

```
======== 方法 ========
方法的使用中，可以调用当前类的属性或方法;
方法中不可以再定义方法
```

```
======== 构造器 （constructor）========
作用：创建对象;初始化对象的属性
> 若没有显式的定义类的构造器，则系统默认提供一个空参的构造器 eg: Person(){}
> 一个类中定义的多个构造器，彼此构成重载
> 若显式定义了构造器，系统就不再提供默认的空参构造器
> 一个类中至少会有一个构造器
> 构造器的权限跟类的权限是相同的
```


- 2. 面向对象的三大特征（封装性，继承性，多态性）

```
封装性（高内聚，低耦合）=》权限修饰符
> 隐藏对象内部的复杂性，只对外公开简单的接口，便于外界调用，从而提高系统的可扩展性，可维护性。
```


- 3. 其他关键字（this，super，static，final，abstract，interface，package，import）


## 重载

- 1. 概念

在同一个类中，允许存在一个以上的同名方法，只要它们的参数个数或者参数类型不同即可

- 2. 特点

与返回值无关，只看参数列表，且参数列表必须不同

- 3. 可变个数形参

``` java
JDK5.0 新增

格式：数据类型 ... 变量名

eg: public void mOL(String ...strings ) {} //5.0+
    mOL("a","b","c")
    public void mOL(String[] args) {} //<5.0
    mOL(new String[]{"a","b","c"})
    > 上面两者不兼容

> 可变形参，必须声明在参数末尾
> 最多只能声明一个可变形参
> 与形参类型相同的数组之间不构成重载
```

- 4. 值传递

```
值传递： 若参数是基本数据类型，则实参赋给形参的是实参真实存储的数据值
        若-----引用-----------------------------------地址值
```


- 5.面试点

``` java
int[] arr1 = new int[10];
System.out.println(arr1); //输出地址值

char[] arr2 = new char[]{'a','b','c'};
System.out.println(arr2); //输出的abc，该方法对于char类型重载，遍历了整个char数组
```

## 权限修饰符（置于类成员定义前）

| 修饰符  | 类内部 | 同一个包 | 不同包的子类 | 同一个工程 |
| --- | --- | --- | --- | --- |
| private | Y |  |  |  |
| 缺省 | Y | Y |  |  |
| protected | Y | Y | Y |  |
| public | Y | Y | Y | Y |


> 权限修饰符可以修饰类及类的内部结构：属性，方法，构造器，内部类
> 对于class权限修饰只能用public（可以在任意地方访问）和缺省（被同一个包内部的类访问）

## JavaBean

- JavaBean是一种java语言写成的可重用组件
- 所谓javabean，是指符合如下标准的java类
> 类是公共的
> 有一个无参的公共的构造器
> 有属性，且有对应的get，set方法

## UML类图

```
若方法有下划线表示为构造器
+ 表示public类型
- 表示private类型
# 表示protected类型
```

## 关键字this/package/import

- this

```
- 在方法内部使用，即这个方法所属对象的引用
- 在构造器内部使用，表示该构造器正在初始化的对象
- 在构造器中，可以显示用`this(形参列表...)`方式，调用本类中指定的其他构造器，不能调用自己
- 若一个类中有`n`个构造器，则最多有`n-1`构造器中使用了`this(形参列表)`
- `this(形参列表...)`必须声明在首行，故最多声明一个
```

- package

```
- 为了更好的实现项目中类的管理，提供包的概念
- 使用package声明类或接口所属的包，声明在源文件的首行
- 包属于标识符，遵循标识符的命名规则，见名知意
- 中间有一个`.`，就代表一层文件目录
- 同一个包下，不能命名同名的接口、类
```

- jdk主要包介绍

```
java.lang => java核心类.eg:String,Math,Integer,System,Thread
java.net => 执行与网络相关的操作的类和接口
java.io => 多种输入、输出功能的类
java.util => 包含实用工具类，eg：定义系统特性，接口的集合框架，实用与日期日历相关函数
java.text => java格式化相关
java.sql => JDBC
java.awt => b/s c/s
```

- import

```
- 为了实用不同包中的java类，需要用import语句来引入指定包层次下所需的类或全部类（.*）
- import语句告诉编译器到哪里寻找类 
- 若使用的类或接口在java.lang下定义的，则可以省略import(eg: System.out)
- 若实用的类或接口在本包下定义的，则可以省略import结构
- 若使用了不同包下同名的类，则必须至少有一个类需要使用全类名方式显示（eg：com.wyl.java.Customer()）
- 使用`xxx.*`方式表明可以调用xxx包下所有，但如果使用xxx的子包，则仍需要显式导入
- `import static java.lang.system.*`, 导入指定类或接口中的静态属性或方法（用的较少）
```

## 继承

- 1. 优点

```
> 减少代码冗余，提高代码复用
> 为之后多态性使用，提供前提
> 继承之后，子类就获取父类声明的属性 + 方法
> 继承之后，可以声明自己特有的属性 + 方法，便于功能扩展
> 特别的，父类中声明为private的属性和方法，子类仍然继承，因为封装性影响，子类不能直接调用而已
```

- 2. 格式

```
class A extends B{}
A: 子类，派生类，subclass
B: 父类，超类，基类，superclass
```

- 注意点

```
> 只支持单继承和多层继承，不允许多重继承
> 一个类只能有一个父类（单继承性）（c++允许多继承）
> 直接父类：子类直接继承的父类
> 间接父类：间接继承的父类
> 子类继承父类之后，就获取了直接父类以及所有间接父类中声明的属性和方法
> 若没有显式声明一个类的父类，则此类继承于java.lang.Object类
```

## 重写（override/overwrite）

- 1. 定义

```
在子类中对父类中继承的方法进行改造，程序执行时，子类方法将彻底覆盖父类方法
```

- 2. 要求

```
> 重写的方法，方法名和形参列表相同
> 子类重写的方法权限修饰符 不能小于 父类被重写方法的权限修饰符
> 若父类方法权限为private，则子类相同方法不认为重写
> 父类返回值为void，子类要重写只能是void
> 父类返回值为A类型，子类返回值是A类型或A类的子类
> 父类返回值为基本数据类型，子类返回值必须是相同基本数据类型
> 子类抛出异常类型 不能大于 父类抛出异常类型
> 子类和父类同名参数方法要么都声明为static（不是重写），要么都声明为非static（重写的前提）
```

## super

- 调用方法/属性

```
> 在子类方法或构造器中，用`super.FIELD`或`super.METHOD`显式调用父类中声明的属性或方法，通常省略
> 特殊的，子父类有同名属性/方法，调用父类属性时，必须用super显式调用（一层一层向上找）
```

- 构造器

```
> 在子类构造器中，显式使用`super(形参列表)`，调用父类中声明的指定构造器
> `super(形参列表)`，必须放在子类构造器首行
> 在类的构造器中，`super(形参列表)`和`this(形参列表)`，只能二选一，不能同时使用
> 在构造器首行，默认调用父类中 `super()`
> 在类的多个构造器中，至少有一个类的构造器中使用了`super(形参列表)`,调用父类中的构造器
```

- 子类对象实例化全过程

```
> 结果上看，子类继承父类以后，获取了父类中声明的属性或方法；创建子类对象，在堆空间中，就会加载所有父类中声明的属性
> 过程上看，通过子类构造器创建子类对象时，一定会直接或间接调用其父类的构造器，直到调用了java.lang.Object类中空参的构造器为止
```

## 多态性（运行时的行为，不是编译时的行为）

- 定义

```
父类的引用指向子类的对象
class A {}
class B extends A {}
A test = new B();
编译的时候看A，运行的时候看B（又称为：虚拟方法的调用）
```

- 使用前提

```
1. 类的继承关系
2. 方法的重写（只能调用父类的方法，不能调用子类特有方法，因为编译时是父类型，不识别子类）
3. **多态性只适用于方法，不适用于属性**
```

- `instanceof`关键字

```
1. 前提：有了多态以后，内存中实际加载了子类特有的属性和方法，由于变量声明为父类类型，导致编译时，只能调用父类中声明的属性和方法，子类特有的属性和方法不能调用。
2. 如何调用子类特有属性和方法：
> 使用强制类型转化符 eg:B b = (A) test;
> a instanceof A  //判断对象a是否是类A的实例,为了出现强转时的异常ClassCastException，先进行instanceof判断
> a instanceof A == true，则A的父类也一定为true
```

- 比较

```
                    强制类型转化
较高级的基本数据类型 ============> 较低级的基本数据类型
                  <============  
                    自动类型提升
                    
                   向下转型，使用instanceof进行判断
父类               ============> 子类
                  <============
                  向上转型（多态）
```

- 练习

```
Man/Woman 均为 Person 的子类

- 编译过，运行不过
Person p = new Woman();
Man m = (Man)p;
-----------------------
Person p = new Person(); //注意: new的是Person
Man m = (Man)p; 

- 编译过，运行过
Object obj = new Woman();
Person p = (Person)obj;

- 编译不过
Man m = new Woman();
```

## 面试题

``` java
public class Interview {
	public static void main(String[] args) {
		Base base = new Sub();
		base.add(1,2,3); //sub1 
		Sub s = (Sub)base;
		s.add(1, 2, 3); //sub2
	}
}

class Base{
	public void add(int a, int... arr) {
		System.out.println("base");
	}
}

class Sub extends Base{	
	public void add(int a,int[] arr) {
		System.out.println("sub1");
	}	
	public void add(int a,int b,int c) {
		System.out.println("sub2");
	}
}
```

## Object类（是所有java类的根父类）

- 属性 （无）
- 方法

``` java

=============== equals() ===============
# == 运算符
# 1. 可以使用在基本数据类型和引用数据类型变量中
# 2. 若比较基本数据类型，则两个变量数据是否相等（不一定类型相同）
# 3. 若--- 引用----------------地址
# equals()
# 1. 是方法，而不是运算符,只适用于引用数据类型
# 2. Object中的 `equals()` 与 `==` 一致
# 3. String,Date,File,包装类都重写了Object的equals()方法，此时比较的不是引用地址是否相同，而是两个对象的”实体内容“是否相同
# 4. 通常情况，自定义类使用equals()时，也通常比较两个对象”实体内容“是否相同，所以需要重写

String s1 = "xxx";
String s2 = "xxx";
s1 == s2; //true => 变量此时在常量池中
String s3 = new String("xxx");
String s4 = new String("xxx");
s3 == s4; //false;

=============== toString() ===============
# String,Date,File,包装类都重写了toString()方法，返回”实体内容“


=============== getClass() ===============
=============== hashCode() ===============
=============== clone() ===============
=============== finalize() ===============
=============== wait() ===============
=============== notify() ===============
=============== notifyAll() ===============
```


## Junit（单元测试）

- 步骤

```
1. 选中当前工程，右键build path => add libraries => Junit 4 => finish
2. 创建测试类：必须public + 提供公共的无参构造器
3. 声明测试方法：必须public + void + 无形参
4. @Test + import org.junit.Test;
5. 写完测试方法后，双击方法名，右键 run as => Junit Test
6. 绿色 =》正常，红色 =》异常
```

## 包装类（wrapper）

> 针对8种基本数据类型定义相应的引用类型 =》 包装类（封装类）、
> 让基本数据类型有了类的特点，真正面向对象

| 基本数据类型 | 包装类 | 父类
| --- | --- | --- |
| byte | Byte | Number |
| short | Short | Number |
| int | Integer | Number |
| long | Long | Number |
| float | Float | Number |
| double | Double | Number |
| boolean | Boolean | -- |
| char | Character | -- |


> 基本数据类型，wrapper，String类之间转换

```
基本数据类型 => wrapper （调用wrapper的构造器）
wrapper => 基本数据类型（调用xxxValue()）
自动装箱、自动拆箱
String类 => 基本数据类型、wrapper（调用包装类parseXXX）
基本数据类型、wrapper => String类 （调用valueOf(xxx)）
```

## static

- 修饰属性，方法，代码块，内部类；不能修饰构造器
- 修饰属性：静态属性（共享属性）（类变量） + 非静态属性（实例变量）
- 一些说明
    > static随着类的加载而加载，可以通过”类.静态变量“的方式进行调用
    > 早于对象的创建
    > 由于类只会加载一次，则静态变量的内存中也会存在一份，存在方法区的静态域中
- 举例
    > System.out Math.PI
    
- 修饰方法：（跟生命周期一致）静态方法（只能调用静态方法或属性） + 非静态方法（都可以调用）
- 一些说明
    > 静态方法中，不能使用this,super关键字
    
- 开发中确定static
    > 属性：共享的
    > 类中的常量也常常声明为static
    > 方法：操作static属性 + 工具类

## 设计模式

- 概念

大量实践中总结和理论化之后优选的代码结构，编程风格，解决问题的思考方式

- 单例(eg: Class Runtime)

```
> 只能存在一个对象实例，减少系统性能开销
> 将累的构造器访问权限设置为private
> 调用该类的某个静态方法以返回类内部创建的对象
> 静态方法只能访问类中静态成员变量
```

```java
//饿汉式
//优点：线程安全
//缺点：对象加载时间过长
class Bank{
    private Bank(){
    }
    private static Bank instance = new Bank();
    public static Bank getInstance(){
        return instance;
    }
}
//懒汉式
//优点：延迟对象的创建
//缺点：线程不安全 ==》多线程内容再次修改
class Order{
    private Order(){
    }
    private static Order instance = null;
    public static Order getInstance(){
        if (instance == null){
            instance = new Order();
        }
        return instance;
    }
}

class Ticket{
    private Ticket(){}

    private static Ticket instance = null;

    public static synchronized Ticket getInstance(){
        if (instance == null){
            instance = new Ticket();
        }
        return instance;
    }
}

class Market{
    private Market(){};

    private  static Market instance = null;

    public static Market getInstance(){
        //方法一：效率稍差
//        synchronized (Market.class) {
//            if (instance == null) {
//                instance = new Market();
//            }
//            return instance;
//        }

        //方法二：效率稍高
        if (instance == null) {
            synchronized (Market.class){
                if (instance == null){
                    instance = new Market();
                }
            }
        }
        return instance;
    }
}
```

```
应用场景
> 网站计数器，单例模式，否则难以同步
> 应用程序日志应用
> 数据库连接池
> 项目中读取配置文件类
> Application
```

## 代码块

1. 作用： 用来初始化类、对象
2. 只能用static修饰
3. 分类：static vs 非static

```
static代码块
- 内部可以有输出语句
- 随着类的加载而执行，并且只执行一次
- 若类中定义多个static代码块，则按照声明的先后顺序执行
- static执行优先于非static代码块
- 只能调用static属性、方法

非static代码块
- 内部可以有输出语句
- 随着对象的创建而执行，每次创建都执行
- 创建对象时，可以初始化属性
- 若类中定义多个非static代码块，则按照声明的先后顺序执行
- 既可以调用static属性、方法，也能调用非static属性、方法
```    

```
属性赋值前后顺序
- 1. 默认初始化
- 2. 显式初始化
- 3. 在代码块中赋值(若代码块写在初始化之前，则结果颠倒)
- 4. 构造器中初始化
- 5. 实例化之后，通过属性，方法赋值
```

## final

```
1. 可以修饰的结构： 
    > 类: 此类不能被继承（eg：String类，System类，StringBuffer类）
    > 方法: 此方法不能被重写（eg：Object类中的getClass()）
    > 变量: 此时变量就称为常量
2. 注意点：
    > 修饰属性时需要显式初始化，代码块中初始化，构造器中初始化
    > 修饰局部变量时，赋值不可改变
    > static final 修饰属性（全局常量）,方法
```

## abstract

```
1. 定义：抽象
2. 可以修饰的结构：
    > 类: 此类不能实例化,让子类实例化，提供构造器以便子类使用
    > 方法: 只有声明，没有方法体，其所在的类一定是抽象类,子类需要重写，若不重写，则此子类也一定是一个抽象类
3. 注意点:
    > 不能修饰 属性，构造器
    > 不能修饰 私有方法（不能被重写），静态方法（不认为是重写），final方法（不能被重写），final类（不能被继承）
4. 应用（模板方法的设计模式）
```

## interface

```
> java不支持多重继承，有了接口，可以实现多重继承的效果,弥补了单继承的局限性
> 继承是`是不是`的关系，接口是`能不能`的关系
> 接口的本质是契约，标准，规范
> interface 和 class 是并列关系
> **定义**：
    - <= JDK7 全局常量（public static final,但是书写可以省略已表示公认默许）+ 抽象方法（public abstract,同样可以再书写时省略）
    - >= JDK8 全局常量 + 抽象方法 + 静态方法（只能通过接口调用）+ 默认方法（通过实现类调用；若重写，则调用重写方法）
    - 若父类和接口有同名方法，并且子类没有重写，调用父类方法
    - 若实现类实现多个接口，多个接口有重名方法，若实现类没有重写，则报错（接口冲突）
> 不能定义构造器，故接口不能实例化
> 接口通过类实现（implements）来使用,故需要重写抽象方法或者称为抽象类
> class AA extends BB implements CC,DD,EE
> 接口和接口之间可以继承，并且可以多继承
> 接口的具体使用，体现多态性
> 接口主要用途是被实现类实现（面向接口编程）
```

```
抽象类与接口有哪些异同
```


- 代理模式（Proxy）：为其他对象提供一种代理以控制对这个对象的访问

```
应用场景：
> 安全代理：屏蔽对真实角色的直接访问
> 远程代理：通过代理类处理远程方法调用（RMI）
> 延迟加载：先加载轻量级的代理对象，真正需要再加载真实对象
分类：
> 静态代理（静态定义代理类）
> 动态代理（动态生成代理类，JDK自带，需要反射知识）
```

## 内部类

- 定义：声明在一个类中
- 分类：成员内部类 (static, 非static)vs  局部内部类（方法内，代码块内，构造器内）
- 注意点：

```
1. 如何实例化成员内部类对象

//静态实例
Outer.Inner inner = new Outer.Inner();
inner.foo();
//非静态实例
Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();
inner.foo();

2. 如何在成员内部类中区分调用外部类的结构

Outer.this.method()；

3. 开发中局部内部类的使用

```

## 异常

- 不能靠代码避免（eg：客户输入数据格式，读取文件是否存在，网络是否通畅...）
- 分类：Error + Exception
- 异常体系结构

```
java.lang.Throwable
    | ----java.lang.Error（jvm无法解决的严重问题，一般不编写针对性代码进行处理）
    eg:
    public static void main(String[] args) {
        // 栈溢出 =》java.lang.StackOverflowError
        main(args);
        // 堆溢出 =》java.lang.OutOfMemoryError
        Integer[] arr = new Integer[1024*1024*1024];
    } 
    | ----java.lang.Exception
        | ----- 编译时异常（checked）
            |--- IOException
                |--- FileNotFoundException
            |--- ClassNotFoundException
        | ----- 运行时异常（unchecked）
            |--- NullPointerException
            |--- ArrayIndexOutOfBoundsException
            |--- ClassCastException
            |--- NumberFormatException
            |--- InputMismatchException
            |--- ArithmaticException  
```

- 异常处理方式

```
1. try-catch-finally
2. throws + 异常类型
```

- 抓抛模型

```****
> ”抛“：程序一旦出现异常，会在异常代码处生成一个对应异常的对象，并将此对象抛出（程序终止运行，后面代码不再运行）
    //关于异常对象的产生：
    //  - 系统自动生成异常对象
    //  - 手动生成一个异常对象，并抛出（throws）eg: 方法内 throw new Exception("xxxx")

> ”抓“：异常处理
> |--- try-catch-finally
    try {} catch(类型 变量){} catch(类型 变量){} ...
    finally{//一定执行}
    //根据异常对象类型在catch中进行匹配，一旦执行完成，跳出try-catch结构
    //catch中异常类型若没有子父类关系，则声明的上下顺序无所谓
    //-----------------有--------，则子类一定要在父类之上，否则报错
    //try-catch-finally可以嵌套
    //常用方法：String getMessage() +  printStackTrace()
    //finally一定会执行，即使try-catch中有return语句
    //finally使用场景：数据库连接，输入输出流，网络编程socket等资源，JVM是不能自动回收的，需要手动进行资源的释放，需要声明在finally中
    //使用try-catch-finally处理编译时异常，编译不再报错，运行仍可能报错，相当于延迟到运行时出现
    //开发中，运行时异常比较常见，所以通常不针对运行时异常写try-catch-finally,针对编译时异常，一定要考虑异常处理
> |--- throws
    //throws + 异常类型 写在方法的声明处，指明此方法执行时，可能会抛出异常类型，一旦方法体执行时，出现异常，仍会在异常代码生成一个异常类对象，此对象满足throws后异常类型，就会被抛出
    //try-catch-finally 真正将异常处理掉
    //throws只是将异常抛给方法调用者，并没有真正将异常处理
```

- 注意点

```
子类重写的方法抛出的异常类型不大于父类被重写的方法抛出的异常;
开发中使用哪种处理方式
    - 若父类没有throws处理异常，则子类重写不能使用throws，若有异常，必须使用try-catch-finally
    - 执行的方法A中，先后调用另外几个方法，这几个方法是递进关系执行，建议这几个方法使用throw处理，而A方法考虑使用try-catch-finally

```

- 自定义异常

```
如何定义：
1. 继承现有异常结构：RuntimeException，Exception
2. 提供全局常量：serialVersionUID
3. 提供重载的构造器
```

## idea

project / module

## 多线程

- 程序，线程，进程

```
程序（program）：某种语言编写的一组指令的集合
进程（process）：程序的一次执行过程，存在生命周期
线程（thread）：进程进一步细化为线程，一个程序内部的一条执行路径；每个线程拥有独立的运行栈和程序计数器，线程切换的开销小；但多个线程操作共享的系统资源可能会带来安全隐患。
```

```
多线程优点 
1. 提高应用程序响应，对图形化界面更有意义，可以增强用户体验
2. 提高计算机系统CPU利用率
3. 改善程序结构，将即长又复杂的进程分为多个线程，独立运行，利于理解和修改
```

```
应用场景
1. 程序需要同时执行两个或多个任务
2. 程序需要实现一些需要等待的任务，eg：用户输入，文件读写，网络操作，搜索...
3. 需要一些后台运行的程序
```

- 线程创建和使用

 方法1：继承与thread类（创建Thread类的匿名子类方法）
 1. 创建一个继承于Thread类的子类
 2. 重写run()方法
 3. 创建子类对象
 4. 调用start()方法

 > 不能直接调用run()启动线程
 > 不能让已经start()的线程再次执行，会报错IllegalThreadStateException，需要重新创建

 方法2：实现Runnable接口
 1. 创建一个实现了Runnable接口的类
 2. 实现类去实现Runnable中的抽象方法，run()
 3. 创建实现类的对象
 4. 将此对象作为参数传递到Thread类的构造器中，创建Thread类的对象
 5. 通过Thread类的对象调用start()
 
 对比：
 开发中优先选择**实现Runnable接口**
    > 实现的方式没有类的单继承性的局限性
    > 实现的方式更适合用来处理多个线程有共享数据的情况
 联系：`public class Thread implements Runnable`
 相同点：两种方法都需要重写run()，将线程要执行的逻辑声明在run()中
 
 
- Thread类相关方法

1. `void start()`: 启动线程，并执行对象run()方法
2. `run()`: 线程在被调度时执行的操作
3. `String getName()`: 返回线程的名称
4. `void setName(String name)`: 设置该线程名称
5. `static Thread currentThread()`: 返回当前线程，在Thread子类中就是this，通常用于主线程和Runnable实现类
6. `static void yield()`: 线程让步（释放当前cpu执行权）
7. `join()`: 在线程A调用线程B的join()，此时A进入阻塞状态，直到B完全执行完，A才结束阻塞状态
8. `static void sleep(long millis)`: 让当前线程睡眠（毫秒）
9. `stop()`: 强制线程生命期结束，不推荐使用
10. `boolean isAlive()`: 返回boolean,判断线程是否还活着

- 线程调度

MAX_PRIORITY: 10
MIN_PRIORITY: 1
NORM_PRRORITY: 5

`getPriority()` 返回线程优先值
`setPriority(int newPriority)` 改变线程优先级

> 线程创建时继承父线程优先级
> 低优先级只是获得调度的概率低，并非一定是在高优先级线程之后才被调用

- 线程生命周期
    
 ```                   
          sleep时间到 --------- 阻塞 <-------- sleep(long time)
          join()结束 |                      | join()
           获取同步锁 |                      | 等待同步锁
notify()/notifyAll()|                       | wait（）
            resume()|                       | suspend() 废弃，会导致死锁
                    |                       |
                    |                       | 执行完run();
                    |                       |   调用线程stop();
        调用start() \|/     获取CPU执行权     |   出现ErrorException且没处理;
新建 -----------> 就绪 <-------------------> 运行 ------------> 死亡
                        失去CPU执行权或yield()  
```

- 线程同步

线程安全：当某个线程执行过程中，其他线程参与进来
如何解决：当一个线程在操作数据时，其他线程不能参与，直到该线程结束，即使该线程出现阻塞，也不能被改变；在java中，通过同步机制来解决安全问题
解决方法：
``` java
//1. 同步代码块 
synchronized(同步监视器){
    //需要同步的代码（操作共享数据的代码）
    //同步监视器：俗称锁（任何一个类的对象，都可以充当锁，要求多个线程必须要共用同一把锁）
    //线程继承方式：可以考虑使用当前类（反射）充当锁
    //线程实现Runnable接口方式：可以考虑使用this（当前对象）充当同步监视器
}
//2. 同步方法（若操作共享数据的代码完整声明在一个方法中，不妨将此方法声明同步的）
    //同步方法仍然涉及到同步监视器，只是不需要显示声明
    //线程继承方式：非静态同步方法，锁是this eg: private synchronized void method(){}
    //实现接口方式：静态同步方法，锁是类本身 eg: private static synchronized void method(){}
//3. ReentrantLock类实现了Lock（JDK5.0新增线程创建方式）
    //通过显式定义同步锁对象来实现同步，同步锁使用Lock对象充当。
    //`java.util.concurrent.locks.Lock接口`
    //`ReentrantLock类`实现了Lock，它拥有`与synchronized`相同的并发性和内存语义，在实现线程安全的控制中，比较常用的是`ReentrantLock`，可以显式加锁、释放锁
```

优点：同步的方式，解决了线程的安全问题
局限性：操作同步代码，只能有一个线程参与，其他线程等待，相当于单线程，效率低

死锁：不同线程分别占用对方需要的同步资源不放弃，都在等待对方放弃自己需要的同步资源，就形成了线程的死锁；出现此类情况，不会出现异常，不会出现提示，只是所有线程都处于阻塞状态，无法继续
解决方案：专门算法、原则；尽量减少同步资源的定义、尽量避免嵌套同步

- `synchronized`与`lock`的异同
相同点：二者都可以解决线程安全问题
不同点：`synchronized`机制在执行完相应同步代码以后，自动释放同步监视器
       `lock`需要手动启动同步`lock()`，结束时手动`unlock()`
优先使用顺序：lock =》同步代码块（已经进入方法体，分配相应资源） =》 同步方法（在方法体外）


- 线程通信
wait(): 一旦执行此方法，当前线程进入阻塞状态，并释放同步监视器
notify(): 一旦执行此方法，会唤醒被wait的线程，若有多个wait，则唤醒优先级高的那个
notifyAll(): 一旦执行此方法，唤醒所有线程

> 注意点：
> wait(),notify(),notifyAll()必须使用在同步代码块或同步方法中;
> wait(),notify(),notifyAll()的调用者必须是同步代码块或同步方法中的同步监视器，否则会出现IllegalMonitorStateException异常
> wait(),notify(),notifyAll()定义在`java.lang.Object`类中

- sleep() wait()异同
相同点：一旦执行，都可以是的当前线程进入阻塞状态
不同：1) 声明位置不同：Thread类中声明sleep()，Object类中声明wait()
     2) 调用范围不同，sleep()可以再任何需要的场景下调用，wait()必须使用在同步代码块或同步方法中
     3）若两方法均使用在同步代码块或同步方法中，sleep()不会释放锁，wait()会释放锁


- 生产者/消费者问题

- JDK5.0新增线程创建方式

方法3：实现`Callable`接口
> 相比`Runnable`，功能更强大
> 相比`run()`方法，`call()`可以有返回值
> 方法可以抛出异常
> 支持泛型的返回值
> 需要借助`FutureTask`类，eg: 获取返回结果


方法4：使用线程池（经常创建和销毁，使用量特别大的资源，并发情况下的线程，对性能影响很大）
> 提高响应速度（减少了创建新线程的时间）
> 降低资源消耗（重复利用线程池线程，不需要每次都创建）
> 便于线程管理：`corePoolSize`核心池大小 
              `maximumPoolSize`最大线程数
              `keepAliveTime`线程没有任务最多保持多长时间后会终止


## java常用类

- String/StringBuffer/StringBuilder

```
String
1. 声明为final，不可被继承
2. 实现Serializable接口，表示支持序列化
3. 实现Comparable接口，表示可比较大小
4. 内部定义final char[] value用于存储字符串数据
5. 不可变字符序列，不可变性
    -（当对字符串重新赋值时，需要重新指定内存区域赋值，不能使用原有value进行赋值）
    - (对现有字符串进行连接操作，也需要重新指定内存区域赋值)
6. 通过字面量方式给字符串赋值（区别于new），此时字符串值声明在字符串常量池中
7. 字符串常量池中是不会存储相同内容的字符串的

> 字符串常量存储在字符串常量池，目的是共享 String s1 = "abc"
> 字符串非常量对象存储在堆中 String s2 = new String("abc")
    此时在内存中创建了2个对象：一个堆空间new结构 + char[]对应的常量池中的数据
> 常量与常量的拼接结果在常量池，且常量池中不会存在相同内容的常量（只要有一个是变量，就在堆中）
> 若拼接的结果调用intern()方法，返回值就在常量池中
```

```
String 相关方法
int length()
char charAt(int index)
boolean isEmpty()
String toLowerCase()
String toUpperCase()
String trim()
boolean equals(Object obj)
boolean equalsIngoreCase(String anotherString)
String concat(String str)
int compareTo(String anotherString)
String substring(int beginIndex)
String substring(int beginIndex, int endIndex)
boolean endsWith(String suffix)
boolean startsWith(String prefix)
boolean startsWith(String prefix, int offset)
boolean contains(CharSequence s)
int indexOf(String str)
int indexOf(String str, int fromIndex)
int lastIndexOf(String str)
int lastIndexOf(String str, int fromIndex)
String replace(char oldChar,char newChar)
String replace(CharSequence target,CharSequence replacement)
String replaceAll(String regex, String replacement)
String replaceFirst(String regex, String replacement)
boolean matches(String regex)
String[] split(String regex)
String[] split(String regex, int limit)
```

```
String/StringBuffer/StringBuilder三者异同
String => 不可变字符序列
StringBuffer => 可变的字符序列，线程安全，效率低
StringBuilder => 可变的字符序列，线程不安全，效率高（jdk5.0新增）
```

- System/Date/Calendar/SimpleDateFormat(jdk8之前)
- LocalDate/LocalTime/LocalDateTime/Instant/DateTimeFormatter（jdk8新增）

- Comparable接口/Comparator接口
- System
- Math
- BigInteger/BigDecimal

## 枚举类&&注解

- 枚举类（类的对象只有有限个，确定的 + 当需要定义一组常量时，强烈建议使用枚举类）

枚举类的属性
> 其属性不应允许改动，使用 `private final` 修饰
> 其属性应该在构造器中赋值
> 若显式定义带参数的构造器，则在列出枚举值时，也必须对应的传入参数

如何定义枚举类
> `<jdk5.0`,自定义枚举
> `>=jdk5.0`,使用 `enum`关键字

主要方法
`values()`: 返回枚举类的对象数组，可以方便遍历枚举值
`valueOf(String str)`: 把一个字符串转为对应枚举类对象，字符串必须是枚举类成员
`toString()`: 返回当前枚举类对象常量的名称

实现接口
> 实现接口，在enum类中实现抽象方法
> 让枚举类对象分别实现接口中的抽象方法

- 注解（Annotation）

使用时前面加`@`符号，用于修饰它支持的程序元素

可以这么说：框架 = 反射 + 注解 + 设计模式

使用场景：
> 1. 生成文档相关注解
> 2. 编译时格式检查：@Override,@Desprated,@SuppressWarnings
> 3. 跟踪代码依赖性，实现替代配置文件功能

自定义：(先省略)

JDK提供的4中元注解（元Annotation用于修饰其他Annotation定义）
> Retention（用于指定该annotation生命周期）(使用频率较高)

    SOURCE: 源码保留
    CLASS（默认行为）: class保留
    RUNTIME: 运行java程序，JVM保留，可以通过反射获取

> Target（指定该annotation用于修饰哪些程序元素）（使用频率较高）
> Documented（指定该annotation将被javadoc工具提取成文档）
> Inherited（子类可以继承父类级别的注解）

## java集合

- java集合框架概述

Array存储有一些弊端，java集合就像一种容器，可以动态把多个对象引用放入容器中

java集合2种体系
| --- Collection：单列数据，定义了存取一组对象的方法的集合
    | --- List：元素有序，可重复的集合
        | --- ArrayList,LinkedList,Vector 
    | --- Set：元素无序，不可重复集合
        | --- HashSet,LinkedSet,TreeSet
| --- Map：双列数据，保存具有**映射关系**"key-value"的集合
    | --- **HashMap**,LinkedHashMap,TreeMap,HashTable,Properties
    
- Collection接口方法

`add()`
`addAll()`
`isEmpty()`
`size()`
`clear()`


- Iterator迭代器接口

`next()`
`hasNext()`

``` java
Collection coll = new ArrayList();
Iterator iterator = coll.iterator();
while(coll.hasNext()){
    System.out.println(coll.next());
}
```

- Collection子接口1：List
- Collection子接口2：Set
- Map接口
- Collections工具类



## 泛型（Generic）

- 为什么有泛型

把元素的类型设计成一个参数，这个参数类型就叫泛型

- 在集合中使用泛型
- 自定义泛型结构
- 泛型在继承上的体现
- 通配符的使用
- 泛型应用举例


## IO流

## 网络编程

## 反射

::: tip 写在前面
第一次学习`反射`是懵逼的，不知道这个能干什么。写过一个`springboot`的demo之后，回头又来重新学习。建议移步这里(根据配置文件模拟JDBC)，感受一下反射在框架中的神奇作用。
:::


### 1. 是什么

- 反射(Reflection)是被视为动态语言的关键，反射机制允许程序在执行期间借助`Reflection API`取得任何类的内部信息，并能直接操作任意对象的内部属性和方法。它将类的各个组成部分封装为其他对象。
- Java不是动态语言，它能利用反射机制、字节码操作获得类似动态语言的特性，让其具有一定的`动态性`。

::: tip 优点
1. 可以在程序运行过程中，操作这些对象
2. 可以解耦，提高程序的可扩展性
3. 可以调用私有结构（私有构造器/属性/方法）有点厉害了哦
:::

::: tip 反射应用
1. 框架设计的灵魂
2. 动态代理
:::


### 2. class对象获取

Java类加载分3个阶段，每个阶段都可以利用Java反射获取到class对象

::: tip 第一阶段
- 源代码（source）：源代码不是指.java文件，而是经编译器编译后生成的.class字节码文件
- 获取方法：将字节码文件加载进内存，返回class对象。`Class.forName("全类名")`
- 用途：参数为字符串，多用于配置文件。将类名定义在配置文件中。读取文件，加载类。
:::

::: tip 第二阶段
- 类加载（class）：class字节码文件经类加载器classloader加载到虚拟机内存。类加载器解析class文件生成Class类型的对象、
- 获取方法：通过类名的属性class获取。 `Person.class`
- 用途：多用于参数的传递
:::

::: tip 第三阶段
- 运行时（runtime）: 实例化，根据java类型生成对象
- 获取方法：getClass()方法在Object类中定义。`person.getClass()`
- 用途：多用于对象的获取字节码的方式
:::


代码示例：

``` java
import domain.Person;

public class ReflectDemo {
    public static void main(String[] args) throws ClassNotFoundException {

        //1. Class.forName("全类名")
        Class cls1 = Class.forName("domain.Person");
        System.out.println(cls1); //class domain.Person


        //2. 类名.class
        Class cls2 = Person.class;
        System.out.println(cls2); //class domain.Person

        //3. 对象.getClass()
        Person p = new Person();
        Class cls3 = p.getClass();
        System.out.println(cls3); //class domain.Person

        //  == 比较三个对象, 比较的是内存
        System.out.println(cls1 == cls2); //true
        System.out.println(cls1 == cls3); //true
        System.out.println(cls2 == cls3); //true

    }
}
```

::: warning 结论
同一个字节码文件（*.class）在一次程序运行过程中，只会被加载一次。不论通过哪一种方式获取的class对象都是同一个。
:::

### 3. class对象方法

初始化一个Person类，演示时候用

``` java
package domain;

public class Person {
    public String name;
    public int age;
    private int gender;

    public Person(){}

    public Person(String name, int age, int gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public void run() {
        System.out.println("run...");
    }
    public void run(String city){
        System.out.println("run..." + city);
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", gender=" + gender +
                '}';
    }
}

```


- 获取成员变量  

代码示例：

``` java
import domain.Person;
import java.lang.reflect.Field;

/**
 * 获取成员变量示例
 */

public class ReflectField {

    public static void main(String[] args) throws Exception {

        Class personClass = Class.forName("domain.Person");

        /**
         * 1. public Field[] getFields(): 获取所有public修饰的成员变量
         */
        Field[] fields = personClass.getFields();
        for(Field field: fields) {
            System.out.println(field);
            //public java.lang.String domain.Person.name
            //public int domain.Person.age
        }

        /**
         * 2. public Field getField(String name): 获取指定名称的public修饰的成员变量
         */
        Field nameField = personClass.getField("name");
        System.out.println(nameField); //public java.lang.String domain.Person.name
        //获取成员变量便可以进行get/set操作
        //get
        Person p = new Person();
        Object nameValue = nameField.get(p);
        System.out.println(nameValue); //null (String类型默认为null)
        //set
        nameField.set(p, "yourName");
        System.out.println(p); //Person{name='yourName', age=0, gender=0}

        /**
         * 3. public Field[] getDeclaredFields(): 获取所有成员变量，不考虑修饰符
         */
        Field[] declaredFields = personClass.getDeclaredFields();
        for(Field declaredField: declaredFields) {
            System.out.println(declaredField);
            //public java.lang.String domain.Person.name
            //public int domain.Person.age
            //private int domain.Person.gender
        }

        /**
         * 4. public Field getDeclaredField(String name): 获取指定成员变量，不考虑修饰符
         */
        Field genderField = personClass.getDeclaredField("gender");
        //直接获取私有属性会报错：Class ReflectField can not access a member of class domain.Person with modifiers "private"
        genderField.setAccessible(true); //暴力反射
        Object genderValue = genderField.get(p);
        System.out.println(genderValue);
        genderField.set(p, 18);
        System.out.println(p); //Person{name='yourName', age=0, gender=18}
    }

}
```


- 获取构造方法 

代码示例：

``` java
import java.lang.reflect.Constructor;

public class ReflectConstructor {
    public static void main(String[] args) throws Exception {


        Class personClass = Class.forName("domain.Person");


        /**
         * 1. public Constructor<?>[] getConstructors():
         */
        Constructor[] constructors = personClass.getConstructors();
        for(Constructor constructor: constructors) {
            System.out.println(constructor);
            //public domain.Person()
            //public domain.Person(java.lang.String,int)
        }

        /**
         * 2. public Constructor<T> getConstructor(Class<?>... parameterTypes):
         */
        Constructor constructor = personClass.getConstructor();
        Constructor constructor1 = personClass.getConstructor(String.class, int.class, int.class);

        //创建对象
        Object p = constructor1.newInstance("yourName", 18, 1);
        System.out.println(p); //Person{name='yourName', age=18, gender=1}

        //若使用空参构造方法创建对象，操作可以简化：使用class对象的newInstance方法
        Object p1 = personClass.newInstance();
        System.out.println(p1); //Person{name='null', age=0, gender=0}

        /**
         * 3. public Constructor<?>[] getDeclaredConstructors()
         */


        /**
         * 4. public Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes)
         */
    }

}
```


- 获取成员方法  

代码示例：

``` java
import domain.Person;

import java.lang.reflect.Method;

public class ReflectMethod {

    public static void main(String[] args) throws Exception {

        Class peronClass = Class.forName("domain.Person");


        /**
         * 1. public Method[] getMethods():获取所有public修饰的方法
         */

        Method[] methods = peronClass.getMethods();
        for(Method method: methods) {
            System.out.println(method);
            //类默认继承Object，所以会有Object类所有public方法
        }
        
        /**
         * 2. public Method getMethod(String name, Class<?>... parameterTypes)
         */
        
        Method run_method = peronClass.getMethod("run");
        Method run_method_city = peronClass.getMethod("run", String.class);
        
        //实例化对象
        Person p = new Person();
        //执行方法
        run_method.invoke(p);
        run_method_city.invoke(p, "China");
        

        /**
         * 3. public Method[] getDeclaredMethods()
         */


        /**
         * 4. public Method getDeclaredMethod(String name, Class<?>... parameterTypes)
         */
    }
}


```

- 获取类名  

代码示例：

``` java
public class ReflectGetName {
    public static void main(String[] args) throws Exception {

        Class personClass = Class.forName("domain.Person");

        /**
         * public String getName()
         */

        String name = personClass.getName();
        System.out.println(name); //domain.Person (全类名)

    }
}
```


### 4. 实现一个简易“框架”

``` properties
# reflect.properties文件
className=domain.Car
methodName=run
```

``` java 
// Reflect.java
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Properties;

/**
 * 需求：写一个"框架"，不能改变该类的任何代码，可以帮助我们创建任意类对象，并且执行其中的任意方法
 * 实现思路：1. 配置文件 2. 反射
 * 步骤：1. 将需要创建的对象的全类名和需要执行的方法定义在配置文件中
 *      2. 在程序中加载读取配置文件
 *      3. 使用反射技术来加载类文件进内存
 *      4. 创建对象
 *      5. 执行方法
 */

public class Reflect {

    public static void main(String[] args) throws IOException, ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {

        /**
         * Car car = new Car();
         * car.run();
         * 常规创建对象执行方法，但是失去了框架的意义
         */

        /**
         *  1. 加载配置文件
         */
        //创建Properties对象
        Properties properties = new Properties();
        //获取class目录下的配置文件
        ClassLoader classLoader = Reflect.class.getClassLoader();
        InputStream resourceAsStream = classLoader.getResourceAsStream("reflect.properties");
        properties.load(resourceAsStream);
        /**
         * 2. 获取配置文件中定义的数据
         */
        String className = properties.getProperty("className");
        String methodName = properties.getProperty("methodName");
        /**
         * 3. 加载该类进内存
         */
        Class cls = Class.forName(className);
        /**
         * 4. 创建对象
         */
        Object o = cls.newInstance();
        /**
         * 5. 获取方法对象
         */
        Method method = cls.getMethod(methodName);
        /**
         * 6. 执行方法
         */
        method.invoke(o);
    }

}

```

## XML

1. xml是可扩展的标记性语言
2. 作用：
    - 用来保存数据，而且这些数据具有自我描述性
    - 作为项目或者模块的配置文件
    - 作为网络传输数据的格式（现在JSON为主）
3. <![CDATA[<<<<<<<]]> 语法，里面的内容都会被解析器忽略。
4. 解析（使用dom4j）

```xml
<?xml version="1.0" encoding="utf-8" ?>


<!--<?xml version="1.0" encoding="utf-8" ?>
    version="1.0" version 表示 xml版本
    encoding="utf-8" encoding 表示 xml文件本身编码
-->

<books>
    <book sn="SN!123">
        <name>java</name>
        <author>James Gosling</author>
        <price>1024</price>
    </book>
    <book sn="SN!234">
        <name>web</name>
        <author>w3c</author>
        <price>123</price>
    </book>
    <book sn="SN!456">
        <name>js</name>
        <author>wyl</author>
        <price>123</price>
    </book>
    <book sn="SN!789">
        <name>node</name>
        <author>xxx</author>
        <price>99.9</price>
    </book>
</books>
```

``` java
package com.wyl.xml;

//import java.math.BigDecimal;

public class Book {

    private String sn;
    private String name;
    private Double price;
    private String author;

    public Book() {
    }

    public Book(String sn, String name, Double price, String author) {
        this.sn = sn;
        this.name = name;
        this.price = price;
        this.author = author;
    }

    public String getSn() {
        return sn;
    }

    public void setSn(String sn) {
        this.sn = sn;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }


    @Override
    public String toString() {
        return "com.wyl.xml.Book{" +
                "sn='" + sn + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", author='" + author + '\'' +
                '}';
    }
}

```

``` java
package com.wyl.xml;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.junit.Test;

import java.util.List;

public class Dom4jTest {

    @Test
    public void test1() throws Exception {

        SAXReader saxReader = new SAXReader();

        Document document =  saxReader.read("src/books.xml");

        System.out.println(document);

    }

    @Test
    public void test2() throws DocumentException {
        //1. 读取books.xml文件
        SAXReader saxReader = new SAXReader();
        Document document =  saxReader.read("src/books.xml");
        //2. 通过Document对象获取根元素
        Element rootElement = document.getRootElement();
        System.out.println(rootElement);
        //3. 通过根元素获取book标签对象
        List<Element> books = rootElement.elements("book");
        //4. 遍历，处理每个book标签转化为book类
        for (Element bookItem: books) {
            // asXML() 把标签对象，转化为标签字符串
            Element nameElement = bookItem.element("name");

            //getText() 可以获取标签中的文本内容
            String nameText = nameElement.getText();
//            System.out.println(nameText);

            //elementText() 直接获取指定标签名的文本内容
            String authorText = bookItem.elementText("author");
//            System.out.println(authorText);

            String priceText = bookItem.elementText("price");
//            System.out.println(priceText);

            String snValue = bookItem.attributeValue("sn");
//            System.out.println(snValue);

            System.out.println(new Book(snValue, nameText, Double.parseDouble(priceText), authorText));
        }
    }
}
```

## javaweb

1. 概念：通过java语言编写可以通过浏览器访问的程序的总称
2. 基于请求和响应开发
3. web资源分类
    -  静态资源 eg: html,css,js,txt,mp4,jpg
    -  动态资源 eg: jsp,servlet程序
4. 常用web服务器
    - tomcat
    - Jboss
    - GlassFish
    - Resin
    - WebLogic

## Tomcat


1. 目录介绍

| 目录名称 | 目录说明 |
| --- | --- |
| bin | tomcat可执行程序 |
| conf | tomcat配置文件 |
| lib | 存放tomcat服务器jar包 |
| logs | 存放tomcat运行时输出的日志信息 |
| temp | tomcat临时数据 |
| webapps | 存放部署的web工程 |
| work | tomcat工作时的目录，用来存放tomcat运行时jsp翻译为servlet的源码，和session钝化的目录 |


2. 启动

```
cd /bin
chmod 755 *.sh
./startup.sh
```  

3. 修改端口

```
vi conf/server.xml
# 修改   <Connector port="8080" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" />
```
``
4. 部署web工程
    - 方法1：直接把文件放在`webapps`目录下
    - 方法2：在`localhost`写配置文件


## Servlet

1. 概念

servlet是javaee规范之一，规范就是接口
servlet是javaweb三大组件之一，三大组件分别是：servlet程序 + filter过滤器 + listener监听器
servlet是运行在服务器上的一个java小程序，它可以接受客户端发送过来的请求，并相应给客户端
 
2. 手动实现Servlet程序

编写一个类去实现Servlet接口
实现service方法，并相应数据
到web.xml中去配置servlet程序的访问地址









