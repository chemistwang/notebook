# Spring

struts1,struts2,hibernate,spring,springMVC,mybatis

MVC框架: struts1,struts2,springMVC
持久层框架: hibernate，mybatis
整合型框架/设计型框架: spring

Spring => IOC（DI）+ AOP 容器框架

## 一、概述
    
1. Spring特点

```
- 非侵入式：基于spring开发的应用中的对象可以不依赖于spring的API（即对原来的技术不造成影响）
- 依赖注入：DI, 反转控制（IOC）最经典的实现（IOC可以理解为一种思想）
- 面向切面编程：AOP
- 容器：Spring是一个容器，因为它包含并且管理应用对象的生命周期
- 组件化：Spring实现了使用简单的组件配置组合成一个复杂的应用，在spring中可以使用XML和java注解组合这些对象
- 一站式：在IOC和AOP基础上可以整合各种企业应用的开源框架和优秀的第三方类库
```

2. Spring模块

## 二、IOC && DI

- IOC(Inversion of Control)

`反转资源获取的方向`，传统资源查找方式要求组件向容器发起请求查找资源，作为回应，容器适时的返回资源，而应用了IOC之后，则是`容器主动的将资源推送给它所管理的组件，组件要做的仅是选择一种合适的方式来接受资源`，这种也被称为查找的被动形式

- DI(Dependency Injection)

IOC的另一种表述方式，即`组件以一些预先定义好的方式接受来自容器的资源注入`


## 三、配置bean

1. 配置形式：2种方法：基于XML文件方式 + 基于注解的方式
2. Bean的配置方式：

    - 通过全类名（反射）
    - 工厂方法（静态工厂方法 & 实例工厂方法）

    ``` xml
    <!--通过静态工厂方法配置bean，注意不是配置静态工厂方法实例，而是配置bean实例-->
<!--
    class属性：指向静态工厂方法的全类名
    factory-method：指向静态工厂方法的名字
    constructor-arg：若工厂方法需要传入参数，则使用constructor-arg配置参数
-->

<bean id="car1" class="com.wyl.spring.factory.StaticCarFactory" factory-method="getCar">
    <constructor-arg value="audi"></constructor-arg>
</bean>
    ```
    
    ``` xml
    
    <!--factory-bean 属性：指向实例工厂方法的全类名-->
    <!--配置工厂的实例-->
    <bean id="carFactory" class="com.wyl.spring.factory.InstanceCarFactory"></bean>
    <!--通过实例工厂方法来配置bean-->
    <bean id="car2" factory-bean="carFactory" factory-method="getCar">
        <constructor-arg value="ford"></constructor-arg>
    </bean>
    ```
    
    - FactoryBean

    实现FactoryBean接口，getObject()方法返回的实例
    

3. ApplicationContext概述

    > `ApplicationContext`面向Spring框架开发者，几乎所有场合都直接使用`ApplicationContext`而非底层的`BeanFactory`
    > `ApplicationContext`主要实现类：`ClassPathXmlApplicationContext`,`FileSystemXmlApplicationContext`


4. 三种依赖注入方式：

    - 属性注入

    ``` xml
    <bean id="helloWorld" class="com.wyl.spring.beans.HelloWorld">
        <property name="userName" value="Spring..."></property>
    </bean>
    ```

    > 属性注入即通过 `setter方法`注入Bean的属性值或依赖的对象
    > 属性注入使用`<property>`元素，`name`指定Bean属性名称，`value`或`<value>子节点`指定属性值
    > 实际应用最常用的注入方式

    - 构造器注入

    ``` xml
    <!--使用构造器注入属性值可以指定参数的位置和参数的类型，以区分重载的构造器-->
    <bean id="car" class="com.wyl.spring.beans.Car">
        <constructor-arg value="Audi" index="0"></constructor-arg>
        <constructor-arg value="Shanghai" index="1"></constructor-arg>
        <constructor-arg value="200000" index="2" type="int"></constructor-arg>
    </bean>
    ```

    - 工厂方法注入（很少使用，不推荐）

5. 属性配置细节

字面值：可以用字符串表示的值，通过<value>标签或value属性进行注入，包含特殊符号用`<![CDATA[]]>`包裹
引用其他Bean：

