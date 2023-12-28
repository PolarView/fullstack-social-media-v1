import express from "express";

import { getUserProfile, getUserPosts } from "../controllers/user.js";

const router = express.Router();

router.get("/getUserProfile/:id", getUserProfile);
router.get("/getUserPosts/:id", getUserPosts);

export default router;
