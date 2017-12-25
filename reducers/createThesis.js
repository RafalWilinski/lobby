const initialState = {
  isLoading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "THESIS_CREATE":
      return {
        isLoading: true,
        error: null
      };
    case "THESIS_CREATE_FAIL":
      return {
        isLoading: false,
        error: action.error.response.data
      };
    case "THESIS_CREATE_SUCCESS":
      return {
        isLoading: false,
        error: null
      };
    default:
      return state;
  }
};
