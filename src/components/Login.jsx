import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!mobile || !password) {
      toast.error("Please fill in both mobile number and password.");
      return;
    }

    if (mobile === "admin" && password === "admin") {
      toast.success("Admin Login Successful!");
      setTimeout(() => {
        navigate("/admindashboard");
      }, 3000);
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    const usersString = localStorage.getItem("appUsers");
    const appUsers = usersString ? JSON.parse(usersString) : [];

    const user = appUsers.find((user) => user.phone === mobile);

    if( !user) {
      toast.error("User not found. Please register first.");
      return;
    }

    if (user.password !== password) {
      toast.error("Incorrect mobile number or password.");
      return;
    }

    toast.success("Login successful!");

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

        <div className="login-resetPassword-redirect" style={{ textAlign: "right", marginBottom: "12px" }}>
          <p>
          <button type="button" onClick={() => navigate("/resetPassword")}>
            Forget Password?
          </button>
          </p>
        </div>
      
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
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;