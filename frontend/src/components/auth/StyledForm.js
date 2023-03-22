import styled from "styled-components";

export const StyledForm = styled.form`
  max-width: 350px;
  width: 100%;
  margin: 2rem auto;

  h2 {
    margin-bottom: 2rem;
  }
  button,
  input {
    height: 35px;
    width: 100%;
    padding: 0.5rem;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgba(220, 220, 220);
    margin-bottom: 1rem;

    &:focus {
      border: 1px solid rgba(0, 208, 250);
    }
  }
  button {
    transition: 0.4s linear;
    cursor: pointer;
    &:focus {
      border: none;
    }
    &:hover {
      transform: scale(0.99);
      background-color: grey;
    }
  }
  p {
    font-size: 14px;
    color: red;
  }
`;
