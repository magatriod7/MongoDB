import express from 'express'

const router = express.Router();

import Post from "../../models/post"
import Category from "../../models/category"
import User from "../../models/user"
import auth from "../../middleware/auth"
import moment from "moment"

import multer from "multer";//파일을 주고 받는 것을 도와주는 라이브러리
import multerS3 from "multer-s3";//s3 관련 multer
import path from "path";//경로를 쉽게 파악 가능
import AWS from "aws-sdk";//아마존 서버 이용이 용이하기 위한 개발자 도구
import dotenv from "dotenv";
import Comment from "../../models/comment";
import { isNullOrUndefined } from 'util';
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: "mazeamazon/upload",
    region: "ap-northeast-2",
    key(req, file, cb) {
      const ext = path.extname(file.originalname);//확장자
      const basename = path.basename(file.originalname, ext);//본래 파일 이름
      cb(null, basename + new Date().valueOf() + ext);//본래 이름 + 날짜 + 확장자
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 }//파일 사이즈는 100까지,
});

// @route     POST api/post/image
// @desc      Create a Post
// @access    Private

router.post("/image", uploadS3.array("upload", 5), async (req, res, next) => {//사진은 5개 까지만 가능하다
  try {
    //console.log(req.files.map((v) => v.location));//image란 주소를 통해서 배열 형태로 사진을 upload를하면 주소가 req에 들어오게 되는데 들어온 주소 중 file 안의 location 이란 곳이 있는데 그때 각각을 출력해주세요
    res.json({ uploaded: true, url: req.files.map((v) => v.location) });//업로드 되었고 url 은 req. files.location에 있습니다.
  } catch (e) {
    console.error(e);
    res.json({ uploaded: false, url: null });
  }
});//CKEditor에 사진 보여주기

// api/post
router.get("/", async (req, res) => {
  const postFindResult = await Post.find()
    .populate({ path: "creator", select: "name" })//populate는 연결된 것들을  만들어주라고 요청하는 것
    .populate({ path: "category", select: "categoryName" });

  const categoryFindResult = await Category.find();
  const result = { postFindResult, categoryFindResult };

  res.json(result);
  console.log(postFindResult, "All Post Get");
  //res.json(postFindResult);
});

//const post = await Post.findById(req.params.id)
//.populate({ path: "creator", select: "name" })//populate는 연결된 것들을  만들어주라고 요청하는 것
//.populate({ path: "category", select: "categoryName" });

// @route POST api/post
// @desc Create a Post
// @access Private

router.post("/", auth, uploadS3.none(), async (req, res, next) => {
  try {
    //console.log(req, "req 포스팅부분 확인까지 왔습니다 흑흑");
    const { title, contents, fileUrl, creator, category } = req.body;
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creatorName: req.body.creatorName,
      creator: req.user.id,
      data: moment().format("YYYY-MM-DD hh:mm:ss"),
    });

    const findResult = await Category.findOne({
      categoryName: category,
    });

    console.log(req.body, "리퀘바디")
    console.log(req.user, "리퀘유저")
    console.log(req.data, "데이터")
    console.log()
    //console.log(findResult, "Find Result!!!!");

    if (findResult === undefined || findResult === null) {//카테고리가 없을 경우
      const newCategory = await Category.create({
        categoryName: category,
      });
      await Post.findByIdAndUpdate(newPost._id, {//위에서 만든 newPost.id로 찾고 category에 newCategory.id를 배열로 넣어달라는 뜻 $(배열로 넣다)
        $push: { category: newCategory._id },
      });
      await Category.findByIdAndUpdate(newCategory._id, {//카테고리에서.id로 찾고 posts 안에 newPost.id를 넣어주세요
        $push: { posts: newPost._id },
      });
      await User.findByIdAndUpdate(req.user.id, {//유저 id로 찾고  post 안에 _id를 넣어주세요
        $push: {
          posts: newPost._id,
        },
      });
    } else {//카테고리가 모두 존재 한다면
      await Category.findByIdAndUpdate(findResult._id, {
        $push: { posts: newPost._id },
      });
      await Post.findByIdAndUpdate(newPost._id, {
        category: findResult._id,
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          posts: newPost._id,
        },
      });
    }
    console.log("serverpost 포스팅 완료");
    return res.redirect(`/api/post/${newPost._id}`);
  } catch (e) {
    console.log(e);
  }
});

// @route POST/post/:id
// @desc Detail Post
// @access public

