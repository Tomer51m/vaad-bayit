import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import Login from "./components/login/Login";
import * as serviceWorker from "./serviceWorker";
import ReduxThunk from "redux-thunk";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import NoMatch from "./components/no-match/NoMatch";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import allReducers from "./store/reducers/allReducers";

const store = createStore(
  allReducers,
  applyMiddleware(ReduxThunk)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => store.getState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute path="/" component={App} />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("app-root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
