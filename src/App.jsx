import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthRoute from "./AuthRoute";


const HomePage = lazy(() => import("./pages/home/home"));
const AboutUs = lazy(() => import("./pages/home/about-us"));
const Profile = lazy(() => import("./pages/home/profile"));
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

const CMSContactList = lazy(() => import("./pages/cms/contact/contact-list"));
const CMSContactEdit = lazy(() => import("./pages/cms/contact/contact-edit"));

const CMSProductList = lazy(() => import("./pages/cms/product/product-list"));
const CMSProductEdit = lazy(() => import("./pages/cms/product/product-edit"));
const CMSProductEditImage = lazy(() => import("./pages/cms/product/product-edit-image"));
const CMSProductAdd = lazy(() => import("./pages/cms/product/product-add"));

const CMSDiscountList = lazy(() => import("./pages/cms/discount/discount-list"));
const CMSDiscountEdit = lazy(() => import("./pages/cms/discount/discount-edit"));
const CMSDiscountAdd = lazy(() => import("./pages/cms/discount/discount-add"));

const CMSCustomerList = lazy(() => import("./pages/cms/customer/customer-list"));
const CMSCustomerEdit = lazy(() => import("./pages/cms/customer/customer-edit"));

const CMSOrderList = lazy(() => import("./pages/cms/order/order-list"));
const CMSOrderDetail = lazy(() => import("./pages/cms/order/order-detail"));
const CMSOrderDetailEdit = lazy(() => import("./pages/cms/order/order-detail-edit"));

const CMSUserList = lazy(() => import("./pages/cms/user/user-list"));
const CMSUserEdit = lazy(() => import("./pages/cms/user/user-edit"));
const CMSUserAdd = lazy(() => import("./pages/cms/user/user-add"));


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ShopProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* CMS Start Here */}
        <Route path="/cms" element={<CMSLogin />} />
        <Route
          path="/cms/dashboard"
          element={
            <AuthRoute requiredAccess="Dashboard">
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
          path="/cms/contact/list"
          element={
            <AuthRoute>
              <CMSContactList requiredAccess="Manage Contact"/>
            </AuthRoute>
          }
        />
        <Route
          path="/cms/contact/edit/:id"
          element={
            <AuthRoute>
              <CMSContactEdit requiredAccess="Manage Contact"/>
            </AuthRoute>
          }
        />

        <Route
          path="/cms/category/list"
          element={
            <AuthRoute>
              <CMSCategoryList requiredAccess="Manage Category"/>
            </AuthRoute>
          }
        />
        <Route
          path="/cms/category/edit/:id"
          element={
            <AuthRoute>
              <CMSCategoryEdit requiredAccess="Manage Category"/>
            </AuthRoute>
          }
        />
        <Route
          path="/cms/category/add"
          element={
            <AuthRoute>
              <CMSCategoryAdd requiredAccess="Manage Category"/>
            </AuthRoute>
          }
        />

        <Route
          path="/cms/product/list"
          element={
            <AuthRoute>
              <CMSProductList requiredAccess="Manage Product"/>
            </AuthRoute>
          }
        />
        <Route
          path="/cms/product/edit/:id"
          element={
            <AuthRoute>
              <CMSProductEdit requiredAccess="Manage Product"/>
            </AuthRoute>
          }
        />
        <Route
          path="/cms/product/edit-image/:id"
          element={
            <AuthRoute>
              <CMSProductEditImage requiredAccess="Manage Product"/>
            </AuthRoute>
          }
        />
        <Route
          path="/cms/product/add"
          element={
            <AuthRoute>
              <CMSProductAdd requiredAccess="Manage Product"/>
            </AuthRoute>
          }
        />

        <Route
          path="/cms/discount/list"
          element={
            <AuthRoute>
              <CMSDiscountList requiredAccess="Manage Discount"/>
            </AuthRoute>
          }
        />
        <Route
          path="/cms/discount/edit/:id"
          element={
            <AuthRoute>
              <CMSDiscountEdit requiredAccess="Manage Discount"/>
            </AuthRoute>
          }
        />
        <Route
          path="/cms/discount/add"
          element={
            <AuthRoute>
              <CMSDiscountAdd requiredAccess="Manage Discount"/>
            </AuthRoute>
          }
        />

        <Route
          path="/cms/customer/list"
          element={
            <AuthRoute>
              <CMSCustomerList requiredAccess="Manage Customer"/>
            </AuthRoute>
          }
        />
        <Route
          path="/cms/customer/edit/:id"
          element={
            <AuthRoute>
              <CMSCustomerEdit requiredAccess="Manage Customer"/>
            </AuthRoute>
          }
        />

        <Route
          path="/cms/order/list"
          element={
            <AuthRoute>
              <CMSOrderList requiredAccess="Manage Order"/>
            </AuthRoute>
          }
        />
        <Route
          path="/cms/order/detail/:id"
          element={
            <AuthRoute>
              <CMSOrderDetail requiredAccess="Manage Order"/>
            </AuthRoute>
          }
        />
        <Route
          path="/cms/order/detail/edit/:id"
          element={
            <AuthRoute>
              <CMSOrderDetailEdit requiredAccess="Manage Order"/>
            </AuthRoute>
          }
        />

        <Route
          path="/cms/user/list"
          element={
            <AuthRoute>
              <CMSUserList requiredAccess="Manage User"/>
            </AuthRoute>
          }
        />
        <Route
          path="/cms/user/edit/:id"
          element={
            <AuthRoute>
              <CMSUserEdit requiredAccess="Manage User"/>
            </AuthRoute>
          }
        />
        <Route
          path="/cms/user/add"
          element={
            <AuthRoute>
              <CMSUserAdd requiredAccess="Manage User"/>
            </AuthRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
