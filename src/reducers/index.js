import { combineReducers } from "redux";
// import ingredients from "./ingredients";
import recipes from "./recipes";
import specials from "./specials";

// Combine all the reducers
const rootReducer = combineReducers({
  recipes,
  specials,
});

export default rootReducer;
