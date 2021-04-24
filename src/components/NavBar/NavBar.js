import React from 'react';
import './NavBar.module.css';
import Logo from '../../images/pennyDAO_logo.png';

const PennyDAOLogo = () => {
    return(
        <div className="logo">
            <img src={Logo}/>
        </div>
    )
}

const NavBar = () => {
    return(
        <nav>
            <PennyDAOLogo />
            <ul>
                <li>
                    <a>Product</a>
                </li>
                <li>
                    <a>Team</a>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;