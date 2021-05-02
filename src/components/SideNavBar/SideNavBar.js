import React, { useState, useEffect } from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import styles from './SideNavBar.module.css';
import Logo from '../../images/pennyDAO_logo.png';
import { useAuth } from '../../hooks/AuthContext';
import { ReactComponent as ProfileLogo } from '../../images/profile.svg'
import { ReactComponent as StudentsLogo } from '../../images/students.svg'
import { ReactComponent as GrantStatusLogo } from '../../images/grant-status.svg'
import { ReactComponent as LogoutLogo } from '../../images/logout.svg'

const PennyDAOLogo = ({onClick}) => {
    return(
        <div className={styles.logo} onClick={onClick}>
            <img src={Logo}/>
        </div>
    )
}

const NavSegment = ({children, to, title}) => {
    return (
        <div className={styles.navSegment}>         
            <NavLink 
                to={to}
                className={styles.navLink}
                activeClassName={styles.navLinkActive}>
                <div className={styles.navSegmentImage}>
                   {children}
                </div>
                <span>{title}</span>
            </NavLink>
        </div>
    )
}

const LogoutSegment = ({children, onClick, title}) => {
    return (
        <div className={styles.navSegment} onClick={onClick}>         
            <a 
                className={styles.navLink}
                activeClassName={styles.navLinkActive}>
                <div className={styles.navSegmentImage}>
                   {children}
                </div>
                <span>{title}</span>
            </a>
        </div>
    )
}

const Hambuger = ({onClick}) => {
    return(
        <div className={styles.hamburger}>
            <label for="check" className={styles.label}>
                <input type="checkbox" id="check" onClick={onClick}/> 
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
    );
}

const MobileNavMenu = ({isOpen}) => {
    return (
        <div className={styles.mobileNavMenu} style={{left: isOpen ? 0 : '-100vw'}}>
            <ul>
                <li>
                    <a style={{ transition: 'opacity 1s ease-out, bottom 0.5s ease-out', opacity: isOpen ? 1 : 0, bottom: isOpen ? 0 : '-100px' }}>Product</a>
                </li>
                <li>
                    <a style={{ transition: 'opacity 1.2s ease-out, bottom 0.7s ease-out', opacity: isOpen ? 1 : 0, bottom: isOpen ? 0 : '-100px' }}>Team</a>
                </li>
                <li>
                    <a style={{ transition: 'opacity 1.4s ease-out, bottom 0.9s ease-out', opacity: isOpen ? 1 : 0, bottom: isOpen ? 0 : '-100px' }}>Light Paper</a>
                </li>
            </ul>
        </div>
    )
}

const SideNavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const { currentUser, logout } = useAuth();

    useEffect(() => {
        if(isOpen){
          }   
    }, []);

    return(
        <nav className={styles.nav}>
            <MobileNavMenu isOpen={isOpen}/>
            <PennyDAOLogo onClick={() => history.push('/')}/>
            <div className={styles.navButtonContainer}>
                {
                currentUser && 
                <NavSegment to='/dashboard' title='Profile'>
                    <ProfileLogo/>
                </NavSegment>
                }
                {
                currentUser && 
                <NavSegment to='/students' title='Students'>
                    <StudentsLogo/>
                </NavSegment>
                }
                {
                currentUser && 
                <NavSegment to='/grant-status' title='Grant Status'>
                    <GrantStatusLogo/>
                </NavSegment>
                }
                {
                currentUser && 
                <LogoutSegment onClick={() => {logout(); history.push('/')}} title='Logout'>
                    <LogoutLogo/>
                </LogoutSegment>
                }
            </div>
            <Hambuger onClick={() => {setIsOpen(!isOpen); !isOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'initial';}}/>
        </nav>
    )
}

export default SideNavBar;