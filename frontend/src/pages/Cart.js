import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { BsFillHandbagFill, BsFillTrashFill } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import "../styles/cart.css";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../features/cartSlice";
import PayButton from "../components/PayButton";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cartContainer">
      <h2>Carrito de Compras</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cartEmpty">
          <BsFillHandbagFill className="bagIcon" />
          <p>Tu carrito esta vacio</p>
          <div className="startShopping">
            <Link to="/">
              <BiArrowBack />
              <span>No te quedes sin tu compra</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="cartTitles">
            <h3>Productos</h3>
            <h3>Precio</h3>
            <h3>Cantidad</h3>
            <h3>Total</h3>
          </div>
          <div className="cartItems">
            {cart.cartItems?.map((cartItem) => (
              <div className="cartItem" key={cartItem.id}>
                <div className="cartProduct">
                  <img src={cartItem.image} alt={cartItem.name} />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.description}</p>
                    <button onClick={() => handleRemoveFromCart(cartItem)}>
                      <BsFillTrashFill />
                    </button>
                  </div>
                </div>
                <div className="cartPrice">${cartItem.price}</div>
                <div className="cartQuantity">
                  <button onClick={() => handleDecreaseCart(cartItem)}>
                    <AiOutlineMinus />
                  </button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button onClick={() => handleIncreaseCart(cartItem)}>
                    <AiOutlinePlus />
                  </button>
                </div>
                <div className="cartTotalPrice">
                  ${cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="cartSummary">
            <button className="clearCart" onClick={() => handleClearCart()}>
              Vaciar el carrito
            </button>
            <div className="cartCheckout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <p>Impuestos y costo de envio se agregaran en el checkout</p>
              {auth._id ? (
                <PayButton cartItems={cart.cartItems} />
              ) : (
                <button
                  className="primary cartLogin"
                  onClick={() => navigate("/login")}
                >
                  Inicia Sesion primero
                </button>
              )}
              <button className="secondary">
                <Link to={"/"}>Ver mas productos</Link>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
