import React from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import Line from './Line';

interface Link {
    label: string,
    href: string
}

interface NavigationProps {
    hasLine: boolean
}

const links: Array<Link> = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "Destinations",
        href: "/destinations"
    },
    {
        label: "Contact Us",
        href: "/contact"
    }
]

const Navigation = (props: { hasLine: boolean; }) => {
    const generateLink: (link: Link) => JSX.Element = (link: Link) => {
        return (
            <NavItem key={link.label}>
                <NavLink href={link.href}>{link.label}</NavLink>
            </NavItem>
        );
    }

    const renderLine: (hasLine: boolean) => JSX.Element | void = (hasLine: boolean) => {
        if (hasLine) {
            return (
                <Line />
            );
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Navbar className="h-50" expand="md">
                        <NavbarBrand> 
                            <img src="images/core-img/logo.png" alt="Logo" />
                        </NavbarBrand>
                        <Nav navbar>
                            {links.map((item) => generateLink(item))}
                        </Nav>
                    </Navbar>
                    { renderLine(props.hasLine) }
                </div>
            </div>
        </div>
    );
}

export default Navigation;