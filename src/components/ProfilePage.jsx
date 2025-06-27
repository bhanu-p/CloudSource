import React, { useState, useEffect } from "react";
import { FaUserCircle, FaGraduationCap, FaUniversity } from "react-icons/fa";
import "../App.css";

const ProfilePage = ({ onClose }) => {
  const [user, setUser] = useState({});
  const [education, setEducation] = useState({});
  const [bank, setBank] = useState({});
  const [tab, setTab] = useState("education");
  const [profilePercent, setProfilePercent] = useState(100);
  const [qualification, setQualification] = useState("");

  useEffect(() => {
    const currentUserMobile = localStorage.getItem("currentUserMobile");
    const currentUsername = localStorage.getItem("currentUsername");
    let userObj = {};
    try {
      const appUsers = JSON.parse(localStorage.getItem("appUsers")) || [];
      userObj = appUsers.find(u => u.phone === currentUserMobile) || {};
    } catch {
      userObj = {};
    }
    let edu = {}, bankData = {}, qual = "";
    try {
      const onboardData = JSON.parse(localStorage.getItem(`onboardData_${currentUserMobile}`)) || {};
      edu = onboardData.eduDetails || {};
      bankData = onboardData.bankDetails || {};
      qual = onboardData.qualification || "";
    } catch {
      edu = {};
      bankData = {};
      qual = "";
    }
    setUser({
      name: userObj.username || currentUsername || "-",
      email: userObj.email || "-",
      phone: userObj.phone || currentUserMobile || "-",
    });
    setEducation(edu);
    setBank(bankData);
    setQualification(qual);
    // Profile percent: count filled fields
    let filled = 0, total = 7;
    if (userObj.username) filled++;
    if (userObj.email) filled++;
    if (userObj.phone) filled++;
    if (edu.name) filled++;
    if (edu.tenth) filled++;
    if (edu.intermediate) filled++;
    if (bankData.bankName) filled++;
    setProfilePercent(Math.round((filled / total) * 100));
  }, []);

  // Personal Details block
  const renderPersonalDetails = () => (
    <div className="profile-block">
      <div className="profile-block-title">Personal Details</div>
      <div className="profile-row"><b>Name:</b> {education.name || "-"}</div>
      <div className="profile-row"><b>Parent Name:</b> {education.parentName || "-"}</div>
    </div>
  );

  // User Details block
  const renderUserDetails = () => (
    <div className="profile-block">
      <div className="profile-block-title">User Details</div>
      <div className="profile-row"><b>Email:</b> {user.email}</div>
      <div className="profile-row"><b>Phone:</b> {user.phone}</div>
    </div>
  );

  // Education Section blocks (show only up to highest qualification)
  const renderEducationSection = () => {
  const blocks = [];
  // Get interDiploma selection from onboarding data
  let interDiploma = "";
  try {
    const currentUserMobile = localStorage.getItem("currentUserMobile");
    const onboardData = JSON.parse(localStorage.getItem(`onboardData_${currentUserMobile}`)) || {};
    interDiploma = onboardData.interDiploma || "";
  } catch {
    interDiploma = "";
  }

  if (education.tenth) {
    blocks.push(
      <div className="profile-block" key="tenth">
        <div className="profile-block-title">10th Details</div>
        <div className="profile-row"><b>School:</b> {education.tenth.school || "-"}</div>
        <div className="profile-row"><b>Marks:</b> {education.tenth.marks || "-"}</div>
        <div className="profile-row"><b>Year:</b> {education.tenth.year || "-"}</div>
      </div>
    );
  }

  // For graduation or higher, show only the selected one: intermediate or diploma
  if (["graduation", "postgraduation", "phd"].includes(qualification)) {
    if (interDiploma === "intermediate" && education.intermediate) {
      blocks.push(
        <div className="profile-block" key="intermediate">
          <div className="profile-block-title">Intermediate Details</div>
          <div className="profile-row"><b>College:</b> {education.intermediate.college || "-"}</div>
          <div className="profile-row"><b>Marks:</b> {education.intermediate.marks || "-"}</div>
          <div className="profile-row"><b>Year:</b> {education.intermediate.year || "-"}</div>
        </div>
      );
    } else if (interDiploma === "diploma" && education.diploma) {
      blocks.push(
        <div className="profile-block" key="diploma">
          <div className="profile-block-title">Diploma Details</div>
          <div className="profile-row"><b>College:</b> {education.diploma.college || "-"}</div>
          <div className="profile-row"><b>Marks:</b> {education.diploma.marks || "-"}</div>
          <div className="profile-row"><b>Year:</b> {education.diploma.year || "-"}</div>
        </div>
      );
    }
  } else {
    // For lower than graduation, show both if present
    if (qualification === "intermediate" && education.intermediate) {
      blocks.push(
        <div className="profile-block" key="intermediate">
          <div className="profile-block-title">Intermediate Details</div>
          <div className="profile-row"><b>College:</b> {education.intermediate.college || "-"}</div>
          <div className="profile-row"><b>Marks:</b> {education.intermediate.marks || "-"}</div>
          <div className="profile-row"><b>Year:</b> {education.intermediate.year || "-"}</div>
        </div>
      );
    }
    if (qualification === "diploma" && education.diploma) {
      blocks.push(
        <div className="profile-block" key="diploma">
          <div className="profile-block-title">Diploma Details</div>
          <div className="profile-row"><b>College:</b> {education.diploma.college || "-"}</div>
          <div className="profile-row"><b>Marks:</b> {education.diploma.marks || "-"}</div>
          <div className="profile-row"><b>Year:</b> {education.diploma.year || "-"}</div>
        </div>
      );
    }
  }

  if (["graduation", "postgraduation", "phd"].includes(qualification) && education.graduation) {
    blocks.push(
      <div className="profile-block" key="graduation">
        <div className="profile-block-title">Graduation Details</div>
        <div className="profile-row"><b>College:</b> {education.graduation.college || "-"}</div>
        <div className="profile-row"><b>Stream:</b> {education.graduation.degree || "-"}</div>
        <div className="profile-row"><b>Marks:</b> {education.graduation.marks || "-"}</div>
        <div className="profile-row"><b>Year:</b> {education.graduation.year || "-"}</div>
      </div>
    );
  }
  if (["postgraduation", "phd"].includes(qualification) && education.postgraduation) {
    blocks.push(
      <div className="profile-block" key="postgraduation">
        <div className="profile-block-title">Postgraduation Details</div>
        <div className="profile-row"><b>College:</b> {education.postgraduation.college || "-"}</div>
        <div className="profile-row"><b>Stream:</b> {education.postgraduation.degree || "-"}</div>
        <div className="profile-row"><b>Marks:</b> {education.postgraduation.marks || "-"}</div>
        <div className="profile-row"><b>Year:</b> {education.postgraduation.year || "-"}</div>
      </div>
    );
  }
  if (qualification === "phd" && education.phd) {
    blocks.push(
      <div className="profile-block" key="phd">
        <div className="profile-block-title">PhD Details</div>
        <div className="profile-row"><b>College:</b> {education.phd.college || "-"}</div>
        <div className="profile-row"><b>Stream:</b> {education.phd.degree || "-"}</div>
        <div className="profile-row"><b>Marks:</b> {education.phd.marks || "-"}</div>
        <div className="profile-row"><b>Year:</b> {education.phd.year || "-"}</div>
      </div>
    );
  }
  if (blocks.length === 0) {
    blocks.push(
      <div className="profile-block" key="none">
        <div className="profile-block-title">No Education Details</div>
      </div>
    );
  }
  return <div className="profile-blocks-container">{blocks}</div>;
};
  // Bank Section block
  const renderBankSection = () => (
    <div className="profile-blocks-container">
      <div className="profile-block">
        <div className="profile-block-title">Bank Details</div>
        <div className="profile-row"><b>Account Number:</b> {bank.accNumber || "-"}</div>
        <div className="profile-row"><b>IFSC:</b> {bank.ifsc || "-"}</div>
        <div className="profile-row"><b>Bank Name:</b> {bank.bankName || "-"}</div>
        <div className="profile-row"><b>Branch:</b> {bank.branch || "-"}</div>
      </div>
    </div>
  );

  return (
    <div className="profile-page-full-overlay">
      <div className="profile-page-full-modal profile-page-colorful">
        <button className="profile-close-btn-full profile-close-btn-emoji" onClick={onClose} title="Close">
          <span role="img" aria-label="close">❌</span>
        </button>
        <div className="profile-full-header">
          <div className="profile-full-avatar">
            {user.name ? user.name[0].toUpperCase() : <FaUserCircle size={60} />}
          </div>
          <div className="profile-full-userinfo">
            <div className="profile-full-name">{user.name}</div>
          </div>
          <div className="profile-full-progress">
            <svg width="72" height="72" className="profile-progress-circle">
              <circle cx="36" cy="36" r="30" stroke="#e0e0e0" strokeWidth="8" fill="none" />
              <circle
                cx="36" cy="36" r="30"
                stroke="#43a047" strokeWidth="8" fill="none"
                strokeDasharray={2 * Math.PI * 30}
                strokeDashoffset={2 * Math.PI * 30 * (1 - profilePercent / 100)}
                style={{ transition: "stroke-dashoffset 0.5s" }}
              />
              <text x="50%" y="56%" textAnchor="middle" className="profile-progress-percentage">
                {profilePercent}%
              </text>
            </svg>
            <div className="profile-progress-label-green">Profile Complete</div>
          </div>
        </div>
        {/* Personal Details */}
        <div className="profile-blocks-container" style={{ marginTop: 24 }}>
          {renderPersonalDetails()}
        </div>
        {/* User Details */}
        <div className="profile-blocks-container">
          {renderUserDetails()}
        </div>
        {/* Tabs */}
        <div className="profile-details-section">
          <div className="profile-tabs">
            <button
              className={tab === "education" ? "active" : ""}
              onClick={() => setTab("education")}
            >
              <FaGraduationCap style={{ marginRight: 6 }} /> Education Details
            </button>
            <button
              className={tab === "bank" ? "active" : ""}
              onClick={() => setTab("bank")}
            >
              <FaUniversity style={{ marginRight: 6 }} /> Bank Details
            </button>
          </div>
          <div className="profile-tab-content">
            {tab === "education" && renderEducationSection()}
            {tab === "bank" && renderBankSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
