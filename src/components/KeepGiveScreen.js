import React from "react";

function KeepGiveScreen({
  question,
  currentTeam,
  updateScores,
  setScreen,
  setResult,
  switchTeam,
}) {
  const handleChoice = (choice) => {
    let resultMessage = "";
    if (choice === "keep") {
      updateScores(currentTeam, question.points);
      resultMessage = `Team ${currentTeam} kept the box and earned ${question.points} points!`;
    } else if (choice === "give") {
      const otherTeam = currentTeam === "A" ? "B" : "A";
      updateScores(otherTeam, question.points);
      resultMessage = `Team ${currentTeam} gave the box to Team ${otherTeam}, and they earned ${question.points} points!`;
    }

    setResult(resultMessage); // Set the result message for the ResultScreen
    switchTeam();
    setScreen("resultScreen"); // Navigate to the ResultScreen
  };

  return (
    <div className="screen active keep-give-screen">
      <h2>Keep or Give the Box?</h2>
      <div className="button-container">
        <button className="keep-button" onClick={() => handleChoice("keep")}>
          Keep
        </button>
        <button className="give-button" onClick={() => handleChoice("give")}>
          Give
        </button>
      </div>
    </div>
  );
}

export default KeepGiveScreen;