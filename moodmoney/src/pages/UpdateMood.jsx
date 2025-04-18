"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { FaCheck } from "react-icons/fa"
import BottomNav from "../components/BottomNav"

const moodOptions = [
  ["Calm", "Relaxed", "Content", "Happy", "Excited"],
  ["Relieved", "Hopeful", "Motivated", "Focused", "Confident"],
  ["Neutral", "Unsure", "Tired", "Distracted", "Overwhelmed"],
  ["Guilty", "Regretful", "Impulsive", "Frustrated", "Angry"],
]

export default function UpdateMood() {
  const { expenseId } = useParams()
  const [selectedMood, setSelectedMood] = useState("")
  const [originalExpense, setOriginalExpense] = useState(null)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))
  const userId = user?._id

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/expenses/${userId}/${expenseId}`)
        setOriginalExpense(res.data)
        setSelectedMood(res.data.mood)
      } catch (err) {
        console.error(err)
        setError("Error fetching expense")
      }
    }

    if (userId && expenseId) {
      fetchExpense()
    }
  }, [userId, expenseId])

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5050/api/mood/${userId}/${expenseId}`, {
        mood: selectedMood,
      })
      navigate("/dashboard")
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || "Failed to update mood")
    }
  }

  const formatDate = (date) => {
    if (!date) return "Unknown date"
    const utcDate = new Date(date)
    return utcDate.toLocaleDateString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="w-screen min-h-screen bg-white px-6 py-6 flex flex-col items-center">
      <h1 className="text-3xl font-luckiest text-green-600 mb-4 text-center">
        UPDATE YOUR MOOD
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Do you still feel the same about this purchase, or has your mood changed?
      </p>

      {/* Original Purchase Section */}
      {originalExpense && (
        <div className="w-full mb-6">
          <h2 className="text-2xl font-luckiest text-green-600 mb-2 text-center">
            ORIGINAL PURCHASE
          </h2>
          <div className="text-center mb-4">
            <p className="text-lg">
              <span className="text-green-600 font-bold font-luckiest">AMOUNT SPENT: </span>
              <span className="text-black font-medium font-luckiest">
                ${Number(originalExpense.amount).toFixed(2)}
              </span>
            </p>
            <p className="text-md">
              <span className="text-green-600 font-bold font-luckiest">CATEGORY: </span>
              <span className="text-black font-medium font-luckiest">
                {originalExpense.category}
              </span>
            </p>
            <p className="text-md">
              <span className="text-green-600 font-bold font-luckiest">PURCHASE DATE: </span>
              <span className="text-black font-medium font-luckiest">
                {formatDate(originalExpense.date)}
              </span>
            </p>
            <p className="text-md">
              <span className="text-green-600 font-bold font-luckiest">MOOD SELECTED: </span>
              <span className="text-black font-medium font-luckiest">
                {originalExpense.mood || "None"}
              </span>
            </p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-luckiest text-green-600 mb-4 text-center">
        HOW DO YOU FEEL ABOUT THIS PURCHASE NOW?
      </h2>

      <div className="grid grid-cols-5 gap-3 mb-4">
        {moodOptions.flat().map((mood, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedMood(mood)}
            className={`w-10 h-10 rounded-full flex items-center justify-center relative border-2 ${
              selectedMood === mood ? "border-black ring-4 ring-black" : "border-transparent"
            }`}
            style={{ backgroundColor: getMoodColor(mood) }}
          >
            {selectedMood === mood && <FaCheck className="text-black text-l" />}
          </button>
        ))}
      </div>

      {selectedMood && (
        <p className="text-lg font-luckiest mb-4" style={{ color: getMoodColor(selectedMood) }}>
          {selectedMood.toUpperCase()}!
        </p>
      )}

      <button
        onClick={handleSave}
        className="w-48 bg-green-600 text-white font-bold font-luckiest py-3 rounded-lg border-4 border-yellow-400 hover:bg-green-700 transition"
      >
        SAVE EXPENSE
      </button>

      {error && <p className="text-red-600 mt-3 text-center font-luckiest">{error}</p>}

      <BottomNav />
    </div>
  )
}


// Mood color map matching `AddExpense`
function getMoodColor(mood) {
  const colorMap = {
    Calm: "#689ED9",
    Relaxed: "#4A90E2",
    Content: "#377EDC",
    Happy: "#2C5BBC",
    Excited: "#002EFA",
    Relieved: "#6DD96D",
    Hopeful: "#4DC84D",
    Motivated: "#38B738",
    Focused: "#2A9F2A",
    Confident: "#1E8C1E",
    Neutral: "#D7D755",
    Unsure: "#E5E541",
    Tired: "#E1DD4F",
    Distracted: "#C6BD2D",
    Overwhelmed: "#9A941B",
    Guilty: "#E1A779",
    Regretful: "#E1984E",
    Impulsive: "#E3822E",
    Frustrated: "#D8611D",
    Angry: "#8B2500",
  }

  return colorMap[mood] || "#888"
}