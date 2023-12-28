import db from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = async (req, res) => {
  const q = "SELECT user_id FROM likes WHERE post_id = ?";
  const { postId } = req.query;
  const [result] = await db.query(q, [postId]);
  const usersLikes = result.map((item) => item.user_id);
  return res.status(200).json(usersLikes);
};

export const addLike = async (req, res) => {
  const token = req?.cookies?.accessToken;
  let userId;
  if (!token) return res.status(401).json("Please log in");

  jwt.verify(token, "mysupersecretkey", (err, data) => {
    if (err) return res.status(403).json("Token is not valid");
    else {
      userId = data.id;
    }
  });

  const q = "INSERT INTO likes(`user_id`, `post_id`) VALUES(?)";
  const { postId } = req.body;
  const [result] = await db.query(q, [[userId, postId]]);
  return res.status(200).json("post has been liked");
};

export const deleteLike = async (req, res) => {
  const token = req?.cookies?.accessToken;
  if (!token) return res.ststus(401).json("Please log in");

  let userId;
  jwt.verify(token, "mysupersecretkey", (err, data) => {
    if (err) return res.status(403).json("Token is not valid");
    else {
      userId = data.id;
    }
  });

  const q = "DELETE FROM likes WHERE user_id = ? AND post_id = ?";
  const { postId } = req.query;
  const [result] = await db.query(q, [userId, postId]);
  return res.status(200).json("post has been unliked");
};
