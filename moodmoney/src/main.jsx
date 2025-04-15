import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Signup from './pages/Signup.jsx' 
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddExpense from './pages/AddExpense.jsx';
import PendingReflections from './pages/PendingReflections.jsx'
import UpdateMood from "./pages/UpdateMood";
import './index.css'
import Insights from './pages/Insights.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/pending-reflections" element={<PendingReflections />} />
        <Route path="/update-mood/:expenseId" element={<UpdateMood />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
