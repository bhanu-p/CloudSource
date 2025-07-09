import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Onboard from "./components/Onboard";
import Admindashboard from "./components/Admindashboard";
import Userdashboard from "./components/Userdashboard";
import ResetPassword from "./components/ResetPassword";
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/dashboard" element={<Userdashboard />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;