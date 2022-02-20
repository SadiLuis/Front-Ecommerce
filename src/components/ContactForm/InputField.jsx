

function InputField(props) {
    const {handleChange,label, name, type, value}=props;
  return (
    <div className='inputfield'>
        
        <label className="nombre" htmlFor={name}>{label}</label>
        <input className="input" type={type} 
        class="form-control" id="formGroupExampleInput2"
        onChange={handleChange} value={value} name={name} required></input>
        </div>
  )
}

export default InputField