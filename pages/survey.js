// pages/index.js or any other page
import React, { useState } from 'react';
import MultipleChoiceCard from '../components/SurveyModel';
import { useUser } from "@clerk/nextjs";


const questionData = [
  {
  id: 1,
  question: "What are your dietary reqestrictions? (Select all the apply)",
  choices: ["vegetarian", "vegan", "glutenFree", "dairyFree"],
  },
  {
  id: 2,
  question: "Which cuisines interst you? (Select all that apply)",
  choices: ["Greek", "Middle Eastern", "Asian", "Italian", "American", "Mediterranean", "Cajun", "English", "British", "Mexican", "Irish", "Chinese", "Southern", "European", "Scottish", "French", "Creole", "All"],
  },
  {
  id: 3,
  question: "How much time is the max you are willing to spend cooking? (minutes)",
  choices: [25, 50, 75, 100, 125, 150]
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
