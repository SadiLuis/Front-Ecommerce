import React from 'react'
function TextAreaField(props) {
    const {handleChange, label, name, value}=props;
  return (
    <div>
        <label htmlFor={name}>{label}</label>
        <textarea onChange={handleChange} name={name} value={value}></textarea>
    </div>
  )
}

export default TextAreaField