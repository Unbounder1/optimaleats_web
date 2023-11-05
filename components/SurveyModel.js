// components/MultipleChoiceCard.js
import React from 'react';
import styles from './MultipleChoice.module.css'; // Import your styles here


const MultipleChoiceCard = ({ question, choices, isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const handleChoiceSelect = (choice) => {
    onSelect(choice); // Handle the choice selection
    const userId = user.id;
    onClose(); // Close the popup after selection
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.card}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>{question}</h2>
        <ul>
          {choices.map((choice, index) => (
            <li key={index}>
              <button className={styles.choiceButton} onClick={() => handleChoiceSelect(choice)}>
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
