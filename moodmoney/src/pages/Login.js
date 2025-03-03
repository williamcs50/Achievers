import logo from '../logo.svg';
import '../App.css';
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode} from 'jwt-decode'
import { useNavigate } from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';

export function Login() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate()
    function handleLogout() {
        googleLogout()
    }

    return (
        <div className='App'>
            <header className='App-header'>
            Login
            <GoogleLogin 
            onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                console.log(jwtDecode(credentialResponse.credential));
                const userObject = jwtDecode(credentialResponse.credential);
                setUser(userObject);
                navigate("/homeSummary")
            }} 
            onError={() => console.log("Login failed")}/>
            </header>
        </div>
    )
}