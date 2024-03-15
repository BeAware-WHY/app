import { useState } from 'react';

// Function to manage the authentication token
const useAuthToken = () => {
  const [token, setToken] = useState(null);

  const saveToken = (newToken) => {
    localStorage.setItem('authToken', newToken); // Store token in local storage
    setToken(newToken); // Update token state
  };
  
  const removeToken = () => {
    localStorage.removeItem('authToken'); // Remove token from local storage
    setToken(null); // Clear token state
  };

  return { token, saveToken, removeToken };
};

export default useAuthToken;
