import React, {  } from 'react';
import {  } from 'react-router-dom';
//import axios from 'axios';
import BottomNav from '../components/BottomNav';
import RadarChartMM from '../components/RadarChartMM';
import BarChartMM from '../components/BarChartMM';

export default function Insights() {

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

            <h2 className='text-2xl p-6'>EMOTIONAL SPENDING INSIGHTS</h2>
            <div className='text-black'>
            <p className='mb-2'>
                <span className='font-semibold'>You've logged # purchases as "Mood" this week</span>
            </p>
            <p className='mb-2'>
                <span className='font-semibold'>Your most frequent spending mood this month: "Mood"</span>
            </p>
            <p className='mb-2'>
                <span className='font-semibold'>You tend to regret clothing purchases the most</span>
            </p>
            <p className='mb-2'>
                <span className='font-semibold'>Most of your regretful purchases happen at night</span>
            </p>
            </div>

            <BottomNav />
        </div>
    );
}
