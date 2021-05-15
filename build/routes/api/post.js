"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _post = _interopRequireDefault(require("../../models/post"));

var _category = _interopRequireDefault(require("../../models/category"));

var _user = _interopRequireDefault(require("../../models/user"));

require("@babel/polyfill");

var _auth = _interopRequireDefault(require("../../middleware/auth"));

var _moment = _interopRequireDefault(require("moment"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _path = _interopRequireDefault(require("path"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _comment = _interopRequireDefault(require("../../models/comment"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

_dotenv["default"].config();

var s3 = new _awsSdk["default"].S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY
});
var uploadS3 = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    bucket: "mazeamazon/upload",
    region: "ap-northeast-2",
    key: function key(req, file, cb) {
      var ext = _path["default"].extname(file.originalname); //확장자


      var basename = _path["default"].basename(file.originalname, ext); //본래 파일 이름


      cb(null, basename + new Date().valueOf() + ext); //본래 이름 + 날짜 + 확장자
    }
  }),
  limits: {
    fileSize: 100 * 1024 * 1024
  } //파일 사이즈는 100까지,

}); // @route     POST api/post/image
// @desc      Create a Post
// @access    Private

router.post("/image", uploadS3.array("upload", 5), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //사진은 5개 까지만 가능하다
            try {
              //console.log(req.files.map((v) => v.location));//image란 주소를 통해서 배열 형태로 사진을 upload를하면 주소가 req에 들어오게 되는데 들어온 주소 중 file 안의 location 이란 곳이 있는데 그때 각각을 출력해주세요
              res.json({
                uploaded: true,
                url: req.files.map(function (v) {
                  return v.location;
                })
              }); //업로드 되었고 url 은 req. files.location에 있습니다.
            } catch (e) {
              console.error(e);
              res.json({
                uploaded: false,
                url: null
              });
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); //CKEditor에 사진 보여주기
// api/post

router.get("/", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _category["default"].findOne({
              categoryName: {
                $regex: "사진첩",
                //mongodb 정규표현 다음 내용의 글들을 찾아라!
                $options: "i" //mongodb 정규표현 덜 민감하게 찾는다

              }
            }, //posts부분에서 찾아라
            "posts").populate({
              path: "posts",
              options: {
                sort: {
                  'date': -1
                }
              }
            });

          case 3:
            result = _context2.sent;
            //posts 저장
            console.log(result, "Category Find result");
            res.send(result);
            _context2.next = 12;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0, "에러있다고?");
            next(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}()); //const post = await Post.findById(req.params.id)
//.populate({ path: "creator", select: "name" })//populate는 연결된 것들을  만들어주라고 요청하는 것
//.populate({ path: "category", select: "categoryName" });
// @route POST api/post
// @desc Create a Post
// @access Private

