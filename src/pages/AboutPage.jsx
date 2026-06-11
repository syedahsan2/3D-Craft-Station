import { useEffect, useState } from 'react';

const AboutPage = () => {
    const [activeCard, setActiveCard] = useState(0);
    
    // Typewriter states
    const [displayedLine1, setDisplayedLine1] = useState('');
    const [displayedLine2, setDisplayedLine2] = useState('');
    const [displayedLine3, setDisplayedLine3] = useState('');
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const lines = [
        { text: "CREATIVE MINDS,", color: "#ffffff", id: 1 },
        { text: "POWERFUL", color: "#f26522", id: 2 },
        { text: "DESIGNS", color: "#ffffff", id: 3 }
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

    const valueCards = [
        { id: 0, title: "CREATIVITY FIRST", img: "../../About US/creativity.png" },
        { id: 1, title: "QUALITY & PRECISION", img: "../../About US/quality.png" },
        { id: 2, title: "INNOVATION", img: "../../About US/innovation.png" },
        { id: 3, title: "CLIENT-CENTERED APPROACH", img: "../../About US/client-centered.png" },
        { id: 4, title: "CONSISTENCY", img: "../../About US/consistency.png" },
        { id: 5, title: "CONTINUOUS GROWTH", img: "../../About US/continuous-growth.png" }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="about-hero-section">
                <div className="minds-hero-container">
                    <div className="minds-content-panel animate-on-scroll">
                        <h1 className="minds-main-title">
                            <span className="typewriter-line">
                                {lineIndex === 0 ? displayedLine1 : (lineIndex > 0 ? lines[0].text : '')}
                                {lineIndex === 0 && <span className="cursor">|</span>}
                            </span>
                            <br />
                            <span className="typewriter-line minds-orange-glow">
                                {lineIndex === 1 ? displayedLine2 : (lineIndex > 1 ? lines[1].text : '')}
                                {lineIndex === 1 && <span className="cursor">|</span>}
                            </span>
                            <br />
                            <span className="typewriter-line">
                                {lineIndex === 2 ? displayedLine3 : (lineIndex > 2 ? lines[2].text : '')}
                                {lineIndex === 2 && <span className="cursor">|</span>}
                            </span>
                        </h1>
                        <p className="minds-sub-paragraph">
                            From concept to final visuals, we craft impactful digital solutions with creativity, precision, and style.
                        </p>
                        <button className="btn-discover-pill" onClick={() => scrollToSection('values')}>
                            Discover Us
                        </button>
                    </div>

                    <div className="minds-character-spotlight animate-on-scroll">
                        <div className="minds-ambient-orange-lens"></div>
                        <img 
                            src="../../Common/Banner.png" 
                            alt="3D Character Model Spotlight" 
                            className="spotlight-asset-img"
                        />
                    </div>
                </div>

                {/* Border Chevron Divider */}
                <div className="minds-border-chevron-divider">
                    <div className="chevron-triangle-container">
                        <div className="chevron-orange-triangle"></div>
                        <div className="chevron-white-triangle"></div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section id="values" className="values-section">
                <div className="mission-container animate-on-scroll">
                    <h2>OUR MISSION</h2>
                    <p>
                        To create innovative 3D visuals and high-quality digital experiences that help brands build a strong, modern, 
                        and visually engaging identity. We transform ideas into impactful designs through creativity, precision, 
                        and cutting-edge 3D solutions.
                    </p>
                </div>

                <div className="core-values-block">
                    <div className="core-values-content animate-on-scroll">
                        <span className="sub-title">WHAT WE LIVE BY</span>
                        <h2>CORE VALUES</h2>

                        <div className="values-grid">
                            {valueCards.map((card) => (
                                <div 
                                    key={card.id}
                                    className={`value-card ${activeCard === card.id ? 'active' : ''}`}
                                    onClick={() => setActiveCard(card.id)}
                                >
                                    <div className="icon">
                                        <img src={card.img} alt={card.title} className="value-icon" />
                                    </div>
                                    <h3>{card.title}</h3>
                                </div>
                            ))}
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

export default AboutPage;