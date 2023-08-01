import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventEdit = ({ eventId }) => {
  const [event, setEvent] = useState({});
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    date: '',
    location: '',
  });

  useEffect(() => {
    // Fetch event details from the backend using eventId
    axios.get(`/api/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
        setFormData({
          eventName: response.data.eventName,
          description: response.data.description,
          date: response.data.date,
          location: response.data.location,
        });
      })
      .catch((error) => {
        // Handle error
      });
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.put(`/api/events/${eventId}`, formData)
      .then((response) => {
        
      })
      .catch((error) => {
        
      });
  };

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} />
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EventEdit;
