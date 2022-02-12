import { EDIT_STATUS_PEDIDO, GET_PEDIDOS, GET_PEDIDO_DETAIL } from '../actions/types';

const initialState = {
    allPedidos: [],
    filteredPedidos: [],
    pedidoDetail: null
}

export default function pedidosReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PEDIDO_DETAIL:
            return { ...state, pedidoDetail: payload }
        case GET_PEDIDOS:
            return {
                ...state,
                allPedidos: payload,
                filteredPedidos: payload
            }
        case EDIT_STATUS_PEDIDO:
            return {
                ...state,
                allPedidos: payload,
                filteredPedidos: payload
            }
        default:
            return { ...state }
    }
}
