import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomNav from '../components/BottomNav';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editFields, setEditFields] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return navigate('/');
    fetchUserData(user._id);
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/dashboard/${userId}`);
      setUserData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (expenseId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    try {
      await axios.delete(`http://localhost:5000/api/expenses/${user._id}/${expenseId}`);
      fetchUserData(user._id);
    } catch (err) {
      console.error('Failed to delete expense:', err);
    }
  };

  const handleEditClick = (index, exp) => {
    setEditIndex(index);
    setEditFields({ ...exp });
  };

  const handleEditChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (expenseId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    try {
      await axios.put(`http://localhost:5000/api/expenses/${user._id}/${expenseId}`, editFields);
      setEditIndex(null);
      fetchUserData(user._id);
    } catch (err) {
      console.error('Failed to update expense:', err);
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-white p-6 font-luckiest text-green-700 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Hi, {userData.name}!</h1>
        <button
          onClick={() => {
            localStorage.removeItem('user');
            navigate('/');
          }}
          className="text-sm bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <h2 className="text-lg mb-2">TOTAL MONEY SPENT THIS MONTH</h2>
      <p className="text-2xl text-black font-bold mb-4">${userData.totalThisMonth.toFixed(2)}</p>

      <h3 className="text-md mb-2">LIST OF LAST 5 PURCHASES:</h3>
      <table className="w-full bg-green-600 text-white rounded-md text-sm">
        <thead className="text-yellow-400">
          <tr>
            <th className="p-2">AMOUNT SPENT</th>
            <th className="p-2">CATEGORY</th>
            <th className="p-2">DATE</th>
            <th className="p-2">MOOD</th>
            <th className="p-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {userData.recentExpenses.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">No expenses made this month.</td>
            </tr>
          ) : (
            userData.recentExpenses.map((exp, i) => (
              <tr key={i}>
                {editIndex === i ? (
                  <>
                    <td className="p-2 text-center">
                      <input
                        type="number"
                        name="amount"
                        value={editFields.amount}
                        onChange={handleEditChange}
                        className="w-20 px-2 py-1 h-10 rounded text-black text-center"
                      />
                    </td>
                    <td className="p-2 text-center">
                    <select
                        name="category"
                        value={editFields.category}
                        onChange={handleEditChange}
                        className="w-28 px-2 py-1 h-10 rounded text-black text-center"
                    >
                        <option value="">Select Category</option>
                        <option value="Dining Out">Dining Out</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Health">Health</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                    </select>
                    </td>

                    <td className="p-2 text-center">
                      <input
                        type="date"
                        name="date"
                        value={editFields.date}
                        onChange={handleEditChange}
                        className="px-2 py-1 h-10 rounded text-black text-center"
                      />
                    </td>
                    <td className="p-2 text-center">
                    <select
                        name="mood"
                        value={editFields.mood}
                        onChange={handleEditChange}
                        className="w-28 px-2 py-1 h-10 rounded text-black text-center"
                    >
                        <option value="">Select Mood</option>
                        <option value="Calm">Calm</option>
                        <option value="Relaxed">Relaxed</option>
                        <option value="Content">Content</option>
                        <option value="Happy">Happy</option>
                        <option value="Excited">Excited</option>
                        <option value="Relieved">Relieved</option>
                        <option value="Hopeful">Hopeful</option>
                        <option value="Motivated">Motivated</option>
                        <option value="Focused">Focused</option>
                        <option value="Confident">Confident</option>
                        <option value="Neutral">Neutral</option>
                        <option value="Unsure">Unsure</option>
                        <option value="Tired">Tired</option>
                        <option value="Distracted">Distracted</option>
                        <option value="Overwhelmed">Overwhelmed</option>
                        <option value="Guilty">Guilty</option>
                        <option value="Regretful">Regretful</option>
                        <option value="Impulsive">Impulsive</option>
                        <option value="Frustrated">Frustrated</option>
                        <option value="Angry">Angry</option>
                    </select>
                    </td>

                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleEditSave(exp._id)}
                        className="text-yellow-400 hover:underline text-xs mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditIndex(null)}
                        className="text-gray-300 hover:underline text-xs"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2 text-center">${exp.amount.toFixed(2)}</td>
                    <td className="p-2 text-center">{exp.category}</td>
                    <td className="p-2 text-center">{new Date(exp.date.slice(0, 10) + 'T12:00:00').toLocaleDateString()}</td>
                    <td className="p-2 text-center">{exp.mood}</td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleEditClick(i, exp)}
                        className="text-yellow-400 hover:underline text-xs mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exp._id)}
                        className="text-red-500 hover:underline text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <BottomNav />
    </div>
  );
}
