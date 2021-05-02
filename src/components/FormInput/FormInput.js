import React from 'react';

import styles from './FormInput.module.css';

const FormInput = ({children, title, value, setValue}) => {
    return (
        <div className={styles.container}>
            <label className={styles.label}>{title}</label>
            <input type='text' value={value} onChange={e => setValue(e.target.value)}/>
        </div>
    )
}

export default FormInput;