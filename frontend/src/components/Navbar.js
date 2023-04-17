import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { FaBars, FaUser } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import "../styles/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logoutUser } from "../features/authSlice";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const dispatch = useDispatch();
  const logoUrl =
    "https://cdn4.buysellads.net/uu/1/122891/1664503882-Microsoft-logo_rgb_c-wht-250x100.png";
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const navref = useRef();
  const showNav = () => {
    navref.current.classList.toggle("responsive");
  };
  const navigateFunction = useNavigate();
  const navigate = () => {
    navigateFunction("/");
  };

  return (
    <header>
      <button className="logo" onClick={navigate}>
        <img src={logoUrl} alt="Sunra Shop" />
      </button>
      <nav className="navbar" ref={navref}>
        <div className="menu">
          <ul className="navbarList">
            <li onClick={showNav}>
              <Link to={"/"} className="links">
                Inicio
              </Link>
            </li>
            <li onClick={showNav}>
              <Link to={"/about"} className="links">
                Nosotros
              </Link>
            </li>
            <li onClick={showNav}>
              <Link to={"/store"} className="links">
                Tienda
              </Link>
            </li>
            <li onClick={showNav}>
              <Link to={"/contact"} className="links">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <div className="icons" onClick={showNav}>
          <Link to={"/cart"} className="links">
            <BsFillCartFill />
            <span>{cartTotalQuantity}</span>
          </Link>
          {auth._id ? (
            <Links>
              {auth.isAdmin ? (
                <div>
                  <Link to="/admin/summary">admin</Link>
                </div>
              ) : null}
              <div
                onClick={() => {
                  dispatch(logoutUser(null));
                  toast.warning("Cerraste la seion!");
                }}
              >
                <RiLogoutCircleRFill onClick={showNav} />
              </div>
            </Links>
          ) : (
            <AuthLink>
              <Link to={"/login"} className="links">
                <FaUser />
              </Link>
            </AuthLink>
          )}
        </div>
        <button onClick={showNav} className="closeIcon">
          <AiOutlineClose />
        </button>
      </nav>
      <button className="openIcon" onClick={showNav}>
        <FaBars />
      </button>
    </header>
  );
};

export default Navbar;

const AuthLink = styled.div`
  font-size: 1.5rem;
  color: white;
  padding-right: 12px;
`;
const Links = styled.div`
  color: white;
  display: flex;

  div {
    cursor: pointer;

    &:last-child {
      margin-left: 2rem;
    }
  }
`;
