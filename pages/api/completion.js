import clientPromise from '../../lib/mongodb';

export async function checkUserCompletion(userId) {
  try {
    const client = await clientPromise;
    const db = client.db('userinfo');

    // Fetch the user's document using their userId
    const userDocument = await db.collection('userid').findOne({ userId: userId });

    // Check if the userDocument exists and the complete field is true
    const hasCompleted = userDocument ? userDocument.complete === "true" : false;

    return hasCompleted;
  } catch (error) {
    console.error('Error checking completion status:', error);
    throw error; // Rethrow the error for the caller to handle
  }
}

export default checkUserCompletion;
