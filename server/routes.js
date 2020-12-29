//import postRoutes from "./routes/post";
import userRoutes from "./routes/user";

const express = require('express');
const router = express.Router();



console.log("it works");
//router.use("/routes/post", postRoutes);


router.use("/routes/user", userRoutes);



module.exports = router;