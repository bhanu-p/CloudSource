// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     if (!mobile || !password) {
//       setError("Please fill in both mobile number and password.");
//       return;
//     }

//     if (mobile === "admin" && password === "admin") {
//       setSuccess("Admin Login Successful!");
//       setTimeout(() => {
//         navigate("/admindashboard");
//       }, 1500);
//       return;
//     }

//     const mobileRegex = /^[0-9]{10}$/;
//     if (!mobileRegex.test(mobile)) {
//       setError("Please enter a valid 10-digit mobile number.");
//       return;
//     }

//     const usersString = localStorage.getItem("appUsers");
//     const appUsers = usersString ? JSON.parse(usersString) : [];

//     const user = appUsers.find(
//       (user) => user.phone === mobile && user.password === password
//     );

//     if (!user) {
//       setError("Incorrect mobile number or password.");
//       return;
//     }

//     setSuccess("Login successful!");

//     // const visitedKey = `visited_${user.phone}`;
//     // const hasVisited = localStorage.getItem(visitedKey) === "true";
//     const visitedKey = `onboardData_${user.phone}`;
//     const hasVisited = localStorage.getItem(visitedKey) != null;

//     localStorage.setItem("currentUserMobile", user.phone);

//     setTimeout(() => {
//       navigate(hasVisited ? "/dashboard" : "/onboard");
//     }, 1500);
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <p className="headings">Mobile Number</p>
//       <input
//         type="text"
//         placeholder="Mobile Number"
//         value={mobile}
//         onChange={(e) => setMobile(e.target.value)}
//       /><br />
//       <p className="headings">Password</p>
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       /><br />
//       <button type="submit">Login</button><br />

//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && <p style={{ color: "green" }}>{success}</p>}

//       <p>
//         Don't have an account?{" "}
//         <button type="button" onClick={() => navigate("/register")}>
//           Register
//         </button>
//       </p>
//     </form>
//   );
// };

// export default Login;




import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./Login.css"; // Importing the CSS

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!mobile || !password) {
      setError("Please fill in both mobile number and password.");
      return;
    }

    if (mobile === "admin" && password === "admin") {
      setSuccess("Admin Login Successful!");
      setTimeout(() => {
        navigate("/admindashboard");
      }, 1500);
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    
    const usersString = localStorage.getItem("appUsers");
    const appUsers = usersString ? JSON.parse(usersString) : [];

    const user = appUsers.find(
      (user) => user.phone === mobile && user.password === password
    );

    if (!user) {
      setError("Incorrect mobile number or password.");
      return;
    }

    setSuccess("Login successful!");

    // Use backticks for template literals
    const visitedKey = `onboardData_${user.phone}`;
    const hasVisited = localStorage.getItem(visitedKey) != null;

    localStorage.setItem("currentUserMobile", user.phone);
    localStorage.setItem("currentUsername", user.username);

    setTimeout(() => {
      navigate(hasVisited ? "/dashboard" : "/onboard");
    }, 1500);
  };

  return (
    <div className="register-login-container">
      <form className="register-login-form" onSubmit={handleLogin}>
        <h2 className="register-login-title">Login</h2>
        <label className="register-login-label">Mobile Number</label>
        <input
          className="register-login-input"
          type="text"
          placeholder="Enter your mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <label className="register-login-label">Password</label>
        <input
          className="register-login-input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

      
        <button type="submit" className="register-login-button">LOGIN</button>
        
        <div className="register-login-redirect"> 
          <p>
            Don't have an account?{" "}
            <button type="button" onClick={() => navigate("/register")}>  
              Register
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;