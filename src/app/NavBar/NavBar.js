import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styles from './NavBar.module.css';
import Logo from '../../images/pennyDAO_logo.png';
import { useAuth } from '../../hooks/AuthContext';

const PennyDAOLogo = ({onClick, alt}) => {
    return(
        <div className={styles.logo} onClick={onClick}>
            <img src={Logo} alt={alt}/>
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

const MobileNavMenu = ({isOpen, onClick}) => {

    const history = useHistory();
    const { currentUser, logout } = useAuth();

    return (
        <div className={styles.mobileNavMenu} style={{left: isOpen ? 0 : '-100vw'}}>
            <ul>
                <li>
                    <a style={{ transition: 'opacity 1.2s ease-out, bottom 0.3s ease-out', opacity: isOpen ? 1 : 0, bottom: isOpen ? 0 : '-100px' }} onClick={onClick}>
                        Light Paper
                    </a>
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
                    <a className={styles.navLink} onClick={() => {logout(); onClick(); history.push('/')}}>
                        Logout
                    </a>
                </li>
                }
            </ul>
        </div>
    )
}

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const { currentUser, logout } = useAuth();

    useEffect(() => {
    }, []);

    return(
        <nav className={styles.nav}>
            
            <PennyDAOLogo onClick={() => history.push('/')} alt='PennyDAO Logo'/>
            <MobileNavMenu isOpen={isOpen} onClick={() => {setIsOpen(false); !isOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'initial';}}/>
            <ul>
                <li>
                    <a>
                        Light Paper
                    </a>
                </li>
                {
                !currentUser && 
                <li>
                    <NavLink className={styles.navLink} to='/login'>
                        Login
                    </NavLink>
                </li>
                }
                {
                !currentUser && 
                <li>
                    <NavLink className={styles.navLink} to='/register'>
                        Register
                    </NavLink>
                </li>
                }
                {
                currentUser && 
                <li>
                    <NavLink className={styles.navLink} to='/dashboard'>
                        Profile
                    </NavLink>
                </li>
                }
                {
                currentUser && 
                <li>
                    <a className={styles.navLink} onClick={() => {logout(); history.push('/')}}>
                        Logout
                    </a>
                </li>
                }
            </ul>
            <Hambuger onClick={() => {setIsOpen(!isOpen); !isOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'initial';}}/>
        </nav>
    )
}

export default NavBar;

