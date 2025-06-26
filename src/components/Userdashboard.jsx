import React, { useState, useEffect, useRef } from "react";
import Header from "./header";
import Tasks from "./Tasks";
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
  const [showProfile, setShowProfile] = useState(false);

  // For progressive reveal of questions
  const [visibleCount, setVisibleCount] = useState(() => {
    // On reload, show as many as have received:true in localStorage
    const questions = getQuestionsFromSession();
    return questions.filter(q => q.received).length || 1;
  });
  //stores the timer ID returned by setInterval
  // This allows us to clear the interval later
  const intervalRef = useRef(null);
  
useEffect(() => {
  intervalRef.current = setInterval(() => {
    const questions = getQuestionsFromSession();
    const receivedCount = questions.filter(q => q.received).length;
    if (receivedCount < questions.length) {
      // Mark the next question as received:true in localStorage
      const updatedQuestions = questions.map((q, idx) =>
        idx === receivedCount ? { ...q, received: true } : q
      );
      localStorage.setItem("questions", JSON.stringify(updatedQuestions));
      setVisibleCount(receivedCount + 1);
    }
  },2*60*1000); // 2 minutes

  return () => clearInterval(intervalRef.current);
}, []);

  // Keep userAnswers in sync with localStorage
  useEffect(() => {
    localStorage.setItem("userAnswers", JSON.stringify(answers));
  }, [answers]);

  // Load questions and keep in sync with localStorage
  const [questionsData, setQuestionsData] = useState(getQuestionsFromSession);

  // Sync questionsData with localStorage and visibleCount
  useEffect(() => {
    const handleStorage = () => {
      setQuestionsData(getQuestionsFromSession());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Also update questionsData when visibleCount changes (to reflect received:true)
  useEffect(() => {
    setQuestionsData(getQuestionsFromSession());
  }, [visibleCount]);

  // When a user answers, update both userAnswers and the question's answered status
  const handleAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));

    // Update answered: true for this question in localStorage
    let questions = JSON.parse(localStorage.getItem("questions") || "[]");
    questions = questions.map(q =>
      q.id === id ? { ...q, answered: true } : q
    );
    localStorage.setItem("questions", JSON.stringify(questions));
    setQuestionsData(questions);
  };

  // Only show questions that are received (assigned)
  const receivedQuestions = questionsData.filter(q => q.received);
  const totalQuestions = questionsData.length;
  const assignedQuestions = receivedQuestions.length;
  const solvedQuestions = receivedQuestions.filter(q => answers[q.id]).length;
  const pendingQuestions = assignedQuestions - solvedQuestions;

  const username = localStorage.getItem("currentUsername") || "User";

  const handleLogout = () => {
    localStorage.removeItem("currentUserMobile");
    window.location.href = "/";
  };

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
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          handleLogout={handleLogout}
        />
      </div>
      <div style={{ marginTop: "90px"}}>
        <nav className="dashboard-navbar">
          <ul>
            <li>
              <button
                className={section === "status" ? "nav-active" : ""}
                onClick={() => setSection("status")}
                type="button"
              >
                <span role="img" aria-label="status">📊</span> Status
              </button>
            </li>
            <li>
              <button
                className={section === "tasks" ? "nav-active" : ""}
                onClick={() => setSection("tasks")}
                type="button"
              >
                <span role="img" aria-label="tasks">📝</span> Tasks
              </button>
            </li>
          </ul>
        </nav>
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
              <ProgressRing progress={solvedQuestions} total={totalQuestions} />
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
    </div>
  );
};

export default UserDashboard;