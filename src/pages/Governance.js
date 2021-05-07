import React, { useState, useEffect } from 'react';
import ProposalBox from '../components/ProposalBox/ProposalBox';
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
            <h1>Governance</h1>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Pending</button>
                <button>Closed</button>
            </div>
            <div>
                {/* <ProposalBox title={} to={} status={}/> */}
            </div>
        </div>
    )
}

export default Governance;