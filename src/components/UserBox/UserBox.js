import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserBox.module.css';
import { useAuth } from '../../hooks/AuthContext';

const UserBox = ({data, onClick}) => {

    const { role, currentUser } = useAuth();

    return (
        <div className={styles.container}>
            <img src={data.imageUrl} className={styles.img} alt={`${data.firstName} ${data.lastName} profile pic`}/>
            <h2>{data.firstName} {data.lastName}</h2>
            <p className={styles.university}>{data.university}</p>
            <p className={styles.major}>{data.major}</p>
            <NavLink 
                to={{pathname: `/student/${data.email.substring(0, data.email.indexOf('@'))}`, state: {email: data.email}}}
                className={styles.navLink}>
                Visit Student
            </NavLink>
            {currentUser && role === 'Admin' && !data.applicationApproved && <div style={{marginTop: '20px'}}>
                <a onClick={onClick} className={styles.navLink}>
                    Approve Application
                </a>
            </div>}        
        </div>
    );
}

export default UserBox;