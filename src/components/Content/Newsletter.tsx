import React from 'react';

const Newsletter: React.FC = () => {
    return (
        <section className="newsletter">
            <h2>Subscribe to our Newsletter</h2>
            <p>Stay updated with the latest news and exclusive offers.</p>
            <form className="newsletter-form">
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
            </form>
        </section>
    );
};

export default Newsletter;
