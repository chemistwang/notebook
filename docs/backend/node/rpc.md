# RPC

## 是什么

Remote Procedure Call（远程过程调用）

- 和 Ajax 有什么相同点？

  - 都是 2 个计算机之间的网络通信
  - 需要双方约定一个数据格式

- 和 Ajax 有什么不同点？

  - 不一定使用 DNS 作为寻址服务
  - 应用层协议一般不使用 HTTP（可能使用一些二进制协议，会有性能上的优势）
  - 基于 TCP 或 UDP 协议

- 寻址/负载均衡

  - Ajax：使用 DNS 进行寻址
  - RPC：使用特有服务进行寻址

- TCP 通信方式

  - 单工通信： 要么 C 向 S 发包，要么 S 向 C 发包
  - 半双工通信： 同一时间内只能有一方给另一方发送数据，可以理解为轮番单工通信
  - 全双工通信：不受限制

- 二进制协议
  - 更小的数据包体积
  - 更快的编解码速率

## Node.js Buffer 编解码二进制数据包

使用 node 原生写 buffer 会比较麻烦，解决方案：

[node protocol-buffer](https://www.npmjs.com/package/protocol-buffers)

```js
// buffer.js
const buffer1 = Buffer.from("test");
const buffer2 = Buffer.from([1, 2, 3, 4]);

const buffer3 = Buffer.alloc(20);

console.log(buffer1, buffer1.toString());
console.log(buffer2, buffer2.toString());
console.log(buffer3, buffer3.toString());

buffer2.writeInt8(12, 1);
console.log(buffer2);
// buffer2.writeInt16BE(512, 2);
buffer2.writeInt16LE(512, 2);
console.log(buffer2);

// ========================================================================================

const fs = require("fs");

var protobuf = require("protocol-buffers");

// pass a proto file as a buffer/string or pass a parsed protobuf-schema object
var messages = protobuf(fs.readFileSync(__dirname + "/test.proto"));

var buf = messages.Test.encode({
  num: 42,
  payload: "hello world",
});

console.log(buf); // should print a buffer

var obj = messages.Test.decode(buf);
console.log(obj); // should print an object similar to above
```

## Node.js net 建立多路复用的 RPC 通道

- 单工/半双工的通信通道搭建
  - 关键在于应用层协议需要有标记包号的字段
  - 处理以下情况，需要有标记包长度的字段
    - 粘包
    - 不完整包
  - 错误处理

```js
// server.js
const net = require("net");

const server = net.createServer((socket) => {
  // socket.write(); //写入
  socket.on("data", function(buffer) {
    console.log(buffer, buffer.toString());

    const lessonid = buffer.readInt16BE();
    buffer.write(Buffer.from(data[lessonid]));
  });
});

server.listen(4444);

const data = {
  1: "lesson1",
  2: "lesson2",
  3: "lesson3",
  4: "lesson4",
  5: "lesson5",
  6: "lesson6",
  7: "lesson7",
  8: "lesson8",
  9: "lesson9",
  10: "lesson10",
};
```

```js
// client.js
const net = require("net");

const socket = new net.Socket({});

const lessonids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

socket.connect({
  host: "127.0.0.1",
  port: 4444,
});

const buffer = Buffer.alloc(2);
buffer.writeInt16BE(lessonids[Math.floor(Math.random() * lessonids.length)]);

// socket.write('hello world!')
socket.write(buffer);
```
