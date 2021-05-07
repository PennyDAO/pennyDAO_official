import React from 'react';
import SideNavBar from '../SideNavBar/SideNavBar';
import WalletButton from '../WalletButton/WalletButton';
import Web3 from 'web3';
import { useAuth } from '../../hooks/AuthContext';

const Layout = ({children}) => {

    const { setAddress } = useAuth();

    const ethEnabled = async () => {
        if (window.ethereum) {
            await window.ethereum.send('eth_requestAccounts');
            window.web3 = new Web3(window.ethereum);
            window.web3.eth.getAccounts().then(add => setAddress(add[0]));
            return true;
        }
        return false;
    }

    const getAccount = async () => {
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        console.log(account);
    }

    if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
            getAccount();
            setAddress(accounts[0]);
        })
    }

    return (
        <div className='App'>
            <SideNavBar />
            <div className='dashboardWalletContainer'>
                <WalletButton onClick={() => ethEnabled()}/>
            </div>
            {children}
        </div>
    )
}

export default Layout;