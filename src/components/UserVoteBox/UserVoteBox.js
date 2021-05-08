import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserVoteBox.module.css';
import { useAuth } from '../../hooks/AuthContext';

const UserVoteBox = ({data, onClick}) => {

    const { role, currentUser } = useAuth();

    return (
        <div className={styles.container}>
            <p className={styles.applicationStatus} style={{backgroundColor: data.applicationStatus === 'Active' ? 'red' : data.applicationStatus === 'Pending' ? 'blue' : 'purple'}}>
                {data.applicationStatus}
            </p>
            <img src={data.imageUrl} className={styles.img} alt={`${data.firstName} ${data.lastName} profile pic`}/>
            <h2>{data.firstName} {data.lastName}</h2>
            <p className={styles.university}>{data.university}</p>
            <p className={styles.university}>Grant Amount: {data.grantAmount}</p>
            <NavLink 
                to={{pathname: `/proposal/${data.email.substring(0, data.email.indexOf('@'))}`, state: {data: data}}}
                className={styles.navLink}>
                View Proposal
            </NavLink>
            {currentUser && role === 'Admin' && !data.applicationApproved && <div style={{marginTop: '20px'}}>
                <p onClick={onClick} className={styles.navLink}>
                    Approve Application
                </p>
            </div>}        
        </div>
    );
}

export default UserVoteBox;
