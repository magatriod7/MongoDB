import { combineReducers } from 'redux'
import {connectRouter} from 'connected-react-router'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
});

export default createRootReducer;
// connectRouter를 router이라고 명령했고 reducer에 관련된 router를 불러오게 된다면
// router이라고 불러올 수 있다.