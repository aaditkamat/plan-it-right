import React from 'react';
import Navigation from './Navigation';
import './HeaderArea.scss';

const HeaderArea: React.FC = () => {
    return (
        <header className="header-area">
            <div className="row" style={{height: '20px'}}></div>
            <Navigation hasLine />
        </header>
        
    );
}

export default HeaderArea;