import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThankYouModal from '../ThankYouModal/ThankYouModal';
import './Footer.css';

const Footer = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [subscriberEmail, setSubscriberEmail] = useState('');

    // ✅ Newsletter Submit Handler
    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;
        const email = form.querySelector('input[type="email"]')?.value;

        if (!email) {
            alert('Please enter your email address.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('/backend/newsletter.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (data.success) {
                setSubscriberEmail(email);
                setShowThankYou(true);
                form.reset();
            } else {
                alert('❌ Failed to subscribe. Please try again.');
            }
        } catch (error) {
            alert('❌ Error connecting to server. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeThankYou = () => {
        setShowThankYou(false);
    };

    return (
        <footer className="footer-new">
            {/* Video Background */}
            <div className="footer-video-bg">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="footer-video"
                >
                    <source src="/Home/top_cards/banner_last_video.mp4" type="video/mp4" />
                    <img src="/images/footer-bg.webp" alt="Background" />
                </video>
                <div className="footer-video-overlay"></div>
            </div>

            <div className="footer-new-container">
                {/* Newsletter Section */}
                <div className="footer-newsletter">
                    <div className="newsletter-content">
                        <h3>Subscribe to Our Newsletter</h3>
                        <p>Get the latest 3D designs, offers and updates directly in your inbox</p>
                        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                required 
                                disabled={isSubmitting}
                            />
                            <button type="submit" disabled={isSubmitting}>
                                <i className="fa-solid fa-paper-plane"></i> 
                                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Rest of footer... */}
                <div className="footer-main">
                    {/* Brand Column */}
                    <div className="footer-col brand-col">
                        <div className="footer-logo">
                            <Link to="/">
                                <img src="/Logo-white.webp" alt="Logo" style={{ width: '260px' }} />
                            </Link>
                        </div>
                        <p className="footer-description">
                            Premium 3D design studio creating stunning visual experiences for global clients. 
                            We bring imagination to life through cutting-edge 3D technology.
                        </p>
                        <div className="footer-social-links">
                            <a href="https://www.facebook.com/3dcraftstation/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com/3dcraftstation/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in"></i></a>
                            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-youtube"></i></a>
                            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-behance"></i></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/"><i className="fa-solid fa-chevron-right"></i> Home</Link></li>
                            <li><Link to="/about"><i className="fa-solid fa-chevron-right"></i> About Us</Link></li>
                            <li><Link to="/services"><i className="fa-solid fa-chevron-right"></i> Services</Link></li>
                            <li><Link to="/portfolio"><i className="fa-solid fa-chevron-right"></i> Portfolio</Link></li>
                            <li><Link to="/contact"><i className="fa-solid fa-chevron-right"></i> Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h4>Our Services</h4>
                        <ul>
                            <li><Link to="/services#custom-stl-design"><i className="fa-solid fa-chevron-right"></i> Custom STL Design</Link></li>
                            <li><Link to="/services#cad-design"><i className="fa-solid fa-chevron-right"></i> CAD Design</Link></li>
                            <li><Link to="/services#product-prototype-design"><i className="fa-solid fa-chevron-right"></i> Product Prototype Design</Link></li>
                            <li><Link to="/services#3d-model-print"><i className="fa-solid fa-chevron-right"></i> 3D Model Print</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
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
                                <a href="mailto:info@3dstation.com">info@3dstation.com</a>
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
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms-of-service">Terms of Service</Link>
                        <Link to="/cookie-settings">Cookie Settings</Link>
                        <Link to="/sitemap">Sitemap</Link>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="footer-glow"></div>

            {/* ✅ Thank You Modal */}
            <ThankYouModal 
                isOpen={showThankYou}
                onClose={closeThankYou}
                userEmail={subscriberEmail}
                type="newsletter"
            />
        </footer>
    );
};

export default Footer;