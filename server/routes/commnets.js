import express from "express";
const router = express.Router();
import { getCommnets, createComment, deleteComment } from "../controllers/comment.js";

router.get("/", getCommnets);
router.post("/", createComment);
router.delete("/deleteComment", deleteComment);

export default router;
