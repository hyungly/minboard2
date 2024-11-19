//postRoute.ts
import { Router } from 'express';
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
} from '../controllers/postController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateJWT, createPost);
router.get('/:id', getPost);
router.put('/:id', authenticateJWT, updatePost);
router.delete('/:id', authenticateJWT, deletePost);

export default router;
