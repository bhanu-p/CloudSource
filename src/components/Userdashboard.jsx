// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./header";
// import Tasks from "./Tasks";
// import { FaListOl, FaTasks, FaHourglassHalf, FaCheckCircle } from "react-icons/fa";
// import "../App.css";

// const Userdashboard = () => {
//   const navigate = useNavigate();
//   const [showProfile, setShowProfile] = useState(false);
//   const mobile = localStorage.getItem("currentUserMobile");
//   const username = localStorage.getItem("currentUsername") || "User";

//   const handleLogout = () => {
//     localStorage.removeItem("currentUserMobile");
//     navigate("/");
//   };



//   const ProgressRing = ({ progress, total }) => {
//     const radius = 60;
//     const stroke = 10;
//     const normalizedRadius = radius - stroke * 2;
//     const circumference = normalizedRadius * 2 * Math.PI;
//     const percent = total === 0 ? 0 : progress / total;
//     const strokeDashoffset = circumference - percent * circumference;

//     return (

//       <svg height={radius * 2} width={radius * 2}>
//         <circle
//           stroke="#e6e6e6"
//           fill="transparent"
//           strokeWidth={stroke}
//           r={normalizedRadius}
//           cx={radius}
//           cy={radius}
//         />
//         <circle
//           stroke="#43a047"
//           fill="transparent"
//           strokeWidth={stroke}
//           strokeDasharray={circumference + " " + circumference}
//           style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s" }}
//           r={normalizedRadius}
//           cx={radius}
//           cy={radius}
//         />
//         <text
//           x="50%"
//           y="50%"
//           textAnchor="middle"
//           dy=".3em"
//           fontSize="22"
//           fill="#43a047"
//           fontWeight="bold"
//         >
//           {Math.round(percent * 100)}%
//         </text>
//       </svg>
//     );
//   };

//   const getQuestionsFromSession = () => {
//     try {
//       const data = localStorage.getItem("questions");
//       if (!data) return [];
//       return JSON.parse(data);
//     } catch {
//       return [];
//     }
//   };

//   const [section, setSection] = useState("status");
//   // Load answers from localStorage on mount
//   const [answers, setAnswers] = useState(() => {
//     const saved = localStorage.getItem("userAnswers");
//     return saved ? JSON.parse(saved) : {};
//   });

//   // Save answers to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("userAnswers", JSON.stringify(answers));
//   }, [answers]);

//   // Get questions from localStorage
//   const [questionsData, setQuestionsData] = useState(getQuestionsFromSession);

//   // If questions in localStorage change, update state
//   useEffect(() => {
//     const handleStorage = () => {
//       setQuestionsData(getQuestionsFromSession());
//     };
//     window.addEventListener("storage", handleStorage);
//     return () => window.removeEventListener("storage", handleStorage);
//   }, []);

//   const [visibleCount, setVisibleCount] = useState(1);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     intervalRef.current = setInterval(() => {
//       setVisibleCount((prev) =>
//         prev < questionsData.length ? prev + 1 : prev
//       );
//     }, 2 * 60 * 1000);

//     return () => clearInterval(intervalRef.current);
//   }, [questionsData.length]);

//   const handleAnswer = (id, value) => {
//     setAnswers((prev) => ({ ...prev, [id]: value }));
//   };

//   const totalQuestions = questionsData.length;
//   const assignedQuestions = visibleCount;
//   const visibleQuestions = questionsData.slice(0, assignedQuestions);
//   const solvedQuestions = visibleQuestions.filter(q => answers[q.id]).length;
//   const pendingQuestions = assignedQuestions - solvedQuestions;

