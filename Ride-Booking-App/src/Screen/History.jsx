import { useSelector } from "react-redux";
import { RIDE_CANCELLED, RIDE_COMPLETED, RIDE_VEHICLE_COMFORT, RIDE_VEHICLE_ECONOMY, RIDE_VEHICLE_PREMIUM, RIDE_VEHICLE_XL } from "../../Store/app";
import { Star, Navigation, MapPin, Route, IndianRupee, Car } from "lucide-react";
import { useState } from "react";

const vehicleIcons = {
  [RIDE_VEHICLE_ECONOMY]: "🚗",
  [RIDE_VEHICLE_COMFORT]: "🚕",
  [RIDE_VEHICLE_PREMIUM]: "🚙",
  [RIDE_VEHICLE_XL]: "🚐"
}

const HistoryCard = ({ ride }) => {
  return <div className="shadow-md rounded-lg p-3 transition-all duration-200 hover:scale-102 bg-fuchsia-50 bg-stone-50">
    <div className="flex mb-2 justify-between">
      <div className="flex gap-2">
        <p>{vehicleIcons[ride.vehicle]}</p>
        <p>{ride.vehicle}</p>
      </div>

      <p className={`${ride.status === RIDE_COMPLETED ? "bg-green-200 border-green-400" : "bg-red-200 border-red-400"} border px-3 rounded-full text-sm text-neutral-500`}>{ride.status}</p>
    </div>

    <div>
      <div className="flex items-center  gap-4 mb-2 rounded-lg">
        {/* Icon */}
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-200">
          <Navigation size={16} className="text-green-400" />
        </div>
        {/* Text */}
        <div className="flex-1">
          <p className="text-sm text-neutral-400 flex items-center gap-1">Pickup</p>
          <p className="font-medium">{ride.pickup}</p>
        </div>
      </div>

      <div className="flex items-center  gap-4 rounded-lg">
        {/* Icon */}
        <div className="w-8 h-8 flex items-center  justify-center rounded-full bg-red-200">
          <MapPin size={16} className="text-red-400" />
        </div>
        {/* Text */}
        <div className="flex-1">
          <p className="text-sm text-neutral-400 flex items-center gap-1">Dropoff</p>
          <p className="font-medium">{ride.dropoff}</p>
        </div>
      </div>

      <hr className="text-neutral-300 mt-2"></hr>
      {/** other stats */}
      <div className="text-sm text-neutral-500 pt-4 flex justify-between">
        <div><p>🕓 {ride.date} <span className="px-4"><Route className="inline-block h-4" /> {ride.distance} km</span> <Star fill="yellow" className="inline-block h-4" /> {ride.rating ?? "-"}</p></div>
        <div><p className="text-lg text-red-400"><IndianRupee className="inline-block h-4" />{ride.cost ?? 0}</p></div>
      </div>

    </div>
  </div >
}

const StatisticsCard = ({ Icon, title, value }) => {
  return <div className="flex-1/2 inset-shadow-md inset-shadow-red-200 p-4 rounded-xl bg-green-50">
    <div className="text-green-400 bg-green-200 rounded-xl p-2 w-fit m-auto"><Icon /></div>
    <p className="text-center text-gray-500">{title}</p>
    <p className="text-center text-lg">{value}</p>
  </div>
}

function History() {
  const history = useSelector(state => state.app.history);

  const rides = history.length;
  const completed_rides = history.filter((ride) => ride.status === RIDE_COMPLETED)
  const expenditure = completed_rides.map((ride) => ride.cost).reduce((r, c) => r + c, 0).toFixed(2);
  const distance = history.map((ride) => ride.distance).reduce((r, c) => r + c, 0).toFixed(2);
  const rating = (completed_rides.map((ride) => ride.rating ?? 0).reduce((r, c) => r + c, 0) / completed_rides.length).toFixed(2);

  const [filter, setFilter] = useState(undefined);
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-3">
      <div className="my-3">
        <h1 className="text-3xl">Ride History</h1>
        <p> Your past rides and statistics</p>
      </div>

      {/** Statistics Card */}
      <div className="flex gap-2 mb-2">
        <StatisticsCard Icon={Car} title="Total Rides" value={rides} />
        <StatisticsCard Icon={IndianRupee} title="Total Spent" value={`₹${expenditure}/-`} />
      </div>
      <div className="flex gap-2">
        <StatisticsCard Icon={Route} title="Total Distance" value={distance} />
        <StatisticsCard Icon={Star} title="Avg Rating" value={rating} />
      </div>

      {/** filter button */}
      <div className="flex my-3 gap-3">
        <button className={`px-4 rounded-xl bg-green-50 hover:bg-green-200 active:bg-green-300 ${!filter && "bg-green-300"}`} onClick={() => setFilter(undefined)}>All ({rides})</button>
        <button className={`px-4 rounded-xl bg-green-50 hover:bg-green-200 active:bg-green-300 ${filter && filter === RIDE_COMPLETED && "bg-green-300"}`} onClick={() => setFilter(RIDE_COMPLETED)}>Completed ({completed_rides.length})</button>
        <button className={`px-4 rounded-xl bg-green-50 hover:bg-green-200 active:bg-green-300 ${filter && filter === RIDE_CANCELLED && "bg-green-300"}`} onClick={() => setFilter(RIDE_CANCELLED)}>Cancelled ({rides - completed_rides.length})</button>
      </div>

      {/** History Card List */}
      <div className="flex flex-col gap-3">
        {history.filter((ride) => !filter || ride.status === filter).map((ride, index) => {
          return <HistoryCard ride={ride} key={index} />
        })}
      </div>
    </div >
  );
}


export default History;