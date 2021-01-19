import { combineReducers } from "redux";
// import ingredients from "./ingredients";
import recipes from "./recipes";
import ingredients from "./ingredients";
// Combine all the reducers
const rootReducer = combineReducers({
  ingredients,
  recipes,
});

export default rootReducer;
