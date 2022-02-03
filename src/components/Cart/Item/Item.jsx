
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
  <Container className='px-4'>
   <Button className='btn-close float-end' aria-label='Close' onClick={()=> handleDelete(id)}></Button>
   <Row className='justify-content-md-center' >
    <Col className='md-3'>
      <img src={image} alt={`imagen de ${title}`} height='200px' width='180px'/>
    </Col>
   <Col className='md-4'>
      <Link to={`/home/${id}`}>
      <h3>{title}</h3>
      </Link>
    </Col>
    <Col className='md-4'>
       <h2>$ {price}</h2>
    </Col>
    <Col className='md-4'>
       <h2></h2>
    </Col>
   </Row>
  </Container >
  )
}

export default Item;
