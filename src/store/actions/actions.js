export function createUser(obj) {
  return {
    type: "CREATE_USER",
    payload: obj
  };
}

export function getUsers() {
  return async dispatch => {
    const response = await fetch('http://localhost:8080/api/users/');
    const users = await response.json();
    dispatch({
      type: "GET_USERS",
      users
    });
  };
}

export function updateUser(obj) {
  return {
    type: "UPDATE_USER",
    payload: obj
  };
}

export function deleteUser(id) {
  return {
    type: "DELETE_USER",
    payload: id
  };
}
