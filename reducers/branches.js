const initialState = {
  isLoading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_BRANCHES_START":
      return {
        isLoading: true,
        error: null
      };
    case "GET_BRANCHES_FAIL":
      return {
        isLoading: false,
        error: action.error.response.data
      };
    case "GET_BRANCHES_SUCCESS":
      return {
        isLoading: false,
        error: null,
        data: action.payload.data
      };
    default:
      return state;
  }
};
