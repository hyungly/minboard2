import { Router } from 'express';
import {
  createComment,
  getComment,
  editComment, // editComment 추가
  deleteComment,
} from '../controllers/commentController';

const router = Router();

router.post('/', createComment);
router.get('/:id', getComment);
router.put('/:id', editComment); // PUT 메소드로 수정 처리
router.delete('/:id', deleteComment);

export default router;
