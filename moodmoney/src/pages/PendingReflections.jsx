import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import BottomNav from "../components/BottomNav"

export default function PendingReflections() {
  const [last24HoursExpenses, setLast24HoursExpenses] = useState([])
  const [lastWeekExpenses, setLastWeekExpenses] = useState([])
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5050/api/pending/${user._id}`)
        .then((response) => {
          setLast24HoursExpenses(response.data.last24Hours)
          setLastWeekExpenses(response.data.lastWeek)
        })
        .catch((err) => {
          setError("Failed to fetch expenses")
          console.error(err)
        })
    } else {
      setError("User not logged in")
    }
  }, [user])

  const handleUpdate = (expenseId) => {
    navigate(`/update-mood/${expenseId}`)
  }

  return (
    <div className="w-screen min-h-screen bg-white px-6 py-6 flex flex-col items-center">
      <h1 className="text-2xl font-luckiest text-green-700 mb-4">PENDING REFLECTIONS</h1>
      <p className="text-center text-gray-700">Reflect on Your Past Purchases</p>
      <p className="text-center text-gray-500 italic mb-6">
        Do you still feel the same about these purchases, or has your mood changed?
      </p>

      {error && <p className="text-red-600">{error}</p>}

      {/* Last 24 Hours */}
      <section className="w-full mb-6">
        <h2 className="text-lg font-luckiest text-green-700 mb-4 text-center">PURCHASES MADE 24 Hours Ago</h2>
        <div className="bg-green-500 rounded-lg p-4 w-full">
          <div className="grid grid-cols-5 mb-2">
            <div className="text-lg font-luckiest text-yellow-300">AMOUNT SPENT</div>
            <div className="text-lg font-luckiest text-yellow-300">CATEGORY</div>
            <div className="text-lg font-luckiest text-yellow-300">DATE</div>
            <div className="text-lg font-luckiest text-yellow-300">MOOD SELECTED</div>
            <div className="text-lg font-luckiest text-yellow-300"></div>
          </div>
          {last24HoursExpenses.length > 0 ? (
            last24HoursExpenses.map((expense) => (
              <div
                key={expense._id}
                className="grid grid-cols-5 items-center py-2 border-b border-green-700 last:border-none"
              >
                <div className="text-white text-sm font-luckiest">${expense.amount.toFixed(2)}</div>
                <div className="text-white text-sm font-luckiest">{expense.category}</div>
                <div className="text-white text-sm font-luckiest">
                  {new Date(expense.date).toLocaleDateString("en-US", { timeZone: "UTC" })}
                </div>
                <div className="text-white text-sm font-luckiest">{expense.mood}</div>
                <div>
                  <button
                    onClick={() => handleUpdate(expense._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-luckiest py-1 px-3 rounded"
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center font-luckiest">No purchases made in the last 24 hours.</p>
          )}
        </div>
      </section>

      {/* Last Week */}
      <section className="w-full">
        <h2 className="text-lg font-luckiest text-green-700 mb-4 text-center">PURCHASES Made 1 Week Ago</h2>
        <div className="bg-green-500 rounded-lg p-4 w-full">
          <div className="grid grid-cols-5 mb-2">
            <div className="text-lg font-luckiest text-yellow-300">AMOUNT SPENT</div>
            <div className="text-lg font-luckiest text-yellow-300">CATEGORY</div>
            <div className="text-lg font-luckiest text-yellow-300">DATE</div>
            <div className="text-lg font-luckiest text-yellow-300">MOOD SELECTED</div>
            <div className="text-lg font-luckiest text-yellow-300"></div>
          </div>
          {lastWeekExpenses.length > 0 ? (
            lastWeekExpenses.map((expense) => (
              <div
                key={expense._id}
                className="grid grid-cols-5 items-center py-2 border-b border-green-700 last:border-none"
              >
                <div className="text-white text-sm font-luckiest">${expense.amount.toFixed(2)}</div>
                <div className="text-white text-sm font-luckiest">{expense.category}</div>
                <div className="text-white text-sm font-luckiest">
                  {new Date(expense.date).toLocaleDateString("en-US", { timeZone: "UTC" })}
                </div>
                <div className="text-white text-sm font-luckiest">{expense.mood}</div>
                <div>
                  <button
                    onClick={() => handleUpdate(expense._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-luckiest py-1 px-3 rounded"
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center font-luckiest">No purchases older than a week.</p>
          )}
        </div>
      </section>

      <BottomNav />
    </div>
  )
}
