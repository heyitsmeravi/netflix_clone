// import React from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Player from './pages/Player/Player'
import {onAuthStateChanged} from 'firebase/auth';
import { useEffect } from 'react';
import {auth} from '../src/firebase'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPass from './pages/ForgetPass/ForgetPass';
const App = () => {
  const navigate = useNavigate();
  useEffect( ()=>{
    onAuthStateChanged(auth, async (user) =>{
      if (user){
        console.log("logged In");
        navigate('/');
      }else{
        console.log("Logged Out");
        navigate('/login');
      }
    })
  },[])
  return (
    <div className='App'>
      <ToastContainer theme = 'dark'></ToastContainer>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
        <Route path='/login-help' element={<ForgetPass/>}/>
      </Routes>
    </div>
  )
}

export default App
