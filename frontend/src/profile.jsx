import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ onCreateAccount }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            localStorage.setItem('token', response.data.token); // Store the token
            console.log('Login successful');
            // Redirect or update state as needed
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className='flex flex-col'>
            <form className='flex flex-col gap-3' onSubmit={handleLogin}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button className='bg-slate-900 font-bold' type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
            <div onClick={onCreateAccount} className="cursor-pointer text-blue-500">Create account?</div>
        </div>
    );
};

export default LoginPage;
