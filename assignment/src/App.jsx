import { Routes, Route } from 'react-router-dom';
import "./App.css";

import Home from './home';
import Login from './login';
import SignUp from './SignUp';
import ProtectedRoutes from './protectedRoutes';
import Dashboard from './dashboard';
import Layout from './layout';
import {PrivilegeProvider} from './PrivilegeProvider';
// import { useEffect, useState } from 'react';
// import axios from 'axios';



function App() {

 
  return (
    <>
    <PrivilegeProvider>
    <Routes>
      
    <Route element={<ProtectedRoutes/>}>
    <Route element={<Layout/>}>
    <Route path='/' element={<Home/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
    </Route>
    </Route>
    
    
    <Route path='/login' element={<Login/>} />
    <Route path='/Signup' element={<SignUp/>} />
    </Routes>
    </PrivilegeProvider>
    </>
  )
}
export default App;
