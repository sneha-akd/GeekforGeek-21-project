import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetResaturantData } from "../Hooks";
import { addItemsInCart } from "../Store/app";

// Dummy image array for menu items
const dummyImage = [
  "https://t3.ftcdn.net/jpg/06/15/30/52/240_F_615305272_33za7OoIucKSdHqnXhj7Yplofli5OSTd.jpg",
  "https://t4.ftcdn.net/jpg/04/16/68/71/240_F_416687114_Tw5evwgHq33s8hbwJVFiim28qlqiJaid.jpg",
  "https://as1.ftcdn.net/v2/jpg/04/16/04/82/1000_F_416048265_vu7bQVd1CDYLuJ9xpVKvv8gHkQM9ptJb.jpg",   // Example placeholder image for Pizza
  "https://as1.ftcdn.net/v2/jpg/06/70/75/96/1000_F_670759654_DStcleVHR7fNd4EmDCONz0jx8fJ9jo4j.jpg",  // Example placeholder image for Burger
  "https://media.gettyimages.com/id/543739338/photo/the-replica-food-manufactured-from-vinyl-chloride-is-displayed-at-the-companys-workshop-in.jpg?s=612x612&w=0&k=20&c=OV5wgxkkPrG22Amz_Axuu4XcuMTPXyo910LhBa5Egq8=",   // Example placeholder image for Sushi
];

const RestaurantDetailas = () => {
  const dispatch = useDispatch();
  useGetResaturantData();
  const { id } = useParams();

  const allRestaurantData = useSelector((state) => state.app.restaurantData);
  const restaurantData = allRestaurantData.find((data) => data.id === id);

  // Fallback image for restaurant header
  const [imageUri, setImageUri] = useState(restaurantData?.image_url ?? "");

  function handleImageError() {
    const idx = Math.floor(Math.random() * dummyImage.length);
    setImageUri(dummyImage[idx]);
    console.log("Image failed to load, switching to dummy image...");
  }



  function handleClick(itemId) {
    dispatch(addItemsInCart({ resId: id, item_id: itemId }));
  }

  if (!restaurantData)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-xl">
        Loading...
      </div>
    );

  const { name, rating, cuisine, address, menu } = restaurantData;

  return (
    <div className="min-h-screen bg-white relative">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-orange-500 tracking-wide">
              🍽️ Canteen
            </h1>
          </Link>

          <Link
            to="/cart"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
          >
            Cart
          </Link>
        </div>
      </nav>

      {/* Restaurant Header */}
      <div className="max-w-6xl mx-auto mt-6 bg-white rounded-xl shadow-md overflow-hidden relative z-10">
        <img
          onError={handleImageError}
          src={imageUri}
          alt={name}
          className="w-full h-[350px] object-cover"
        />

        <div className="p-6 flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-gray-800">{name}</h2>

          <div className="flex gap-3 items-center text-sm">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full">
              ⭐ {rating}
            </span>
            <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">
              {cuisine}
            </span>
          </div>

          <p className="text-gray-600 mt-1">{address}</p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-6xl mx-auto mt-8 px-2 sm:px-0 relative z-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Menu Items</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menu?.map((item) => {
            // Randomly pick a dummy image for each menu item
            // const randomImage = dummyImage[Math.floor(Math.random() * dummyImage.length)];

            return (
              <div
                key={item.item_id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-500 ease-in-out transform hover:bg-gradient-to-r hover:from-orange-200 hover:to-orange-100"
              >
                <div className="flex gap-4 p-4">
                  {/* Food Image */}
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-28 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = dummyImage[0]; // Fallback if the image fails
                      console.log("Image failed to load for item:", item.name);
                    }}
                  />

                  {/* Content */}
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="font-bold text-gray-900 mt-1">
                        ₹ {item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        handleClick(item.item_id);
                      }}
                      className="self-start mt-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State If No Menu */}
        {menu?.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No food items available.
          </p>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailas;
