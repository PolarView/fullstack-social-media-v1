import express from "express";
const router = express.Router();
import { getLikes, addLike, deleteLike } from "../controllers/like.js";

router.get("/", getLikes);

router.post("/addLike", addLike);

router.delete("/deleteLike", deleteLike);

export default router;
