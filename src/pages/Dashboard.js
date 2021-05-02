import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import WalletButton from '../components/WalletButton/WalletButton'
import app from '../firebase';
import { useAuth } from '../hooks/AuthContext';

const Dashboard = () => {

    const [role, setRole] = useState('Investor');
    const [data, setData] = useState({});
    const { currentUser } = useAuth();

    useEffect(() => {
        const userRef = app.firestore().collection('users');
        console.log(currentUser.email)
        userRef.doc(currentUser.email).get()
        .then(doc => {
            if (doc.exists) {
                console.log('Document Data:', doc.data());
                setData(doc.data());
            }
            else
                console.log('No such document!');
        })
        .catch(error => {
            console.log('Error getting document:', error);
        })
    }, [])

    return(
        <div style={{paddingLeft: '15%'}}>
            <SideNavBar />
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <WalletButton></WalletButton>
            </div>
                Dashboard
            <Footer />
        </div>
    )
}

export default Dashboard;