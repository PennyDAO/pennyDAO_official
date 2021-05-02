import React, { useState, useEffect } from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import styles from './NavBar.module.css';
import Logo from '../../images/pennyDAO_logo.png';
import { useAuth } from '../../hooks/AuthContext';

const PennyDAOLogo = ({onClick}) => {
    return(
        <div className={styles.logo} onClick={onClick}>
            <img src={Logo}/>
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

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const { currentUser } = useAuth();

    useEffect(() => {
        if(isOpen){
          }   
    }, []);

    return(
        <nav className={styles.nav}>
            
            <PennyDAOLogo onClick={() => history.push('/')}/>
            <MobileNavMenu isOpen={isOpen}/>
            <ul>
                <li>
                    <a>
                        Light Paper
                    </a>
                </li>
                {
                !currentUser && 
                <li>
                    <NavLink className='nav-link' to='/login'>
                        Login
                    </NavLink>
                </li>
                }
                {
                !currentUser && 
                <li>
                    <NavLink className='nav-link' to='/register'>
                        Register
                    </NavLink>
                </li>
                }
                {
                currentUser && 
                <li>
                    <NavLink className='nav-link' to='/dashboard'>
                        Profile
                    </NavLink>
                </li>
                }
            </ul>
            <Hambuger onClick={() => {setIsOpen(!isOpen); !isOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'initial';}}/>
        </nav>
    )
}

export default NavBar;

