import React from "react";
import { useFetchCourseData } from "../hooks";
import CourseCard from "./CourseCard";

const CourseGrid = () => {
  const courseData = useFetchCourseData();

  if (!courseData) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Featured Courses</h2>
          <p className="mt-2 text-gray-600">Explore our top-rated content for developers.</p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courseData.map((dataObj) => (
            <CourseCard key={dataObj.id} courseData={dataObj} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseGrid;