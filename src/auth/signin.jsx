import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserSignIn } from "../services/api.js";
import "./signin.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await UserSignIn(email, password);

      const data = response.data;

      console.log("Data = ", data);
      

      if (data.status) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage("SignIn Successful");

        if (data.user.role === "admin") {
          navigate("/AdminDashboard");
        } else if (data.user.role === "instructor") {
          navigate("/InstructorDashboard");
        } else {
          navigate("/StudentDashboard");
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Signin Failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome back!</h1>
          <p>Sign in to continue learning.....</p>
        </div>

        <form onSubmit={handleSignIn}>
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            SignIn
          </button>

          {message && <p className="message">{message}</p>}

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
