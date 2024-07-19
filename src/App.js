// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DynamicForm from './components/DynammicForm';
import GeneratedForm from './components/GeneratedForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DynamicForm />} />
        <Route path="/form/:formName" element={<GeneratedForm />} />
      </Routes>
    </Router>
  );
};

export default App;
