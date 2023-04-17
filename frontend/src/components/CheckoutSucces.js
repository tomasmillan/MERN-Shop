import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { clearCart, getTotals } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const redirectHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <h2>Orden de Compra Completada</h2>
      <p>Tu orden puede tardar un tiempo en procesarse.</p>
      <p>
        Cheque el estado de su orden en su perfil, despues de 10 minutos de
        haber realizado el pago.
      </p>
      <p>
        En caso de cualquier problema o consulta con orden, contactese con
        nuestro soporte tecinco en <strong>support@onlineshop.com</strong>
      </p>
      <button onClick={redirectHome}>Volver al inicio</button>
    </Container>
  );
};

export default CheckoutSuccess;

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
  }
  p{
    margin: 0.2rem 0;
    font-weight: 600;
    text-align: center;
    font-size: 1.2rem;
  }
  button {
    margin: 2rem 0;
    padding: 0.4rem;
    border-radius: 5px;
    color: black;
    background-color: blue;
    border: transparent;
    font-size: 1.2rem;
    transition: all 0.6s ease;
    &:hover{
      background-color: #343434;
      color: white;
    }
  }
`;
