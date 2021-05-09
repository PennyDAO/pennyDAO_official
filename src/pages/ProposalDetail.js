import React, { useEffect, useState } from 'react';
import app from '../firebase';
import Web3 from 'web3';
import DepositContract from '../artifacts/Penny.json';
import { CHANGE_TOKEN_CONTRACT } from '../utils';
import { useAuth } from '../hooks/AuthContext';
import ProposalProfile from '../components/ProposalProfile/ProposalProfile';

const ProposalDetails = ({location}) => {

    const [data, setData] = useState({});
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [yayAmount, setYayAmount] = useState(0);
    const [nayAmount, setNayAmount] = useState(0);

    const { address } = useAuth();

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
            tokenInst.methods.getVotes(location.state.data.applicationID).call()
            .then(res => {
                const y = parseInt(res.yayAmount) / Math.pow(10, 18);
                const n = parseInt(res.nayAmount) / Math.pow(10, 18);
                setYayAmount(y);
                setNayAmount(n);
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
            tokenInst.methods.vote(decision).send({
                from: address
            })
            .then(res => {
                if (res) {
                    tokenInst.methods.getVotes(0).call()
                    .then(res => {
                        const y = parseInt(res.yayAmount) / Math.pow(10, 18);
                        const n = parseInt(res.nayAmount) / Math.pow(10, 18);
                        setYayAmount(y);
                        setNayAmount(n);
                    })
                }
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
        if (yayAmount + nayAmount === 0)
            return 0
        else
            return yayAmount / (yayAmount + nayAmount) * 100;
    }

    const noPercent = () => {
        if (yayAmount + nayAmount === 0)
            return 0
        else
            return nayAmount / (yayAmount + nayAmount) * 100;
    }

    return (
        <div className='dashboardContainer'>
            <h1 style={{textAlign: 'left', marginLeft: '50px'}}>Grant Proposal for {data.firstName} {data.lastName}: ${data.grantAmount}</h1>
            <div className='proposalContainer'>
                <ProposalProfile data={data}/>
                <div style={{marginLeft: '50px'}}>
                    <h3>Start Date: <span>{data.applicationStatus === 'Active' ? formatTime(startTime) : 'Not Started Yet'}</span></h3>
                    <h3>End Date: <span>{data.applicationStatus === 'Active' ? formatTime(endTime) : 'Not Started Yet'}</span></h3>
                    {data.applicationStatus === 'Active' && <div style={{display: 'flex', justifyContent: 'space-between', width: '35%'}}>
                        <button onClick={() => vote(true)} className='voteButton'>Yes</button>
                        <button onClick={() => vote(false)} className='voteButton'>No</button>
                    </div>}
                    <br/>
                    <div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <span>Yes {yayAmount} $CHANGE</span>
                            <span>{yesPercent()}%</span>
                        </div>
                        <span className='progress'>
                            <span className='progress-bg' style={{width: `${yesPercent()}%`, transition: 'width 0.5s ease-in'}}></span>
                        </span>
                    </div>
                    <br/>
                    <div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <span>No {nayAmount} $CHANGE</span>
                            <span>{noPercent()}%</span>
                        </div>
                        <span className='progress'>
                            <span className='progress-bg' style={{width: `${noPercent()}%`, transition: 'width 0.5s ease-in'}}></span>
                        </span>
                    </div>
                </div>            
            </div>
        </div>
    )
}

export default ProposalDetails;