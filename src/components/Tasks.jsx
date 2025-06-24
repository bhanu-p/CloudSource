
// import React from "react";
// // import questionsData from "../data/questions.json";
// import "../App.css";

// const Tasks = ({ answers, onAnswer, visibleCount }) => {
//   //localStorage.getItem()-pass as json
//   const questions = Array.isArray(questionsData) ? questionsData : [];
//   const visibleQuestions = questions.slice(0, visibleCount);

//   const answered = visibleQuestions.filter(q => answers[q.id]);
//   const unanswered = visibleQuestions.filter(q => !answers[q.id]);

//   return (
//     <div>
//       <h2 className="tasks-title">Tasks</h2>
//       <div className="tasks-list">
//         {/* Unanswered cards */}
//         {unanswered.map((q) => (
//           <div className="card-blue task-card" key={q.id}>
//             <div className="task-question">{q.title}</div>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 const value = e.target.elements[`answer-${q.id}`].value;
//                 if (value.trim()) onAnswer(q.id, value);
//               }}
//             >
//               <input
//                 type="text"
//                 name={`answer-${q.id}`}
//                 placeholder="Your answer"
//                 className="task-input"
//               />
//               <button type="submit" className="task-submit-btn">
//                 Submit
//               </button>
//             </form>
//           </div>
//         ))}
//         {/* Answered cards */}
//         {answered.map((q) => (
//           <div className="card-blue task-card" key={q.id}>
//             <div className="task-question">{q.title}</div>
//             <div className="task-answered">
//               <span>Answered:</span> <span>{answers[q.id]}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tasks;



import React from "react";
import "../App.css";

const Tasks = ({ answers, onAnswer, questions }) => {
  // Only show questions that are assigned (you can filter if needed)
  const unanswered = questions.filter(q => !answers[q.id]);
  const answered = questions.filter(q => answers[q.id]);

  const handleSubmit = (e, q) => {
    e.preventDefault();
    const value = e.target.elements[`answer-${q.id}`].value;
    if (value.trim()) {
      // Update userAnswers in parent
      onAnswer(q.id, value);

      // Update the question's answered status in localStorage
      const stored = localStorage.getItem("questions");
      let allQuestions = stored ? JSON.parse(stored) : [];
      allQuestions = allQuestions.map(quest =>
        quest.id === q.id ? { ...quest, answered: true } : quest
      );
      localStorage.setItem("questions", JSON.stringify(allQuestions));
    }
    e.target.reset();
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
            </form>
          </div>
        ))}
        {/* Answered cards */}
        {answered.map((q) => (
          <div className="card-blue task-card" key={q.id}>
            <div className="task-question">{q.title}</div>
            <div className="task-answered">
              <span>Answered:</span> <span>{answers[q.id]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;