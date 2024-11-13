// profileRoutes.ts
import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// 프로필 조회 및 수정
router.get('/me', authenticateJWT, getProfile);  // 로그인된 사용자만 본인 프로필 조회
router.put('/me', authenticateJWT, updateProfile);  // 로그인된 사용자만 본인 프로필 수정

export default router;
