import React, { lazy, Suspense } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

// This allows me to load multiple layouts
const LayoutComponent = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <MainLayout>
          <Component {...props} />
        </MainLayout>
      )}
    />
  );
};

const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login"));
const ProductViewPage = lazy(() => import("./pages/ProductView"));
const ProductList = lazy(() => import("./pages/ProductList"));

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <LayoutComponent exact path="/" component={HomePage} />

        <Route exact path="/login" component={LoginPage} />
        <LayoutComponent
          exact
          path="/products/:productId"
          component={ProductViewPage}
        />

        <LayoutComponent exact path="/products" component={ProductList} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Router;
