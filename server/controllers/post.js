import db from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = async (req, res) => {
  const token = req?.cookies?.accessToken;
  let userId;
  if (!token) return res.status(401).json("u are not logged in");

  jwt.verify(token, "mysupersecretkey", (err, data) => {
    if (err) return res.status(403).json("Token is not valid");
    else {
      userId = data.id;
    }
  });

  const q = `SELECT p.*, u.id AS userId, u.username, profile_picture FROM posts AS p JOIN users AS u ON (u.id = p.user_id)
  LEFT JOIN relationships AS r ON (p.user_id = r.followed_user_id) WHERE r.follower_user_id = ? OR p.user_id = ?
  ORDER BY p.created_at DESC`;

  const [result] = await db.query(q, [userId, userId]);
  return res.status(200).json(result);
};

export const createPost = async (req, res) => {
  const token = req?.cookies?.accessToken;
  let userId;
  if (!token) return res.status(401).json("u are not logged in");

  jwt.verify(token, "mysupersecretkey", (err, data) => {
    if (err) return res.status(403).json("Token is not valid");
    else {
      userId = data.id;
    }
  });
  const { title, description, image } = req.body;

  const q =
    "INSERT INTO posts(`title`, `description`, `image`, `user_id`, `created_at`) VALUES (?) ";
  const [result] = await db.query(q, [
    [title, description, image || null, userId, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")]
  ]);
  return res.status(200).json("Post created");
};

export const deletePost = async (req, res) => {
  const { postId } = req.query;
  const q = "DELETE FROM posts WHERE id = ?";

  const [result] = await db.query(q, [postId]);
  return res.status(200).json("post has been deleted");
};
