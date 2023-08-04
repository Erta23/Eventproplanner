import React from 'react';
import { Link } from 'react-router-dom';
import './Home.styles.scss';
import Navigation from '../Navigation/Navigation.component'; 
import HomePage from '../Homepage/Homepage.component';
import backgroundImage from '../../img/backgrndimg.png';

const Home = () => {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: '100vh',
  };

  return (
    <div className="home" style={containerStyle}>
      <Navigation/>
      <div className="content">
        <h2>Welcome to the Event Registration Platform</h2>
        <p>
          This platform allows users to create and manage events. Event organizers can view and manage
          their events, including attendee lists and event details. An admin user has the authority to
          manage all events and users.
        </p>
        <div className="cta-buttons">
          <Link to="/events">
            <button className="custom-btn btn-1">Explore Events</button>
          </Link>
          <Link to="/register">
            <button className="custom-btn btn-1">Register as an Attendee</button>
          </Link>
          <Link to="/admin">
            <button className="custom-btn btn-1">Organize an Event</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
