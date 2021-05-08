import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import app from '../firebase';
import { useParams } from "react-router-dom";
import StudentProfile from '../components/StudentProfile/StudentProfile';

const StudentDetails = () => {

    const [data, setData] = useState({});
    const { student_id } = useParams();

    useEffect(() => {
        const userRef = app.firestore().collection('students');
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
    }, [student_id]);

    return (
        <div className='dashboardContainer'>
            <StudentProfile data={data}/>
            <Footer />
        </div>
    )
}

export default StudentDetails;