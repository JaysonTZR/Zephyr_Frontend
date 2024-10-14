import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import("./pages/home/HomePage"));
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
    </Router>
  );
}

export default App;