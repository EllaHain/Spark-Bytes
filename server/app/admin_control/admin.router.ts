import express from 'express';
import { authToken } from '../middleware/authToken.ts';
import * as eventController from './admin.controller.ts';
// /api/events/
const router = express.Router();

router.use(authToken);
router.post('/admin', eventController.edit_users);

export default router;
