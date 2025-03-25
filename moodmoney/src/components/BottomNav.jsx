import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDollarSign, FaPlus, FaBell, FaChartLine } from 'react-icons/fa';

export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-white border-t-4 border-green-600 py-2 z-50">
      <button onClick={() => navigate('/dashboard')} className="text-green-800">
        <FaDollarSign size={24} />
      </button>
      <button onClick={() => navigate('/add-expense')} className="text-green-800">
        <FaPlus size={28} />
      </button>
      <button disabled className="text-green-800 opacity-50 cursor-not-allowed">
        <FaBell size={24} />
      </button>
      <button disabled className="text-green-800 opacity-50 cursor-not-allowed">
        <FaChartLine size={24} />
      </button>
    </div>
  );
}
