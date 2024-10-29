import { Router } from 'express';
import { register, login, logout, getUser } from '../controllers/userController';

const router = Router();

router.post('/', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/:id', getUser);

export default router;
