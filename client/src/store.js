import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./redux/reducers/index";
import rootSaga from "./redux/sagas";

export const history = createBrowserHistory();//열람 정보 객체

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const middlewares = [sagaMiddleware, routerMiddleware(history)];
const devtools = window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__;

const composeEnhancer =
  process.env.NODE_ENV === "production" ? compose : devtools || compose;//배포단계일 때는 devtools를 아닐 때는
//createStore(reducer, [preloadedState], [enhancer])로 구성되어 있는데 enhancer은 redux의 기능을 도와주는 미들웨어 또는 데브 툴즈를 말한다.
const store = createStore(
  createRootReducer(history),//root 리듀서 생성
  initialState,//초기화
  composeEnhancer(applyMiddleware(...middlewares))//...middleware를 열거함 즉 sagaMiddleware와 routerMiddleware를 사용할 수 있다.
);// 리듀서 생성

sagaMiddleware.run(rootSaga);//다음을 통해 saga가 실행 가능하다.

export default store;
