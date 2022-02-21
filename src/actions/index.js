import axios from 'axios';
import { BASEURL } from '../assets/URLS';
import getHeaderToken from '../helpers/getHeaderToken';
import {
    GET_PRODUCTS, CREATE_PRODUCT, GET_PRODUCT_BY_ID, SEARCH_BY_NAME,
    ADD_ITEM, DELETE_ITEM, LOGIN_SUCCESS,
    LOGIN_FAILED, REGISTER_SUCCESS, REGISTER_FAILED, GET_USER_DETAIL,
    AUTHENTICATION_ERROR, FILTER_BY_CATEGORY, GET_CATEGORIES, GET_PEDIDOS, EDIT_STATUS_PEDIDO,
    EDIT_PRODUCT, DELETE_PRODUCT, ORDER_BY_PRICE, ORDER_BY_RATE, LOGOUT, REST_ITEM, UPDATE_USER,
    UPDATE_CART, GET_PEDIDO_BY_USER, GET_PEDIDO_DETAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS,
    COMMENT_LIST_FAIL, COMMENT_DELETE, COMMENT_PUT, COMMENT_POST, COMMENT_DELETE_FAIL, COMMENT_PUT_FAIL, COMMENT_POST_FAIL, COMMENT_REPLY_PUT, GET_SUBCATEGORIES, EDIT_CATEGORIA
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

export function deleteProduct(id) {
    return async function (dispatch) {

        try {
            const config = getHeaderToken()
            const deleteProd = await axios.delete(`${BASEURL}/products/${id}`, config);
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
    console.log("id a editar", id)
    return async function (dispatch) {
        try {
            const config = getHeaderToken();
            var response = await axios.put(`${BASEURL}/products/${id}`, product, config)
            return {
                type: EDIT_PRODUCT,
                payload: response.data
            }
        } catch (err) {
            console.log('No se pudo editar el producto')
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

export function updateCart() {
    return { type: UPDATE_CART }
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

// export const sumCart = () => {
//     return {
//         type: SUM_CART,
//     }
// }
export function postCategories(payload) {
    return async function (dispatch) {
        try {
            const config = getHeaderToken();
            const response = await axios.post(`${BASEURL}/categories`, payload, config);
            //console.log(response)
            return response.data;
        } catch (err) {
            console.log(err)
        }

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
export function editCategoria(categoria) {
    const { id } = categoria
    console.log("id a editar", id)
    return async function (dispatch) {
        try {
            const config = getHeaderToken();
            var response = await axios.put(`${BASEURL}/categories/update${id}`, categoria, config)
            return {
                type: EDIT_CATEGORIA,
                payload: response.data
            }
        } catch (err) {
            console.log('No se pudo editar la Categoria')
        }
    }
}

export function filterByCategory(payload) {
    return {
        type: FILTER_BY_CATEGORY,
        payload

    }
}
export function getSubCategories() {
    return async function (dispatch) {
        try {
            const responseCategories = await axios.get(`${BASEURL}/subcategories`)
            return dispatch({
                type: GET_SUBCATEGORIES,
                payload: responseCategories.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}
export function postSubCategories(payload) {
    return async function (dispatch) {
        try {
            const config = getHeaderToken();
            const response = await axios.post(`${BASEURL}/subcategories`, payload, config);
            //console.log(response)
            return response.data;
        } catch (err) {
            console.log(err)
        }

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


const getDetailPedido = (pedido) => {
    return { type: GET_PEDIDO_DETAIL, payload: pedido };
}

export const postPedido = (pedido) => {
    return async function (dispatch) {
        try {
            const { data } = await axios.post(
                `${BASEURL}/pedidos`,
                pedido,
                getHeaderToken()
            );
            console.log(data);
            return dispatch(getDetailPedido(data));
        } catch (err) {
            console.log(err.response.data);
        }
    }
}


export const deletePedido = (pedidoId) => {
    return async function (dispatch) {
        try {
            await axios.delete(
                `${BASEURL}/pedidos/${pedidoId}`,
                getHeaderToken()
            );
            console.log("Pedido eliminado exitosamente");
            return dispatch(getDetailPedido(null));
        } catch (err) {
            console.log("No se ha podido eliminar el pedido");
            console.log(err.response.data);
        }
    }
}


export const getAllPedidos = () => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(
                `${BASEURL}/pedidos`,
                getHeaderToken()
            );
            return dispatch({ type: GET_PEDIDOS, payload: data });
        } catch (err) {
            console.log(err);
        }
    }
}


export const getPedidosByUser = (userId) => async dispatch => {
    try {
        let config = getHeaderToken();
        const { data } = await axios.get(
            `${BASEURL}/pedidos/${userId}`,
            config
        );
        return dispatch({ type: GET_PEDIDO_BY_USER, payload: data });
    } catch (err) {
        return console.log(err.response.data);
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
            return console.log(err.response.data);
        }
    }
}

export function createProduct(product) {
    return async function (dispatch) {

        try {
            const config = getHeaderToken();
            var response = await axios.post(`${BASEURL}/products`, product, config)
            return {
                type: CREATE_PRODUCT,
                payload: response.data
            }
        } catch (err) {
            console.log('No se pudo crear el producto')
        }
    }

}
export function listComments() {
    return async function (dispatch) {
        try {
            dispatch({ type: COMMENT_LIST_REQUEST });
            const { data } = await axios.get(`${BASEURL}/comments`);
            dispatch({ type: COMMENT_LIST_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: COMMENT_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    }
}

export const postComment = (comment) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };

        await axios.post(`${BASEURL}/comment`, comment, config).then((response) => {
            console.log(response);
            dispatch({
                type: COMMENT_POST,
                payload: response.data,
            });
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: COMMENT_POST_FAIL,
            payload: message,
        });
    }
};

export const putComment = (comment) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        await axios
            .put(`${BASEURL}/${comment._id}`, comment, config)
            .then((response) => {
                dispatch({ type: COMMENT_PUT, payload: response.data });
            });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: COMMENT_PUT_FAIL,
            payload: message,
        });
    }
};

export const deleteComment = (comment) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (comment._id) {
            await axios.delete(`${BASEURL}/${comment._id}`, config);
        }

        dispatch({ type: COMMENT_DELETE, payload: comment });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: COMMENT_DELETE_FAIL,
            payload: message,
        });
    }
};

