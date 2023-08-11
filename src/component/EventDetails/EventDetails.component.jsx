import React, { useEffect, useState } from 'react';
import './EventDetails.styles.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState({});
  const { eventId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/events/${eventId}`)
      .then(response => {
        setEventDetails(response.data);
      });
  }, []);

  return (
    <div className="center-content">
      <div className="event-details-container">
        <h1 className="event-details-header">{eventDetails.name}</h1>
        <p className="event-details-description">{eventDetails.description}</p>
        <p className="event-details-item">
          <span className="event-details-label">Date:</span> {eventDetails.date}
        </p>
        <p className="event-details-item">
          <span className="event-details-label">Location:</span> {eventDetails.location}
        </p>
        <p className="event-details-item">
          <span className="event-details-label">Organizer:</span> {eventDetails.organizer}
        </p>
        <p className="event-details-item">
          <span className="event-details-label">Rating:</span> {eventDetails.rating}
        </p>
      </div>
    </div>
  );
};

export default EventDetails;
