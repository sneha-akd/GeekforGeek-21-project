
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import CartIcon from "../Icon/CartIcon";
import { useDispatch, useSelector } from "react-redux";
import { setCartProducts } from "../src/ProductSlice";



const Navbar = () => {
  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state.product.cartProducts);

  const cartItemCount = cartProducts.length;

  // useEffect(() => {
  //   console.log('cartProducts updated:', cartProducts);
  // }, [cartProducts]);



  return (
    <div className="w-full shadow-sm bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-gray-900 whitespace-nowrap"
        >
          Nova<span className="text-blue-600">Edge</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <SearchBar />
        </div>

        {/* Cart Icon */}
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative cursor-pointer">
            <CartIcon />
            <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-xs px-1.5 py-px rounded-full">
              {cartItemCount} {/* Display total cart item count */}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;