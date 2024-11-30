// authRoutes.ts
import { Router } from 'express';
import {
  login,
  register,
  // logout,
  handleSendVerificationCode,
  handleVerifyCode,
  handleForgotPassword,
  handleResetPassword,
  googleCallback,
} from '../controllers/authController';
import passport from 'passport';

const router = Router();

router.post('/login', login);
router.post('/register', register);
// router.post('/logout', logout);

router.post('/email/send-verification-code', handleSendVerificationCode);
router.post('/email/verify-code', handleVerifyCode);

router.post('/password/forgot', handleForgotPassword);
router.post('/password/reset', handleResetPassword);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  googleCallback
);

export default router;
