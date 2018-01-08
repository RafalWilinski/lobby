import { combineReducers } from "redux";
import user from "./user";
import apply from "./apply";
import applications from "./applications";
import theses from "./theses";
import createThesis from "./createThesis";

export default combineReducers({
  apply,
  applications,
  user,
  createThesis,
  theses
});
