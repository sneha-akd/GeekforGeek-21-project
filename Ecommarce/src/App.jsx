import React from "react";
import Home from "../Screen/Home";
import Pdp from "../Screen/Pdp";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Cart from "../Screen/Cart";
import { basename } from "./Store";

const App = () => {

  return <div>
    <Routes basename={basename}>
      <Route path={`${basename}/`} element={<Home />} />
      <Route path={`${basename}/products/:productId`} element={<Pdp />} />
      <Route path={`${basename}/cart`} element={<Cart />} />
    </Routes >
  </div>;
};

export default App;