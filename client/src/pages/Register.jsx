import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(''); // ADDED
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // SEND USERNAME TO BACKEND
            await axios.post('http://localhost:5001/api/auth/register', { username, email, password });
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img className="homePageLogo" src="/logo.svg" alt="logo" />
                <h4 className="mainLabel">Create an Account</h4>
                <form onSubmit={handleRegister} className="inputGroup">
                    {/* NEW USERNAME FIELD */}
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="USERNAME"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                    <input
                        type="email"
                        className="inputBox"
                        placeholder="EMAIL"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <input
                        type="password"
                        className="inputBox"
                        placeholder="PASSWORD"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button type="submit" className="btn joinBtn regBtn" style={{ width: '100%' }}>Register</button>
                    <span className="createInfo">
                        Already have an account? &nbsp;
                        <Link to="/login" className="createNewBtn">Login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Register;