// src/routes/userRoutes.ts
import { Router } from 'express';
import {
  getUser,
  listUsers,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { register } from '../controllers/authController'; // authController의 register 메서드 가져오기

const router = Router();

router.post('/', register); // 회원 생성
router.get('/', listUsers); // 모든 사용자 조회
router.get('/:id', getUser); // 특정 사용자 조회
router.put('/:id', updateUser); // 사용자 정보 수정
router.delete('/:id', deleteUser); // 사용자 삭제

export default router;
