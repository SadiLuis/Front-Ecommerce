
import { combineReducers } from 'redux';
import productsReducer from './products';
import adminReducer from './admin';
import loginReducer from './loginRegister'
import pedidosReducer from './pedidos'
import ofertasReducer from './ofertas'

const rootReducer = combineReducers({
    productsReducer,
    adminReducer,
    loginReducer,
    pedidosReducer,
    ofertasReducer
})


export default rootReducer