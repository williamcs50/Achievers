import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';

export function Landing() {

    return (
        <div className='App'>
            <header className='App-header'>
                <h1>
                    Welcome to MoodMoney!
                </h1>
                <p>
                    <Link to="/login">Login</Link>
                </p>
            </header>
        </div>
    )
}