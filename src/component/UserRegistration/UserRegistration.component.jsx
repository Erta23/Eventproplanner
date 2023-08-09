import React, {useState } from 'react';
import './UserRegistration.styles.scss';
import axios from 'axios';

const UserRegistration = () => {
  const [user, setUser] = useState({});
  const onValueChanged = (field, e) => {
    user[field] = e.target.value;
    setUser(user);
  }
  

  const onUserCreated = () => {
    axios.post("http://localhost:3001/users",user);
  };
  
  return (
    <div className="user-registration">
      <h2>User Registration</h2>
      <form>
        <label>
          Name:
          <input type="text" onChange={e => onValueChanged("name", e)}/>
        </label>
        <label>
          Email:
          <input type="email" onChange={e => onValueChanged("email", e)} />
        </label>
        <button onClick={onUserCreated} type="button">Create User</button>
      </form>
    </div>
  );
};

export default UserRegistration;
