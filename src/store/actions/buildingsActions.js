import buildingsReducer from "../reducers/buildingsReducer";

export function getBuildingsByUserId(userId) {
  return async dispatch => {
    const response = await fetch(
      `http://localhost:8080/api/buildings/${userId}`
    );
      console.log(response)
    if (response.status !== 200) {
      return;
    }
    const buildings = await response.json();
    dispatch({
      type: "GET_BUILDINGS",
      buildings
    });
  };
}

export function getApartmentsByBuildingId(buildingId) {
  return async dispatch => {
    const response = await fetch(
      `http://localhost:8080/api/apartments/${buildingId}`
    );
      console.log(response)
    if (response.status !== 200) {
      return;
    }
    const apartments = await response.json();
    console.table(apartments)
    dispatch({
      type: "GET_BUILDING_APARTMENTS",
      apartments
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
