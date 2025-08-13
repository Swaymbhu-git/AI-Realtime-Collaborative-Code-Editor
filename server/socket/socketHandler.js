import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Room from '../models/Room.js';
import ACTIONS from '../Actions.js';

const userSocketMap = {};
const codeForRoom = {};

function getAllClients(io, roomId) {
    const socketIds = io.sockets.adapter.rooms.get(roomId) || new Set();
    return Array.from(socketIds)
        .map((socketId) => userSocketMap[socketId])
        .filter(Boolean);
}

export const initializeSocket = (io) => {
    io.on('connection', (socket) => {
        socket.on(ACTIONS.JOIN, async ({ roomId, token }) => {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const { id: userId, username } = decoded.user;
                let isReplacingSession = false;

                const socketsInThisRoom = io.sockets.adapter.rooms.get(roomId);
                if (socketsInThisRoom) {
                    for (const socketIdInRoom of socketsInThisRoom) {
                        const userInRoom = userSocketMap[socketIdInRoom];
                        if (userInRoom && userInRoom.userId === userId) {
                            isReplacingSession = true;
                            const oldSocket = io.sockets.sockets.get(socketIdInRoom);
                            if (oldSocket) {
                                oldSocket.data.isReplaced = true; 
                                oldSocket.emit('session_replaced');
                                oldSocket.disconnect(true);
                            }
                        }
                    }
                }
                
                socket.join(roomId);
                userSocketMap[socket.id] = { userName: username, userId };
                
                // If this is the first user joining this room, set the C++ boilerplate.
                if (codeForRoom[roomId] === undefined) {
                    codeForRoom[roomId] = `#include<bits/stdc++.h>
using namespace std;

int main()
{
    // Your C++ Code goes here
    return 0;
}`;
                }
                socket.emit(ACTIONS.CODE_CHANGE, { code: codeForRoom[roomId] });
                
                const clients = getAllClients(io, roomId);

                if (!isReplacingSession) {
                    io.in(roomId).emit(ACTIONS.JOINED, {
                        clients,
                        userName: username,
                        socketId: socket.id,
                    });
                } else {
                    io.in(roomId).emit('update_clients', { clients });
                }

            } catch (error) {
                console.error("Error during JOIN event:", error.message);
                socket.emit('auth_error', { message: 'Authentication failed.' });
            }
        });

        socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
            codeForRoom[roomId] = code;
            socket.to(roomId).emit(ACTIONS.CODE_CHANGE, { code });
        });

        socket.on('disconnecting', () => {
            if (socket.data.isReplaced) {
                return;
            }

            const disconnectingUser = userSocketMap[socket.id];
            if (!disconnectingUser) return;
            
            const rooms = Array.from(socket.rooms);
            rooms.forEach((roomId) => {
                if (roomId !== socket.id) {
                    socket.to(roomId).emit(ACTIONS.DISCONNECTED, {
                        socketId: socket.id,
                        userName: disconnectingUser.userName,
                    });
                }
            });

            delete userSocketMap[socket.id];
        });

        socket.on('kick_user', ({ userIdToKick }) => {
             const socketIdToKick = Object.keys(userSocketMap).find(
                (socketId) => userSocketMap[socketId]?.userId === userIdToKick
            );
            if (socketIdToKick) {
                const socketToKick = io.sockets.sockets.get(socketIdToKick);
                if (socketToKick) {
                    socketToKick.emit('kicked');
                    socketToKick.disconnect(true);
                }
            }
        });
    });
};