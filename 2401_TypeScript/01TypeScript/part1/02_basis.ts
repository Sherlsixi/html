let b: number;
b = 10;
// b = "hello"; //错误
let e: unknown;
e = 10;
e = true;
e = "hello";

let s: string;
s = e as string;
s = <string>e;

type StringOrNumber = string | number;
let value: StringOrNumber;
value = 10;
value = "hello";

type Summary = { name: string };
type Detail = { name: string; age: number };
const johnDetail: Detail = { name: "John", age: 18 };
const summary: Summary = johnDetail;
const arr: Array<Summary> = [{ name: "tom" }];

const johnSummary: Summary = { name: "John" };
// const detail: Detail = johnSummary;

function fn<T>(arr: Array<T>): T {
  return arr[1];
}

type Abc<T> = {
  a: string;
  b: T;
};
const obj: Abc<number> = {
  a: "",
  b: 1,
};

class Star<T> {
  private name: T;
  private age: number;

  constructor(name: T, age: number) {
    this.name = name;
    this.age = age;
  }

  show() {
    console.log(this.name, this.age);
  }
}

const p1 = new Star<string>("ZS", 31);
p1.show();
