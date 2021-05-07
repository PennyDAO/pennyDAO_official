import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useAuth } from '../hooks/AuthContext';
import ERC20Contract from '../artifacts/ERC20.json';
import DepositContract from '../artifacts/Penny.json';
const BN = require('bn.js');

const Deposit = () => {

    const { data, address } = useAuth();
    const [profileData, setProfileData] = useState({});
    const [daiAmount, setDaiAmount] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);
    const [approved, setApproved] = useState(false);
    const [pnyAmount, setPnyAmount] = useState(0);

    useEffect(() => {
        setProfileData(JSON.parse(data));
        getDAIAmount();
        getPENNYAmount();
        
    }, [data]);

    const getDAIAmount = () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            const daiTokenAddress = '0xdc31ee1784292379fbb2964b3b9c4124d8f89c60';
            var daiTokenInst = new window.web3.eth.Contract(ERC20Contract.abi, daiTokenAddress);
            daiTokenInst.methods.balanceOf(address).call().then(bal => setDaiAmount(Math.round(bal / (10 ** 18) * 100) / 100));
        }
    }

    const getPENNYAmount = () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            const pnyTokenAddress = '0xcdc481031e23aed8cbbe6e07a638298a790d445a';
            var pnyTokenInst = new window.web3.eth.Contract(ERC20Contract.abi, pnyTokenAddress);
            pnyTokenInst.methods.balanceOf(address).call().then(bal => setPnyAmount(Math.round(bal / (10 ** 18) * 100) / 100));
        }
    }

    const depositDAI = () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            const num = depositAmount * Math.pow(10, 18);
            const numAsHex = "0x" + num.toString(16);
            const dataParams = new BN(numAsHex);
            console.log(numAsHex);
            const contract = new web3.eth.Contract(DepositContract.abi, '0xCDC481031E23AEd8CbBe6e07A638298a790D445a');
            contract.methods.deposit(dataParams).send({
                from: address
            })
            .then(console.log)
        }
    }

    const approveDAI = () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            const num = depositAmount * Math.pow(10, 18);
            const numAsHex = "0x" + num.toString(16);
            const contract = new web3.eth.Contract(ERC20Contract.abi, '0xdc31ee1784292379fbb2964b3b9c4124d8f89c60');
            contract.methods.approve('0xCDC481031E23AEd8CbBe6e07A638298a790D445a', new BN(numAsHex)).send({
                from: address
            })
            .then(data => {
                console.log(data);
                setApproved(true);
            })
        }
    }

    return (
        <div className='dashboardContainer'>
            <h1>Deposit</h1>
            <h3>Your Wallet DAI Amount: {daiAmount} $DAI</h3>
            <h3>Your Wallet PNY Amount: {pnyAmount} $PNY</h3>
            <input className='depositInput' onChange={e => setDepositAmount(e.target.value)} value={depositAmount}></input>
            <div>
                <button className='percentButton' onClick={() => setDepositAmount(0)}>0%</button>
                <button className='percentButton' onClick={() => setDepositAmount(daiAmount * 0.25)}>25%</button>
                <button className='percentButton' onClick={() => setDepositAmount(daiAmount * 0.50)}>50%</button>
                <button className='percentButton' onClick={() => setDepositAmount(daiAmount * 0.75)}>75%</button>
                <button className='percentButton' onClick={() => setDepositAmount(daiAmount)}>100%</button>
            </div>
            <div className='depositInputContainer'>
                <button className='approveButton' onClick={() => approveDAI()} disabled={approved}>Approve DAI</button>
                <button className='depositInputButton' onClick={() => depositDAI()} disabled={!approved}>Deposit</button>
            </div>
            
        </div>
    )
}

export default Deposit;