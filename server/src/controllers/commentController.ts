//commentService.ts
import { Request, Response, NextFunction } from 'express';
import {
  addComment,
  fetchCommentById,
  modifyComment,
  removeComment,
} from '../services/commentService';

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commentData = req.body;
    const newComment = await addComment(commentData);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const comment = await fetchCommentById(Number(id));
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const editComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedComment = await modifyComment(Number(id), updateData);
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await removeComment(Number(id));
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
};
