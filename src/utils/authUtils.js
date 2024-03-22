
// Function to check if the authentication token is expired
export const isTokenExpired = () => {
    // Get the token from localStorage or wherever you store it
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      // Token not found, consider it as expired
      return true;
    }
  
    // Decode the token to extract the expiration time
    const decodedToken = decodeToken(token);
  
    if (!decodedToken || !decodedToken.exp) {
      // Invalid token or expiration time not found, consider it as expired
      return true;
    }
  
    // Get the current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);
  
    // Compare the expiration time with the current time
    return decodedToken.exp < currentTime;
  };
  
  // Function to decode the JWT token
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
  
      return JSON.parse(jsonPayload);
    } catch (error) {
      // Handle decoding error if needed
      console.error('Error decoding token:', error);
      return null;
    }
  };
  