import React from 'react';
import Navigation from './Navigation';
import './HeaderArea.scss';

const HeaderArea: React.FC = () => {
    return (
        <header className="header-area">
            <div className="row" style={{ height: '20px' }} />
            <Navigation hasLine={true} />
        </header>
    );
};

export default HeaderArea;
