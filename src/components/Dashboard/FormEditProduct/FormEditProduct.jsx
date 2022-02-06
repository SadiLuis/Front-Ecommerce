import React, { useState, useEffect,  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProductById, editProduct } from '../../../actions';
import { validationFunction } from './ValidationFunction';
import { category } from './Categorias';


export default function FormEditProduct(props){

    const {id, handleClosePopUp} = props

    
    const dispatch = useDispatch()
    const product = useSelector((state) => state.singleProduct)

    

    const [errors, setErrors] = useState({})        

    
    useEffect(() => {
        dispatch(getProductById(id))
        
    }, [id])

    useEffect(() => {
        setInput(product)
     }, [product])

    const [input, setInput] = React.useState({
        
            title: '',
            price: '',
            description: '',
            categoriaId: '',
            image: '',
            rate: '',
            count: '',
            cantidad: ''
        
    })

    


    // console.log("producto", product)
    // console.log(input[0].title)

    // useEffect(() => {
    //     setInput(product[0])
    // }, [product])

    // useEffect(() => {
    //     setInput({
    //         title: product[0].title,
    //         price: product[0].price,
    //         description: product[0].description,
    //         categoriaId: product[0].categoriaId,
    //         image: product[0].image,
    //         rate: product[0].rate,
    //         count: product[0].count,
    //         cantidad: 100
    //     })
    // }, [product])


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

    const handleSubmit = (e) => {
        dispatch(editProduct(input[0]))
        setInput({
            title: '',
            price: '',
            description: '',
            categoriaId: '',
            image: '',
            rate: '',
            count: '',
            cantidad: ''
             })
        //alert("Product was succesfully created")   
        //handleClosePopUp()       
        setTimeout(function () {
            window.location.href = "/dashboard";
             }, 3000); 
        alert("Product was updated. You will be redirected to your products after 3 seconds")
    }    
    
    
    

    if (product.length > 0 && input.length > 0) 
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
                        value={product[0].title}
                        //placeholder={input.title}
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
                        value={product[0].price}
                        placeholder='Price of Product'
                        //required
                    />
                    {errors.price && (
                        <p>{errors.price}</p>
                    )}
                </div>

                {/* <div>        
                <select onChange={(e) => handleSelectCategory(e) } name="" id="">
                        <option defaultValue="default" value="">Select Category</option>
                    {
                        category.map( (c => 
                            
                            <option key={c.id} value={c.categoriaId}>{c.name}</option>
                            
                        ))
                }    
                </select>
                {errors.categoriaId && (
                        <p>{errors.categoriaId}</p>
                    )}
                </div> */}

                <div>
                    <label>Description</label>
                    <textarea
                    name='description'
                    onChange={e => handleInputChange(e)}
                    value={product[0].description}
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
                        value = {product[0].image}
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
                        value={product[0].cantidad}
                        //placeholder='Stock of Product'
                        //required
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

    
