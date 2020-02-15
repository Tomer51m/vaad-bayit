const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_USER":
      return [...state, action.newUser];
    case "GET_USERS":
      return action.users;
    case "DELETE_USER":
      return state.filter(user => user.res_id !== action.res_id);
    case "UPDATE_USER":
      console.table(state)
      console.log("action updated user",action.updatedUser)

      let map = state.map(user => {
        if (user.res_id === action.updatedUser.res_id) {
          console.log("map function user",user)
          return action.updatedUser;
        } else {
          return user;
        }
      });
      console.table(state)
      return map
    default:
      return state;
  }
};

export default usersReducer;