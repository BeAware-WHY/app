import './App.css'
import SignIn from './components/pages/Signin/Signin'
import SignUp from './components/pages/Signup/Signup'
import { ReactDOM } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route>
      <Route path='' element={<SignIn/>}></Route>
      <Route path='/signin' element={<SignIn/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
