import React, { useEffect, useState } from 'react';

import { useAuth } from '../hooks/AuthContext';
import app from '../firebase';
import UserBox from '../components/UserBox/UserBox';

const Students = () => {

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
            <h1>PennyDAO Students</h1>
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
                        <UserBox data={student} key={student.email}/>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Students;