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
import BackgroundImage from './img/backgrndimg.png';
const App = () => {
  return (
        



        <Routes>
          <Route path='/' element={<Navigation />}>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/eventCreation/*" element={<EventCreation />} />
          <Route path="/eventListing" element={<EventListing />} />
          <Route path="/userRegistration" element={<UserRegistration />} />
          <Route path="/attendeeList" element={<AttendeeList />} />
          <Route path="/eventDetails" element={<EventDetails />} />
          <Route path="/sign-in" element={<UserLogin />} />
          <Route path="/sign-up" element={<UserRegistration />} />
        </Route>
    </Routes>
  
  );
};

export default App;