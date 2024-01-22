(function () {
  function fn<T>(a: T): T {
    return a;
  }
  let num = fn(10);
  console.log(num);
  let result = fn<string>("hello");
  console.log(result);

  function fn2<T, K>(a: T, b: K) {
    console.log(b);
    return a;
  }
  fn2<string, number>("haha", 456);

  class MyClass<T> {
    name: T;
    constructor(name: T) {
      this.name = name;
    }
  }
  const mc = new MyClass<string>("孙悟空");
  console.log(mc);

  interface Inter {
    length: number;
  }
  function fn3<T extends Inter>(a: T) {
    return a.length;
  }
  console.log(fn3("123"));
  console.log(fn3([1, 2, 3, 4]));
})();
