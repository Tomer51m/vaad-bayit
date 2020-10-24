import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";
import ReduxThunk from "redux-thunk";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NoMatch from "./components/no-match/NoMatch";
import LoginPage from "./pages/login-page/LoginPage";
import SignupPage from "./pages/signup-page/SignupPage";
import history from "./history";

//store
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import allReducers from "./store/reducers/allReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import LandingPage from "./pages/landing-page/LandingPage";

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

store.subscribe(() => store.getState());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <PrivateRoute path="/home" component={App} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/" component={LandingPage} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("app-root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
