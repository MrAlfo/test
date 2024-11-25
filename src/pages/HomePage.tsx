import React from 'react';
import Featured from '../components/Content/Featured';
import Newsletter from '../components/Content/Newsletter';
import FullscreenSlider from '../components/Slider/FullscreenSlider';
import './HomePage.scss';

const HomePage: React.FC = () => {
    return (
        <div className="homepage">
            <FullscreenSlider />
            <main>
                <Featured />
                <Newsletter />
            </main>
        </div>
    );
};

export default HomePage;
