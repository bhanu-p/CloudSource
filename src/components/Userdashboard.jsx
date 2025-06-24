// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./header";

// const Userdashboard = () => {
//   const navigate = useNavigate();
//   const mobile = localStorage.getItem("currentUserMobile");

//   const username = localStorage.getItem("currentUsername") || "User";

//   const handleLogout = () => {
//     localStorage.removeItem("currentUserMobile");
//     navigate("/");
//   };

//   return (
    
//     <div className="page-container">
//       <Header
//         title={`${username}'s Dashboard`}
//         username={username}
//         showProfile={showProfile}
//         setShowProfile={setShowProfile}
//         handleLogout={handleLogout}
//       />
//       <h1>User Dashboard</h1>
//       <p>Welcome, user with mobile number: {mobile}</p>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Userdashboard;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

const Userdashboard = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false); 
  const mobile = localStorage.getItem("currentUserMobile");
  const username = localStorage.getItem("currentUsername") || "User";

  const handleLogout = () => {
    localStorage.removeItem("currentUserMobile");
    navigate("/");
  };

  return (
    <div className="page-container">
      <Header
        title={`Dashboard`}
        username={username}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        handleLogout={handleLogout}
      />
      <h1>User Dashboard</h1>
      <p>Welcome, user with mobile number: {mobile}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Userdashboard;