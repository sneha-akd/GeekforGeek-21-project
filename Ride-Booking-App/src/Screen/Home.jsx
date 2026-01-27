
import React from "react";
import { useSelector } from "react-redux";
import { IndianRupee } from "lucide-react";
import SavedLocation from "../Component/SavedLocation";
import Pickup from "../Component/Pickup";

function Home() {
  const { name, walletBalance } = useSelector(
    (state) => state.app.userData
  );


  return (
    <>
      <div className="w-full max-w-md mx-auto p-4 rounded-md flex my-6 space-y-3 justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-800">Good Evening</p>
          <p className="text-2xl text-gray-700">
            {name || "Guest"}
          </p>
        </div>

        <div className="flex items-center gap-1 text-2xl font-semibold text-green-600">
          <IndianRupee size={18} />
          {walletBalance.toFixed(2)}
        </div>
      </div>

      <Pickup />
      <SavedLocation />
    </>
  );
}

export default Home;
