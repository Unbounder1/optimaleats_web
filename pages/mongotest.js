// insertTest.js

import readline from 'readline';
import fetch from 'node-fetch'; // Uncomment if your Node.js version is < 17.5.0

// Set up readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a value to insert into the database: ', async (inputValue) => {
  // Define the API endpoint
  const apiEndpoint = 'http://localhost:3000/api/insert'; // Replace with your actual endpoint if different
  
  try {
    // Make a POST request to the Next.js API endpoint
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: inputValue })
    });

    // Parse the JSON response
    const result = await response.json();

    if (response.ok) {
      console.log(`A document was inserted with the _id: ${result._id}`);
    } else {
      console.error('Failed to insert document:', result.message);
    }
    
    // Close the readline interface
    rl.close();

  } catch (err) {
    console.error('Error inserting document:', err);
    rl.close();
  }
});
