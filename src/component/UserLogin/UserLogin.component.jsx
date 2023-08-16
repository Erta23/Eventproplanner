import React, { useState, useCallback } from "react";
import axios from "axios";
import "./UserLogin.styles.scss";

const LoginForm = () => {
  const [user, setUser] = useState({});

  const onValueChanged = useCallback((field, e) => {
    setUser(prevUser => ({ ...prevUser, [field]: e.target.value }));
  }, []);

  const onLogin = useCallback(() => {
    axios.post("/login", user).then((response) => {
      const token = response.data.token;
      localStorage.setItem("token", token);

      window.location = "/";
    });
  }, [user]);

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input type="text" onChange={(e) => onValueChanged("email", e)} />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={(e) => onValueChanged("password", e)}
          />
        </label>
        <button onClick={onLogin} type="button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
