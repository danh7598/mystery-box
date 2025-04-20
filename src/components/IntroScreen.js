import React from "react"

function IntroScreen({ goTo }) {
   return (
      <div className="screen active intro-screen">
         <div className="intro-image-container">
            <img
               src={require("../assets/intro-image.png")}
               alt="intro"
               className="intro-image"
            />
         </div>
         <h1>Movies Through Time</h1>
         <h3>Explore the magic of cinema and share your thoughts!</h3>
         <button onClick={() => goTo("gameTitle")}>Next</button>
      </div>
   )
}

export default IntroScreen
