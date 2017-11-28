import * as api from "./api";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const LOGOUT = "LOGOUT";

export const login = async (email, password) => async dispatch => {
  dispatch({ type: LOGIN_START });

  try {
    const payload = await api.login(email, password);
    dispatch({ type: LOGIN_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, error });
  }
};

export const register = async (email, password) => async dispatch => {
  dispatch({ type: REGISTER_START });

  try {
    const payload = await api.register(email, password);
    dispatch({ type: REGISTER_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, error });
  }
};
