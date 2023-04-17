import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="adminHeaders">
        <h1>Productos</h1>
        <button
          className="primaryBtn"
          onClick={() => navigate("/admin/products/create-product")}
        >
          Create
        </button>
      </div>
      <Outlet />
    </>
  );
};

export default Products;
