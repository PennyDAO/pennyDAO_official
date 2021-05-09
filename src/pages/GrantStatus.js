import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import app from '../firebase';
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
    });

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
        <div className='dashboardGrantStatusContainer'>
            <h1>Grant Status</h1>
            <div className='grantStatusContainer'>
                <h3>Your PennyDAO Application: 
                    {profileData.applicationStatus === 'Created' && ' 🚧 Under Review by PennyDAO team. 🚧'}
                    {profileData.applicationStatus !== 'Created' && ' 🎉 Approved 🎉'}
                </h3>
                <p style={{padding: '0 20%'}}>{profileData.applicationStatus === 'Approved' ? 'For your application to be reviewed by the PennyDAO community, please approve your transaction and submit your PennyDAO application.' : 'Your application is being processed by the PennyDAO Team.'}</p>
                {profileData.applicationStatus === 'Approved' && !profileData.applicationSubmitted && <div style={{margin: '30px'}}>
                    <button onClick={() => approveApplication()} disabled={approved} className='applicationButton'>Approve</button>
                    <button onClick={() => submitApplication()} disabled={!approved} className='applicationButton'>Submit</button>
                </div>}
                {profileData.applicationSubmitted && <p>Application already submitted!</p>}
            </div>
            <br/>
            <div className='grantStatusContainer'>
                <div className='grantAmountContainer'>
                    <h3>{(profileData.applicationStatus === 'Closed' && <span>🎉</span>)} Grant Amount:  {profileData.applicationStatus === 'Closed' ? `🎉 $${profileData.grantAmount} (approved) 🎉` : `🚧 $${profileData.grantAmount} (pending) 🚧`} {(profileData.applicationStatus === 'Closed' && <span>🎉</span>)}</h3>
                </div>
                <div className='grantInfoContainer'>
                    {profileData.applicationStatus !== 'Closed' && <div>
                        <p>PennyDAO will vote to approve your grant request on May 9, 2021.</p>
                        <p>Everyone that holds at least 1 $CHANGE token can participate and support your application.</p>
                        <p>Let your friends and family know that they can support you!</p>
                        <p>Good luck! We're rooting for you.</p>
                    </div>}
                    {profileData.applicationStatus === 'Closed' && <div>
                        <p>PennyDAO has voted for your grant request!</p>
                        <p>You can now recieve your financial aid by tapping the button below.</p>
                        <p>Thank you - and best of luck to your endeavors.</p>
                        <button className='recieveButton'>Recieve Grant</button>
                    </div>}
                </div>
            </div>   
        </div>
    )
}

export default GrantStatus;