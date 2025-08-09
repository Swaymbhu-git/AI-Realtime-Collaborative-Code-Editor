import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Interceptor to add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
});

// --- Auth Calls ---
export const loginUser = (email, password) => api.post('/api/auth/login', { email, password });
export const registerUser = (username, email, password) => api.post('/api/auth/register', { username, email, password });

// --- Room Calls ---
export const createNewRoom = (roomId) => api.post('/api/rooms/create', { roomId });
export const getRoomDetails = (roomId) => api.get(`/api/rooms/${roomId}`);
export const inviteUserToRoom = (roomId, inviteeEmail) => api.post('/api/rooms/invite', { roomId, inviteeEmail });
export const kickUserFromRoom = (roomId, userIdToKick) => api.post('/api/rooms/kick', { roomId, userIdToKick });

// --- Secure API Proxy Calls ---
export const executeCode = (source_code, input) => {
    const cleanCode = source_code.replace(/[^\S\r\n\t ]/g, '');
    return api.post('/api/rooms/run-code', {
        language_id: 54, // C++
        source_code: btoa(cleanCode),
        stdin: btoa(input),
    });
};

export const fetchAiResponse = (prompt) => api.post('/api/rooms/ask-ai', { prompt });

// Helper to show error toasts
export const handleApiError = (error) => {
    const message = error.response?.data?.message || 'An unexpected error occurred.';
    toast.error(message);
    console.error('API Error:', error);
};