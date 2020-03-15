import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import buildingsReducer from "./buildingsReducer";

const allReducers = combineReducers({
  users: usersReducer,
  buildings: buildingsReducer
});

export default allReducers;
