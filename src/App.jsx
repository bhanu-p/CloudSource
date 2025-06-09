import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Onboard from "./components/Onboard";
import Admindashboard from "./components/Admindashboard";
import Userdashboard from "./components/Userdashboard";
import './App.css';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/dashboard" element={<Userdashboard />} />
      </Routes>
    </Router>
  )
}

export default App
