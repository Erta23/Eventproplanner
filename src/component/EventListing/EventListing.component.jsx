import React from 'react';
import './EventListing.styles.scss';
import { Link } from 'react-router-dom';

const EventListing = () => {
  const EventListing = () => {
   
    const events = [
      { id: 1, name: 'Event 1' },
      { id: 2, name: 'Event 2' },
    
    ];
  
    return (
      <div>
        <h1>Event Listing</h1>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <Link to={`/eventDetails/${event.id}`}>{event.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };
};
  export default EventListing;