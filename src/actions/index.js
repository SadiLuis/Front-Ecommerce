import {LOCALHOST, GET_PRODUCTS, GET_PRODUCT_BY_ID } from "./types";
import axios from 'axios';

export const getAllProducts = () => dispatch =>{

    return fetch(LOCALHOST + 'products')
            .then(res => res.json())
            .then(data => dispatch({type:GET_PRODUCTS , payload: data}))
            .catch(()=> console.log('NO llega la informacion'))
}

export function getProductById(id) {
    return async function(dispatch) {
        try {
            var json = await axios.get(LOCALHOST + 'products/' + id);
            return dispatch ({
                type: GET_PRODUCT_BY_ID,
                payload : json.data
            })
        }catch(err) {
            console.log(err)
        }
    }
}

export function createProduct(product){
    return async function (dispatch) {
        try {
            var response = await axios.post(LOCALHOST + 'products/create', product)
            return response
        }catch(err){
            console.log(err)
        }
    }
}

export function deleteProduct(id) {
    return async function (dispatch) {
      try {
        const deleteProd = await axios.delete(LOCALHOST + "products/ " + id);
        return dispatch({
          type: "DELETE_PRODUCT",
          payload: deleteProd.data.remove,
        }
        )
      }
      catch (err) {
  
        console.log(err);
      }
    }
  };

  export function editProduct(product){
      const {id} = product
    return async function (dispatch) {
        try {
            var response = await axios.post(LOCALHOST + 'products/' + id, product)
            return {
                type: "EDIT_PRODUCT",
                payload: response.data
            }
        }catch(err){
            console.log(err)
        }
    }
}