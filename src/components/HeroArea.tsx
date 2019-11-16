import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const slideIndices: number[] = [1, 2, 3, 4];

const HeroArea: React.FC = () => {
  return (
      <div className="container-fluid">
        <OwlCarousel animateOut='slideInLeft' animateIn='flipInX' margin={30} autoWidth nav>
          { slideIndices.map((index) => <div className="owl-item" key={index.toString()}><img src={`images/blog-img/bg${index}.jpg`} alt=''/></div>) }
        </OwlCarousel>
      </div>
  );
}

export default HeroArea;