import axios from "axios";
import { fork } from "redux-saga/effects";
import { put, call, takeEvery, all } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_REQUEST,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_FAILURE,
  POST_UPLOADING_SUCCESS,
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST
} from "../types";

// All Posts load

const loadPostAPI = () => {
  return axios.get("/api/post");
};

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);
    console.log(result, "loadedPosts");
    console.log("POSTS_LOADING_SUCCESS");
    yield put({
      type: POSTS_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POSTS_LOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
}












// Post Upload

const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
    console.log(config.headers["x-auth-token"], "postsaga API configheader check")
  }
  console.log(payload, "업로드포스트에이피아이 패이로드");
  return axios.post("/api/post", payload, config);//payload-> post내용, config -> 토큰
};

function* uploadPosts(action) {
  try {
    console.log(action, "uploadPost function");
    const result = yield call(uploadPostAPI, action.payload);
    console.log(result, "uploadPostAPI, action.payload");
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));//업로드 이후 해당 위치로 이동함
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}


function* watchuploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}






// Post Detail
const loadPostDetailAPI = (payload) => {
  console.log(payload, "로드포스트디테일에이피아이");
  console.log(`${payload}`, "한번 더 확인하자")

  return axios.get(`/api/post/${payload}`);
};

function* loadPostDetail(action) {
  console.log("뭐를해야하는것인가요")
  try {
    //console.log("loadPostDetail 잘 작동하는중")
    // console.log(action);
    const result = yield call(loadPostDetailAPI, action.payload);
    //console.log(result, "post_detail_saga_data 여기서부터 왜 안나오는거같지");
    //console.log(result.data, "post_detail_saga_data 여기서부터 왜 안나오는거같지");
    //console.log(result.data._id, "여기서부터 왜 안나오는거같지");
    console.log(action.payload, "금방 다 온것 같다!!!");
    console.log(result.data, "금방 다 온것 같다@@@@@@");
    console.log(action.payload, "금방 다 온것 같다!!!");
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });
    console.log("어디가 에러인 것인고??")
  } catch (e) {
    console.log(e, "에러확인용")

    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchloadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchuploadPosts),
    fork(watchloadPostDetail),
  ]);
}