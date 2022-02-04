import { GET_PRODUCTS, GET_PRODUCT_BY_ID, DELETE_PRODUCT, EDIT_PRODUCT} from '../actions/types';

const initialState ={
    allProducts: [],
    singleProduct: {}
}

export default function rootReducer(state= initialState , action){
    switch(action.type){
        case GET_PRODUCTS: return{
            ...state,
            allProducts: action.payload
        }
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                singleProduct: action.payload
            }
        case DELETE_PRODUCT:
            let deletedProduct = state.products.filter(el => el._id !== action.payload._id)
            return {
                                    ...state,
                    allProducts: [...deletedProduct]
                };
       case EDIT_PRODUCT:
            let index = state.allProducts.findIndex(product => product.id === action.payload.id);
            state.allProducts[index] = action.payload;
            return {
                    ...state,
                    allProducts: [...state.products]
                };          

        default: return state;
    }
}