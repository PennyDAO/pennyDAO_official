import React, { useState, useEffect } from 'react';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import WalletButton from '../components/WalletButton/WalletButton';
import { useAuth } from '../hooks/AuthContext';

const Governance = () => {

    const { currentUser, role, data} = useAuth();
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        setProfileData(JSON.parse(data));
    }, [])

    return (
        <div className='dashboardContainer'>
            <SideNavBar />
            <div className='dashboardWalletContainer'>
                <WalletButton></WalletButton>
            </div>
            Governance
        </div>
    )
}

export default Governance;