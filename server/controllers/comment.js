import db from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
export const getCommnets = async (req, res) => {
  const { postId: post_id } = req.query;
  const q = `SELECT c.*, u.id AS userId, u.username, u.profile_picture FROM comments AS c JOIN users AS u ON (u.id = c.user_id)
  WHERE c.post_id = ? ORDER BY c.created_at DESC
  `;
  const [result] = await db.query(q, [post_id]);
  return res.status(200).json(result);
};

export const createComment = async (req, res) => {
  // check if user authorized
  const token = req?.cookies?.accessToken;
  let userId;

  if (!token) {
    return res.status(401).json("u are not logged in");
  }

  jwt.verify(token, "mysupersecretkey", (err, data) => {
    if (err) return res.status(403).json("Token is not valid");
    else {
      userId = data.id;
    }
  });
  const { commentBody, postId } = req.body;
  const q = "INSERT INTO comments(`body`, `created_at`, `user_id`, `post_id`) VALUES(?)";
  const [result] = await db.query(q, [
    [commentBody, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), userId, postId]
  ]);
  return res.status(200).json("Comment created");
  // add comment to the db
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.query;
  const q = "DELETE FROM comments WHERE id = ?";

  const [result] = await db.query(q, [commentId]);
  return res.status(200).json("comment has been deleted");
};
