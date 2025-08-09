import { createRoot } from 'react-dom/client';
import './assets/index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // Import the provider

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
    </AuthProvider>
);