import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.styles.scss";
import Navigation from "../Navigation/Navigation.component";
import HomePage from "../Homepage/Homepage.component";
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

  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const tokenUser = jwt_decode(token);
    setUser(tokenUser);
  });

  const logout = () => {
    localStorage.removeItem("token");
    setUser({});
  };

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
        <div>
          <Link to="/sign-in">
            <button className="custom-btn btn-1">Sign-In</button>
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
          <Link to="/register">
            <button className="custom-btn btn-1">
              Register as an Attendee
            </button>
          </Link>
          <Link to="/admin-register">
            <button className="custom-btn btn-1">
              Register as an Admin
            </button>
          </Link>
          {user.role === "Admin" && (
            <Link to="/eventCreation">
              <button className="custom-btn btn-1">Organize an Event</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
