import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    useEffect(() => {
        document.title = '404 - Page Not Found | 3D Craft Station';
    }, []);

    return (
        <div className="notfound-container">
            {/* Background Video */}
            <div className="notfound-video-bg">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="notfound-video"
                >
                    <source src="/Home/top_cards/banner_last video_4.mp4" type="video/mp4" />
                </video>
                <div className="notfound-video-overlay"></div>
            </div>

            {/* Animated Cubes */}
            <div className="notfound-cubes">
                <div className="cube cube-1"></div>
                <div className="cube cube-2"></div>
                <div className="cube cube-3"></div>
                <div className="cube cube-4"></div>
                <div className="cube cube-5"></div>
                <div className="cube cube-6"></div>
            </div>

            <div className="notfound-content">
                {/* 3D Number */}
                <div className="notfound-number">
                    <span className="digit digit-4">4</span>
                    <span className="digit digit-0">0</span>
                    <span className="digit digit-4">4</span>
                </div>

                <h1 className="notfound-title">PAGE NOT FOUND</h1>
                <p className="notfound-text">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                
                <div className="notfound-actions">
                    <Link to="/" className="notfound-btn-primary">
                        <i className="fa-solid fa-house"></i> Back to Home
                    </Link>
                    <Link to="/contact" className="notfound-btn-secondary">
                        <i className="fa-solid fa-envelope"></i> Contact Us
                    </Link>
                </div>

                <div className="notfound-suggestions">
                    <p>You might want to check:</p>
                    <div className="suggestion-links">
                        <Link to="/portfolio">Portfolio</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/about">About Us</Link>
                    </div>
                </div>

                <div className="notfound-particles">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;