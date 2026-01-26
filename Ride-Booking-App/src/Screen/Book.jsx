
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Vehicles from "../Component/Vehicles";
import Payment from "../Component/Payment";
import { useNavigate } from "react-router-dom";
import { RIDE_PAYMENT_WALLET } from "../../Store/app";

function Book() {
  const navigate = useNavigate();
  const bookingData = useSelector((state) => state.app.bookingData);
  const balance = useSelector(state => state.app.userData.walletBalance);
  const distance = bookingData.distance;
  const time = bookingData.time;

  useEffect(() => {
    if (!bookingData.pickupLocation || !bookingData.selectedDestination) {
      navigate("/home");
    }
  }, []);

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
      <Vehicles />
      <Payment />

      {/* Button */}
      <div className="relative z-20 max-w-md mx-auto p-4 space-y-4 bg-white rounded-lg shadow-lg my-1">
        {bookingData.paymentMode === RIDE_PAYMENT_WALLET && bookingData.cost > balance && <p className="text-red-400">Please recharge your wallet first!</p>}
        <button className={`w-full py-3 bg-green-600 text-white font-semibold rounded-lg 
        shadow-md hover:bg-green-700 active:scale-95 transition z-100 relative
        disabled:bg-gray-500 ${bookingData.paymentMode === RIDE_PAYMENT_WALLET && bookingData.cost > balance && "disabled:bg-red-100"}`}
          disabled={!bookingData.selectedVehicle || (bookingData.paymentMode === RIDE_PAYMENT_WALLET && bookingData.cost > balance)}
          onClick={() => {
            navigate("/active");
          }}>
          Confirm Booking
        </button>
      </div >

    </>


  );
}

export default Book;
