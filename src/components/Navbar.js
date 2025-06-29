import React from "react";
import '../styling/Navbar.css'
import {Link} from 'react-router-dom'
const NavBar = () => {
    return(
        <div className='navbar'>
            <Link to='/'
            style={{ textDecoration: 'none', color: 'white' }}
            ><h1>CodeCraft</h1></Link>
            
            <div className='navbar-links'>
                
                {/* <Link to='/learn'>Learn</Link> */}
                {/* <Link to='/practice'>Practice</Link> */}
            </div>
        </div>
    );
};

export default NavBar;