//postController.ts
import { Request, Response, NextFunction } from 'express';
import {
  addPost,
  getPost as fetchPost,
  editPost,
  removePost,
} from '../services/postService';
import { CreatePostDTO, UpdatePostDTO } from '../DTOs/postDTO';

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postData: CreatePostDTO = req.body;
    const newPost = await addPost(postData);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = Number(req.params.id);
    const post = await fetchPost(postId);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = Number(req.params.id);
    const updateData: UpdatePostDTO = req.body;
    const updatedPost = await editPost(postId, updateData);
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = Number(req.params.id);
    await removePost(postId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
