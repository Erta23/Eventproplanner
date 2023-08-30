import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "./Navigation.styles.scss";
import jwt_decode from "jwt-decode";
import { ReactComponent as EVENTLogo } from "../../assets/EventLogo.svg";

const Navigation = () => {
  const user = useMemo(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return {};
    }
    const tokenUser = jwt_decode(token);
    return tokenUser;
  }, []);

  const isAdmin = user.role === "Admin";

  return (
    <nav className="navigation">
      <Link className="logo-container" to="/">
        <EVENTLogo className="logo" />
      </Link>
      <div class="search">
        <input type="text" class="search__input" placeholder="Type your text" />
      </div>
      <ul className="nav-links">
        {!user._id && 
        <li>
          <Link to="/register">Register</Link>
        </li>}
        {isAdmin && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
