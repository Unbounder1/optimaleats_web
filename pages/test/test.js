// pages/index.js or any other page
import React, { useState } from 'react';
import MultipleChoiceCard from '../../components/SurveyModel';

const questionData = {
  question: "What is the capital of France?",
  choices: ["New York", "London", "Paris", "Berlin"]
};

const HomePage = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleSelectChoice = (choice) => {
    setSelectedChoice(choice); // Store the selected choice
  };

  return (
    <div>
      <h1>Welcome to the Quiz</h1>
      <button onClick={() => setPopupOpen(true)}>Start Quiz</button>
      {selectedChoice && <p>You selected: {selectedChoice}</p>}
      <MultipleChoiceCard
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onSelect={handleSelectChoice}
        question={questionData.question}
        choices={questionData.choices}
      />
    </div>
  );
};

export default HomePage;
