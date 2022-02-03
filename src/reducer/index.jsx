import { GET_PRODUCTS} from '../actions/types';
import { SEARCH_BY_NAME } from '../actions/types';

const initialState ={
    allProducts: [],
    productname:[]
}

export default function rootReducer(state= initialState , action){
    switch(action.type){
        case GET_PRODUCTS: return{
            ...state,
            allProducts: action.payload
        }
        case SEARCH_BY_NAME:
            return {
                ...state,
                products:action.payload
            }
        default: return state;
    }
}