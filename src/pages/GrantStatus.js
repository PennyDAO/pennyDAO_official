import React, { useState, useEffect } from 'react';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import WalletButton from '../components/WalletButton/WalletButton';
import { useAuth } from '../hooks/AuthContext';

const GrantStatus = () => {

    const { data } = useAuth();
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        setProfileData(JSON.parse(data));
    }, [data])

    return (
        <div className='dashboardContainer'>
            <SideNavBar />
            <div className='dashboardWalletContainer'>
                <WalletButton></WalletButton>
            </div>
            <h1>Grant Status</h1>
            <div className='grantStatusContainer'>
                <div className='grantAmountContainer'>
                    <h2>{!profileData.grantPending && <span>🎉</span>}Grant Amount ({profileData.grantPending ? 'pending' : 'approved'}){!profileData.grantPending && <span>🎉</span>}</h2>
                    <h1>${profileData.grantAmount}</h1>
                </div>
                <div style={{textAlign: 'left'}} className='grantInfoContainer'>
                    <p>PennyDAO will vote to approve your grant request on May 7, 2021.</p>
                    <p>Everyone that holds at least 1 $CHANGE token can participate and support your application.</p>
                    <p>Let your friends and family know that they can support you!</p>
                    <p>Good luck! We're rooting for you.</p>
                </div>
            </div>
            
        </div>
    )
}

export default GrantStatus;