import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Ingredients from "./Ingredients";
import Directions from "./Directions";
import App from "../App";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/ingredients" component={Ingredients} />
      <Route exact path="/directions" component={Directions} />
    </Switch>
  </BrowserRouter>
);

export default Router;
