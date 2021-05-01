"use strict";

var _user = _interopRequireDefault(require("./routes/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import postRoutes from "./routes/post";
var express = require('express');

var router = express.Router();
console.log("it works"); //router.use("/routes/post", postRoutes);

router.use("/routes/user", _user["default"]);
module.exports = router;