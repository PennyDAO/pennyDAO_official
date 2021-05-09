import React, { useState } from 'react';

import WrapperBox from '../components/WrapperBox/WrapperBox';
import FormInput from '../components/FormInput/FormInput';
import CircleButton from '../components/CircleButton/CircleButton';

import { useAuth } from '../hooks/AuthContext';
import { useHistory } from "react-router-dom"

import app from '../firebase';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { login, setRole, setData } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        if (email === '')
            return setError('Email is empty')
        if (password === '')
            return setError('Password is empty')
        try {
            setError("");
            setLoading(true);
            await login(email, password);
            // query user based off email
            const userRef = app.firestore().collection('users');
            userRef.doc(email).get()
            .then(doc => {
                if (doc.exists) {
                    // check their role: set data accordingly
                    const data = doc.data();
                    setRole(data.role)
                    if (data.role === 'Student') {
                        const studentRef = app.firestore().collection('students');
                        studentRef.doc(data.username).get()
                        .then(res => {
                            setData(JSON.stringify(res.data()));
                            history.push("/dashboard");
                        })
                    }
                    else if (data.role === 'Investor') {
                        const investorRef = app.firestore().collection('investors');
                        investorRef.doc(data.username).get()
                        .then(res => {
                            setData(JSON.stringify(res.data()));
                            history.push("/dashboard");
                        });
                    }
                    else if (data.role === 'Admin') {
                        setData(JSON.stringify(data));
                        history.push('/admin-dashboard');
                    }
                }
                else {
                    console.log('No such document!');
                }
            })
            .catch(error => {
                console.log('Error getting document:', error);
            });
        } catch {
            setError("Failed to login");
        }
    
        setLoading(false);
    }

    return(
        <div className='dashboardContainer'>
            <h1>Welcome back to PennyDAO!</h1>
            <WrapperBox>
                <h1>Login</h1> 
                <h3 style={{color: 'red'}}>{error}</h3>
                <FormInput title='Email' value={email} setValue={setEmail}/>
                <FormInput title='Password' value={password} setValue={setPassword}/>   
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <CircleButton disabled={!(email && password) || loading} onClick={e => handleSubmit(e)}/>
                </div>  
            </WrapperBox>
        </div>
    );
}

export default Login;