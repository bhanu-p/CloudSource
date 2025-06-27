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
  useEffect(() => {
    // Sample questions to push into session storage for testing
    const sampleQuestions = [
       { id: 1, title: "What is Redux?", received: false, answered: false },
      { id: 2, title: "Explain controlled components in React.", received: false, answered: false },
      { id: 3, title: "What is the virtual DOM?", received: false, answered: false },
      { id: 4, title: "What is the purpose of useEffect?",received: false,answered: false},
      { id: 5, title: "How do you handle forms in React?", received: false, answered: false },
      { id: 6, title: "What is the difference between state and props?", received: false, answered: false },
      { id: 7, title: "Explain the concept of lifting state up.", received: false, answered: false },
      { id: 8, title: "What are React hooks?", received: false, answered: false },
      { id: 9, title: "How do you optimize performance in React applications?", received: false, answered: false },
      { id: 10, title: "What is the purpose of keys in React lists?", received: false, answered: false }
    ];

    // Only set if not already present
    if (!localStorage.getItem("questions")) {
      localStorage.setItem("questions", JSON.stringify(sampleQuestions));
    }
  }, []);

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