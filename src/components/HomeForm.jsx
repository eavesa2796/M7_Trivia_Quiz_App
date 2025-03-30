// Homeform component - Used for gathering user input (name, category, difficulty) before starting the quiz.
function Homeform({ formData, setFormData, setError, error, fetchQuestions }) {
  // handleChange function - Updates formData state whenever an input field is changed.
  const handleChange = (event) => {
    // Using the spread operator to copy the existing formData and then updating the specific field based on event target.
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // handleSubmit function - Called when the form is submitted. Validates the form fields and fetches questions.
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior (page reload).

    const { firstName, category, difficulty } = formData;
    // If any required field is empty, show an error.
    if (firstName === "" || category === "" || difficulty === "") {
      setError("All fields must be filled out.");
      return;
    }

    // If all fields are filled, fetch questions using the provided fetchQuestions function.
    fetchQuestions();
  };

  return (
    <div>
      <hr className="horizontal-line" />{" "}
      {/* Horizontal line for visual separation */}
      <h2>Welcome to the Trivia Quiz</h2>
      <p>Enter your name and select your category and difficulty:</p>
      {/* Form for user input */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <br />
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName} // Controlled input; value is tied to state (formData.firstName)
          onChange={handleChange} // Updates state on each change
          placeholder="Enter your first name" // Placeholder text
        />
        <br />
        {/* Category Selection */}
        <label htmlFor="category">Category:</label>
        <br />
        <select name="category" id="category" onChange={handleChange}>
          {" "}
          {/* Dropdown for selecting category */}
          <option value="">-- Select Category --</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="21">Sports</option>
          <option value="26">Celebrities</option>
        </select>
        <br />
        {/* Difficulty Selection */}
        <label htmlFor="difficulty">Difficulty:</label>
        <br />
        <select name="difficulty" id="difficulty" onChange={handleChange}>
          {" "}
          {/* Dropdown for selecting difficulty */}
          <option value="">-- Select Difficulty --</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br />
        <br />
        {/* Submit Button */}
        <button type="submit">Take Quiz</button>
        <br />
      </form>
      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
    </div>
  );
}

export default Homeform;
