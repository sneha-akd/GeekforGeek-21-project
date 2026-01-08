import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useFetchCourseData } from "../hooks";
import { removeFromWishlistCourse } from "../store/geeksSlice";

const Wishlist = () => {
  // Ensure data is loaded (in case user lands directly here)
  useFetchCourseData();

  const wishlistData = useSelector((store) => store.geeks.wishlistCourse);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlistCourse(id));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              My Wishlist
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {wishlistData.length}{" "}
              {wishlistData.length === 1 ? "course" : "courses"} saved
            </p>
          </div>
        </div>

        {/* Empty State */}
        {wishlistData.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Explore more courses and save them for later.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistData.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                {/* Course Image */}
                <div className="relative h-48">
                  <Link to={`/course/${course.id}`}>
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                    <svg
                      className="w-5 h-5 text-red-500 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                      {course.category}
                    </span>
                  </div>

                  <Link to={`/course/${course.id}`} className="block group">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors mb-2">
                      {course.title}
                    </h3>
                  </Link>

                  <div className="flex items-center mb-3">
                    <span className="text-yellow-500 font-bold text-sm mr-1">
                      {course.rating}
                    </span>
                    <svg
                      className="w-4 h-4 text-yellow-500 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="text-gray-400 text-xs ml-2">
                      ({course.studentsEnrolled?.toLocaleString()} students)
                    </span>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-gray-900">
                        ${course.price}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRemove(course.id)}
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
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

                      <Link
                        to={`/course/${course.id}`}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;