import { Router } from 'express';
import { createPost, getPost, updatePost, deletePost } from '../controllers/postController';

const router = Router();

router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;