import React, { useEffect, useState } from "react";
import "./residentsPage.scss";
import { Router, Route } from "react-router-dom";
import history from "../../history";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  getApartmentsByBuildingId,
  getBuildingsByUserId
} from "../../store/actions/buildingsActions";

import Resident from "../../components/resident/Resident";
import ResidentsList from "../../components/residentList/ResidentsList";
import Modal from "../../components/modal/Modal";
import ResidentForm from "../../components/residentForm/ResidentForm";

function ResidentsPage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users, shallowEqual);
  const buildings = useSelector(state => state.buildings, shallowEqual);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  console.log("res buildings", buildings)
  
  let apartments = null

  useEffect(() => {
    console.log("page user: ", user);
    function dispatchBuildings(userId) {
      dispatch(getBuildingsByUserId(userId));
    }
    dispatchBuildings(user.user.user_id);
  }, []);

  function handleDelete(res_id) {
    // dispatch(deleteUser(res_id)); delete apartment by apartment id
    history.push("/home/apartments");
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
        <div className="edit-redisdent-form">
          <ResidentForm editUser={editUser} />
        </div>
      </Modal>
      <header className="residents-header">
        <h2 className="residents-title">Buildings page</h2>
        <p className="residents-desc">
          Here you can view add and edit buildings
        </p>
      </header>
      <main className="residents-main">
        <div className="residents-list">
          <ResidentsList buildings={buildings.buildings} />
        </div>
        <div className="residents-data">
          <Router history={history}>
            <Route
              path="/home/residents/:buildingId"
              render={props => {
                return (
                  <Resident
                    {...props}
                    handleDelete={handleDelete}
                    handleEditUser={handleEditUser}
                    building={buildings.buildings.filter(
                      building => building.building_id === props.match.params.buildingId
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
