import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"
import FormInput from '../components/FormInput/FormInput';
import ApplicationBox from '../components/ApplicationBox/ApplicationBox';
import CircleButton from '../components/CircleButton/CircleButton';
import { useAuth } from '../hooks/AuthContext';
import app from '../firebase';
import Footer from '../components/Footer/Footer';

const InvestorApplication = ({location}) => {

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
    const [imageUrl, setImageUrl] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState();
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const { signup, setRole, setData } = useAuth();
    const history = useHistory();

    useEffect(() => {
        setEmail(location.state.state.email);
        setPassword(location.state.state.password);
    }, [location]);

    const handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            setProfileImage(image);
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    async function handleSubmit(e) {
        // TODO : Error Checking
        try {

            // store basic information in user table
            const username = `${email.substring(0, email.indexOf('@'))}`;
            const role = 'Investor';
            const firestore = app.firestore();
            const storage = app.storage();

            const userRef = firestore.collection('users');
            userRef.doc(email).set({
                username,
                role,
                email
            });

            // add profile image url to firebase storage
            const uploadTask = storage.ref(`images/${username}`).put(profileImage);
            uploadTask.on(
                "state_changed",
                () => {
                    storage
                    .ref("images")
                    .child(username)
                    .getDownloadURL()
                    .then(url => {
                        setImageUrl(url);
                        // store investor information in investor table
                        const investorRef = firestore.collection('investors');
                        const profileData = {
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
                            imageUrl: url,
                            contribute: []
                        }
                        investorRef.doc(username).set(profileData)
                        .then(() => {
                            console.log('Investor Information Subbmitted!')
                            setData(JSON.stringify(profileData));
                            setRole('Investor');
                            signup(email, password);
                            history.push('/dashboard');
                        });
                    });
                }
            );
        } catch {
            setError("Failed to create an account")
        }        
        setLoading(false);
    }

    return(
        <div className='dashboardContainer'>
            <h1>Your CHANGE-maker Application</h1>
            <h2>{error}</h2>
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
                <div className='inputProfilePhotoContainer'>
                    <label>Profile Photo</label>
                    <input type="file" onChange={e => handleChange(e)} className='profilePhotoInput' style={{marginTop: '15px'}}/>  
                    <img src={previewImage} className='previewImage' style={{marginTop: '15px'}}/>                  
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '30px'}}>
                    <CircleButton onClick={e => { handleSubmit(e) }} disabled={loading}/>
                </div>
            </ApplicationBox>
            <Footer />
        </div>
    )
}

export default InvestorApplication;