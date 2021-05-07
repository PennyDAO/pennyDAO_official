import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import UserProfile from '../components/UserProfile/UserProfile';
import { useAuth } from '../hooks/AuthContext';

const Dashboard = () => {

    const { data } = useAuth();
    const [profileData, setProfileData] = useState({});
    useEffect(() => {
        setProfileData(JSON.parse(data));
        // if (window.ethereum) {
        //     const web3 = new Web3(window.ethereum);
        //     const contractOne = new web3.eth.Contract(ApplicationsContract.abi, '0xDec8C0e31A66ed2eEf7ed54155647c9abcf49b9F');
        //     contractOne.methods.ownerOf(0).call()
        //     .then(console.log);
        // }
    }, [data])

    return(
        <div className='dashboardContainer'>
            <UserProfile data={profileData} />
            <Footer />
        </div>
    )
}

export default Dashboard;