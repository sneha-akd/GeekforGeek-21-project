

import { useDispatch, useSelector } from "react-redux";
import { Home, Dumbbell, Briefcase, MapPin, Star, Clock, Navigation } from "lucide-react";
import { useEffect } from "react";
import { clearBookingData, setDestination } from "../../Store/app";
import { setPickupLocation } from "../../Store/app";
import { useNavigate } from 'react-router-dom';

function Pickup() {
  const savedPlaces = useSelector((state) => state.app.savedPlaces);
  const { rating, rides, saved } = useSelector((state) => state.app.userStats)
  const bookingData = useSelector((state) => state.app.bookingData);
  const dispatch = useDispatch();
  const navigate = useNavigate()



  const iconMap = {
    home: Home,
    work: Briefcase,
    gym: Dumbbell,
    saved: MapPin,
  };


  function handleChangePickup(e) {
    dispatch(setPickupLocation(e.target.value))
    // console.log(pickup);
  }

  function handlechangedest(e) {
    dispatch(setDestination(e.target.value))
  }

  // clear booking data on component reload
  useEffect(() => {
    dispatch(clearBookingData());
  }, []);

  return (
    <>
      <div className="w-full max-w-md mx-auto p-4  bg-white border border-gray-200 rounded-md shadow-md my-6 space-y-3">
        <h1 className="text-xl font-semibold mb-4">Where to?</h1>

        {/* Inputs */}
        <div className="space-y-3 mb-6">

          <div className="relative">
            <Navigation size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 text-lg" />
            <input
              onChange={handleChangePickup}
              value={bookingData?.selectpickup}
              type="text"
              placeholder="Enter pickup location"
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 text-lg" />
            <input
              type="text"
              onChange={handlechangedest}
              value={bookingData?.selectedDestination}
              placeholder="Enter destination"
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Saved places */}
        {/* Saved places */}
        <div className="flex  gap-2">
          {savedPlaces.map((place) => {
            const Icon = iconMap[place.icon] || MapPin;

            return (
              <div
                key={place.id}
                onClick={() => dispatch(setDestination(place.address))}

                className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 hover:bg-green-100 transition"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
                  <Icon className="h-4 w-4 text-gray-600 " strokeWidth={1.5} />
                </div>

                <p className="text-sm font-medium text-gray-800">
                  {place.type}
                </p>
              </div>
            );
          })}
        </div>

        <button onClick={() => {
          navigate('/book');
        }} className=" p-2 rounded-lg shadow-md hover:bg-green-700 w-full bg-green-600">Search Rides</button>
      </div>


      <div className="w-full max-w-md mx-auto p-4 bg-white border border-gray-50 rounded-md shadow-md my-6">
        <div className="grid grid-cols-3 gap-3 text-sm">

          {/* Rating */}
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-white py-6 text-gray-700 shadow-sm">
            <Star size={18} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{rating}</span>
            <span className="text-gray-500 text-xs">Rating</span>
          </div>

          {/* Rides */}
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg  bg-white py-6 text-gray-700 shadow-sm">
            <Navigation size={18} className="text-green-500" />
            <span className="font-semibold">{rides}</span>
            <span className="text-gray-500 text-xs">Rides</span>
          </div>

          {/* Saved */}
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg  bg-white py-6 text-gray-700 shadow-sm">
            <Clock size={18} className="text-blue-500" />
            <span className="font-semibold">{saved}</span>
            <span className="text-gray-500 text-xs">Saved</span>
          </div>

        </div>

      </div>
    </>

  );
}

export default Pickup;
