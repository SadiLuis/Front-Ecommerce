import { GET_PRODUCTS ,DETAIL_PRODUCT , ADD_ITEM ,DELETE_ITEM} from "./types";

export const getAllProducts = () => dispatch =>{

    return fetch('http://localhost:3000/products')
            .then(res => res.json())
            .then(data => dispatch({type:GET_PRODUCTS , payload: data}))
            .catch(()=> console.log('NO llega la informacion'))
}

export const getOneProduct = (id) => dispatch =>{

    return fetch(`http://localhost:3000/products/${id}`)
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