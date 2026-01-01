import React from "react";
import Home from "./screen/Home";
import RestaurantDetailas from "./screen/RestaurantDetails";
import Cart from "./screen/Cart";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurant/:id" element={<RestaurantDetailas />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default App;