import { useEffect, useState } from "react";
import useScript from "./useScript";
import { formConfig } from "../components/mercadopago/formConfig";
import { url } from "../features/api";
import "../styles/card.css";
import {
  getTotals,
} from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../pages/Cart";

export default function useMercadoPago() {
  const [resultPayment, setResultPayment] = useState(undefined);
  const { MercadoPago } = useScript(
    "https://sdk.mercadopago.com/js/v2",
    "MercadoPago"
  );
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
    if (MercadoPago) {
      const mp = new MercadoPago("APP_USR-643e3219-745e-462d-8bfd-8b60996b440d");
      const cardForm = mp.cardForm({
        amount: cart.cartTotalAmount.toString(),
        autoMount: true,
        form: formConfig,
        callbacks: {
          onFormMounted: (error) => {
            if (error) {
              console.warn("Form Mounted handling error: ", error);
            }
          },
          onSubmit: (event) => {
            event.preventDefault();

            const cardFormData = cardForm.getCardFormData();
            const {
              paymentMethodId: payment_method_id,
              issuerId: issuer_id,
              cardholderEmail: email,
              token,
              installments,
              identificationNumber,
              identificationType,
            } = cardFormData;

            fetch(`${url}/mercadopago`, {
              method: "POST",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Request-Method":
                  "GET, POST, DELETE, PUT, OPTIONS",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token,
                installments,
                payment_method_id,
                issuer_id,
                description: cart.cartItems[0].name,
                transaction_amount: cart.cartTotalAmount,
                payer: {
                  email,
                  identification: {
                    type: identificationType,
                    number: identificationNumber,
                  },
                },
              }),
            })
              .then((response) => response.json())
              .then((data) => setResultPayment(data))
              .catch((error) => setResultPayment(error));
          },
          onFetching: (resources) => {
            const progressBar = document.querySelector(".progress-bar");
            progressBar.removeAttribute("value");
            return () => {
              progressBar.setAttribute("value", "0");
            }
          },
        },
      });
      setResultPayment(cardForm);
    }
  }, [MercadoPago, cart.cartItems, cart.cartTotalAmount, dispatch]);

  return { resultPayment, cardFormRef: Cart }; // Rename cardFormRef to cardForm
}
