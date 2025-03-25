import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Dashboard() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return navigate('/')

    axios.get(`http://localhost:5000/api/auth/dashboard/${user._id}`)
      .then(res => setUserData(res.data))
      .catch(err => console.error(err))
  }, [])

  if (!userData) return <p>Loading...</p>

  return (
    <div className="min-h-screen bg-white p-6 font-luckiest text-green-700">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-luckiest">Hi, {userData.name}!</h1>
  
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
            <th className="p-2">MOOD SELECTED</th>
          </tr>
        </thead>
        <tbody>
          {userData.recentExpenses.map((exp, i) => (
            <tr key={i}>
              <td className="p-2 text-center">${exp.amount.toFixed(2)}</td>
              <td className="p-2 text-center">{exp.category}</td>
              <td className="p-2 text-center">{new Date(exp.date).toLocaleDateString()}</td>
              <td className="p-2 text-center">{exp.mood}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
