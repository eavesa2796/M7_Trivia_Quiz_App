// Importing React hooks: useEffect and useState from React
import { useEffect, useState } from "react";

// Results component - Displays the results of the quiz, including the user's score and high score.
function Results({
  userAnswer, // The user's selected answer
  questions, // Array of questions used in the quiz
  formData, // Contains user's form data (e.g., firstName)
  restartQuiz, // Function to restart the quiz
  score, // Current score of the user
  highscore, // Highest score achieved by the user
  setScore, // Function to update the user's score
  setHighscore, // Function to update the user's highscore
}) {
  const [scoreUpdated, setScoreUpdated] = useState(false); // State to track if the score has been updated

  // useEffect hook to update the score based on the user's answer
  useEffect(() => {
    // If no questions are available or the score has already been updated, exit early
    if (!questions || questions.length === 0 || scoreUpdated) return;

    // Check if the user's answer is correct
    const isCorrect = userAnswer === questions[0].correct_answer;

    // Update the score
    setScore((prevScore) => {
      const newScore = isCorrect ? prevScore + 1 : Math.max(prevScore - 1, 0); // Increment score if correct, otherwise decrement (with a minimum of 0)

      // Update the high score if the new score is greater than the current high score
      setHighscore((prevHighscore) => Math.max(prevHighscore, newScore));

      return newScore;
    });

    // Mark that the score has been updated to avoid re-running this effect
    setScoreUpdated(true);
  }, [userAnswer, questions, setScore, setHighscore, scoreUpdated]); // Dependencies - the effect runs when any of these values change

  // If there are no questions, display loading message and the option to restart the quiz
  if (!questions || questions.length === 0) {
    return (
      <>
        <p>Loading results...</p>{" "}
        {/* Message displayed while results are loading */}
        <button onClick={restartQuiz}>Back Home</button>{" "}
        {/* Button to restart the quiz */}
      </>
    );
  }

  // Check if the user's answer was correct
  const isCorrect = userAnswer === questions[0].correct_answer;

  return (
    <div>
      {/* Display the user's name and their quiz results */}
      <h3>Here's how you did, {formData.firstName}.</h3>

      {/* Display the message based on whether the answer was correct */}
      {isCorrect ? (
        <p className="correct">Congrats, you answered correctly! 🎉</p>
      ) : (
        <p className="wrong">Wrong Answer! ❌ You'll get it on the next one!</p>
      )}

      {/* If the answer was wrong, display the correct answer */}
      {!isCorrect && (
        <p>
          The correct answer was:{" "}
          <strong
            dangerouslySetInnerHTML={{ __html: questions[0].correct_answer }}
          />{" "}
          {/* Display the correct answer (with HTML content rendered) */}
        </p>
      )}

      {/* Display the user's current score and high score */}
      <p>Your current score: {score}</p>
      <p>Your high score: {highscore}</p>

      {/* Button to restart the quiz */}
      <button onClick={restartQuiz}>Play Again</button>
    </div>
  );
}

export default Results;
