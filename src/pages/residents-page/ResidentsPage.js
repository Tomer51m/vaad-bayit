import React, { useEffect, useState } from "react";
import "./residentsPage.scss";
import { Router, Route } from "react-router-dom";
import history from "../../history";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../../store/actions/actions";

import Resident from "../../components/resident/Resident";
import ResidentsList from "../../components/residentList/ResidentsList";
import Modal from "../../components/modal/Modal";
import ResidentForm from "../../components/residentForm/ResidentForm";

function ResidentsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
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
    history.push("/home/residents");
  }

  function handleEditUser(user) {
    setShowModal(true);
    setEditUser(user);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div className="residents-page">
      <Modal showModal={showModal} handleClose={handleCloseModal}>
        <ResidentForm editUser={editUser} />
      </Modal>
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
          <Router history={history}>
            <Route
              path="/home/residents/:residentId"
              render={props => {
                console.log("resident route");
                return (
                  <Resident
                    {...props}
                    handleDelete={handleDelete}
                    handleEditUser={handleEditUser}
                    user={users.filter(
                      user => user.res_id === props.match.params.residentId
                    )}
                  />
                );
              }}
            />
          </Router>
        </div>
      </main>
    </div>
  );
}

export default ResidentsPage;
