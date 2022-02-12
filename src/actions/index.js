import axios from 'axios';
import { BASEURL } from '../assets/URLS';
import getHeaderToken from '../helpers/getHeaderToken';
import {
    GET_PRODUCTS, GET_PRODUCT_BY_ID, SEARCH_BY_NAME,
    ADD_ITEM, DELETE_ITEM, LOGIN_SUCCESS,
    LOGIN_FAILED, REGISTER_SUCCESS, REGISTER_FAILED, GET_USER_DETAIL,
    AUTHENTICATION_ERROR, FILTER_BY_CATEGORY, GET_CATEGORIES, GET_PEDIDOS, EDIT_STATUS_PEDIDO, EDIT_PRODUCT, DELETE_PRODUCT, SUM_CART, ORDER_BY_PRICE, ORDER_BY_RATE, LOGOUT, REST_ITEM, UPDATE_USER
} from "./types";


export const getAllProducts = () => dispatch => {

    return fetch(`${BASEURL}/products`)
        .then(res => res.json())
        .then(data => dispatch({ type: GET_PRODUCTS, payload: data }))
        .catch(() => console.log('NO llega la informacion'))
}

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

export const addItem = (id) => {
    return {
        type: ADD_ITEM,
        payload: id
    }
}

export const deleteItem = (id) => {
    return {
        type: DELETE_ITEM,
        payload: id
    }
}

export const restItem = (id) => {
    return {
        type: REST_ITEM,
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
                type: DELETE_PRODUCT,
                payload: deleteProd.data,


            })
        } catch (err) {
            console.log(err)

        }
    }
}

export function editProduct(product) {
    const { id } = product
    return async function (dispatch) {
        try {
            var response = await axios.put(`${BASEURL}/products/${id}`, product)
            return {
                type: EDIT_PRODUCT,
                payload: response.data
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export function updateUser(newUser) {
    return async function (dispatch) {
        try {
            await axios.put(
                `${BASEURL}/user/update`,
                newUser,
                getHeaderToken()
            )
            dispatch(getUserDetail());
            return {
                type: UPDATE_USER,
            };
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

export function logout() {
    return { type: LOGOUT }
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
            window.alert(err.response.data);
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

            // console.log(data);
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

export const getUserDetail = () => {
    return async (dispatch) => {
        const headers = getHeaderToken();
        // console.log(headers);
        try {
            const { data } = await axios.get(`${BASEURL}/user`, headers);
            window.alert(`Bienvenido ${data.nombre}`)
            console.log(data);
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

export const sumCart = () => {
    return {
        type: SUM_CART,
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
        type: ORDER_BY_PRICE,
        payload
    }
}
export function orderByRate(payload) {
    return {
        type: ORDER_BY_RATE,
        payload
    }
}

export const postPedido = async (pedido) => {
    await axios.post(`${BASEURL}/pedidos`, pedido)
}


export const getPedido = () => async dispatch => {
    const res = await fetch(`${BASEURL}/pedidos`);
    const data = await res.json();
    return dispatch({ type: GET_PEDIDOS, payload: data });
}


export const getAllPedidos = () => async dispatch => {
    try {
        let config = getHeaderToken()
        const res = await fetch(`${BASEURL}/pedidos`, config);
        const data = await res.json();
        return dispatch({ type: GET_PEDIDOS, payload: data });
    } catch {
        return console.log('NO llega la informacion');
    }
}

export function editStatusPedido(pedidoId, newStatus) {
    return async function (dispatch) {
        try {
            const config = getHeaderToken()
            const response = await axios.put(`${BASEURL}/pedidos/${pedidoId}`, newStatus, config)
            return {
                type: EDIT_STATUS_PEDIDO,
                payload: response.data
            }
        } catch (err) {
            console.log(err)
        }
    }
}
