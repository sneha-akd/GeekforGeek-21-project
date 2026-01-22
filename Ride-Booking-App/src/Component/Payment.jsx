import { useSelector } from "react-redux";
import { Wallet, CreditCard, Banknote } from "lucide-react";

function Payment() {
  const walletbalance = useSelector(
    (state) => state.app.userData.walletBalance
  );

  return (
    <div className="relative z-20 max-w-md mx-auto p-4 space-y-4 bg-white rounded-lg shadow-lg">

      <h1 className="text-xl font-semibold text-gray-800">
        Payment Method
      </h1>
      <div className="flex gap-3">
        {/* Wallet */}
        <div className="flex flex-col items-center justify-center flex-1 p-4 rounded-lg shadow-sm hover:bg-green-100 transition cursor-pointer">
          <Wallet className="text-green-600 w-6 h-6 mb-2" />
          <p className="font-medium text-gray-700">Wallet</p>
          <p className="font-semibold text-gray-900">
            ₹{walletbalance}
          </p>
        </div>

        {/* Card */}
        <div className="flex flex-col items-center justify-center flex-1 p-4 rounded-lg shadow-sm hover:bg-green-100 transition cursor-pointer">
          <CreditCard className="text-green-600 w-6 h-6 mb-2" />
          <p className="font-medium text-gray-700">Card</p>
          <p className="text-gray-500">•••• 4234</p>
        </div>

        {/* Cash */}
        <div className="flex flex-col items-center justify-center flex-1 p-4 rounded-lg shadow-sm hover:bg-green-100 transition cursor-pointer">
          <Banknote className="text-green-600 w-6 h-6 mb-2" />
          <p className="font-medium text-gray-700">Cash</p>
          <p className="text-gray-500">Pay driver</p>
        </div>
      </div>


      {/* Button */}
      <button className="w-full mt-4 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 active:scale-95 transition z-100 relative">
        Confirm Booking
      </button>

    </div>
  );
}

export default Payment;
