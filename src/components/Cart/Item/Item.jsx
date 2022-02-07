
import React , { useEffect,useState   } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteItem ,totalItemSum , totalItemRes , addQuantity,restQuantity} from '../../../actions/index';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container , Button ,Row , Col} from 'react-bootstrap';
function Item({id ,title , price , image, stock , quantity}) {
  const dispatch = useDispatch()
  const [input , setInput] = useState(quantity)
  const [precio , setPrecio] = useState(price*quantity)
  const sumaTotal = useSelector(state => state.precioTotal)

  useEffect(()=>{
     dispatch(totalItemSum(price*quantity))
    
   
  },[dispatch])

   const payload ={
     addQuantity: parseInt(input),
     id : id
   }

  const handleChange = (e)=>{
     setInput(e.target.value)
     console.log(e.target.value)
    
  }

  const handleButtonMas =(e)=>{
    e.preventDefault()
    setInput(prev => prev + 1)
    setPrecio(prev => prev + price)
       dispatch(addQuantity(payload ))
        dispatch(totalItemSum(price ))
  }
  const handleButtonMenos =(e)=>{
    e.preventDefault()
    if(input > 1){
    setInput(prev => prev  - 1)
    setPrecio(prev => prev - price)
     dispatch(restQuantity(payload ))
     dispatch(totalItemRes(price ))
    }
  }

  const handleDelete = (id,e)=>{
    e.preventDefault()
   dispatch(totalItemRes(precio))
     dispatch(deleteItem(id))
  }
 console.log(input , quantity)
 
 const fixedPrice =  Math.round((precio + Number.EPSILON) * 100) / 100;
 

  return (
  
  <Container className='md-3'>
   <Button className='btn-close float-end' aria-label='Close' onClick={(e)=> handleDelete(id,e)}></Button>
   <Row  >
    <Col className='py-3 ' >
      <img src={image} alt={`imagen de ${title}`} height='200px' width='180px'/>
    </Col>
   <Col className='md-3'>
      <Link to={`/home/${id}`}>
      <h3>{title}</h3>
      </Link>
    </Col>
    <Col className='md-3'>
       <h3>Cantidad</h3>
       <Button onClick={handleButtonMenos}>-</Button>
       <input type='number' value={input} min='1' max={stock} defaultValue= {input} onChange={handleChange}/>
       <Button onClick={handleButtonMas}>+</Button>
    </Col>
    <Col className='md-3'>
       <h3>$ {fixedPrice}</h3>
    </Col>
       
   </Row>
          
     
  </Container>
  )
}

export default Item;
