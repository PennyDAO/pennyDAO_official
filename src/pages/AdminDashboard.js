import React, { useEffect, useState } from 'react';

import { useAuth } from '../hooks/AuthContext';
import app from '../firebase';
import UserBox from '../components/UserBox/UserBox';

const AdminDashboard = () => {

    const { currentUser } = useAuth();
    const [studentList, setStudentList] = useState([]);
    const [category, setCategory] = useState('');
    const [query, setQuery] = useState('');

    useEffect(() => {
        const firestore = app.firestore();
        const studentRef = firestore.collection('students');
        let tempList = []
        studentRef.get()
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
    }, [currentUser]);

    const approveApplication = (email) => {
        // get student collection
        const studentRef = app.firestore().collection('students');
        const username = `${email.substring(0, email.indexOf('@'))}`
        // get and set application status to 'Approved'
        studentRef.doc(username).get()
        .then(doc => {
            if (doc.exists) {
                let x = doc.data();
                x.applicationStatus = 'Approved';
                studentRef.doc(username).set(x)
                .then(res => {
                    console.log(`${username}'s application has been approved.`);
                    window.location.reload();
                })
                .catch(console.log)
            }
            else {
                console.log('No such document!');
            }
        })
        .catch(error => {
            console.log('Error getting document:', error);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const firestore = app.firestore();
        const studentRef = firestore.collection('students');
        const userListRef = (category !== '' && query !== '') ? studentRef.where(category, "==", query) : studentRef;
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
    }

    return (
        <div className='dashboardContainer'>
            <h1>Current Applications</h1>
            <form onSubmit={e => handleSubmit(e)} className='studentsForm'>
                <div>
                    <select className='dropdown' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value=''>Select:</option>
                        <option value='university'>University</option>
                        <option value='gradYear'>Graduation Year</option>
                        <option value='major'>Major/Field of Study</option>
                    </select>
                    <input
                        className="form-input"
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <button className='searchButton'>Search</button>
            </form>
            <div className='studentsContainer'>
                {studentList.map(student => {
                    return(
                        <UserBox data={student} onClick={() => approveApplication(student.email)} key={`${student.email}`}/>
                    )
                })}
            </div>
            
        </div>
    )
}

export default AdminDashboard;