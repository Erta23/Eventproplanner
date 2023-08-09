import React, { useEffect, useState } from 'react';
import './EventDetails.styles.scss';
import axios from 'axios';
import { useMatch, useParams } from 'react-router-dom';

const EventDetails = () => {
  
  const [eventDetails, setEventDetails] = useState({});
  const { eventId } = useParams();
  console.log(eventId); 

  useEffect(() => {
    axios.get(`http://localhost:3001/events/${eventId}`)
      .then(response => {
        setEventDetails(response.data);
      });
  }, []);


  return (
    <div>
      <h1>{eventDetails.name}</h1>
      <p>{eventDetails.description}</p>
      <p>Date: {eventDetails.date}</p>
      <p>Location: {eventDetails.location}</p>
      <p>Organizer: {eventDetails.organizer}</p>
      <p>Rating: {eventDetails.rating}</p>
    </div>
  );
};

export default EventDetails;