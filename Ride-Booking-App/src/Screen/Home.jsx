
import React from "react";
import { useSelector } from "react-redux";
import { IndianRupee } from "lucide-react";
import Pickup from "../Component/pickup";
import SavedLocation from "../Component/SavedLocation";

function Home() {
  const { name, walletBalance } = useSelector(
    (state) => state.app.userData
  );


  return (
    <>
      <div className="w-full max-w-md mx-auto p-4 rounded-md flex my-6 space-y-3">
        <p className="text-sm font-semibold text-gray-800">
          Good Evening
        </p>
        <p className="text-md text-gray-700">
          {name || "Guest"}
        </p>

        <div className="flex items-center gap-1 text-lg font-semibold text-green-600">
          <IndianRupee size={18} />
          {walletBalance}
        </div>
      </div>

      <Pickup />

      <SavedLocation />
    </>
  );
}

export default Home;
