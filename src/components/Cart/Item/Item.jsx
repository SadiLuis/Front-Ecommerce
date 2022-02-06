import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteItem} from '../../../actions/index';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container , Button ,Row , Col} from 'react-bootstrap';
function Item({id ,title , price , image}) {
  const dispatch = useDispatch()

  const handleDelete = (id)=>{
     dispatch(deleteItem(id))
  }
  return (
  <Container className='py-10'>
   <Button className='btn-close float-end' aria-label='Close' onClick={()=> handleDelete(id)}></Button>
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
       <h3>$ {price}</h3>
    </Col>
    <Col className='md-3'>
       <h3>hola</h3>
    </Col>
   </Row>
  </Container >
  )
}

export default Item;
