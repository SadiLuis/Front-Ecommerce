import React, { useState, useEffect,  } from 'react';
import { useDispatch, useSelector } from "react-redux";
//import { getProductById, editProduct, getCategories } from '../../../actions';
//import { validationFunction } from './ValidationFunction';

export default function FormEditPedidos(props){

    const {id, handleClosePopUp} = props

    return (
        <div>
            <div>
                <button onClick={handleClosePopUp}>Close Form</button> 
            </div>
            <form>

            </form>
        </div>   
    )
} 