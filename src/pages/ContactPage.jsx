import { useEffect, useState } from 'react';
const ContactPage = () => {
    // Typewriter states for heading
    const [displayedLine1, setDisplayedLine1] = useState('');
    const [displayedLine2, setDisplayedLine2] = useState('');
    const [displayedLine3, setDisplayedLine3] = useState('');
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const lines = [
        { text: "LET'S CREATE SOMETHING", color: "#000000", id: 1 },
        { text: "EXTRAORDINARY", color: "#f26522", id: 2 },
        { text: "TOGETHER", color: "#000000", id: 3 }
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

    // Reset completed lines
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

    // Form fade-in animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFormVisible(true);
        }, 500);
        
        return () => clearTimeout(timer);
    }, []);

    // Scroll reveal animation for other elements
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('input[placeholder="NAME"]')?.value;
        const email = form.querySelector('input[placeholder="EMAIL"]')?.value;
        const service = form.querySelector('select')?.value;
        
        if(!name || !email || !service) {
            alert("Please complete all the required fields.");
            return;
        }

        alert(`Thank you, ${name}! Your request regarding "${service}" has been received. We'll get back to you shortly.`);
        form.reset();
    };

    return (
        <>
            {/* Hero Section - Imagination to Reality */}
            <section className="contact-hero-section">
                <div className="reality-left-ambient-glow"></div>
                <div className="reality-dark-overlay"></div>

                <div className="reality-section-container animate-on-scroll">
                    <h1 className="reality-main-title">
                        TURNING <span className="orange-text-highlight">IMAGINATION</span><br />
                        INTO STUNNING <span className="orange-text-highlight">3D REALITY</span>
                    </h1>
                    
                    <p className="reality-subtext-description">
                        From bold concepts to immersive 3D experiences — let's create visuals that captivate, inspire, 
                        and make your brand impossible to ignore.
                    </p>
                </div>

                {/* Bottom Chevron Divider */}
                <div className="reality-bottom-chevron-divider">
                    <div className="reality-triangle-container">
                        <div className="reality-orange-triangle"></div>
                        <div className="reality-white-triangle"></div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="contact-form-section" id="contact">
                <div className="container contact-container">
                    <div className="contact-text animate-on-scroll">
                        <h2 className="contact-heading-typewriter">
                            <span className="typewriter-line">
                                {lineIndex === 0 ? displayedLine1 : (lineIndex > 0 ? lines[0].text : '')}
                                {lineIndex === 0 && <span className="cursor">|</span>}
                            </span>
                            <br />
                            <span className="typewriter-line orange-text">
                                {lineIndex === 1 ? displayedLine2 : (lineIndex > 1 ? lines[1].text : '')}
                                {lineIndex === 1 && <span className="cursor">|</span>}
                            </span>
                            <br />
                            <span className="typewriter-line">
                                {lineIndex === 2 ? displayedLine3 : (lineIndex > 2 ? lines[2].text : '')}
                                {lineIndex === 2 && <span className="cursor">|</span>}
                            </span>
                        </h2>
                        <p>We craft high-quality 3D visuals, creative branding, and immersive digital experiences that help your brand stand out in the modern world.</p>
                    </div>
                    
                    <div className={`contact-form-wrapper-new ${isFormVisible ? 'fade-in-left' : ''}`}>
                        <form id="contactForm" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="input-group">
                                    <input type="text" placeholder="NAME" required />
                                </div>
                                <div className="input-group">
                                    <input type="tel" placeholder="PHONE NUMBER" />
                                </div>
                            </div>
                            <div className="input-group full-width">
                                <input type="email" placeholder="EMAIL" required />
                            </div>
                            <div className="input-group full-width">
                                <div className="custom-select">
                                    <select required>
                                        <option value="" disabled selected hidden>SERVICES</option>
                                        <option value="3d-modeling">3D Modeling</option>
                                        <option value="branding">Creative Branding</option>
                                        <option value="digital-exp">Immersive Digital Experiences</option>
                                    </select>
                                    <span className="select-arrow"></span>
                                </div>
                            </div>
                            <div className="input-group full-width">
                                <textarea placeholder="NOTE" rows="4"></textarea>
                            </div>
                            <button type="submit" className="btn-submit">Contact</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactPage;