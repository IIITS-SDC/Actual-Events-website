import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/api/user/login", {
        email,
        password,
      });
      localStorage.setItem("authToken", response.data.user.token); // If the token is sent in the response
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("name", response.data.user.name);
      setLoading(false);

      // Set success message
      setMessageType("success");
      setMessage("Login Successful!");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/protected");
      }, 1000);
    } catch (err) {
      setLoading(false);
      setMessageType("error");
      setMessage(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="login-container">
      {message && (
        <div className={`notification ${messageType}`}>
          {message}
        </div>
      )}
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