``` xml
<bean id="person" class="com.wyl.spring.beans.Person">
    <property name="name" value="lucus"></property>
    <property name="age" value="12"></property>
    <!--可以使用ref属性建立bean之间的引用关系-->
    <!--方法1-->
    <!--<property name="car" ref="car3"></property>-->

    <!--方法2-->
    <property name="car">
        <ref bean="car2"></ref>
    </property>
    
    <!--内部bean，不能被外部引用，只能在内部引用-->
    <property name="car">
        <bean class="com.wyl.spring.beans.Car">
            <constructor-arg value="BJD"></constructor-arg>
            <constructor-arg value="XiAn"></constructor-arg>
            <constructor-arg value="3000000000"></constructor-arg>
        </bean>
    </property>
</bean>
```

null值

``` xml
<bean id="person" class="com.wyl.spring.beans.Person">
    <constructor-arg value="mars"></constructor-arg>
    <constructor-arg value="19"></constructor-arg>
    <constructor-arg ><null/></constructor-arg>
</bean>
```

级联属性：需要先初始化后才可以为级联属性赋值，否则会有异常，与Struts2不同

集合属性：

``` xml
<!--配置集合属性-->
<bean id="personCollection" class="com.wyl.spring.collections.Person">
    <property name="name" value="Mars"></property>
    <property name="age" value="11"></property>
    <property name="cars">
        <!--使用list节点为list类型属性赋值-->
        <list>
            <ref bean="car"></ref>
            <ref bean="car2"></ref>
            <ref bean="car3"></ref>
        </list>
    </property>
</bean>
```

``` xml
<!--配置Map属性值-->
<bean id="personMap" class="com.wyl.spring.collections.PersonMap">
    <property name="name" value="jessica"></property>
    <property name="age" value="18"></property>
    <property name="cars">
        <!--使用map节点及map的entry子节点配置Map类型的成员变量-->
        <map>
            <entry key="AA" value-ref="car"></entry>
            <entry key="BB" value-ref="car2"></entry>
        </map>
    </property>
</bean>
```

``` xml
<!--配置Properties属性值-->
<bean id="dataSource" class="com.wyl.spring.collections.DataSource">
    <property name="properties">
        <!--使用props和prop子节点为Properties属性赋值-->
        <props>
            <prop key="user">root</prop>
            <prop key="password">wyl123</prop>
            <prop key="jdbcUrl">jdbc:mysql://test</prop>
            <prop key="driverClass">com.mysql.jdbc.driver</prop>
        </props>
    </property>
</bean>
```

``` xml
<!--配置独立的集合bean，以供多个bean使用, 需要导入util命名空间, xmlns:util="http://www.springframework.org/schema/util"-->
<util:list id="carList">
    <ref bean="car"></ref>
    <ref bean="car2"></ref>
    <ref bean="car3"></ref>
</util:list>

<bean id="personCollection2" class="com.wyl.spring.collections.Person">
    <property name="age" value="12"></property>
    <property name="name" value="rebecca"></property>
    <property name="cars" ref="carList"></property>
</bean>
```

``` xml
<!--通过p命名空间为bean的属性赋值，需要先导入p命名空间, xmlns:p="http://www.springframework.org/schema/p"-->
    <bean id="personP" class="com.wyl.spring.collections.Person" p:age="23" p:name="george" p:cars-ref="carList"></bean>
```

6. 自动装配

三种方式：

    - byType： 使用autowire属性指定自动装配的方式，byName根据bean的名字和当前bean的setter风格的属性名进行自动装配，若有匹配则进行自动装配，若没有，则不装配

    - byName：byType根据bean的类型和当前bean的属性的类型进行自动装配，若IOC容器中有一个以上的类型匹配，则抛异常

    - constructor（构造器自动装配）：不推荐（当Bean中存在多个构造器，会很复杂）

> 说明
> 1. autowire属性byType和byName，只能两者选其一
> 2. 一般情况，实际项目中很少使用自动装配，因为明确清晰的配置文档更有说服力

7. bean之间的关系

继承（配置上的继承）：`parent`属性

依赖：`depends-on`属性

8. bean作用域

`scope`属性：
    `singleton`: 默认值，单例。容器初始化时创建bean实例，在整个容器生命周期内，只创建这一个bean，；
    `prototype`: 原型，容器初始化时不创建bean实例，每次请求时都创建一个新的bean实例，并返回

9. 使用外部属性文件

引入`xmlns:context="http://www.springframework.org/schema/context"`
` <context:property-placeholder location="classpath:db.properties"></context:property-placeholder>`

10. spEL(Spring表达式语言) [expression language]

spEL为bean的属性进行动态赋值提供了便利

`#{...}`语法

