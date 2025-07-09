import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaPlus, FaTrash, FaBell, FaListOl, FaTasks, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import Header from "./header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  // const [error, setError] = useState("");
  // const [showSuccess, setShowSuccess] = useState(false);
  const [answerType, setAnswerType] = useState("single");
  const [multipleAnswers, setMultipleAnswers] = useState(["", ""]);
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([{ value: "", checked: false }]);

  const currentUsername = localStorage.getItem("currentUsername") || "Admin";
  const currentPassword = localStorage.getItem("currentPassword") || "admin";

  const totalQuestions = qaList.length;
  const pushedQuestions = qaList.filter(q => q.received).length;
  const attemptedQuestions = qaList.filter(q => q.answered).length;
  const pendingQuestions = pushedQuestions - attemptedQuestions;

  useEffect(() => {
    if (answerType === "single") {
      setMultipleAnswers(["", ""]);
      setMultipleChoiceOptions([{ value: "", checked: false }]);
    } else if (answerType === "multiple") {
      setAnswer("");
      setMultipleChoiceOptions([{ value: "", checked: false }]);
    } else if (answerType === "multipleChoice") {
      setAnswer("");
      setMultipleAnswers(["", ""]);
    }
  }, [answerType]);


  const handleLogout = () => {
    navigate("/");
  };

  const handleSetQA = () => {

    if (!question.trim()) {
      toast.error("Please enter the question.");
      return;
    }


    if (answerType === "multipleChoice") {
      const validOptions = multipleChoiceOptions.filter(opt => opt.value.trim() !== "");
      if (validOptions.length < 2) {
        toast.error("Please enter at least two options.");
        return;
      }
      if (!validOptions.some(opt => opt.checked)) {
        toast.error("Please select at least one correct answer.");
        return;
      }
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
      // answer: answerType === "single" ? answer : multipleAnswers,
      answer:
        answerType === "single"
          ? answer
          : answerType === "multiple"
            ? multipleAnswers
            : multipleChoiceOptions,
      answerType: answerType,
      received: false,
      answered: false,
    };

    const updated = [...qaList, newQA];
    setQaList(updated);
    localStorage.setItem("questions", JSON.stringify(updated));

    setQuestion("");
    setAnswer("");
    // setError("");
    setShowPopup(false);
    // setShowSuccess(true);
    toast.success("Question added successfully!");
    setMultipleAnswers(["", ""]);
    setMultipleChoiceOptions([{ value: "", checked: false }]);
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
          <FaListOl className="admin-card-icon" style={{ color: "#512da8", fontWeight: "bold" }} />
          <div>
            <h3>Total Questions</h3>
            <p style={{ color: "#512da8", fontWeight: "bold" }}>{totalQuestions}</p>
          </div>
        </div>

        <div className="admin-card admin-card-blue admin-card-outline">
          <FaTasks className="admin-card-icon" style={{ color: "#c49000", fontWeight: "bold" }} />
          <div>
            <h3>Pushed</h3>
            <p style={{ color: "#c49000", fontWeight: "bold" }}>{pushedQuestions}</p>
          </div>
        </div>

        <div className="admin-card admin-card-blue admin-card-outline">
          <FaCheckCircle className="admin-card-icon" style={{ color: "#43a047", fontWeight: "bold" }} />
          <div>
            <h3>Attempted</h3>
            <p style={{ color: "#43a047", fontWeight: "bold" }}>{attemptedQuestions}</p>
          </div>
        </div>

        <div className="admin-card admin-card-add " onClick={() => setShowPopup(true)}>
          <div className="admin-card-icon-wrapper">
            <FaPlus className="admin-card-icon" />
          </div>
          <div>
            <h3>New Question</h3>
            <p>For creating Questions</p>
          </div>
        </div>

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

                  <strong>A:</strong>  {" "}
                  {Array.isArray(qa.answer) ? (
                    <div>
                      {qa.answer.map((ans, idx) => (
                        <div key={idx}>
                          {typeof ans === "string" ? (
                            <strong>Answer {idx + 1}:</strong>
                          ) : (
                            <strong>Option {idx + 1}{ans.checked ? " ✅" : ""}:</strong>
                          )}{" "}
                          {typeof ans === "string" ? ans : ans.value}
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
            <div className="admin-dashboard-popup-scrollbox">
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
                

                <div className="admin-dashboard-answer-type-container">
                  {["single", "multiple", "multipleChoice"].map((type) => (
                    <label key={type} className="admin-dashboard-answer-type-option">
                      <input
                        type="radio"
                        name="answerType"
                        value={type}
                        checked={answerType === type}
                        onChange={() => setAnswerType(type)}
                      />
                      <span className={`admin-dashboard-custom-radio ${answerType === type ? "checked" : ""}`}></span>
                      {type === "single"
                        ? "Single Answer"
                        : type === "multiple"
                          ? "Multiple Answers"
                          : "Multiple Choice"}
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
                ) : answerType === "multiple" ? (
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
                ) : (

                  // <div className="admin-dashboard-popup-scrollbox">
                  <div className="admin-dashboard-multiple-choice-container">
                    {multipleChoiceOptions.map((option, idx) => (
                      <div key={idx} className="admin-dashboard-multiple-choice-row">
                        <label className="admin-dashboard-custom-checkbox-label">
                        <input
                          type="checkbox"
                          name="multipleChoiceCorrect"
                          checked={option.checked}
                          onChange={() => {
                            const updated = multipleChoiceOptions.map((opt, i) => ({
                              ...opt,
                              checked: i === idx
                            }));
                            setMultipleChoiceOptions(updated);
                          }}
                          className="admin-dashboard-custom-checkbox-input"
                        />
                        <span className="admin-dashboard-custom-checkbox-box"></span>
                        </label>
                        <input
                          type="text"
                          value={option.value}
                          onChange={e => {
                            const updated = [...multipleChoiceOptions];
                            updated[idx].value = e.target.value;
                            setMultipleChoiceOptions(updated);
                          }}
                          placeholder={`Option ${idx + 1}`}
                          className="admin-dashboard-multiple-choice-input"
                        />
                        {multipleChoiceOptions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setMultipleChoiceOptions(multipleChoiceOptions.filter((_, i) => i !== idx));
                            }}
                            className="admin-dashboard-remove-option"
                            title="Remove option"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setMultipleChoiceOptions([...multipleChoiceOptions, { value: "", checked: false }])
                      }
                      className="admin-dashboard-add-option"
                    >
                      + Add Option
                    </button>
                  </div>
                  // </div>

                )}
              </div>
             
            </div>
             {/* {error && <p className="admin-dashboard-error-text">{error}</p>} */}
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

      <ToastContainer position="bottom-right"  />
    </div>
  );
};      

export default AdminDashboard;
