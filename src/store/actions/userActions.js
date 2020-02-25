import history from "../../history";

export function signin({ email, password }) {
  return async dispatch => {
    const response = await fetch(`http://localhost:8080/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    const responseData = await response.json();
    if (response.status !== 200) {
      dispatch({
        type: "LOGIN_FAILED",
        responseData
      });
    } else {
      dispatch({
        type: "LOGIN_SUCCESS",
        responseData
      });
      history.push("/home");
    }
  };
}

export function signup(user) {
  return async dispatch => {
    const response = await fetch(`http://localhost:8080/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        passwordConfirmation: user.passwordConfirmation,
        city: user.city,
        street: user.street,
        number: user.number
      })
    });
    const responseData = await response.json();
    if (response.status !== 200) {
      dispatch({
        type: "SIGNUP_FAILED",
        responseData
      });
    } else {
      dispatch({
        type: "SIGNUP_SUCCESS",
        responseData
      });
      history.push("/home");
    }
  };
}

export function createMasterUser(user) {
  console.log("create master user", user);
  return async dispatch => {
    const response = await fetch(`http://localhost:8080/api/signup/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        passwordConfirmation: user.passwordConfirmation
      })
    });
    const newUser = await response.json();
    // dispatch({
    //   type: "CREATE_USER",
    //   newUser
    // });
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
    const updatedUser = await response.json();
    console.log("1121212", updatedUser);
    dispatch({
      type: "UPDATE_USER",
      updatedUser
    });
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
