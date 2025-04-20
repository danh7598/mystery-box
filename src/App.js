import React, { useEffect, useState } from "react"
import IntroScreen from "./components/IntroScreen"
import GameTitleScreen from "./components/GameTitleScreen"
import BoxSelectionScreen from "./components/BoxSelectionScreen"
import QuestionScreen from "./components/QuestionScreen"
import KeepGiveScreen from "./components/KeepGiveScreen"
import ResultScreen from "./components/ResultScreen"
import "./index.css"
import DiscussionScreen from "./components/DiscussionScreen"

function App() {
   const [screen, setScreen] = useState("intro")
   const [questions, setQuestions] = useState([])
   const [teamScores, setTeamScores] = useState({ A: 0, B: 0 })
   const [currentTeam, setCurrentTeam] = useState("A")
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null)
   const [resultMessage, setResult] = useState("")

   const switchTeam = () => {
      setCurrentTeam(currentTeam === "A" ? "B" : "A")
   }

   useEffect(() => {
      const getListQuestions = async () => {
         const response = await fetch(
            "https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=16&region=VN&difficulty=easy",
            {
               headers: {
                  "Content-Type": "application/json",
               },
            }
         )
         const data = await response.json()

         // Generate random points for each question
         const generatePoints = (numQuestions) => {
            const points = []
            let total = 0

            // Assign random points to all questions except the last one
            for (let i = 0; i < numQuestions - 1; i++) {
               let point
               do {
                  point = Math.floor(Math.random() * 21 - 10) * 10 // Random number between -100 and 100, divisible by 10
               } while (point === 0) // Ensure the point is never 0
               points.push(point)
               total += point
            }

            // Calculate the last question's points to balance the total to 0
            let lastPoint = -total

            // Ensure the last point is within the valid range, divisible by 10, and not 0
            if (
               lastPoint >= -100 &&
               lastPoint <= 100 &&
               lastPoint % 10 === 0 &&
               lastPoint !== 0
            ) {
               points.push(lastPoint)
            } else {
               // If not valid, re-run the algorithm
               return generatePoints(numQuestions)
            }

            return points
         }

         const points = generatePoints(16) // Generate points for 16 questions

         // Shuffle answers and format the questions with points
         const formattedQuestions = data.map((question, index) => {
            const allAnswers = [
               ...question.incorrectAnswers,
               question.correctAnswer,
            ]

            const shuffleArray = (array) => {
               const shuffled = [...array] // Create a copy of the array
               for (let i = shuffled.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1)) // Random index
                  ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] // Swap
               }
               return shuffled
            }

            const shuffledAnswers = shuffleArray(allAnswers)

            // Find the new index of the correct answer
            const correctAnswerIndex = shuffledAnswers.indexOf(
               question.correctAnswer
            )

            return {
               question: question.question,
               choices: shuffledAnswers,
               answer: correctAnswerIndex,
               points: points[index], // Assign the generated points
            }
         })

         setQuestions(formattedQuestions)
      }

      getListQuestions()
   }, [])

   const updateScores = (team, points) => {
      setTeamScores((prevScores) => ({
         ...prevScores,
         [team]: prevScores[team] + points,
      }))
   }

   return (
      <div className="App">
         <div
            className={screen === "intro" ? "screen active" : "screen inactive"}
         >
            <IntroScreen goTo={setScreen} />
         </div>
         <div
            className={
               screen === "gameTitle" ? "screen active" : "screen inactive"
            }
         >
            <GameTitleScreen goTo={setScreen} />
         </div>
         <div
            className={
               screen === "boxSelection" ? "screen active" : "screen inactive"
            }
         >
            <BoxSelectionScreen
               questions={questions}
               setQuestions={setQuestions}
               setScreen={setScreen}
               setCurrentQuestionIndex={setCurrentQuestionIndex}
               teamScores={teamScores}
               currentTeam={currentTeam}
            />
         </div>
         <div
            className={
               screen === "questionScreen" ? "screen active" : "screen inactive"
            }
         >
            <QuestionScreen
               question={questions[currentQuestionIndex]}
               setQuestions={setQuestions}
               setScreen={setScreen}
               currentQuestionIndex={currentQuestionIndex}
               switchTeam={switchTeam}
            />
         </div>
         <div
            className={
               screen === "keepGiveScreen" ? "screen active" : "screen inactive"
            }
         >
            <KeepGiveScreen
               question={questions[currentQuestionIndex]}
               currentTeam={currentTeam}
               updateScores={updateScores}
               setScreen={setScreen}
               setResult={setResult}
               switchTeam={switchTeam}
            />
         </div>
         <div
            className={
               screen === "resultScreen" ? "screen active" : "screen inactive"
            }
         >
            <ResultScreen
               questionPoints={questions?.[currentQuestionIndex]?.points}
               resultMessage={resultMessage}
               setScreen={setScreen}
            />
         </div>
         <div
            className={
               screen === "discussionScreen"
                  ? "screen active"
                  : "screen inactive"
            }
         >
            <DiscussionScreen setScreen={setScreen} />
         </div>
      </div>
   )
}

export default App
