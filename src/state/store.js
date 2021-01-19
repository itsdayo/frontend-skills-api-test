import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "../reducers"; //Import the reducer
import { createLogger } from "redux-logger";
const rLogger = createLogger();
// Connect our store to the reducers
export default createStore(reducers, applyMiddleware(rLogger, thunk));
