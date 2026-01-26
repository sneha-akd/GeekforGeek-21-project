

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVehiclePrices, setSelectedVehicle } from "../../Store/app";

const vehiclesTemplate = [
  { name: "Economy", description: "Affordable rides", seats: 4, eta: "3 min", icon: "🚗", basePrice: 100, perkm: 8 },
  { name: "Comfort", description: "More space", seats: 4, eta: "5 min", icon: "🚕", basePrice: 200, perkm: 12 },
  { name: "Premium", description: "Luxury vehicles", seats: 4, eta: "7 min", icon: "🚙", basePrice: 500, perkm: 17 },
  { name: "XL", description: "Group up to 6", seats: 6, eta: "8 min", icon: "🚐", basePrice: 500, perkm: 15 },
];

function Vehicles({ distance }) {
  const dispatch = useDispatch();
  // const [selectedVehicle, setSelectedVehicle] = useState(null);
  // const [prevLocations, setPrevLocations] = useState({ pickup: "", drop: "" }); // Not needed, probably, we can directly use reduct location

  // const pickup = useSelector((state) => state.app.bookingData.pickupLocation);
  // const drop = useSelector((state) => state.app.bookingData.selectedDestination);
  // const selectedVehicle = useSelector((state) => state.app.bookingData.selectedVehicle);

  const { pickupLocation: pickup,
    selectedDestination: drop,
    selectedVehicle
  } = useSelector((state) => state.app.bookingData);
  // const storedVehicles = useSelector((state) => state.app.vehiclePrices || []);

  let vehicles = vehiclesTemplate.map((v) => {
    return {
      ...v,
      price: v.basePrice + (v.perkm * distance)  // TODO: use distance ??
    }
  });

  return (
    <div className="max-w-md mx-auto p-2 space-y-4 bg-white rounded-xl shadow-md my-1">
      <h1 className="text-xl font-bold text-gray-800 mb-2">Select Vehicle</h1>

      {pickup && drop && vehicles.length > 0 ? (
        vehicles.map((vehicle) => (
          <div
            key={vehicle.name}
            onClick={() => dispatch(setSelectedVehicle(vehicle.name))}
            className={`flex justify-between items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition
            ${selectedVehicle === vehicle.name ? "border-black bg-gray-100" : "border-gray-200"}`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{vehicle.icon}</span>
              <div >
                <h2 className="font-semibold text-gray-800">{vehicle.name}</h2>
                <p className="text-sm text-gray-500">{vehicle.description}</p>
                <div className="flex gap-2">
                  <p className="text-gray-600 text-sm">👤 {vehicle.seats}</p>
                  <p className="text-gray-400 text-sm">{vehicle.eta}</p>
                </div>
              </div>
            </div>
            <div className="text-right text-sm space-y-1">
              <p className="font-semibold text-gray-800">₹ {vehicle.price.toFixed(2)}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm text-center">
          Enter pickup and drop locations to see prices
        </p>
      )}
    </div>
  );
}

export default Vehicles;
