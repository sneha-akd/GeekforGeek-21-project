import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useFetchCourseData } from "../hooks";
import { removeFromCartCourse, addToWishlistCourse } from "../store/geeksSlice";

const Cart = () => {
  useFetchCourseData();
  const cartData = useSelector((store) => store.geeks.cartCourses);
  const dispatch = useDispatch();

  const totalAmount = cartData.reduce((acc, course) => acc + course.price, 0);
  const tax = totalAmount * 0.18;
  const finalTotal = totalAmount + tax;

  const handleRemove = (id) => {
    dispatch(removeFromCartCourse(id));
    console.log("Remove item:", id);
  };

  const handleMoveToWishlist = (id) => {
    dispatch(addToWishlistCourse(id));
    handleRemove(id);
  };

  if (cartData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-gray-100">
          <div className="bg-indigo-50 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added any courses yet.
          </p>
          <Link
            to="/"
            className="block w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT COLUMN: Cart Items */}
          <div className="lg:w-2/3 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">
                  {cartData.length} Course{cartData.length > 1 ? "s" : ""} in
                  Cart
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                {cartData.map((course) => (
                  <div
                    key={course.id}
                    className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50 transition-colors"
                  >
                    {/* Image */}
                    <div className="w-full sm:w-32 h-20 flex-shrink-0">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover rounded-md border border-gray-200"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link
                            to={`/course/${course.id}`}
                            className="text-lg font-bold text-gray-900 hover:text-indigo-600 line-clamp-2"
                          >
                            {course.title}
                          </Link>
                          <span className="text-lg font-bold text-indigo-600 ml-4">
                            ${course.price}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          By {course.instructor}
                        </p>
                        <div className="flex items-center mt-2 text-sm text-yellow-500">
                          <span className="font-bold mr-1">
                            {course.rating}
                          </span>
                          <span>★</span>
                          <span className="text-gray-400 ml-2">
                            ({course.studentsEnrolled?.toLocaleString()}{" "}
                            ratings)
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-4">
                        <button
                          onClick={() => handleRemove(course.id)}
                          className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Remove
                        </button>
                        <button
                          onClick={() => handleMoveToWishlist(course.id)}
                          className="text-sm text-gray-500 hover:text-gray-900 font-medium"
                        >
                          Move to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Original Price</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discounts</span>
                  <span className="text-green-600">-$0.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (Est. 18%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 mb-4">
                Checkout
              </button>

              {/* Coupon Input */}
              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Have a coupon code?
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 text-sm">
                    Apply
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-6 text-center">
                30-Day Money-Back Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;