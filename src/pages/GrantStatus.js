import React from 'react';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import WalletButton from '../components/WalletButton/WalletButton'

const GrantStatus = () => {
    return (
        <div style={{paddingLeft: '15%'}}>
            <SideNavBar />
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <WalletButton></WalletButton>
            </div>
            Grant Status
        </div>
    )
}

export default GrantStatus;