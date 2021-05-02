import React from 'react';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import WalletButton from '../components/WalletButton/WalletButton'

const Students = () => {
    return (
        <div style={{paddingLeft: '15%'}}>
            <SideNavBar />
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <WalletButton></WalletButton>
            </div>
            Students List Page
        </div>
    )
}

export default Students;