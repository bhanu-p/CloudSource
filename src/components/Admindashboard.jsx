// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUserCircle, FaPlus, FaTrash, FaBell } from "react-icons/fa";
// import Header from "./header";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [showProfile, setShowProfile] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [qaList, setQaList] = useState(() => {
//     const saved = localStorage.getItem("qaList");
//     return saved ? JSON.parse(saved) : [];
//   });
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [error, setError] = useState("");
//   const [showSuccess, setShowSuccess] = useState(false);

//   const handleLogout = () => {
//     navigate("/");
//   };

//   const handleSetQA = () => {
//     if (!question.trim()) {
//       setError("Please enter the question.");
//       return;
//     }

//     const updated = [...qaList, { question, answer }];
//     setQaList(updated);
//     localStorage.setItem("qaList", JSON.stringify(updated));
//     setQuestion("");
//     setAnswer("");
//     setError("");
//     setShowPopup(false);
//     setShowSuccess(true);
//   };

//   const handleDeleteQA = (index) => {
//     const updated = qaList.filter((_, i) => i !== index);
//     setQaList(updated);
//     localStorage.setItem("qaList", JSON.stringify(updated));
//   };
//   return (
//     <div className="admin-dashboard-container">
//       {/* <header className="admin-dashboard-header">
//         <div className="admin-header-left">
//           <h2>Admin Dashboard</h2>
//         </div>
//         <div className="admin-header-right" onClick={() => setShowProfile(!showProfile)}>
//           <FaUserCircle size={22} />
//           <span>Admin</span>
//         </div>
//         {showProfile && (
//           <div className="admin-dashboard-profile-dropdown">
//             <div className="admin-dashboard-logout-box" onClick={handleLogout}>
//               <span className="admin-dashboard-logout-icon">↪</span>
//               <span className="admin-dashboard-logout-text">Logout</span>
//             </div>
//           </div>
//         )}
//       </header> */}

//       {/* <header className="admin-dashboard-header">
//         <div className="admin-header-left">
//           <h2>Admin Dashboard</h2>
//         </div>
//         <div
//           className="admin-header-right"
//           onClick={() => setShowProfile(!showProfile)}
//           tabIndex={0}
//           style={{ outline: "none" }}
//         >
//           <FaUserCircle size={22} />
//           <span>Admin</span>
//         </div>
//         {showProfile && (
//           <div className="admin-dashboard-profile-dropdown">
//             <div className="admin-dashboard-logout-box" onClick={handleLogout}>
//               <span className="admin-dashboard-logout-icon">↪</span>
//               <span className="admin-dashboard-logout-text">Logout</span>
//             </div>
//           </div>
//         )}
//       </header> */}
      
// {/*       
//       <header className="admin-dashboard-header">
//         <div className="admin-header-left">
//           <h2>Admin Dashboard</h2>
//         </div>
//         <div className="admin-header-right">
//           <input className="admin-dashboard-search" type="text" placeholder="Search..." />
//           <button className="admin-dashboard-notification">
//             <FaBell />
//           </button>
//           <div className="admin-dashboard-profile" onClick={() => setShowProfile(!showProfile)}>
//             <FaUserCircle size={22} />
//             <span>Admin</span>
//           </div>
//           {showProfile && (
//             <div className="admin-dashboard-profile-dropdown">
//               <div className="admin-dashboard-logout-box" onClick={handleLogout}>
//                 <span className="admin-dashboard-logout-icon">↪</span>
//                 <span className="admin-dashboard-logout-text">Logout</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </header> */}



//       <Header
//         title="Admin Dashboard"
//         username="Admin"
//         showProfile={showProfile}
//         setShowProfile={setShowProfile}
//         handleLogout={handleLogout}
//       />


//       <div className="admin-dashboard-add-card" onClick={() => setShowPopup(true)}>
//         <div className="admin-dashboard-add-icon">
//           <FaPlus />
//         </div>
//         <h4>New Question</h4>
//         <p>For creating Question</p>
//       </div>

