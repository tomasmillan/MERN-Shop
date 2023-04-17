import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router";
import "../styles/storeproducts.css";
import NotFound from "../pages/NotFound";
import LoadingSpinner from "./LoadingSpinner";

const StoreItems = () => {
  const { items: data, status } = useSelector((state) => state.products);  const dispatch = useDispatch();
  const history = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    history("/cart");
  };
  console.log(data)

  return (
    <div className="homeContainer">
      {status === "success" ? (
        <>
          <h2>Productos</h2>
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product._id} className="product">
                  <h3 className="pTitle">{product.name}</h3>
                  <img
                    className="pImg"
                    src={product.image?.url}
                    alt={product.name}
                  />
                  <div className="details">
                    <span className="pDesc">{product.description}</span>
                    <span className="pPrice">${product.price}</span>
                  </div>
                  <button
                    className="pBtn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <LoadingSpinner />
      ) : (
        <>
        <h1>hola</h1>
        <NotFound />
        </>
      )}
    </div>
  );
};

export default StoreItems;
