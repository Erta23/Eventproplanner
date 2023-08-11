import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './EventEditing.styles.scss';

const EventEditing = () => {
    const { eventId } = useParams();

    const [event, setEvent] = useState({ });
    const onValueChanged = (field, e) => {
        event[field] = e.target.value;
        setEvent({...event});
    };
    useEffect(() => {
        axios.get(`http://localhost:3001/events/${eventId}`)
          .then(response => {
            setEvent(response.data);
          });
      }, []);
      const onEventEdited = () => {
        axios.put(`http://localhost:3001/events/${eventId}`, event).then(response => {
          window.location = "/events";
        })
      };
      return (
        <div className="event-edit">
          <h1>Edit Event</h1>
          <div className="edit-form">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={event.name}
              onChange={e => onValueChanged("name", e)}
            />
    
            <label>Description:</label>
            <textarea
              name="description"
              value={event.description}
              onChange={e => onValueChanged("description", e)}
            />
    
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={event.location}
              onChange={e => onValueChanged("location", e)}
            />
    
            <label>Organizer:</label>
            <input
              type="text"
              name="organizer"
              value={event.organizer}
              onChange={e => onValueChanged("organizer", e)}
            />
    
            <label>Rating:</label>
            <input
              type="number"
              name="rating"
              value={event.rating}
              onChange={e => onValueChanged("rating", e)}
              min="1"
              max="5"
            />
    
            <button onClick={onEventEdited}>Save</button>
          </div>
        </div>
      );
    };













export default EventEditing;