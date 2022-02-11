  import {ADD_ITEM , DELETE_ITEM } from '../actions/types';

const initialState={
    cart:[],
    precioTotal:0
}



export default function cartReducer(state=initialState , action){

    switch(action.type){

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
        case DELETE_ITEM: 
       
          return{
            ...state,
             cart: state.cart.filter(c => c.id !== action.payload)

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
        default : return state;     
    }
}