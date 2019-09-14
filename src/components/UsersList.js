import React, { useEffect } from "react";
import "./usersList.css";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../store/actions/actions";

function UsersList() {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    async function dispatchUsers() {
      dispatch(getUsers());
    }
    dispatchUsers();
  }, []);
  if (!users) {
    return <div className="loading">Loading...</div>;
  } else {
    return (
      <div className="users">
        <ul className="users_list">
          {users.map(user => {
            return (
              <li className="users_item" id={user.id} key={user.id}>
                <a href={"#" + user.id} className="users_title">
                  {user.first_name} {user.last_name}
                </a>
                <div className="users_subItem">
                  <span>Apartment: {user.apartment_number}</span>
                  <span>Floor: {user.floor_number}</span>
                  <span>Owner: {user.is_owner ? "Yes" : "No"}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default UsersList;
