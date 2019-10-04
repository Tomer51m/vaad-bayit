import React, { useEffect, useState } from "react";
import "./usersList.css";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../store/actions/actions";
import Resident from "./Resident";

function UsersList() {
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

  if (!users) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="users">
        {users.map((user, index) => {
          return (
            <Resident key={index} user={user} handleDelete={handleDelete} />
          );
        })}
      </div>
    );
  }
}

export default UsersList;
