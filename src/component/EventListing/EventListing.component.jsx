import React, { useEffect, useState, useCallback } from "react";
import "./EventListing.styles.scss";
import { Link } from "react-router-dom";
import SearchField from "react-search-field";
import axios from "axios";

const EventListing = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getEvents = () => {
    axios.get("/events").then((response) => {
      setEvents(response.data);
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleSearch = useCallback((value) => {
    setSearchTerm(value.toLowerCase());
  }, []);

  return (
    <div className="event-listing">
       <Link to="/" className="home-link top-right">
        Home
      </Link>
      <h1>Event Listing</h1>
      <div className="search-box">
        <SearchField
          placeholder="Search events"
          onChange={handleSearch}
          searchText={searchTerm}
        />
      </div>
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
