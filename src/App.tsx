import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import List from './pages/ListContainer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <List />
    </div>
  );
}

export default App;
