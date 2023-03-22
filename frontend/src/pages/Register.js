import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import styled from "styled-components";

const Register = () => {
  return (
    <div>
      <RegisterForm />
      <LoginLink>
        <p>
          ¿Ya tenes cuenta? <Link to={"/login"}>Inicia Sesion</Link>
        </p>
      </LoginLink>
    </div>
  );
};

const LoginLink = styled.div`
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

export default Register;
