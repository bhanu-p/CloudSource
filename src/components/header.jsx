import React from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";

const Header = ({
  title ,
  showProfile,
  setShowProfile,
  handleLogout,
  username
}) => (
  <header className="header">
    <div className="header-left">
      <h2>{title}</h2>
    </div>
    <div className="header-right">
      <input className="header-search" type="text" placeholder="Search..." />
      <button className="header-notification">
        <FaBell />
      </button>
      <div className="header-profile" onClick={() => setShowProfile(!showProfile)}>
        <FaUserCircle size={22} />
        <span>{username}</span>
      </div>
      {showProfile && (
        <div className="header-profile-dropdown">
          <div className="header-profile-logout-box" onClick={handleLogout}>
            <span className="header-profile-logout-icon">↪</span>
            <span className="header-profile-logout-text">Logout</span>
          </div>
        </div>
      )}
    </div>
  </header>
);

export default Header;