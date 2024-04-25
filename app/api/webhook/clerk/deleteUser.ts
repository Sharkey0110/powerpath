// app/api/deleteUser.ts
import { clerkClient } from '@clerk/nextjs'; // Import Clerk client
import { NextApiRequest, NextApiResponse } from 'next';

export default async function deleteUserHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { clerkUserId } = req.body; // Assuming you pass the Clerk user ID in the request body

  try {
    // Use Clerk client to delete the user
    await clerkClient.users.deleteUser(clerkUserId);
    
    // Optionally, perform any additional actions after deleting the user
    return res.status(200).json({ message: 'OK', userId: clerkUserId });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Error occurred while deleting user.' });
  }
}
