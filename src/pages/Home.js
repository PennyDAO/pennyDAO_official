import React from 'react';
import NavBar from '../app/NavBar/NavBar.js';
import Footer from '../components/Footer/Footer.js';
import LandingAnimation from '../components/LandingAnimation/LandingAnimation.js'
import WhyBox from '../components/WhyBox/WhyBox.js';

const HomePage = () => {

    return(
        <div>
            <NavBar />
            <div className='landing-container'>
                <div className='title-container'>
                    <h1 className='landing-page-title'>We believe your future starts easier.</h1>
                    <h2 className='landing-page-subtitle'>A Next Generation Student Loan Borrowing Platform</h2>
                    <button className='visit-app-button'>Visit App</button>
                </div>
                <div className='landing-page-image-container'>
                    <LandingAnimation />
                </div>
            </div>
            <div className='why-pennydao-container'>
                <h1>Why PennyDAO?</h1>
                <div className='why-box-container'>
                    <WhyBox
                    title='Instant Yield Generation'
                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    color='#CEAF7F' />
                    <WhyBox
                    title='Instant Yield Generation'
                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    color='#877C6E' />
                    <WhyBox
                    title='Instant Yield Generation'
                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    color='#A58C6E' />
                </div>
            </div>
            <Footer />
        </div>

    );

}

export default HomePage;