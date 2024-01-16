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

const johnSummary: Summary = { name: "John" };
// const detail: Detail = johnSummary;
