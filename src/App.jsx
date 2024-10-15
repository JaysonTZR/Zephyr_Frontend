import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Cart from "./pages/shop/cart/cart";
import Checkout from "./pages/shop/checkout/checkout";

const HomePage = lazy(() => import("./pages/home/home-page"));
const Shop = lazy(() => import("./pages/shop/shop"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
    </Router>
  );
}

export default App;