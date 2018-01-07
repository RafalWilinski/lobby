import { combineReducers } from "redux";
import user from "./user";
import apply from "./apply";
import theses from "./theses";
import createThesis from "./createThesis";

export default combineReducers({
  apply,
  user,
  createThesis,
  theses
});
