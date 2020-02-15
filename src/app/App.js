import React from "react";
import "./app.scss";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "../history";

import Nav from "../components/nav/Nav";
import ResidentForm from "../components/residentForm/ResidentForm";
import HomePage from "../pages/home-page/HomePage";
import ResidentsPage from "../pages/residents-page/ResidentsPage";

function App() {
  return (
    <div className="app">
      <header className="header">
        <Nav />
      </header>
      <main className="main">
        <Router history={history}>
          <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route path="/home/residents" component={ResidentsPage} />
            <Route path="/home/add" component={ResidentForm} />
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
