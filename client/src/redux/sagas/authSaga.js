import axios from "axios";
import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_FAILURE,
  CLEAR_ERROR_SUCCESS,
  USER_LOADING_REQUEST,
  USER_LOADING_FAILURE,
  USER_LOADING_SUCCESS,
  PASSWORD_EDIT_UPLOADING_SUCCESS,
  PASSWORD_EDIT_UPLOADING_REQUEST,
  PASSWORD_EDIT_UPLOADING_FAILURE,
} from "../types";

// Login

const loginUserAPI = (loginData) => {
  console.log(loginData, "loginData", "loginUserAPI 콘솔");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("api/auth", loginData, config);//axios를 통하여 로그인 신호를 준다. config를 통해 받을 데이터 타입을 정할 수 있다. json 타입
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);//반환된 값을 action.payload에 넣게 되는데 이를 result에 다시 넣는다.
    //console.log(loginUserAPI(action.payload), "아래와 값이 같이 나오지만 이 경우 promise 안에 들어 있다.");
    console.log(result, "loginUser 콘솔");
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);//모든 로그인 request가 들어올 때마다 loginUser을 실행한다.
}

// LOGOUT

function* logout(action) {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
    });
    console.log(e);
  }
}

function* watchlogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

// Register

const registerUserAPI = (req) => {
  console.log(req, "req");

  return axios.post("api/user", req);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);
    console.log(result, "RegisterUser Data");
    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchregisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

// clear Error

function* clearError() {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: CLEAR_ERROR_FAILURE,
    });
    console.error(e);
  }
}

function* watchclearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}


//userLoading


const userLoadingAPI = (token) => {
  console.log(token, "토큰 확인중입니다.")

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token
  }
  return axios.get("api/auth/user", config);//axios를 통하여 로그인 신호를 준다. config를 통해 받을 데이터 타입을 정할 수 있다. json 타입
};

function* userLoading(action) {
  try {
    console.log(action, "userLoading USER_LOADING_REQUEST 잘되는중")
    // console.log(userLoadingAPI(action.payload, "아래와 값이 같이 나오지만 이 경우 promise 안에 들어 있다. 패이로드 확인중"));
    const result = yield call(userLoadingAPI, action.payload);//반환된 값을 action.payload에 넣게 되는데 이를 result에 다시 넣는다.
    // console.log(userLoadingAPI(action.payload, "아래와 값이 같이 나오지만 이 경우 promise 안에 들어 있다. 패이로드 확인중"));
       console.log(result, "userLoading 콘솔");
       console.log(action.payload, "auth payload 확인 중");
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchuserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);//모든 로그인 request가 들어올 때마다 loginUser을 실행한다.
}






// Edit Password

const EditPasswordAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post(`/api/user/${payload.userName}/profile`, payload, config);
};

function* EditPassword(action) {
  try {
    console.log(action, "EditPassword");
    const result = yield call(EditPasswordAPI, action.payload);
    console.log(result);
    console.log(result.data);
    console.log("여기서 멈춰부렸따");
    yield put({
      type: PASSWORD_EDIT_UPLOADING_SUCCESS,
      payload: result,
    });
  } catch (e) {
    console.log(e)
    console.log(action)
    yield put({
      type: PASSWORD_EDIT_UPLOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchEditPassword() {
  yield takeEvery(PASSWORD_EDIT_UPLOADING_REQUEST, EditPassword);
}







export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchlogout),
    fork(watchregisterUser),
    fork(watchclearError),
    fork(watchuserLoading),
    fork(watchEditPassword),
  ]);
}