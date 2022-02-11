import axios from 'axios';
import {GET_PRODUCTS, GET_PRODUCT_BY_ID, SEARCH_BY_NAME,
     ADD_ITEM, DELETE_ITEM, DETAIL_PRODUCT , FILTER_BY_CATEGORY,GET_CATEGORIES, ORDER_BY_PRICE, ORDER_BY_RATE } from "./types";

let LOCALHOST = "http://localhost:5000/"




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

export function postLogin({email, contraseña}){
    return async function(dispatch){
        try {
            var json= await axios.post(LOCALHOST + 'login', {email, contraseña})
            return dispatch({
                type: "LOGIN",
                payload:json.data
            })
        } catch (err) {
            alert("Login failed")
        }
    }
}

export function postRegister({email, contraseña, nombre, usuario, direccion, pais, provincia, telefono}){
    return async function(dispatch){
        try {
            var json= await axios.post(LOCALHOST + 'register', {email, contraseña, nombre, usuario, direccion, pais, provincia, telefono})
            return dispatch({
                type: "REGISTER",
                payload:json.data
            })
        } catch (err) {
            alert("Register failed")
        }
    }
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

export function getCategories(){
    return async function(dispatch){
        try {
            const responseCategories=await axios.get(LOCALHOST + 'categories')
            return dispatch({
                type: GET_CATEGORIES,
                payload: responseCategories.data
            })
        } catch(err){
            console.log(err)
        }
    }
}

export function filterByCategory(payload){
    return {
        type: FILTER_BY_CATEGORY,
        payload
        
    } 
}
    export function orderByPrice(payload){
        return {
            type: ORDER_BY_PRICE,
            payload
        }
    }
    export function orderByRate(payload){
        return {
            type: ORDER_BY_RATE,
            payload
        }
    }