import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";
import commentRouter from "./routes/commnets.js";
import likeRouter from "./routes/likes.js";
import relationshipRouter from "./routes/relationships.js";
import multer from "multer";
const app = express();

// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/likes", likeRouter);
app.use("/relationships", relationshipRouter);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

const PORT = "8000";
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
