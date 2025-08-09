import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { loginUser, handleApiError } from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    // This effect runs when the component mounts or when the token changes.
    // Its job is to decode the token and set the user object.
    useEffect(() => {
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser.user);
            } catch (error) {
                console.error("Invalid token found, logging out.", error);
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await loginUser(email, password);
            // 1. Save token to localStorage IMMEDIATELY. This is the key fix.
            localStorage.setItem('token', res.data.token);
            // 2. Update the token in state, which will trigger the useEffect above.
            setToken(res.data.token);
            return true; // Return true on success
        } catch (error) {
            // 3. The service now handles showing the error toast.
            handleApiError(error);
            return false; // Return false on failure
        }
    };

    const logout = () => {
        // Clear token from both storage and state.
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };