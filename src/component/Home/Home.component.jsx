import React, { useMemo, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.styles.scss";
import Navigation from "../Navigation/Navigation.component";
import backgroundImage from "../../img/backgrndimg.png";
import jwt_decode from "jwt-decode";

const Home = () => {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: "100vh",
  };

  const [userToken, setuserToken] = useState(null);

  useEffect(() => {
    setuserToken(localStorage.getItem("token"));
  }, []);

  const user = useMemo(() => {
    const token = userToken;
    if (!token) {
      return {};
    }
    const tokenUser = jwt_decode(token);
    return tokenUser;
  }, [userToken]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setuserToken(null);
  }, []);

  return (
    <div className="home" style={containerStyle}>
      {user.email && (
        <div>
          <p>Welcome {user.firstname + " " + user.lastname}</p>
          <button type="button" onClick={logout}>
            Log Out
          </button>
        </div>
      )}
      {!user.email && (
        <div className="button-container">
          <Link to="/sign-in" className="signin-button">
            Sign-In
          </Link>
        </div>
      )}

      <Navigation />
      <div className="content">
        <h2>Welcome to the Event Registration Platform</h2>
        <p>
          This platform allows users to create and manage events. Event
          organizers can view and manage their events, including attendee lists
          and event details. An admin user has the authority to manage all
          events and users.
        </p>
        <div className="cta-buttons">
          <Link to="/events">
            <button className="custom-btn btn-1">Explore Events</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
