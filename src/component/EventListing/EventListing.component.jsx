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

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="event-listing">
      <Link to="/" className="home-link top-right">
        Home
      </Link>
      <h1>Event Listing</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="event-card">
            <Link to={`/eventDetails/${event._id}`} className="event-card-link">
              {event.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListing;
