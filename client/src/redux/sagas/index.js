import { all } from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([]);
}
//function* 는 제네레이터 함수로 여러개의 값을 반환할 수 있다.
//