router.post("/", _auth["default"], uploadS3.none(), /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var _req$body, title, contents, fileUrl, creator, category, newPost, findResult, newCategory;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            console.log(req, "req 포스팅부분 확인까지 왔습니다 흑흑");
            _req$body = req.body, title = _req$body.title, contents = _req$body.contents, fileUrl = _req$body.fileUrl, creator = _req$body.creator, category = _req$body.category;
            console.log(req.body, "req.body daslkfjaslkfjlaskfjlak");
            _context3.next = 6;
            return _post["default"].create({
              title: title,
              contents: contents,
              fileUrl: fileUrl,
              creatorName: req.body.creatorName,
              creator: req.user.id,
              date: (0, _moment["default"])().format("YYYY-MM-DD HH:mm:ss")
            });

          case 6:
            newPost = _context3.sent;
            console.log((0, _moment["default"])().format("YYYY-MM-DD HH:mm:ss"), "모맨트 포먓 뭐가문제냐고!ㅁㄴ어ㅑㅁㄴ리ㅑㄴ머리ㅏㄴ머리남러ㅑㄴ미럼냐ㅣㅓㄹㄴ미ㅏ럼냐폄내ㅑ퍼매");
            _context3.next = 10;
            return _category["default"].findOne({
              categoryName: category
            });

          case 10:
            findResult = _context3.sent;
            console.log(); //console.log(findResult, "Find Result!!!!");

            if (!(findResult === undefined || findResult === null)) {
              _context3.next = 24;
              break;
            }

            _context3.next = 15;
            return _category["default"].create({
              categoryName: category
            });

          case 15:
            newCategory = _context3.sent;
            _context3.next = 18;
            return _post["default"].findByIdAndUpdate(newPost._id, {
              //위에서 만든 newPost.id로 찾고 category에 newCategory.id를 배열로 넣어달라는 뜻 $(배열로 넣다)
              $push: {
                category: newCategory._id
              }
            });

          case 18:
            _context3.next = 20;
            return _category["default"].findByIdAndUpdate(newCategory._id, {
              //카테고리에서.id로 찾고 posts 안에 newPost.id를 넣어주세요
              $push: {
                posts: newPost._id
              }
            });

          case 20:
            _context3.next = 22;
            return _user["default"].findByIdAndUpdate(req.user.id, {
              //유저 id로 찾고  post 안에 _id를 넣어주세요
              $push: {
                posts: newPost._id
              }
            });

          case 22:
            _context3.next = 30;
            break;

          case 24:
            _context3.next = 26;
            return _category["default"].findByIdAndUpdate(findResult._id, {
              $push: {
                posts: newPost._id
              }
            });

          case 26:
            _context3.next = 28;
            return _post["default"].findByIdAndUpdate(newPost._id, {
              category: findResult._id
            });

          case 28:
            _context3.next = 30;
            return _user["default"].findByIdAndUpdate(req.user.id, {
              $push: {
                posts: newPost._id
              }
            });

          case 30:
            console.log("serverpost 포스팅 완료");
            return _context3.abrupt("return", res.redirect("/api/post/".concat(newPost._id)));

          case 34:
            _context3.prev = 34;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 37:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 34]]);
  }));

  return function (_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}()); // @route POST/post/:id
// @desc Detail Post
// @access public

router.post("/visitor", uploadS3.none(), /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var _req$body2, title, contents, fileUrl, creator, category, newPost, findResult, newCategory;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            console.log(req, "req 포스팅부분 확인까지 왔습니다 흑흑");
            _req$body2 = req.body, title = _req$body2.title, contents = _req$body2.contents, fileUrl = _req$body2.fileUrl, creator = _req$body2.creator, category = _req$body2.category;
            console.log(req.body, "req.body daslkfjaslkfjlaskfjlak");
            _context4.next = 6;
            return _post["default"].create({
              title: title,
              contents: contents,
              fileUrl: fileUrl,
              creatorName: req.body.creatorName,
              creator: "608bd4a61e8b6b1490c4207e",
              date: (0, _moment["default"])().format("YYYY-MM-DD HH:mm:ss")
            });

          case 6:
            newPost = _context4.sent;
            console.log((0, _moment["default"])().format("YYYY-MM-DD HH:mm:ss"), "모맨트 포먓 뭐가문제냐고!ㅁㄴ어ㅑㅁㄴ리ㅑㄴ머리ㅏㄴ머리남러ㅑㄴ미럼냐ㅣㅓㄹㄴ미ㅏ럼냐폄내ㅑ퍼매");
            _context4.next = 10;
            return _category["default"].findOne({
              categoryName: category
            });

          case 10:
            findResult = _context4.sent;
            console.log(); //console.log(findResult, "Find Result!!!!");

            if (!(findResult === undefined || findResult === null)) {
              _context4.next = 24;
              break;
            }

            _context4.next = 15;
            return _category["default"].create({
              categoryName: category
            });

          case 15:
            newCategory = _context4.sent;
            _context4.next = 18;
            return _post["default"].findByIdAndUpdate(newPost._id, {
              //위에서 만든 newPost.id로 찾고 category에 newCategory.id를 배열로 넣어달라는 뜻 $(배열로 넣다)
              $push: {
                category: newCategory._id
              }
            });

          case 18:
            _context4.next = 20;
            return _category["default"].findByIdAndUpdate(newCategory._id, {
              //카테고리에서.id로 찾고 posts 안에 newPost.id를 넣어주세요
              $push: {
                posts: newPost._id
              }
            });

          case 20:
            _context4.next = 22;
            return _user["default"].findByIdAndUpdate(req.user.id, {
              //유저 id로 찾고  post 안에 _id를 넣어주세요
              $push: {
                posts: newPost._id
              }
            });

          case 22:
            _context4.next = 30;
            break;

          case 24:
            _context4.next = 26;
            return _category["default"].findByIdAndUpdate(findResult._id, {
              $push: {
                posts: newPost._id
              }
            });

          case 26:
            _context4.next = 28;
            return _post["default"].findByIdAndUpdate(newPost._id, {
              category: findResult._id
            });

          case 28:
            _context4.next = 30;
            return _user["default"].findByIdAndUpdate("608bd4a61e8b6b1490c4207e", {
              $push: {
                posts: newPost._id
              }
            });

          case 30:
            console.log("serverpost 포스팅 완료");
            return _context4.abrupt("return", res.redirect("/api/post/".concat(newPost._id)));

          case 34:
            _context4.prev = 34;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 37:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 34]]);
  }));

  return function (_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}());
