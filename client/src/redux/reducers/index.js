import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./authReducer.js";
import postReducer from "./postReducer.js";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    post: postReducer,
  });//여러개의 리듀서를 하나의 리듀서로 합쳐준다.

export default createRootReducer;
