import React from 'react';
import './Navbar.scss';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><a href="#">Anasayfa</a></li>
                <li><a href="#">Hakkımızda</a></li>
                <li><a href="#">S.S.S</a></li>
                <li><a href="#">İletişim</a></li>
                <li><a href="#">Koşullar</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
