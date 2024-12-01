import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthRoute from "./AuthRoute";


const HomePage = lazy(() => import("./pages/home/home"));
const AboutUs = lazy(() => import("./pages/home/about-us"));
const Shop = lazy(() => import("./pages/shop/shop"));
const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/register"));
const ShopProduct = lazy(() => import("./pages/shop/shop-product"));
const Cart = lazy(() => import("./pages/shop/cart/cart"));
const Checkout = lazy(() => import("./pages/shop/checkout/checkout"));
const Contact = lazy(() => import("./pages/contact/contact"));
const Wishlist = lazy(() => import("./pages/shop/wishlist/wishlist"));


//CMS
const CMSLogin = lazy(() => import("./pages/cms/login"));
const Dashboard = lazy(() => import("./pages/cms/dashboard/dashboard"));
const CMSProfile = lazy(() => import("./pages/cms/profile"));

const CMSCategoryList = lazy(() => import("./pages/cms/category/category-list"));
const CMSCategoryEdit = lazy(() => import("./pages/cms/category/category-edit"));
const CMSCategoryAdd = lazy(() => import("./pages/cms/category/category-add"));

const CMSProductList = lazy(() => import("./pages/cms/product/product-list"));
const CMSProductEdit = lazy(() => import("./pages/cms/product/product-edit"));
const CMSProductAdd = lazy(() => import("./pages/cms/product/product-add"));

const CMSDiscountList = lazy(() => import("./pages/cms/discount/discount-list"));
const CMSDiscountEdit = lazy(() => import("./pages/cms/discount/discount-edit"));
const CMSDiscountAdd = lazy(() => import("./pages/cms/discount/discount-add"));

const CMSCustomerList = lazy(() => import("./pages/cms/customer/customer-list"));
const CMSCustomerEdit = lazy(() => import("./pages/cms/customer/customer-edit"));
const CMSCustomerAdd = lazy(() => import("./pages/cms/customer/customer-add"));

const CMSOrderList = lazy(() => import("./pages/cms/order/order-list"));
const CMSOrderEdit = lazy(() => import("./pages/cms/order/order-edit"));
const CMSOrderAdd = lazy(() => import("./pages/cms/order/order-add"));

const CMSUserList = lazy(() => import("./pages/cms/user/user-list"));
const CMSUserEdit = lazy(() => import("./pages/cms/user/user-edit"));
const CMSUserAdd = lazy(() => import("./pages/cms/user/user-add"));


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product" element={<ShopProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* CMS Start Here */}
        <Route path="/cms" element={<CMSLogin />} />
        <Route
          path="/cms/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/cms/profile"
          element={
            <AuthRoute>
              <CMSProfile />
            </AuthRoute>
          }
        />

        <Route
          path="/cms/category/list"
          element={
            <AuthRoute>
              <CMSCategoryList />
            </AuthRoute>
          }
        />
        <Route
          path="/cms/category/edit"
          element={
            <AuthRoute>
              <CMSCategoryEdit />
            </AuthRoute>
          }
        />
        <Route
          path="/cms/category/add"
          element={
            <AuthRoute>
              <CMSCategoryAdd />
            </AuthRoute>
          }
        />

        <Route
          path="/cms/product/list"
          element={
            <AuthRoute>
              <CMSProductList />
            </AuthRoute>
          }
        />
        <Route
          path="/cms/product/edit"
          element={
            <AuthRoute>
              <CMSProductEdit />
            </AuthRoute>
          }
        />
        <Route
          path="/cms/product/add"
          element={
            <AuthRoute>
              <CMSProductAdd />
            </AuthRoute>
          }
        />

        <Route
          path="/cms/discount/list"
          element={
            <AuthRoute>
              <CMSDiscountList />
            </AuthRoute>
          }
        />
        <Route
          path="/cms/discount/edit"
          element={
            <AuthRoute>
              <CMSDiscountEdit />
            </AuthRoute>
          }
        />
        <Route
          path="/cms/discount/add"
          element={
            <AuthRoute>
              <CMSDiscountAdd />
            </AuthRoute>
          }
        />

        <Route
          path="/cms/customer/list"
          element={
            <AuthRoute>
              <CMSCustomerList />
            </AuthRoute>
          }
        />
        <Route
          path="/cms/customer/edit"
          element={
            <AuthRoute>
              <CMSCustomerEdit />
            </AuthRoute>
          }
        />
        <Route
          path="/cms/customer/add"
          element={
            <AuthRoute>
              <CMSCustomerAdd />
            </AuthRoute>
          }
        />

        <Route
          path="/cms/order/list"
          element={
            <AuthRoute>
              <CMSOrderList />
            </AuthRoute>
          }
        />
        <Route
          path="/cms/order/edit"
          element={
            <AuthRoute>
              <CMSOrderEdit />
            </AuthRoute>
          }
        />
        <Route
          path="/cms/order/add"
          element={
            <AuthRoute>
              <CMSOrderAdd />
            </AuthRoute>
          }
        />

        <Route
          path="/cms/user/list"
          element={
            <AuthRoute>
              <CMSUserList />
            </AuthRoute>
          }
        />
        <Route
          path="/cms/user/edit"
          element={
            <AuthRoute>
              <CMSUserEdit />
            </AuthRoute>
          }
        />
        <Route
          path="/cms/user/add"
          element={
            <AuthRoute>
              <CMSUserAdd />
            </AuthRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
