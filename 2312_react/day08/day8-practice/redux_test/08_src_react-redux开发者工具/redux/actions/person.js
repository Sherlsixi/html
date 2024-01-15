import { ADD_PERSON } from "../constant";

export const createAddPersonAction = (personObj) => ({
  type: ADD_PERSON,
  personObj,
});
