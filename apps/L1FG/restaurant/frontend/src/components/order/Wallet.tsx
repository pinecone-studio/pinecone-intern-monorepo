import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Header from '../common/Header';

interface Transaction {
  id: number;
  amount: number;
  date: string;
  isIncome: boolean;
}

const transactions: Transaction[] = [
  { id: 1, amount: 324, date: '24.10.19 15:25', isIncome: true },
  { id: 2, amount: 219, date: '24.10.19 15:25', isIncome: true },
  { id: 3, amount: 276, date: '24.10.19 15:25', isIncome: true },
  { id: 4, amount: 186, date: '24.10.19 15:25', isIncome: true },
  { id: 5, amount: -18800, date: '24.10.19 15:25', isIncome: false },
  { id: 6, amount: 324, date: '24.10.19 15:25', isIncome: true },
];

const Wallet = () => {
  const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Header />

      <div className="text-center py-6 bg-gray-50 shadow pt-20">
        <h1 className="text-2xl font-bold">Хэтэвч</h1>
        <p className="text-4xl font-extrabold text-gray-800">{balance.toLocaleString()}</p>
        <p className="text-gray-500">Үлдэгдэл</p>
      </div>

      <div className="max-w-3xl mx-auto mt-6">
        <div className="bg-white shadow rounded-lg max-h-[500px] overflow-y-auto">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className={`w-10 h-10 flex items-center justify-center rounded ${transaction.isIncome ? 'bg-green-100' : 'bg-red-100'}`}>
                  {transaction.isIncome ? <ArrowUp className="w-6 h-6 text-green-500" /> : <ArrowDown className="w-6 h-6 text-red-500" />}
                </div>
                <span className={`font-medium ${transaction.isIncome ? 'text-gray-800' : 'text-red-500'}`}>{transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}</span>
              </div>
              <span className="text-gray-500">{transaction.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
