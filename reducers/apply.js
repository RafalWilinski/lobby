const initialState = {
  isLoading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "APPLY":
      return {
        isLoading: true,
        error: null
      };
    case "APPLY_FAIL":
      return {
        isLoading: false,
        error: action.error.response.data
      };
    case "APPLY_SUCCESS":
      return {
        isLoading: false,
        error: null,
        data: action.payload.data
      };
    default:
      return state;
  }
};
