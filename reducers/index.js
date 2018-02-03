import { combineReducers } from "redux";
import user from "./user";
import apply from "./apply";
import applications from "./applications";
import theses from "./theses";
import createThesis from "./createThesis";
import branches from "./branches";
import skills from "./skills";
import search from "./search";

export default combineReducers({
  apply,
  applications,
  user,
  createThesis,
  theses,
  branches,
  skills,
  search
});
