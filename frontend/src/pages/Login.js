import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import styled from "styled-components";

const Login = () => {
  return (
    <div>
      <LoginForm />
      <RegisterLink>
        <p>
          ¿No tenes cuenta?{" "}
          <Link to={"/register"} cl>
            Registrate Aca
          </Link>
        </p>
      </RegisterLink>
    </div>
  );
};

const RegisterLink = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -1rem;

  p {
    font-size: 1.2rem;
    font-weight: 500;
    border-bottom: 2px solid black;
    padding-bottom: 2px;
  }
  a {
    font-size: 1.2rem;
    font-weight: 400;
    color: rgb(46, 5, 207);
  }
`;

export default Login;
