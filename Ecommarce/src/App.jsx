import React from "react";
import Home from "../Screen/Home";
import Pdp from "../Screen/Pdp";
import { Routes, Route } from "react-router-dom";
import Cart from "../Screen/Cart";

const App = () => {
  const mode = process.env.NODE_ENV;

  return (
    // <Routes basename={mode === "development" ? "/" : "/GeekforGeek-21-project/Ecommarce/dist/"}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:productId" element={<Pdp />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default App;