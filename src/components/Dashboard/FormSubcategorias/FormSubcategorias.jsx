import React from "react";
import { useState,useEffect } from "react";
import { useSelector , useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {postSubCategories,getSubCategories} from '../../../actions/index'

function validate (subcategory) {

    let nameTest =/^[a-zA-ZA-y\s]{3,255}$/; //solo letras de 3 a 255 caracteres
    let errors = {} ;

    if (!subcategory.nombre) {
        errors.nombre = 'Se requiere un nombre de Subcategoria'} 
    else if (!nameTest.test(subcategory.nombre.trim())) {
        errors.nombre = 'No se permiten numeros , solo letras de 3 a 80 caracteres'}     
    return errors
       
}    


export default function FormSubcategorias() {

    const dispatch = useDispatch()
    const history = useNavigate()

    const subCategoriasAll = useSelector ((state)=>state.productsReducer.subcategories)
     console.log(subCategoriasAll)
    useEffect (() =>{
        dispatch(getSubCategories());
      },[dispatch])
     
    const [errors , setErrors] = useState ({})  
    const [subcategory , setsubcategory] = useState({
        nombre:"",
        categoriaId:2
    })
     //console.log(subcategory)
    const handleChange =(e) => {
        setsubcategory({
            ...subcategory,
            nombre:e.target.value
        })
        setErrors(validate({
            ...subcategory,
            nombre:e.target.value
        }));
        
    }
   
    const handleSubmit = (e)=>{
               
        e.preventDefault();
        
        if (!subcategory.nombre){
            alert (" rellene los campos faltantes")
        } else {
        //console.log(activity)
        dispatch(postSubCategories(subcategory))
        alert("Subcategoria fue creada correctamente")
        setsubcategory({
            nombre:""
           })
        history('/dashboard/admin')}

    }
    
    return (
        
        <div> 
            
            <h1>Crear Subcategoria</h1>
            <form onSubmit={handleSubmit}>
              <div> 
                <div>
                   <label>Nombre de Subcategoria : </label>
                   <input type='text' 
                          name="nombre" 
                          value={subcategory.nombre} 
                          onChange={handleChange} 
                          //id="nombre"
                        //   minLength="4"
                        //   maxLength="20"
                        />
                   {errors.nombre && (
                       <p className = 'error'>{errors.nombre}</p>
                   )}
                </div>
                
                <div>
                    <label>SubCategorias  </label>
                    <select   >
                        {/* <option  value="" >Selecciona un pais</option> */}
                       
                        {subCategoriasAll?.map (el =>
                            <option key={el.id} value={el.nombre} >{ el.nombre}</option>
                        )}
                        {/* { activity.countryID.filter((val,i)=> activity.countryID.indexOf === i)} */}
            
                    </select>
                    
                   
                </div>
                <div>
                    
                    {
                    errors.hasOwnProperty('nombre')  ?
                        <p> Por favor complete los campos faltantes </p> :
                        <button type='submit' className='boton'> Crear Subcategoria </button>}
                </div>
              </div>  
            </form>
           
        </div>
    )
}