//       {qaList.length > 0 && (
//         <div className="admin-dashboard-card">
//           <div className="admin-dashboard-card-header">
//             <h3>Questions</h3>
//           </div>
//             <ul className="admin-dashboard-qa-list">
//               {qaList.map((qa, index) => (
//                 <li key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                   <div>
//                     <strong>Q: {qa.question}</strong> <br />
//                     <strong>A:</strong> {qa.answer}
//                   </div>
//                   <button
//                     className="admin-dashboard-delete-btn"
//                     onClick={() => handleDeleteQA(index)}
//                     title="Delete"
//                   >
//                   <FaTrash />
//                   </button>
//                 </li>
//               ))}
//             </ul>
//         </div>
//       )}

//       {showPopup && (
//         <div className="admin-dashboard-popup-overlay">
//           <div className="admin-dashboard-question-popup-box">
//             <button className="admin-dashboard-popup-close-icon" onClick={() => setShowPopup(false)}>×</button>
//             <h2 className="admin-dashboard-popup-title">Add Question</h2>

//             {/* <div className="admin-dashboard-popup-field">
//               <label>Question</label>
//               <input
//                 type="text"
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 placeholder="Type your question here"
//               />
//               {error && <p className="admin-dashboard-error-text">{error}</p>}
//             </div>

//             <div className="admin-dashboard-popup-field">
//               <label>Answer</label>
//               <input
//                 type="text"
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//                 placeholder="Type the answer here"
//               />
//             </div> */}

//             <div className="admin-dashboard-popup-field">
//               <label>Question</label>
//               <textarea
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 placeholder="Type your question here"
//                 className="admin-dashboard-popup-textarea"
//                 rows={2}
//               />
//               {error && <p className="admin-dashboard-error-text">{error}</p>}
//             </div>

//             <div className="admin-dashboard-popup-field">
//               <label>Answer</label>
//               <textarea
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//                 placeholder="Type the answer here"
//                 className="admin-dashboard-popup-textarea"
//                 rows={3}
//               />
//             </div>

//             <div className="admin-dashboard-popup-actions">
//               <button className="admin-dashboard-popup-button" onClick={handleSetQA}>Submit</button>
//               <button className="admin-dashboard-popup-close" onClick={() => setShowPopup(false)}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showSuccess && (
//         <div className="admin-dashboard-popup-overlay">
//           <div className="admin-dashboard-success-box">
//             <h3>✅ Question Added!</h3>
//             <p>Your question was successfully added to the Admin Dashboard.</p>
//             <button onClick={() => setShowSuccess(false)}>OK</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;















