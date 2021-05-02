import React from 'react';
import styles from './WalletButton.module.css'

const WalletButton = () => {
    return (
        <button className={styles.walletContainer}>
            Connect to Wallet
        </button>
    )
}

export default WalletButton;