import React, { useEffect, useState } from "react";
import "./EventListing.styles.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const EventListing = () => {
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
    <div className="event-listing">
      <Link to="/" className="home-link top-left">
        Go to Home
      </Link>
      <h1>Event Listing</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="event-card">
            <Link to={`/eventDetails/${event._id}`} className="event-card-link">
              {event.name}
            </Link>
            <button
              onClick={() => onEventDeleted(event._id)}
              className="delete-btn"
              type="button"
            >
              Delete
            </button>
            <Link to={`/eventEditing/${event._id}`} className="edit-link">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListing;
