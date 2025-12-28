import React, { useEffect, useState } from "react";
import { useLedgerStore } from "../../store/useLedgerStore";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const TotalAmounts = () => {
  const [summaryObj, setSummaryObj] = useState({});
  const transactions = useLedgerStore((state) => state.transactions);
  const summary = useLedgerStore((state) => state.totalSummary);

  useEffect(() => {
    setSummaryObj(summary());
  }, [transactions]);

  const data = [
    { name: "Income", value: summaryObj.totalIncome || 0 },
    { name: "Expense", value: summaryObj.totalExpense || 0 },
  ];

  const COLORS = ["#4ade80", "#f87171"];

  return (
    <div className="space-y-8">

      <div className="grid grid-cols-1 gap-4
        bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-2xl">
        <div>
          <p className="text-gray-400">Income</p>
          <h2 className="text-3xl font-bold text-green-400">₹{summaryObj.totalIncome || 0}</h2>
        </div>
        <div>
          <p className="text-gray-400">Expense</p>
          <h2 className="text-3xl font-bold text-red-400">₹{summaryObj.totalExpense || 0}</h2>
        </div>
        <div>
          <p className="text-gray-400">Balance</p>
          <h2 className="text-3xl font-bold text-indigo-400">₹{summaryObj.totalBalance || 0}</h2>
        </div>
      </div>

      <div className="flex justify-center bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-2xl">
        <PieChart width={300} height={300}>
          <Pie data={data} dataKey="value" innerRadius={80} outerRadius={120}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default TotalAmounts;
