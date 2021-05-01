"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../../config/index"));

var _auth = _interopRequireDefault(require("../../middleware/auth"));

var _user = _interopRequireDefault(require("../../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var JWT_SECRET = _index["default"].JWT_SECRET; // Model

var router = _express["default"].Router(); // @routes     GET api/user
// @desc       Get all user
// @access     public


router.get("/", /*#__PURE__*/function () {
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

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // @routes     POST api/user
// @desc       Register  user
// @access     public

router.post("/", function (req, res) {
  //console.log(req);
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
    });

    _bcryptjs["default"].genSalt(10, function (err, salt) {
      _bcryptjs["default"].hash(newUser.password, salt, function (err, hash) {
        if (err) throw err;
        newUser.password = hash; //암호화된 비밀번호 넣음

        newUser.save().then(function (user) {
          //암호화된 비밀번호 저장
          _jsonwebtoken["default"].sign({
            id: user.id
          }, JWT_SECRET, {
            expiresIn: 3600
          }, //만기일 적용: 3600초 1시간 후에 다시 로그인 해야함
          function (err, token) {
            if (err) throw err;
            res.json({
              token: token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              } //후에 json 타입으로 응답을 해줌 (user안에 들어 있음)

            });
          });
        });
      });
    });
  });
}); // @route    POST   api/user/:username/profile
// @desc     POST   Edit Password
// @access   Private

router.post("/:userName/profile", _auth["default"], /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, previousPassword, password, rePassword, userId, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, previousPassword = _req$body2.previousPassword, password = _req$body2.password, rePassword = _req$body2.rePassword, userId = _req$body2.userId;
            console.log(req.body, "userName Profile");
            _context2.next = 5;
            return _user["default"].findById(userId, "password");

          case 5:
            result = _context2.sent;
            console.log(result, "dsadsadsad");

            _bcryptjs["default"].compare(previousPassword, result.password).then(function (isMatch) {
              if (!isMatch) {
                console.log("기존 비번과 다름");
                return res.status(400).json({
                  match_msg: "기존 비밀번호와 일치하지 않습니다"
                });
              } else {
                if (password === rePassword) {
                  _bcryptjs["default"].genSalt(10, function (err, salt) {
                    _bcryptjs["default"].hash(password, salt, function (err, hash) {
                      if (err) throw err;
                      result.password = hash;
                      result.save();
                    });
                  });

                  return res.status(200).json({
                    success_msg: "비밀번호 업데이트에 성공했습니다"
                  });
                } else {
                  //console.log("비번이 일치하지 않음")
                  return res.status(400).json({
                    fail_msg: "새로운 비밀번호가 일치하지 않습니다"
                  });
                }
              }
            });

            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;