// pages/api/user.js
import { withAuth } from '@clerk/nextjs/api';

const handler = async (req, res) => {
  const userId = req.session.userId;
  
  if (!userId) {
    return res.status(401).json({ message: 'User is not authenticated' });
  }

  if (req.method === 'GET') {
    // Handle GET request, fetch user specific data
  } else if (req.method === 'POST') {
    // Handle POST request, create new data for user
  } else if (req.method === 'PUT' || req.method === 'PATCH') {
    // Handle PUT/PATCH request, update user specific data
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withAuth(handler);
