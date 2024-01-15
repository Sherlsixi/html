import { ADD_PERSON } from "../constant";

export const addPerson = (personObj) => ({
  type: ADD_PERSON,
  personObj,
});
