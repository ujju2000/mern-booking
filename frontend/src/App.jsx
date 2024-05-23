import { useState } from 'react'
import './App.css'
import Layout from './Layouts/Layout'
import {Router , Route, Routes, Navigate} from 'react-router-dom';
import Header from './components/Header';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './context/AppContext';
function App() {
  const {isLoggedIn} = useAppContext();
  return (
      <Routes>
        <Route path = '/' element = {<Layout />}>
          <Route path = '/' element = {<div>home page</div>} />
          <Route path = '/search' element = {<div>search page</div>} />
          <Route path = '/register' element = {<Register />} />
          <Route path = '/sign-in' element = {<SignIn />} />
          {
            isLoggedIn && <Route path = '/my-hotel' element = {<AddHotel />} /> 
          }
          
        </Route>

        <Route path = '*' element = {<Navigate to = '/' />}/>
      </Routes>
  )
}

export default App
