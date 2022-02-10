import React, { useState, useEffect,  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProductById, editProduct, getCategories } from '../../../actions';
import { validationFunction } from './ValidationFunction';


export default function FormEditProduct(props){

    const {id, handleClosePopUp} = props

    
    const dispatch = useDispatch()
    const product = useSelector((state) => state.singleProduct)
    const [errors, setErrors] = useState({})
    const category = useSelector( (state) => state.categories)
     
    const [input, setInput] = useState({
        
        id: '',
        title: '',
        price: '',
        description: '',
        categoriaId: '',
        caterogy: '',
        image: '',
        cantidad: ''
    
})


    useEffect(() => {
        dispatch(getProductById(id));
        dispatch(getCategories())
    }, [id])

    useEffect(() => {
        setInput({
            id: product.id || '',
            title: product.title || '',
            price: product.price || '',
            description: product.description || '',
            categoriaId: '',
            caterogy: product.category || '',
            image: product.image || '',
            cantidad: product.cantidad || ''
        })
     }, [product])
    
    

    function handleInputChange(e){
        
        setInput({
            ...input,
            [e.target.name] : e.target.value,
            categoriaId: (category.filter(c => c.nombre === product.category)).map(c => c.id)[0]
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

    const handleSubmit = (e) => {
        dispatch(editProduct(input))
        setInput({
            id: '',
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
        alert("Product was updated. You will be redirected to your products after 3 seconds")
    }    
    
    
    //let auxCategoryId = category.filter(c => c.nombre === product.caterogy)
    
    

    if (product && category.length > 0 )

    {
        return (
            
        <div>
            
            <form 
             onSubmit={e => {
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
                        

                    />
                    {errors.price && (
                        <p>{input.price}</p>
                    )}
                </div>

                <div>        
                <select onChange={(e) => handleSelectCategory(e) } name="" id="">
                        <option defaultValue={(category.filter(c => c.nombre === product.category)).map(c => c.id)} value={(category.filter(c => c.nombre === product.category)).map(c => c.id)}>{product.category}</option>
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
                        type='text'
                        name='cantidad'
                        onChange={e => handleInputChange(e)}
                        value={input.cantidad}
                    />
                    {errors.cantidad && (
                        <p>{errors.cantidad}</p>
                    )}
                </div>

                 <br />       
                <button type="submit" disabled={Object.keys(errors).length > 0  ? true : false} >Edit Product</button> 
         
                    
            </form>
        </div>    
        )
    }else {
        return (
            <h1>Loading...</h1>
        )
    }
}

    
