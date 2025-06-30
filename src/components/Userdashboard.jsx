import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Tasks from "./Tasks";
import ProfilePage from "./ProfilePage";
import { FaListOl, FaTasks, FaHourglassHalf, FaCheckCircle } from "react-icons/fa";
import "../App.css";

const ProgressRing = ({ progress, total }) => {
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = total === 0 ? 0 : progress / total;
  const strokeDashoffset = circumference - percent * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#43a047"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s" }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="22"
        fill="#43a047"
        fontWeight="bold"
      >
        {Math.round(percent * 100)}%
      </text>
    </svg>
  );
};

const getQuestionsFromSession = () => {
  try {
    const data = localStorage.getItem("questions");
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const UserDashboard = () => {
  const [section, setSection] = useState("status");
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("userAnswers");
    return saved ? JSON.parse(saved) : {};
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // For progressive reveal of questions
  const [visibleCount, setVisibleCount] = useState(() => {
    const questions = getQuestionsFromSession();
    return questions.filter(q => q.received).length || 1;
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const questions = getQuestionsFromSession();
      const receivedCount = questions.filter(q => q.received).length;
      if (receivedCount < questions.length) {
        const updatedQuestions = questions.map((q, idx) =>
          idx === receivedCount ? { ...q, received: true } : q
        );
        localStorage.setItem("questions", JSON.stringify(updatedQuestions));
        setVisibleCount(receivedCount + 1);
      }
    }, 20 * 1000); // 2 minutes

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    localStorage.setItem("userAnswers", JSON.stringify(answers));
  }, [answers]);

  const [questionsData, setQuestionsData] = useState(getQuestionsFromSession);

  useEffect(() => {
    const handleStorage = () => {
      setQuestionsData(getQuestionsFromSession());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    setQuestionsData(getQuestionsFromSession());
  }, [visibleCount]);

  const handleAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    let questions = JSON.parse(localStorage.getItem("questions") || "[]");
    questions = questions.map(q =>
      q.id === id ? { ...q, answered: true } : q
    );
    localStorage.setItem("questions", JSON.stringify(questions));
    setQuestionsData(questions);
  };

  const receivedQuestions = questionsData.filter(q => q.received);
  const totalQuestions = questionsData.length;
  const assignedQuestions = receivedQuestions.length;
  const solvedQuestions = receivedQuestions.filter(q => answers[q.id]).length;
  const pendingQuestions = assignedQuestions - solvedQuestions;

  const username = localStorage.getItem("currentUsername") || "User";
  const email = localStorage.getItem("currentUserEmail") || "user@email.com";
  const phone = localStorage.getItem("currentUserMobile") || "0000000000";
  const education = {
    college: localStorage.getItem("college") || "-",
    degree: localStorage.getItem("degree") || "-",
    branch: localStorage.getItem("branch") || "-",
    year: localStorage.getItem("year") || "-"
  };
  const bank = {
    bankName: localStorage.getItem("bankName") || "-",
    accountNumber: localStorage.getItem("accountNumber") || "-",
    ifsc: localStorage.getItem("ifsc") || "-"
  };
  const userType = "user";
  const password = localStorage.getItem("currentPassword") || "";

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("currentUserMobile");
    navigate("/");
  };

  // Handler to open profile modal (only on Profile option click)
  const handleProfileClick = () => {
    setShowDropdown(false);
    setShowProfileModal(true);
  };

  // Handler to close profile modal
  const handleCloseProfile = () => setShowProfileModal(false);

  return (
    <div className="dashboard-container" style={{ background: "#fff", minHeight: "100vh" }}>
      {/* Fixed Header at the very top */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100
      }}>
        <Header
          title="User Dashboard"
          username={username}
          password={password}
          showProfile={showDropdown}
          setShowProfile={setShowDropdown}
          handleLogout={handleLogout}
          userType={userType}
          user={{ name: username, email, phone }}
          education={education}
          bank={bank}
          onProfileClick={handleProfileClick}
        />
      </div>
      <div style={{ marginTop: "90px"}}>
        <div className="userdashboard-tab-bar">
          <button
            className={`userdashboard-tab${section === "status" ? " active" : ""}`}
            onClick={() => setSection("status")}
          >
            <FaListOl className="tab-icon" />
            Status
          </button>
          <div className="userdashboard-tab-divider" />
          <button
            className={`userdashboard-tab${section === "tasks" ? " active" : ""}`}
            onClick={() => setSection("tasks")}
          >
            <FaTasks className="tab-icon" />
            Tasks
          </button>
        </div>
        {section === "status" && (
          <div>
            <div className="card-row-wide">
              <div className="card-blue card-outline">
                <FaListOl className="card-icon blue" />
                <div>
                  <h3>Total Questions</h3>
                  <p>{totalQuestions}</p>
                </div>
              </div>
              <div className="card-blue card-outline">
                <FaTasks className="card-icon purple" />
                <div>
                  <h3>Assigned</h3>
                  <p>{assignedQuestions}</p>
                </div>
              </div>
              <div className="card-blue card-outline">
                <FaHourglassHalf className="card-icon yellow" />
                <div>
                  <h3>Pending</h3>
                  <p style={{ color: "#fbc02d", fontWeight: "bold" }}>{pendingQuestions}</p>
                </div>
              </div>
              <div className="card-blue card-outline">
                <FaCheckCircle className="card-icon green" />
                <div>
                  <h3>Solved</h3>
                  <p style={{ color: "#43a047", fontWeight: "bold" }}>{solvedQuestions}</p>
                </div>
              </div>
            </div>
            <div className="progress-ring-container">
              <ProgressRing progress={solvedQuestions} total={assignedQuestions} />
              <div className="progress-label">
                Completion Status
              </div>
            </div>
          </div>
        )}
        {section === "tasks" && (
          <Tasks
            answers={answers}
            onAnswer={handleAnswer}
            questions={receivedQuestions}
          />
        )}
      </div>
      {/* Profile Modal */}
      {showProfileModal && (
        <ProfilePage
          user={{ name: username, email, phone }}
          education={education}
          bank={bank}
          onClose={handleCloseProfile}
        />
      )}
    </div>
  );
};

export default UserDashboard;