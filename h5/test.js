
// 每一分钟内只执行100次事件

var flag = true;
var count = 0;
function test() {
    if (count = 0) { setTimeout(function () { count = 0 }, 60000) }   // 每一分钟后,重置count
    if (count < 100) {
        count++;
        flag = true;
    } else {
        flag = false;                               // count大于100，flag关闭
    }
    if (flag) {
        console.log(123)
    };

}


// 除抖（只取最后一次事件）

var timer = null;                                   // 需为全局变量（相对于方法）
function test() {
    clearTimeout(timer);                            // 清除上次执行时生成的定时器
    timer = setTimeout(function () {
        console.log(123)
    }, 1000)                                        // 延迟1s执行

}


// 节流（每段时间执行一次）

var flag = true;
function test() {
    if (flag) {
        setTimeout(function () {
            flag = true;
        }, 3000);
        console.log(123);
        flag = false
    }
}
