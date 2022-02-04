import { GET_PRODUCTS , DETAIL_PRODUCT , ADD_ITEM , DELETE_ITEM} from '../actions/types';

const initialState ={
    allProducts: [],
    details:{},
    cart:[]
}

export default function rootReducer(state= initialState , action){
    switch(action.type){
        case GET_PRODUCTS: return{
            ...state,
            allProducts: action.payload
        }
        case DETAIL_PRODUCT: return {
            ...state,
            details: action.payload
        }
        case ADD_ITEM: return{
            ...state,
             cart: [...state.cart,action.payload]

        }
        case DELETE_ITEM: return{
            ...state,
             cart: state.cart.filter(c => c.id !== action.payload)

        }
        default: return state;
    }
}