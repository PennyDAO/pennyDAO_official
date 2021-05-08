import React from 'react';
import styles from './ProposalBox.module.css';

const ProposalBox = ({status, title, isActive, onClick}) => {
    return (
        <div className={styles.container}>
            <div>
                {console.log(status)}
                {status === 1 && <span className={styles.status}>Active</span>}
                {status === 2 && <span className={styles.status}>Closed</span>}
                <span onClick={onClick}>{title}</span>
            </div>
        </div>
    )
}

export default ProposalBox;