import React from "react"

function GameTitleScreen({ goTo }) {
   return (
      <div className="screen active game-title-screen">
         <h2 className="warm-up-title">Warm up: Mystery Box</h2>
         <div className="instructions">
            <p>
               1. There are two teams that take turns choosing a box and
               answering a question.
            </p>
            <p>
               2. After answering correctly, the team must decide whether to{" "}
               <strong
                  style={{
                     color: "#28a745",
                  }}
               >
                  KEEP THE BOX
               </strong>{" "}
               or{" "}
               <strong
                  style={{
                     color: "#dc3545",
                  }}
               >
                  GIVE THE BOX
               </strong>{" "}
               to the other team.
            </p>
            <p>
               3. The points for the box will be revealed and awarded to the
               team that either keeps the box or gives it to the other.
            </p>
            <p>4. The team with the most points at the end of the game wins!</p>
         </div>
         <button onClick={() => goTo("boxSelection")}>Start Game</button>
      </div>
   )
}

export default GameTitleScreen
