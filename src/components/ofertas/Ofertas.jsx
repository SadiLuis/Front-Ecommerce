import React , {useState ,useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel} from "react-bootstrap";
import {getAllOfertas ,getOneOferta } from '../../actions/index'
const Ofertas = () => {
 const dispatch = useDispatch()
const ofertas = useSelector((state) => state.ofertasReducer.allOfertas)
const allProducts= useSelector((state) => state.productsReducer.allProducts)
  useEffect(() => {
   dispatch(getAllOfertas())
  
  },[dispatch ,getAllOfertas])

  let oferta1 = ofertas?.map(el => {
    const productOffer= el.OfertaProductos?.map(p => {
         const filter = allProducts.find(el => el.id === p.productoId)
         return {...filter,cantidadP: p.cantidad}
    } )
     return productOffer
     
  })
  console.log(oferta1)
   let ofertaP = oferta1[0]?.map(el => el.title)
  return (
    <Carousel>
  {ofertas?.map((el,idx) =>
  (<Carousel.Item interval={5000} key={el.id}>
    <img
      className="d-block w-100"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9gIG6EREFelv1j14SwOdOpnNC23CgWZmbmw&usqp=CAU"
      alt="First slide"
      style={{width:'250px', height:'350px'}}
    />
    <Carousel.Caption>
      <h3>OFERTA {el.titulo}</h3>
      <p>{el.descripcion}</p>
      <p>Tenes un % {el.porcentajeDescuento} de descuento en estos productos </p>
        <p>{ofertaP} </p>
    </Carousel.Caption>
     
       
  </Carousel.Item>
  ))}
</Carousel>
  )
}

export default Ofertas