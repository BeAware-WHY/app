import './App.css'
import SignIn from './components/pages/Signin/Signin'
import SignUp from './components/pages/Signup/Signup';
import ForgetPassword from './components/pages/forgetpassword/forgetpassword';
import ForgetPasswordReview from './components/pages/forgetpassword/forgetpasswordnext';
import DashBoard from './components/pages/DashBoard/DashBoard';
import CreateStream from './components/pages/Createstream/Createstream'; 


import { BrowserRouter, Routes, Route } from 'react-router-dom' 
// import { Navbar } from 'react-bootstrap';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path='' element={<SignIn/>}></Route>
      <Route path='/signin' element={<SignIn/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/forgetpassword' element={<ForgetPassword/>}></Route>
      <Route path='/forgetpasswordreview' element={<ForgetPasswordReview/>}></Route>
      <Route path='/createstream' element={<CreateStream/>}></Route>
      <Route path='/dashboard' element={<DashBoard/>}></Route>

      
      </Routes>
    </BrowserRouter>
  )
}

export default App
