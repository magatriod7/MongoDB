"use strict";

var _app = _interopRequireDefault(require("./app"));

var _index = _interopRequireDefault(require("./config/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = _index["default"].PORT,
    JWT_SECRET = _index["default"].JWT_SECRET,
    MONGO_URI = _index["default"].MONGO_URI;

_app["default"].listen(PORT, function () {
  console.log("Server started on Port ".concat(PORT));
  console.log("JWT_SECRET ".concat(JWT_SECRET));
  console.log("MONGO_URI ".concat(MONGO_URI));
});