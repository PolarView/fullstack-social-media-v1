import express from "express";
import { followUser, getRelationships, unfollowUser } from "../controllers/relationship.js";

const router = express.Router();

router.get("/getRelationships", getRelationships);
router.post("/followUser", followUser);
router.delete("/unfollowUser", unfollowUser);

export default router;
