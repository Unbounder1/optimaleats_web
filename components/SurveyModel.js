import React, { useState } from 'react';
import styles from './MultipleChoice.module.css';

const MultipleChoiceCard = ({ questions, isOpen, onClose, userId }) => {
  // State to keep track of the current question index and the user's answers
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  if (!isOpen || !questions.length) return null;

  // Handle the choice selection and move to the next question
  const handleChoiceSelect = async (choice) => {
    const answerWithId = {
      questionId: questions[currentQuestionIndex].id,
      answer: choice
    };

    const newAnswers = [...answers, answerWithId];
    setAnswers(newAnswers);
    // go next question
    if (currentQuestionIndex < questions.length -1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log({answer : newAnswers})
    } else {
      console.log(JSON.stringify({ userId, answers: newAnswers }))
      // If this was the last question, send answers to the server
      const response = await fetch('../api/record-choice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId, answers: newAnswers }),
      }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        onClose();
        alert("Profile Complete")
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    }
  };

  // Get the current question based on the index
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.backdrop}>
      <div className={styles.card}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>{currentQuestion.question}</h2>
        <ul>
          {currentQuestion.choices.map((choice, index) => (
            <li key={index}>
              <button
                className={styles.choiceButton}
                onClick={() => handleChoiceSelect(choice)}
              >
                {choice}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultipleChoiceCard;
