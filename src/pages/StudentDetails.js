import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import UserProfile from '../components/UserProfile/UserProfile';
import app from '../firebase';
import { useParams } from "react-router-dom";

const StudentDetails = ({match}) => {

    const [data, setData] = useState({});
    const { student_id } = useParams();

    useEffect(() => {
        const userRef = app.firestore().collection('users');
        userRef.doc(student_id).get()
        .then(doc => {
            if (doc.exists) {
                setData(doc.data());
            }
            else
                console.log('No such document!');
        })
        .catch(error => {
            console.log('Error getting document:', error);
        })
    }, [data, student_id]);

    return (
        <div className='dashboardContainer'>
            <UserProfile data={data}/>
            <Footer />
        </div>
    )
}

export default StudentDetails;