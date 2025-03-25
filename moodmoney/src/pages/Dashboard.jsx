// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (!storedUser) {
      navigate('/') // If no user is stored, redirect to welcome
    } else {
      setUser(storedUser)
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col">
      <div className="w-full flex justify-end p-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-2xl font-bold text-green-700 font-luckiest mb-4">
          Welcome {user?.firstName || 'User'}!
        </h1>
        <p className="text-gray-600">You're now in your dashboard.</p>
      </div>
    </div>
  )
}
