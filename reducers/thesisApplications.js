const initialState = {
  isLoading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_THESIS_APPLICATIONS":
      return {
        isLoading: true,
        error: null
      };
    case "GET_THESIS_APPLICATIONS_FAIL":
      return {
        isLoading: false,
        error: action.error.response.data
      };
    case "GET_THESIS_APPLICATIONS_SUCCESS":
      return {
        isLoading: false,
        error: null,
        data: action.payload.data
      };
    default:
      return state;
  }
};
