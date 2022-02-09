
import React , {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteItem ,totalItemSum , totalItemRes , addQuantity,restQuantity} from '../../../actions/index';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container , Button ,Row , Col} from 'react-bootstrap';
function Item({id ,title , price , image, stock , quantity}) {
  const dispatch = useDispatch()
  const [input , setInput] = useState(quantity)
  //const [precio , setPrecio] = useState(price*quantity)
  const sumaTotal = useSelector(state => state.precioTotal)
   let priceTotal = price * quantity
  
 
   const payload ={
     addQuantity: parseInt(input),
     id : id
     
   }

  const handleChange = (e)=>{
    console.log(e)
     setInput(e.target.value)
     dispatch(addQuantity(payload ))
        dispatch(totalItemSum(price ))
      
    }

  const handleButtonMas =(e)=>{
    e.preventDefault()
    if(input  <= stock ){
    setInput(prev => prev + 1)
       
       dispatch(addQuantity(payload ))
        dispatch(totalItemSum(price ))
    }else{
       alert('Se supero el limite de stock , el limite es: '+ stock)
       setInput(prev => prev - 1)
       dispatch(totalItemRes(price ))
       dispatch(restQuantity(payload ))
    }
  }
  const handleButtonMenos =(e)=>{
    e.preventDefault()
    if(input > 1){
    setInput(prev => prev  - 1)
      
     dispatch(restQuantity(payload ))
     dispatch(totalItemRes(price ))
    }
  }

  const handleDelete = (id,e)=>{
    e.preventDefault()
   dispatch(totalItemRes(priceTotal))
     dispatch(deleteItem(id))
  }
 //console.log(input , quantity)
 
 const fixedPrice =  Math.round((priceTotal + Number.EPSILON) * 100) / 100;
 

  return (
  
  <Container className='py-4'>
   <Button className='btn-close float-end' aria-label='Close' onClick={(e)=> handleDelete(id,e)}></Button>
   <Row  className="justify-content-center">
    <Col  >
      <img src={image} alt={`imagen de ${title}`} height='200px' width='180px'/>
    </Col>
   <Col>
      <Link to={`/home/${id}`}>
      <h4>{title}</h4>
      </Link>
    </Col>
    <Col >
       <h3>Cantidad</h3>
       <Button onClick={handleButtonMenos}>-</Button>
       <input type='number' value={input} min='1' max={stock} defaultValue= {input} onChange={handleChange}  disabled='true'/>
       <Button onClick={handleButtonMas}>+</Button>
    </Col>
    <Col >
       <h3>Precio</h3>
       <h4>$ {fixedPrice}</h4>
    </Col>
       
   </Row>
          
     
  </Container>
  )
}

export default Item;