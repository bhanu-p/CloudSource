// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUserCircle, FaPlus, FaTrash, FaBell } from "react-icons/fa";
// import Header from "./header";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [showProfile, setShowProfile] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [qaList, setQaList] = useState(() => {
//     const saved = localStorage.getItem("questions");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [error, setError] = useState("");
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [answerType, setAnswerType] = useState("single"); 
//   const [multipleAnswers, setMultipleAnswers] = useState(["", ""]);


//   useEffect(() => {
//     if (answerType === "single") {
//       setMultipleAnswers(["", ""]);
//     } else {
//       setAnswer("");
//     }
//   }, [answerType]);

//   const handleLogout = () => {
//     navigate("/");
//   };


// const handleSetQA = () => {
//     if (!question.trim()) {
//       setError("Please enter the question.");
//       return;
//     }

//     const getNextId = () => {
//       if (qaList.length === 0) return 1;
//       // Find the max id among all questions (handles missing or null ids)
//       const maxId = Math.max(
//         ...qaList.map(q => typeof q.id === "number" && !isNaN(q.id) ? q.id : 0)
//       );
//       return maxId + 1;
//     };


//     const newId =  getNextId();

//     const newQA = {
//       id: newId,
//       title: question,
//       answer: answerType === "single" ? answer : multipleAnswers,
//       answerType: answerType,
//       received: false,
//       answered: false,
//     };

//     const updated = [...qaList, newQA];
//     setQaList(updated);
//     localStorage.setItem("questions", JSON.stringify(updated));

//     setQuestion("");
//     setAnswer("");
//     setError("");
//     setShowPopup(false);
//     setShowSuccess(true);
//   };

//   const handleDeleteQA = (index) => {
//     const updated = qaList.filter((_, i) => i !== index);
//     setQaList(updated);
//     localStorage.setItem("questions", JSON.stringify(updated));
//   };