``` xml
<bean id="person" class="com.wyl.spring.spel.Person">
    <!--使用spel引用其他的bean-->
    <property name="car" value="#{car}"></property>
    <!--使用spel引用其他的bean的属性-->
    <property name="city" value="#{address.city}"></property>
    <!--使用spel使用运算符-->
    <property name="info" value="#{car.price > 30 ? '金领' : '白领'}"></property>
</bean>
```

11. IOC容器中Bean的生命周期

- 通过构造器或工厂方法创建Bean实例
- 为Bean的属性设置值和对其他Bean的引用
- 将Bean实例传递给Bean后置处理器的`postProcessBeforeInitialization`方法
- 调用Bean的初始化方法
- 将Bean实例传递给Bean后置处理器的`postProcessAfterInitialization`方法
- Bean可以使用
- 当容器关闭时，调用Bean的销毁方法

> 在Bean中设置`init-method`和`destroy-method`属性，为Bean指定初始化和销毁方法 


12. 基于注解配置bean

组件扫描（component scanning）: Spring能够从classpath下自动扫描，侦测和实例化具有特定注解的组件
特定组件：`@Component`：基本注解。标识了一个受Spring管理的组件
        `@Respository`: 建议标识持久层组件
        `@Service`: 建议标识服务层（业务层）组件
        `@Controller`: 建议标识表现层组件

组件类使用特定注解之后,需要在Spring配置文件中声明 `<context:component-scan>`
  
解决关联关系：`<context:component-scan>`自动注册 `AutowiredAnnotationBeanProcessor` 实例，该实例可以自动装配具有 `@Autowired`, `@Resource`, `@Inject` 注解的属性

@Autowired(require=false): 不装配，不会抛异常
@Qualifier('youname')：若装配有多个bean，可以指定名字

13. Spring4.x新特性，泛型依赖注入


## 四、AOP

- 背景

代码混乱：越来越多的非业务需求（日志，验证等）加入后，业务方法膨胀，每个方法在处理核心逻辑同时必须兼顾其他多个关注点

代码分数：多个模块多次重复


- 解决

使用动态代理
Spring AOP `Proxy.newProxyInstance`

- 术语

切面`Aspect`: 横切关注点（跨越应用程序多个模块功能）被模块化的特殊对象
通知`Advice`: 切面必须要完成的工作
目标`Target`: 被通知的对象
代理`Proxy`: 向目标对象应用通知后创建的对象
连接点`JoinPoint`: 程序执行的某个特定位置
切点`pointcut`: AOP通过切点定位到特定的连接点

- 实现 推荐使用 `AspectJ`

两种方式：

AspectJ注解:

```
# 第一步：引入相关jar包
com.springsource.org.aopalliance-1.0.0
com.springsource.org.aspectj.weaver-1.6.8.RELEASE
spring-aspects-5.2.7.RELEASE
spring-aop-5.2.7.RELEASE

# 第二步：在配置文件中加入aop命名空间

`xmlns:aop="http://www.springframework.org/schema/aop"`

# 第三步：配置如下

`<aop:aspectj-autoproxy></aop:aspectj-autoproxy>`

# 第四步：把横切关注点的代码抽象到切面的类中
i. 切面首先是一个 IOC 的bean，即加入 `@Component` 注解
ii. 切面还需要加入 `@Aspect` 注解 
iii. 在方法前加入以下需要的注解
    `@Before` 
    `@After`
    `@AfterRunning`
    `@AfterThrowing`
    `@Around`: 最强但最不常用
eg:  

//重用切点表达式
@Pointcut("execution(public int com.wyl.spring.aop.impl.ArithmeticCalculator.*(int, int))")
public void declareJoinPointExpression(){}

@Order(1) //指定切面优先级，值越小优先级越高
@Aspect
@Component
public class LoggingAspect {

    //声明该方法是一个前置通知：在目标方法开始之前执行
    @Before("execution(public int com.wyl.spring.aop.impl.ArithmeticCalculator.*(int, int))")
    public void beforeMethod(JoinPoint joinPoint){
        //方法名
        String methodName = joinPoint.getSignature().getName();
        //参数
        List<Object> args = Arrays.asList(joinPoint.getArgs());
        System.out.println("The method " + methodName + " begins with " + args);
    }
}
```



基于XML:

## 五、JDBC

Sping在JDBC的API上定义了一个抽象层，以此建立了一个JDBC存取框架


## 六、事务

确保数据的完整性和一致性
四个关键属性（ACID）
    > 原子性
    > 一致性
    > 隔离性
    > 持久性
spring事务管理
    > 编程式事务
    > 声明式事务


