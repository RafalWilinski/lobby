import { combineReducers } from "redux";
import user from "./user";
import createThesis from "./createThesis";

export default combineReducers({
  user,
  createThesis
});
