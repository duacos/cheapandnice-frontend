import React, { lazy, Suspense } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import MainLayout from "./layouts/MainLayout";

const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login"));
const ProductViewPage = lazy(() => import("./pages/ProductView"));
const ProductListPage = lazy(() => import("./pages/ProductList"));
const CartPage = lazy(() => import("./pages/Cart"));

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
    <Suspense
      fallback={
        <BeatLoader
          size={50}
          css={`
            margin: 0 auto;
            width: 12em;
            text-align: center;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            right: 0;
          `}
          color={"#f4ebb2"}
          loading={true}
        />
      }
    >
      <Switch>
        <Route exact path="/login" component={LoginPage} />
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
