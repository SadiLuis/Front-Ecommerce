
import { combineReducers } from 'redux';
import cartReducer from './cart';
import productsReducer from './products';
import adminReducer from './admin';
import loginReducer from './loginRegister'
import pedidosReducer from './pedidos';

const rootReducer = combineReducers({
    cartReducer,
    productsReducer,
    adminReducer,
    loginReducer,
    pedidosReducer
})
   
    
   export default rootReducer