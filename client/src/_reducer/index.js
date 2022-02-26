//REDUCER는 어떻게 STATE가 변하는 것을 보여준 뒤 RETURN (USER, POST, COMMENT, SUBSCRIBE 와 같은 기능==> 하나로 묶어준다.)
import { combineReducers } from "redux";
 import user from './user_reducer'; 
/* import comment from './comment_reducer'; */


const rootReducer = combineReducers({
    
     user 
})

//다른파일에서 reducer을 쓸수있게 해준다.
export default rootReducer;