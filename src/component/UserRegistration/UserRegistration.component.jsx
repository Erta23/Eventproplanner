import React from 'react';
import './UserRegistration.styles.scss';

const UserRegistration = () => {
  return (
    <div className="user-registration">
      <h2>User Registration</h2>
      <form>
        <label>
          Name:
          <input type="text" />
        </label>
        <label>
          Email:
          <input type="email" />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegistration;
