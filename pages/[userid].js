// pages/check-completion/[userId].js
import { MongoClient } from 'mongodb';
import React, { useEffect, useState } from 'react';
export async function getServerSideProps(context) {
  const userid = context.params.userid;
  let userCompleted = false;

  try {
    // Connect to the database
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('userinfo');

    // Query the database for the user's completion status
    const userStatus = await db.collection('userid').findOne({ userId: userid });
    userCompleted = userStatus?.complete === true;

    // Close the database connection
    await client.close();
  } catch (error) {
    console.error('Database connection error:', error);
    // Handle the error appropriately
  }

  if (!userCompleted) {
    // Redirect to the home page if the completion status is not true
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  // If completed, return the status (or perform additional actions)
  return {
      redirect: {
        destination: `/api/read-json`,
        permanent: false,
        
      },
  };
    //props: { userCompleted, userid },  You can pass the status to the page if needed
}

// The page component itself (which will not render anything in the case of a redirect)
export default function CheckCompletionPage({ userCompleted, userid }) {
  const [inputData, setInputData] = useState(null);
  const [databaseData, setDatabaseData] = useState(null);
  const [randomAnswer, setRandomAnswer] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await GetData(userid);
      if (!data.error) {
        setInputData(data.inputdata);
        setDatabaseData(data.database);
      } else {
        console.error(data.error);
      }
    }
    fetchData();
  }, [userid]);
  useEffect(() => {
    if (inputData && inputData.answers) {
      // Assuming inputData.answers is an object where each key is a question and the value is an array of answers
      // Randomly select a question first
      const questionKeys = Object.keys(inputData.answers);
      const randomQuestionKey = getRandomElement(questionKeys);
      const randomQuestionAnswers = inputData.answers[randomQuestionKey];
      
      // Now get a random answer from that question
      if (Array.isArray(randomQuestionAnswers) && randomQuestionAnswers.length) {
        const answer = getRandomElement(randomQuestionAnswers);
        setRandomAnswer(answer);
      }
    }
  }, [inputData]);
  return (
    <div>
      The check is complete. Status: {userCompleted ? 'Completed' : 'Not Completed'}
    </div>
  );
}

async function GetData(userId) {
  try {
    const readJsonResponse = await fetch('/api/read-json');
    if (!readJsonResponse.ok) {
      throw new Error('Network response was not ok for /api/read-json');
    }
    const inputdata = await readJsonResponse.json();

    const userResponse = await fetch(`/api/user/${userId}`);
    if (!userResponse.ok) {
      throw new Error(`Network response was not ok for /api/user/${userId}`);
    }
    const database = await userResponse.json();

    // Now you have both inputdata and database available
    return { inputdata, database };
  } catch (error) {
    console.error('Error fetching data:', error);
    // Depending on where you're calling this, you might want to rethrow the error
    // or handle it by setting state, etc.
    return { error };
  }
}