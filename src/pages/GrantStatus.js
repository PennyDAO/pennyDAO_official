import React from 'react';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import WalletButton from '../components/WalletButton/WalletButton';

const GrantStatus = () => {
    return (
        <div className='dashboardContainer'>
            <SideNavBar />
            <div className='dashboardWalletContainer'>
                <WalletButton></WalletButton>
            </div>
            Grant Status
        </div>
    )
}

export default GrantStatus;