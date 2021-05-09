import React from 'react';
import styles from './StudentProfile.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from '../../hooks/AuthContext';
import { NavLink } from 'react-router-dom';

const InfoBox = ({title, subTitle}) => {
    return (
        <div className={styles.infoBox}>
            <p><b>{title}</b></p>
            <p>{subTitle}</p>
        </div>
    )
}

const StudentProfile = ({data}) => {

    const { currentUser } = useAuth();

    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <img src={data.imageUrl} className={styles.img} alt={`${data.firstName} ${data.lastName} profile`}/>
                {/* <p className={data.applicationStatus ? styles.grantStatus : styles.grantStatusActive}>{data.applicationStatus !== 'Closed' ? 'Grant Pending' : 'Grant Approved!'}</p> */}
                {data.email === currentUser.email && <div className='navLinkContainer'>
                    <NavLink to='/edit/application' className='editApplicationButton'>Edit Application</NavLink>
                </div>}
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.titleContainer}>
                    <h1>{data.firstName} {data.lastName}</h1>
                    <p>{data.university} | {data.gradYear}</p>
                </div>
                <div style={{width: '100%', borderBottom: '1px solid black', height: '10px'}}></div>
                <div className={styles.textContainer}>
                    <InfoBox 
                        title='Major/Area of Focus' 
                        subTitle={data.major}/>
                    <div style={{width: '100%'}}>
                        <InfoBox 
                            title='About Me' 
                            subTitle={data.description}/>
                    </div>
                    <InfoBox 
                        title='Pitch Video' 
                        subTitle={data.youtube}/>
                </div>
                <div className={styles.socialsContainer}>
                    <a className={styles.socialButton} href={data.twitter} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faTwitter} size='2x'/>
                    </a>
                    <a className={styles.socialButton} href={data.instagram} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size='2x'/>
                    </a>
                    <a className={styles.socialButton} href={data.linkedIn} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} size='2x'/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default StudentProfile;