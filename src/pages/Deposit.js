import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useAuth } from '../hooks/AuthContext';
import ERC20Contract from '../artifacts/ERC20.json';
import DepositContract from '../artifacts/Penny.json';
import { CHANGE_TOKEN_CONTRACT, DAI_TOKEN_CONTRACT } from '../utils';
import WrapperBox from '../components/WrapperBox/WrapperBox';
const BN = require('bn.js');

const Deposit = () => {

    const { address } = useAuth();
    const [daiAmount, setDaiAmount] = useState(0);
    const [depositAmount, setDepositAmount] = useState('');
    const [approved, setApproved] = useState(false);
    const [changeAmount, setCHANGEAmount] = useState(0);

    useEffect(() => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            var daiTokenInst = new window.web3.eth.Contract(ERC20Contract.abi, DAI_TOKEN_CONTRACT);
            daiTokenInst.methods.balanceOf(address).call().then(bal => setDaiAmount(Math.round(bal / (10 ** 18) * 100) / 100));
        }
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            var pnyTokenInst = new window.web3.eth.Contract(ERC20Contract.abi, CHANGE_TOKEN_CONTRACT);
            pnyTokenInst.methods.balanceOf(address).call().then(bal => setCHANGEAmount(Math.round(bal / (10 ** 18) * 100) / 100));
        }
    }, [address]);

    const getDAIAmount = () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            var daiTokenInst = new window.web3.eth.Contract(ERC20Contract.abi, DAI_TOKEN_CONTRACT);
            daiTokenInst.methods.balanceOf(address).call().then(bal => setDaiAmount(Math.round(bal / (10 ** 18) * 100) / 100));
        }
    }

    const getCHANGEAmount = () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            var pnyTokenInst = new window.web3.eth.Contract(ERC20Contract.abi, CHANGE_TOKEN_CONTRACT);
            pnyTokenInst.methods.balanceOf(address).call().then(bal => setCHANGEAmount(Math.round(bal / (10 ** 18) * 100) / 100));
        }
    }

    const depositDAI = () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            const num = depositAmount;
            const total = new BN(num.toString());
            let x = Math.pow(10, 18);
            const power = new BN(x.toString());
            const newTotal = total.mul(power);
            const contract = new web3.eth.Contract(DepositContract.abi, CHANGE_TOKEN_CONTRACT);
            contract.methods.deposit(newTotal).send({
                from: address
            })
            .then(data => {
                console.log(data);
                getCHANGEAmount();
                getDAIAmount();
            })
        }
    }

    const approveDAI = () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            const num = depositAmount;
            const total = new BN(num.toString());
            let x = Math.pow(10, 18);
            const power = new BN(x.toString());
            const newTotal = total.mul(power);
            const contract = new web3.eth.Contract(ERC20Contract.abi, DAI_TOKEN_CONTRACT);
            contract.methods.approve(CHANGE_TOKEN_CONTRACT, newTotal).send({
                from: address
            })
            .then(data => {
                console.log(data);
                setApproved(true);
                getCHANGEAmount();
                getDAIAmount();
            })
        }
    }

    return (
        <div className='dashboardContainer'>
            <h1>Deposit</h1>
            <WrapperBox>
                <div>
                    <br/>
                    <input 
                        type='text' 
                        value={depositAmount} 
                        onChange={e => setDepositAmount(e.target.value)}
                        className='depositInput'
                    />
                    <button className='depositButton' onClick={() => approved ? depositDAI() : approveDAI()}>
                        {approved ? 'Deposit' : 'Approve'}
                    </button>
                    <br/>
                    <br/>
                    <div>
                        <button className='percentButton' onClick={() => setDepositAmount('0')}>0%</button>
                        <button className='percentButton' onClick={() => setDepositAmount((daiAmount * 0.25).toString())}>25%</button>
                        <button className='percentButton' onClick={() => setDepositAmount((daiAmount * 0.50).toString())}>50%</button>
                        <button className='percentButton' onClick={() => setDepositAmount((daiAmount * 0.75).toString())}>75%</button>
                        <button className='percentButton' onClick={() => setDepositAmount(daiAmount.toString())}>100%</button>
                    </div>
                    <p>Your Wallet DAI Balance: <b>{daiAmount} $DAI</b></p>
                    <p>Your Wallet CHANGE Balance: <b>{changeAmount} $CHANGE</b></p>
                </div>
            </WrapperBox>
            
            
        </div>
    )
}

export default Deposit;