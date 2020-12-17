import postRoutes from "./routes/api/post";
import userRoutes from "./routes/api/user";

const express = require('express');
const router = express.Router();



console.log("it works");
router.post("/api/post", postRoutes);
router.post("/api/user", userRoutes);

module.exports = router;