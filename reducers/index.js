import { combineReducers } from "redux";
import user from "./user";
import theses from "./theses";
import createThesis from "./createThesis";

export default combineReducers({
  user,
  createThesis,
  theses
});
