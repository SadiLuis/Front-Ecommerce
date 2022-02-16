import React from 'react'


function InputField(props) {
    const {handleChange,label, name, type, value}=props;
  return (
    <div className='inputfield'>
        
        <label className="nombre" htmlFor={name}>{label}</label>
        <input className="input" type={type} onChange={handleChange} value={value} name={name} required></input>
        </div>
  )
}

export default InputField