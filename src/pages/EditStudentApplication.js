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
//     return true;
// };

const EditStudentApplication = () => {

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
    const [grantAmount, setGrantAmount] = useState('');
    const [youtube, setYoutube] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [applicationID, setApplicationID] = useState(0);

    const { setRole, setData, currentUser, data, address } = useAuth();
    const history = useHistory();

    useEffect(() => {
        console.log(data);
        const x = JSON.parse(data);
        console.log(x);
        if (x === {}) {
            const username = `${currentUser.email.substring(0, currentUser.email.indexOf('@'))}`;
            const userRef = app.firestore().collection('users');
            userRef.doc(username).get()
            .then(doc => {
                if (doc.exists) {
                    setProfileData(doc.data());
                }
                else
                    console.log('No such document!');
            })
            .catch(error => {
                console.log('Error getting document:', error);
            })
        }
        else {
            setProfileData(x);
        }
        setEmail(x.email);
        setFirstName(x.firstName);
        setLastName(x.lastName);
        setPhone(x.phone);
        setUniversity(x.university);
        setMajor(x.major);
        setGradYear(x.gradYear);
        setDescription(x.description);
        setTwitter(x.twitter);
        setInstagram(x.instagram);
        setLinkedIn(x.linkedIn);
        setOther(x.other);
        setWalletAddress(x.walletAddress);
        setYoutube(x.youtube);
        setGrantAmount(x.grantAmount);
        setImageUrl(x.imageUrl)
    }, [currentUser, data]);

    const handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            setProfileImage(image);
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (email === '')
            return setError('Email is empty');
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
        try {
            setError("")
            setLoading(true)
            const data = {
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
                grantPending: true,
                role: 'Student',
                applicationApproved: false
            }
            const username = `${email.substring(0, email.indexOf('@'))}`;
            const storage = app.storage();
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
                    .then(imageUrl => {
                        // if (imageUrl) {
                        //     console.log('Document successfully written');
                        //     setRole('Student');
                        //     setData(JSON.stringify(data));
                        //     return
                        // }
                        data.imageUrl = imageUrl;
                        const userRef = app.firestore().collection('users');
                        userRef.doc(username).set(data)
                        .then(() => {
                            console.log('Document successfully written');
                            setRole('Student');
                            setData(JSON.stringify(data));
                        })
                        .catch(error => {
                            console.error('Error writing document: ', error);
                        }) 
                    });
                }
            );
        
        } catch {
            setError("Failed to create an account")
        }    

        // We Update our application here
        // first we need our application ID
        if (window.ethereum) {
            await window.ethereum.send('eth_requestAccounts');
            const web3 = new Web3(window.ethereum);
            const contractOne = new web3.eth.Contract(ApplicationsContract.abi, '0xDec8C0e31A66ed2eEf7ed54155647c9abcf49b9F');
            contractOne.methods.tokenOfOwnerByIndex(address, 0).call()
            .then(d => setApplicationID(d));

            const dataParams = ['0xdc31ee1784292379fbb2964b3b9c4124d8f89c60', address, 10000, ''];
            window.web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(ApplicationsContract.abi, '0xDec8C0e31A66ed2eEf7ed54155647c9abcf49b9F');
            contract.methods.updateApplication(applicationID, dataParams).send({
                from: address
            })
            .then(history.push("/dashboard"));
        }

        setLoading(false);

    }

    return(
        <div className='dashboardContainer'>
            <h1>Edit Your PennyDAO Application</h1>
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
                        <input type="radio" id="2500" name="grant" value="2500" onChange={e => setGrantAmount(e.target.value)} checked={grantAmount === '2500'}/>
                        <label htmlFor="male">$2,500</label>
                        <input type="radio" id="5000" name="grant" value="5000" onChange={e => setGrantAmount(e.target.value)} checked={grantAmount === '5000'}/>
                        <label htmlFor="female">$5,000</label>
                        <input type="radio" id="10000" name="grant" value="10000" onChange={e => setGrantAmount(e.target.value)} checked={grantAmount === '10000'}/>
                        <label htmlFor="other">$10,000</label>
                    </FormRadioInput>
                </div>
                <div>
                    <label>Profile Photo</label>
                    <input type="file" onChange={e => handleChange(e)} />
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '30px'}}>
                    <CircleButton onClick={e => { handleSubmit(e) }} disabled={loading}/>
                </div>
            </ApplicationBox>
            <Footer />
        </div>
    )
}

export default EditStudentApplication;