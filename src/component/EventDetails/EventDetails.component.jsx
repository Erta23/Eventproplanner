import React from 'react';


const EventDetails = ({ eventId }) => {
  const eventDetails = {
    name: 'Sample Event',
    description: 'This is a sample event description.',
    date: '2023-08-15',
    location: 'Sample Location',
    attendees: [
      { _id: 1, name: 'John Doe', email: 'john@example.com' },
      { _id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  
    ],
  };

  return (
    <div>
      <h2>{eventDetails.name}</h2>
      <p>Description: {eventDetails.description}</p>
      <p>Date: {eventDetails.date}</p>
      <p>Location: {eventDetails.location}</p>
      <h3>Attendees</h3>
      <ul>
        {eventDetails.attendees.map((attendee) => (
          <li key={attendee._id}>
            <p>Name: {attendee.name}</p>
            <p>Email: {attendee.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetails;
