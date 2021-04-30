import store from '../../store'
import { USER_LOADING_REQUEST } from '../../redux/types'

const loadUser = () => {
    try {
        store.dispatch({
            type: USER_LOADING_REQUEST,
            payload: localStorage.getItem("token")
        });
        console.log(store,"스토어에 대해서");
        // console.log(payload,"패이로드란");
    } catch (e) {
        console.log(e);
    }

}

export default loadUser