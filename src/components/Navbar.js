import React from "react";
import '../styling/Navbar.css'
import {Link} from 'react-router-dom'
const NavBar = () => {
    return(
        <div className='navbar'>
            <h1>CodeCraft</h1>
            <div className='navbar-links'>
                <Link to='/'>Home</Link>
                <Link to='/learn'>Learn</Link>
                <Link to='/practice'>Practice</Link>
            </div>
        </div>
    );
};

export default NavBar;