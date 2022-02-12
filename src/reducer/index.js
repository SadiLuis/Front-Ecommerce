
import { combineReducers } from 'redux';
import productsReducer from './products';
import adminReducer from './admin';
import loginReducer from './loginRegister'
import pedidosReducer from './pedidos'


const rootReducer = combineReducers({
    productsReducer,
    adminReducer,
    loginReducer,
    pedidosReducer
})


export default rootReducer