import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLedgerStore } from "../../store/useLedgerStore";

const EditTransactionModal = ({ isOpen, onClose, transaction }) => {
  const updateTransaction = useLedgerStore((state) => state.updateTransaction);

  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: "",
  });

  // Fill data when modal opens
  useEffect(() => {
    if (transaction) {
      setForm({
        description: transaction.description,
        amount: transaction.amount,
        date: transaction.date,
      });
    }
  }, [transaction]);

  if (!isOpen) return null;

  function handleSave() {
    updateTransaction(transaction.id, {
      description: form.description,
      amount: parseFloat(form.amount),
      date: form.date,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20
        rounded-2xl p-6 w-full max-w-md text-white">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Transaction</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="space-y-4">
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
            placeholder="Description"
          />

          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
            placeholder="Amount"
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
          />

          <button
            onClick={handleSave}
            className="w-full py-2 rounded-lg bg-indigo-500 hover:brightness-110"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTransactionModal;
