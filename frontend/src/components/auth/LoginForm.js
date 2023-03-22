import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/authSlice";
import { StyledForm } from "./StyledForm";

const LoginForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/cart");
    }
  }, [auth._id, navigate]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmmit}>
        <h2>Iniciar Sesion</h2>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button>
          {auth.loginStatus === 'pending' ? 'Submitting' : 'Iniciar Sesion'}
        </button>
        {
          auth.loginStatus === 'rejected' ? (
            <p>{auth.loginError}</p>
          ) : null
        }
      </StyledForm>
    </>
  );
};

export default LoginForm;
