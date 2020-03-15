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
    if (!response.ok) {
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

export function logout() {
  console.log("logout action")
  return dispatch => {
    dispatch({
      type: "LOGOUT"
    });
    history.push("/login");
  };
}

// export function deleteUser(res_id) {
//   return async dispatch => {
//     const response = await fetch("http://localhost:8080/api/users/", {
//       method: "DELETE",
//       headers: {
//         "Content-type": "application/json"
//       },
//       body: JSON.stringify({
//         res_id: res_id
//       })
//     });
//     await response.json();
//     dispatch({
//       type: "DELETE_USER",
//       res_id
//     });
//   };
// }
