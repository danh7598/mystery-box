import React from "react";

function BoxSelectionScreen({
  questions,
  setScreen,
  setCurrentQuestionIndex,
  teamScores,
  setQuestions,
  currentTeam,
}) {
  const handleBoxClick = (index) => {
    setCurrentQuestionIndex(index);

    // Mark the selected box as hidden
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index ? { ...q, hidden: true } : q
      )
    );

    setScreen("questionScreen");
  };

  return (
    <div className="screen active box-selection-screen">
      <div className="scoreboard">
        <div
          className={`team-score ${
            currentTeam === "A" ? "current-turn" : ""
          }`}
        >
          Team A: {teamScores.A}
        </div>
        <div
          className={`team-score ${
            currentTeam === "B" ? "current-turn" : ""
          }`}
        >
          Team B: {teamScores.B}
        </div>
      </div>
      <div className="box-grid">
        {questions.map((question, index) =>
          !question.hidden ? (
            <div
              key={index}
              className="box"
              onClick={() => handleBoxClick(index)}
            >
              {index + 1}
            </div>
          ) : (
            <div key={index} className="box hidden"></div>
          )
        )}
      </div>
      <button
        style={{ marginTop: "40px" }}
        className="discussion-button"
        onClick={() => setScreen("discussionScreen")}
      >
        Discussion
      </button>
    </div>
  );
}

export default BoxSelectionScreen;