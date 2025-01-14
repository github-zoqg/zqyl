let count = 1;

class myPromise {
  constructor(executor) {
    this.count = count++;
    // 定义promise状态
    this.status = "pending";
    // 定义成功返回值
    this.value = undefined;
    // 定义失败返回值
    this.reason = undefined;
    // 成功回调函数数组
    this.onFulfilledCallbacks = [];
    // 失败回调函数数组
    this.onRejectedCallbacks = [];
    // 定义成功callbcak函数
    const resolve = (value) => {
      // 添加至微任务队列
      if (this.status === "pending") {
        queueMicrotask(() => {
          // 更改状态
          if (this.status === "pending") {
            this.status = "fulfilled";
            this.value = value;
            this.onFulfilledCallbacks.forEach((cb) => cb(this.value));
          }
        });
      }
    };
    // 定义失败callback函数
    const rejected = (reason) => {
      // 添加至微任务队列
      if (this.status == "pending") {
        queueMicrotask(() => {
          // 更改状态
          if (this.status == "pending") {
            this.ststus = "rejected";
            this.reason = reason;
            this.onRejectedCallbacks.forEach((cb) => cb(this.reason));
          }
        });
      }
    };
    executor(resolve, rejected);
    console.log(this, "promise");
  }
  // 示例then方法
  then(onFulfilled, onRejected) {
    // 将成功、失败回调函数添加到数组中
    return new myPromise((resolve, rejected) => {
      if (this.status === "pending") {
        this.onFulfilledCallbacks.push(() => {
          try {
            console.log(this, "then");
            const value = onFulfilled(this.value);
            resolve(value);
          } catch (e) {
            onRejected(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            const value = onRejected(this.reason);
            resolve(value);
          } catch (e) {
            onRejected(e);
          }
        });
      }
      // promise状态确定后
      if (this.status === "fulfilled") {
        try {
          const x = onFulfilled(this.value);
          resolve(x);
        } catch (e) {
          rejected(e);
        }
      }
      if (this.status === "rejected") {
        try {
          const x = onRejected(this.reason);
          rejected(x);
        } catch (e) {
          rejected(e);
        }
      }
    });
  }
}
let p = new myPromise((resolve, reject) => {
  // setTimeout(() => {
  resolve("success");
  // }, 1000);
})
  .then((res) => {
    console.log(1, res);
    return "then1";
  })
  .then((res) => {
    console.log(2, res);
  });
let o = new myPromise((resolve, reject) => {
  // setTimeout(() => {
  resolve("success");
  // }, 1000);
})
  .then((res) => {
    console.log(3, res);
    return "then1";
  })
  .then((res) => {
    console.log(4, res);
  });
// console.log(3, p);

// const PROMISE_STATUS_PENDING = 'pending' //定义三种状态常量
// const PROMISE_STATUS_FULFILLED = 'fulfilled'
// const PROMISE_STATUS_REJECTED = 'rejected'

// class myPromise {
//     constructor(executor) {
//         this.status = PROMISE_STATUS_PENDING
//         this.value = undefined
//         this.error = undefined
//         this.resfns = []
//         this.errfns = []

//         const resolve = ((value) => {
//             if (this.status === PROMISE_STATUS_PENDING) {
//                 queueMicrotask(() => {
//                     if (this.status !== PROMISE_STATUS_PENDING) return //避免 调用resolve 后又调用 reject 多次执行
//                     this.status = PROMISE_STATUS_FULFILLED
//                     this.value = value
//                     this.resfns.forEach(fn => {
//                         fn(this.value)
//                     })
//                 })
//             }
//         })
//         const reject = ((error) => {
//             if (this.status === PROMISE_STATUS_PENDING) {
//                 queueMicrotask(() => {
//                     if (this.status !== PROMISE_STATUS_PENDING) return
//                     this.status = PROMISE_STATUS_REJECTED
//                     this.error = error
//                     this.errfns.forEach(fn => {
//                         fn(this.error)
//                     })
//                 })
//             }
//         })
//         executor(resolve, reject)
//     }

//     then(resfn, errfn) {
//         // 1.利用抛错让下一个promise的catch帮忙处理  防止catch方法让链式调用断层
//         const defaultOnRejected = err => {
//             throw err
//         }
//         errfn = errfn || defaultOnRejected

//         const defaultOnFulfilled = value => {
//             return value
//         }
//         resfn = resfn || defaultOnFulfilled

//         return new myPromise((resolve, reject) => { //1. 直接new 一个mypromise 作为then 方法的返回值 既可实现 .then.then.thne.then.....等等链式调用

//             if (this.status === PROMISE_STATUS_FULFILLED && resfn) {
//                 try { //2. 异常处理：若成功则继续执行then链式调用 的第一个回调，失败则执行then 的第二个回调
//                     const value = resfn(this.value)
//                     resolve(value)
//                 } catch (err) {
//                     reject(err)
//                 }
//             }
//             if (this.status === PROMISE_STATUS_REJECTED && errfn) {
//                 try {
//                     const value = errfn(this.error)
//                     resolve(value)
//                 } catch (err) {
//                     reject(err)
//                 }
//             }
//             if (this.status === PROMISE_STATUS_PENDING) {
//                 if (resfn) {
//                     this.resfns.push(() => { //push 回调函数
//                         try {
//                             const value = resfn(this.value)
//                             resolve(value)
//                         } catch (err) {
//                             reject(err) //tips:****利用抛出的错误 使得下一个promise的catch帮忙处理
//                         }
//                     })
//                 }
//                 if (errfn) {
//                     this.errfns.push(() => {
//                         try {
//                             const value = errfn(this.error)
//                             resolve(value)
//                         } catch (err) {
//                             reject(err)
//                         }
//                     })
//                 }
//             }
//         })
//     }

//     catch (errfn) { //2.catch 方法
//         return this.then(undefined, errfn)
//     }

//     finally(fn) {
//         setTimeout(() => {
//             fn()
//         }, 0)
//     }
// }
