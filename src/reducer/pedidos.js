import {EDIT_STATUS_PEDIDOS, GET_PEDIDOS} from '../actions/types';

    const initialState= {
    allPedidos: [],
    filteredPedidos: [],
    }

    export default function pedidosReducer(state= initialState , action){

        switch(action.type){
            case GET_PEDIDOS: return{
                ...state,
                allPedidos: action.payload,
                filteredPedidos: action.payload
            }
            case EDIT_STATUS_PEDIDOS: 
            return {
                ...state
            }
            default: return state
        }
    }