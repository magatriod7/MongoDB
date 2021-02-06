import { all, fork } from "redux-saga/effects";
import axios from "axios";

import authSaga from "./authSaga";
import postSaga from "./postSaga"
import commentSaga from "./commentSaga";
import dotenv from "dotenv";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

//console.log(`saga check in index ${process.env.REACT_APP_BASIC_SERVER_URL}`)

export default function* rootSaga() {
  yield all([fork(authSaga), fork(postSaga), fork(commentSaga)]);//fork를 통해 비동기적 authSaga 설정 , all을 통해 사가들을 하나로 묶어줄 수 있다.
}
//sagas는 오브젝트들을 redux-saga미들웨어에 yield하는 제너레이터 함수로 구현되었다.