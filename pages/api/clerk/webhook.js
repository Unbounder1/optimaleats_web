import clientPromise from '../../../lib/mongodb';
export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Verify the request is from Clerk
      const signature = req.headers['clerk-signature'];
  
      // Handle the webhook event
      const { type, data } = req.body;
  
      switch (type) {
        case 'user.signed_up':
          const userId = data.id;
          // Custom logic for when a user signs up
          await handleUserSignUp(userId);
          break;
        // Handle other Clerk events...
        default:
          console.log(`Unhandled event type: ${type}`);
      }
  
      // Respond to Clerk to acknowledge receipt
      return res.status(200).json({ received: true });
    } else {
      // Respond to any non-POST requests with a method not allowed status
      return res.status(405).end();
    }
  }
  
  async function handleUserSignUp(userId) {
    try {
        const client = await clientPromise;
        const db = client.db("Cluster0");
        const defaultUserData = {
            // Default data structure
            userId: userId,
            posts: [],
            settings: {
              theme: 'light',
              notifications: true,
            },
          };
        const data = await db.collection('yourCollectionName').find({}).toArray();
        res.status(200).json(data);
        const result = await db.collection('users').insertOne(defaultUserData);
  } catch (e) {
  res.status(500).json({ error: e.message });
}
}