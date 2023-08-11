import React, { useState } from "react";
import axios from "axios";
import "./EventCreation.styles.scss";

const EventCreation = () => {
  const [event, setEvent] = useState({});

  const onValueChanged = (field, e) => {
    event[field] = e.target.value;
    setEvent({ ...event });
  };

  const onEventCreated = () => {
    axios.post("http://localhost:3001/events", event).then(response => {
      window.location = "/events";
    });
  };

  return (
    <div className="event-creation">
      <h2>Create Event</h2>
      <form>
        <label>
          Event Name:
          <input type="text" onChange={(e) => onValueChanged("name", e)} />
        </label>
        <label>
          Description:
          <textarea onChange={(e) => onValueChanged("description", e)} />
        </label>
        <label>
          Date:
          <input type="date" onChange={(e) => onValueChanged("date", e)} />
        </label>
        <label>
          Location:
          <input type="text" onChange={(e) => onValueChanged("location", e)} />
        </label>
        <label>
          Organizer:
          <input type="text" onChange={(e) => onValueChanged("organizer", e)} />
        </label>
        <label>
          Rating:
          <input type="rating" onChange={(e) => onValueChanged("rating", e)} />
        </label>
        <button onClick={onEventCreated} type="button">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventCreation;
