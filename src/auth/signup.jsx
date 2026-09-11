import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./signup.css";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    age: "",
    email: "",
    password: "",
    role: "student",
    usn: "",
    batch: "",
    designation: "",
    bio: "",
    phone: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/user/signup",
        formData
      );

      if (response.data.status) {
        setMessage("Account created successfully");

        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      }

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Signup failed"
      );
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Create your LMS account to start learning.</p>
        </div>

        <form onSubmit={handleSignUp}>

          <div className="signup-two-columns">

            <div className="signup-input-group">
              <label>First Name</label>

              <input
                type="text"
                name="fname"
                placeholder="First name"
                value={formData.fname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-input-group">
              <label>Last Name</label>

              <input
                type="text"
                name="lname"
                placeholder="Last name"
                value={formData.lname}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="signup-input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-input-group">
            <label>Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              
            </select>
          </div>

          <div className="signup-two-columns">

            <div className="signup-input-group">
              <label>Age</label>

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="signup-input-group">
              <label>Phone</label>

              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="signup-input-group">
            <label>USN</label>

            <input
              type="text"
              name="usn"
              placeholder="University seat number"
              value={formData.usn}
              onChange={handleChange}
            />
          </div>

          <div className="signup-input-group">
            <label>Batch</label>

            <input
              type="text"
              name="batch"
              placeholder="2023"
              value={formData.batch}
              onChange={handleChange}
            />
          </div>

          <div className="signup-input-group">
            <label>Designation</label>

            <input
              type="text"
              name="designation"
              placeholder="CSE Student"
              value={formData.designation}
              onChange={handleChange}
            />
          </div>

          <div className="signup-input-group">
            <label>Bio</label>

            <textarea
              name="bio"
              placeholder="Tell us about yourself"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="signup-button"
          >
            Create Account
          </button>

        </form>

        {message && (
          <p className="signup-message">
            {message}
          </p>
        )}

        <p className="signup-switch">
          Already have an account?
          <Link to="/signin"> Sign In</Link>
        </p>

      </div>

    </div>
  );
}

export default SignUp;