import React from 'react';
import HeaderArea from './components/HeaderArea';
import FooterArea from './components/FooterArea';
import HeroArea from './components/HeroArea';
import RegularPage from './components/RegularPage';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <HeaderArea />
      <HeroArea />
      <RegularPage />
      <FooterArea />
    </div>
  );
}

export default App;
