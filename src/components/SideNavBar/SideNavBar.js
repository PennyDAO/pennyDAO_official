import React, { useState, useEffect } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import styles from './SideNavBar.module.css';
import Logo from '../../images/pennyDAO_logo.png';
import { useAuth } from '../../hooks/AuthContext';
import { ReactComponent as ProfileLogo } from '../../images/profile.svg'
import { ReactComponent as StudentsLogo } from '../../images/students.svg'
import { ReactComponent as GrantStatusLogo } from '../../images/grant-status.svg'
import { ReactComponent as LogoutLogo } from '../../images/logout.svg'
import { ReactComponent as DepositLogo } from '../../images/deposit.svg';
import { ReactComponent as RegisterLogo } from '../../images/register.svg'

const PennyDAOLogo = ({onClick, alt}) => {
    return(
        <div className={styles.logo} onClick={onClick}>
            <img src={Logo} alt={alt}/>
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
            <div 
                className={styles.navLink}>
                <div className={styles.navSegmentImage}>
                   {children}
                </div>
                <span>{title}</span>
            </div>
        </div>
    )
}

const Hambuger = ({onClick}) => {
    return(
        <div className={styles.hamburger}>
            <label htmlFor="check" className={styles.label}>
                <input type="checkbox" id="check" onClick={onClick}/> 
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
    );
}

const MobileNavMenu = ({isOpen, onClick}) => {

    const history = useHistory();
    const { currentUser, logout } = useAuth();

    return (
        <div className={styles.mobileNavMenu} style={{left: isOpen ? 0 : '-100vw'}}>
            <ul>
                <li>
                    <span className={styles.navLink}  style={{ transition: 'opacity 1.2s ease-out, bottom 0.3s ease-out', opacity: isOpen ? 1 : 0, bottom: isOpen ? 0 : '-100px' }} onClick={onClick}>
                        Light Paper
                    </span>
                </li>
                {
                !currentUser && 
                <li>
                    <NavLink className={styles.navLink} to='/login' style={{ transition: 'opacity 1.2s ease-out, bottom 0.5s ease-out', opacity: isOpen ? 1 : 0, bottom: isOpen ? 0 : '-100px' }} onClick={onClick}>
                        Login
                    </NavLink>
                </li>
                }
                {
                !currentUser && 
                <li>
                    <NavLink className={styles.navLink} to='/register' style={{ transition: 'opacity 1.2s ease-out, bottom 0.7s ease-out', opacity: isOpen ? 1 : 0, bottom: isOpen ? 0 : '-100px' }} onClick={onClick}>
                        Register
                    </NavLink>
                </li>
                }
                {
                currentUser && 
                <li>
                    <NavLink className={styles.navLink} to='/dashboard' style={{ transition: 'opacity 1.2s ease-out, bottom 0.9s ease-out', opacity: isOpen ? 1 : 0, bottom: isOpen ? 0 : '-100px' }} onClick={onClick}>
                        Profile
                    </NavLink>
                </li>
                }
                {
                currentUser && 
                <li>
                    <NavLink className={styles.navLink} to='/students' style={{ transition: 'opacity 1.2s ease-out, bottom 0.9s ease-out', opacity: isOpen ? 1 : 0, bottom: isOpen ? 0 : '-100px' }} onClick={onClick}>
                        Students
                    </NavLink>
                </li>
                }
                {
                currentUser && 
                <li>
                    <NavLink className={styles.navLink} to='/grant-status' style={{ transition: 'opacity 1.2s ease-out, bottom 0.9s ease-out', opacity: isOpen ? 1 : 0, bottom: isOpen ? 0 : '-100px' }}>
                        Grant Status
                    </NavLink>
                </li>
                }
                {
                currentUser && 
                <li>
                    <p className={styles.navLink} onClick={() => {logout(); onClick(); history.push('/')}}>
                        Logout
                    </p>
                </li>
                }
            </ul>
        </div>
    )
}

const SideNavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const { currentUser, logout, role } = useAuth();

    useEffect(() => {

    }, []);

    return(
        <nav className={styles.nav}>
            <MobileNavMenu isOpen={isOpen} onClick={() => {!isOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'initial';}}/>
            <PennyDAOLogo onClick={() => history.push('/')} alt='PennyDAO logo'/>
            <div className={styles.navButtonContainer}>
                {
                    !currentUser && 
                    <NavSegment to='/login' title='Login'>
                        <ProfileLogo/>
                    </NavSegment>
                }
                {
                    !currentUser && 
                    <NavSegment to='/register' title='Register'>
                        <RegisterLogo/>
                    </NavSegment>
                }
                {
                currentUser && (role === 'Student' || role === 'Investor') &&
                <NavSegment to='/dashboard' title='Profile'>
                    <ProfileLogo/>
                </NavSegment>
                }
                {
                currentUser && (role === 'Student' || role === 'Investor') && 
                <NavSegment to='/students' title='Students'>
                    <StudentsLogo/>
                </NavSegment>
                }
                {
                currentUser && role === 'Student' &&
                <NavSegment to='/grant-status' title='Grant Status'>
                    <GrantStatusLogo/>
                </NavSegment>
                }
                {
                currentUser && role === 'Investor' &&
                <NavSegment to='/vote' title='Vote'>
                    <GrantStatusLogo/>
                </NavSegment>
                }
                {
                currentUser && role === 'Investor' &&
                <NavSegment to='/deposit' title='Deposit'>
                    <DepositLogo/>
                </NavSegment>
                }
                {
                currentUser && role === 'Admin' &&
                <NavSegment to='/admin-dashboard' title='Admin Dashboard'>
                    <DepositLogo/>
                </NavSegment>
                }
                {
                currentUser && 
                <LogoutSegment onClick={() => {logout(); history.push('/');}} title='Logout'>
                    <LogoutLogo/>
                </LogoutSegment>
                }
            </div>
            <Hambuger onClick={() => {setIsOpen(!isOpen); !isOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'initial';}}/>
        </nav>
    )
}

export default SideNavBar;