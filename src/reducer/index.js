import { GET_PRODUCTS, GET_PRODUCT_BY_ID, DELETE_PRODUCT, EDIT_PRODUCT, DETAIL_PRODUCT , ADD_ITEM , DELETE_ITEM , SEARCH_BY_NAME} from '../actions/types';

const initialState ={
    allProducts: [],
    singleProduct: {},
    filtered:[],
    productName:[],
    details:{},
    cart:[],
    precioTotal:0
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
                case DETAIL_PRODUCT: return {
                    ...state,
                    details: action.payload
                }
                case ADD_ITEM: 
                let itemCart = state.cart.find(item => item.id === action.payload.id)
                return itemCart 
                  ? {
                    ...state,
                     cart: state.cart.map(item => 
                        item.id === action.payload.id
                        ?{...item, quantity: item.quantity + 1 }
                        : item )
                  }
                   
                  : {
                    ...state,
                     cart: [...state.cart,{...action.payload ,quantity:1}] 
        
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
                case 'PRECIO_TOTAL_SUM': 
                    const totalsum = state.precioTotal + action.payload
                    const fixed1 = Math.round((totalsum + Number.EPSILON) * 100) / 100;
                        return{
                           ...state,
                            precioTotal: fixed1
                     }
                case 'PRECIO_TOTAL_RES':
                       const totalres = state.precioTotal - action.payload
                       const fixed2 = Math.round((totalres + Number.EPSILON) * 100) / 100;
                         return{
                             ...state,
                             precioTotal: fixed2
                         }
                
                case 'ADD_QUANTITY': 
                       
                      return{
                       ...state,
                        cart: state.cart.map(item => 
                           item.id === action.payload.id
                           ? {...item, quantity: action.payload.addQuantity + 1}
                           : item )
                     }   
                case 'REST_QUANTITY': 
                       
                      return{
                       ...state,
                        cart: state.cart.map(item => 
                           item.id === action.payload.id
                           ? {...item, quantity: action.payload.addQuantity - 1  }
                           : item )
                     }       
                                     

        default: return state;
    }
}