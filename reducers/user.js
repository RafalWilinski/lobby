import { LOGIN_START, LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/user";

const initialState = {
  userId: -1,
  accessToken: null,
  data: null,
  isLoading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.data
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: null,
        userId: action.data.userId,
        accessToken: action.data.accessToken
      };
    default:
      return state;
  }
};
