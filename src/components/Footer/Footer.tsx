import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="footer-links">
                <ul>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#privacy">Privacy Policy</a></li>
                    <li><a href="#terms">Terms of Service</a></li>
                </ul>
            </div>
            <div className="social-media">
                <p>Follow us:</p>
                <ul>
                    <li><a href="#facebook">Facebook</a></li>
                    <li><a href="#twitter">Twitter</a></li>
                    <li><a href="#instagram">Instagram</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
