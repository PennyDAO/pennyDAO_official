import React from 'react';
import styles from './UserProfile.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"

const InfoBox = ({title, subTitle}) => {
    return (
        <div className={styles.infoBox}>
            <p><b>{title}</b></p>
            <p>{subTitle}</p>
        </div>
    )
}

const UserProfile = ({data}) => {

    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <img src={data.imageUrl} className={styles.img} alt={`${data.firstName} ${data.lastName} profile`}/>
                {data.role === 'Student' && <p className={data.grantPending ? styles.grantStatus : styles.grantStatusActive}>{data.grantPending ? 'Grant Pending' : 'Grant Approved!'}</p>}
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.titleContainer}>
                    <h1>{data.firstName} {data.lastName}</h1>
                    <p>{data.university} | {data.gradYear}</p>
                </div>
                <div style={{width: '100%', borderBottom: '1px solid black', height: '10px'}}></div>
                <div className={styles.textContainer}>
                    { data.role === 'Student' && <InfoBox 
                        title='Major/Area of Focus' 
                        subTitle={data.major}/>}
                    { data.role === 'Student' && <InfoBox 
                        title='Orginizations' 
                        subTitle={data.major}/>}
                    <div style={{width: '100%'}}>
                        <InfoBox 
                            title='About Me' 
                            subTitle={data.description}/>
                    </div>
                    { data.role === 'Student' && <InfoBox 
                            title='Pitch Video' 
                            subTitle={data.youtube}/>}
                    { data.role === 'Admin' && 
                        <div>
                            hello
                        </div>
                    }
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

export default UserProfile;