import React, { useEffect, useState } from "react";
import "./residentsList.css";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../store/actions/actions";
import Resident from "./Resident";
import ResidentForm from "./ResidentForm";

function ResidentsList() {
  const [editUser, setEditUser] = useState({
    isEdit: false,
    user: null
  });
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    function dispatchUsers() {
      dispatch(getUsers());
    }
    dispatchUsers();
  }, []);

  function handleDelete(res_id) {
    dispatch(deleteUser(res_id));
  }

  function handleEditUser(user) {
    setEditUser({
      user: user,
      isEdit: true
    });
  }

  if (!users) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="users">
        <ul>
          {users.map((user, index) => {
            return (
              <li>
                {user.first_name} {user.last_name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ResidentsList;

/* <Resident
key={index}
user={user}
handleDelete={handleDelete}
handleEditUser={handleEditUser}
/> */
