
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const defaultCategories = ["Dining Out", "Groceries", "Clothing", "Entertainment", "Food", "Transportation", "Health", "Utilities", "Other"];

const RadarChartMM = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [budgets, setBudgets] = useState(() => {
        const savedBudgets = localStorage.getItem("budgets");
        return savedBudgets ? JSON.parse(savedBudgets) : {};
    });
    const [isEditing, setIsEditing] = useState(false);
    const [tempBudgets, setTempBudgets] = useState({ ...budgets });

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

    useEffect(() => {
        if(userData?.expenses?.length > 0) {
            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();

            // Filters through the user's expenses for the current month and year
            const monthlyExpenses = userData.expenses.filter((e) => {
                const date = new Date(e.date);
                return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
            });

            // Adds up the totals for each category
            const categoryTotals = {};
            monthlyExpenses.forEach(({ category, amount }) => {
                categoryTotals[category] = (categoryTotals[category] || 0) + amount;
            });

            const formatData = defaultCategories.map((category) => ({
                category,
                amount: categoryTotals[category] || 0,
                budget: budgets[category] || 0,
            }));

            setChartData(formatData);
    }
    }, [userData, budgets]);

    const handleEditBudget = () => {
        setIsEditing(!isEditing);
        setTempBudgets({ ...budgets });
    };

    const handleBudgetChange = (category, value) => {
        setTempBudgets({ ...tempBudgets, [category]: value });
    };

    const handleSaveBudgetChange = () => {
        setBudgets(tempBudgets);
        localStorage.setItem("budgets", JSON.stringify(tempBudgets));
        setIsEditing(false);
    }

    return (
        <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData} defaultShowTooltip={true}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis angle={30} domain={[ 0, Math.max(...chartData.map(d => d.amount), 100) ]} />
          <Radar name="Actual" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Radar name="Budget" dataKey="budget" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
          <Tooltip />
          <Legend />
        </RadarChart>

        <button onClick={handleEditBudget} className="text-yellow-400 hover:underline text-xs mr-2 z-20">
            {isEditing ? "Cancel" : "Edit Budget"}
        </button>
        {isEditing && (
            <div className="bg-white rounded-lg shadow-md z-30 p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3"> Set budget per Category</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {defaultCategories.map((category) => (
                        <div key={category} className="flex items-center gap-2">
                            <label className="text-gray-700 font-medium">{category}:</label>
                            <input 
                            type="number" 
                            value={tempBudgets[category] || ""} 
                            onChange={(e) => handleBudgetChange(category, Number(e.target.value))}
                            className="w-20 p-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                    ))}
                </div>
                <button onClick={handleSaveBudgetChange} className="mt-4 px-6 py-2 bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition">Save</button>
            </div>
        )}
        </ResponsiveContainer>

    );
};

export default RadarChartMM;
