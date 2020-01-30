import React from "react";
import "./app.scss";
import { Switch, Route } from "react-router-dom";

import Nav from "../nav/Nav";
import ProtectedRoute from "../../ProtectedRoute";
import Signup from "../signup/Signup";
import ResidentForm from "../residentForm/ResidentForm";
import Home from "../home/Home";
import ResidentsPage from "../../pages/residents-page/ResidentsPage";

function App() {
  console.log("rendering app");
  return (
    <div className="app">
      <header className="header">
        <Nav />
      </header>
      <main className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/residents" component={ResidentsPage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/add" component={ResidentForm} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
