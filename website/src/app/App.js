import React from "react";
import "./app.scss";
import { Router, Switch, Route } from "react-router-dom";
import history from "../history";

import Nav from "../components/nav/Nav";
import HomePage from "../pages/home-page/HomePage";
import ResidentsPage from "../pages/residents-page/ResidentsPage";
import AddResidentPage from "../pages/addResident-page/AddResidentPage";

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
            <Route path="/home/add" component={AddResidentPage} />
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
