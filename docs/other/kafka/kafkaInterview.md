# 面试题

1. kafka中 ISR，AR 代表什么
2. kafka中 HW, LEO 代表什么
3. kafaka中是怎么体现消息顺序性的
4. kafaka中分区器，序列化器，拦截器是否了解？他们之间的处理顺序是什么？
5. kafka生产者客户端的整体结构是什么样子的？使用了几个线程来处理？分别是什么？
6. “消费组中的消费者个数如果超过topic分区，那么就会有消费者消费不到数据”这句话是否正确？
7. 消费者提交消费位移时提交的是当前消费到的最新消息的offset还是offset+1
8. 有哪些情形会造成重复消费？
9. 哪些情形会造成消息漏消费？
10. ..
11. topic的分区数能否增加？若可以，怎么增加?若不行，又为什么
12. ---------------减少------------------------------
13. kafka有内部topic吗，如果有是什么，有什么作用
14. kafka分区分配的概念
15. 简述kafka的日志目录结构
16. 若指定一个offset，kafka controller怎么查找到对应的消息
17. 聊一聊kafka controller的作用
18. kafaka中有哪些地方需要选举，这些地方选举策略有哪些
19. 失效副本是什么？有哪些对应措施
20. kafka哪些设计有如此高的性能