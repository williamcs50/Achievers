import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import MoodMoneyLogo from '../assets/MoodMoneyLogo.png'
import { IoArrowBack } from "react-icons/io5"
import axios from 'axios'

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log("Full Response:", res);
      console.log("res.data:", res.data);
      setMessage('✅ Account created successfully!');
      console.log("Full Response:", res);
      console.log("res.data:", res.data);

      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard')
    } catch (err) {
      console.error(err);
      setMessage('❌ Error: ' + (err.response?.data?.error || 'Something went wrong.'));
    }
  }

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start bg-white px-4 pt-6">
      <div className="w-full max-w-sm">
        <Link to="/">
          <div className="w-10 h-10 flex items-center justify-center bg-green-600 rounded-full mt-4">
            <IoArrowBack className="text-yellow-400 text-xl" />
          </div>
        </Link>
      </div>

      <img src={MoodMoneyLogo} alt="MoodMoney Logo" className="w-48 sm:w-64 h-auto mb-6" />
      <h1 className="text-xl font-bold text-green-700 mb-4 font-luckiest">CREATE YOUR ACCOUNT</h1>

      <form className="w-full max-w-sm flex flex-col gap-4" onSubmit={handleSubmit}>
        {['firstName', 'lastName', 'username', 'password'].map((field, index) => (
          <div key={index}>
            <label className="block text-gray-700 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-green-600 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-40 mx-auto mt-4 bg-green-600 text-white font-bold py-2 rounded-lg border-4 border-yellow-400 hover:bg-green-700 transition font-luckiest"
        >
          GET STARTED
        </button>
      </form>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  )
}
