import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <MainLayout>
        <Route exact path="/" component={Home} />
      </MainLayout>
    </Switch>
  </BrowserRouter>
);

export default Router;
