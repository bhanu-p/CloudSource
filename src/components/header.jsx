import React from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";

const Header = ({
  title,
  showProfile,
  setShowProfile,
  handleLogout,
  username,
  password,
  onProfileClick
}) => {
  // Hide Profile option for admin (case-insensitive)
  const isAdmin =
    (username && username.toLowerCase() === "admin" && password === "admin");

  return (
    <header className="header">
      <div className="header-left">
        <h2>{title}</h2>
      </div>
      <div className="header-right">
        <input className="header-search" type="text" placeholder="Search..." />
        <button className="header-notification">
          <FaBell />
        </button>
        <div
          className="header-profile"
          onClick={() => setShowProfile(!showProfile)}
          style={{ cursor: "pointer" }}
        >
          <FaUserCircle size={22} />
          <span>{username}</span>
        </div>
        {showProfile && (
          <div className="header-profile-dropdown">
            {/* Only show Profile option for non-admin users */}
            {!isAdmin && (
              <div
                className="header-profile-logout-box"
                onClick={() => {
                  setShowProfile(false);
                  if (onProfileClick) onProfileClick();
                }}
                style={{
                  borderBottom: "1px solid #e3eafc",
                  marginBottom: 6,
                  paddingBottom: 6,
                  cursor: "pointer"
                }}
              >
                <span className="header-profile-logout-icon">
                  <FaUserCircle size={16} />
                </span>
                <span className="header-profile-logout-text">Profile</span>
              </div>
            )}
            {/* Logout Option */}
            <div
              className="header-profile-logout-box"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <span className="header-profile-logout-icon">↪</span>
              <span className="header-profile-logout-text">Logout</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;