# 常见集合

## vector

允许存储一系列数量可变的值，只能存储同类型的值

:::tip 工作方式
vector在没有足够空间将所有元素依次相邻存放的情况下，可能会要求分配新内存并将老的元素拷贝到新空间
:::

- 创建

``` rust
let v:Vec<i32> = Vec::new(); // 空 vector
let v1= vec![1, 2, 3]; // 初始化的 vector，rust 可以推断数据类型
```

- 更新

``` rust
let mut v:Vec<i32> = Vec::new();
v.push(1); // 新增
```

- 读取

``` rust
let v = vec![1,2,3];
let n1 = v[0]; // 索引
let n2 = v.get(1); // get 方法
```

- 多类型

当需要存储不同类型的值时，可以定义使用枚举

``` rust
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

let row = vec![
    SpreadsheetCell::Int(3),
    SpreadsheetCell::Text(String::from("blue")),
    SpreadsheetCell::Float(10.12),
];
```


## string

属于字符的集合

## hash map

允许将值和特定的键（key）相关联