import React from "react";

function ResultScreen({ questionPoints, resultMessage, setScreen }) {
  const getScoreStyle = (score) => ({
    color: score >= 0 ? "green" : "red",
  });

  return (
    <div className="screen active result-screen">
      <div className="score-container">
        <div className="score" style={getScoreStyle(questionPoints)}>
          {questionPoints >= 0 ? `+${questionPoints}` : questionPoints}
        </div>
        <p className="team-message">{resultMessage}</p>
      </div>
      <button onClick={() => setScreen("boxSelection")}>Back to Box Selection</button>
    </div>
  );
}

export default ResultScreen;