import { GET_PRODUCTS, GET_PRODUCT_BY_ID, DELETE_PRODUCT, EDIT_PRODUCT, DETAIL_PRODUCT , ADD_ITEM , DELETE_ITEM , SEARCH_BY_NAME, GET_CATEGORIES} from '../actions/types';

const initialState ={
    allProducts: [],
    singleProduct: [],
    filtered:[],
    productName:[],
    details:{},
    cart:[],
    categories: []
}

export default function rootReducer(state= initialState , action){
    switch(action.type){
        case GET_PRODUCTS: return{
            ...state,
            allProducts: action.payload,
            filtered: action.payload
        }
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                singleProduct: action.payload,
                details: action.payload
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                allProducts: action.payload
            }
    //    case EDIT_PRODUCT:
    //         let index = state.allProducts.findIndex(product => product.id === action.payload.id);
    //         state.allProducts[index] = action.payload;
    //         return {
    //                 ...state,
    //                 allProducts: [...state.products]
    //             };
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
                case SEARCH_BY_NAME:
                    return {
                        ...state,
                        productName: action.payload,
                        filtered:  action.payload
                    }
                case GET_CATEGORIES: {
                    return {
                        ...state,
                        categories: action.payload
                    }
                }                      

        default: return state;
    }
}