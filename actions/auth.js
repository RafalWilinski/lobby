import * from './api';

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const login = async (email, password) => dispatch => {
  dispatch({ type: LOGIN_INIT });
  try {
    const payload = await api.login(email, password);
    dispatch({ type: LOGIN_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, error });
  }
};
