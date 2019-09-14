import React from "react";
import "./App.css";
import UsersList from "./components/UsersList";
import AddResidentsForm from './components/AddResidentsForm';

function App() {
  return (
    <div className="App">
      <UsersList />
      <AddResidentsForm />
    </div>
  );
}

export default App;
