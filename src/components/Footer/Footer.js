import React from 'react'
 
import styles from "./Footer.module.css"

const Footer = () => {
    return(
        <footer className={styles.footer}>
            <div className={styles.blurb}>
                <p>Created with <span role="img" aria-label="emoji">💛</span></p> 
                <p>By the PennyDAO Team</p>
            </div>

            <div className={styles.linksContainer}>
                <div className={styles.box}>
                    <a href="mailto:codyenokida@gmail.com" target="_blank" rel="noopener noreferrer">EMAIL</a>
                </div>
                <div className={styles.box}>
                    <a href="https://github.com/PennyDAO" target="_blank" rel="noopener noreferrer">GITHUB</a>
                </div>
            </div>

        </footer>
    )
}

export default Footer