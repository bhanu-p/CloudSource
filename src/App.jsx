// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Onboard from "./components/Onboard";
// import Admindashboard from "./components/Admindashboard";
// import Userdashboard from "./components/Userdashboard";
// import './App.css';


// function App() {
// //push in session storage



//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/onboard" element={<Onboard />} />
//         <Route path="/admindashboard" element={<Admindashboard />} />
//         <Route path="/dashboard" element={<Userdashboard />} />
//         <Route path="*" element={<div>Page Not Found</div>} />
//       </Routes>
//     </Router>
//   )
// }

// export default App




import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Onboard from "./components/Onboard";
import Admindashboard from "./components/Admindashboard";
import Userdashboard from "./components/Userdashboard";
import './App.css';

function App() {
  // useEffect(() => {
  //   // Sample questions to push into session storage for testing
  //   const sampleQuestions = [
  //      { id: 1, title: "What is Redux?", received: false, answered: false },
  //     { id: 2, title: "Explain controlled components in React.", received: false, answered: false },
  //     { id: 3, title: "What is the virtual DOM?", received: false, answered: false }
  //   ];

  //   // Only set if not already present
  //   if (!localStorage.getItem("questions")) {
  //     localStorage.setItem("questions", JSON.stringify(sampleQuestions));
  //   }
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/dashboard" element={<Userdashboard />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;