import React, { useState } from 'react';

import WrapperBox from '../components/WrapperBox/WrapperBox';
import FormInput from '../components/FormInput/FormInput';
import CircleButton from '../components/CircleButton/CircleButton';

import { useAuth } from '../hooks/AuthContext';
import { Link, useHistory } from "react-router-dom"


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { login } = useAuth();

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
          history.push("/dashboard");
        } catch {
          setError("Failed to login");
        }
    
        setLoading(false);
    }

    return(
        <div>
            <h1>Welcome back to PennyDAO!</h1>
            <WrapperBox>
                <h1>Login</h1> 
                <h3 style={{color: 'red'}}>{error}</h3>
                <FormInput title='Email' value={email} setValue={setEmail}/>
                <FormInput title='Password' value={password} setValue={setPassword}/>   
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <CircleButton disabled={!(email && password)} onClick={e => handleSubmit(e)}/>
                </div>  
            </WrapperBox>
        </div>
    );
}

export default Login;