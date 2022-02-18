import React from "react";
import { useState,useEffect } from "react";
import { useSelector , useDispatch} from 'react-redux';
import {useNavigate } from 'react-router-dom';
import {postCategories} from '../../../actions/index'

export default function FormCategorias() {

    const dispatch = useDispatch()
    const history = useNavigate()


    const [category,setcategoty] = useState({
        nombre:"",
    })
}








// const handleSubmit = (e)=>{
               
//     e.preventDefault();
    
//     if (!activity.name || !activity.difficulty || !activity.duration || !activity.season || (activity.countryID.length < 1 )){
//         alert (" rellene los campos faltantes")
//     } else {
//     //console.log(activity)
//     dispatch(postCharacter(activity))
//     alert("Actividad fue creada correctamente")
//     setactivity({
//         name:"",
//         difficulty:"",
//         duration:"",
//         season:"",
//         countryID:[]
//     })
//     history('/home')}

// }