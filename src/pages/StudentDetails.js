import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import UserProfile from '../components/UserProfile/UserProfile';
import WalletButton from '../components/WalletButton/WalletButton'
import app from '../firebase';
import { useAuth } from '../hooks/AuthContext';
import codyImage from '../images/cody.jpeg'
import { useParams } from "react-router-dom";

const StudentDetails = ({location}) => {

    const [data, setData] = useState({});
    const { currentUser } = useAuth();
    const { student_id } = useParams();

    useEffect(() => {
        const userRef = app.firestore().collection('users');
        if (data !== {}) {
            userRef.doc(student_id).get()
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
        }
    }, [currentUser, data, student_id])

    return (
        <div className='dashboardContainer'>
            <SideNavBar />
            <div className='dashboardWalletContainer'>
                <WalletButton></WalletButton>
            </div>
            <UserProfile data={data} imgSrc={codyImage}/>
            <Footer />
        </div>
    )
}

export default StudentDetails;