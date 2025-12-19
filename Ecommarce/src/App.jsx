import React, { useEffect } from "react";
import Home from "../Screen/Home";
import Pdp from "../Screen/Pdp";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Cart from "../Screen/Cart";

const App = () => {

  return <div>
    <Routes>
      <Route path={`/`} element={<Home />} />
      <Route path={`/products/:productId`} element={<Pdp />} />
      <Route path={`/cart`} element={<Cart />} />
    </Routes >
  </div>;
};

export default App;