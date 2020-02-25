const initialState = {
  isAuthenticated: false,
  user: null,
  errors: null
};
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.responseData
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        isAuthenticated: false,
        error: action.responseData.error
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.responseData
      };
    case "SIGNUP_FAILED":
      return {
        ...state,
        isAuthenticated: false,
        error: action.responseData.error
      };

    default:
      return state;
  }
};

export default usersReducer;
