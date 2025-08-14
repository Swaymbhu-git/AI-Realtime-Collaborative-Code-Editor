import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        // The login function from context now returns true or false.
        const success = await login(email, password);
        if (success) {
            toast.success('Logged in successfully!');
            navigate('/'); // Navigate only on success
        }
        setLoading(false);
    };

    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img className="homePageLogo" src="/logo.svg" alt="logo" />
                <h4 className="mainLabel">Login to Your Account</h4>
                <form onSubmit={handleLogin} className="inputGroup">
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
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <span className="createInfo">
                        Don't have an account? &nbsp;
                        <Link to="/register" className="createNewBtn">Register</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;