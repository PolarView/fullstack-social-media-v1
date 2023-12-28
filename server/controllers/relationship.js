import db from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = async (req, res) => {
  const q = "SELECT follower_user_id FROM relationships WHERE followed_user_id = ?";
  const { followedUserId } = req.query;

  const [result] = await db.query(q, [followedUserId]);
  const followersIdArray = result.map((follower) => follower.follower_user_id);
  return res.status(200).json(followersIdArray);
};

export const followUser = async (req, res) => {
  const token = req?.cookies?.accessToken;
  if (!token) return res.status(401).json("please login");
  let userId;
  jwt.verify(token, "mysupersecretkey", (err, data) => {
    if (err) return res.status(403).json("Token is not valid");
    else {
      userId = data.id;
    }
  });

  const { followedUserId } = req.body;
  const q = "INSERT INTO relationships (`follower_user_id`, `followed_user_id`) VALUES(?)";
  const [result] = await db.query(q, [[userId, followedUserId]]);
  return res.status(200).json("user followed");
};

export const unfollowUser = async (req, res) => {
  const token = req?.cookies?.accessToken;
  if (!token) return res.status(401).json("please login");
  let userId;
  jwt.verify(token, "mysupersecretkey", (err, data) => {
    if (err) return res.status(403).json("Token is not valid");
    else {
      userId = data.id;
    }
  });

  const { followedUserId } = req.query;

  const q = "DELETE FROM relationships WHERE follower_user_id = ? AND followed_user_id = ?";
  const [result] = await db.query(q, [userId, followedUserId]);
  return res.status(200).json("user unfollowed");
};
