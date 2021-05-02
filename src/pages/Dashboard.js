import React, { useEffect, useState } from 'react';
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
        <div>
            Dashboard
            <p>
            {JSON.stringify(data)}
            </p>
        </div>
    )
}

export default Dashboard;