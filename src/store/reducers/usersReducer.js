const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_USER":
      return [...state, action.user];
    case "GET_USERS":
      return action.users;
    case "DELETE_USER":
      return state.filter(user => user.res_id !== action.res_id);
    case "UPDATE_USER":
      return state.map(user => {
        if (user.res_id === action.updatedUser.res_id) {
          return action.updatedUser;
        } else {
          return user;
        }
      });
    default:
      return state;
  }
};

export default usersReducer;