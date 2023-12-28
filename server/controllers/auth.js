import db from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // check whether user already exists
  let q;
  q = "SELECT * FROM users WHERE username = ?";
  const [rows] = await db.query(q, [req.body.username]);

  if (rows.length) return res.status(409).json("User with this name alredy exists");
  else {
    const { username, email, password, name } = req.body;
    // create user and hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    //  send post request to db
    q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)";
    const values = [username, email, hashedPassword, name];
    const result = await db.query(q, [values]);
    return res.json(result);
  }
};

export const login = async (req, res) => {
  // check is username with that nick exists
  let q;
  const { username, password } = req.body;
  q = "SELECT * FROM users WHERE username = ?";
  const [rows] = await db.query(q, [username]);
  if (rows.length === 0) return res.status(404).json("User with this username doesnt exists");
  else {
    const user = rows[0];
    const compareData = await bcrypt.compare(password, user.password);
    // check whether password or username is correct
    if (!compareData) return res.status(400).json("Wrong password or username");
    //TODO use env for jwt key
    const token = jwt.sign({ id: user.id }, "mysupersecretkey");

    const { password: pass, ...userData } = user;

    return res
      .cookie("accessToken", token, { httpOnly: true, maxAge: 90000000000 })
      .status(200)
      .json(userData);
  }
};

export const logout = (req, res) => {
  const token = req?.cookies?.accessToken;
  if (token) {
    return res
      .clearCookie("accessToken", { secure: true, sameSite: "none" })
      .status(200)
      .json("Loged out");
  } else {
    return res.json("You are already logged out");
  }
};
