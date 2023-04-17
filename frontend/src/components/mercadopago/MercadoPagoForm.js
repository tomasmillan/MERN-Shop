import { useState } from "react";
import useMercadoPago from "../../hooks/useMercadoPago";
import React from "react";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import CheckoutSucces from "../../components/CheckoutSucces";
import { useNavigate } from "react-router-dom";
const initialState = {
  cvc: "",
  cardExpirationMonth: "",
  cardExpirationYear: "",
  focus: "cardNumber",
  cardholderName: "",
  cardNumber: "",
  issuer: "",
};
export default function MercadoPagoForm() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const resultPayment = useMercadoPago();

  const handlePaymentSuccess = () => {
    setPaymentSuccess(resultPayment);
    navigate("/checkoutSuccess"); 
  };
  

  const mercadoPago = useMercadoPago();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    mercadoPago.createToken(event.target, handlePaymentSuccess);
  };
  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.dataset.name || e.target.name });
  };
  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };
  return  (
    <div className="MpContainer">
      <Cards
        cvc={state.cvc}
        expiry={state.cardExpirationMonth + state.cardExpirationYear}
        name={state.cardholderName}
        number={state.cardNumber}
        focused={state.focus}
        brand={state.issuer}
      />
    <form onSubmit={handleFormSubmit}  id="form-checkout">
        <div className="form-control">
      <label>
        Nombre Completo:
        <input
          type="text"
          name="cardholderName"
          required
          id="form-checkout__cardholderName"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
          <input
            type="email"
            name="cardholderEmail"
            id="form-checkout__cardholderEmail"
            onFocus={handleInputFocus}
          />
       </label>
      </div>
        <div className="form-control">
      <label>
        Numero de la Tarjeta:
        <input
          type="tel"
          name="cardNumber"
          required
          autoComplete="cc-number"
          inputMode="numeric"
          pattern="[0-9\s]{13,19}"
          id="form-checkout__cardNumber"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
       </label>
      </div>
        <div className="form-control">
      <label>
        Fecha de Vencimiento:
        <input
          type="number"
          name="cardExpirationMonth"
          required
          min="1"
          max="12"
          inputMode="numeric"
          id="form-checkout__cardExpirationMonth"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="number"
          name="cardExpirationYear"
          required
          min={new Date().getFullYear()}
          max="99"
          inputMode="numeric"
          id="form-checkout__cardExpirationYear"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
       </label>
      </div>
      <div className="form-control">
      <label>
        CVC :
        <input
          type="tel"
          name="securityCode"
          required
          autoComplete="cc-csc"
          inputMode="numeric"
          pattern="[0-9]{3,4}"
          id="form-checkout__securityCode"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
       </label>
      </div>
      <div className="form-control">
          <select name="issuer" id="form-checkout__issuer" onChange={handleInputChange}></select>
          <select
            name="identificationType"
            id="form-checkout__identificationType"
          ></select>
        </div>
        <div className="form-control">
          <input
            type="text"
            name="identificationNumber"
            id="form-checkout__identificationNumber"
          />
        </div>
        <div className="form-control">
          <select name="installments" id="form-checkout__installments"></select>
        </div>
        <div className="form-control">
          <button type="submit" id="form-checkout__submit" form='form-checkout' onClick={handlePaymentSuccess}>
            Pagar
          </button>
        </div>
        <progress value="0" className="progress-bar">
          Cargando...
        </progress>
    </form>
    {paymentSuccess ? <CheckoutSucces /> : null}
    </div>
  );
}
