

const initialState ={
    allOfertas : [],
    ofertByID: {}
}

 export default function ofertasReducer(state=initialState ,action){
    
    switch(action.type){
        case 'GET_ALL_OFERTAS': return{
            ...state,
            allOfertas: action.payload
        }
        case 'GET_OFERTA_BY_ID': return{
            ...state,
            ofertByID: action.payload
        }
        default: return state
    }
}