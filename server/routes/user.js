import express from "express";
import bcrypt from "bcryptjs";


import config from "../config/index";


// Model

import { getUser, postUser } from "../controllers/userController";

const router = express.Router();

// @routes     GET api/user
// @desc       Get all user
// @access     public

console.log("it works");

router.get("/", getUser);

// @routes     POST api/user
// @desc       Register  user
// @access     public

router.post("/", postUser);

export default router;