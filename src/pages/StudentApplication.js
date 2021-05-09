import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"
import FormInput from '../components/FormInput/FormInput';
import FormRadioInput from '../components/FormRadioInput/FormRadioInput'
import ApplicationBox from '../components/ApplicationBox/ApplicationBox';
import CircleButton from '../components/CircleButton/CircleButton';
import { useAuth } from '../hooks/AuthContext';
import app from '../firebase';
import Footer from '../components/Footer/Footer';
import Web3 from 'web3';
import ApplicationsContract from '../artifacts/Applications.json';
import { DAI_TOKEN_CONTRACT, PENNY_APPLICATION } from '../utils';
import Loader from "react-loader-spinner";

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
// var isAddress = function (address) {
//     if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
//         // check if it has the basic requirements of an address
//         return false;
//     } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
//         // If it's all small caps or all all caps, return true
//         return true;
//     }
//     return false;
// };

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
    const [youtube, setYoutube] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState();
    // const [imageUrl, setImageUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup, setRole, setData, address } = useAuth();
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
        e.preventDefault();
        if (email === '')
            return setError('Email is empty');
        if (password === '')
            return setError('Password is empty');
        if (firstName === '') 
            return setError('First Name is empty');
        if (lastName === '') 
            return setError('Last Name is empty');
        if (phone === '') 
            return setError('Phone Number is empty');
        if (university === '') 
            return setError('College/University is empty');
        if (major === '') 
            return setError('Major/Field of Study is empty');
        if (gradYear === '') 
            return setError('Graduation Year is empty');
        if (description === '') 
            return setError('Tell me about yourself is empty');
        if (walletAddress === '') 
            return setError('Wallet Address is empty');
        // if (!isAddress(walletAddress))
        //     return setError('Wallet Address is invalid');
        if (youtube === '')
            return setError
        if (grantAmount === '')
            return setError('Select a Grant Amount');
        setError("")
        setLoading(true)
        try {
            await signup(email, password);
            // store basic information in user table
            const username = `${email.substring(0, email.indexOf('@'))}`;
            const role = 'Student';
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
                snapshot => {
                    const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                    .ref("images")
                    .child(username)
                    .getDownloadURL()
                    .then(url => {
                        // setImageUrl(url);
                        // store student information in student table
                        const studentRef = firestore.collection('students');
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
                            youtube,
                            other,
                            walletAddress,
                            grantAmount,
                            imageUrl: url,
                            applicationID: -1,
                            applicationStatus: 'Created',
                            applicationSubmitted: false,
                        }
                        studentRef.doc(username).set(profileData)
                        .then(() => {
                            console.log('Student Information Submitted!')
                        });
                        if (window.ethereum) {
                            window.ethereum.send('eth_requestAccounts');
                            window.web3 = new Web3(window.ethereum);
                            const web3 = new Web3(window.ethereum);
                            const contract = new web3.eth.Contract(ApplicationsContract.abi, PENNY_APPLICATION);
                            contract.methods.createApplication([DAI_TOKEN_CONTRACT, address, parseInt(grantAmount), '']).send({
                                from: address
                            })
                            .then(res => {
                                setData(JSON.stringify(profileData));
                                setRole('Student');
                                setLoading(false);
                                history.push('/dashboard');
                            });
                        }
                    });
                }
            );
        } catch {
            setError("Failed to create an account")
        }    
    }

    return(
        <div className='dashboardContainer'>
            {loading && 
            <div className='loadingScreen'>
                <Loader 
                    type="ThreeDots"
                    color="#F7F2EA"
                    height={100}
                    width={100}
                />
            </div>
            }
            <h1>Your PennyDAO Application</h1>
            <h2 style={{color: 'red'}}>{error}</h2>
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
                <div className='form-input-divider'>
                    <FormInput title='Ethereum Wallet Address' value={walletAddress} setValue={setWalletAddress}/>
                    <FormInput title='Youtube Pitch Link' value={youtube} setValue={setYoutube}/>
                </div>
                <div>
                    <FormRadioInput>
                        <input type="radio" id="2500" name="grant" value="2500" onChange={e => setGrantAmount(e.target.value)}/>
                        <label htmlFor="male">$2,500</label>
                        <input type="radio" id="5000" name="grant" value="5000" onChange={e => setGrantAmount(e.target.value)}/>
                        <label htmlFor="female">$5,000</label>
                        <input type="radio" id="10000" name="grant" value="10000" onChange={e => setGrantAmount(e.target.value)}/>
                        <label htmlFor="other">$10,000</label>
                    </FormRadioInput>
                </div>
                <div className='inputProfilePhotoContainer'>
                    <label>Profile Photo</label>
                    <input type="file" onChange={e => handleChange(e)} className='profilePhotoInput' style={{marginTop: '15px'}}/>  
                    <img src={previewImage} className='previewImage' style={{marginTop: '15px'}} alt='preview text'/>                  
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '30px'}}>
                    <CircleButton onClick={e => { handleSubmit(e) }} disabled={loading}/>
                </div>
            </ApplicationBox>
            <Footer />
        </div>
    )
}

export default StudentApplication;