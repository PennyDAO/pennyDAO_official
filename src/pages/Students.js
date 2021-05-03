import React, { useEffect, useState } from 'react';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import WalletButton from '../components/WalletButton/WalletButton'
import { useAuth } from '../hooks/AuthContext';
import app from '../firebase';
import { NavLink } from 'react-router-dom';

const Students = () => {

    const { currentUser } = useAuth();
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        const firestore = app.firestore();
        const userRef = firestore.collection('users');
        const username = `${currentUser.email.substring(0, currentUser.email.indexOf('@'))}`
        userRef.doc(username).get()
        .then(doc => {
            if (doc.exists) {
                console.log('Document Data:', doc.data());
            }
            else {
                console.log('No such document!');
            }
        })
        .catch(error => {
            console.log('Error getting document:', error);
        })

        const userListRef = userRef.where("role", "==", "Student");
        let tempList = []
        userListRef.get()
        .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                if (doc.data().email !== currentUser.email)
                    tempList.push(doc.data());
            });
            setStudentList(tempList);
        })
        .catch(error => {
            console.log('Error getting document:', error);
        });
    }, [currentUser])

    return (
        <div className='dashboardContainer'>
            <SideNavBar />
            <div className='dashboardWalletContainer'>
                <WalletButton></WalletButton>
            </div>
            Students List Page
            {studentList.map(student => {
                return(
                    <div>
                        <h1>{student.firstName} {student.lastName}</h1>
                        <h2>{student.email}</h2>
                        <NavLink to={{pathname: `/student/${student.email.substring(0, student.email.indexOf('@'))}`, state: {email: student.email}}}>Visit Student</NavLink>
                    </div>
                )
            })}
        </div>
    )
}

export default Students;