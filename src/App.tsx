import React from 'react';
import './App.css';
import { Quiz } from './components/Quiz';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Results } from './components/Results';

function App() {
  return (
    <Router>
      <Routes>   
          <Route path='/' element={<Quiz/>} />
          <Route path='/results' element={<Results/>} /> 
      </Routes>
    </Router>
  );
}
export default App;
