import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { validationFunction } from './ValidationFunction';
import { createProduct, getCategories } from '../../../actions';


export default function FormCreateProduct({handleClosePopUp}){

    
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    
    
     const category = useSelector( (state) => state.categories)
     //console.log(caterory)
    
     useEffect(() => {
        dispatch(getCategories());
      }, [dispatch]);

    

    
    //category.map(c => console.log(c))
    const [input, setInput] = useState({
        title: '',
        price: '',
        description: '',
        categoriaId: '',
        image: '',
        cantidad: ''
        
    })

    


    function handleInputChange(e){
        
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validationFunction({
            ...input,
            [e.target.name] :e.target.value
        }))
        
    
    }

    function handleSelectCategory(e){
        
        setInput({
            ...input,
            categoriaId: e.target.value
        })
        setErrors(validationFunction({
            ...input,
            [e.target.name] :e.target.value
        }))
    }

    console.log(input)
    function handleSubmit(e, handleClosePopUp){
        e.preventDefault()
        dispatch(createProduct(input))
        setInput({
            title: '',
            price: '',
            description: '',
            categoriaId: '',
            image: '',
            cantidad: ''
             })
        //alert("Product was succesfully created")   
        //handleClosePopUp()       
        setTimeout(function () {
            window.location.href = "/dashboard";
             }, 3000); 
        alert("Product was created. You will be redirected to your products after 3 seconds");      
    }


    if (category.length > 0){

    
    return (
    <div>    
        
        <form onSubmit={e => {
            handleSubmit(e)
          }}
          >
              <button onClick={handleClosePopUp}>Close Form</button> 
                
                <div >
                    <label >Title</label>
                    <input
                        type='text'
                        name='title'
                        onChange={e => handleInputChange(e)}
                        value={input.title}
                        placeholder='Title of Product'
                        //required
                    />
                    {errors.title && (
                        <p>{errors.title}</p>
                    )}
                </div>     

                <div>
                    <label >Price</label>
                    <input
                        type='number'
                        name='price'
                        onChange={e => handleInputChange(e)}
                        value={input.price}
                        placeholder='Price of Product'
                        //required
                    />
                    {errors.price && (
                        <p>{errors.price}</p>
                    )}
                </div>
 
                 <div>        
                <select onChange={(e) => handleSelectCategory(e) } name="" id="">
                        <option defaultValue="default" value="">Select Category</option>
                    {
                        category.map( (c => 
                            
                            <option key={c.id} value={c.id}>{c.nombre}</option>
                            
                        ))
                }    
                </select>
                {errors.categoriaId && (
                        <p>{errors.categoriaId}</p>
                    )}
                </div> 

                <div>
                    <label>Description</label>
                    <textarea
                    name='description'
                    onChange={e => handleInputChange(e)}
                    value={input.description}
                    placeholder='Description of Product'
                    //required
                    />
                    {errors.description && (
                        <p>{errors.description}</p>
                    )}
                </div>


                {/* //Asi deberia ser el input si queremos subir una imagen desde nuestra pc
                 <div >
                <label>Image</label>
                <input
                    type='file'
                    name='image'
                    onChange={e => handleInputChange(e)}
                    placeholder='Image of Product'
                />
                </div> */}

                <div>
                    <label htmlFor="">Image:</label>
                    <input 
                        type="text"
                        value = {input.image}
                        name = "image" 
                        onChange={(e) => handleInputChange(e) }
                    />

                    {errors.image && (
                        <p>{errors.image}</p>
                    )}
                </div>

                <div>
                    <label >Stock</label>
                    <input
                        type='number'
                        name='cantidad'
                        onChange={e => handleInputChange(e)}
                        value={input.cantidad}
                        placeholder='Stock of Product'
                        //required
                    />
                    {errors.cantidad && (
                        <p>{errors.cantidad}</p>
                    )}
                </div>

                 <br />       
                <button type="submit" disabled={Object.keys(errors).length > 0  ? true : false} >Create Product</button> 
                
        </form>
    </div>    
    )
    }else {
        return (
            <h1>Loading...</h1>
        )
    }
}