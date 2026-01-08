import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const wishlistData = useSelector((store) => store.geeks.wishlistCourse);
  const cartData = useSelector((store) => store.geeks.cartCourses);
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-indigo-600 tracking-tighter hover:text-indigo-700 transition-colors">
                Geeks<span className="text-gray-900">Kart</span>
              </span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className="group flex items-center p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              {/* SVG Heart Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 group-hover:text-red-500 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>

              {/* Hide text on very small screens if needed, otherwise show */}
              <span className="hidden sm:block ml-2 text-sm font-medium text-gray-700 group-hover:text-red-500">
                Wishlist
              </span>

              {/* Wishlist Count Badge */}
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                {wishlistData.length}
              </span>
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="group flex items-center p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 group-hover:text-indigo-600 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              <span className="hidden sm:block ml-2 text-sm font-medium text-gray-700 group-hover:text-indigo-600">
                Cart
              </span>

              {/* Cart Count Badge */}
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full">
                {cartData.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;