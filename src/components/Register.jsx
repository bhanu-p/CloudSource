import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
      toast.error("Please fill in all fields.");
      return;
    }

    if (formData.username.length < 6) {
      toast.error("Username must be at least 6 characters.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Invalid email format.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error("Password must be at least 8 characters, include uppercase, lowercase, and a number.");
      return;
    }

    const usersString = localStorage.getItem("appUsers");
    const users = usersString ? JSON.parse(usersString) : [];

    if (users.some((user) => user.phone === formData.phone)) {
      toast.error("Phone Number already exists!");
      return;
    }

    if (users.some((user) => user.email === formData.email)) {
      toast.error("Email already registered!");
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
    toast.success("Registration Successful!");
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
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
    </div>
  );
};

export default Register;
