import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/authSlice";
import { StyledForm } from "./StyledForm";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/cart");
    }
  }, [auth._id, navigate]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmmit}>
        <h2>Registro</h2>
        <input
          type="text"
          placeholder="Nombre"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="contraseña"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button>
          {auth.registerStatus === 'pending' ? 'Submitting' : 'Registrarse'}
        </button>
        {
          auth.registerStatus === 'rejected' ? (
            <p>{auth.registerError}</p>
          ) : null
        }
      </StyledForm>
    </>
  );
};

export default RegisterForm;
