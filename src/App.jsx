import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

const HomePage = lazy(() => import("./pages/home/home-page"));
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
const CMSUserList = lazy(() => import("./pages/cms/user/user-list"));
const CMSUserEdit = lazy(() => import("./pages/cms/user/user-edit"));
const CMSUserAdd = lazy(() => import("./pages/cms/user/user-add"));
const CMSProductList = lazy(() => import("./pages/cms/product/product-list"));
const CMSProductEdit = lazy(() => import("./pages/cms/product/product-edit"));
const CMSProductAdd = lazy(() => import("./pages/cms/product/product-add"));
const CMSOrderList = lazy(() => import("./pages/cms/order/order-list"));
const CMSOrderEdit = lazy(() => import("./pages/cms/order/order-edit"));
const CMSOrderAdd = lazy(() => import("./pages/cms/order/order-add"));
const CMSCustomerList = lazy(() => import("./pages/cms/customer/customer-list"));
const CMSCustomerEdit = lazy(() => import("./pages/cms/customer/customer-edit"));
const CMSCustomerAdd = lazy(() => import("./pages/cms/customer/customer-add"));
const CMSCategoryList = lazy(() => import("./pages/cms/category/category-list"));
const CMSCategoryEdit = lazy(() => import("./pages/cms/category/category-edit"));
const CMSCategoryAdd = lazy(() => import("./pages/cms/category/category-add"));


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route path="/shop" element={<Shop />} />
      </Routes>
      <Routes>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Routes>
        <Route path="/product" element={<ShopProduct />} />
      </Routes>
      <Routes>
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Routes>
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>

      {/* CMS Start Here */}
      <Routes>
        <Route path="/cms" element={<CMSLogin />} />
      </Routes>
      <Routes>
        <Route path="/cms/dashboard" element={<Dashboard />} />
      </Routes>
      <Routes>
        <Route path="/cms/profile" element={<CMSProfile />} />
      </Routes>
      <Routes>
        <Route path="/cms/user/list" element={<CMSUserList />} />
      </Routes>
      <Routes>
        <Route path="/cms/user/edit" element={<CMSUserEdit />} />
      </Routes>
      <Routes>
        <Route path="/cms/user/add" element={<CMSUserAdd />} />
      </Routes>
      <Routes>
        <Route path="/cms/product/list" element={<CMSProductList />} />
      </Routes>
      <Routes>
        <Route path="/cms/product/edit" element={<CMSProductEdit />} />
      </Routes>
      <Routes>
        <Route path="/cms/product/add" element={<CMSProductAdd />} />
      </Routes>
      <Routes>
        <Route path="/cms/order/list" element={<CMSOrderList />} />
      </Routes>
      <Routes>
        <Route path="/cms/order/edit" element={<CMSOrderEdit />} />
      </Routes>
      <Routes>
        <Route path="/cms/order/add" element={<CMSOrderAdd />} />
      </Routes>
      <Routes>
        <Route path="/cms/customer/list" element={<CMSCustomerList />} />
      </Routes>
      <Routes>
        <Route path="/cms/customer/edit" element={<CMSCustomerEdit />} />
      </Routes>
      <Routes>
        <Route path="/cms/customer/add" element={<CMSCustomerAdd />} />
      </Routes>
      <Routes>
        <Route path="/cms/category/list" element={<CMSCategoryList />} />
      </Routes>
      <Routes>
        <Route path="/cms/category/edit" element={<CMSCategoryEdit />} />
      </Routes>
      <Routes>
        <Route path="/cms/category/add" element={<CMSCategoryAdd />} />
      </Routes>
    </Router>
  );
}

export default App;