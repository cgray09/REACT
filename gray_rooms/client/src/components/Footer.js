import React from 'react'; 
import {  Navbar, Container } from 'react-bootstrap'

const Footer = () => {
    
        return(
            <div>  
                <Navbar className="nav-container">
                    <span className="m x">&copy; Christian V. Grayson</span>
                    <span className="m">Privacy</span>
                    <span className="m">Terms of Service</span>
                </Navbar>
            </div>
        )
    
}

export default Footer;