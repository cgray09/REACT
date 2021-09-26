import React from 'react'; 
import {  Navbar, Container } from 'react-bootstrap'

const Footer = () => {
    
        return(
            <div className="fixed-bottom">  
                <Navbar>
                    <Container>
                        <div class="footer-container">
                            <span class="m">&copy; Christian V. Grayson</span>
                            <span class="m">Privacy</span>
                            <span class="m c">Terms of Service</span>
                        </div>
                    </Container>
                </Navbar>
            </div>
        )
    
}

export default Footer;