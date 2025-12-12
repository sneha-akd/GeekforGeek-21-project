import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setCartProducts, removeCartProduct } from "../src/ProductSlice";
import Navbar from "./Navbar";

const PdpComponent = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState(null);
  const screenProducts = useSelector((state) => state.product.screenProducts);
  const cartProducts = useSelector((state) => state.product.cartProducts);

  // const isAdded = cartProducts.includes(Number(productId)); // check if product is in cart
  const isAdded = cartProducts.some((e) => e[0] === Number(productId));

  async function getData() {
    let apiData = await fetch(`https://dummyjson.com/products/${productId}`);
    let jsonData = await apiData.json();
    setProductData(jsonData);
  }

  function handleAddToCart() {
    if (isAdded) {
      dispatch(removeCartProduct(Number(productId)));
    } else {
      dispatch(setCartProducts(Number(productId)));
    }
  }

  useEffect(() => {
    // Try to get product from already loaded products first
    let product = screenProducts.find((p) => p.id === Number(productId));
    if (product) {
      setProductData(product);
    } else {
      getData();
    }
  }, [productId, screenProducts]);

  if (!productData)
    return <div className="p-10 text-gray-600">Loading...</div>;

  const discountedPrice = (
    productData.price -
    (productData.price * productData.discountPercentage) / 100
  ).toFixed(0);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* PAGE WRAPPER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT SIDE → IMAGE SECTION */}
          <div className="flex flex-col items-center">
            <div className="w-full h-96 bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={productData.thumbnail}
                alt={productData.title}
                className="w-full h-full object-contain p-4"
              />
            </div>
          </div>

          {/* RIGHT SIDE → PRODUCT DETAILS */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {productData.title}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{productData.brand}</p>

            {/* Rating */}
            <div className="mt-2 flex items-center gap-2">
              <div className="bg-green-600 text-white px-2 py-0.5 rounded text-sm">
                ★ {productData.rating}
              </div>
              <span className="text-sm text-gray-500">
                {productData?.reviews?.length || 0} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-center gap-3">
              <p className="text-3xl font-bold text-gray-900">
                ₹{discountedPrice}
              </p>
              <p className="text-lg line-through text-gray-400">
                ₹{productData.price}
              </p>
              <p className="text-lg font-semibold text-green-600">
                {productData.discountPercentage}% off
              </p>
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-700 leading-relaxed">
              {productData.description}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={handleAddToCart}
                className={`w-40 py-2 rounded-lg font-semibold transition
                  ${isAdded
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-yellow-500 text-black hover:bg-yellow-600"
                  }
                `}
              >
                {isAdded ? "Added" : "Add to Cart"}
              </button>
            </div>

            {/* Small Highlights */}
            <div className="mt-8 bg-gray-50 p-4 rounded-lg border">
              <h2 className="text-lg font-semibold mb-3">Product Highlights</h2>
              <ul className="text-gray-700 text-sm leading-6 list-disc pl-5">
                <li>Category: {productData?.category}</li>
                <li>Stock available: {productData?.stock}</li>
                {productData?.warrantyInformation && (
                  <li>Warranty: {productData.warrantyInformation}</li>
                )}
                {productData?.returnPolicy && (
                  <li>Return Policy: {productData.returnPolicy}</li>
                )}
                {productData?.shippingInformation && (
                  <li>Shipping: {productData.shippingInformation}</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {productData?.reviews?.map((review, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-800">
                    {review.reviewerName}
                  </p>
                  <span className="text-sm bg-green-600 text-white px-2 py-0.5 rounded">
                    ★ {review.rating}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(review.date).toDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PdpComponent;
