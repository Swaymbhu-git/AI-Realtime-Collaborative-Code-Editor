import React, { useState, useRef, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { initSocket } from '../socket';
import ACTIONS from '../utils/Actions';
import { AuthContext } from '../context/AuthContext.jsx';
import { getRoomDetails, inviteUserToRoom, kickUserFromRoom, executeCode, handleApiError } from '../services/api';

import Editor from '../components/editor/Editor.jsx';
import ChatDrawer from '../components/chat/ChatDrawer.jsx';
import Sidebar from '../components/room/Sidebar.jsx';
import ExecutionPanel from '../components/editor/ExecutionPanel.jsx';

const EditorPage = () => {
    const socketRef = useRef(null);
    const { roomId } = useParams();
    const reactNavigator = useNavigate();
    const { token, user } = useContext(AuthContext);

    const [clients, setClients] = useState([]);
    const [room, setRoom] = useState(null);
    const [code, setCode] = useState('// Your C++ code here...');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const { data } = await getRoomDetails(roomId);
                setRoom(data);
            } catch (error) {
                handleApiError(error);
                reactNavigator('/');
            }
        };
        if (roomId && user) fetchRoom();
    }, [roomId, user, reactNavigator]);

    useEffect(() => {
        if (!token) return;

        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(err) {
                console.log('socket-error', err);
                toast.error('Socket connection failed');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, { roomId, token });

            socketRef.current.on('auth_error', (data) => {
                toast.error(data.message);
                reactNavigator('/login');
            });

            socketRef.current.on('kicked', () => {
                toast.error('You have been removed from the room.');
                reactNavigator('/');
            });

            socketRef.current.on(ACTIONS.JOINED, ({ clients, userName, socketId }) => {
                if (socketRef.current && socketId !== socketRef.current.id) {
                    toast.success(`${userName} joined the room.`);
                }
                setClients(clients);
            });

            socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, userName }) => {
                toast.success(`${userName} left the room.`);
                setClients((prev) => prev.filter((client) => client.socketId !== socketId));
            });

            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code: newCode }) => {
                if (newCode !== null) setCode(newCode);
            });
        };
        init();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current.off();
            }
        };
    }, [roomId, token, reactNavigator]);

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        if (socketRef.current) {
            socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code: newCode });
        }
    };
    
    const handleInviteUser = async (inviteeEmail) => {
        try {
            await inviteUserToRoom(roomId, inviteeEmail);
            toast.success(`${inviteeEmail} has been invited!`);
        } catch (error) {
            handleApiError(error);
        }
    };

    const handleKickUser = async (userIdToKick, userNameToKick) => {
        if (window.confirm(`Are you sure you want to kick ${userNameToKick}?`)) {
            try {
                await kickUserFromRoom(roomId, userIdToKick);
                socketRef.current.emit('kick_user', { userIdToKick });
                toast.success(`${userNameToKick} has been kicked.`);
            } catch (error) {
                handleApiError(error);
            }
        }
    };

    const handleRunCode = async () => {
        if (!code) {
            toast.error('Code is empty!');
            return;
        }
        setIsLoading(true);
        setOutput('');
        try {
            const { data: result } = await executeCode(code, input);
            let status = 'Execution Successful';
            if (result.stdout) setOutput(atob(result.stdout));
            else if (result.stderr) { setOutput(`Error:\n${atob(result.stderr)}`); status = 'Runtime Error'; }
            else if (result.compile_output) { setOutput(`Compilation Error:\n${atob(result.compile_output)}`); status = 'Compilation Error'; }
            else if (result.message) { setOutput(`Message:\n${atob(result.message)}`); status = 'Error'; }
            else setOutput('Execution finished with no output.');
            toast.success(status);
        } catch (error) {
            handleApiError(error);
            setOutput('An error occurred while running the code.');
        } finally {
            setIsLoading(false);
        }
    };

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied.');
        } catch (err) {
            toast.error('Could not copy the Room ID');
        }
    }

    if (!token) return <Navigate to="/login" />;
    
    const isOwner = room && user && room.owner === user.id;

    return (
        <div className="mainWrap">
            <Sidebar
                isOwner={isOwner}
                room={room} // <-- Pass the whole room object down
                onInviteUser={handleInviteUser}
                clients={clients}
                currentUser={user}
                onKickUser={handleKickUser}
                onCopyRoomId={copyRoomId}
                onLeaveRoom={() => reactNavigator('/')}
            />
            <div className="mainContent">
                <div className="editorWrap">
                    <Editor value={code} onChange={handleCodeChange} />
                </div>
                <ExecutionPanel
                    input={input}
                    setInput={setInput}
                    output={output}
                    isLoading={isLoading}
                    onRunCode={handleRunCode}
                    onAskAi={() => setIsChatOpen(true)}
                />
            </div>
            <ChatDrawer
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                editorCode={code}
                executionInput={input}
                executionOutput={output}
            />
        </div>
    );
};

export default EditorPage;