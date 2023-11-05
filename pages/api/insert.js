// pages/api/insert.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db('userinfo');
      const collection = db.collection('userid');

      // You would get the value from the request body
      const { value } = req.body;

      // Perform the insert operation
      const result = await collection.insertOne({ value });

      // Close the MongoDB client
      await client.close();

      res.status(200).json({ _id: result.insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error connecting to the database' });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).end(); //Method Not Allowed
  }
}
