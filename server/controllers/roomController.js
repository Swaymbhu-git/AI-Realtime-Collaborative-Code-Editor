import Room from '../models/Room.js';
import User from '../models/User.js';
import axios from 'axios';

// --- Room Management ---

export const getRoom = async (req, res) => {
    try {
        const room = await Room.findOne({ roomId: req.params.roomId });
        if (!room) {
            return res.status(404).json({ message: 'Room not found.' });
        }
        if (!room.members.map(id => id.toString()).includes(req.user.id)) {
            return res.status(403).json({ message: 'You are not a member of this room.' });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createRoom = async (req, res) => {
    try {
        const { roomId } = req.body;
        const ownerId = req.user.id;
        const newRoom = new Room({ roomId, owner: ownerId, members: [ownerId] });
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ message: 'Server error while creating room.' });
    }
};

export const inviteUser = async (req, res) => {
    try {
        const { roomId, inviteeEmail } = req.body;
        const ownerId = req.user.id;
        const room = await Room.findOne({ roomId });

        if (!room) {
            return res.status(404).json({ message: 'Room not found.' });
        }

        if (!room.owner.equals(ownerId)) {
            return res.status(403).json({ message: 'Only the room owner can invite users.' });
        }

        const invitee = await User.findOne({ email: inviteeEmail });
        if (!invitee) return res.status(404).json({ message: 'User to invite not found.' });

        if (!room.members.some(memberId => memberId.equals(invitee._id))) {
            room.members.push(invitee._id);
            await room.save();
        }
        
        res.json({ message: 'User invited successfully.' });
    } catch (error) {
        console.error('Invite Error:', error);
        res.status(500).json({ message: 'Server error during invite.' });
    }
};


export const kickUser = async (req, res) => {
    try {
        const { roomId, userIdToKick } = req.body;
        const ownerId = req.user.id;

        const room = await Room.findOne({ roomId });
        if (!room) return res.status(404).json({ message: 'Room not found.' });
        
        // CORRECTED: Use .equals() for reliable ownership check
        if (!room.owner.equals(ownerId)) {
            return res.status(403).json({ message: 'Only the room owner can kick users.' });
        }
        if (ownerId === userIdToKick) return res.status(400).json({ message: 'Owner cannot be kicked.' });

        room.members.pull(userIdToKick);
        await room.save();
        
        res.json({ message: 'User access revoked. They will be disconnected shortly.' });
    } catch (error) {
        console.error('Kick error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// --- Secure API Proxies ---

export const runCode = async (req, res) => {
    const { language_id, source_code, stdin } = req.body;
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: { base64_encoded: 'true', wait: 'true' },
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
        data: { language_id, source_code, stdin },
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error('RapidAPI Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error executing code via external service.' });
    }
};

export const askAi = async (req, res) => {
    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await axios.post(apiUrl, {
            contents: [{ parts: [{ text: prompt }] }],
        });
        res.json(response.data);
    } catch (error) {
        console.error('Gemini API Error:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error communicating with AI assistant.' });
    }
};