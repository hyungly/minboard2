// src/routes/userRoutes.ts
import { Router } from 'express';
import {
  getUser,
  listUsers,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { getProfile, updateProfile } from '../controllers/profileController';
import { authenticateJWT } from '../middlewares/authMiddleware';

import { register } from '../controllers/authController'; // authController의 register 메서드 가져오기

const router = Router();

router.post('/', register); // 회원 생성
router.get('/', listUsers); // 모든 사용자 조회
router.get('/:id', getUser); // 특정 사용자 조회
router.put('/:id', updateUser); // 사용자 정보 수정
router.delete('/:id', deleteUser); // 사용자 삭제

// 프로필 조회 및 수정
router.get('/me', authenticateJWT, getProfile); // 로그인된 사용자만 본인 프로필 조회
router.put('/me', authenticateJWT, updateProfile); // 로그인된 사용자만 본인 프로필 수정

export default router;
