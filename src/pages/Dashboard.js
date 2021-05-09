import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import InvestorProfile from '../components/InvestorProfile/InvestorProfile';
import StudentProfile from '../components/StudentProfile/StudentProfile';
import { useAuth } from '../hooks/AuthContext';

const Dashboard = () => {

    const { data, role } = useAuth();
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        setProfileData(JSON.parse(data));
    }, [data]);

    return(
        <div className='dashboardContainer'>
            {role === 'Student' && <StudentProfile data={profileData}/>}
            {role === 'Investor' && <InvestorProfile data={profileData}/>}
            <Footer />
        </div>
    )
}

export default Dashboard;