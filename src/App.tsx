import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import AddEditProductPage from './components/Product/AddEditProductPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-product" element={<AddEditProductPage />} />
        <Route path="/edit-product/:id" element={<AddEditProductPage />} />
      </Routes>
    </Router>
  );
};

export default App;
