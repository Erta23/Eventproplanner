import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './component/Home/Home.component';
import EventCreation from './component/EventCreation/EventCreation.component';
import EventListing from './component/EventListing/EventListing.component';
import UserRegistration from './component/UserRegistration/UserRegistration.component';
import AttendeeList from './component/AttendeeList/AttendeeList.component';
import EventDetails from './component/EventDetails/EventDetails.component';
const App = () => {
  return (
  
      <Routes>
          <Route index element={<Home />} />
          <Route path='eventCreation/*' element={<EventCreation />} />
          <Route path='eventListing' element={<EventListing />} />
          <Route path='userRegistration' element={<UserRegistration />} />
          <Route path='attendeeList' element={<AttendeeList/>} />
          <Route path='eventDetails' element={<EventDetails/>} />
       
       
      </Routes>
    );
  };
 


export default App;
