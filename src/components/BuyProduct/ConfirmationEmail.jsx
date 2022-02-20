import React, {useEffect, useState, useSelector} from 'react';
import { Link } from 'react-router-dom';
import PedidosCompra from "../Pedidos-de-compra/PedidosCompra";
import PedidoDetail from "../Pedidos-de-compra/PedidoDetail";
import Register from "../Register/Register";
import Profile from '../../pages/Profile/Profile';

import Cart from "../Cart/Cart";
import emailjs from '@emailjs/browser';


 function SendEmail(){
 const {nombre}=useState({

 
   
 nombre: "",
// email: email,
// cantidad:cantidad,
// totalPedido:totalPedido,
// precioUnitario:precioUnitario,
// productos:productos,
// pedidoId:pedidoId,
// dirección: direccion,
// tarjeta:tarjeta
  })
   
         var templateParams = {
           nombre:"Jani",
           email:"janinasoledadroberto@gmail.com"
        // nombre: props.Register.nombre,
        // email: props.Register.email,
        // cantidad:props.PedidosCompra.cantidad,
        // totalPedido:props.PedidosCompra.totalPedido,
        // precioUnitario:props.PedidosCompra.precioUnitario,
        // productos:props.PedidosCompra.producto,
        // pedidoId:props.PedidosCompra.pedidoId,
        // dirección: props.Register.direccion,
        // tarjeta:props.BuyProduct.card
        
    
    };
    console.log(templateParams)
        // e.preventDefault();
        emailjs.send("service_ib4r968", "template_kiocwem", templateParams,
        "user_sWs226JAyOW1aSGcgfhxz")
        .then(function(response)  {
            console.log("Success", response.status, response.text);
            
          }, function(error)  {
            console.log("Failed", error);
          });
    

    // useEffect(()=>{
    //     if(status==="Success"){
    //         setTimeout(()=>{
    //             setStatus("");

    //         }, 3000)
    //     }
    // }, [status])
    // function handleChange(e){
    //     e.preventDefault()
    //     setValues(values=>({
    //        ...values,
    //        [e.target.name]:e.target.value
    //     }))
    // }
    
  return (
    <div className='container'>
         
        
        <button  onClick={SendEmail}></button>
        
           <h3>Confirmation Email</h3>
           
        
        
        </div>
  )
}
    





export default SendEmail;









    