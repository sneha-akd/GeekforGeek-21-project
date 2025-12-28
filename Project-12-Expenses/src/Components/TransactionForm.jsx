import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useLedgerStore } from "../../store/useLedgerStore";

const TransactionForm = () => {
  const addTransaction = useLedgerStore((state) => state.addTransaction);

  const [currTransaction, setCurrTransaction] = useState({
    description: "",
    amount: "",
    type: "expense",
    date: ""
  });

  function handleAddTranaction() {
    if (!currTransaction.description || !currTransaction.amount || !currTransaction.date) return;

    addTransaction({
      description: currTransaction.description,
      amount: parseFloat(currTransaction.amount),
      type: currTransaction.type,
      date: currTransaction.date
    });

    setCurrTransaction({
      description: "",
      amount: "",
      type: "expense",
      date: "",
    });
  }

  return (
    <div className="w-full rounded-3xl p-8
      bg-white/10 backdrop-blur-2xl
      border border-white/20 shadow-2xl">

      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Add Transaction
      </h2>

      <div className="space-y-5">
        <input
          value={currTransaction.description}
          onChange={(e) =>
            setCurrTransaction({ ...currTransaction, description: e.target.value })
          }
          placeholder="Description"
          className="w-full px-4 py-3 rounded-xl
            bg-white/10 border border-white/20
            text-white placeholder-gray-400
            focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          type="number"
          value={currTransaction.amount}
          onChange={(e) =>
            setCurrTransaction({ ...currTransaction, amount: e.target.value })
          }
          placeholder="Amount"
          className="w-full px-4 py-3 rounded-xl
            bg-white/10 border border-white/20
            text-white placeholder-gray-400
            focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          type="date"
          value={currTransaction.date}
          onChange={(e) =>
            setCurrTransaction({ ...currTransaction, date: e.target.value })
          }
          className="w-full px-4 py-3 rounded-xl
    bg-white/10 border border-white/20
    text-white placeholder-gray-400
    focus:ring-2 focus:ring-indigo-500 outline-none"
        />


        <div className="flex gap-4 p-2 rounded-xl bg-white/10 border border-white/20">
          <label className="flex-1 flex justify-center gap-2 py-2 rounded-lg cursor-pointer">
            <input
              type="radio"
              checked={currTransaction.type === "expense"}
              onChange={() =>
                setCurrTransaction({ ...currTransaction, type: "expense" })
              }
              className="accent-red-500"
            />
            <span className="text-white">Expense</span>
          </label>

          <label className="flex-1 flex justify-center gap-2 py-2 rounded-lg cursor-pointer">
            <input
              type="radio"
              checked={currTransaction.type === "income"}
              onChange={() =>
                setCurrTransaction({ ...currTransaction, type: "income" })
              }
              className="accent-green-500"
            />
            <span className="text-white">Income</span>
          </label>
        </div>

        <button
          onClick={handleAddTranaction}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            hover:brightness-110 transition text-white font-semibold"
        >
          <Plus size={18} />
          Add Transaction
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;
