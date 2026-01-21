
import ShowprofileData from "../Component/ShowprofileData";
import UpdateWalletBalance from "../Component/UpdateWalletBalance";
import SavedLocation from "../Component/SavedLocation";

const Profile = () => {
  return (
    <div className="min-h-screen flex justify-center ">
      <div className="w-full max-w-md space-y-4">
        <ShowprofileData />
        <UpdateWalletBalance />
        <SavedLocation />
      </div>
    </div>

  );
};

export default Profile;