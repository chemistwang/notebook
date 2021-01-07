# 动画实现

js setTimeout
缺陷：
1. setTimeout执行时间不确定，setTimeout任务被放进异步队列中，只有当主线程上的任务执行完之后，才会检查队列任务是否需要执行，setTimeout的实际执行时间一般要比其设定的时间晚一些
2. 刷新频率受屏幕分辨率和屏幕尺寸影响，因此不同设备会不同，而setTimeout只能设置固定时间间隔,可能会引起动画卡顿


css3 transition/animation
html5 canvas


# window.requestAnimationFrame

``` js
let progress = 0;

window.requestAnimationFrame(render);

function render() {
    progress += 1; //修改图像位置
    
    if (progress < 100) {
        window.requestAnimationFrame(render);
    }
}

```

- 最大优势: 由系统决定回调函数的执行时机, 它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次
- CPU节能: setTimeout在页面被隐藏或最小化时，仍在后台执行动画任务
- 函数节流: 高频率事件(resize, scroll), 为防止在一个刷新间隔内多次函数执行, 使用requestAnimationFrame可以保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好地节省函数执行的开销。

> requestAnimationFrame存在兼容问题

