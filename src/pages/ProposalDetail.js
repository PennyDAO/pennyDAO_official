import React, { useEffect, useState } from 'react';
import app from '../firebase';
import Web3 from 'web3';
import StudentProfile from '../components/StudentProfile/StudentProfile';
import DepositContract from '../artifacts/Penny.json';
import { CHANGE_TOKEN_CONTRACT } from '../utils';

const ProposalDetails = ({location}) => {

    const [data, setData] = useState({});
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [voteResults, setVoteResults] = useState({});

    useEffect(() => {
        setData(location.state.data);
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            const tokenInst = new window.web3.eth.Contract(DepositContract.abi, CHANGE_TOKEN_CONTRACT);
            tokenInst.methods.voteStartTimestamp().call()
            .then(timestamp => {
                setStartTime(timestamp);
                const end_time = parseInt(timestamp) + 30 * 60;
                setEndTime(end_time.toString())
            })
            tokenInst.methods.getVotes(0).call()
            .then(res => {
                console.log(res);
                setVoteResults(res);
            })
        }
    }, [location]);

    const formatTime = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var time = `${month} ${date}, ${year}, ${formatAMPM(hour, min)}`
        return time;
    }

    const formatAMPM = (hours, minutes) => {
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

    const vote = (decision) => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            const tokenInst = new window.web3.eth.Contract(DepositContract.abi, CHANGE_TOKEN_CONTRACT);
            tokenInst.methods.vote(decision).call()
            .then(res => {
                console.log(res);
                if (res)
                    console.log('res', res);
                else {
                    const studentRef = app.firestore().collection('students');
                    const username = `${data.email.substring(0, data.email.indexOf('@'))}`
                    studentRef.doc(username).update({
                        applicationStatus: 'Closed',
                    })
                    .then(r => console.log('r', r))
                }
            })
            .catch(console.log);
        }
    }

    const yesPercent = () => {
        const yayAmount = parseInt(voteResults['yayAmount']);
        const nayAmount = parseInt(voteResults['nayAmount']);
        if (yayAmount + nayAmount === 0)
            return 0
        else
            return yayAmount / (yayAmount + nayAmount);
    }

    const noPercent = () => {
        const yayAmount = parseInt(voteResults['yayAmount']);
        const nayAmount = parseInt(voteResults['nayAmount']);
        if (yayAmount + nayAmount === 0)
            return 0
        else
            return nayAmount / (yayAmount + nayAmount);
    }

    return (
        <div className='dashboardContainer'>
            <div style={{textAlign: 'left', marginLeft: '50px'}}>
                <h1>Grant Proposal for {data.firstName} {data.lastName}: ${data.grantAmount}</h1>
                <p>Start Date: {data.applicationStatus === 'Active' ? formatTime(startTime) : 'Not Started Yet'}</p>
                <p>End Date: {data.applicationStatus === 'Active' ? formatTime(endTime) : 'Not Started Yet'}</p>
                {data.applicationStatus === 'Active' && <div>
                    <button onClick={() => vote(true)}>Yes</button>
                    <button onClick={() => vote(false)}>No</button>
                </div>}
                <br/>
                <div style={{width: '50%'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>Yes {voteResults['yayAmount']} $CHANGE</span>
                        <span>{yesPercent()}%</span>
                    </div>
                    <span className='progress'>
                        <span className='progress-bg' style={{width: `${yesPercent()}%`}}></span>
                    </span>
                </div>
                <br/>
                <div style={{width: '50%'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>No {voteResults['yayAmount']} $CHANGE</span>
                        <span>{noPercent()}%</span>
                    </div>
                    <span className='progress'>
                        <span className='progress-bg' style={{width: `${noPercent()}%`}}></span>
                    </span>
                </div>
                
            </div>
            <StudentProfile data={data}/>
        </div>
    )
}

export default ProposalDetails;