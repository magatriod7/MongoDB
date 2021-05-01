"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postUser = exports.getUser = void 0;

var _express = _interopRequireDefault(require("express"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../config/index"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var JWT_SECRET = _index["default"].JWT_SECRET; // Model

var router = _express["default"].Router(); // @routes     GET api/user
// @desc       Get all user
// @access     public


var getUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user["default"].find();

          case 3:
            users = _context.sent;

            if (users) {
              _context.next = 6;
              break;
            }

            throw Error("No users");

          case 6:
            res.status(200).json(users);
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(400).json({
              msg: _context.t0.message
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function getUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // @routes     POST api/user
// @desc       Register  user
// @access     public


exports.getUser = getUser;

var postUser = function postUser(req, res) {
  console.log("user.posting");
  console.log(req);
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password; // Simple validation

  if (!name || !email || !password) {
    return res.status(400).json({
      msg: "모든 필드를 채워주세요"
    });
  } // Check for existing user


  _user["default"].findOne({
    email: email
  }).then(function (user) {
    if (user) return res.status(400).json({
      msg: "이미 가입된 유저가 존재합니다"
    });
    var newUser = new _user["default"]({
      name: name,
      email: email,
      password: password
    }); //받은 비밀번호를 암호화해주는 코드.

    _bcryptjs["default"].genSalt(10, function (err, salt) {
      _bcryptjs["default"].hash(newUser.password, salt, function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(function (user) {
          //몽구스 save.then구문
          _jsonwebtoken["default"].sign( //webtalken sign 구문
          {
            id: user.id
          }, JWT_SECRET, {
            expiresIn: 3600
          }, function (err, token) {
            if (err) throw err;
            res.json({
              token: token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          });
        });
      });
    });
  });
};

exports.postUser = postUser;