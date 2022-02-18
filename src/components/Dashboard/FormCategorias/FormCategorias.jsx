import React from "react";
import { useState,useEffect } from "react";
import { useSelector , useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {postCategories,getCategories} from '../../../actions/index'

function validate (category) {

    let nameTest =/^[a-zA-ZA-y\s]{3,255}$/; //solo letras de 3 a 255 caracteres
    let errors = {} ;

    if (!category.nombre) {
        errors.nombre = 'Se requiere un nombre de Categoria'} 
    else if (!nameTest.test(category.nombre.trim())) {
        errors.nombre = 'No se permiten numeros , solo letras de 3 a 80 caracteres'}     
    return errors
       
}    


export default function FormCategorias() {

    const dispatch = useDispatch()
    const history = useNavigate()

    const CategoriasAll = useSelector ((state)=>state.productsReducer.categories)
     console.log(CategoriasAll)
    useEffect (() =>{
        dispatch(getCategories());
      },[dispatch])
     
    const [errors , setErrors] = useState ({})  
    const [category , setcategory] = useState({
        nombre:""
    })
     //console.log(category)
    const handleChange =(e) => {
        setcategory({
            ...category,
            nombre:e.target.value
        })
        setErrors(validate({
            ...category,
            nombre:e.target.value
        }));
        
    }
   
    const handleSubmit = (e)=>{
               
        e.preventDefault();
        
        if (!category.nombre){
            alert (" rellene los campos faltantes")
        } else {
        //console.log(activity)
        dispatch(postCategories(category))
        alert("Categoria fue creada correctamente")
        setcategory({
            nombre:""
           })
        history('dashboard/admin')}

    }
    
    return (
        
        <div> 
            
            <h1>Crear Categoria</h1>
            <form onSubmit={handleSubmit}>
              <div> 
                <div>
                   <label>Nombre de Actividad : </label>
                   <input type='text' 
                          name="nombre" 
                          value={category.nombre} 
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
                    <label>Categorias  </label>
                    <select   >
                        {/* <option  value="" >Selecciona un pais</option> */}
                       
                        {CategoriasAll?.map (el =>
                            <option key={el.id} value={el.nombre} >{ el.nombre}</option>
                        )}
                        {/* { activity.countryID.filter((val,i)=> activity.countryID.indexOf === i)} */}
            
                    </select>
                    
                   
                </div>
                <div>
                    
                    {
                    errors.hasOwnProperty('nombre')  ?
                        <p> Por favor complete los campos faltantes </p> :
                        <button type='submit' className='boton'> Crear Categoria </button>}
                </div>
              </div>  
            </form>
           
        </div>
    )
}

