const initialState = {
  userId: -1,
  accessToken: null,
  data: null,
  isLoading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error.response.data
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload.data));

      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        error: null,
        userId: action.payload.data.user.id,
        accessToken: action.payload.data.token
      };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
};
