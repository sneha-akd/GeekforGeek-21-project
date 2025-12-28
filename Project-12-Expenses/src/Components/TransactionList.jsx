import React, { useState, useMemo } from "react";
import { Trash2, Edit2, ArrowUpDown } from "lucide-react";
import { useLedgerStore } from "../../store/useLedgerStore";
import EditTransactionModal from "./EditTransactionModel";

const TransactionList = () => {
  const allTransaction = useLedgerStore((state) => state.transactions);
  const deleteTransaction = useLedgerStore((state) => state.deleteTransaction);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest"); // newest | oldest

  // 🔹 Sort transactions by date
  const sortedTransactions = useMemo(() => {
    return [...allTransaction].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return sortOrder === "newest"
        ? dateB - dateA // Newest first
        : dateA - dateB; // Oldest first
    });
  }, [allTransaction, sortOrder]);

  if (allTransaction.length === 0) {
    return <div className="text-gray-400 text-center">No transactions yet</div>;
  }

  return (
    <>
      <div className="w-full bg-white/10 backdrop-blur-2xl
        border border-white/20 rounded-3xl p-6 shadow-2xl">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            Transactions
          </h2>

          {/* 🔹 Sort Button */}
          <button
            onClick={() =>
              setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
            }
            className="flex items-center gap-2 text-sm text-white
              bg-white/10 border border-white/20 rounded-lg px-3 py-1
              hover:bg-white/20 transition"
          >
            <ArrowUpDown size={16} />
            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
          </button>
        </div>

        <div className="flex flex-col gap-3 max-h-[80vh] overflow-y-auto">

          {sortedTransactions.map((trans) => (
            <div
              key={trans.id}
              className="flex justify-between items-center
                bg-white/10 border border-white/20 rounded-xl p-4"
            >
              <div className="w-[180px] truncate">
                <p className="text-white font-semibold truncate">
                  {trans.description}
                </p>
                <p className="text-gray-400 text-sm">
                  {new Date(trans.date).toLocaleDateString()}
                </p>
              </div>

              <p
                className={`font-bold ${trans.type === "income"
                  ? "text-green-400"
                  : "text-red-400"
                  }`}
              >
                {trans.type === "income" ? "+" : "-"}₹{trans.amount}
              </p>

              <div className="flex gap-3">
                <Edit2
                  className="text-indigo-400 cursor-pointer"
                  onClick={() => {
                    setSelectedTransaction(trans);
                    setIsEditOpen(true);
                  }}
                />
                <Trash2
                  className="text-red-400 cursor-pointer"
                  onClick={() => deleteTransaction(trans.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditTransactionModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        transaction={selectedTransaction}
      />
    </>
  );
};

export default TransactionList;
