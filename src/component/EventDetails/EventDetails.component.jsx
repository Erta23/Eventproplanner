import React from 'react';
import './EventDetails.styles.scss';

const EventDetails = ({ eventId }) => {
  const eventDetails = {
    eventName: 'Sample Event',
    description: 'This is a sample event description.',
    date: '2023-08-10',
    location: 'Sample Location',
    organizer: 'Sample Organizer',
  };

  return (
    <div>
      <h1>{eventDetails.eventName}</h1>
      <p>{eventDetails.description}</p>
      <p>Date: {eventDetails.date}</p>
      <p>Location: {eventDetails.location}</p>
      <p>Organizer: {eventDetails.organizer}</p>
    </div>
  );
};

export default EventDetails;