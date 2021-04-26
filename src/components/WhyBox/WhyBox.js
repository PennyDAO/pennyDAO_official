import React from 'react';
import styles from './WhyBox.module.css';

const WhyBox = ({title, description, color}) => {

    return(
        <div className={styles.container}>
            <div className={styles.circle} style={{backgroundColor: color}}></div>
            <h3 className='title'>{title}</h3>
            <p className='description'>{description}</p>
        </div>
    )

}

export default WhyBox;