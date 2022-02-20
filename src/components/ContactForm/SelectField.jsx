

function SelectField(props) {
    const {label, handleChange, name}=props;
  return (
    <div className="selectfield">
        <label className="label" htmlFor={name}>{label}</label>
        <select onChange={handleChange} 
        defaultValue="role" name={name}>
            <option value="role" disabled>Elija su rol</option>
          <option value="frontende"></option>
        </select>
        </div>
  )
}

export default SelectField