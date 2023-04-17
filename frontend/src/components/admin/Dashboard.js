import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/dashboard.css";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isAdmin) return <p>Acceso Denegado</p>;

  return (
    <div className="container">
      <div className="sideNav">
        <h3>Quick Links</h3>
        <div className="navLink">
          <NavLink
            className={({ isActive }) =>
              isActive ? "linkActive" : "linkInactive"
            }
            to="/admin/summary"
          >
            Summary
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "linkActive" : "linkInactive"
            }
            to="/admin/products"
          >
            Products
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "linkActive" : "linkInactive"
            }
            to="/admin/orders"
          >
            Orders
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "linkActive" : "linkInactive"
            }
            to="/admin/users"
          >
            Users
          </NavLink>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
