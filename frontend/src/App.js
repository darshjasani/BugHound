import './App.css';
import React, { useEffect, useState }  from 'react';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import Report from './Report'
import Reports from './Reports';
const App = ()=>{
  return(
    <>
     <Router>
      <Routes>
        <Route path = '/' element={<Login/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/report' element={<Report/>}/>
        <Route path='/reports/:reportID/:programName' element={<Reports/>}/>
      </Routes>
     </Router>


    </>
  )
}

export default App;
