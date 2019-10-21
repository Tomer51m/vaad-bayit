export function createUser(obj) {
  return {
    type: "CREATE_USER",
    payload: obj
  };
}

export function getUsers() {
  return async dispatch => {
    const response = await fetch("http://localhost:8080/api/users/");
    const users = await response.json();
    dispatch({
      type: "GET_USERS",
      users
    });
  };
}

export function updateUser(resident, res_id) {
  return async dispatch => {
    const response = await fetch(`http://localhost:8080/api/users/`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        res_id: res_id,
        first_name: resident.firstName,
        last_name: resident.lastName,
        apartment_number: resident.apartmentNumber,
        floor_number: resident.floorNumber,
        is_owner: resident.isOwner
      })
    });
    await response.json();
  };
}

export function deleteUser(res_id) {
  return async dispatch => {
    const response = await fetch("http://localhost:8080/api/users/", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        res_id: res_id
      })
    });
    await response.json();
    dispatch({
      type: "DELETE_USER",
      res_id
    });
  };
}
