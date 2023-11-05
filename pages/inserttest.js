// pages/insertTestPage.js
import React from 'react';

export default function InsertTestPage() {
  async function handleInsertClick() {
    const testData = { value: 'testValue' }; // Replace 'testValue' with the value you want to insert

    try {
      const response = await fetch('./api/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(`Success:`, result);
        alert(`Document inserted with _id: ${result._id}`);
      } else {
        console.error('Failed to insert document:', result.message);
        alert('Failed to insert document');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending request');
    }
  }

  return (
    <div>
      <h1>Insert Test Data</h1>
      <button onClick={handleInsertClick}>Insert Data</button>
    </div>
  );
}
