# Trivia Quiz Application

A fun and interactive trivia quiz app where users can select a category and difficulty, answer questions, and see their results at the end. The app keeps track of the user's current score and high score.

## Features

- User can input their name, select a category, and choose the difficulty level before starting the quiz.
- The app fetches trivia questions based on the selected category and difficulty.
- Displays questions with multiple-choice answers.
- Tracks the user's score and updates high scores.
- Displays the result of the answer (correct/incorrect) and shows the correct answer when necessary.
- Option to restart the quiz after completing.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Hooks**: `useState`, `useEffect`, and `useMemo` for managing state and side effects.
- **HTML** and **CSS** for layout and styling.
- **JavaScript**: For logic and functionality (including fetching trivia questions and managing state).

## Getting Started

To get the project up and running locally on your machine, follow these steps:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (which comes with npm)
- A modern web browser

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/trivia-quiz-app.git
   ```

2. Navigate into the project directory:
   ```bash
   cd trivia-quiz-app
   ```

3. Install the project dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm start
   ```

   This will open the app in your default web browser, typically at `http://localhost:3000`.

## How to Use

1. **Start the Quiz**:
   - Enter your name in the input field.
   - Select your preferred category and difficulty from the dropdowns.
   - Click the "Take Quiz" button to start the quiz.

2. **Answer Questions**:
   - Read each question and select an answer.
   - Click "Submit Answer" to submit your answer.
   - The result will show if your answer was correct or incorrect.

3. **View Results**:
   - At the end of the quiz, your score will be displayed along with your high score.
   - If you wish to restart the quiz, click "Play Again".

## File Structure

```
/public
  - index.html
/src
  - App.js                   # Main application component
  - HomeForm.js              # Form to select name, category, and difficulty
  - QuestionForm.js          # Displays the trivia question and answers
  - Results.js               # Displays the results of the quiz (score, high score, etc.)
  - index.js                 # Entry point of the application
  - styles.css               # Styling for the components
/package.json
README.md
```

## Contribution

If you'd like to contribute to this project, feel free to fork the repository and submit pull requests. Be sure to follow the repository's code style and write tests for any new features.

### How to contribute:
1. Fork the repository
2. Clone your forked repository:
   ```bash
   git clone https://github.com/yourusername/trivia-quiz-app.git
   ```
3. Create a feature branch:
   ```bash
   git checkout -b feature-branch
   ```
4. Commit your changes and push to your fork:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin feature-branch
   ```
5. Open a pull request to the `main` branch of the original repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

