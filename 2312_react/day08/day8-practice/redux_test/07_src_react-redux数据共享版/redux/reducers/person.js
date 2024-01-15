import { ADD_PERSON } from "../constant";

const initState = [{ id: "001", name: "tom", age: "18" }];
export default function personReducer(preState = initState, action) {
  const { type, personObj } = action;
  switch (type) {
    case ADD_PERSON:
      return [personObj, ...preState];

    default:
      return preState;
  }
}
