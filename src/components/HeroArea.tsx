import React, { useState } from 'react';
import { CarouselItem, Carousel } from 'reactstrap';
import './HeroArea.scss';

const HeroArea: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const indices: Array<Number> = [1, 2, 3];

    const next = () => {
        const nextIndex = activeIndex === indices.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };
    
    const previous = () => {
        const nextIndex = activeIndex === 0 ? indices.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const slides = indices.map((index) => {
        return (
            <CarouselItem key={`images/blog-img/bg${index}.jpg`} >
                <img src={`images/blog-img/bg${index}.jpg`} alt={`${index}`}/>
            </CarouselItem>
        );
    });

    return (
        <div className="hero-area">
            <Carousel next={next} previous={previous}>
                {slides}
            </Carousel>
        </div>
    );
}

export default HeroArea;