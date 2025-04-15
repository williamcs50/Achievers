import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomNav from '../components/BottomNav';
import RadarChartMM from '../components/RadarChartMM';
import BarChartMM from '../components/BarChartMM';

export default function Insights() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return navigate('/');
        fetchUserData(user._id);
    }, []);
    
    const fetchUserData = async (userId) => {
        try {
          const res = await axios.get(`http://localhost:5050/api/auth/dashboard/${userId}`);
          setUserData(res.data);
        } catch (err) {
          console.error(err);
        }
    };
    
    let totalExpenses = 0;
    let topCategory = 'N/A';
    let mostCommonMood = 'N/A';
    let largestPurchase = 0;
  
    if (userData?.expenses?.length > 0) {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
    
      const monthlyExpenses = userData.expenses.filter((e) => {
        const date = new Date(e.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      });
    
      totalExpenses = monthlyExpenses.length;
  
      const categoryCount = {};
      monthlyExpenses.forEach((e) => {
      categoryCount[e.category] = (categoryCount[e.category] || 0) + 1;
          });
      topCategory = Object.keys(categoryCount).reduce((a, b) =>
      categoryCount[a] > categoryCount[b] ? a : b,
      'N/A'
    );
  
    const moodCount = {};
    monthlyExpenses.forEach((e) => {
      moodCount[e.mood] = (moodCount[e.mood] || 0) + 1;
    });
    mostCommonMood = Object.keys(moodCount).reduce((a, b) =>
      moodCount[a] > moodCount[b] ? a : b,
      'N/A'
    );
  
    largestPurchase = Math.max(...monthlyExpenses.map((e) => e.amount));
    }

    return (
        <div className="min-h-screen p-6 font-luckiest text-green-700 pb-20 text-center">
            <h1 className="text-2xl mb-4">YOUR SPENDING & EMOTIONAL TRENDS</h1>

            <h2 className="text-2xl">BUDGET VS ACTUAL SPENT</h2>
            <div className='w-full h-100 py-4 relative overflow-visible pb-6 z-50'>
                <RadarChartMM />
            </div>
            
            <h2 className="text-2xl p-6">HOW YOUR SPENDING RELATED TO YOUR MOOD</h2>
            <div className='w-200 h-100 py-4 relative overflow-visible pb-6 mx-auto z-10'>
                <BarChartMM />
            </div>
            
            <div className="mt-10 text-center">
            <h2 className="text-2xl font-luckiest text-green-700 mb-4 uppercase">Spending Highlights</h2>

                <div className="space-y-4 text-black text-base font-sans">
                <p className="mb-2">
                    <span className="font-semibold">Total Expenses This Month:</span> {totalExpenses}
                </p>
                <p className="mb-2">
                    <span className="font-semibold">Top Spending Category:</span> {topCategory}
                </p>
                <p className="mb-2">
                    <span className="font-semibold">Most Selected Mood:</span> {mostCommonMood}
                </p>
                <p className="mb-6">
                    <span className="font-semibold">Largest Single Purchase:</span> ${largestPurchase.toFixed(2)}
                </p>
                </div>
            </div>
            <BottomNav />
        </div>
    );
}
