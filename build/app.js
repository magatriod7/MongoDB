"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

var _hpp = _interopRequireDefault(require("hpp"));

var _helmet = _interopRequireWildcard(require("helmet"));

var _path = _interopRequireDefault(require("path"));

var _post = _interopRequireDefault(require("./routes/api/post"));

var _user = _interopRequireDefault(require("./routes/api/user"));

var _auth = _interopRequireDefault(require("./routes/api/auth"));

var _search = _interopRequireDefault(require("./routes/api/search"));

var _morgan = _interopRequireDefault(require("morgan"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Routes
var app = (0, _express["default"])();
var MONGO_URI = _config["default"].MONGO_URI;
var prod = process.env.NODE_ENV === "production";
app.use((0, _hpp["default"])());
app.use((0, _helmet["default"])({
  contentSecurityPolicy: false
}));
app.use((0, _cors["default"])({
  origin: true,
  credentials: true
}));
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());

_mongoose["default"].connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(function () {
  return console.log("MongoDB connecting Success!!");
})["catch"](function (e) {
  return console.log(e);
}); // Use routes


app.use("/api/post", _post["default"]);
app.use("/api/user", _user["default"]);
app.use("/api/auth", _auth["default"]);
app.use("/api/search", _search["default"]);

if (prod) {
  console.log("테스트중입니다.");
  app.use(_express["default"]["static"](_path["default"].join(__dirname, "../client/build")));
  console.log("테스트중입니다.");
  app.get("*", function (req, res) {
    console.log("인덱스 일하는 중1");
    res.sendFile(_path["default"].resolve(__dirname, "../client/build", "index.html"));
    console.log("인덱스 일하는 중2");
  });
  console.log("테스트중입니다.");
}

var _default = app;
exports["default"] = _default;