const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_USER":
      return null;
    case "GET_USERS":
      return action.users;
    default:
      return state;
  }
};

export default usersReducer;
