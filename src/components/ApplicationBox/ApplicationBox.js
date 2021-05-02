import React from 'react';
import styles from './ApplicationBox.module.css'

const ApplicationBox = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}

export default ApplicationBox;