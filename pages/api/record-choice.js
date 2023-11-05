// pages/api/record-choice.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  let db;
  try {
    const client = await clientPromise;
    db = client.db('userinfo');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    return res.status(500).json({ message: 'Failed to connect to MongoDB', error: error.message });
  }

  try {
    const { userId, answers } = req.body;
    if (!userId || !answers) {
      return res.status(400).json({ message: 'Missing userId or answers in request body.' });
    }

    const updateResult = await db.collection('userid').replaceOne(
      { userId },
      { userId, answers, complete: true },
      { upsert: true }
    );

    return res.status(200).json({ success: true, data: updateResult });
  } catch (error) {
    console.error('Error recording choice:', error);
    return res.status(500).json({ message: 'Error recording choice', error: error.message });
  }
}
