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

const headers = getHeaderToken();
const stripePromise = loadStripe(PUBLIC_KEY_STRIPE);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

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
            pedidoId: 1,
          },
          headers
        );
        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      {/* Product Information */}
      {/* {itemCart?.map((i) => (
        <div key={i.handleSubmit}>
          <img
            src={i.image}
            alt="Corsair Gaming Keyboard RGB"
            className="img-fluid"
          />
          <h4>Cantidad: {i.quantity}</h4>
          <h3 className="text-center my-2">Precio: $ {i.price}</h3>
        </div>
      ))} */}
      {/* <h3>Total:$ {total.precioTotal}</h3> */}
      {/* User Card Input */}
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
