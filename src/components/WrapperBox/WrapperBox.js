import React from 'react';
import styles from './WrapperBox.module.css'

const WrapperBox = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}

export default WrapperBox;