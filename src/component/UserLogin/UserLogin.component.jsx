import React, { useState } from 'react';
import './UserLogin.styles.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
 
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      <div class="form-container">
	<p class="title">Login</p>
	<form class="form"></form>
		<div class="input-group">
			<label for="username">Username</label>
			input type="text" name="username" id="username" placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            </div>
        </div>
        <div class="input-group">
			<label for="password">Password</label>
			input type="password" name="password" id="password" placeholder=""
			<div class="forgot">
				<a rel="noopener noreferrer" href="#">Forgot Password ?</a>
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        </div>
        </div>
        <button type="submit">Login</button>
        <p class="signup">Don't have an account?
		<a rel="noopener noreferrer" href="#" class="">Sign up</a>
	</p>

      </form>
    </div>
  );
};

export default LoginForm;