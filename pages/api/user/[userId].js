// pages/api/user/[userId].js

import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const {
    query: { userId },
  } = req;

  try {
    // Wait for the client to connect using the promise
    const client = await clientPromise;
    const db = client.db('userinfo');
    const collection = db.collection('userid'); // Adjust the collection name as needed

    const user = await collection.findOne({ userId: userId });

    if (user) {
      // Return the entire user JSON
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' + userId});
    }
  } catch (error) {
    // In case of an error, respond with a 500 and the error message
    res.status(500).json({ message: 'Error accessing the database', error: error.message });
  }
  // Note: No need to close the connection because of the way you're handling it in lib/mongodb.js
}
