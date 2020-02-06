import React from "react";
import "./app.scss";
import { Switch } from "react-router-dom";
import PrivateRoute from "../PrivateRoute"

import Nav from "../components/nav/Nav";
import Signup from "../components/signup/Signup";
import ResidentForm from "../components/residentForm/ResidentForm";
import Home from "../pages/home/Home";
import ResidentsPage from "../pages/residents-page/ResidentsPage";

function App() {
  console.log("rendering app");
  return (
    <div className="app">
      <header className="header">
        <Nav />
      </header>
      <main className="main">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/residents" component={ResidentsPage} />
          <PrivateRoute exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/add" component={ResidentForm} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
