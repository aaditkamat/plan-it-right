import React from 'react';
import Navigation from './Navigation';
import './FooterArea.scss';

const FooterArea: React.FC = () => {
    return (
        <footer className="footer-area"> 
            <Navigation hasLine={false} />
        </footer>
    );
}

export default FooterArea;