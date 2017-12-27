import axios from "axios";

const BASE_URL = `/api`;

const client = axios.create({
  baseURL: BASE_URL,
  responseType: "json"
});

export default client;

export const login = (login, password) => ({
  type: "LOGIN",
  payload: {
    request: {
      method: "POST",
      url: "/login",
      data: {
        login,
        password
      }
    }
  }
});

export const register = (login, password) => ({
  type: "REGISTER",
  payload: {
    request: {
      method: "POST",
      url: "/register",
      data: {
        login,
        password
      }
    }
  }
});

export const createThesis = (thesis, roles) => ({
  type: "THESIS_CREATE",
  payload: {
    request: {
      method: "POST",
      url: "/thesis",
      data: {
        thesis,
        roles
      }
    }
  }
});

export const getTheses = userLogin => ({
  type: "GET_THESES",
  payload: {
    request: {
      method: "GET",
      url: `/user/theses?userLogin=${userLogin}`
    }
  }
});
