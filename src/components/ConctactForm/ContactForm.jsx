import React, {useEffect, useState} from 'react';
import InputField from './InputField'
import TextAreaField from './TextAreaField';
import emailjs from '@emailjs/browser';





function ContactForm() {
    const [values, setValues]=useState({
        nombreCompleto:"",
        email:"",
        mensaje:""
    });
    const [status,setStatus ]=useState("");
    console.log(values)

    function handleSubmit(e){
        e.preventDefault()
        emailjs.send("service_ib4r968", "template_vqcx9n9", values, 
        "user_sWs226JAyOW1aSGcgfhxz")
        .then(response=>{
            console.log("Success", response);
            setValues({
                nombreCompleto:"",
                email:"",
                mensaje:""
            })
            setStatus("Success")
        }, error=>{
            console.log("Failed", error)
        });
        e.target.reset()
     }

    useEffect(()=>{
        if(status==="Success"){
            setTimeout(()=>{
                setStatus("");
               
            }, 3000)
            
        }
    }, [status])
    function handleChange(e){
        e.preventDefault()
        setValues(values=>({
           ...values,
           [e.target.name]:e.target.value
        }))
    }
  return (
    <div className='container'>
        {status && renderAlert()}
        <h3>Contáctenos</h3>
        <form onSubmit={handleSubmit}>
           <h3>Envíenos un mensaje</h3>
           <InputField  
        //    value={values.nombreCompleto} con esto no funciona 
           onChange={handleChange}label="Nombre completo" name="nombrecompleto" type="text" placeholder="Nombre completo"/>
           <InputField 
        //    value={values.email}con esto no funciona 
           onChange={handleChange} label="Email" name="email" type="email" placeholder="email"/>
        
        <TextAreaField values={values.mensaje} handleChange={handleChange} label="Su mensaje aquí" name="mensaje" />
        <button className='btnenviar' type="submit">Enviar</button>
        
        </form>
        </div>
  )
}
const renderAlert=()=>(
    <div className='alert'>
        <p>Su mensaje fue enviado exitosamente</p>
       
    </div>
)




export default ContactForm