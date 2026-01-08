import React, { useState } from "react";
import { Link } from "react-router-dom";

export const courseImages = [
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618477247222-ac59124c6282?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1543286386-713df548e9cc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1629904853716-6c2981096325?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80",
];

const CourseCard = ({ courseData }) => {
  const {
    id,
    title,
    instructor,
    price,
    rating,

    category,
    bestseller,
    studentsEnrolled,
  } = courseData;

  const [img, setImg] = useState(courseData?.image ?? "");

  return (
    <Link
      to={`/course/${id}`}
      className="group flex flex-col bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          onError={() => {
            const randomIdx = Math.floor(Math.random() * 10);
            setImg(courseImages[randomIdx]);
          }}
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {bestseller && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded text-gray-900 shadow-sm">
            Bestseller
          </span>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-4">
        {/* Category */}
        <p className="text-xs font-medium text-indigo-600 mb-1">{category}</p>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 leading-snug mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-500 mb-2">{instructor}</p>

        {/* Rating Section */}
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 font-bold text-sm mr-1">
            {rating}
          </span>
          <div className="flex text-yellow-500 text-sm">
            {/* Simple SVG Star */}
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={i < Math.floor(rating) ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.53.044.75.616.384.973l-4.204 4.091a.563.563 0 00-.172.527l1.285 5.386a.562.562 0 01-.811.85l-4.664-2.833a.562.562 0 00-.594 0l-4.664 2.833a.562.562 0 01-.81-.85l1.285-5.386a.562.562 0 00-.172-.527L2.473 10.37c-.366-.357-.146-.93.384-.973l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-2">
            ({(studentsEnrolled / 1000).toFixed(1)}k)
          </span>
        </div>

        {/* Price & Spacer to push price to bottom */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${price}</span>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;