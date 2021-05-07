import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
// import app from '../firebase';
import { NavLink } from 'react-router-dom';
import Web3 from 'web3';
import ApplicationsContract from '../artifacts/Applications.json';


const GrantStatus = () => {

    const { data, address } = useAuth();
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        // const userRef = app.firestore().collection('users');
        // const username = `${currentUser.email.substring(0, currentUser.email.indexOf('@'))}`
        // userRef.doc(username).get()
        // .then(doc => {
        //     if (doc.exists) {
        //         console.log('Document Data:', doc.data());
        //         setData(JSON.stringify(doc.data()));
        //         setProfileData(JSON.parse(data));
        //     }
        //     else {
        //         console.log('No such document!');
        //     }
        // });
        setProfileData(JSON.parse(data));
    }, [data])

    const submitApplication = () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            const contract = new window.web3.eth.Contract(ApplicationsContract.abi, '0xDec8C0e31A66ed2eEf7ed54155647c9abcf49b9F');
            contract.methods.tokenOfOwnerByIndex(address, 0).call()
            .then(i => {
                contract.methods.approve('0xCDC481031E23AEd8CbBe6e07A638298a790D445a', i).send({
                    from: address
                })
                .then(data => {
                    console.log(data);
                    contract.methods.submitApplication(i).send({
                        from: address
                    })
                    .then(console.log)
                    .catch(console.log);
                })
                .catch(console.log)
                
            })
            .catch(console.log)
        }
    }

    return (
        <div className='dashboardContainer'>
            <h1>Grant Status</h1>
            <div className='navLinkContainer'>
                <NavLink to='/edit/application' className='editApplicationButton'>Edit Application</NavLink>
            </div>
            <p>{profileData.applicationApproved ? 'Your application has been approved!!' : 'Your application is till being processed by the PennyDAO Team.'}</p>
            <div>
                <button onClick={() => submitApplication()}>Click here to submit your final application.</button>
            </div>
            <div className='grantStatusContainer'>
                <div className='grantAmountContainer'>
                    <h2>{!(profileData.grantPending && <span>🎉</span>)}Grant Amount ({profileData.grantPending ? 'pending' : 'approved'}){!(profileData.grantPending && <span>🎉</span>)}</h2>
                    <h1>${profileData.grantAmount}</h1>
                    {!profileData.grantPending && <button className='recieveButton'>Recieve Grant</button>}
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