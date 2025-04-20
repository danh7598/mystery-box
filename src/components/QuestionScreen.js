import React, { useState, useEffect } from "react";

function QuestionScreen({
  question,
  setScreen,
  currentQuestionIndex,
  setQuestions,
  switchTeam,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
  }, [currentQuestionIndex]);

  const handleAnswer = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);

    if (selectedIndex === question.answer) {
      setScreen("keepGiveScreen");
    } else {
      setShowCorrectAnswer(true); // Highlight the correct answer
      setTimeout(() => {
        // After 5 seconds, switch team and go back to box selection
        switchTeam();
        setScreen("boxSelection");
      }, 5000);
    }

    // Mark the question as hidden
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === currentQuestionIndex ? { ...q, hidden: true } : q
      )
    );
  };

  if (!question) {
    return <div className="screen question-screen">Loading...</div>;
  }

  return (
    <div className="screen active question-screen">
      <h2>{question.question}</h2>
      <div className="answers-grid">
        {question.choices.map((choice, index) => (
          <button
            key={index}
            className={`answer-button ${
              showCorrectAnswer && index === question.answer
                ? "correct-answer"
                : selectedAnswer === index
                ? "wrong-answer"
                : ""
            }`}
            onClick={() => handleAnswer(index)}
            disabled={showCorrectAnswer} // Disable buttons after an answer is selected
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionScreen;