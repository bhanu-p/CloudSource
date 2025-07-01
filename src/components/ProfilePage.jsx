import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaGraduationCap, FaUniversity, FaCamera, FaPencilAlt } from "react-icons/fa";
import "../App.css";

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const ProfilePage = ({ onClose }) => {
  const [user, setUser] = useState({});
  const [education, setEducation] = useState({});
  const [bank, setBank] = useState({});
  const [tab, setTab] = useState("education");
  const [profilePercent, setProfilePercent] = useState(100);
  const [qualification, setQualification] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showEditBank, setShowEditBank] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [editBank, setEditBank] = useState({});
  const fileInputRef = useRef();

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

    // Load profile picture if saved
    const pic = localStorage.getItem(`profilePic_${currentUserMobile}`);
    if (pic) setProfilePic(pic);
  }, []);

  // Profile picture upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProfilePic(ev.target.result);
      const currentUserMobile = localStorage.getItem("currentUserMobile");
      localStorage.setItem(`profilePic_${currentUserMobile}`, ev.target.result);
    };
    reader.readAsDataURL(file);
  };

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
    <div className="profile-block profile-block-user">
      <div className="profile-block-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>User Details</span>
        <span style={{ display: "flex", alignItems: "center", cursor: "pointer" }} className="profile-edit-icon" title="Edit" onClick={() => {
          setEditUser({ ...user });
          setShowEditUser(true);
        }}>
          <FaPencilAlt style={{ marginRight: 4 }} /> <span>Edit</span>
        </span>
      </div>
      <div className="profile-row"><b>Email:</b> {user.email}</div>
      <div className="profile-row"><b>Phone:</b> {user.phone}</div>
    </div>
  );

  // Edit User Details form
  const renderEditUserForm = () => (
    <div className="profile-edit-form-overlay">
      <div className="profile-edit-form">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>User Details</h2>
          <button
            className="profile-close-btn-full profile-close-btn-emoji"
            onClick={() => setShowEditUser(false)}
            title="Close"
            style={{ marginLeft: 16 }}
          >
            <span role="img" aria-label="close">X</span>
          </button>
        </div>
        <form onSubmit={e => {
          e.preventDefault();
          setUser({ ...editUser });
          setShowEditUser(false);
          // Save to localStorage
          const currentUserMobile = localStorage.getItem("currentUserMobile");
          let appUsers = [];
          try {
            appUsers = JSON.parse(localStorage.getItem("appUsers")) || [];
          } catch { appUsers = []; }
          const idx = appUsers.findIndex(u => u.phone === currentUserMobile);
          if (idx !== -1) {
            appUsers[idx] = { ...appUsers[idx], email: editUser.email, phone: editUser.phone };
          }
          localStorage.setItem("appUsers", JSON.stringify(appUsers));
          localStorage.setItem("currentUserMobile", editUser.phone);
        }}>
          <label>Email</label>
          <input
            type="email"
            value={editUser.email || ""}
            placeholder="Enter email"
            onChange={e => setEditUser({ ...editUser, email: e.target.value })}
          />
          <label>Phone</label>
          <input
            type="text"
            value={editUser.phone || ""}
            placeholder="Enter phone"
            onChange={e => setEditUser({ ...editUser, phone: e.target.value })}
          />
          <button type="submit" className="profile-submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );

  // Edit Bank Details form
  const renderEditBankForm = () => (
    <div className="profile-edit-form-overlay">
      <div className="profile-edit-form">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Bank Details</h2>
          <button
            className="profile-close-btn-full profile-close-btn-emoji"
            onClick={() => setShowEditBank(false)}
            title="Close"
            style={{ marginLeft: 16 }}
          >
            <span role="img" aria-label="close">X</span>
          </button>
        </div>
        <form onSubmit={e => {
          e.preventDefault();
          setBank({ ...editBank });
          setShowEditBank(false);
          // Save to localStorage
          const currentUserMobile = localStorage.getItem("currentUserMobile");
          let onboardData = {};
          try {
            onboardData = JSON.parse(localStorage.getItem(`onboardData_${currentUserMobile}`)) || {};
          } catch { onboardData = {}; }
          onboardData.bankDetails = { ...editBank };
          localStorage.setItem(`onboardData_${currentUserMobile}` , JSON.stringify(onboardData));
        }}>
          <label>Account Number</label>
          <input
            type="text"
            value={editBank.accNumber || ""}
            placeholder="Enter account number"
            onChange={e => setEditBank({ ...editBank, accNumber: e.target.value })}
          />
          <label>IFSC</label>
          <input
            type="text"
            value={editBank.ifsc || ""}
            placeholder="Enter IFSC"
            onChange={e => setEditBank({ ...editBank, ifsc: e.target.value })}
          />
          <label>Bank Name</label>
          <input
            type="text"
            value={editBank.bankName || ""}
            placeholder="Enter bank name"
            onChange={e => setEditBank({ ...editBank, bankName: e.target.value })}
          />
          <label>Branch</label>
          <input
            type="text"
            value={editBank.branch || ""}
            placeholder="Enter branch"
            onChange={e => setEditBank({ ...editBank, branch: e.target.value })}
          />
          <button type="submit" className="profile-submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );

  // Education Section blocks (show only up to highest qualification)
  const renderEducationSection = () => {
    const blocks = [];
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
    // Show two cards per row
    return (
      <div className="profile-blocks-container profile-edu-grid">
        {blocks}
      </div>
    );
  };

  const renderBankSection = () => (
    <div className="profile-blocks-container">
      <div className="profile-block profile-block-bank">
        <div className="profile-block-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Bank Details</span>
          <span style={{ display: "flex", alignItems: "center", cursor: "pointer" }} className="profile-edit-icon" title="Edit" onClick={() => {
            setEditBank({ ...bank });
            setShowEditBank(true);
          }}>
            <FaPencilAlt style={{ marginRight: 4 }} /> <span>Edit</span>
          </span>
        </div>
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
          <span role="img" aria-label="close">X</span>
        </button>
        <div className="profile-full-header">
          <div className="profile-full-avatar-container" style={{ display: "flex", alignItems: "center" }}>
            <div className="profile-full-avatar">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="profile-avatar-img" />
              ) : (
                <span className="profile-avatar-initials">{getInitials(user.name)}</span>
              )}
              <button
                className="profile-avatar-camera"
                onClick={() => fileInputRef.current.click()}
                title="Upload Profile Picture"
              >
                <FaCamera />
              </button>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleProfilePicChange}
              />
            </div>
            <div style={{ marginLeft: 16, fontWeight: 600, fontSize: 30, color: '#1976d2' }}>{user.name}</div>
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
        {showEditUser && renderEditUserForm()}
        {showEditBank && renderEditBankForm()}
      </div>
    </div>
  );
};

export default ProfilePage;
