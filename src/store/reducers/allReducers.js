import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import apartmentsReducer from "./aprartmentsReducer";

const allReducers = combineReducers({
  users: usersReducer,
  apartments: apartmentsReducer
});

export default allReducers;
