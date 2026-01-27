
import { Wallet } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IndianRupee } from "lucide-react";
import { updateWalletBalance } from "../../Store/app";

const UpdateWalletBalance = () => {

  const [isAdd, setisAdd] = useState(false);
  const { walletBalance } = useSelector((state) => state.app.userData);
  const dispatch = useDispatch();
  const [addBalance, setaddBalance] = useState(0)

  function handleadd() {
    setisAdd(!isAdd)
  }

  function handleaddmoney() {
    dispatch(updateWalletBalance({ type: 'increment', balance: addBalance }))
    setaddBalance(0);


  }

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-3 space-y-6 shadow-md">

      {/* Header */}
      <div className="flex items-center gap-2">
        <Wallet className="text-green-600" size={20} />
        <h4 className="text-lg font-semibold text-gray-800">
          Wallet Balance
        </h4>
      </div>

      {/* Balance */}
      <div className="flex items-center justify-between">
        <div className="text-3xl font-semibold mb-4 flex items-center gap-1">
          <IndianRupee className="w-6 h-6 text-neutral-400" />
          {walletBalance.toFixed(2)}
        </div>

        <button onClick={handleadd} className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-400 transition">
          + Add
        </button>
      </div>

      {/* Amount Grid */}
      {isAdd && <> <div className="grid grid-cols-4 gap-4  ">
        {[100, 500, 2000, 5000].map((amt) => (
          <button onClick={() => setaddBalance(amt)}
            key={amt}
            className="rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-gray-800
                       hover:bg-gray-200 hover:border-gray-500 transition"
          >
            ₹{amt}
          </button>
        ))}
      </div>
        <div className="flex justify-between">
          <input
            className="px-10"
            type="number"
            min="1"
            placeholder="Custom amount"
            value={addBalance === 0 ? "" : addBalance}
            onChange={(e) => setaddBalance(Number(e.target.value))}
          />

          <button onClick={handleaddmoney} className="rounded-md bg-green-600 px-3 py-2 text-sm  font-medium text-white hover:bg-gray-400 transition">
            Add Money
          </button>
        </div>
      </>
      }

    </div>

  );
};

export default UpdateWalletBalance;
