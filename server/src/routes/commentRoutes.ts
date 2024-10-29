import { Router } from 'express';
import { createComment, getComment, deleteComment } from '../controllers/commentController';

const router = Router();

router.post('/', createComment);
router.get('/:id', getComment);
router.delete('/:id', deleteComment);

export default router;
