import React, { useState } from "react";

const Tasks = ({ answers, onAnswer, questions }) => {
  const [mcqSelections, setMcqSelections] = useState({}); 

  const unanswered = questions.filter(q => !answers[q.id]);
  const answered = questions.filter(q => answers[q.id]);

  const handleSubmit = (e, q) => {
    e.preventDefault();

    if (q.answerType === "multipleChoice") {
    
      const selected = mcqSelections[q.id];
      if (selected === undefined || selected === null || selected.length === 0) return;

      // onAnswer(q.id, selected);
      onAnswer(q.id, q.answer[selected]?.value);

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
        const stored = localStorage.getItem("questions");
        let allQuestions = stored ? JSON.parse(stored) : [];
        allQuestions = allQuestions.map(quest =>
          quest.id === q.id ? { ...quest, answered: true } : quest
        );
        localStorage.setItem("questions", JSON.stringify(allQuestions));
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