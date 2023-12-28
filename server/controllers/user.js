import db from "../connect.js";

export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM users WHERE id = ?";

  const [result] = await db.query(q, [id]);
  return res.status(200).json(result[0]);
};

export const getUserPosts = async (req, res) => {
  const { id } = req.params;
  const q =
    "SELECT p.*, u.username FROM posts AS p JOIN users AS u ON (u.id = p.user_id) WHERE user_id = ?";

  const [result] = await db.query(q, [id]);
  return res.status(200).json(result);
};
