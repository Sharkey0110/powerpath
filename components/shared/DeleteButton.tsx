"use client"
// CustomButton.tsx
import React from 'react';
import axios from 'axios';
import { Button } from '../ui/button';

interface CustomButtonProps {
  userId: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ userId }) => {
  const handleDeleteUser = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');

    if (confirmed) {
      try {
        // Send a request to your server-side API endpoint
        await axios.post('/api/webhook/clerk/deleteUser', { clerkUserId: userId });
        alert('User deleted successfully!');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('An error occurred while deleting the user.');
      }
    }
  };

  return (
    <Button className="w-[180px] rounded-lg" onClick={handleDeleteUser}>Delete User</Button>
  );
};

export default CustomButton;
