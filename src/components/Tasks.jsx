// import React, { useState } from "react";

// const Tasks = ({ answers, onAnswer, questions }) => {
//   const [mcqSelections, setMcqSelections] = useState({}); // For multiple choice answers

//   const unanswered = questions.filter(q => !answers[q.id]);
//   const answered = questions.filter(q => answers[q.id]);

//   const handleSubmit = (e, q) => {
//     e.preventDefault();

//     if (q.answerType === "multipleChoice") {
    
//       const selected = mcqSelections[q.id];
//       if (selected === undefined || selected === null || selected.length === 0) return;

//       // onAnswer(q.id, selected);
//       onAnswer(q.id, q.answer[selected]?.value);

//       const stored = localStorage.getItem("questions");
//       let allQuestions = stored ? JSON.parse(stored) : [];
//       allQuestions = allQuestions.map(quest =>
//         quest.id === q.id ? { ...quest, answered: true } : quest
//       );
//       localStorage.setItem("questions", JSON.stringify(allQuestions));
//       setMcqSelections(prev => ({ ...prev, [q.id]: undefined }));
//     } else {
 
//       const value = e.target.elements[`answer-${q.id}`].value;
//       if (value.trim()) {
//         onAnswer(q.id, value);
//         const stored = localStorage.getItem("questions");
//         let allQuestions = stored ? JSON.parse(stored) : [];
//         allQuestions = allQuestions.map(quest =>
//           quest.id === q.id ? { ...quest, answered: true } : quest
//         );
//         localStorage.setItem("questions", JSON.stringify(allQuestions));
//       }
//       e.target.reset();
//     }
//   };

//   return (
//     <div>
//       <h2 className="tasks-title">Tasks</h2>
//       <div className="tasks-list">
//         {/* Unanswered cards */}
//         {unanswered.map((q) => (
//           <div className="card-blue task-card" key={q.id}>
//             <div className="task-question">{q.title}</div>
//             <form onSubmit={e => handleSubmit(e, q)}>
//               {q.answerType === "multipleChoice" ? (
//                 // <div>
//                 //   {q.answer.map((option, idx) => (
//                 //     <label key={idx} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
//                 //       <input
//                 //         type="checkbox"
//                 //         name={`mcq-${q.id}`}
//                 //         checked={mcqSelections[q.id] === idx}
//                 //         onChange={() =>
//                 //           setMcqSelections(prev => ({ ...prev, [q.id]: idx }))
//                 //         }
//                 //         style={{ marginRight: 8 }}
//                 //       />
//                 //       {option.value}
//                 //     </label>
//                 //   ))}
//                 //   <button type="submit" className="task-submit-btn" style={{ marginTop: 8 }}>
//                 //     Submit
//                 //   </button>
//                 // </div>

//                 // <div className="tasks-mcq-options-container">
//                 //   {q.answer.map((option, idx) => (
//                 //     <div className="tasks-mcq-option-row" key={idx}>
//                 //       <input
//                 //         type="checkbox"
//                 //         name={`mcq-${q.id}`}
//                 //         checked={mcqSelections[q.id] === idx}
//                 //         onChange={() =>
//                 //           setMcqSelections(prev => ({ ...prev, [q.id]: idx }))
//                 //         }
//                 //       />
//                 //       <span>{option.value}</span>
//                 //     </div>
//                 //   ))}
//                 //   <button type="submit" className="task-submit-btn">
//                 //     Submit
//                 //   </button>
//                 // </div>

//                 <div className="tasks-mcq-options-container">
//                   {q.answer.map((option, idx) => (
//                     <label className="tasks-custom-radio-label tasks-mcq-option-row" key={idx}>
//                       <input
//                         type="radio"
//                         name={`mcq-${q.id}`}
//                         checked={mcqSelections[q.id] === idx}
//                         onChange={() =>
//                           setMcqSelections(prev => ({ ...prev, [q.id]: idx }))
//                         }
//                         className="tasks-custom-radio-input"
//                       />
//                       <span className="tasks-custom-radio-box"></span>
//                       <span>{option.value}</span>
//                     </label>
//                   ))}
//                   <button type="submit" className="task-submit-btn">
//                     Submit
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <input
//                     type="text"
//                     name={`answer-${q.id}`}
//                     placeholder="Your answer"
//                     className="task-input"
//                     autoComplete="off"
//                   />
//                   <button type="submit" className="task-submit-btn">
//                     Submit
//                   </button>
//                 </>
//               )}
//             </form>
//           </div>
//         ))}
//         {/* Answered cards */}
//         {answered.map((q) => (
//           <div className="card-blue task-card" key={q.id}>
//             <div className="task-question">{q.title}</div>
//             <div className="task-answered">
//               <span>Answered:</span>{" "}
//               <span>
//                 {/* {q.answerType === "multipleChoice"
//                   ? q.answer[answers[q.id]]?.value || "-"
//                   : answers[q.id]} */}
//                   {q.answerType === "multiple"
//           ? Array.isArray(answers[q.id])
//             ? answers[q.id].join(", ")
//             : answers[q.id]
//           : answers[q.id]}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tasks;







