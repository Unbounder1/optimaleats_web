import React, { useState } from 'react';
import styles from './MultipleChoice.module.css';

const MultipleChoiceCard = ({ questions, isOpen, onClose, userId }) => {
  // State to keep track of the current question index and the user's answers
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState({});

  if (!isOpen || !questions.length) return null;

  // Move to the next question
  const handleNext = () => {
    setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1));
  };

  // Toggle choice selection for the current question
  const handleChoiceSelect = (questionId, choice) => {
    // Toggle the selected choice
    setAnswers((prevAnswers) => {
      const currentChoices = prevAnswers[questionId] || [];
      const newChoices = currentChoices.includes(choice)
        ? currentChoices.filter((c) => c !== choice) // Unselect
        : [...currentChoices, choice]; // Select

      return {
        ...prevAnswers,
        [questionId]: newChoices,
      };
    });
  };

  // Submit all answers to the server
  const handleSubmit = async () => {
    console.log({ userId, answers });

    const response = await fetch('../api/record-choice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, answers }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      onClose();
      alert("Profile Complete");
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  // Get the current question based on the index
  const currentQuestion = questions[currentQuestionIndex];

  const isChoiceSelected = (choice) => {
    return answers[currentQuestion.id]?.includes(choice);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.card}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>{currentQuestion.question}</h2>
        <ul>
          {currentQuestion.choices.map((choice, index) => (
            <li key={index}>
              <button
                className={`${styles.choiceButton} ${isChoiceSelected(choice) ? styles.selected : ''}`}
                onClick={() => handleChoiceSelect(currentQuestion.id, choice)}
              >
                {choice}
              </button>
            </li>
          ))}
        </ul>
          {currentQuestionIndex < questions.length - 1 ? (
            <button onClick={handleNext} className={styles.navButton}>
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className={styles.navButton}>
              Submit
            </button>
          )}
        </div>
      </div>
);
};

export default MultipleChoiceCard;