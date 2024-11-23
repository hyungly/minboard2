import { Router } from 'express';
import {
  login,
  register,
  googleCallback,
  handleSendVerificationCode,
  handleVerifyCode,
} from '../controllers/authController';
import passport from 'passport';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  googleCallback
);

// 이메일 인증 관련 라우트 추가
router.post('/send-verification-code', handleSendVerificationCode);
router.post('/verify-code', handleVerifyCode);

export default router;
