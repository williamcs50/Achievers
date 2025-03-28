import React, { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';

// Helper functions to manage expenses in local storage
const getExpensesFromLocalStorage = () => {
  const storedExpenses = localStorage.getItem('expenses');
  return storedExpenses ? JSON.parse(storedExpenses) : [];
};

const setExpensesToLocalStorage = (expenses) => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

export default function PendingReflections() {
  const [expenses, setExpenses] = useState(getExpensesFromLocalStorage());
  const [last24HoursExpenses, setLast24HoursExpenses] = useState([]);
  const [lastWeekExpenses, setLastWeekExpenses] = useState([]);

  // Fetch expenses from local storage on component mount
  useEffect(() => {
    const initialExpenses = getExpensesFromLocalStorage();
    setExpenses(initialExpenses);
  }, []);

  // Update local storage when expenses change
  useEffect(() => {
    setExpensesToLocalStorage(expenses);
  }, [expenses]);

  // Filter expenses based on time
  useEffect(() => {
    if (expenses.length > 0) {
      const now = new Date();

      // Filter for last 24 hours
      const last24Hours = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (now - expenseDate) / (1000 * 60 * 60) <= 24; // Within last 24 hours
      });

      // Filter for last week but not the last 24 hours
      const lastWeek = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          (now - expenseDate) / (1000 * 60 * 60 * 24) <= 7 &&
          (now - expenseDate) / (1000 * 60 * 60) > 24
        );
      });

      setLast24HoursExpenses(last24Hours);
      setLastWeekExpenses(lastWeek);
    }
  }, [expenses]); // Re-run this effect whenever `expenses` changes

  // Function to update expense's mood
  const updateExpenseMood = (id, newMood) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === id ? { ...expense, mood: newMood } : expense
    );
    setExpenses(updatedExpenses);
  };

  return (
    <div className="w-screen min-h-screen bg-white px-6 py-6 flex flex-col items-center">
      <h1 className="text-2xl font-luckiest text-green-700 mb-4">PENDING REFLECTIONS</h1>
      <p className="text-center text-gray-700">Reflect on Your Past Purchases</p>
      <p className="text-center text-gray-500 italic mb-6">
        Do you still feel the same about these purchases, or has your mood changed?
      </p>

      {/* Purchases made in the last 24 hours */}
      <section className="w-full mb-6">
        <h2 className="text-lg font-luckiest text-green-700 mb-4 text-center">PURCHASES MADE 24 HOURS AGO</h2>
        <div className="bg-green-100 p-4 rounded-md">
          {last24HoursExpenses.length > 0 ? (
            <table className="table-auto w-full text-center"> {/* Center the table content */}
              <thead className="text-white bg-green-500"> {/* Green background for header */}
                <tr>
                  <th>Amount Spent</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Mood Selected</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {last24HoursExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>{expense.category}</td>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td>{expense.mood}</td>
                    <td>
                      <button
                        className="text-blue-500 underline"
                        onClick={() => {
                          const newMood = prompt('Enter new mood:');
                          if (newMood) {
                            updateExpenseMood(expense.id, newMood);
                          }
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No purchases made in the last 24 hours.</p>
          )}
        </div>
      </section>

      {/* Purchases made in the last week */}
      <section className="w-full">
        <h2 className="text-lg font-luckiest text-green-700 mb-4 text-center">PURCHASES MADE 1 WEEK AGO</h2>
        <div className="bg-green-100 p-4 rounded-md">
          {lastWeekExpenses.length > 0 ? (
            <table className="table-auto w-full text-center"> {/* Center the table content */}
              <thead className="text-white bg-green-500"> {/* Green background for header */}
                <tr>
                  <th>Amount Spent</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Mood Selected</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {lastWeekExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>{expense.category}</td>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td>{expense.mood}</td>
                    <td>
                      <button
                        className="text-blue-500 underline"
                        onClick={() => {
                          const newMood = prompt('Enter new mood:');
                          if (newMood) {
                            updateExpenseMood(expense.id, newMood);
                          }
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No purchases made in the last week.</p>
          )}
        </div>
      </section>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
}
