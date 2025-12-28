import React from "react";
import TotalAmounts from "./Components/TotalAmounts";
import TransactionForm from "./Components/TransactionForm";
import TransactionList from "./Components/TransactionList";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black p-6">

      <h1 className="text-4xl font-extrabold text-white text-center mb-10">
        Expense Tracker
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        <TotalAmounts />
        <TransactionForm />
        <TransactionList />

      </div>
    </div>
  );
};

export default App;
