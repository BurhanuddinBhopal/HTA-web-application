import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/feather/eye';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import './style.css';

function Login() {

  
  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [mobileNumber, setMobileNumber] = useState('');
  
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    const url = 'https://hta.hatimtechnologies.in/api/user/login';
  
    const body = {
      mobileNumber,
      password,
      userType: 'customer',
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      const responseData = await response.json();
      console.log(responseData);
  
      const code = responseData.code;
  
      if (code === 1) {
        const { name, lastName, organisation} = responseData.user;
        const {token} = responseData;
        localStorage.setItem('mobileNumber', mobileNumber);
        localStorage.setItem('name', name);
        localStorage.setItem('lastName', lastName);  
        localStorage.setItem('organisation', organisation);  
        localStorage.setItem('token', token);  
        // history.push('/dashboard');
        window.location = '/dashboard';
      } else {
        
        console.error('Login failed:', responseData.message);
        setError(responseData.message); 
        
        localStorage.removeItem('mobileNumber');
        localStorage.removeItem('name');
        localStorage.removeItem('lastName');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setError('An unexpected error occurred. Please try again.'); 
      
      localStorage.removeItem('mobileNumber');
      localStorage.removeItem('name');
      localStorage.removeItem('lastName');
    }
  };
  
  return (
    <div className='Main-Container'>
      <div className='App-Title-Header'>
        <h1>HTA</h1>
      </div>
      <div className='Welcome-title for app'>Welcome to HTA</div>
      <div className='Login-text'>Please login to your account</div>
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Mobile Number" 
          value={mobileNumber} 
          onChange={(e) => setMobileNumber(e.target.value)} 
        />
        <br />
        <div className="password-input">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="toggle-password" onClick={togglePasswordVisibility}>
            <Icon icon={passwordVisible ? eye : eyeOff} />
          </div>
        </div>
        <br />
        <div className="login-button-container">
          <div className="centered-link">
          <Link to="/dashboard" className="login-button" onClick={handleLogin}>Login</Link>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className='forgot-button-container'>
          <a href="#" className="forgot-link">Forgot password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;