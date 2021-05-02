import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom"
import FormInput from '../components/FormInput/FormInput';
import ApplicationBox from '../components/ApplicationBox/ApplicationBox';
import CircleButton from '../components/CircleButton/CircleButton';
import { useAuth } from '../hooks/AuthContext';
import app from '../firebase';

const StudentApplication = ({location}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [university, setUniversity] = useState('');
    const [major, setMajor] = useState('');
    const [gradYear, setGradYear] = useState('');
    const [description, setDescription] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [other, setOther] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [password, setPassword] = useState('');
    const [grantAmount, setGrantAmount] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const history = useHistory();

    useEffect(() => {
        setEmail(location.state.state.email);
        setPassword(location.state.state.password);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault()
    
        // TODO : Error Checking
        console.log(email);
        console.log(twitter);
        try {
            setError("")
            setLoading(true)
            await signup(email, password)

            const userRef = app.firestore().collection('users');
            userRef.doc(email).set({
                firstName,
                lastName,
                email,
                phone,
                university,
                major,
                gradYear,
                description,
                twitter,
                instagram,
                linkedIn,
                other,
                walletAddress,
                grantAmount,
                role: 'Student'
            })
            .then(() => {
                console.log('Document successfully written');
            })
            .catch(error => {
                console.error('Error writing document: ', error);
            }) 

            history.push("/dashboard");
        } catch {
            setError("Failed to create an account")
        }
    
        setLoading(false)
    }

    return(
        <div>
            <h1>Your PennyDAO Application</h1>
            <ApplicationBox>
                <div className='form-input-divider'>
                    <FormInput title='First Name' value={firstName} setValue={setFirstName}/>
                    <FormInput title='Last Name' value={lastName} setValue={setLastName}/>
                </div>
                <div className='form-input-divider'>
                    <FormInput title='Email Address (.edu)' value={email} setValue={setEmail}/>
                    <FormInput title='Phone Number' value={phone} setValue={setPhone}/>
                </div>
                <FormInput title='Undergraduate College or University' value={university} setValue={setUniversity}/>
                <div className='form-input-divider'>
                    <FormInput title='Major or Area of Focus' value={major} setValue={setMajor}/>
                    <FormInput title='Graduation Year' value={gradYear} setValue={setGradYear}/>
                </div>
                <FormInput title='Tell us a bit about yourself' value={description} setValue={setDescription}/>
                <div className='form-input-divider'>
                    <FormInput title='Twitter' value={twitter} setValue={setTwitter}/>
                    <FormInput title='Instagram' value={instagram} setValue={setInstagram}/>
                </div>
                <div className='form-input-divider'>
                    <FormInput title='LinkedIn' value={linkedIn} setValue={setLinkedIn}/>
                    <FormInput title='Other.' value={other} setValue={setOther}/>
                </div>
                <FormInput title='Ethereum Wallet Address' value={walletAddress} setValue={setWalletAddress}/>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '30px'}}>
                    <CircleButton onClick={e => { handleSubmit(e) }} />
                </div>
            </ApplicationBox>
                
        </div>
    )
}

export default StudentApplication;