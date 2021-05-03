import React from 'react';

import styles from './FormRadioInput.module.css';

const FormRadioInput = ({children, title, value, setValue}) => {
    return (
        <div className={styles.container}>
            <label>Student Grant Amount</label>
            <div className={styles.childrenContainer}>
            {children}
            </div>
        </div>
    )
}

export default FormRadioInput;