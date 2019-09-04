const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_USER":
      return null;
    case "GET_USERS":
      console.log("intial state", state);
      return action.users;
    default:
      return state;
  }
};

export default usersReducer;
