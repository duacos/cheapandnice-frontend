import React, { lazy, Suspense } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Beat from "./loaders/Beat";
import MainLayout from "./layouts/MainLayout";

const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login"));
const ProductViewPage = lazy(() => import("./pages/ProductView"));
const ProductListPage = lazy(() => import("./pages/ProductList"));
const CartPage = lazy(() => import("./pages/Cart"));
const RegisterPage = lazy(() => import("./pages/Register"));

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<Beat />}>
      <Switch>
        <MainLayout>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={RegisterPage} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/products" component={ProductListPage} />
          <Route exact path="/products/cart" component={CartPage} />
          <Route
            exact
            path="/products/:productId"
            component={ProductViewPage}
          />
        </MainLayout>
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Router;
