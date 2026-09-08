import express from 'express';

import { createGroup, getMyGroups, addMember } from '../controllers/groupController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createGroup);
router.get('/', authMiddleware, getMyGroups);
router.post('/:groupId/members', authMiddleware, addMember);

export default router;