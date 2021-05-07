import React from 'react';
// import styles from './ProposalBox.module.css';

const ProposalBox = ({status, title, onClick}) => {
    return (
        <div>
            <div>
                {status}
            </div>
            <p onClick={onClick}>{title}</p>
        </div>
    )
}

export default ProposalBox;