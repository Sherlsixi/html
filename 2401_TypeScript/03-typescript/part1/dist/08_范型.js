"use strict";
(function () {
    function fn(a) {
        return a;
    }
    let num = fn(10);
    console.log(num);
    let result = fn("hello");
    console.log(result);
    function fn2(a, b) {
        console.log(b);
        return a;
    }
    fn2("haha", 456);
    class MyClass {
        constructor(name) {
            this.name = name;
        }
    }
    const mc = new MyClass("孙悟空");
    console.log(mc);
    function fn3(a) {
        return a.length;
    }
    console.log(fn3("123"));
    console.log(fn3([1, 2, 3, 4]));
})();
