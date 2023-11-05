// pages/check-completion/[userId].js
import { MongoClient } from 'mongodb';

export async function getServerSideProps(context) {
  const userId = context.params.userId;
  let userCompleted = false;

  try {
    // Connect to the database
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('userinfo');

    // Query the database for the user's completion status
    const userStatus = await db.collection('userid').findOne({ userId: userId });
    userCompleted = userStatus?.complete === 'true';

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
    props: { userCompleted }, // You can pass the status to the page if needed
  };
}

// The page component itself (which will not render anything in the case of a redirect)
export default function CheckCompletionPage({ userCompleted }) {
  // If for some reason the redirection didn't work, we can show content or redirect client-side.
  return <div>The check is complete. Status: {userCompleted ? 'Completed' : 'Not Completed'}</div>;
}
