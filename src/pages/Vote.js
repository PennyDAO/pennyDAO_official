import React, { useState, useEffect } from 'react';
import DepositContract from '../artifacts/Penny.json';
import { CHANGE_TOKEN_CONTRACT } from '../utils';
import Web3 from 'web3';
import app from '../firebase';
import UserVoteBox from '../components/UserVoteBox/UserVoteBox';

const Vote = () => {

    const [allList, setAllList] = useState([]);
    const [activeList, setActiveList] = useState([]);
    const [pendingList, setPendingList] = useState([]);
    const [closedList, setClosedList] = useState([]);
    const [query, setQuery] = useState('All');

    useEffect(() => {
        // create list of all students that have submitted their application
        // one student will have their application be on queue to be voted
        // their docData.applicationStatus should be changed to 'Active'
        // && their docData.applicationID === getUpForVote()
        const firestore = app.firestore();
        const studentRef = firestore.collection('students');
        let allList = [];
        let activeList = [];
        let pendingList = [];
        let closedList = [];
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            const tokenInst = new window.web3.eth.Contract(DepositContract.abi, CHANGE_TOKEN_CONTRACT);
            // check to see if the application ID is valid or not 
            tokenInst.methods.getUpForVote().call()
            .then(application_id => { // application_id == on queue application to be voted on
                studentRef.where('applicationSubmitted', '==', true).get()
                .then(querySnapshot => {
                    querySnapshot.forEach((doc) => {
                        const docData = doc.data();
                        console.log('application_id', application_id);
                        console.log(docData);
                        if (application_id === docData.applicationID || docData.applicationStatus === 'Active') {
                            docData.applicationStatus = 'Active';
                            activeList.push(docData);
                            // update the docData document from Pending -> Active
                            const studentRef = app.firestore().collection('students');
                            const username = `${docData.email.substring(0, docData.email.indexOf('@'))}`
                            studentRef.doc(username).update({
                                applicationStatus: 'Active',
                            })
                            .then(console.log)
                        }
                        else if (docData.applicationStatus === 'Pending')
                            pendingList.push(docData);
                        else if (docData.applicationStatus === 'Closed')
                            closedList.push(docData);
                        allList.push(docData);
                    });
                    setAllList(allList);
                    setPendingList(pendingList);
                    setActiveList(activeList);
                    setClosedList(closedList);
                })
                .catch(error => {
                    console.log('Error getting document:', error);
                });
            })
        }
    }, []);

    return (
        <div className='dashboardContainer'>
            <h1>Vote</h1>
            <div>
                <button className='percentButton' onClick={() => setQuery('All')}>All</button>
                <button className='percentButton' onClick={() => setQuery('Active')}>Active</button>
                <button className='percentButton' onClick={() => setQuery('Pending')}>Pending</button>
                <button className='percentButton' onClick={() => setQuery('Closed')}>Closed</button>
            </div>
            <div className='studentsContainer'>
                {query === 'All' && allList.map(student => {
                    return(
                        <UserVoteBox data={student}/>
                    )
                })}
                {query === 'Pending' && pendingList.map(student => {
                    return(
                        <UserVoteBox data={student}/>
                    )
                })}
                {query === 'Closed' && closedList.map(student => {
                    return(
                        <UserVoteBox data={student}/>
                    )
                })}
                {query === 'Active' && activeList.map(student => {
                    return(
                        <UserVoteBox data={student}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Vote;