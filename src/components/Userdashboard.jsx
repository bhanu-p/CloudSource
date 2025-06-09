import React from "react";
import { useNavigate } from "react-router-dom";

const Userdashboard = () => {
  const navigate = useNavigate();
  const mobile = localStorage.getItem("currentUserMobile");

  const handleLogout = () => {
    localStorage.removeItem("currentUserMobile");
    navigate("/");
  };

  return (
    <div className="page-container">
      <h1>User Dashboard</h1>
      <p>Welcome, user with mobile number: {mobile}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Userdashboard;
