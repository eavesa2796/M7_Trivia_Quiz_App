// Import necessary dependencies and components
import { useState, useEffect } from "react";
import Homeform from "./components/HomeForm";
import QuestionForm from "./components/QuestionForm";
import Results from "./components/Results";
import "./App.css";
import "./styles/HomeForm.css";
import "./styles/QuestionForm.css";
import "./styles/Results.css";

// API endpoints
const API_URL = "https://opentdb.com/api.php?amount=50&type=multiple";
const CATEGORIES_URL = "https://opentdb.com/api_category.php";
const TOKEN = "https://opentdb.com/api_token.php?command=request";

// Main App Component
function App() {
  // State Variables
  const [formData, setFormData] = useState({
    // Stores user's name, selected category, and difficulty
    firstName: "",
    category: "",
    difficulty: "",
  });

  const [error, setError] = useState(""); // Holds error messages
  const [questions, setQuestions] = useState(null); // Stores questions fetched from API
  const [token, setToken] = useState(null); // Stores session token from API
  const [userAnswer, setUserAnswer] = useState(false); // Tracks if the user has answered
  const [score, setScore] = useState(0); // Tracks the current score
  const [highscore, setHighscore] = useState(0); // Tracks the highest score
  const [loading, setLoading] = useState(false); // Controls loading state

  // Fetch token on component mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(TOKEN);
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error("Error fetching token: ", error);
        setError("Error fetching token.");
      }
    };
    fetchToken();
  }, []);

  // Fetch available trivia categories from API
  const fetchCategories = async () => {
    try {
      const response = await fetch(CATEGORIES_URL);
      const data = await response.json();
      const arrOfObjs = data.trivia_categories;
      return arrOfObjs; // Returns array of category objects
    } catch (error) {
      console.error("Didn't fetch the data:", error);
    }
  };

  // Fetch trivia questions based on form data
  const fetchQuestions = async () => {
    if (!token) return; // Prevent fetch if token is not ready
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}&category=${formData.category}&difficulty=${formData.difficulty}&token=${token}`
      );
      const data = await response.json();

      // Handle case when no questions are available
      if (data.response_code !== 0) {
        setError(
          "No questions available for this category & difficulty. Please select a different category and difficulty."
        );
        setQuestions([]); // Set empty array to avoid errors
        setLoading(false);
        return;
      }

      setQuestions(data.results); // Store fetched questions
      setError(null);
      setLoading(false);
    } catch (error) {
      setError(`Error fetching questions: ${error.message}`);
      setLoading(false);
    }
  };

  // Restart the quiz and reset all related states
  const restartQuiz = () => {
    setFormData({
      firstName: "",
      category: "",
      difficulty: "",
    });
    setQuestions(null); // Clear questions
    setUserAnswer(false); // Reset answer state
    setError(null); // Clear errors
    setScore((prevScore) => prevScore); // Keeps score unchanged (might want to reset it?)
  };

  // Handle returning to Home screen
  const handleHome = (event) => {
    event.preventDefault();
    setQuestions(null); // Remove questions to trigger Homeform
  };

  // Render the UI
  return (
    <div className="app-wrapper">
      <div className="tablet-wrapper">
        <div className="app-container">
          <h1>
            Trivia Quiz <br />
            <span className="subtitle">How Much Do You Know?</span>
          </h1>

          {/* Score Display */}
          <div className="score-wrapper">
            <p>Score: {score}</p>
            <p>High Score: {highscore}</p>
          </div>

          {/* Loading State */}
          {loading && <p>Loading questions...</p>}

          {/* Conditional Rendering of Components */}
          {!questions ? (
            <Homeform
              formData={formData}
              setFormData={setFormData}
              setError={setError}
              error={error}
              fetchQuestions={fetchQuestions}
            />
          ) : !userAnswer ? (
            <QuestionForm
              questions={questions}
              setUserAnswer={setUserAnswer}
              error={error}
              setError={setError}
              handleHome={handleHome}
              formData={formData}
              fetchCategories={fetchCategories}
            />
          ) : (
            <Results
              userAnswer={userAnswer}
              questions={questions}
              formData={formData}
              score={score}
              setScore={setScore}
              highscore={highscore}
              setHighscore={setHighscore}
              restartQuiz={restartQuiz}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
