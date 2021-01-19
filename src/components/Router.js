import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Ingredients from "./Ingredients";
import Directions from "./Directions";
import App from "../App";
import store from "../state/store";
import { Provider } from "react-redux";

const Router = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/ingredients/:recipeId" component={Ingredients} />
        <Route exact path="/directions/:recipeId" component={Directions} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Router;
