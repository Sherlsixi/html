(function () {
  class Person {
    private _name: string;
    private _age: number;
    constructor(name: string, age: number) {
      this._name = name;
      this._age = age;
    }
    /* getName() {
      return this._name;
    }
    setName(value: string) {
      this._name = value;
    }
    getAge() {
      return this._age;
    }
    setAge(value: number) {
      if (value >= 0) {
        this._age = value;
      }
    } */

    get name() {
      return this._name;
    }
    set name(value: string) {
      this._name = value;
    }
    get age() {
      return this._age;
    }
    set age(value: number) {
      if (value >= 0) {
        this._age = value;
      }
    }
  }

  const per = new Person("孙悟空", 18);

  // per._name = "猪八戒";
  // per._age = 28;

  /* console.log(per.getName());
  per.setName("猪八戒");
  per.setAge(39); */

  /* console.log(per.name);
  per.name = "猪八戒";
  per.age = -12; */

  console.log(per);

  class A {
    protected name: string;
    protected age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }
  class B extends A {
    test() {
      console.log(this.name);
    }
  }
  const b = new B("abc", 11);

  // b.age = 33;
  // console.log(b.age);
  b.test();
  console.log(b);

  /* class C {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  } */
  class C {
    constructor(public name: string, public age: number) {}
  }
  const c = new C("小明", 15);
  console.log(c);
})();
