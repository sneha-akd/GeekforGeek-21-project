
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Vehicles from "../Component/Vehicles";
import Payment from "../Component/Payment";

function Book() {

  const bookingData = useSelector((state) => state.app.bookingData);

  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);

  const prevPickup = useRef("");
  const prevDrop = useRef("");

  // ✅ Load saved values on refresh
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("rideMeta"));

    if (savedData) {
      setDistance(savedData.distance);
      setTime(savedData.time);
      prevPickup.current = savedData.pickup;
      prevDrop.current = savedData.drop;
    }
  }, []);

  // ✅ Generate ONLY when pickup or drop changes
  useEffect(() => {
    const pickup = bookingData.pickupLocation;
    const drop = bookingData.selectedDestination;

    if (
      pickup &&
      drop &&
      (pickup !== prevPickup.current || drop !== prevDrop.current)
    ) {
      const km = (Math.random() * 14 + 1).toFixed(2);
      const speed = Math.floor(Math.random() * 60) + 20;  // kmph
      const minutes = Math.round((km / speed) * 60);  // min

      // const newTime = `${minutes} mins`;

      setDistance(km);
      setTime(minutes);


      // ✅ Save to localStorage
      localStorage.setItem(
        "rideMeta",
        JSON.stringify({
          pickup,
          drop,
          distance: km,
          time: minutes,
        })
      );

      prevPickup.current = pickup;
      prevDrop.current = drop;
    }
  }, [bookingData.pickupLocation, bookingData.selectedDestination]);

  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-3 ">
        <p className="text-lg font-semibold">Choose Your Ride</p>

        <div className="flex">
          <div className="flex flex-col items-center mr-4">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="w-px h-10 bg-gray-300 my-1"></span>
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500">Pickup</span>
              <p className="font-semibold text-sm">
                {bookingData.pickupLocation}
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Dropoff</span>
              <p className="font-semibold text-sm">
                {bookingData.selectedDestination}
              </p>
            </div>
          </div>
        </div>

        {distance && time && (
          <div className="border-t border-gray-100 pt-1 flex justify-between text-sm">
            <p>
              <span className="font-medium"></span> {distance} km
            </p>
            <p>
              <span className="font-medium"></span> {time} mins
            </p>
          </div>
        )}
      </div>
      <Vehicles distance={distance} />
      <Payment />
    </>


  );
}

export default Book;
