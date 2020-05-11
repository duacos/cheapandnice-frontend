import React, { useState } from "react";
import "../assets/styles/login.sass";
import axios from "axios";
import { config } from "../config";

function Login(props) {
  const username = useFormInput("");
  const password = useFormInput("");

  const loginUser = () => {
    axios
      .post(`${config.url}/api/users/login`, {
        username: username.value,
        password: password.value,
      })
      .then((response) => {
        localStorage.setItem("username", response.data.body.username);
        localStorage.setItem("isLoggedIn", true);
      })
      .then(() => {
        props.history.goBack();
      });
  };

  return (
    <div className="account-form">
      <div className="account-form-section">
        <label className="account-form-label">Username</label>
        <br />
        <input className="account-form-field" type="text" {...username} />
      </div>

      <div className="account-form-section">
        <label className="account-form-label">Password</label>
        <br />
        <input className="account-form-field" type="password" {...password} />
      </div>

      <div className="account-form-button">
        <input type="submit" value="Login" onClick={loginUser} />
      </div>
    </div>
  );
}

const useFormInput = (intial) => {
  const [value, setValue] = useState(intial);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
