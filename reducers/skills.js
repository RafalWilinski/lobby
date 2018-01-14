const initialState = {
  isLoading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_SKILLS_START":
      return {
        isLoading: true,
        error: null
      };
    case "GET_SKILLS_FAIL":
      return {
        isLoading: false,
        error: action.error.response.data
      };
    case "GET_SKILLS_SUCCESS":
      return {
        isLoading: false,
        error: null,
        data: action.payload.data
      };
    default:
      return state;
  }
};
