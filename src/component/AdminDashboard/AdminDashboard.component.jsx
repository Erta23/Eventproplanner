import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.styles.scss";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    axios.get("/events").then((response) => {
      setEvents(response.data);
    });
  };

  const onEventDeleted = useCallback(
    (id) => {
      axios.delete("/events/" + id).then(() => {
        getEvents();
      });
    },
    [getEvents]
  );

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
              <button
                onClick={() => onEventDeleted(event._id)}
                className="delete-btn"
                type="button"
              >
                Delete
              </button>
            </div>
            <Link to={`/eventEditing/${event._id}`}>
              <button
                style={{ borderRadius: "4px" }}
                className="edit-link"
                type="button"
              >
                Edit
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
