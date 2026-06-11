import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-new">
            <div className="footer-new-container">
                {/* Top Section with Newsletter */}
                <div className="footer-newsletter">
                    <div className="newsletter-content">
                        <h3>Subscribe to Our Newsletter</h3>
                        <p>Get the latest 3D designs, offers and updates directly in your inbox</p>
                        <div className="newsletter-form">
                            <input type="email" placeholder="Enter your email address" />
                            <button><i className="fa-solid fa-paper-plane"></i> Subscribe</button>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="footer-main">
                    {/* Brand Column */}
                    <div className="footer-col brand-col">
                        <div className="footer-logo">
                            <div className="logo-box-footer">
                                <img src="/Logo.webp" alt="Logo" style={{ width: '260px' }} />
                            </div>
                        </div>
                        <p className="footer-description">
                            Premium 3D design studio creating stunning visual experiences for global clients. 
                            We bring imagination to life through cutting-edge 3D technology.
                        </p>
                        <div className="footer-social-links">
                            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                            <a href="#"><i className="fa-brands fa-youtube"></i></a>
                            <a href="#"><i className="fa-brands fa-behance"></i></a>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#"><i className="fa-solid fa-chevron-right"></i> Home</a></li>
                            <li><a href="#"><i className="fa-solid fa-chevron-right"></i> About Us</a></li>
                            <li><a href="#"><i className="fa-solid fa-chevron-right"></i> Services</a></li>
                            <li><a href="#"><i className="fa-solid fa-chevron-right"></i> Portfolio</a></li>
                            <li><a href="#"><i className="fa-solid fa-chevron-right"></i> Contact</a></li>
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div className="footer-col">
                        <h4>Our Services</h4>
                        <ul>
                            <li><a href="#"><i className="fa-solid fa-chevron-right"></i> 3D Modeling</a></li>
                            <li><a href="#"><i className="fa-solid fa-chevron-right"></i> Character Design</a></li>
                            <li><a href="#"><i className="fa-solid fa-chevron-right"></i> 3D Animation</a></li>
                            <li><a href="#"><i className="fa-solid fa-chevron-right"></i> Product Visualization</a></li>
                            <li><a href="#"><i className="fa-solid fa-chevron-right"></i> VR/AR Development</a></li>
                        </ul>
                    </div>

                    {/* Contact Info Column */}
                    <div className="footer-col">
                        <h4>Contact Info</h4>
                        <ul className="contact-info">
                            <li>
                                <i className="fa-solid fa-location-dot"></i>
                                <span>123 Creative Street, Digital City, DC 12345</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-phone"></i>
                                <span>+1 234 567 8900</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-envelope"></i>
                                <span>info@3dstation.com</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-clock"></i>
                                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom-bar">
                    <div className="bottom-left">
                        <p>&copy; 2026 3D CRAFT STATION. All rights reserved.</p>
                    </div>
                    <div className="bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Settings</a>
                        <a href="#">Sitemap</a>
                    </div>
                    
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="footer-bg-pattern"></div>
            <div className="footer-glow"></div>
        </footer>
    );
};

export default Footer;