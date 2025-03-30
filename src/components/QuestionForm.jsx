// Importing React hooks: useState, useEffect, and useMemo from React
import { useState, useEffect, useMemo } from "react";

// QuestionForm component - Handles the display of a trivia question, user's answer selection, and error handling.
function QuestionForm({
  questions, // Array of questions to display
  setUserAnswer, // Function to set the user's selected answer
  error, // Error message state
  setError, // Function to set the error message
  handleHome, // Function to navigate back to the home page
  formData, // Contains user's form data (category, difficulty)
  fetchCategories, // Function to fetch categories
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null); // State to hold the selected answer
  const [categoryMap, setCategoryMap] = useState(null); // State to store the mapping of category IDs to category names

  // useEffect hook to fetch categories and map their IDs to names
  useEffect(() => {
    const mapCategoriesToId = async () => {
      const categories = await fetchCategories(); // Fetching categories from API
      const mapped = {}; // Create an empty object to store category ID to name mapping
      categories.forEach((category) => {
        mapped[category.id] = category.name; // Assign category ID as key and category name as value
      });
      setCategoryMap(mapped); // Update the state with the mapped category data
    };
    mapCategoriesToId(); // Execute the function to fetch and map categories
  }, [fetchCategories]); // Dependency array ensures this effect runs only once when fetchCategories changes

  // useMemo hook to capitalize the first letter of the difficulty value
  const capitalizeDifficultyValue = useMemo(() => {
    const difficulty = formData.difficulty || ""; // Default to empty string if no difficulty is selected
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1); // Capitalize the first letter of the difficulty
  }, [formData.difficulty]); // Recalculate when formData.difficulty changes

  // useEffect hook to handle missing questions based on the categoryMap and formData
  useEffect(() => {
    if (categoryMap && (!questions || questions.length === 0)) {
      // Check if categoryMap exists and questions are missing
      const categoryName = categoryMap[formData.category]; // Get the category name from the map using formData.category as key
      if (categoryName) {
        setError(
          // Set an error message if no questions are found for the selected category and difficulty
          `No questions available for ${categoryName} with difficulty set to ${capitalizeDifficultyValue}`
        );
      }
    }
  }, [questions, setError, formData, categoryMap, capitalizeDifficultyValue]); // Dependencies trigger re-evaluation if any of these values change

  // handleSubmit function - Triggered when the user submits their answer
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!selectedAnswer) {
      // If no answer is selected, show an error message
      setError("Please select an answer!");
      return;
    }
    setUserAnswer(selectedAnswer); // Set the user's answer if one is selected
  };

  // showAnswers function - Returns the list of answers (both correct and incorrect answers)
  const showAnswers = () => {
    if (!questions || questions.length === 0) return []; // If there are no questions, return an empty array
    return [...questions[0].incorrect_answers, questions[0].correct_answer]; // Combine incorrect answers and correct answer into a single array
  };

  // If the categoryMap is null (loading), show a loading message
  if (categoryMap === null) {
    return <p>Loading category information...</p>;
  }

  return (
    <div>
      <h2>Question</h2>
      <p>Category: {categoryMap[formData.category]}</p>{" "}
      {/* Display the category name based on the category ID */}
      <p>Difficulty: {capitalizeDifficultyValue}</p>{" "}
      {/* Display the capitalized difficulty value */}
      {/* Check if there are questions available */}
      {questions && questions.length > 0 ? (
        <>
          <p dangerouslySetInnerHTML={{ __html: questions[0].question }} />{" "}
          {/* Display the question, ensuring HTML content is rendered */}
          <form onSubmit={handleSubmit}>
            {" "}
            {/* Form to submit the user's answer */}
            {showAnswers().map(
              (
                answer,
                index // Iterate over the answers (incorrect + correct)
              ) => (
                <label key={index}>
                  <input
                    type="radio" // Radio buttons for selecting answers
                    name="answer" // Name for the radio group
                    value={answer} // Value of the answer
                    onChange={() => setSelectedAnswer(answer)} // Update the selected answer on change
                  />
                  <span dangerouslySetInnerHTML={{ __html: answer }} />{" "}
                  {/* Render answer with HTML formatting */}
                </label>
              )
            )}
            <button type="submit">Submit Answer</button>{" "}
            {/* Button to submit the answer */}
          </form>
        </>
      ) : (
        <>
          <p>Loading question...</p>{" "}
          {/* If no question is available, show a loading message */}
          {formData.category && categoryMap[formData.category] ? ( // If category is found, show a message indicating no questions for the selected category
            <p>
              There are no questions for {categoryMap[formData.category]} with a
              difficulty of {capitalizeDifficultyValue}
            </p>
          ) : (
            <p>Category not found</p>
          )}
        </>
      )}
      {/* If there is an error, display a "Back Home" button */}
      {error && (
        <button className="home-button" onClick={handleHome}>
          Back Home
        </button>
      )}
    </div>
  );
}

export default QuestionForm;
