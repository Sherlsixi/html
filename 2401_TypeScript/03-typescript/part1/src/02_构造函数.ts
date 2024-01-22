class Dog {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  bark() {
    console.log(this.name);
  }
}
const dog1 = new Dog("小黑", 2);
const dog2 = new Dog("小白", 4);
// console.log(dog1);
// console.log(dog2);
dog2.bark();
