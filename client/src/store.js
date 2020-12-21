import {createStore, compose, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'

import createRootReducer from './redux/reducers/index'
import rootSaga from './redux/sagas'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

const initialState = {}

const middlewares = [sagaMiddleware, routerMiddleware(history)]
const devtools = window.__REDUX_DEVTOOL_EXTENSIONS_COMPOSE__

const composeEnhancer = process.env.NODE_ENV === "production" ? compose : devtools || compose;
// 배포단계에서는 리덕스 정보가 보이지 않에 하기 위함

const store = createStore(
    createRootReducer(history),
    initialState
)