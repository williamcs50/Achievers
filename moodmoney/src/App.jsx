import MoodMoneyLogo from './assets/MoodMoneyLogo.png'
import './App.css'
import { Link } from 'react-router-dom';


function App() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white">
      <img src={MoodMoneyLogo} alt="MoodMoney Logo" className="w-48 h-auto mb-8" />

      <h1 className="text-3xl font-bold text-green-700 mb-2 font-luckiest">MOOD MONEY</h1>
      <p className="text-gray-600 text-center mb-8 max-w-xs">
        Welcome to MoodMoney! Take control of your spending and emotions.
      </p>

    <Link to='/signup'>
      <button className="bg-green-600 text-white font-bold font-luckiest px-8 py-3 rounded-lg border-4 border-yellow-400 hover:bg-green-700 transition mb-4">
        GET STARTED
      </button>
    </Link>

    
      <p className="text-sm text-gray-700 mb-1">Already have an account?</p>
    <Link to='/login'>
      <button className="bg-green-600 text-white font-bold font-luckiest px-8 py-3 rounded-lg border-4 border-yellow-400 hover:bg-green-700 transition">
        SIGN IN
      </button>
    </Link>
    </div>
  );
}

export default App
