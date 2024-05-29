import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";

function Register() {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    axios
      .post("http://localhost:5000/register", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message == "User registered successfully") {
          alert("Registered successfully!! Redirecting to login page...");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form-container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Name"
          value={registerName}
          onChange={(e) => setRegisterName(e.target.value)}
          style={{ boxSizing: "border-box", marginTop: "1rem" }}
        />
        <input
          type="text"
          placeholder="Email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          style={{ boxSizing: "border-box", marginTop: "1rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          style={{ boxSizing: "border-box", marginTop: "1rem" }}
        />
        <div className="action-button-container">
          <button
            onClick={handleRegister}
            style={{
              width: "100px",
              background: "blue",
              borderRadius: "0.5rem",
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
