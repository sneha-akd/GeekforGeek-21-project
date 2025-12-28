import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const useLedgerStore = create((set, get) => ({
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        { id: uuidv4(), date: new Date().toISOString(), ...transaction },
        ...state.transactions,
      ],
    })),
  deleteTransaction: (id) => {
    set((state) => ({
      transactions: state.transactions.filter((tObj) => tObj.id !== id),
    }));
  },

  updateTransaction: (id, updatedData) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updatedData } : t
      ),
    })),


  totalSummary: () => {
    let { transactions } = get();

    let totalExpense = 0;
    let totalIncome = 0;

    transactions.forEach((tObj) => {
      if (tObj.type === "income") {
        totalIncome += tObj.amount;
      } else {
        totalExpense += tObj.amount;
      }
    });

    return {
      totalExpense,
      totalIncome,
      totalBalance: totalIncome - totalExpense,
    };
  },
}));

// {
// id : uniqueId,
// date : newDate ,
// description : "",
// amount : "",
// type:"expense"|"income"
//  }