import React, { useState } from "react";
import "./UserRegistration.styles.scss";
import axios from "axios";

const AdminRegistration = () => {
  const [user, setUser] = useState({});

  const onValueChanged = (field, e) => {
    user[field] = e.target.value;
    setUser(user);
  };

  const onRoleChanged = (e) => {
    user.role = e.target.checked ? "Admin" : "User";
    setUser(user);
  };

  const onUserCreated = () => {
    axios.post("http://localhost:3001/admin", user);
  };

  return (
    <div className="user-registration">
      <h2>User Registration</h2>
      <form>
        <label>
          First Name:
          <input type="text" onChange={(e) => onValueChanged("firstname", e)} />
        </label>
        <label>
          Last Name:
          <input type="text" onChange={(e) => onValueChanged("lastname", e)} />
        </label>
        <label>
          Email:
          <input type="email" onChange={(e) => onValueChanged("email", e)} />
        </label>
        <label>
          Phone:
          <input type="phone" onChange={(e) => onValueChanged("phone", e)} />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={(e) => onValueChanged("password", e)}
          />
        </label>
        <label>
          Admin:
          <input type="checkbox" onChange={onRoleChanged} />
        </label>
        <button onClick={onUserCreated} type="button">
          Create User
        </button>
      </form>
    </div>
  );
};

export default AdminRegistration;