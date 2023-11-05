// pages/index.js or any other page
import React, { useState } from 'react';
import MultipleChoiceCard from '../../components/SurveyModel';
import { useUser } from "@clerk/nextjs";


const questionData = [
  {
  id: "question1",
  question: "What is the capital of France?",
  choices: ["New York", "London", "Paris", "Berlin"],
  },
  {
    id: "question2",
    question: "Whats the biggest?",
    choices: ["New York", "London", "Paris", "Berlin"],
  },
  {
    id: "question3",
    question: "Why did we do the hackathon?",
    choices: ["I don't know", "Im having fun", "_-_"],
  },

];

const HomePage = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);

  //get user
  const { user } = useUser();
  const userId = user?.id;

  const handleSelectChoice = (choice) => {
    // Assuming 'setAnswers' is defined elsewhere and manages the state for answers
    setAnswers((prevAnswers) => [...prevAnswers, choice])
  };

  const closeAndResetQuiz = () => {
    setPopupOpen(false);
    setSelectedChoice(null); // It should be setSelectedChoice not setSelectChoice
  };

  return (
    <div>
      <h1>Welcome to the Quiz</h1>
      <button onClick={() => setPopupOpen(true)}>Start Quiz</button>
      {selectedChoice && <p>You selected: {selectedChoice}</p>}
      <MultipleChoiceCard
        isOpen={isPopupOpen}
        onClose={closeAndResetQuiz}
        onSelect={handleSelectChoice}
        questions={questionData}
        userId={userId}
      />
    </div>
  );
};

export default HomePage;
