import logo from '../logo.svg';
import '../App.css';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';

export function HomeSummary() {
    const { user } = useContext(UserContext);

    if( !user ) {
        return <div>Loading... or Please log in</div>
    }
    return (
        <div className='App'>
            <header className='App-header'>
                <h1>
                    Hello, {user.name}!
                </h1>
                <img src={user.picture} alt='Profile' style={{borderRadius: '50%', width: '100px', height: '100px'}}/>
                <p>Email: {user.email}</p>
            </header>
        </div>
    )
}