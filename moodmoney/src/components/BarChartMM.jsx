import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const moodOptions = [
    ['Calm', 'Relaxed', 'Content', 'Happy', 'Excited'],
    ['Relieved', 'Hopeful', 'Motivated', 'Focused', 'Confident'],
    ['Neutral', 'Unsure', 'Tired', 'Distracted', 'Overwhelmed'],
    ['Guilty', 'Regretful', 'Impulsive', 'Frustrated', 'Angry']
];

const moodLabels = ["Feel-Good", "Empowered & Driven", "Meh & Mixed", "Stormy & Reactive"];

const BarChartMM = () => {
    const [userData, setUserData] = useState(null);
    const [moodData, setMoodData] = useState([]);

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

            // Filter through current month
            const monthlyExpenses = userData.expenses.filter((e) => {
                const expenseDate = new Date(e.date);
                return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
            });

            // Init the money spent for each mood label
            const moodAmount = {};
            moodLabels.forEach((label, index) => {
                moodAmount[label] = {};
                moodOptions[index].forEach((mood) => {
                    moodAmount[label][mood] = 0;
                });
            });

            // Add up totals for each mood
            monthlyExpenses.forEach(({mood, amount}) => {
                moodOptions.forEach((group, index) => {
                    if(group.includes(mood)) {
                        moodAmount[moodLabels[index]][mood] += amount;
                    }
                });
            });

            // Put data into chart
            const formatData = moodLabels.map((label) => ({
                category: label,
                ...moodAmount[label],
            }));
            setMoodData(formatData);
        }
    }, [userData]);

    return (
        <ResponsiveContainer>
            <BarChart data={moodData} margin={{top:20, right:30, left:20, bottom:5}}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`}/>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`}/>
                {moodOptions.flat().map((mood, index) => (
                    <Bar key={mood} dataKey={mood} stackId="a" fill={getMoodColor(index)} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};

const getMoodColor = (index) => {
    const colors = [
        '#689ED9',         // darker blue
        '#4A90E2',      // deeper soft blue
        '#377EDC',      // stronger medium blue
        '#2C5BBC',        // bold blue
        '#002EFA',      // pure bold blue
        '#6DD96D',     // deeper mint green
        '#4DC84D',      // fresh green
        '#38B738',    // solid green
        '#2A9F2A',      // firm green
        '#1E8C1E',    // strong green
        '#D7D755',      // darker yellow
        '#E5E541',       // visible yellow
        '#E1DD4F',        // mustard yellow
        '#C6BD2D',   // olive yellow
        '#9A941B',  // dark golden yellow
        '#E1A779',       // burnt peach
        '#E1984E',    // deeper orange
        '#E3822E',    // tangerine
        '#D8611D',   // burnt orange
        '#8B2500'         // darker red-brown
    ];
    return colors[index % colors.length];
};

export default BarChartMM;
