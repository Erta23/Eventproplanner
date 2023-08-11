import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './AdminDashboard.styles.scss';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    axios.get("http://localhost:3001/events").then((response) => {
      setEvents(response.data);
    });
  };
  
  const onEventDeleted = (id) => {
    axios.delete("http://localhost:3001/events/" + id).then(() => {
      getEvents();

    });
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="admin-dashboard">
         <Link to="/" className="home-link top-right">
        Home
      </Link>
      <h1>Admin Dashboard</h1>
      <div className="event-list">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <div className="event-info">
              <h3>{event.name}</h3>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p>Organizer: {event.organizer}</p>
              <p>Rating: {event.rating}</p>
            </div>
            <div className="event-actions">
            <button onClick={() => onEventDeleted(event._id)}
              className="delete-btn" type="button"
            >
              Delete
            </button>
            </div>
            <Link to={`/eventEditing/${event._id}`} className="edit-link">
                Edit
              </Link>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