router.get("/:id", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var post;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _post["default"].findById(req.params.id).populate({
              path: "creator",
              select: "name"
            }) //populate는 연결된 것들을  만들어주라고 요청하는 것
            . //populate는 연결된 것들을  만들어주라고 요청하는 것
            populate({
              path: "category",
              select: "categoryName"
            });

          case 3:
            post = _context5.sent;
            post.views += 1;
            post.save();
            console.log(post, "router.get");
            res.json(post);
            _context5.next = 15;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            console.log("여기서 에러뜸");
            console.error(_context5.t0);
            next(_context5.t0);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function (_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}()); // [Comments Route]
// @route Get api/post/:id/comments
// @desc  Get All Comments
// @access public

router.get("/:id/comments", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var comment, result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _post["default"].findById(req.params.id).populate({
              path: "comments"
            });

          case 3:
            comment = _context6.sent;
            //console.log("1 \n")
            result = comment.comments; //console.log("1 \n")

            console.log(result, "comment load"); //console.log("1 \n")

            res.json(result); //console.log("1 \n")

            _context6.next = 11;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));

  return function (_x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}());
router.post("/:id/comments", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
    var newComment;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            //console.log(req.body, "dddddddddsadasdasjfkjsahvklsdjvlasㄴㅁ야ㅓㅁ나롬날");
            console.log(req.body.userId);

            if (!(req.body.userId != null)) {
              _context7.next = 8;
              break;
            }

            _context7.next = 4;
            return _comment["default"].create({
              contents: req.body.contents,
              creator: req.body.userId,
              creatorName: req.body.userName,
              post: req.body.id,
              date: (0, _moment["default"])().format("YYYY-MM-DD HH:mm:ss")
            });

          case 4:
            newComment = _context7.sent;
            console.log("테스트중1");
            _context7.next = 12;
            break;

          case 8:
            _context7.next = 10;
            return _comment["default"].create({
              contents: req.body.contents,
              creator: "60333686f69c0850e09eaa08",
              creatorName: "손님",
              post: req.body.id,
              date: (0, _moment["default"])().format("YYYY-MM-DD HH:mm:ss")
            });

          case 10:
            newComment = _context7.sent;
            console.log("테스트중2");

          case 12:
            console.log(newComment, "newComment");
            _context7.prev = 13;
            _context7.next = 16;
            return _post["default"].findByIdAndUpdate(req.body.id, {
              $push: {
                comments: newComment._id
              }
            });

          case 16:
            _context7.next = 18;
            return _user["default"].findByIdAndUpdate(req.body.userId, {
              $push: {
                comments: {
                  post_id: req.body.id,
                  comment_id: newComment._id
                }
              }
            });

          case 18:
            res.json(newComment);
            _context7.next = 24;
            break;

          case 21:
            _context7.prev = 21;
            _context7.t0 = _context7["catch"](13);
            //console.log(e, "여기ㅁㄴㅇㅁㄴㄹㄴㅁㅍㅌ큩츌ㅇㅎㄴㄻㄴㅇ요");
            next(_context7.t0);

          case 24:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[13, 21]]);
  }));

  return function (_x17, _x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}()); // @route    Delete api/post/:id
