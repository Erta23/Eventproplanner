import React, { useState, useCallback } from "react";
import "./UserRegistration.styles.scss";
import axios from "axios";

const UserRegistration = () => {
  const [user, setUser] = useState({});

  const onValueChanged = useCallback((field, e) => {
    setUser(prevUser => ({ ...prevUser, [field]: e.target.value }));
  }, []);

  const onRoleChanged = useCallback((e) => {
    setUser(prevUser => ({
      ...prevUser,
      role: e.target.checked ? "Admin" : "User"
    }));
  }, []);

  const onUserCreated = useCallback(() => {
    axios.post("/admin", user).then(() => {
      window.location.href = "/home";
    });
  }, [user]);
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
          <input type="email" onChange={(e) => onValueChanged("email", e)}
            value={user.email} placeholder="name@email.com" title="Inpit title" name="input-name" class="input_field" id="email_field"/>
        </label>
        <label>
          Phone:
          <input type="phone" onChange={(e) => onValueChanged("phone", e)}value={user.phone} maxLength="12"placeholder="+1 213 373 4253" />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={(e) => onValueChanged("password", e)}/>
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

export default UserRegistration;