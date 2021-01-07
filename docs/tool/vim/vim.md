# VIM操作

有规律的记忆，看每个命令背后的含义

```
{ commands } +  { text object or motions }

commands => {
    d -> delete (also cut)
    c -> change (delete ,then place in insert mode)
    y => yank(copy)
    v -> visually
}

text object => {
w => words
s => sentences
p => paragraph
t => tags
}

motions => {
    a -> all
    i => in
    t => till
    f => find forward
    F => find backward
}

eg:
diw delete in word
caw change all word
da[/di[/di(

yi) yank all text inside parentheses 

dt空格 delete untill the space


```

h => 左
j => 下
k => 上
l => 右

i =》 在光标前插入字符
a =》 -----后------

I => 在光标所在行所有字符前插入
A => -----------------后---

o => 在当前光标下一行打开新一行
O =》---------上-----------

复制
nyy
p

sv => 在当前文件下方打开
vs => --------右-----

ctrl-j/k/h/l =》 切换分割窗口


:wq/:ZZ/:x  =》 保存并退出

gg => 文件头部
G => 文件底部

/somthing => 查找
n => 向后
N =》向前


~ => 转换当前字母大小写

## 删除
d$ => 删除游标所在处，至当前行的最后一个字符

