import React, { useEffect, useState } from "react";
import "./residentsPage.scss";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../../store/actions/actions";

import Resident from "../../components/resident/Resident";
import ResidentsList from "../../components/residentList/ResidentsList";

function ResidentsPage(props) {
  console.log("rendering resident page")
  console.log("resident page props:", props)
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
    props.history.push("/residents");
  }

  function handleEditUser(user) {
    setEditUser({
      user: user,
      isEdit: true
    });
  }

  return (
    <div className="residents-page">
      <header className="residents-header">
        <h2 className="residents-title">Residents page</h2>
        <p className="residents-desc">
          Here you can view add and edit residents
        </p>
      </header>
      <main className="residents-main">
        <div className="residents-list">
          <ResidentsList users={users} />
        </div>
        <div className="residents-data">
          <Route
            path="/residents/:residentId"
            render={ () => { 
            console.log("resident route")
              return <Resident
                {...props}
                handleDelete={handleDelete}
                user={users.filter(
                  user => user.res_id === props.match.params.residentId
                )}
              />}
            }
          />
        </div>
      </main>
    </div>
  );
}

export default ResidentsPage;
// export default withRouter(ResidentsPage);
