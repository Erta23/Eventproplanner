import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './component/Navigation/Navigation.component';
import Home from './component/Home/Home.component';
import HomePage from './component/Homepage/Homepage.component';
import EventCreation from './component/EventCreation/EventCreation.component';
import EventListing from './component/EventListing/EventListing.component';
import UserRegistration from './component/UserRegistration/UserRegistration.component';
import AttendeeList from './component/AttendeeList/AttendeeList.component';
import EventDetails from './component/EventDetails/EventDetails.component';
import UserLogin from './component/UserLogin/UserLogin.component';
import EventLogo from './assets/EventLogo.svg';
import '@coreui/coreui/dist/css/coreui.min.css'





const App = () => {
  return (
      

        <Routes>
        
          <Route path="/eventCreation/*" element={<EventCreation />} />
          <Route path="/events" element={<EventListing />} /> 
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/attendeeList" element={<AttendeeList />} />
          <Route path="/eventDetails/:eventId" element={<EventDetails />} />
          <Route path="/sign-in" element={<UserLogin />} />

          {/* <Route path='/' element={<Navigation />}> */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<HomePage />} /> */}
         
    </Routes>
  
  );
};

export default App;