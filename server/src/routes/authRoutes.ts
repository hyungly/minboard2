// authRoutes.ts
import { Router } from 'express';
import { login, register, googleCallback } from '../controllers/authController';
import passport from 'passport';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleCallback);

export default router;
