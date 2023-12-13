/**
 * 目标：基于 ECMAScript 标准语法，"命名"导入，工具属性和方法使用
 */
// 命名导入
// import {baseURL, getArraySum} from './utils.js'
// console.log(obj)
// console.log(baseURL)
// console.log(getArraySum)
// const result = getArraySum([10, 21, 33])
// console.log(result)
import { utils } from "./utils.js";
console.log(utils);
console.log(utils.url);
const result = utils.arraySum([10, 20, 10]);
console.log(result);
