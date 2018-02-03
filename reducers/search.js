const initialState = {
  isLoading: false,
  error: null,
  results: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH":
      return {
        isLoading: true,
        error: null,
        results: []
      };
    case "SEARCH_FAIL":
      return {
        isLoading: false,
        error: action.error.response.data,
        results: [],
      };
    case "SEARCH_SUCCESS":
      return {
        isLoading: false,
        error: null,
        results: action.payload.data.data
      };
    default:
      return state;
  }
};
