
import { combineReducers } from 'redux';
import cartReducer from './cart';
import productsReducer from './products';
import adminReducer from './admin';
import loginReducer from './loginRegister'

<<<<<<< HEAD
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
                     case GET_CATEGORIES:
                        return {
                            ...state,
                            categories:action.payload
                        }
                    case FILTER_BY_CATEGORY:
                        let categoriesProducts = action.payload === "all" ? state.allProducts : state.allProducts.filter((elem)=>elem.category.includes(action.payload))  
                         return {
                             ...state,
                             filtered:categoriesProducts
                         } 
    
                         case "ORDER_BY_PRICE":
                            let sortedPrice=action.payload==="asc"?
                            [...state.filtered].sort(function(a,b){
                                return (a.price - b.price);
                            }) :
                            [...state.filtered].sort(function(a,b){
                                return (b.price - a.price)
                            })
                           
                            return {
                                ...state,
                                filtered:sortedPrice
                            } 
    
                            case "ORDER_BY_RATE":
                            let sortedRate=action.payload==="asc"?
                            [...state.filtered].sort(function(a,b){
                                return (a.rate - b.rate);
                            }) :
                            [...state.filtered].sort(function(a,b){
                                return (b.rate - a.rate)
                            })
                           
                            return {
                                ...state,
                                filtered:sortedRate
                            }       
                                     
=======
>>>>>>> 3964ec6cbffcce65ba54f8ee00d1428bfedfafa6

const rootReducer = combineReducers({
    cartReducer,
    productsReducer,
    adminReducer,
    loginReducer
})
   
    
   export default rootReducer