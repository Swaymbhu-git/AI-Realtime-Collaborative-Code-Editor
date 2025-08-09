import express from 'express';
import { getRoom, createRoom, inviteUser, kickUser, runCode, askAi } from '../controllers/roomController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:roomId', authMiddleware, getRoom);
router.post('/create', authMiddleware, createRoom);
router.post('/invite', authMiddleware, inviteUser);
router.post('/kick', authMiddleware, kickUser);

// New secure proxy routes
router.post('/run-code', authMiddleware, runCode);
router.post('/ask-ai', authMiddleware, askAi);

export default router;