import axios from "axios";
import { GET_PRODUCTS } from "./types";
import { SEARCH_BY_NAME } from "./types";



export function searchByName(payload){
        return async function(dispatch){
            try {
                var json= await axios.get("http://localhost:3001/products?name=" + payload) //OJO: VER BIEN LA ruta por query del back
                return dispatch({
                    type: SEARCH_BY_NAME,
                    payload:json.data

                })
            } catch (err) {
                alert("Product not found")
            }
        }
    }