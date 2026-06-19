import { useEffect, useState } from 'react';

const ServicesPage = () => {
    const [displayedLine1, setDisplayedLine1] = useState('');
    const [displayedLine2, setDisplayedLine2] = useState('');
    const [displayedLine3, setDisplayedLine3] = useState('');
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const lines = [
        { text: "CREATIVE SERVICES", color: "#ffffff", id: 1 },
        { text: "THAT BRING", color: "#ffffff", id: 2 },
        { text: "IDEAS TO LIFE", color: "#f26522", id: 3 }
    ];

    // Typewriter effect
    useEffect(() => {
        const currentFullText = lines[lineIndex].text;
        
        let timeout;
        
        if (isDeleting) {
            if (charIndex > 0) {
                timeout = setTimeout(() => {
                    setCharIndex(charIndex - 1);
                    updateDisplayedText(lineIndex, charIndex - 1);
                }, 40);
            } else {
                setIsDeleting(false);
                setLineIndex((prev) => (prev + 1) % lines.length);
            }
        } else {
            if (charIndex < currentFullText.length) {
                timeout = setTimeout(() => {
                    setCharIndex(charIndex + 1);
                    updateDisplayedText(lineIndex, charIndex + 1);
                }, 80);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, 2000);
            }
        }
        
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, lineIndex]);

    const updateDisplayedText = (line, length) => {
        switch(line) {
            case 0:
                setDisplayedLine1(lines[0].text.substring(0, length));
                break;
            case 1:
                setDisplayedLine2(lines[1].text.substring(0, length));
                break;
            case 2:
                setDisplayedLine3(lines[2].text.substring(0, length));
                break;
            default:
                break;
        }
    };

    // Reset completed lines when moving to next
    useEffect(() => {
        if (lineIndex === 0 && !isDeleting) {
            setDisplayedLine2('');
            setDisplayedLine3('');
        } else if (lineIndex === 1 && !isDeleting) {
            setDisplayedLine1(lines[0].text);
            setDisplayedLine3('');
        } else if (lineIndex === 2 && !isDeleting) {
            setDisplayedLine1(lines[0].text);
            setDisplayedLine2(lines[1].text);
        }
    }, [lineIndex, isDeleting]);

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

    return (
        <>
            {/* Hero Section */}
            <section className="services-hero-section">
                <div className="hero-container">
                    <div className="hero-content animate-on-scroll">
                        <h1 className="hero-title">
                            <span className="typewriter-line">
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
                        <p className="hero-subtitle">
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
                            <img src="../../Service/card_1.jpg" alt="3D Model Left" />
                        </div>
                        <div className="sculpt-card card-center">
                            <img src="../../Service/card_2.jpg" alt="3D Wizard Model" />
                        </div>
                        <div className="sculpt-card card-right">
                            <img src="../../Service/card_3.jpg" alt="3D Model Right" />
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
                    <div className="expertise-item-row row-inverse animate-on-scroll">
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
                            <img src="../../Service/stl_design.png" alt="STL Design" />
                        </div>
                    </div>

                    {/* Item 1 - CAD DESIGN */}
                    <div className="expertise-item-row animate-on-scroll">
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
                            <img src="../../Service/cad_design.jpg" alt="CAD Design" />
                        </div>
                    </div>

                    {/* Item 4 - PRODUCT PROTOTYPE DESIGN (Reverse with glow) */}
                    <div className="expertise-item-row row-inverse deep-glow-active animate-on-scroll">
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
                            <img src="../../Service/product_prototype.png" alt="Product Prototype" />
                        </div>
                    </div>

                    {/* Item 3 - 3D MODEL PRINT */}
                    <div className="expertise-item-row animate-on-scroll">
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
                            <img src="../../Service/3d_print.png" alt="3D Print" />
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

                    <form className="inline-capture-form" onSubmit={(e) => e.preventDefault()}>
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
                            <button type="submit" className="btn-submit-pill">CONTACT</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default ServicesPage;