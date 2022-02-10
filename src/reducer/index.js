import {
    GET_PRODUCTS,
    GET_PRODUCT_BY_ID,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
    DETAIL_PRODUCT,
    ADD_ITEM,
    DELETE_ITEM,
    SEARCH_BY_NAME,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGOUT,
    GET_USER_DETAIL,
    AUTHENTICATION_ERROR
} from '../actions/types';

const initialState = {
    allProducts: [],
    singleProduct: {},
    filtered: [],
    productName: [],
    details: {},
    cart: [],
    token: localStorage.getItem('token_ecommerce'),
    isAuth: null,
    userDetail: null,
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        case GET_USER_DETAIL:
            return { ...state, userDetail: action.payload };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            // Set Token in localstorage
            localStorage.setItem('token_ecommerce', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuth: true,
            };
        case REGISTER_FAILED:
        case AUTHENTICATION_ERROR:
        case LOGIN_FAILED:
        case LOGOUT:
            // Eliminamos el token del localStorage y la info del usuario
            localStorage.removeItem('token_ecommerce');
            return {
                ...state,
                token: null,
                isAuth: false,
                user: null
            };
        case GET_PRODUCTS: return {
            ...state,
            allProducts: action.payload,
            filtered: action.payload
        }
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                singleProduct: action.payload,
                details: action.payload
            }
        case DELETE_PRODUCT:
            let deletedProduct = state.products.filter(el => el._id !== action.payload._id)
            return {
                ...state,
                allProducts: [...deletedProduct]
            };
        case EDIT_PRODUCT:
            let index = state.allProducts.findIndex(product => product.id === action.payload.id);
            state.allProducts[index] = action.payload;
            return {
                ...state,
                allProducts: [...state.products]
            };
        case DETAIL_PRODUCT: return {
            ...state,
            details: action.payload
        }
        case ADD_ITEM: return {
            ...state,
            cart: [...state.cart, action.payload]

        }
        case DELETE_ITEM: return {
            ...state,
            cart: state.cart.filter(c => c.id !== action.payload)

        }
        case SEARCH_BY_NAME:
            return {
                ...state,
                productName: action.payload,
                filtered: action.payload
            }

        default: return state;
    }
}