//   return (
//     <div className="dashboard-container">
//       {/* Unique Navbar */}
//       <div className="page-container">
//         <Header
//           title={`Dashboard`}
//           username={username}
//           showProfile={showProfile}
//           setShowProfile={setShowProfile}
//           handleLogout={handleLogout}
//         />
//         {/* <h1>User Dashboard</h1>
//       <p>Welcome, user with mobile number: {mobile}</p>
//       <button onClick={handleLogout}>Logout</button> */}
//       </div>
//       <nav className="dashboard-navbar">
//         <ul>
//           <li>
//             <button
//               className={section === "status" ? "nav-active" : ""}
//               onClick={() => setSection("status")}
//               type="button"
//             >
//               <span role="img" aria-label="status">📊</span> Status
//             </button>
//           </li>
//           <li>
//             <button
//               className={section === "tasks" ? "nav-active" : ""}
//               onClick={() => setSection("tasks")}
//               type="button"
//             >
//               <span role="img" aria-label="tasks">📝</span> Tasks
//             </button>
//           </li>
//         </ul>
//       </nav>
//       {section === "status" && (
//         <div>
//           <div className="card-row-wide">
//             <div className="card-blue card-outline">
//               <FaListOl className="card-icon blue" />
//               <div>
//                 <h3>Total Questions</h3>
//                 <p>{totalQuestions}</p>
//               </div>
//             </div>
//             <div className="card-blue card-outline">
//               <FaTasks className="card-icon purple" />
//               <div>
//                 <h3>Assigned</h3>
//                 <p>{assignedQuestions}</p>
//               </div>
//             </div>
//             <div className="card-blue card-outline">
//               <FaHourglassHalf className="card-icon yellow" />
//               <div>
//                 <h3>Pending</h3>
//                 <p style={{ color: "#fbc02d", fontWeight: "bold" }}>{pendingQuestions}</p>
//               </div>
//             </div>
//             <div className="card-blue card-outline">
//               <FaCheckCircle className="card-icon green" />
//               <div>
//                 <h3>Solved</h3>
//                 <p style={{ color: "#43a047", fontWeight: "bold" }}>{solvedQuestions}</p>
//               </div>
//             </div>
//           </div>
//           <div className="progress-ring-container">
//             <ProgressRing progress={solvedQuestions} total={totalQuestions} />
//             <div className="progress-label">
//               Completion Status
//             </div>
//           </div>
//         </div>
//       )}
//       {section === "tasks" && (
//         <Tasks
//           answers={answers}
//           onAnswer={handleAnswer}
//           visibleCount={visibleCount}
//           questions={questionsData}
//         />
//       )}
//     </div>
//   );
// };

// export default Userdashboard;




import React, { useState, useEffect } from "react";
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

// Always ensure questions in localStorage have received: true
const getQuestionsFromSession = () => {
  try {
    const data = localStorage.getItem("questions");
    if (!data) return [];
    let questions = JSON.parse(data);

    let updated = false;
    questions = questions.map(q => {
      if (!q.received) {
        updated = true;
        return { ...q, received: true };
      }
      return q;
    });
    if (updated) {
      localStorage.setItem("questions", JSON.stringify(questions));
    }
    return questions;
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

  // Keep userAnswers in sync with localStorage
  useEffect(() => {
    localStorage.setItem("userAnswers", JSON.stringify(answers));
  }, [answers]);

  // Load questions and keep in sync with localStorage
  const [questionsData, setQuestionsData] = useState(getQuestionsFromSession);

  useEffect(() => {
    const handleStorage = () => {
      setQuestionsData(getQuestionsFromSession());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

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

  const totalQuestions = questionsData.length;
  const assignedQuestions = totalQuestions;
  const solvedQuestions = questionsData.filter(q => answers[q.id]).length;
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
      {/* White dashboard box with 15% space on each side, starts below header */}
      <div
        className="dashboard-content-box"
        style={{
          width: "70vw",
          margin: "0 auto",
          borderRadius: "18px",
          boxShadow: "0 4px 24px rgba(25, 118, 210, 0.10)",
          background: "#fff",
          padding: "2.5rem 2rem",
          marginTop: "90px"
        }}
      >
        {/* Unique Navbar */}
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
            questions={questionsData}
          />
        )}
      </div>
    </div>
  );
};

export default UserDashboard;