import React, { useEffect, useState } from "react";
import "./residentsList.scss";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../../store/actions/actions";
import { Link, Route } from "react-router-dom";
import Resident from "../resident/Resident";
import ResidentForm from "../residentForm/ResidentForm";

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
      <div className="residentList-container">
        <div className="residentList">
          <ul className="residentUl">
            {users.map(user => {
              return (
                <li className="residentLi">
                  <Link to={`/residents/${user.res_id}`} className="residentLink">
                    {user.first_name} {user.last_name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="residentData">
          <Route exact path="/residents/:id" component={Resident} />
        </div>
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
