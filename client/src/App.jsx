import { useContext } from 'react';
import './assets/App.css'; // This line imports all our main styles
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from './context/AuthContext';

import Home from './pages/Home.jsx';
import EditorPage from './pages/EditorPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';

// A component to protect routes that require a login
const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/login" />;
};

function App() {
    const { token } = useContext(AuthContext);

    return (
        <>
            <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: { theme: { primary: '#4aed88' } },
                    }}
                ></Toaster>
            </div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
                    <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
                      
                    <Route 
                        path="/" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />

                    {/* We keep the old Home route for any legacy links, but redirect to dashboard */}
                    <Route path="/home" element={<Navigate to="/" />} />

                    <Route 
                        path="/editor/:roomId" 
                        element={
                            <ProtectedRoute>
                                <EditorPage />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;