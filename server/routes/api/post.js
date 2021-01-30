import express from 'express'

const router = express.Router();

import Post from "../../models/post"
import auth from "../../middleware/auth"

import multer from "multer";//파일을 주고 받는 것을 도와주는 라이브러리
import multerS3 from "multer-s3";//s3 관련 multer
import path from "path";//경로를 쉽게 파악 가능
import AWS from "aws-sdk";//아마존 서버 이용이 용이하기 위한 개발자 도구
import dotenv from "dotenv";
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
    console.log(req.files.map((v) => v.location));//image란 주소를 통해서 배열 형태로 사진을 upload를하면 주소가 req에 들어오게 되는데 들어온 주소 중 file 안의 location 이란 곳이 있는데 그때 각각을 출력해주세요
    res.json({ uploaded: true, url: req.files.map((v) => v.location) });//업로드 되었고 url 은 req. files.location에 있습니다.
  } catch (e) {
    console.error(e);
    res.json({ uploaded: false, url: null });
  }
});//CKEditor에 사진 보여주기

// api/post
router.get("/", async (req, res) => {
  const postFindResult = await Post.find();
  console.log(postFindResult, "All Post Get");
  res.json(postFindResult);
});
router.post("/", auth, async (req, res, next) => {
  try {
    console.log(req, "req");
    const { title, contents, fileUrl, creator } = req.body;
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator,
    });
    res.json(newPost);
  } catch (e) {
    console.log(e);
  }
});


export default router;