import axios from 'axios';
import {GET_PRODUCTS, GET_PRODUCT_BY_ID, SEARCH_BY_NAME, ADD_ITEM, DELETE_ITEM, DETAIL_PRODUCT } from "./types";

let LOCALHOST = "http://localhost:3001/"




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

export const getOneProduct = (id) => dispatch =>{

    return fetch(LOCALHOST + 'products/' + id)
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

export function searchByName(name){
    return async function(dispatch){
        try {
            var json= await axios.get(LOCALHOST + 'products?title=' + name) //OJO: VER BIEN LA ruta por query del back
            return dispatch({
                type: SEARCH_BY_NAME,
                payload:json.data

            })
        } catch (err) {
            alert("Product not found")
        }
    }
}