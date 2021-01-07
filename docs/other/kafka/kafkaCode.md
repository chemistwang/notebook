# 代码实现

## Java

`Springboot`示例：

1. pom.xml引入kafka依赖

``` xml
<dependency>
  <groupId>org.springframework.kafka</groupId>
  <artifactId>spring-kafka</artifactId>
</dependency>
```

2. kafka生产者

``` java
@Component
public class KafkaProducer {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void send(){
        kafkaTemplate.send("xxx", "kafka data...");
    }
}
```

3. kafka消费者


``` java
@Component
public class KafkaConsumer {
    @KafkaListener(topics = {"xxx"})
    public void receive(String message) {
        System.out.println(message + "消费");
    }
}
```

## Node

待更新...