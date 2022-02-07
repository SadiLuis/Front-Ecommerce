import { GET_PRODUCTS , DETAIL_PRODUCT , ADD_ITEM , DELETE_ITEM , SEARCH_BY_NAME} from '../actions/types';

const initialState ={
    allProducts: [],
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
                ?{...item, quantity: item.quantity + 1 , cantidad: item.cantidad - 100}
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
                productName:action.payload,
                filtered: action.payload
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
          case 'RESET_TOTAL': return{
              ...state,
              precioTotal: state.precioTotal 
          }
          case 'ADD_QUANTITY': 
            
           return{
            ...state,
             cart: state.cart.map(item => 
                item.id === action.payload.id
                ? {...item, quantity: action.payload.addQuantity + 1 , cantidad: item.cantidad - 1 }
                : item )
          }   
          case 'REST_QUANTITY': 
            
           return{
            ...state,
             cart: state.cart.map(item => 
                item.id === action.payload.id
                ? {...item, quantity: action.payload.addQuantity - 1 , cantidad: item.cantidad + 1 }
                : item )
          }       
         

        default: return state;
    }
}