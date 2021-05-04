import React, { useEffect, useState } from 'react';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import WalletButton from '../components/WalletButton/WalletButton'
import { useAuth } from '../hooks/AuthContext';
import app from '../firebase';
import { NavLink } from 'react-router-dom';
import UserBox from '../components/UserBox/UserBox';

const Students = () => {

    const { currentUser } = useAuth();
    const [studentList, setStudentList] = useState([]);
    const [category, setCategory] = useState('');
    const [query, setQuery] = useState('');

    useEffect(() => {
        const firestore = app.firestore();
        const userRef = firestore.collection('users');
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(category, query)
        const firestore = app.firestore();
        const userRef = firestore.collection('users');
        if (category !== '' && query !== '')
            var userListRef = userRef.where("role", "==", "Student").where(category, "==", query);
        else 
            var userListRef = userRef.where("role", "==", "Student");

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
            <SideNavBar />
            <div className='dashboardWalletContainer'>
                <WalletButton></WalletButton>
            </div>
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
                        <UserBox data={student}/>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Students;