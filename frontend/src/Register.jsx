import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', { username, password });
            console.log('Registration successful');
            // Optionally, navigate to the login page after successful registration
            navigate('/profile');
        } catch (err) {
            // Check for specific error response from the server
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); // Set server error message
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className='text-white bg-slate-900 font-bold text-xl rounded-lg '>
            <form className='flex flex-col w-[500px] h-[300px] justify-center  p-5 gap-3 items-center' onSubmit={handleRegister}>
                <input
                    className='rounded-sm bg-slate-600 p-2'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                className='rounded-sm bg-slate-600 p-2'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button className=' font-bold p-2' type="submit ">Sign Up</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default RegisterPage;
