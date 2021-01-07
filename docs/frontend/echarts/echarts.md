# echar吐血整理

1. 场景：接口请求到的数据相同时，echarts图表不刷新

> 参考链接[点击](https://blog.csdn.net/Ting_hao/article/details/91580207)

``` js
//清空当前实例，会移出实例中所有组件和图表
instance.clear();
```

2. 饼图：饼图按时间高亮，鼠标移入取消定时器，鼠标移出重新启动定时器

> 参考链接[点击](https://bbs.csdn.net/topics/392217212)
 
``` js
let option = {
    ...
}
let currentIndex = 0;
let dataLen = data.length;
timer = setInterval(() => {
    //取消之前高亮的图形
    chartInstance.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex
    });
    currentIndex = (currentIndex + 1) % dataLen;
    //高亮当前图形
    chartInstance.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: currentIndex
    })
}, 2000);

let lastMouseOverIndex = null;
chartInstance.on('mouseover', function(e) {
    clearInterval(timer);
    lastMouseOverIndex = e.dataIndex;
    for(let i = 0;i < dataLen; i++) {
        if(i != e.dataIndex) {
            chartInstance.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: i
            })
        }
    }
});
// mouseout事件，将上次的高亮
chartInstance.on('mouseout', function (e) {
    clearInterval(timer);
    chartInstance.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: lastMouseOverIndex
    })  
    timer = setInterval(function () {
        // 取消之前高亮的图形
        chartInstance.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: lastMouseOverIndex
        });
        lastMouseOverIndex = (lastMouseOverIndex + 1) % dataLen;
        // 高亮当前图形
        chartInstance.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: lastMouseOverIndex
        });
    }, 2000);
});
```


``` js
//用过echarts的API
animationDuration //初始动画的时长，支持回调函数
series: [
    {
        animationEasing: 'bounceOut', //初始动画的缓动效果
        itemStyle: {
            borderColor: 'xxx', //图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
            borderWidth: '' //描边线宽。为 0 时无描边。
        }
    }
]

```


