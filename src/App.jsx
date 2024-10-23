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
const CMSLogin = lazy(() => import("./pages/cms/login"));
const Dashboard = lazy(() => import("./pages/cms/dashboard/dashboard"));

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
    </Router>
  );
}

export default App;