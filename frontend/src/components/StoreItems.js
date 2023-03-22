import React from "react";
import { useGetAllProductsQuery } from "../features/productsApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router";
import '../styles/storeproducts.css'
import NotFound from "../pages/NotFound";
import LoadingSpinner from "./LoadingSpinner";

const StoreItems = () => {
    const { data, error, isLoading } = useGetAllProductsQuery();
    const auth = useSelector((state) => state.auth);

    console.log(auth)
    const dispatch = useDispatch();
    const history = useNavigate();
    const handleAddToCart = (product) => {
      dispatch(addToCart(product));
      history('/cart')
    };
    return (
      <div className="homeContainer">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <NotFound />
        ) : (
          <>
            <div className="products">
              {data.map((product) => (
                <div key={product.id} className="product">
                  <h3 className="pTitle">{product.name}</h3>
                  <img className='pImg' src={product.image} alt={product.name} />
                  <div className="details">
                    <span className="pDesc">{product.description}</span>
                    <span className="pPrice">${product.price}</span>
                  </div>
                  <button className="pBtn" onClick={() => handleAddToCart(product)}>
                    Agregar al Carrito
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default StoreItems;