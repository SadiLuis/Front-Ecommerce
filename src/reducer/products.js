import {
    GET_PRODUCTS,
    SEARCH_BY_NAME,
    FILTER_BY_CATEGORY,
    GET_CATEGORIES,
    ORDER_BY_PRICE,
    ORDER_BY_RATE,
    ADD_ITEM,
    DELETE_ITEM,
    REST_ITEM,
    SUM_CART,
    UPDATE_CART
} from '../actions/types';
import { getCartLocalStorage, saveCartLocalStorage } from "../helpers/localstorage";

const initialState = {
    allProducts: [],
    filtered: [],
    productName: [],
    cart: getCartLocalStorage()
}


export default function productsReducer(state = initialState, action) {
    const { type, payload } = action;
    let newCart, newProducts, itemCart;

    switch (type) {
        //! TODO SOBRE EL CARRITO
        case UPDATE_CART:
            return { ...state, cart: getCartLocalStorage() }
        case ADD_ITEM:
            itemCart = state.cart.products.find(e => e.id === payload);
            if (itemCart) {
                newProducts = state.cart.products.filter(e => e.id !== itemCart.id);
                newProducts.push({ ...itemCart, quantity: itemCart.quantity + 1 });
                newCart = { ...state.cart, products: newProducts };
            } else {
                newCart = { ...state.cart, products: [...state.cart.products, { id: payload, quantity: 1 }] };
            }
            saveCartLocalStorage(newCart);
            return {
                ...state,
                cart: newCart
            };
        case SUM_CART:
            newCart = {
                ...state.cart,
                precioTotal: state.cart.products.reduce((prev, e) => {
                    let prod = state.allProducts.find(el => el.id === e.id);

                    return Math.round(prev + ((prod.price * e.quantity) * 100)) / 100;
                }, 0)
            };
            saveCartLocalStorage(newCart);
            return {
                ...state,
                cart: newCart
            };
        case REST_ITEM:
            itemCart = state.cart.products.find(e => e.id === payload);
            newCart = state.cart;
            if (itemCart) {
                newProducts = state.cart.products.filter(e => e.id !== itemCart.id);
                itemCart.quantity > 1 &&
                    newProducts.push({ ...itemCart, quantity: itemCart.quantity - 1 });
                newCart = { ...newCart, products: newProducts };
                saveCartLocalStorage(newCart);
            }
            return {
                ...state,
                cart: newCart
            };
        case DELETE_ITEM:
            newCart = {
                ...state.cart,
                products: state.cart.products.filter(e => e.id !== payload)
            };
            saveCartLocalStorage(newCart)
            return {
                ...state,
                cart: newCart
            }
        //! TODO SOBRE PRODUCTOS 
        case GET_PRODUCTS: return {
            ...state,
            allProducts: payload,
            filtered: payload
        }
        case SEARCH_BY_NAME: return {
            ...state,
            productName: payload,
            filtered: payload
        }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }
        case FILTER_BY_CATEGORY:
            let categoriesProducts = payload === "all" ? state.allProducts : state.allProducts.filter((elem) => elem.category.includes(payload))
            return {
                ...state,
                filtered: categoriesProducts
            }
        case ORDER_BY_PRICE:
            let sortedPrice = payload === "asc" ?
                [...state.filtered].sort(function (a, b) {
                    return (a.price - b.price);
                }) :
                [...state.filtered].sort(function (a, b) {
                    return (b.price - a.price)
                })
            return {
                ...state,
                filtered: sortedPrice
            }
        case ORDER_BY_RATE:
            let sortedRate = payload === "asc" ?
                [...state.filtered].sort(function (a, b) {
                    return (a.rate - b.rate);
                }) :
                [...state.filtered].sort(function (a, b) {
                    return (b.rate - a.rate)
                })
            return {
                ...state,
                filtered: sortedRate
            }
        default:
            return { ...state }
    }
}