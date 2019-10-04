import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UsersList from "./components/UsersList";
import ResidentForm from "./components/ResidentForm";

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/" component={UsersList} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/add" component={ResidentForm} />
      </Switch>
    </div>
  );
}

export default App;
