import React from 'react';
import styles from './CircleButton.module.css';

const CircleButton = ({onClick, disabled}) => {
    return (
        <button onClick={onClick} className={disabled ? styles.disabledContainer :styles.container}>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.66025 5L22.6603 13.6603L7.66025 22.3205L7.66025 5Z" fill="#FFFAF2"/>
            </svg>
        </button> 
    )
}

export default CircleButton;