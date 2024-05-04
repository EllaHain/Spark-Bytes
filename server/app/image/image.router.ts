import express from 'express';
import { authToken } from '../middleware/authToken.ts';
import * as imageController from '../image/image.controller.ts' 

const router = express.Router();

router.use(authToken);

// router.post('/create', imageController.createImage);
router.post('/submit', imageController.submitImages);

export default router;