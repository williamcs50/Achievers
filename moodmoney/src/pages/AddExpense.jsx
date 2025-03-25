import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav';
import { FaCheck } from 'react-icons/fa';




const moodOptions = [
  ['Calm', 'Relaxed', 'Content', 'Happy', 'Excited'],
  ['Relieved', 'Hopeful', 'Motivated', 'Focused', 'Confident'],
  ['Neutral', 'Unsure', 'Tired', 'Distracted', 'Overwhelmed'],
  ['Guilty', 'Regretful', 'Impulsive', 'Frustrated', 'Angry']
];

export default function AddExpense() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    setError(''); // reset previous error
  
    const missingFields = [];
  
    if (!amount) missingFields.push('enter an amount');
    if (!category) missingFields.push('select a category');
    if (!selectedMood) missingFields.push('select a mood');
  
    if (missingFields.length > 0) {
      // Join the messages with proper grammar
      const formatted = missingFields.join(', ').replace(/, ([^,]*)$/, ' and $1');
      setError(`Please ${formatted}.`);
      return;
    }
  
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert('User not logged in');
  
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const localDate = `${year}-${month}-${day}`;
  
    try {
      await axios.post('http://localhost:5000/api/expenses/add', {
        userId: user._id,
        amount,
        category,
        mood: selectedMood,
        date: localDate
      });
  
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Error saving expense');
    }
  };
  

  return (
    <div className="w-screen min-h-screen bg-white px-6 py-6 flex flex-col items-center">
      <h1 className="text-2xl font-luckiest text-green-700 mb-4">LOG A NEW EXPENSE</h1>

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full max-w-sm px-4 py-3 mb-4 border-2 border-green-600 bg-green-100 rounded-md text-black"
      />

        <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full max-w-sm px-4 py-3 mb-6 border-2 border-green-600 bg-green-100 rounded-md text-black"
        >
        <option value="">Pick a Category</option>
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


      <h2 className="text-lg font-luckiest text-green-700 mb-2 text-center">HOW DID THIS PURCHASE MAKE YOU FEEL?</h2>

      <div className="grid grid-cols-5 gap-3 mb-4">
        {moodOptions.flat().map((mood, idx) => (
          <button
          key={idx}
          onClick={() => setSelectedMood(mood)}
          className={`w-10 h-10 rounded-full flex items-center justify-center relative border-2 ${
            selectedMood === mood ? 'border-black ring-4 ring-black' : 'border-transparent'
          }`}
          style={{ backgroundColor: getMoodColor(mood) }}
        >
          {selectedMood === mood && <FaCheck className="text-black text-l" />}
        </button>
        ))}
      </div>

      {selectedMood && (
        <p
        className="text-lg font-luckiest mb-4"
        style={{ color: getMoodColor(selectedMood) }}
      >
        {selectedMood.toUpperCase()}!
      </p>
      )}

      <button
        onClick={handleSave}
        className="w-48 bg-green-600 text-white font-bold font-luckiest py-3 rounded-lg border-4 border-yellow-400 hover:bg-green-700 transition"
      >
        SAVE EXPENSE
      </button>

      {error && (
        <p className="text-red-600 mt-3 text-center font-bold">
            {error}
        </p>
        )}


      <BottomNav />
    </div>
  );
}

function getMoodColor(mood) {
    const colorMap = {
      Calm: '#689ED9',         // darker blue
      Relaxed: '#4A90E2',      // deeper soft blue
      Content: '#377EDC',      // stronger medium blue
      Happy: '#2C5BBC',        // bold blue
      Excited: '#002EFA',      // pure bold blue
      Relieved: '#6DD96D',     // deeper mint green
      Hopeful: '#4DC84D',      // fresh green
      Motivated: '#38B738',    // solid green
      Focused: '#2A9F2A',      // firm green
      Confident: '#1E8C1E',    // strong green
      Neutral: '#D7D755',      // darker yellow
      Unsure: '#E5E541',       // visible yellow
      Tired: '#E1DD4F',        // mustard yellow
      Distracted: '#C6BD2D',   // olive yellow
      Overwhelmed: '#9A941B',  // dark golden yellow
      Guilty: '#E1A779',       // burnt peach
      Regretful: '#E1984E',    // deeper orange
      Impulsive: '#E3822E',    // tangerine
      Frustrated: '#D8611D',   // burnt orange
      Angry: '#8B2500'         // darker red-brown
    };
  
    return colorMap[mood] || '#888'; // fallback gray
  }
  
