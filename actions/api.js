import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const LOGIN_URL = `${BASE_URL}/login`;
const LOGIN_URL = `${BASE_URL}/register`;

export const login = (email, password) =>
  axios.post(LOGIN_URL, {
    email,
    password
  });

export const register = (email, name, password) =>
  axios.post(REGISTER_URL, {
    email,
    name,
    password
  });