router.get("/:id", async (req, res, next) => {
  //console.log("겟에 일단 들어는 왔는데....")
  try {
    //console.log("get id post 에에에에에에ㅔ에에에에엥???? 이게 안되고 있었는데?????")
    const post = await Post.findById(req.params.id)
      .populate({ path: "creator", select: "name" })//populate는 연결된 것들을  만들어주라고 요청하는 것
      .populate({ path: "category", select: "categoryName" });
    post.views += 1;
    post.save();
    //console.log(post, "router.get");
    res.json(post);
  } catch (e) {
    console.log("여기서 에러뜸");
    console.error(e);
    next(e);
  }
});


// [Comments Route]
// @route Get api/post/:id/comments
// @desc  Get All Comments
// @access public

router.get("/:id/comments", async (req, res) => {
  try {
    //console.log("\n 1", req.params, "1 \n")
    const comment = await Post.findById(req.params.id).populate({
      path: "comments",
    });
    //console.log("1 \n")
    const result = comment.comments;
    //console.log("1 \n")
    console.log(result, "comment load");
    //console.log("1 \n")
    res.json(result);
    //console.log("1 \n")
  } catch (e) {
    //console.log("sfajslfksalas;kv;", e, "여기ㅇㄴㄴ윧ㄹ걷ㄱㅎㄴ오ㅓㅓㄹ옹ㄴㅇㅁ요");
  }
});

router.post("/:id/comments", async (req, res, next) => {
  //console.log(req.body, "dddddddddsadasdasjfkjsahvklsdjvlasㄴㅁ야ㅓㅁ나롬날");
  const newComment = await Comment.create({
    contents: req.body.contents,
    creator: req.body.userId,
    creatorName: req.body.userName,
    post: req.body.id,
    date: moment().format("YYYY-MM-DD hh:mm:ss"),
  });
  console.log(newComment, "newComment");

  try {
    await Post.findByIdAndUpdate(req.body.id, {
      $push: {
        comments: newComment._id,
      },
    });
    await User.findByIdAndUpdate(req.body.userId, {
      $push: {
        comments: {
          post_id: req.body.id,
          comment_id: newComment._id,
        },
      },
    });
    res.json(newComment);
  } catch (e) {
    //console.log(e, "여기ㅁㄴㅇㅁㄴㄹㄴㅁㅍㅌ큩츌ㅇㅎㄴㄻㄴㅇ요");
    next(e);
  }
});




// @route    Delete api/post/:id
// @desc     Delete a Post
// @access   Private

router.delete("/:id", auth, async (req, res) => {
  console.log(req.params, "1sdsdsds")
  await Post.deleteMany({ _id: req.params.id });//글의 ID
  await Comment.deleteMany({ post: req.params.id });
  console.log(req.params, "1dsdsdsd")
  console.log(req.user.id, "1dsdsdsd")
  await User.findByIdAndUpdate(req.user.id, {//글쓴이의 ID
    $pull: {
      posts: req.params.id,
      comments: { post_id: req.params.id },
    },
  });
  const CategoryUpdateResult = await Category.findOneAndUpdate(
    { posts: req.params.id },
    { $pull: { posts: req.params.id } },
    { new: true }//이것을 적용해야 업데이트가 적용된다.
  );//카테고리를 적음

  if (CategoryUpdateResult.posts.length === 0) {
    await Category.deleteMany({ _id: CategoryUpdateResult });
  }//카테고리를 지움
  return res.json({ success: true });
});




// @route    GET api/post/:id/edit
// @desc     Edit Post
// @access   Private
router.get("/:id/edit", auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("creator", "name");
    res.json(post);
  } catch (e) {
    console.error(e);
  }
});

router.post("/:id/edit", auth, async (req, res, next) => {
  console.log(req, "api/post/:id/edit");
  const {
    body: { title, contents, fileUrl, id },
  } = req;
  try {
    const modified_post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        contents,
        fileUrl,
        date: moment().format("YYYY-MM-DD hh:mm:ss"),
      },
      { new: true }
    );
    console.log(modified_post, "edit modified");
    res.redirect(`/api/post/${modified_post.id}`);
  } catch (e) {
    console.log(e);
    next(e);
  }
});









router.get("/category/:categoryName", async (req, res, next) => {
  try {
    const result = await Category.findOne(
      {
        categoryName: {
          $regex: req.params.categoryName,//mongodb 정규표현 다음 내용의 글들을 찾아라!
          $options: "i",//mongodb 정규표현 덜 민감하게 찾는다
        },
      },//posts부분에서 찾아라
      "posts"
    ).populate({ path: "posts" });//posts 저장
    console.log(result, "Category Find result");

    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});



export default router;