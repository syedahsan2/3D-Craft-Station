import { useEffect, useState } from 'react';
import ThankYouModal from '../components/ThankYouModal/ThankYouModal'; 
import { Helmet } from 'react-helmet-async';

const lines = [
    { text: "CREATIVE SERVICES", color: "#ffffff", id: 1 },
    { text: "THAT BRING", color: "#ffffff", id: 2 },
    { text: "IDEAS TO LIFE", color: "#f26522", id: 3 }
];

const ServicesPage = () => {
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [userName, setUserName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Derived typewriter values
    const displayedLine1 = lineIndex > 0 ? lines[0].text : (lineIndex === 0 ? lines[0].text.substring(0, charIndex) : '');
    const displayedLine2 = lineIndex > 1 ? lines[1].text : (lineIndex === 1 ? lines[1].text.substring(0, charIndex) : '');
    const displayedLine3 = lineIndex > 2 ? lines[2].text : (lineIndex === 2 ? lines[2].text.substring(0, charIndex) : '');

    // Typewriter effect
    useEffect(() => {
        const currentFullText = lines[lineIndex].text;
        
        let timeout;
        
        if (isDeleting) {
            if (charIndex > 0) {
                timeout = setTimeout(() => {
                    setCharIndex(charIndex - 1);
                }, 40);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(false);
                    setLineIndex((prev) => (prev + 1) % lines.length);
                }, 500);
            }
        } else {
            if (charIndex < currentFullText.length) {
                timeout = setTimeout(() => {
                    setCharIndex(charIndex + 1);
                }, 80);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, 2000);
            }
        }
        
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, lineIndex]);

    // Scroll reveal animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;
        const name = form.querySelector('input[name="name"]')?.value || '';
        const formData = {
            name: name,
            email: form.querySelector('input[name="email"]')?.value || '',
            phone: form.querySelector('input[name="phone"]')?.value || 'Not provided',
            service: form.querySelector('select')?.value || 'Services Inquiry',
            message: 'Message from Services Page'
        };

        try {
            const response = await fetch('/backend/send-email.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (data.success) {
                setUserName(name);
                setShowThankYou(true);
                form.reset();
            } else {
                alert('❌ Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Services contact error:', error);
            alert('❌ Error connecting to server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeThankYou = () => {
        setShowThankYou(false);
    };
    return (
        <>
            <Helmet>
                    <title>3D Services - Modeling, Animation, CAD Design | 3D Craft Station</title>
                    <meta name="description" content="Explore 3D Craft Station's services including character modeling, 3D animation, CAD design, product visualization, and custom STL design." />
            </Helmet>
            {/* Hero Section */}
            <section className="services-hero-section">
                <div className="hero-container">
                    <div className="hero-content animate-on-scroll">
                        <h1 className="hero-title">
                            <span className="typewriter-line" style={{ color: '#ffffff' }}>
                                {lineIndex === 0 ? displayedLine1 : (lineIndex > 0 ? lines[0].text : '')}
                                {lineIndex === 0 && <span className="cursor">|</span>}
                            </span>
                            <br />
                            <span className="typewriter-line">
                                {lineIndex === 1 ? displayedLine2 : (lineIndex > 1 ? lines[1].text : '')}
                                {lineIndex === 1 && <span className="cursor">|</span>}
                            </span>
                            <br />
                            <span className="typewriter-line highlight-orange">
                                {lineIndex === 2 ? displayedLine3 : (lineIndex > 2 ? lines[2].text : '')}
                                {lineIndex === 2 && <span className="cursor">|</span>}
                            </span>
                        </h1>
                        <p className="hero-subtitle-Portfolio">
                            From character modeling and sculpting to texturing and rigging, we deliver end-to-end 3D production services.
                        </p>
                        <button 
                            className="btn-expertise" 
                            onClick={() => scrollToSection('expertise')}
                        >
                            View Our Expertise
                        </button>
                    </div>

                    <div className="cards-stack-wrapper animate-on-scroll">
                        <div className="orange-radial-glow"></div>
                        <div className="sculpt-card card-left">
                            <img src="../../Service/card_1.webp" alt="3D Model Left" />
                        </div>
                        <div className="sculpt-card card-center">
                            <img src="../../Service/card_2.webp" alt="3D Wizard Model" />
                        </div>
                        <div className="sculpt-card card-right">
                            <img src="../../Service/card_3.webp" alt="3D Model Right" />
                        </div>
                    </div>
                </div>

                {/* Chevron Divider */}
                <div className="chevron-divider-container">
                    <div className="orange-chevron-line"></div>
                    <div className="white-chevron-block"></div>
                </div>
            </section>

            {/* Geometric Divider */}
            <div className="section-geometric-divider">
                <div className="divider-orange-accent"></div>
                <div className="divider-main-mask"></div>
            </div>

            {/* Expertise Section */}
            <section id="expertise" className="expertise-section">
                <h2 className="section-title animate-on-scroll">OUR EXPERTISE</h2>

                <div className="expertise-grid-container">

                    {/* Item 2 - CUSTOM STL DESIGN (Reverse) */}
                    <div className="expertise-item-row row-inverse animate-on-scroll" id="custom-stl-design">
                        <div className="expertise-info-panel">
                            <h3 className="panel-heading">
                                <span className="brand-white">CUSTOM</span><br />
                                <span className="brand-orange">STL DESIGN</span>
                            </h3>
                            <p className="panel-description">
                                Custom STL files made exactly to your requirements. High-quality, printable, and production-ready designs.
                            </p>
                            <button 
                                className="btn-action-pill"
                                onClick={() => scrollToSection('contact')}
                            >
                                Get in Touch
                            </button>
                        </div>
                        <div className="expertise-frame-panel">
                            <img src="../../Service/stl_design.webp" alt="STL Design" />
                        </div>
                    </div>

                    {/* Item 1 - CAD DESIGN */}
                    <div className="expertise-item-row animate-on-scroll" id="cad-design">
                        <div className="expertise-info-panel">
                            <h3 className="panel-heading">
                                <span className="brand-orange">CAD</span><br />
                                <span className="brand-white">DESIGN</span>
                            </h3>
                            <p className="panel-description">
                                Turning ideas into precise digital CAD models. Optimized for manufacturing, prototyping & 3D printing.
                            </p>
                            <button 
                                className="btn-action-pill"
                                onClick={() => scrollToSection('contact')}
                            >
                                Get in Touch
                            </button>
                        </div>
                        <div className="expertise-frame-panel">
                            <img src="../../Service/cad_design.webp" alt="CAD Design" />
                        </div>
                    </div>

                    {/* Item 4 - PRODUCT PROTOTYPE DESIGN (Reverse with glow) */}
                    <div className="expertise-item-row row-inverse deep-glow-active animate-on-scroll" id="product-prototype-design">
                        <div className="expertise-info-panel">
                            <h3 className="panel-heading">
                                <span className="brand-white">PRODUCT</span><br />
                                <span className="brand-orange">PROTOTYPE<br />DESIGN</span>
                            </h3>
                            <p className="panel-description">
                                From concept to realistic product prototype design. Functional, modern, and ready for presentation or production.
                            </p>
                            <button 
                                className="btn-action-pill"
                                onClick={() => scrollToSection('contact')}
                            >
                                Get in Touch
                            </button>
                        </div>
                        <div className="expertise-frame-panel">
                            <img
                                src="../../Service/P-P.webp"
                                alt="Product Prototype"
                                style={{
                                    background: "radial-gradient(circle at 85% 15%, #ff5500 0%, #3a1400 30%, #000000 70%)",
                                }}
                            />
                        </div>
                    </div>

                    {/* Item 3 - 3D MODEL PRINT */}
                    <div className="expertise-item-row animate-on-scroll" id="3d-model-print">
                        <div className="expertise-info-panel">
                            <h3 className="panel-heading">
                                <span className="brand-orange">3D MODEL</span><br />
                                <span className="brand-white">PRINT</span>
                            </h3>
                            <p className="panel-description">
                                Professional 3D printable models with clean detailing. Perfect for prototypes, products, and creative projects.
                            </p>
                            <button 
                                className="btn-action-pill"
                                onClick={() => scrollToSection('contact')}
                            >
                                Get in Touch
                            </button>
                        </div>
                        <div className="expertise-frame-panel">
                            <img src="../../Service/Print.png" alt="3D Print" />
                        </div>
                    </div>

                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact" className="form-contact-section">
                <div className="form-dark-overlay"></div>
                <div className="form-section-container animate-on-scroll">
                    <h2 className="form-main-heading">
                        YOUR VISION,<br />
                        OUR <span className="accent-orange-text">3D EXPERTISE</span>
                    </h2>

                    <form className="inline-capture-form" onSubmit={handleContactSubmit}>
                        <div className="input-pill-group">
                            <input type="text" name="name" className="capsule-input-field" placeholder="NAME" required />
                        </div>
                        <div className="input-pill-group">
                            <input type="email" name="email" className="capsule-input-field" placeholder="EMAIL" required />
                        </div>
                        <div className="input-pill-group">
                            <input type="tel" name="phone" className="capsule-input-field" placeholder="NUMBER" required />
                        </div>
                        
                        <div className="button-pill-group">
                            <button type="submit" className="btn-submit-pill" disabled={isSubmitting}>
                                {isSubmitting ? 'SENDING...' : 'CONTACT'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* ✅ Thank You Modal */}
            <ThankYouModal 
                isOpen={showThankYou}
                onClose={closeThankYou}
                userName={userName}
            />
        </>
    );
};

export default ServicesPage;