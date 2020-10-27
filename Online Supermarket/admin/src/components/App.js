import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import HomePage from "./views/HomePage/dashboard.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import CreateProduct from "./views/Products/AddProduct";
import CreateCategory from "./views/Products/CreateCategory";
import AllProducts from "./views/Products/AllProducts";
import ProductDetails from "./views/ProductDetailPage/ProductDetails";
import AdminProfile from './views/AdminProfile/profile';
import UploadProduct from './views/Products/UploadProduct';


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(HomePage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/products" component={Auth(CreateProduct, true)} />
          <Route exact path="/categories" component={Auth(CreateCategory, true)} />
          <Route exact path="/allproducts" component={Auth(AllProducts, true)} />
          <Route exact path="/product/:productId" component={Auth(ProductDetails, true)} />
          <Route exact path="/adminprofile" component={Auth(AdminProfile, true)} />
          <Route exact path="/uploadProduct/:productId" component={Auth(UploadProduct, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
