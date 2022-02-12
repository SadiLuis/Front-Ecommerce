import axios from 'axios';

import { BASEURL } from '../assets/URLS';
import getHeaderToken from '../helpers/getHeaderToken';
<<<<<<< Updated upstream
import { GET_PRODUCTS, GET_PRODUCT_BY_ID, SEARCH_BY_NAME, ADD_ITEM, DELETE_ITEM, DETAIL_PRODUCT, LOGIN_SUCCESS, LOGIN_FAILED, REGISTER_SUCCESS, REGISTER_FAILED, GET_USER_DETAIL, AUTHENTICATION_ERROR, FILTER_BY_CATEGORY, GET_CATEGORIES } from "./types";
=======
import { GET_PRODUCTS, GET_PRODUCT_BY_ID, SEARCH_BY_NAME, 
    ADD_ITEM, DELETE_ITEM, DETAIL_PRODUCT, LOGIN_SUCCESS, 
    LOGIN_FAILED, REGISTER_SUCCESS, REGISTER_FAILED, GET_USER_DETAIL,
     AUTHENTICATION_ERROR, FILTER_BY_CATEGORY,GET_CATEGORIES, GET_PEDIDOS } from "./types";


let LOCALHOST = "https://ecommerce-pg-henry.herokuapp.com"
>>>>>>> Stashed changes


export const getAllProducts = () => dispatch => {

    return fetch(`${BASEURL}/products`)
        .then(res => res.json())
        .then(data => dispatch({ type: GET_PRODUCTS, payload: data }))
        .catch(() => console.log('NO llega la informacion'))
}


//export const getCategories = () => dispatch =>{
//
//    return fetch(BASEURL + 'categories')
//            .then(res => res.json())
//            .then(data => dispatch({type: GET_CATEGORIES , payload: data}))
//            .catch(()=> console.log('NO llega la informacion'))
//}

export function getProductById(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`${BASEURL}/products/${id}`);
            return dispatch({
                type: GET_PRODUCT_BY_ID,
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getOneProduct = (id) => dispatch => {
    return fetch(`${BASEURL}/products/${id}`)
        .then(res => res.json())
        .then(data => dispatch({ type: DETAIL_PRODUCT, payload: data }))
        .catch(e => console.log(e))
}

export const addItem = (product) => {
    return {
        type: ADD_ITEM,
        payload: product
    }
}

export const deleteItem = (id) => {
    return {
        type: DELETE_ITEM,
        payload: id
    }
}

export function createProduct(product) {
    return async function (dispatch) {
        try {
            var response = await axios.post(`${BASEURL}/products`, product)
            return response
        } catch (err) {
            console.log(err)
        }
    }
}

export function deleteProduct(id) {
    return async function (dispatch) {

        try {
            const deleteProd = await axios.delete(`${BASEURL}/products/${id}`);
            return dispatch({
                type: "DELETE_PRODUCT",
                payload: deleteProd.data,

<<<<<<< Updated upstream
            })
        } catch (err) {
            console.log(err)
        }
=======
        })
     } catch (err) {
        console.log(err)
>>>>>>> Stashed changes
    }
  }
}

export function editProduct(product) {
    const { id } = product
    return async function (dispatch) {
        try {
            var response = await axios.put(`${BASEURL}/products/${id}`, product)
            return {
                type: "EDIT_PRODUCT",
                payload: response.data
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export function searchByName(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`${BASEURL}/products?title=${name}`) //OJO: VER BIEN LA ruta por query del back
            return dispatch({
                type: SEARCH_BY_NAME,
                payload: json.data

            })
        } catch (err) {
            alert("Product not found")
        }
    }
}

export function login({ email, contrasena }) {
    return async (dispatch) => {
        try {
            // Configuro los headers
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            // Armo el payload/body
            const body = { email, contrasena };

            // Envío la petición con el body y config armados
            let { data } = await axios.post(`${BASEURL}/user/login`, body, config);

            // Si todo bien configuro al usuario como logueado
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            });

            dispatch(getUserDetail());
        } catch (err) {
            window.alert(err.response);
            console.log(err.response);

            // Si ocurrió un error durante el logen, envio el login_fail
            return dispatch({
                type: LOGIN_FAILED
            });
        }
    }
};

export function register({
    nombre,
    usuario,
    contrasena,
    email,
    pais,
    provincia,
    direccion,
    telefono }) {
    return async function (dispatch) {
        try {
            // Configuro los headers
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            // Armo el payload/body
            const body = {
                nombre,
                usuario,
                contrasena,
                email,
                pais,
                provincia,
                direccion,
                telefono
            };

            let { data } = await axios.post(`${BASEURL}/user/register`, body, config);

            console.log(data);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: data
            })
            dispatch(getUserDetail());
        } catch (err) {
            window.alert(err.response);
            console.log(err.response);

            dispatch({
                type: REGISTER_FAILED
            })
        }
    }
}

const getUserDetail = () => {
    return async (dispatch) => {
        const headers = getHeaderToken();
        console.log(headers);
        try {
            const { data } = await axios.get(`${BASEURL}/user`, headers);
            dispatch({
                type: GET_USER_DETAIL,
                payload: data
            })
        } catch (error) {

            console.log(error.response);
            dispatch({
                type: AUTHENTICATION_ERROR
            })
        }
    }
}

export const totalItemSum = (total) => {
    return {
        type: 'PRECIO_TOTAL_SUM',
        payload: total
    }
}
export const totalItemRes = (total) => {
    return {
        type: 'PRECIO_TOTAL_RES',
        payload: total
    }
}

export const addQuantity = (payload) => {
    return {
        type: 'ADD_QUANTITY',
        payload
    }
}

export const restQuantity = (payload) => {
    return {
        type: 'REST_QUANTITY',
        payload
    }
}

export function getCategories() {
    return async function (dispatch) {
        try {
            const responseCategories = await axios.get(`${BASEURL}/categories`)
            return dispatch({
                type: GET_CATEGORIES,
                payload: responseCategories.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function filterByCategory(payload) {
    return {
        type: FILTER_BY_CATEGORY,
        payload

    }
}
export function orderByPrice(payload) {
    return {
        type: "ORDER_BY_PRICE",
        payload
    }
}
export function orderByRate(payload) {
    return {
        type: "ORDER_BY_RATE",
        payload
    }
<<<<<<< Updated upstream
}
=======


    export const postPedido = async (pedido) => {
        await axios.post(`${LOCALHOST}/pedidos`,pedido)
   }

   export const getPedido = () => dispatch => {

       return fetch(`${LOCALHOST}/pedidos`)
              .then(res => res.json())
              .then(data => dispatch({type:GET_PEDIDOS , payload: data}))
   }
>>>>>>> Stashed changes
