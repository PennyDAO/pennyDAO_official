import React from 'react';
import styles from './WalletButton.module.css'
import { useAuth } from '../../hooks/AuthContext';

const WalletButton = ({onClick}) => {

    const { address } = useAuth();
    
    return (
        <button className={styles.walletContainer} onClick={onClick}>
            {address ? `${address.substring(0,5)}...${address.substring(address.length - 5, address.length)}` : 'Connect to Wallet'}
        </button>
    )
}

export default WalletButton;