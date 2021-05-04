import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserBox.module.css';

const UserBox = ({data}) => {
    return (
        <div className={styles.container}>
            <img src={data.imageUrl} className={styles.img}/>
            <h2>{data.firstName} {data.lastName}</h2>
            <p className={styles.university}>{data.university}</p>
            <p className={styles.major}>{data.major}</p>
            <NavLink 
                to={{pathname: `/student/${data.email.substring(0, data.email.indexOf('@'))}`, state: {email: data.email}}}
                className={styles.navLink}>
                Visit Student
            </NavLink>
        </div>
    );
}

export default UserBox;