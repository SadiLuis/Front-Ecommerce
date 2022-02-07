import { GET_PRODUCTS ,DETAIL_PRODUCT , ADD_ITEM ,DELETE_ITEM , SEARCH_BY_NAME} from "./types";

export const getAllProducts = () => dispatch =>{

    return fetch('http://localhost:3001/products')
            .then(res => res.json())
            .then(data => dispatch({type:GET_PRODUCTS , payload: data}))
            .catch(()=> console.log('NO llega la informacion'))
}

export const getOneProduct = (id) => dispatch =>{

    return fetch(`http://localhost:3001/products/${id}`)
            .then(res=> res.json())
            .then(data => dispatch({type:DETAIL_PRODUCT , payload:data}))
            .catch(e => console.log(e))
}

export const addItem = (product) =>{
    return{
        type:ADD_ITEM,
        payload: product
    }
}

export const deleteItem = (id)=>{
    return{
        type:DELETE_ITEM,
        payload: id
    }
}

export const searchByName = (name) => dispatch =>{
    return fetch(`http://localhost:3001/products?title=${name}`)
           .then(res => res.json())
           .then(data => dispatch({type:SEARCH_BY_NAME , payload: data}))
}

export const totalItemSum = (total)=>{
    return {
        type:'PRECIO_TOTAL_SUM',
        payload: total
    }
}
export const totalItemRes = (total)=>{
    return {
        type:'PRECIO_TOTAL_RES',
        payload: total
    }
}

export const totalReset = () =>{
    return{
        type:'RESET_TOTAL',
       
    }
}

export const addQuantity = (payload) =>{
    return{
        type:'ADD_QUANTITY',
        payload
    }
}

export const restQuantity = (payload) =>{
    return{
        type:'REST_QUANTITY',
        payload
    }
}