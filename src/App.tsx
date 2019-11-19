import React from 'react';
import HeaderArea from './components/HeaderArea';
import FooterArea from './components/FooterArea';
import Login from './components/Login';
import './App.scss';
import HeroArea from './components/HeroArea';

const App: React.FC = () => {
    return (
        <div className="App">
            <HeaderArea />
            <HeroArea />
            <Login />
            <FooterArea />
        </div>
    );
};

export default App;
