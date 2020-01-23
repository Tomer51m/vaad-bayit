import React from "react";
import "./app.scss";
import { Route, Switch } from "react-router-dom";

import Nav from "../nav/Nav";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import ResidentForm from "../residentForm/ResidentForm";
import NoMatch from "../no-match/NoMatch";
import Home from "../home/Home";
import ResidentsPage from "../../pages/residents-page/ResidentsPage";
import ResidentsList from "../../components/residentList/ResidentsList";

function App() {
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
          <Route exact path="/login" component={Login} />
          <Route exact path="/add" component={ResidentForm} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
