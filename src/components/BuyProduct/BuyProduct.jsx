import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import getHeaderToken from "../../helpers/getHeaderToken";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { BASEURL } from "../../assets/URLS";
import { PUBLIC_KEY_STRIPE } from "../../assets/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button , Modal} from "react-bootstrap";

const headers = getHeaderToken();
const stripePromise = loadStripe(PUBLIC_KEY_STRIPE);

const CheckoutForm = () => {
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [popUp , setPopUp] = useState(false)
  const pedidoId = useSelector(
    (state) => state.pedidosReducer.pedidoDetail.pedidoId
  );

  // console.log(pedidoId);
  
  const PagoPopUp =(props)=> {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Detalle del Pago
          </Modal.Title>
        </Modal.Header>
          
        <Modal.Body>
          <h4>El pago se realizo con exito</h4>
          </Modal.Body>
        <Modal.Footer>
         
          <Button  onClick={ ()=> navigate("/home")}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      // console.log(paymentMethod)
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          `${BASEURL}/pagos`,
          {
            transaccionId: id,
            pedidoId,
          },
          headers
        );
        console.log(data);
        setPopUp(true)
        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <div>
    <form className="" onSubmit={handleSubmit}>
      <div className="form-group">
        <CardElement />
      </div>

      <button disabled={!stripe} className="btn btn-success">
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Buy"
        )}
      </button>
    </form>
     <PagoPopUp
      show={popUp}
      onHide={() => setPopUp(false)}
      />
    </div>
  );
};

function BuyProduct() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <div className="container p-4">
          <div className="row h-100">
            <div className="col-md-4 offset-md-4 h-100">
              <CheckoutForm />
            </div>
          </div>
        </div>
      </Elements>
    </>
  );
}

export default BuyProduct;