// @desc     Delete a Post
// @access   Private

router["delete"]("/:id", _auth["default"], /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var CategoryUpdateResult;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            console.log(req.params, "1sdsdsds");
            _context8.next = 3;
            return _post["default"].deleteMany({
              _id: req.params.id
            });

          case 3:
            _context8.next = 5;
            return _comment["default"].deleteMany({
              post: req.params.id
            });

          case 5:
            console.log(req.params, "1dsdsdsd");
            console.log(req.user.id, "1dsdsdsd");
            _context8.next = 9;
            return _user["default"].findByIdAndUpdate(req.user.id, {
              //글쓴이의 ID
              $pull: {
                posts: req.params.id,
                comments: {
                  post_id: req.params.id
                }
              }
            });

          case 9:
            _context8.next = 11;
            return _category["default"].findOneAndUpdate({
              posts: req.params.id
            }, {
              $pull: {
                posts: req.params.id
              }
            }, {
              "new": true
            } //이것을 적용해야 업데이트가 적용된다.
            );

          case 11:
            CategoryUpdateResult = _context8.sent;

            if (!(CategoryUpdateResult.posts.length === 0)) {
              _context8.next = 15;
              break;
            }

            _context8.next = 15;
            return _category["default"].deleteMany({
              _id: CategoryUpdateResult
            });

          case 15:
            return _context8.abrupt("return", res.json({
              success: true
            }));

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x20, _x21) {
    return _ref8.apply(this, arguments);
  };
}()); // @route    GET api/post/:id/edit
// @desc     Edit Post
// @access   Private

router.get("/:id/edit", _auth["default"], /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res, next) {
    var post;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _post["default"].findById(req.params.id).populate("creator", "name");

          case 3:
            post = _context9.sent;
            res.json(post);
            _context9.next = 10;
            break;

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            console.error(_context9.t0);

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 7]]);
  }));

  return function (_x22, _x23, _x24) {
    return _ref9.apply(this, arguments);
  };
}());
router.post("/:id/edit", _auth["default"], /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res, next) {
    var _req$body3, title, contents, fileUrl, id, modified_post;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            console.log(req, "api/post/:id/edit");
            _req$body3 = req.body, title = _req$body3.title, contents = _req$body3.contents, fileUrl = _req$body3.fileUrl, id = _req$body3.id;
            _context10.prev = 2;
            _context10.next = 5;
            return _post["default"].findByIdAndUpdate(id, {
              title: title,
              contents: contents,
              fileUrl: fileUrl,
              date: (0, _moment["default"])().format("YYYY-MM-DD HH:mm:ss")
            }, {
              "new": true
            });

          case 5:
            modified_post = _context10.sent;
            console.log(modified_post, "edit modified");
            res.redirect("/api/post/".concat(modified_post.id));
            _context10.next = 14;
            break;

          case 10:
            _context10.prev = 10;
            _context10.t0 = _context10["catch"](2);
            console.log(_context10.t0);
            next(_context10.t0);

          case 14:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[2, 10]]);
  }));

  return function (_x25, _x26, _x27) {
    return _ref10.apply(this, arguments);
  };
}());
router.get("/category/:categoryName", /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res, next) {
    var result;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return _category["default"].findOne({
              categoryName: {
                $regex: req.params.categoryName,
                //mongodb 정규표현 다음 내용의 글들을 찾아라!
                $options: "i" //mongodb 정규표현 덜 민감하게 찾는다

              }
            }, //posts부분에서 찾아라
            "posts").populate({
              path: "posts",
              options: {
                sort: {
                  'date': -1
                }
              }
            });

          case 3:
            result = _context11.sent;
            //posts 저장
            console.log(result, "Category Find result");
            res.send(result);
            _context11.next = 12;
            break;

          case 8:
            _context11.prev = 8;
            _context11.t0 = _context11["catch"](0);
            console.log(_context11.t0);
            next(_context11.t0);

          case 12:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 8]]);
  }));

  return function (_x28, _x29, _x30) {
    return _ref11.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;