import React, { useEffect, useState } from "react";
import "./EventDetails.styles.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState({});
  const { eventId } = useParams();
  const [subscribed, setSubscribed] = useState(false);
  const eventSubscribed = () => {
    axios.put(`http://localhost:3001/events/${eventId}/attendees`)
      .then((response) => {
        axios.get(`http://localhost:3001/events/${eventId}`).then((response) => {
          setEventDetails(response.data);
          const token = localStorage.getItem("token");
          const decodedToken = jwt_decode(token);
          const userId = decodedToken._id;
          setSubscribed(
            response.data.attendees.some((attendee) => attendee.id === userId)
          );
        });
        console.log("Response:", response);
       
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  const eventUnsubscribed = () => {
    axios
      .delete(`http://localhost:3001/events/${eventId}/attendees`)
      .then((response) => {
        axios.get(`http://localhost:3001/events/${eventId}`).then((response) => {
          setEventDetails(response.data);
          const token = localStorage.getItem("token");
          const decodedToken = jwt_decode(token);
          const userId = decodedToken._id;
          setSubscribed(
            response.data.attendees.some((attendee) => attendee.id === userId)
          );
        });
        
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/events/${eventId}`).then((response) => {
      setEventDetails(response.data);
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken._id;
      setSubscribed(
        response.data.attendees.some((attendee) => attendee.id === userId)
      );
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
          <span className="event-details-label">Location:</span>{" "}
          {eventDetails.location}
        </p>
        <p className="event-details-item">
          <span className="event-details-label">Organizer:</span>{" "}
          {eventDetails.organizer}
        </p>
        <p className="event-details-item">
          <span className="event-details-label">Rating:</span>{" "}
          {eventDetails.rating}
        </p>
        <p className="event-details-item">
          {subscribed ? (
            <button onClick={eventUnsubscribed}>Unsubscribe</button>
          ) : (
            <button onClick={eventSubscribed}>Subscribe</button>
          )}
        </p>
        <div className="attendees-list">
          <h2>Attendees:</h2>
          <ul>
            {eventDetails.attendees &&
              eventDetails.attendees.map((attendee) => (
                <li key={attendee.id}>{attendee.firstname} {attendee.lastname}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
