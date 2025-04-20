import React from "react"

function DiscussionScreen() {
   return (
      <div className="screen active discussion-screen">
         <h1 className="discussion-title">DISCUSSION: Movies Through Time</h1>
         <ul className="discussion-questions">
            <li>
               <span className="question-index">
                  1. What was the first movie you remember watching?
               </span>
            </li>
            <li>
               <span className="question-index">
                  2. Do you prefer movies with a happy ending or a sad ending?
               </span>
            </li>
            <li>
               <span className="question-index">
                  3. If you could live in a movie world, which one would you
                  choose?
               </span>
            </li>
            <li>
               <span className="question-index">
                  4. Is there a movie that changed the way you think about life?
               </span>
            </li>
            <li>
               <span className="question-index">
                  5. Recommend one movie everyone should watch – and explain
                  why.
               </span>
            </li>
         </ul>
      </div>
   )
}

export default DiscussionScreen
