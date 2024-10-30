// profileRoutes.ts
import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get('/me', authenticateJWT, getProfile);
router.put('/me', authenticateJWT, updateProfile);

export default router;
