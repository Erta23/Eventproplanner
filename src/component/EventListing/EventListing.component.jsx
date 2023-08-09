import React, { useEffect, useState } from "react";
import "./EventListing.styles.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const EventListing = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/events").then((response) => {
      setEvents(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Event Listing</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link to={`/eventDetails/${event._id}`}>{event.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default EventListing;
