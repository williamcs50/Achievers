import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HomeSummary } from './pages/HomeSummary';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/homeSummary" element={<HomeSummary />}/>
    </Routes>
    </UserProvider>
  );
}

export default App;
