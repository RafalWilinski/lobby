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

export const register = (user) => ({
  type: "REGISTER",
  payload: {
    request: {
      method: "POST",
      url: "/register",
      data: {
        user
      }
    }
  }
});

export const updateUser = user => ({
  type: "USER_UPDATE",
  payload: {
    request: {
      method: "POST",
      url: "/user/update",
      data: {
        user
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

export const getBranches = userLogin => ({
  type: "GET_BRANCHES",
  payload: {
    request: {
      method: "GET",
      url: `/user/branches?userLogin=${userLogin}`
    }
  }
});

export const getSkills = userLogin => ({
  type: "GET_SKILLS",
  payload: {
    request: {
      method: "GET",
      url: `/user/skills?userLogin=${userLogin}`
    }
  }
});

export const apply = (roleId, login, description) => ({
  type: "APPLY",
  payload: {
    request: {
      method: "POST",
      url: "/thesis/apply",
      data: {
        roleId,
        login,
        description
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

export const getApplications = userLogin => ({
  type: "GET_APPLICATIONS",
  payload: {
    request: {
      method: "GET",
      url: `/user/applications?userLogin=${userLogin}`
    }
  }
});

export const getThesisApplications = thesisId => ({
  type: "GET_THESIS_APPLICATIONS",
  payload: {
    request: {
      method: "GET",
      url: `/thesis/applications?thesisId=${thesisId}`
    }
  }
});

export const search = (params) => {
  const paramArr = [];
  Object.keys(params).map((paramName) => {
    paramArr.push(`${paramName}=${params[paramName]}`)
  })

  return {
    type: "SEARCH",
    payload: {
      request: {
        method: "GET",
        url: `/thesis/search?${paramArr.join('&')}`
      }
    }
  }
};
