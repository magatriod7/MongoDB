import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import config from "./config";
import hpp from "hpp";
import helmet, { contentSecurityPolicy } from "helmet";
import path from 'path'
// Routes
import postRoutes from "./routes/api/post";
import userRoutes from "./routes/api/user";
import authRoutes from "./routes/api/auth";
import searchRoutes from "./routes/api/search";

import morgan from "morgan";

const app = express();
const { MONGO_URI } = config;
const prod = process.env.NODE_ENV === "production"
app.use(hpp());
app.use(helmet({contentSecurityPolicy: false,}));

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connecting Success!!"))
  .catch((e) => console.log(e));

// Use routes
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);

// if(prod) {
//   console.log("테스트중입니다.");
//   app.use(express.static(path.join(__dirname, "../client/build")))
//   console.log("테스트중입니다.");
//   app.get("*", (req,res) => {
//     console.log("인덱스 일하는 중1");
//     res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
//     console.log("인덱스 일하는 중2");
//   })
//   console.log("테스트중입니다.");

// }

export default app;
