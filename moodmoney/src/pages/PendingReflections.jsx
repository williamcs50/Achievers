import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BottomNav from '../components/BottomNav';

export default function PendingReflections() {
  const [last24HoursExpenses, setLast24HoursExpenses] = useState([]);
  const [lastWeekExpenses, setLastWeekExpenses] = useState([]);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5050/api/pending/${user._id}`)
        .then((response) => {
          setLast24HoursExpenses(response.data.last24Hours);
          setLastWeekExpenses(response.data.lastWeek);
        })
        .catch((err) => {
          setError('Failed to fetch expenses');
          console.error(err);
        });
    } else {
      setError('User not logged in');
    }
  }, [user]);

  return (
    <div className="w-screen min-h-screen bg-white px-6 py-6 flex flex-col items-center">
      <h1 className="text-2xl font-luckiest text-green-700 mb-4">PENDING REFLECTIONS</h1>
      <p className="text-center text-gray-700">Reflect on Your Past Purchases</p>
      <p className="text-center text-gray-500 italic mb-6">Do you still feel the same about these purchases, or has your mood changed?</p>

      {/* Error Message */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Purchases made in the last 24 hours */}
      <section className="w-full mb-6">
        <h2 className="text-lg font-luckiest text-green-700 mb-4 text-center">PURCHASES MADE 24 HOURS AGO</h2>
        <div className="bg-green-500 rounded-lg p-4 w-full">
          <div className="grid grid-cols-4 mb-2">
            <div className="text-lg font-luckiest text-yellow-300">AMOUNT SPENT</div>
            <div className="text-lg font-luckiest text-yellow-300">CATEGORY</div>
            <div className="text-lg font-luckiest text-yellow-300">DATE</div>
            <div className="text-lg font-luckiest text-yellow-300">MOOD SELECTED</div>
          </div>
          {last24HoursExpenses.length > 0 ? (
            last24HoursExpenses.map((expense) => (
              <div key={expense._id} className="grid grid-cols-4 items-center py-2 border-b border-green-700 last:border-none">
                <div className="text-white text-sm">${expense.amount.toFixed(2)}</div>
                <div className="text-white text-sm">{expense.category}</div>
                <div className="text-white text-sm">
                  {new Date(expense.date).toLocaleDateString()}
                </div>
                <div className="text-white text-sm">{expense.mood}</div>
              </div>
            ))
          ) : (
            <p className="text-white text-center font-luckiest">No purchases made in the last 24 hours.</p>
          )}
        </div>
      </section>

      {/* Purchases made in the last week */}
      <section className="w-full">
        <h2 className="text-lg font-luckiest text-green-700 mb-4 text-center">PURCHASES MADE 1 WEEK AGO</h2>
        <div className="bg-green-500 rounded-lg p-4 w-full">
          <div className="grid grid-cols-4 mb-2">
            <div className="text-lg font-luckiest text-yellow-300">AMOUNT SPENT</div>
            <div className="text-lg font-luckiest text-yellow-300">CATEGORY</div>
            <div className="text-lg font-luckiest text-yellow-300">DATE</div>
            <div className="text-lg font-luckiest text-yellow-300">MOOD SELECTED</div>
          </div>
          {lastWeekExpenses.length > 0 ? (
            lastWeekExpenses.map((expense) => (
              <div
                key={expense._id}
                className="grid grid-cols-4 items-center py-2 border-b border-green-700 last:border-none"
              >
                <div className="text-white text-sm">${expense.amount.toFixed(2)}</div>
                <div className="text-white text-sm">{expense.category}</div>
                <div className="text-white text-sm">
                  {new Date(expense.date).toLocaleDateString()}
                </div>
                <div className="text-white text-sm">{expense.mood}</div>
              </div>
            ))
          ) : (
            <p className="text-white text-center font-luckiest">No purchases made in the last week.</p>
          )}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}