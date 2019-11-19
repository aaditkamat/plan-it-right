import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import bg1 from '../images/blog-img/bg1.jpg';
import bg2 from '../images/blog-img/bg2.jpg';
import bg3 from '../images/blog-img/bg3.jpg';
import bg4 from '../images/blog-img/bg4.jpg';

const HeroArea: React.FC = () => {
    const carousel = (
        <OwlCarousel
            animateOut="slideInLeft"
            animateIn="flipInX"
            margin={10}
            autoWidth={true}
            nav={true}>
            <div className="item" key="1">
                <img src={bg1} alt="" />
            </div>
            <div className="item" key="2">
                <img src={bg2} alt="" />
            </div>
            <div className="item" key="3">
                <img src={bg3} alt="" />
            </div>
            <div className="item" key="4">
                <img src={bg4} alt="" />
            </div>
        </OwlCarousel>
    );
    carousel.next(60);
    return <div className="hero-area" />;
};

export default HeroArea;