import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tasks = ({ answers, onAnswer, questions }) => {
  const [mcqSelections, setMcqSelections] = useState({}); 

  const unanswered = questions.filter(q => !answers[q.id]);
  const answered = questions.filter(q => answers[q.id]);

  const handleSubmit = (e, q) => {
    e.preventDefault();

    if (q.answerType === "multipleChoice") {
    
      const selected = mcqSelections[q.id];
      if (selected === undefined || selected === null || selected.length === 0) {
        toast.error("Please select an option before submitting.");
        return;
      }

      // onAnswer(q.id, selected);
      onAnswer(q.id, q.answer[selected]?.value);
      toast.success(`Answer submitted for: "${q.title.substring(0, 30)}${q.title.length > 30 ? '...' : ''}"`);

      const stored = localStorage.getItem("questions");
      let allQuestions = stored ? JSON.parse(stored) : [];
      allQuestions = allQuestions.map(quest =>
        quest.id === q.id ? { ...quest, answered: true } : quest
      );
      localStorage.setItem("questions", JSON.stringify(allQuestions));
      setMcqSelections(prev => ({ ...prev, [q.id]: undefined }));
    } else {
 
      const value = e.target.elements[`answer-${q.id}`].value;
      if (value.trim()) {
        onAnswer(q.id, value);
        toast.success(`Answer submitted for: "${q.title.substring(0, 30)}${q.title.length > 30 ? '...' : ''}"`);
        
        const stored = localStorage.getItem("questions");
        let allQuestions = stored ? JSON.parse(stored) : [];
        allQuestions = allQuestions.map(quest =>
          quest.id === q.id ? { ...quest, answered: true } : quest
        );
        localStorage.setItem("questions", JSON.stringify(allQuestions));
      } else {
        toast.error("Please enter an answer before submitting.");
      }
      e.target.reset();
    }
  };

  return (
    <div>
      <h2 className="tasks-title">Tasks</h2>
      <div className="tasks-list">
        {/* Unanswered cards */}
        {unanswered.map((q) => (
          <div className="card-blue task-card" key={q.id}>
            <div className="task-question">{q.title}</div>
            <form onSubmit={e => handleSubmit(e, q)}>
              {q.answerType === "multipleChoice" ? (
                <div className="tasks-mcq-options-container">
                  {q.answer.map((option, idx) => (
                    <label className="tasks-custom-radio-label tasks-mcq-option-row" key={idx}>
                      <input
                        type="radio"
                        name={`mcq-${q.id}`}
                        checked={mcqSelections[q.id] === idx}
                        onChange={() =>
                          setMcqSelections(prev => ({ ...prev, [q.id]: idx }))
                        }
                        className="tasks-custom-radio-input"
                      />
                      <span className="tasks-custom-radio-box"></span>
                      <span>{option.value}</span>
                    </label>
                  ))}
                  <button type="submit" className="task-submit-btn">
                    Submit
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    name={`answer-${q.id}`}
                    placeholder="Your answer"
                    className="task-input"
                    autoComplete="off"
                  />
                  <button type="submit" className="task-submit-btn">
                    Submit
                  </button>
                </>
              )}
            </form>
          </div>
        ))}
        {/* Answered cards */}
        {answered.map((q) => (
          <div className="card-blue task-card" key={q.id}>
            <div className="task-question">{q.title}</div>
            <div className="task-answered">
              <span>Answered:</span>{" "}
              <span>
                  {q.answerType === "multiple"
          ? Array.isArray(answers[q.id])
            ? answers[q.id].join(", ")
            : answers[q.id]
          : answers[q.id]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;













