import { combineReducers } from "redux";
import changeData from "./changeData";

// Combine all the reducers
const rootReducer = combineReducers({
  changeData,
});

export default rootReducer;
