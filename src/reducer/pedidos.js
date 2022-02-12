import {EDIT_STATUS_PEDIDO, GET_PEDIDOS} from '../actions/types';

    const initialState= {
    allPedidos: [],
    filteredPedidos: []
    }

    export default function pedidosReducer(state= initialState , action){

        switch(action.type){
            case GET_PEDIDOS: return{
                ...state,
                allPedidos: action.payload,
                filteredPedidos: action.payload
            }
            case EDIT_STATUS_PEDIDO: 
            return {
                ...state,
                allPedidos: action.payload,
                filteredPedidos: action.payload
            }
            default: return state
        }
    }