import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Ingredients from "./Ingredients";
import App from "./../App";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/ingredients" component={Ingredients} />
    </Switch>
  </BrowserRouter>
);

export default Router;
