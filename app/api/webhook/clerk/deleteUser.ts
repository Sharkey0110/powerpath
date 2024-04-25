// deleteUserController.ts
import { deleteUser } from '@/lib/actions/user.actions';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function deleteUserHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId } = req.body;

  try {
    const deletedUser = await deleteUser(userId);
    // Optionally, perform any additional actions after deleting the user
    return res.status(200).json({ message: 'OK', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Error occurred while deleting user.' });
  }
}
