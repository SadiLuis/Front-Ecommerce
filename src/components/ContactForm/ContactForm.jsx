import React, {useEffect, useState} from 'react';
// import InputField from './InputField'
// import TextAreaField from './TextAreaField';
import emailjs from '@emailjs/browser';
import styles from "./ContactForm.css";
import bootstrap from "bootstrap";
import {BsEnvelope} from "react-icons/bs"






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
    <><div class='container mt-5'>
          <h3>Contáctenos!</h3>
      </div>
      <div class='container mt-5'>

              {/* <div className="mb-3">  */}


              {status && renderAlert()}

              <form class="row g-3" onSubmit={handleSubmit}>
                  <div class="col-md-6">
                      <label for="primerNombre" class="form-label">Nombre</label>
                      <input onChange={handleChange} type="text" class="form-control" id="primerNombre" required></input>
                  </div>

                  <div class="col-md-6">
                      <label for="apellido" class="form-label">Apellido</label>
                      <input onChange={handleChange} type="text" class="form-control" id="apellido" required></input>
                  </div>
                  <div class="col-md-8">
                      <label for="email" class="form-label">E-mail</label>
                      <input onChange={handleChange} type="email" class="form-control" id="email" required></input>
                  </div>
                  <div class="col-md-4">
                      <label for="telefono" class="form-label">Teléfono</label>
                      <input onChange={handleChange} type="text" class="form-control" id="telefono"></input>

                  </div>
                  <div class="col-md-12">
                      <label for="comentarios" class="form-label">Su mensaje</label>
                      <textarea onChange={handleChange} class="form-control" id="comentarios" rows="3" required></textarea>

                  </div>
                  <div class="col-md-12">
                      <button type="submit" className='boton'><span>
                      <BsEnvelope></BsEnvelope ></span>Enviar</button>
                  </div>

              </form>
              {/* </div> */}




              {/* <div class='row pt-5 mx-auto'>

       <h3>Envíenos un mensaje</h3>
       <InputField   class="form-label"
     label for="formGroupExampleInput" class="form-label"
       onChange={handleChange}
       label="Nombre completo" name="nombrecompleto" type="text" placeholder="Nombre completo"/>
       <InputField    class="form-label"
        
       onChange={handleChange} label="Email" name="email" type="email" placeholder="email"/>
    
    <TextAreaField
     
     handleChange={handleChange} label="Su mensaje aquí" name="mensaje" />
    <button class="btn btn-primary btn-sm" type="submit" >Enviar</button>
    </div>
    </form>
    </div> */}
          </div></>
        
  )
}
const renderAlert=()=>(
    <div className='alert'>
        <p>Su mensaje fue enviado exitosamente</p>
    </div>
)

// import React, { useRef } from 'react';
// import emailjs from '@emailjs/browser';

// export const ContactForm = () => {
//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs.sendForm('service_ib4r968', 'template_vqcx9n9', form.current, 'user_sWs226JAyOW1aSGcgfhxz')
//       .then((result) => {
//           console.log(result.text);
//       }, (error) => {
//           console.log(error.text);
//       });
//       e.target.reset()
//   };

//   return (
//     <form ref={form} onSubmit={sendEmail}>
//       <label>Name</label>
//       <input type="text" name="user_name" />
//       <label>Email</label>
//       <input type="email" name="user_email" />
//       <label>Message</label>
//       <textarea name="message" />
//       <input type="submit" value="Send" />
//     </form>
//   );
// };


export default ContactForm