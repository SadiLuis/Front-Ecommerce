import { GET_PRODUCTS } from "./types";

export const getAllProducts = () => dispatch =>{

    return fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => dispatch({type:GET_PRODUCTS , payload: data}))
            .catch(()=> console.log('NO llega la informacion'))
}