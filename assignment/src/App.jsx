import { Routes, Route } from 'react-router-dom';
import "./App.css";

import Home from './home';
import Login from './login';
import SignUp from './SignUp';
import ProtectedRoutes from './protectedRoutes';
// import { useEffect, useState } from 'react';
// import axios from 'axios';



function App() {

 
  return (
    <>
    <Routes>
    <Route element={<ProtectedRoutes/>}>
    <Route path='/' element={<Home/>} />

    </Route>
    
    <Route path='/login' element={<Login/>} />
    <Route path='/Signup' element={<SignUp/>} />
    </Routes>
    </>
  )
}
export default App;
