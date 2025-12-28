import React, { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import { useLedgerStore } from "../../store/useLedgerStore";
import EditTransactionModal from "./EditTransactionModel";

const TransactionList = () => {
  const allTransaction = useLedgerStore((state) => state.transactions);
  const deleteTransaction = useLedgerStore((state) => state.deleteTransaction);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  if (allTransaction.length === 0) {
    return <div className="text-gray-400 text-center">No transactions yet</div>;
  }

  return (
    <>
      <div className="w-full bg-white/10 backdrop-blur-2xl
        border border-white/20 rounded-3xl p-6 shadow-2xl">

        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Transactions
        </h2>

        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
          {allTransaction.map((trans) => (
            <div
              key={trans.id}
              className="flex justify-between items-center
                bg-white/10 border border-white/20 rounded-xl p-4"
            >
              <div>
                <p className="text-white font-semibold">{trans.description}</p>
                <p className="text-gray-400 text-sm">
                  {new Date(trans.date).toLocaleDateString()}
                </p>
              </div>

              <p
                className={`font-bold ${trans.type === "income" ? "text-green-400" : "text-red-400"
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
