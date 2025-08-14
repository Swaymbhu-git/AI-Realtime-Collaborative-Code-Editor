import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
// Import our new service functions
import { createNewRoom, handleApiError } from '../services/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [roomId, setRoomId] = useState('');

    const handleCreateNewRoom = async (e) => {
        e.preventDefault();
        const newRoomId = uuidV4();
        try {
            // Use the service function which handles auth headers automatically
            await createNewRoom(newRoomId);
            toast.success('Created a new private room');
            navigate(`/editor/${newRoomId}`);
        } catch (error) {
            // Use the centralized error handler
            handleApiError(error);
        }
    };

    const joinRoom = () => {
        if (!roomId) {
            toast.error('Please enter a Room ID');
            return;
        }
        navigate(`/editor/${roomId}`);
    };
      
    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img className="homePageLogo" src="/logo.svg" alt="logo" />
                <h4 className="mainLabel">Create or Join a Room</h4>
                <div className="inputGroup">
                    <button onClick={handleCreateNewRoom} className="btn btn-secondary">
                      Create New Private Room
                    </button>

                    <input
                        type="text"
                        className="inputBox"
                        placeholder="PASTE ROOM ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                    />
                      
                    <button onClick={joinRoom} className="btn btn-primary">
                        Join
                    </button>
                      
                    <button onClick={logout} className="btn btn-primary" style={{ marginTop: '20px' }}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;