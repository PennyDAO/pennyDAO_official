import React, { useState } from 'react';
import NavBar from "./NavBar/NavBar.js";
import Footer from '../components/Footer/Footer.js';
import Content from './Content.js';
import './App.css';
import { AuthProvider } from "../hooks/AuthContext"

function App() {

  return (
    <AuthProvider>
      <div className="App">
        <NavBar />
        <Content />
        <Footer />
      </div>
    </AuthProvider>
    
  );
}

export default App;
