import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Login.css";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [login, setLogin] = useState("false");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:5000/login", {
        email: loginEmail,
        password: loginPassword,
      })
      .then((response) => {
        if (response.data.message == "User authenticated successfully") {
          setLogin("true");
          window.open("/home", "_top", "rel=noopener noreferrer");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Sorry, credentials does not match :(");
        setLogin("false");
      });
  };
  return (
    <div className="main-container">
      <div className="form-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            style={{ boxSizing: "border-box", marginTop: "1rem" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            style={{ marginTop: "1rem", boxSizing: "border-box" }}
          />
          <div className="action-button-container">
            <button
              style={{
                width: "100px",
                background: "blue",
                borderRadius: "0.5rem",
              }}
              onClick={handleLogin}
            >
              Login
            </button>

            <Link
              to="/Register"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginLeft: "2rem",
              }}
            >
              <h4>Register</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
