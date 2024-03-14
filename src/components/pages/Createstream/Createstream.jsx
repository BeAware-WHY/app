import React, { useState } from 'react';
import { auth } from "../firebase";
import Button from '../../resources/Button/button';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Loader from "../../resources/Loader/loader";

const Createstream = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status

  const logout = () => {
    setIsLoading(true); // Set loading state to true
    signOut(auth)
      .then(() => {
        alert('Successfully signed out');
        navigate('/SignIn');
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false after sign out process completes
      });
  };

  return (
    <div>
      <h1>User SignedIn</h1>
      <Button        
        text={"Logout"}
        onClick={logout}
      ></Button>
      {isLoading && <Loader />} {/* Display loader if isLoading is true */}
    </div>
  );
}

export default Createstream;
