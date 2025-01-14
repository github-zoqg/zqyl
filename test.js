var name = "window";
function test() {
  console.log(this.name);
}
var obj = {
  name: "obj",
  test: test,
  temp: temp(function () {
    console.log(this.name, "temp");
  }, 1000),
};
// test(); // 'window'
// obj.test(); // 'obj'

function temp(cb, time) {
  let timer;
  console.log(this.name, "1");
  return function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(this, arguments);
      cb();
    }, time);
  };
}
obj.temp();

function jl(cb, time) {
  let flag = true;
  return function () {
    if (flag) {
      flag = false;
      cb.apply(this, arguments);
      setTimeout(() => {
        flag = true;
      }, time);
    }
  };
}

function call(target, ...args) {
  target = target || window;
  target.fn = this;
  let result = target.fn(...args);
  delete target.fn;
  return result;
}
function apply(target, args) {
  target = target || window;
  target.fn = this;
  let result = target.fn(...args);
  delete target.fn;
  return result;
}
function bind(target, ...args) {
  target = target || window;
  let fn = this;
  return function newFn() {
    if (this instanceof newFn) {
      return new fn(...args, ...arguments);
    } else {
      return call.apply(target, [].concat(Array.from(args)));
    }
  };
}
