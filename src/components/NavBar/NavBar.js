import React, { useState, useEffect } from 'react';
import styles from './NavBar.module.css';
import Logo from '../../images/pennyDAO_logo.png';

const PennyDAOLogo = () => {
    return(
        <div className={styles.logo}>
            <img src={Logo}/>
        </div>
    )
}

const Hambuger = ({onClick}) => {
    return(
        <div className={styles.hamburger}>
            <label for="check" >
                <input type="checkbox" id="check" onClick={onClick}/> 
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
    );
}

const MobileNavMenu = () => {
    return (
        <div className={styles.mobileNavMenu}>
            <ul>
                <li>
                    <a>Product</a>
                </li>
                <li>
                    <a>Team</a>
                </li>
                <li>
                    <a>Light Paper</a>
                </li>
            </ul>
        </div>
    )
}

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if(isOpen){
          }   
    }, []);

    return(
        <nav className={styles.nav}>
            
            <PennyDAOLogo />
            {isOpen ? <MobileNavMenu /> : null}
            <ul>
                <li>
                    <a>Product</a>
                </li>
                <li>
                    <a>Team</a>
                </li>
                <li>
                    <a>Light Paper</a>
                </li>
            </ul>
            <Hambuger onClick={() => {setIsOpen(!isOpen); !isOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'initial';}}/>
        </nav>
    )
}

export default NavBar;

