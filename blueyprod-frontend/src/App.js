import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contribute from './pages/Contribute';
import './App.css';


function App() {
    return (
      <Router>
        <div className='App'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contribute" element={<Contribute />} /> 
          </Routes>
        </div>
      </Router>
    )
}

export default App;
