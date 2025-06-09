import React from "react";
import { useNavigate } from "react-router-dom";

const Admindashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUserMobile");
    navigate("/");
  };

  return (
    <div className="page-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! You have full access.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Admindashboard;
