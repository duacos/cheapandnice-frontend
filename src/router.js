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

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<Beat />}>
      <Switch>
        <LayoutComponent exact path="/login" component={LoginPage} />
        <LayoutComponent exact path="/signup" component={RegisterPage} />
        <LayoutComponent exact path="/" component={HomePage} />
        <LayoutComponent exact path="/products" component={ProductListPage} />
        <LayoutComponent exact path="/products/cart" component={CartPage} />
        <LayoutComponent
          exact
          path="/products/:productId"
          component={ProductViewPage}
        />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Router;
