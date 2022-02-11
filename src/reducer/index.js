
import { combineReducers } from 'redux';
import cartReducer from './cart';
import productsReducer from './products';
import adminReducer from './admin';
import loginReducer from './loginRegister'


const rootReducer = combineReducers({
    cartReducer,
    productsReducer,
    adminReducer,
    loginReducer
})
   
    
   export default rootReducer