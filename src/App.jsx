import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/pages/Signin/Signin';
import SignUp from './components/pages/Signup/Signup';
import ForgetPassword from './components/pages/forgetpassword/forgetpassword';
import ForgetPasswordReview from './components/pages/forgetpassword/forgetpasswordnext';
import CreateStream from './components/pages/CreateStream/CreateStream';
import DashBoard from './components/pages/DashBoard/DashBoard';
import { isTokenExpired } from './utils/authUtils';

function App() {
  const tokenExpired = isTokenExpired();

  return (
    <BrowserRouter>
      {tokenExpired ? (
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/forgetpasswordreview' element={<ForgetPasswordReview />} />
          {/* Redirect to SignIn for other routes if token is expired */}
          <Route path='*' element={<Navigate to='/signin' />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/createstream' element={<CreateStream />} />
          <Route path='/dashboard' element={<DashBoard />} />
          {/* Redirect to Dashboard for other routes if authenticated */}
          <Route path='*' element={<Navigate to='/dashboard' />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
