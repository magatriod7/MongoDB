import {createStore, compose, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {createBrowserHistory} from 'history'
//History 객체 모델은 브라우징 히스토리를 문서와 문서 상태 목록으로 저장한다. 
import {routerMiddleware} from 'connected-react-router'

import createRootReducer from './redux/reducers/index'
import rootSaga from './redux/sagas'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

const initialState = {}

const middlewares = [sagaMiddleware, routerMiddleware(history)]//미들웨어 추가 시 이 곳에 추가하면 된다. 
const devtools = window.__REDUX_DEVTOOL_EXTENSIONS_COMPOSE__

const composeEnhancer = process.env.NODE_ENV === "production" ? compose : devtools || compose;
// 배포단계에서는 리덕스 정보가 보이지 않에 하기 위함

const store = createStore(
    createRootReducer(history),//히스토리 포함중
    initialState,//웹의 모든 상태를 답고 있는 초기 값
    composeEnhancer(applyMiddleware(...middlewares))//
) //스토어 만들기
//reducer 현제 상태를 알려줌 로그인 실패, 로그인 시도, 로그인 성공 등
sagaMiddleware.run(rootSaga)
//reducer일 때 어떤 함수가 일어나는지 정해주게 된다.

//모든 상태들을 store로 집중한 후 이곳에서 처리하게 함

//리덕스 큰 구조 
