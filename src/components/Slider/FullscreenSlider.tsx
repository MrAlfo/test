import React from 'react';
import Slider from 'react-slick';
import './Slider.scss';
import slide1 from '../../assets/slide/slide1.jpg';
import slide2 from '../../assets/slide/slide2.jpg';
import slide3 from '../../assets/slide/slide3.jpg';
import SearchBar from '../Searchbar/Searchbar';
import Categories from '../Content/Categories';

const FullscreenSlider: React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (
        <div className="fullscreen-slider">
            {/* Search Bar */}
            <div className="slider-search-bar">
                <SearchBar />
            </div>

            {/* Categories */}
            <div className="slider-categories">
                <Categories />
            </div>

            {/* Slider */}
            <Slider {...settings}>
                <div className="slider-image">
                    <img src={slide1} alt="Discover California" />
                    <div className="slider-content">
                        <h2>Çocuklarınız için yeni etkinlikler!</h2>
                        <p>Kurslar, tiyatrolar, atölyeler ve daha fazlası!</p>
                    </div>
                </div>
                <div className="slider-image">
                    <img src={slide2} alt="Outdoor Activities" />
                    <div className="slider-content">
                        <h2>Evebeynler için oluşturulmuş özel panel</h2>
                        <p>Aradığınız etkinliği saniyeler içinde bulun.</p>
                    </div>
                </div>
                <div className="slider-image">
                    <img src={slide3} alt="Travel the World" />
                    <div className="slider-content">
                        <h2>Evde etkinlik</h2>
                        <p>Ev içi düzenlenebilecek etkinlikleri keşfedin</p>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default FullscreenSlider;
