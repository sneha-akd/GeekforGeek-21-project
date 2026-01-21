import { useDispatch, useSelector } from "react-redux";
import { Home, Dumbbell, Briefcase, MapPin } from "lucide-react";
import { deleteSavedPlaces } from "../../Store/app";;
import { setDestination } from "../../Store/app";


const iconMap = {
  home: Home,
  work: Briefcase,
  gym: Dumbbell,
};

function SavedLocation() {
  const savedPlaces = useSelector((state) => state.app.savedPlaces);
  const dispatch = useDispatch();


  function handleclick(id) {
    dispatch(deleteSavedPlaces({ id }));
  }


  return (
    <div className="max-w-md mx-auto text-black rounded-xl p-4 shadow-md">
      {/* Title */}
      <h2 className="text-lg font-semibold mb-4">Saved Locations</h2>

      {/* List */}
      <div className="space-y-3">
        {savedPlaces?.map((data) => {
          const Icon = iconMap[data.icon];

          return (
            <div

              key={data.id}
              onClick={() => dispatch(setDestination(data.address))}
              className="flex items-center shadow-md gap-4 p-3 rounded-lg hover:bg-green-100 transition"
            >
              {/* Icon */}
              <div className="w-10 h-10 flex items-center  justify-center rounded-full bg-green-200">
                {Icon && <Icon size={20} className="text-blue-400" />}
              </div>


              {/* Text */}
              <div className="flex-1">
                <p className="font-medium">{data.type}</p>
                <p className="text-sm text-neutral-400 flex items-center gap-1">
                  <MapPin size={14} />
                  {data.address}
                </p>
              </div>
              <button onClick={() => handleclick(data.id)} className="text-red-400">Remove</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SavedLocation;
