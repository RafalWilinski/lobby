import axios from "axios";

const BASE_URL = `/api`;

const client = axios.create({
  baseURL: BASE_URL,
  responseType: "json"
});

export default client;

export const login = (email, password) => ({
  type: "LOGIN",
  payload: {
    request: {
      method: "POST",
      url: "/login",
      data: {
        email,
        password
      }
    }
  }
});

export const register = (email, password) => ({
  type: "REGISTER",
  payload: {
    request: {
      method: "POST",
      url: "/register",
      data: {
        email,
        password
      }
    }
  }
});