//   return (
//     <div className="admin-dashboard-container">
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
//           <ul className="admin-dashboard-qa-list">
//             {qaList.map((qa, index) => (
//               <li
//                 key={qa.id}
//                 style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
//               >
//                 <div>
//                   <strong>Q: {qa.title}</strong> <br />
//                   <strong>A:</strong> 
//                   {" "}
//                 {Array.isArray(qa.answer) ? (
//                   <div>
//                     {qa.answer.map((ans, idx) => (
//                       <div key={idx}>
//                         <strong>Answer {idx + 1}:</strong> {ans}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   qa.answer
//                 )}
//                 </div>
//                 <button
//                   className="admin-dashboard-delete-btn"
//                   onClick={() => handleDeleteQA(index)}
//                   title="Delete"
//                 >
//                   <FaTrash />
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {showPopup && (
//         <div className="admin-dashboard-popup-overlay">
//           <div className="admin-dashboard-question-popup-box">
//             <button
//               className="admin-dashboard-popup-close-icon"
//               onClick={() => setShowPopup(false)}
//             >
//               ×
//             </button>
//             <h2 className="admin-dashboard-popup-title">Add Question</h2>

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

// {/*               
//               <div style={{ marginTop: "10px" }}>
//                 <label style={{ marginRight: "16px" , userSelect: "none",}}>
//                   <input
//                     type="radio"
//                     name="answerType"
//                     value="single"
//                     checked={answerType === "single"}
//                     onChange={() => setAnswerType("single")}
//                   />
//                   Single Answer
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="answerType"
//                     value="multiple"
//                     checked={answerType === "multiple"}
//                     onChange={() => setAnswerType("multiple")}
//                   />
//                   Multiple Answers
//                 </label>
//               </div> */}

//             <div className="answer-type-container">
//               {["single", "multiple"].map((type) => (
//                 <label key={type} className="answer-type-option">
//                   <input
//                     type="radio"
//                     name="answerType"
//                     value={type}
//                     checked={answerType === type}
//                     onChange={() => setAnswerType(type)}
//                   />
//                   <span className={`custom-radio ${answerType === type ? "checked" : ""}`}></span>
//                   {type === "single" ? "Single Answer" : "Multiple Answers"}
//                 </label>
//               ))}
//             </div>



//             </div>

//             {/* <div className="admin-dashboard-popup-field">
//               <label>Answer</label>
//               <textarea
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//                 placeholder="Type the answer here"
//                 className="admin-dashboard-popup-textarea"
//                 rows={3}
//               />
//             </div> */}


//             <div className="admin-dashboard-popup-field">
//               <label>Answer</label>
//               {answerType === "single" ? (
//                 <textarea
//                   value={answer}
//                   onChange={(e) => setAnswer(e.target.value)}
//                   placeholder="Type the answer here"
//                   className="admin-dashboard-popup-textarea"
//                   rows={3}
//                 />
//               ) : (
//                 <>
//                   <textarea
//                     value={multipleAnswers[0]}
//                     onChange={e => setMultipleAnswers([e.target.value, multipleAnswers[1]])}
//                     placeholder="Type answer 1 here"
//                     className="admin-dashboard-popup-textarea"
//                     rows={2}
//                     style={{ marginBottom: "8px" }}
//                   />
//                   <textarea
//                     value={multipleAnswers[1]}
//                     onChange={e => setMultipleAnswers([multipleAnswers[0], e.target.value])}
//                     placeholder="Type answer 2 here"
//                     className="admin-dashboard-popup-textarea"
//                     rows={2}
//                   />
//                 </>
//               )}
//             </div>



//             <div className="admin-dashboard-popup-actions">
//               <button className="admin-dashboard-popup-button" onClick={handleSetQA}>
//                 Submit
//               </button>
//               <button className="admin-dashboard-popup-close" onClick={() => setShowPopup(false)}>
//                 Close
//               </button>
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
import { FaUserCircle, FaPlus, FaTrash, FaBell,FaListOl,FaTasks,FaCheckCircle,FaHourglassHalf } from "react-icons/fa";
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

  // Get admin credentials from localStorage (or your login state)
  const currentUsername = localStorage.getItem("currentUsername") || "Admin";
  const currentPassword = localStorage.getItem("currentPassword") || "admin";

  const totalQuestions = qaList.length;
  const pushedQuestions = qaList.filter(q => q.received).length;
  const attemptedQuestions = qaList.filter(q => q.answered).length;
  const pendingQuestions = pushedQuestions - attemptedQuestions;

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
      const maxId = Math.max(
        ...qaList.map(q => typeof q.id === "number" && !isNaN(q.id) ? q.id : 0)
      );
      return maxId + 1;
    };

    const newId = getNextId();

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
        username="admin"
        password="admin"
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        handleLogout={handleLogout}
      />



      <div className="admin-card-row-wide">

        
        <div className="admin-card admin-card-blue admin-card-outline" >
          <FaListOl className="admin-card-icon blue" style={{ color: "#512da8", fontWeight: "bold" }}/>
          <div>
            <h3>Total Questions</h3>
            <p style={{ color: "#512da8", fontWeight: "bold" }}>{totalQuestions}</p>
          </div>
        </div>

        <div className="admin-card admin-card-blue admin-card-outline">
          <FaTasks className="admin-card-icon purple" style={{ color: "#c49000", fontWeight: "bold" }} />
          <div>
            <h3>Pushed</h3>
            <p style={{ color: "#c49000", fontWeight: "bold" }}>{pushedQuestions}</p>
          </div>
        </div>

        <div className="admin-card admin-card-blue admin-card-outline">
          <FaCheckCircle className="admin-card-icon green" style={{ color: "#43a047", fontWeight: "bold" }}/>
          <div>
            <h3>Attempted</h3>
            <p style={{ color: "#43a047", fontWeight: "bold" }}>{attemptedQuestions}</p>
          </div>
        </div>

                  <div className="admin-card admin-card-add" onClick={() => setShowPopup(true)}>
            <div className="admin-card-icon-wrapper">
              <FaPlus className="admin-card-icon" />
            </div>
            <div>
              <h3>New Question</h3>
              <p>For creating Questions</p>
            </div>
          </div>

      </div>

    



      {/* <div className="admin-dashboard-add-card" onClick={() => setShowPopup(true)}>
        <div className="admin-dashboard-add-icon">
          <FaPlus />
        </div>
        <h4>New Question</h4>
        <p>For creating Question</p>
      </div> */}




      {qaList.length > 0 && (
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-card-header">
            <h3>Questions</h3>
          </div>
          <ul className="admin-dashboard-qa-list">
            {qaList.map((qa, index) => (
              <li
                key={qa.id}
                style={{ 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderBottom: "1px solid #e0e0e0",
                }}
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


            <div className="admin-dashboard-answer-type-container">
              {["single", "multiple"].map((type) => (
                <label key={type} className="admin-dashboard-answer-type-option">
                  <input
                    type="radio"
                    name="answerType"
                    value={type}
                    checked={answerType === type}
                    onChange={() => setAnswerType(type)}
                  />
                  <span className={`admin-dashboard-custom-radio ${answerType === type ? "checked" : ""}`}></span>
                  {type === "single" ? "Single Answer" : "Multiple Answers"}
                </label>
              ))}
            </div>
            </div>

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
