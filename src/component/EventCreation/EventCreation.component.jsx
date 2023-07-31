import React from 'react';


const EventCreation = () => {
  return (
    <div className="event-creation">
      <h2>Create Event</h2>
      <form>
        <label>
          Event Name:
          <input type="text" />
        </label>
        <label>
          Description:
          <textarea />
        </label>
        <label>
          Date:
          <input type="date" />
        </label>
        <label>
          Location:
          <input type="text" />
        </label>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventCreation;
