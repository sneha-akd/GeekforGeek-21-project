import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useFetchCourseData,
  useIsCourseExistInCart,
  useIsCourseExistInWishlist,
} from "../hooks";
import { useDispatch } from "react-redux";
import {
  addToWishlistCourse,
  removeFromWishlistCourse,
  addToCartCourse,
  removeFromCartCourse,
} from "../store/geeksSlice";

const Course = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const coursesData = useFetchCourseData();

  const isCourseInWishlist = useIsCourseExistInWishlist(id);
  const isCourseInCart = useIsCourseExistInCart(id);

  function handleAddToWishlist() {
    if (isCourseInWishlist) {
      dispatch(removeFromWishlistCourse(id));
    } else {
      dispatch(addToWishlistCourse(id));
    }
  }

  function handleAddToCart() {
    if (isCourseInCart) {
      dispatch(removeFromCartCourse(id));
    } else {
      dispatch(addToCartCourse(id));
    }
  }

  if (coursesData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const data = coursesData.find((course) => course.id === Number(id));

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Course not found</h2>
        <Link
          to="/"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Explore More Courses
        </Link>
      </div>
    );
  }

  const {
    title,
    description,
    instructor,
    price,
    rating,
    image,
    category,
    studentsEnrolled,
    lastUpdated,
    language,
    whatYouWillLearn,
    prerequisites,
    reviews,
  } = data;

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="bg-gray-900 text-white py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:w-2/3 pr-0 lg:pr-8">
            <div className="text-indigo-300 text-sm font-semibold mb-4 flex items-center gap-2">
              <Link to="/" className="hover:text-indigo-200">
                Home
              </Link>
              <span>/</span>
              <span>{category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              {title}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
              {data.bestseller && (
                <span className="bg-yellow-400 text-gray-900 font-bold px-2 py-0.5 rounded text-xs">
                  Bestseller
                </span>
              )}

              <div className="flex items-center text-yellow-400">
                <span className="font-bold mr-1">{rating}</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>

              <span className="text-indigo-200">
                ({reviews?.length || 120} ratings)
              </span>
              <span>{studentsEnrolled?.toLocaleString()} students</span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <span>Created by</span>
                <a
                  href="#"
                  className="text-indigo-400 underline hover:text-indigo-300"
                >
                  {instructor}
                </a>
              </div>
              <div className="flex items-center gap-1">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Last updated {lastUpdated}</span>
              </div>
              <div className="flex items-center gap-1">
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
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                <span>{language || "English"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT & STICKY SIDEBAR GRID --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {/* LEFT COLUMN: Course Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* What you'll learn Box */}
            <div className="border border-gray-200 p-6 rounded-lg bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What you'll learn
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {whatYouWillLearn &&
                  whatYouWillLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-green-500 mt-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Course Content / Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p>{description}</p>
                <p className="mt-4">
                  This course is designed to take you from beginner to advanced.
                  We cover every topic in detail with real-world examples. Join
                  thousands of other students in mastering this skill.
                </p>
              </div>
            </div>

            {/* Prerequisites */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Requirements
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {prerequisites &&
                  prerequisites.map((req, index) => <li key={index}>{req}</li>)}
              </ul>
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-yellow-500">★</span>
                {rating} Course Rating • {reviews?.length || 0} Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews &&
                  reviews.map((review, i) => (
                    <div key={i} className="border-t border-gray-100 pt-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {review.user}
                          </p>
                          <div className="flex text-yellow-500 text-xs">
                            {[...Array(5)].map((_, starI) => (
                              <span key={starI}>
                                {starI < Math.floor(review.rating) ? "★" : "☆"}
                              </span>
                            ))}
                            <span className="text-gray-400 ml-2">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm italic">
                        "{review.comment}"
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Buy Card */}
          <div className="relative lg:block">
            <div className="lg:absolute lg:-top-64 lg:right-0 w-full lg:w-[360px] bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden z-20">
              {/* Preview Image (only shows on desktop sidebar normally, but kept for all here) */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="bg-white rounded-full p-3 shadow-lg">
                    <svg
                      className="w-8 h-8 text-black"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    ${price}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ${(price * 1.5).toFixed(2)}
                  </span>
                  <span className="text-sm font-semibold text-gray-500">
                    33% off
                  </span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded transition-colors text-lg shadow-md"
                  >
                    {isCourseInCart ? "Remove from Cart" : "Add to Cart"}
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-bold py-3 px-4 rounded transition-colors text-lg"
                  >
                    {isCourseInWishlist
                      ? "Remove From Wishlist"
                      : "Add to Wishlist"}
                  </button>
                </div>

                <p className="text-center text-xs text-gray-500 mt-4">
                  30-Day Money-Back Guarantee
                </p>

                <div className="mt-6 space-y-3">
                  <h4 className="font-bold text-gray-900 text-sm">
                    This course includes:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center gap-2">
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
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <span>24 hours on-demand video</span>
                    </li>
                    <li className="flex items-center gap-2">
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
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>5 articles</span>
                    </li>
                    <li className="flex items-center gap-2">
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
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Access on mobile and TV</span>
                    </li>
                    <li className="flex items-center gap-2">
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
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;