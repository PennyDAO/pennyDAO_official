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
                    <h1 className='landing-page-title'>We believe your impact.</h1>
                    <h2 className='landing-page-subtitle'>A Next Generation CHANGE-maker</h2>
                    <button className='visit-app-button'>Visit App</button>
                </div>
                <div className='landing-page-image-container'>
                    <LandingAnimation />
                </div>
            </div>
            <div className='why-pennydao-container'>
                <h1>PennyDAO Makes Every Penny Count Toward CHANGE</h1>
                <div className='why-box-container'>
                    <WhyBox
                    title='100%'
                    description='All impact; Zero platform fees'
                    color='#CEAF7F' />
                    <WhyBox
                    title='1 CAUSE'
                    description='Student community grants'
                    color='#877C6E' />
                    <WhyBox
                    title='CHANGE'
                    description='Proof of Impact'
                    color='#A58C6E' />
                </div>
            </div>
            <Footer />
        </div>

    );

}

export default HomePage;