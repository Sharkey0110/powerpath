// CustomButton.tsx
"use client"
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
        await axios.post('/api/deleteUser', { userId });
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