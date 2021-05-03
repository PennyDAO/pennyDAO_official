import React from 'react';
import Content from './Content.js';
import './App.css';
import { AuthProvider } from "../hooks/AuthContext"

function App() {

  return (
    <AuthProvider>
      <div className="App">
        <Content />
      </div>
    </AuthProvider>
    
  );
}

export default App;
