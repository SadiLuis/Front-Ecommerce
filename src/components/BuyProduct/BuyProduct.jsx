import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import getHeaderToken from "../helpers/getHeaderToken";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { BASEURL } from "../../assets/URLS";

const headers = getHeaderToken();
const stripePromise = loadStripe(
  "pk_test_51KQbAWIarjJt2FCS6eI6jVEzZ1DxAJRwWufxmdBGh2POhYLyJN22NSwQPIa4nBIoWoz0h76iRKTsi3DZ4l5ok0aK00E5DScE38"
);

const CheckoutForm = () => {
  const detailProduct = useSelector((state) => state.productsReducer.details);

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

  // console.log(!stripe || loading);

  return (
    <form className="" onSubmit={handleSubmit}>
      {/* Product Information */}
      <img
        src={detailProduct.image}
        alt="Corsair Gaming Keyboard RGB"
        className="img-fluid"
      />

      <h3 className="text-center my-2">Precio: $ {detailProduct.price}</h3>

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
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row h-100">
          <div className="col-md-4 offset-md-4 h-100">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default BuyProduct;
