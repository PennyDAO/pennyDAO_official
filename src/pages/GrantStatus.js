import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import app from '../firebase';
import { NavLink } from 'react-router-dom';
import Web3 from 'web3';
import ApplicationsContract from '../artifacts/Applications.json';
import { CHANGE_TOKEN_CONTRACT, PENNY_APPLICATION } from '../utils';


const GrantStatus = () => {

    const { address, currentUser, setData } = useAuth();
    const [profileData, setProfileData] = useState({});
    const [approved, setApproved] = useState(false);

    useEffect(() => {
        const studentRef = app.firestore().collection('students');
        const username = `${currentUser.email.substring(0, currentUser.email.indexOf('@'))}`
        studentRef.doc(username).get()
        .then(doc => {
            if (doc.exists) {
                setData(JSON.stringify(doc.data()));
                setProfileData(doc.data());
            }
            else {
                console.log('No such document!');
            }
        });
    }, [currentUser, setData]);

    const approveApplication = () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            const contract = new window.web3.eth.Contract(ApplicationsContract.abi, PENNY_APPLICATION);
            contract.methods.tokenOfOwnerByIndex(address, 0).call()
            .then(i => {
                contract.methods.approve(CHANGE_TOKEN_CONTRACT, i).send({
                    from: address
                })
                .then(data => {
                    console.log(data);
                    setApproved(true);
                })
                .catch(console.log)
            })
            .catch(console.log)
        }
    }

    const submitApplication = () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            const contract = new window.web3.eth.Contract(ApplicationsContract.abi, PENNY_APPLICATION);
            contract.methods.tokenOfOwnerByIndex(address, 0).call()
            .then(i => {
                contract.methods.submitApplication(i).send({
                    from: address
                })
                .then(res => {
                    const studentRef = app.firestore().collection('students');
                    const username = `${currentUser.email.substring(0, currentUser.email.indexOf('@'))}`
                    studentRef.doc(username).update({
                        applicationStatus: 'Pending',
                        applicationSubmitted: true,
                        applicationID: i
                    })
                    .then(console.log)
                    console.log(res);
                })
                .catch(console.log);
            })
            .catch(console.log)
        }
        
    }

    return (
        <div className='dashboardContainer'>
            <h1>Grant Status</h1>
            <p style={{padding: '0 10%'}}>{profileData.applicationStatus === 'Approved' ? 'Your application has been approved!! To continue, please approve, then submit your application to be reviewed by the PennyDAO community.' : 'Your application is still being processed by the PennyDAO Team.'}</p>
            {profileData.applicationStatus === 'Approved' && <div>
                <button onClick={() => approveApplication()}>Click here to approve your application transaction.</button>
                {approved && <button onClick={() => submitApplication()}>Click here to submit your final application.</button>}
            </div>}
            <div className='grantStatusContainer'>
                <div className='grantAmountContainer'>
                    <h2>{(profileData.applicationStatus === 'Closed' && <span>🎉</span>)} Grant Amount ({profileData.applicationStatus === 'Closed' ? 'approved' : 'pending'}) {(profileData.applicationStatus === 'Closed' && <span>🎉</span>)}</h2>
                    <h1>${profileData.grantAmount}</h1>
                    {profileData.applicationStatus === 'Closed' && <button className='recieveButton'>Recieve Grant</button>}
                </div>
                <div style={{textAlign: 'left'}} className='grantInfoContainer'>
                    <p>PennyDAO will vote to approve your grant request on May 7, 2021.</p>
                    <p>Everyone that holds at least 1 $CHANGE token can participate and support your application.</p>
                    <p>Let your friends and family know that they can support you!</p>
                    <p>Good luck! We're rooting for you.</p>
                </div>
            </div>   
        </div>
    )
}

export default GrantStatus;