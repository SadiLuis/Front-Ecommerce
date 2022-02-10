import {GET_PRODUCTS, DETAIL_PRODUCT ,
     SEARCH_BY_NAME ,FILTER_BY_CATEGORY ,GET_CATEGORIES} from '../actions/types'


const initialState ={
   allProducts:[],
   filtered: [],
   details:{},
   productName:[]
}


export default function productsReducer(state= initialState , action){

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
    
       case SEARCH_BY_NAME: return {
           ...state,
          productName: action.payload,
          filtered:  action.payload
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

    case 'ORDER_BY_PRICE':
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

     case 'ORDER_BY_RATE':
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
        default : return state
    }
}