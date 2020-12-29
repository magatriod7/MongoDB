import express from "express";

import { getPost, postPost } from "../controllers/postController"
// Model
import Post from "../models/post";
//몽구스 포스트 스키마 import

const postRouter = express.Router();

// api/post
postRouter.get("/", getPost);

postRouter.post("/", postPost);

export default postRouter;