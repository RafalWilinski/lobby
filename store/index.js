import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import axiosMiddleware from "redux-axios-middleware";
import apiClient from "../actions/api";
import reducers from "../reducers";

export const initStore = () =>
  createStore(reducers, {}, applyMiddleware(thunk, axiosMiddleware(apiClient)));
