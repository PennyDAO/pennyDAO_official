import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import UserProfile from '../components/UserProfile/UserProfile';
import WalletButton from '../components/WalletButton/WalletButton'
import { useAuth } from '../hooks/AuthContext';
import codyImage from '../images/cody.jpeg'

const Dashboard = () => {

    // const [role, setRole] = useState('Investor');
    // const [data, setData] = useState({});
    const { data } = useAuth();
    const [profileData, setProfileData] = useState({});
    useEffect(() => {
        setProfileData(JSON.parse(data));
    }, [data])

    return(
        <div className='dashboardContainer'>
            <SideNavBar />
            <div className='dashboardWalletContainer'>
                <WalletButton></WalletButton>
            </div>
            <UserProfile data={profileData} imgSrc={codyImage}/>
            <Footer />
        </div>
    )
}

export default Dashboard;