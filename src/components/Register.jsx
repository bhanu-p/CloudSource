import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    success: "",
  });
  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const lengthCheck = password.length >= 8;
    const uppercaseCheck = /[A-Z]/.test(password);
    const lowercaseCheck = /[a-z]/.test(password);
    const numberCheck = /\d/.test(password);
    return lengthCheck && uppercaseCheck && lowercaseCheck && numberCheck;
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
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, and a number."
      );
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
    setSuccess("Register Successful!");
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        name="username"
        placeholder="Username (at least 6 characters)"
        value={formData.username}
        onChange={handleChange}
      /><br />
      <input
        name="phone"
        placeholder="Phone Number (10 digits)"
        value={formData.phone}
        onChange={handleChange}
      /><br />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      /><br />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      /><br />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
      /><br />
      
      <button type="submit">Register</button><br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button type="button" onClick={() => navigate("/")}>
          Login
        </button>
    </form>
  );
};

export default Register;
