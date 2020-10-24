const initialState = {
  isAuthenticated: false,
  user: null,
  error: null
};
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.responseData,
        error: null
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.responseData.error
      };
    case "LOGOUT":
      console.log("logout reducer")
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: "logged out"
      }
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.responseData,
        error: null
      };
    case "SIGNUP_FAILED":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.responseData.error
      };

    default:
      return state;
  }
};

export default usersReducer;
