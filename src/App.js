import React from 'react';
import NavBar from "./components/NavBar/NavBar.js";
import landingImage from './images/landing-page.png';
import LandingAnimation from './components/LandingAnimation/LandingAnimation.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className='landing-container'>
        <div className='title-container'>
          <h1 className='landing-page-title'>We believe your future starts easier.</h1>
          <h2 className='landing-page-subtitle'>A Next Generation Student Loan Borrowing Platform</h2>
          <button className='visit-app-button'>Visit App</button>
        </div>
        <div className='landing-page-image-container'>
          {/* <img src={landingImage} className='landing-image'/> */}
          <LandingAnimation />
        </div>
      </div>
      <div className='why-pennydao-container'>
        <h1>Why PennyDAO?</h1>
      </div>
    </div>
  );
}

export default App;
