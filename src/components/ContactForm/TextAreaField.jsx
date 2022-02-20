

function TextAreaField(props) {
    const {handleChange, label, name,}=props;
  return (
    <div>
        <label htmlFor={name}>{label} </label>
        <textarea onChange={handleChange} name={name} required></textarea>
    </div>
  )
}

export default TextAreaField