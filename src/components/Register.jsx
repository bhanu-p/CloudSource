import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./Register.css"; // Separate CSS for Register

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.phone || !formData.email || !formData.password) {
      setSuccess("");
      setError("Please fill in all fields.");
      return;
    }

    if (formData.username.length < 6) {
      setSuccess("");
      setError("Username must be at least 6 characters.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setSuccess("");
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setSuccess("");
      setError("Invalid email format.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setSuccess("");
      setError("Passwords do not match.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setSuccess("");
      setError("Password must be at least 8 characters, include uppercase, lowercase, and a number.");
      return;
    }

    const usersString = localStorage.getItem("appUsers");
    const users = usersString ? JSON.parse(usersString) : [];

    if (users.some((user) => user.phone === formData.phone)) {
      setError("Phone Number already exists!");
      return;
    }

    if (users.some((user) => user.email === formData.email)) {
      setError("Email already registered!");
      return;
    }

    const newUser = {
      username: formData.username,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
    };

    users.push(newUser);
    localStorage.setItem("appUsers", JSON.stringify(users));
    setError("");
    setSuccess("Registration Successful!");
  };

  return (
    <div className="register-login-container">
      <form className="register-login-form" onSubmit={handleRegister}>
        <h2 className="register-login-title">Create Account</h2>

        <label className="register-login-label">Username</label>
        <input
          className="register-login-input"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />

        <label className="register-login-label">Phone</label>
        <input
          className="register-login-input"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
        />

        <label className="register-login-label">Email</label>
        <input
          className="register-login-input"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />

        <label className="register-login-label">Password</label>
        <input
          className="register-login-input"
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />

        <label className="register-login-label">Confirm Password</label>
        <input
          className="register-login-input"
          type="password"
          name="confirmPassword"
          placeholder="Re-enter password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <button className="register-login-button" type="submit">
          Register
        </button>

        <div className="register-login-redirect">
          <p>
            Already have an account?{" "}
            <button type="button" onClick={() => navigate("/")}>
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
