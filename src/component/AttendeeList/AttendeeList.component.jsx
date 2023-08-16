import React from 'react';
import './AttendeeList.styles.scss';

const AttendeeList = ({ eventId }) => {
  const attendees = [
    { _id: 1, name: 'John Doe', email: 'john@example.com' },
    { _id: 2, name: 'Jane Smith', email: 'jane@example.com' },
   
  ];

  return (
    <div className="attendee-list">
      <h2>Attendee List</h2>
      <ul>
        {attendees.map((attendee) => (
          <li key={attendee._id}>
            <p>Name: {attendee.name}</p>
            <p>Email: {attendee.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendeeList;