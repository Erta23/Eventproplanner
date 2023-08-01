import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.styles.scss';


import { ReactComponent as EVENTLogo } from '../../assets/EventLogo.svg';


const Navigation = () => {
  return (
    <nav className="navigation">
      <Link className="logo-container" to='/'>
        <EVENTLogo className='logo' />
      </Link>
      
      <ul className="nav-links">
        <li>
          <Link to="/events">HomePage</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;