import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaPlus, FaTrash, FaBell } from "react-icons/fa";
import Header from "./header";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [qaList, setQaList] = useState(() => {
    const saved = localStorage.getItem("questions");
    return saved ? JSON.parse(saved) : [];
  });

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [answerType, setAnswerType] = useState("single"); 
  const [multipleAnswers, setMultipleAnswers] = useState(["", ""]);


  useEffect(() => {
    if (answerType === "single") {
      setMultipleAnswers(["", ""]);
    } else {
      setAnswer("");
    }
  }, [answerType]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleSetQA = () => {
    if (!question.trim()) {
      setError("Please enter the question.");
      return;
    }


    const getNextId = () => {
      if (qaList.length === 0) return 1;
      // Find the max id among all questions (handles missing or null ids)
      const maxId = Math.max(
        ...qaList.map(q => typeof q.id === "number" && !isNaN(q.id) ? q.id : 0)
      );
      return maxId + 1;
    };


    const newId =  getNextId();

    const newQA = {
      id: newId,
      title: question,
      answer: answerType === "single" ? answer : multipleAnswers,
      answerType: answerType,
      received: false,
      answered: false,
    };

    const updated = [...qaList, newQA];
    setQaList(updated);
    localStorage.setItem("questions", JSON.stringify(updated));

    setQuestion("");
    setAnswer("");
    setError("");
    setShowPopup(false);
    setShowSuccess(true);
  };

  const handleDeleteQA = (index) => {
    const updated = qaList.filter((_, i) => i !== index);
    setQaList(updated);
    localStorage.setItem("questions", JSON.stringify(updated));
  };

  return (
    <div className="admin-dashboard-container">
      <Header
        title="Admin Dashboard"
        username="Admin"
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        handleLogout={handleLogout}
      />

      <div className="admin-dashboard-add-card" onClick={() => setShowPopup(true)}>
        <div className="admin-dashboard-add-icon">
          <FaPlus />
        </div>
        <h4>New Question</h4>
        <p>For creating Question</p>
      </div>

      {qaList.length > 0 && (
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-card-header">
            <h3>Questions</h3>
          </div>
          <ul className="admin-dashboard-qa-list">
            {qaList.map((qa, index) => (
              <li
                key={qa.id}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <div>
                  <strong>Q: {qa.title}</strong> <br />
                  <strong>A:</strong> 
                  {" "}
                {Array.isArray(qa.answer) ? (
                  <div>
                    {qa.answer.map((ans, idx) => (
                      <div key={idx}>
                        <strong>Answer {idx + 1}:</strong> {ans}
                      </div>
                    ))}
                  </div>
                ) : (
                  qa.answer
                )}
                </div>
                <button
                  className="admin-dashboard-delete-btn"
                  onClick={() => handleDeleteQA(index)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showPopup && (
        <div className="admin-dashboard-popup-overlay">
          <div className="admin-dashboard-question-popup-box">
            <button
              className="admin-dashboard-popup-close-icon"
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>
            <h2 className="admin-dashboard-popup-title">Add Question</h2>

            <div className="admin-dashboard-popup-field">
              <label>Question</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here"
                className="admin-dashboard-popup-textarea"
                rows={2}
              />
              {error && <p className="admin-dashboard-error-text">{error}</p>}

{/*               
              <div style={{ marginTop: "10px" }}>
                <label style={{ marginRight: "16px" , userSelect: "none",}}>
                  <input
                    type="radio"
                    name="answerType"
                    value="single"
                    checked={answerType === "single"}
                    onChange={() => setAnswerType("single")}
                  />
                  Single Answer
                </label>
                <label>
                  <input
                    type="radio"
                    name="answerType"
                    value="multiple"
                    checked={answerType === "multiple"}
                    onChange={() => setAnswerType("multiple")}
                  />
                  Multiple Answers
                </label>
              </div> */}

            <div className="answer-type-container">
              {["single", "multiple"].map((type) => (
                <label key={type} className="answer-type-option">
                  <input
                    type="radio"
                    name="answerType"
                    value={type}
                    checked={answerType === type}
                    onChange={() => setAnswerType(type)}
                  />
                  <span className={`custom-radio ${answerType === type ? "checked" : ""}`}></span>
                  {type === "single" ? "Single Answer" : "Multiple Answers"}
                </label>
              ))}
            </div>



            </div>

            {/* <div className="admin-dashboard-popup-field">
              <label>Answer</label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type the answer here"
                className="admin-dashboard-popup-textarea"
                rows={3}
              />
            </div> */}


            <div className="admin-dashboard-popup-field">
              <label>Answer</label>
              {answerType === "single" ? (
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type the answer here"
                  className="admin-dashboard-popup-textarea"
                  rows={3}
                />
              ) : (
                <>
                  <textarea
                    value={multipleAnswers[0]}
                    onChange={e => setMultipleAnswers([e.target.value, multipleAnswers[1]])}
                    placeholder="Type answer 1 here"
                    className="admin-dashboard-popup-textarea"
                    rows={2}
                    style={{ marginBottom: "8px" }}
                  />
                  <textarea
                    value={multipleAnswers[1]}
                    onChange={e => setMultipleAnswers([multipleAnswers[0], e.target.value])}
                    placeholder="Type answer 2 here"
                    className="admin-dashboard-popup-textarea"
                    rows={2}
                  />
                </>
              )}
            </div>



            <div className="admin-dashboard-popup-actions">
              <button className="admin-dashboard-popup-button" onClick={handleSetQA}>
                Submit
              </button>
              <button className="admin-dashboard-popup-close" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="admin-dashboard-popup-overlay">
          <div className="admin-dashboard-success-box">
            <h3>✅ Question Added!</h3>
            <p>Your question was successfully added to the Admin Dashboard.</p>
            <button onClick={() => setShowSuccess(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
