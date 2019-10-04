const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_USER":
      return null;
    case "GET_USERS":
      return action.users;
    case "DELETE_USER":
      return state.filter(user => user.res_id !== action.res_id);
    default:
      return state;
  }
};

export default usersReducer;
