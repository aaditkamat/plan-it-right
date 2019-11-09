import React, { useState } from 'react';
import { Collapse, Navbar, Nav, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import './HeaderArea.scss';

const HeaderArea: React.FC = () => {
    const [ isOpen ] = useState(false);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Navbar expand="lg">
                        <NavbarBrand> 
                            <img src="images/core-img/logo.png" alt="Logo" />
                        </NavbarBrand>
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="ml-auto" id="worldNav" navbar>
                                <NavItem>
                                    <NavLink href="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/destinations">Destination</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/contact">Contact Us</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            </div>
        </div>
    );
}

export default HeaderArea;